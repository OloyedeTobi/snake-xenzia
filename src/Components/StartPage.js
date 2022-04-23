import  "../Styles/startpage.css"

const StartPage = ({startGame})  =>{

    return(
        <div className="start-page">
            <div>
            <div className="start-container">
                <div>
                    <p className="welcome-text">SNAKE XENZIA</p> 
                 </div>
                 <div className="snake-image">
                     <img src="snake-ii.jpg" alt="snake"></img>
                 </div>
                
                <div className="start-btn">
                    <div><button className = "btn-easy" onClick={() =>startGame(300, "easy")}>easy</button></div>
                    <div><button className = "btn-medium" onClick={() =>startGame(150, "medium")}>medium</button></div>
                    <div><button className = "btn-hard" onClick={() =>startGame(70, "hard")}>hard</button></div>
                </div>
            </div>  
            </div>
        </div>
    )
}

export default StartPage;