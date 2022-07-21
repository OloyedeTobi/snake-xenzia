import '../Styles/GameOver.css';

const GameOver = ({handleContinue,score, handleQuit}) =>{
    return(
            <div className="game-over-container">
                <div className='game-over-content'>
                    <div className="game-over">
                        <h1>GAME OVER</h1>
                    </div>
                    <div className='white scoreBoard'>Your Score : <span> {score} </span></div>
                    <div className='start-btn'>
                        
                        <button className='game-over-btn-continue' onClick={handleContinue}>Continue</button>
                        <button className='game-over-btn-quit' onClick={handleQuit}>Quit</button>
                    </div>
                </div>
            </div>
        
    )
}

export default GameOver;