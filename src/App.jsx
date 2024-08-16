//css
import './App.css'

//Data
import { wordsList } from './data/words'

//React
import { useState, useEffect, useCallback } from 'react'

//Components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'},
]

const guessesQty = 3

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])
  const [guessedLetters, setGeussedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)

  const picWordAndCategory = useCallback(() => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    const word = words[category][Math.floor(Math.random() * words[category].length)]
 

    return {word, category}
  }, [words])

  // start the secret word game
  const startGame = useCallback(() => {
    //clear all letters 
    clearLetterStates()

   const {word, category} = picWordAndCategory()
    let lettersWord = word.split("")
    lettersWord = lettersWord.map((l) => l.toLowerCase())

   //fill states
   setPickedWord(word)
   setPickedCategory(category)
   setLetters(lettersWord)

   setGameStage(stages[1].name)
  }, [picWordAndCategory])

  // process the letter input 
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    //check if letter has already been utilized
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return
    }

    //push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)) {
      setGeussedLetters((actualGuessesLetters) => [
        ...actualGuessesLetters,
        normalizedLetter,
      ])
    }else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ])
      setGuesses((actualGuesses) => actualGuesses -1)
    }
  }

  const clearLetterStates = () => {
    setGeussedLetters([])
    setWrongLetters([])
  }
  
  useEffect(() => {
    if(guesses <= 0){
      //reset all states
      clearLetterStates()
      
      setGameStage(stages[2].name)
    }
  }, [guesses])

  // win check condition
  useEffect(() => {

    const uniqueLatters = [... new Set(letters)]
    //win condition
    if(guessedLetters.length === uniqueLatters.length) {
      // add score
       setScore((actualScore) => (actualScore += 100))

      // restart game width new game
      startGame()
    }

  }, [guessedLetters, letters, startGame])

  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)

    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game 
      verifyLetter={verifyLetter} 
      pickedWord={pickedWord} 
      pickedCategory={pickedCategory} 
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
      />}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  )
}

export default App
