import './StartScreen.css'

// eslint-disable-next-line react/prop-types
const StartScreen = ({ startGame }) => {
  return (
    <div className='Start'>
        <h1>Secret Word</h1>
        <p>Clique no botão abaixo para iniciar o jogo:</p>
        <button onClick={startGame}>Começar jogo</button>
    </div>
  )
}

export default StartScreen