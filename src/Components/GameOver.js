import '../Styles/GameOver.css';

const GameOver = ({handleContinue,score}) =>{
    return(
        <div className="game-over-background">
            <div className="game-over-container">
                <div className='game-over-content'>
                <div className="game-over">
                    <h1>GAME OVER</h1>
                </div>
                <div className='white scoreBoard'>Your Score : {score}</div>
                <div>
                    
                    <button className='game-over-btn continue' onClick={handleContinue}>continue</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default GameOver;