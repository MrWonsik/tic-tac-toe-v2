import './WelcomePage.css'

function WelcomePage() {
  return (
    <div className="game-container">
       <div className="tic-tac-toe_logo">
           <div className="word_logo tic_logo">TIC</div>
           <div className="word_logo tac_logo">TAC</div>
           <div className="word_logo toe_logo">TOE</div>
       </div>

        <div className="start-button_container">
            <button className="start-button">Start</button>
        </div>
    </div>
  )
}

export default WelcomePage
