/* eslint-disable react/prop-types */
import { useState, useRef } from 'react'
import './Game.css'

// eslint-disable-next-line no-unused-vars
const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {

  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    verifyLetter(letter)
    setLetter("")
    letterInputRef.current.focus()
  }

  return (
    <div className="game">
      <p className="points">
      Pontuação: 
        <span>{score}</span>
      </p>
      <h1>Adivinhe a palavra: </h1>
      <h3 className='tips'>Dica sobre a palavra: <span>{pickedCategory}</span></h3>
      <p>Você ainda tem {guesses} tentativa(s)</p>
      <div className="wordContainer">
       {letters.map((letter, i) => (
        guessedLetters.includes(letter) ? (
          <span key={i} className="Letter">{letter}</span>
        ) : (
          <span key={i} className="blankSquare"></span>
        )
       ))}
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="letter" maxLength={1} required onChange={(e) => setLetter(e.target.value)} 
          value={letter} 
          ref={letterInputRef} />
          <button>jogar</button>
        </form>
      </div>
      <div className="wrowLettersContainer">
        <p>Letras ja utilizadas:
          {wrongLetters.map((letter, i) => (
            <span key={i}>{letter}, </span>
          ))}
        </p>
      </div>
    </div>
  )
}

export default Game