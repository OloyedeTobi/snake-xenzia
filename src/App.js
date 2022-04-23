
import {Component} from 'react';
import './Styles/SnakeXenzia.css';
import Snake from './Components/Snake';
import Fruit from './Fruit';
import Score from './Components/Score';
import BoundaryToggle from './Components/BoundaryToggle';
import GameOver from './Components/GameOver';
import StartPage from './Components/StartPage';
import SoundToggle from './Components/SoundToggle';
import {gameSounds} from './Components/Sound';
import Swipe from "react-easy-swipe";
// import Countdown from './Components/Countdown';



//Wrap function that wraps value around range min - max if val provided is less than min then max is return and if val provided is greater than max then min is returned
const wrap = (min, max, val) => {
  if(val < min){
    return max
  }else if(val > max){
    return min
  }

  return val
}

//Generate random integer
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generateRandomFruit = (map) => {
  let x = getRandomNumber(0, 20);
  let y = getRandomNumber(0, 20);

  //Ensure that generated fruit position does not already exist as snake node
  while(map[`${x},${y}`]){
    x = getRandomNumber(0, 20);
    y = getRandomNumber(0, 20);
  }

  return ([x, y])
}


const initialMap = {
  '0,0': true,
  '0,1': true,
  '0,2': true,
}

const initialState = {
  score: 0,
  speed: 300,
  snakePosition: [[0, 0], [0, 1], [0,2]],
  snakePositionMap: initialMap,
  snakeFruit: generateRandomFruit(initialMap),
  direction: 'right',
  bounded: true,
  gameOver: false,
  startGame: true,
  paused: false,
  showMenu:true,
  mode: 'easy',
  soundOn: true,
  highScore: 0

}

class App extends Component {
  constructor(){
  super()
  this.sound = {
    gameOverAudio: new Audio(gameSounds.gameOver),
    eatFoodAudio: new Audio(gameSounds.eatFood),
    
  }
  this.allowSwipe = true;
}

playGameOver() {
  if(this.state.soundOn && !this.state.startGame){
this.sound.gameOverAudio.play();
  }
  else{
    return null
  }
}

playEatFood() {
  if(this.state.soundOn && this.state.startGame){
return this.sound.eatFoodAudio.play();
  }
  else{
    return null
  }
}

  state = initialState 

  componentDidMount() {
    this.interval = setInterval(() => this.move(), this.state.speed)
    document.addEventListener('keydown', this.handleKeyDown);
    // this.toggle = this.setState(() => this.boundaryToggle());
    
  }

  componentWillUnmount(){
    this.interval = clearInterval(() => this.move(), this.state.speed)
    document.removeEventListener('keydown', this.handleKeyDown);  
  }



//increase score 
  increaseScore(){
    this.setState(state =>({
      ...state,
         score: this.state.score + 2
    }))

  }

  //initial conditions when a new game starts
  startGame = (speed, mode) =>{

    switch (speed)
    {
        case 300: this.mode = 'hard'; break;
        case 150: this.mode = 'medium'; break;
        case 70: this.mode = 'easy'; break;
        default: this.mode = 'easy'; 
    }

    this.this = speed;
    

    clearInterval(this.interval);
    this.setState(state =>{
       if(this.state.showMenu) {
         console.log("menu")
       }
       else{
         console.log("game")
       }
       return{
         ...state,
         startGame: true,
         gameOver: false,
         showMenu: false,
         speed: speed,
         mode: mode
         }
 
         
     }
    )
  }

  //halts the game 
  gameOver(){
    clearInterval(this.interval);

     this.playGameOver()
    
    this.setState(state =>({
      ...state,
       startGame: false,
       direction: null,
       gameOver: true
    }))
    clearInterval(this.interval);
    
    let bestScore = this.getBestScore(this.mode);
    if (this.state.score > bestScore)
    {
     localStorage.setItem(this.mode + "BestScore", this.state.score);
     bestScore = this.state.score;
 }
 
 this.setState(state => ({
     ...state,
     highScore: bestScore   
 }));
 };
 

 getBestScore(mode)
 {
 let bestScore = localStorage.getItem(mode + "BestScore");
 bestScore = bestScore === null ? 0 : parseInt(bestScore);
 return bestScore;
 }

  

  getSpeed = (speed) =>{
    if(this.state.mode === 'hard'){
      return speed = 150
    }
    else if(this.state.mode === 'medium'){
      return speed = 300
    }
    else{
      return speed = 400
    }
  }


//toggle the boundary so users can choose to use a boundary or not
 
boundaryToggle = () =>{
  this.setState(state =>{
     if(this.state.bounded) {
       console.log("bounded")
     }
     else{
       console.log("not bounded")
     }
     return{
       ...state,
       bounded: !this.state.bounded
       }

       
   }
  )
}

soundToggle = () =>{
 this.setState(state =>{
    if(this.state.soundOn) {
      console.log("on")
    }
    else{
      console.log("off")
    }
    return{
      ...state,
      soundOn: !this.state.soundOn
      }

      
  }
 )
}

// to continue playing the current stage mode
  continue = () => {
    console.log("start over")
  //  window.location.reload()
  
    this.setState((state,speed) =>({
      ...state,
      showMenu: false,
       gameOver: false,
       startGame: true,
       score: 0,
       snakePosition: [[0, 0], [0, 1], [0,2]],
       speed: this.getSpeed(speed)
    }))
   
    return Object.assign({score: 0,
      speed: 400,
      snakePosition: [[0, 0], [0, 1], [0,2]],
      snakePositionMap: initialMap,
      snakeFruit: generateRandomFruit(initialMap),
      direction: 'right',
      bounded: true})
  }

  getNewPosition(snakePosition, direction){
    const snakeHead = snakePosition[snakePosition.length - 1];

    switch (direction){
      case "right":
        return [snakeHead[0], snakeHead[1] + 1]
      case "left":
        return [snakeHead[0], snakeHead[1] - 1]
      case "up":
        return [snakeHead[0] - 1, snakeHead[1]]
      case "down":
        return [snakeHead[0] + 1, snakeHead[1]]
        default:
          return [snakeHead[0], snakeHead[1] + 1]
    }
  }


  

  move(){
    this.setState(state => {
      const newPosition = this.getNewPosition(state.snakePosition, state.direction);

  
     if(this.state.bounded){
      if(newPosition[0] > 19 ||
        newPosition[0] < 0 ||
        newPosition[1] > 19 ||
        newPosition[1] < 0 
      ){
        //New node is invalid
        //return state;

        this.gameOver()
        return Object.assign({
          speed: 400,
          snakePosition: [[0, 0], [0, 1], [0,2]],
          snakePositionMap: initialMap,
          snakeFruit: generateRandomFruit(initialMap),
          direction: null,
          bounded: true})
      }
    }
    else{
       newPosition[0] = wrap(0, 19, newPosition[0])
      newPosition[1] = wrap(0, 19, newPosition[1])
    }

   

      if(this.state.snakePositionMap[`${newPosition[0]},${newPosition[1]}`]){
        

        this.gameOver()
        return Object.assign({
          speed: 400,
          snakePosition: [[0, 0], [0, 1], [0,2]],
          snakePositionMap: initialMap,
          snakeFruit: generateRandomFruit(initialMap),
          direction: null,
          bounded: true})
      }

      //Add new position to snake position map
      const newPositionMap = {...this.state.snakePositionMap};

      newPositionMap[`${newPosition[0]},${newPosition[1]}`] = true;

      //Check if head matches the snake position
      if(newPosition[0] === this.state.snakeFruit[0] && newPosition[1] === this.state.snakeFruit[1]){
        this.increaseScore();
        this.playEatFood();
        //If head matches snake position then do not remove tail
        return {
          ...state,
          snakePosition: [...state.snakePosition, newPosition],
          snakePositionMap: newPositionMap,
          snakeFruit: generateRandomFruit(newPositionMap) //Generate new position for snake
        }
      }

      const [firstX, firstY] = state.snakePosition[0];
      newPositionMap[`${firstX},${firstY}`] = false;

      return {
        ...state,
        snakePosition: [...state.snakePosition.slice(1), newPosition],
        snakePositionMap: newPositionMap
      }
    })
  }

  onSwipeMove(position, event)
    {
        if (this.state.showMenu || this.state.gameOver) return;

        let tolerance = 2;
        let x = position.x;
        let y = position.y;

        if (this.allowSwipe)
        {
            if (Math.abs(x) > tolerance || Math.abs(y) > tolerance)
            {
                this.allowSwipe = false;
                if (Math.abs(y) > Math.abs(x))
                    this.keyListner({ keyCode: y > 0 ? 40 : 38 });
                else
                    this.keyListner({ keyCode: x > 0 ? 39 : 37 });
            }
        }
    }

  //Checks when user goes in a direction
  handleKeyDown = (e) => {
    const isDirectionKey = [37, 38, 39, 40].includes(e.keyCode);

    if(isDirectionKey){
      clearInterval(this.interval)
    }

    let newDirection;
    let isReversed = false;
    switch (e.keyCode) {
      case  37:
        newDirection = 'left';
        isReversed = this.state.direction === 'right';

        break;

      case 38:
        newDirection = 'up'
        isReversed = this.state.direction === 'down'

        break;

      case 39 :
        newDirection = 'right'
        isReversed = this.state.direction === 'left'

        break;


      case 40:
        newDirection = 'down'
        isReversed = this.state.direction === 'up'

        break;

        default:
          newDirection = 'right'
        isReversed = this.state.direction === 'left'

          
    }

    

    if(isDirectionKey){
      this.setState(state => {
          let currentPositions = [...state.snakePosition];

          if(isReversed){
            currentPositions = currentPositions.reverse()
          }

          return {
            ...state,
            snakePosition: currentPositions,
            direction: newDirection
          }
      }, () => {
        this.move()

        this.interval = setInterval(() => this.move(), this.state.speed)
      })
    }
  }

  
    

  render() {
    return (
    
      <div className='App'
      onTouchStart={() =>
        {
            this.allowSwipe = true;
        }}
     >
        <Swipe
            className="App"
            onSwipeMove={this.onSwipeMove}
        > 
        { this.state.showMenu ?   
          <StartPage  startGame={this.startGame}/>
          :
          <main className='snake-board'>
            <>   
              <div className='child-container'>
                
                  <>
                  {this.state.gameOver &&
                  <GameOver handleContinue={this.continue} score={this.state.score}/>
                  }
                  </>
                  
                  <>
                  {this.state.startGame && (
                  <div className='container'>
                    <div className = "snake-field">
                      <Snake snakePosition={this.state.snakePosition}/>
                      <Fruit position={this.state.snakeFruit}/>
                    </div>
                    <Score score={this.state.highScore} title = {"HIGH SCORE"} classN = {"highScore"} />
                  
                  
                  <div className='aside'>
                    <Score score={this.state.score} title = {"SCORE"} classN = {"score"} />
                    <BoundaryToggle handleToggle={this.boundaryToggle} bounded={this.state.bounded}/>
                    <SoundToggle handleToggle={this.soundToggle} soundOn = {this.state.soundOn}/>
                  </div>
                <div />
              
                </div>
                )}
              </>
        
            </div>
            
            </>
          </main>
        }
      
      </Swipe>
      </div>
   

    );
  }
}

export default App;