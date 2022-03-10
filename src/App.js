
import {Component} from 'react';
import './Styles/SnakeXenzia.css';
import Snake from './Components/Snake';
import Fruit from './Fruit';
import Score from './Components/Score';
import BoundaryToggle from './Components/BoundaryToggle';
import { FaWindows } from 'react-icons/fa';
import GameOver from './Components/GameOver';

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
  speed: 400,
  snakePosition: [[0, 0], [0, 1], [0,2]],
  snakePositionMap: initialMap,
  snakeFruit: generateRandomFruit(initialMap),
  direction: 'right',
  bounded: true,
  gameOver: false

}

class App extends Component {
  

  state = initialState 

  componentDidMount() {
    this.interval = setInterval(() => this.move(), this.state.speed)
    document.addEventListener('keydown', this.handleKeyDown);
    this.toggle = this.setState(() => this.boundaryToggle())
  }

  increaseScore(){
    this.setState(state =>({
      ...state,
         score: this.state.score + 2
    }))

  }

  gameOver(){
    this.setState(state =>({
      ...state,
       direction: null,
       gameOver: true,
    }))
    clearInterval(this.interval);

  }

  continue = () => {
    console.log("start over")
   window.location.reload()
    
    this.setState(state =>({
      ...state,
       gameOver: false,
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
        // alert('Game over stop eating yourself')
        // return Object.assign(initialState)

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
      <div className='App'>
        <main className='snake-board'>
            <div className='child-container'>
             {this.state.gameOver && <GameOver handleContinue={this.continue} score={this.state.score}/>}
            <div className='container'>
              <div className='snake-field'>
                <Snake snakePosition={this.state.snakePosition}/>
                <Fruit position={this.state.snakeFruit}/>
              </div>
            <div className='aside'>
              <Score score={this.state.score} />
              <BoundaryToggle handleToggle={this.boundaryToggle} bounded={this.state.bounded}/>
            </div>
            <div />
            </div>
          </div>
        </main>
      </div>

    );
  }
}

export default App;