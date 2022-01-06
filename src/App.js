import {Component} from 'react';
import './Stlyles/SnakeXenzia.css';
import Snake from './Components/Snake';
import Fruit from './Fruit';



const fruitCordinate = () =>{
 let x = Math.floor(Math.random() * 97);
 let y = Math.floor(Math.random() * 97);

 return([x,y])
}




class App extends Component{
  
    state = {
      score: 0,
      speed: 700,
      snakePosition: [[0,0],[0,4]],
      snakeFruit: fruitCordinate(),
      direction: 'right'
       
    }
    
  componentDidMount() {
   
    setInterval(this.changeDirection, this.state.speed);
    document.addEventListener('keydown', this.handleKeyDown);
    
  }



  // gameBoarder = () =>{
  //   let snakePos = [...this.state.snakePosition];
  //   let head = snakePos[snakePos.length - 1];
  //   if(head[0]> 0 || head[1] > 100 || head[0] < 0 || head[1] < 100){
  //     this.gameOver()
  //   }
  // }


  enlargeSnake = () =>{
    let snakePos = [...this.state.snakePosition];
    let prev = snakePos[0];
    snakePos.push(prev)
    this.setState({snakePosition: snakePos})
  }

  fruitEaten = ()=>{
   let snakePos = [...this.state.snakePosition];
   let head = snakePos[snakePos.length - 1];
   let food = this.state.snakeFruit;
  //  console.log(head, food)
   if((head[0] === food[0] && head[1] === food[1]) || (head[0] === (food[0]+1) && head[1] === (food[1]+1)) 
   || (head[0] === (food[0]+2) && head[1] === (food[1]+2)) || (head[0] === (food[0]+3) && head[1] === (food[1]+3))){
     console.log("done")
     this.enlargeSnake();
   }
  }


  handleKeyDown = (e) => {
  
    switch(e.keyCode) {
    case  37: 
     this.setState({direction: 'left'});
     this.changeDirection()
     this.fruitEaten()
     break;
     
     case 38 : 
     this.setState({direction: 'up'});
     this.changeDirection()
     this.fruitEaten()
     break;

     case 39 : 
     this.setState({direction: 'right'});
     this.changeDirection()
     this.fruitEaten()
     break;


     case 40: 
     this.setState({direction: 'down'});
     this.changeDirection()
     this.fruitEaten()
     break;
  }
  
}





changeDirection = () => {
  let snakePos = [...this.state.snakePosition];
  let snakeHead = snakePos[snakePos.length - 1];

  switch(this.state.direction) {
    case 'left': 
    snakeHead = [snakeHead[0], snakeHead[1] - 4];
    snakePos.splice(0,1);
    break;
    case 'up': 
    snakeHead = [snakeHead[0] - 4, snakeHead[1]];
    snakePos.splice(0,1);
    break;
    case 'right': 
    snakeHead = [snakeHead[0], snakeHead[1] + 4];
    snakePos.splice(0,1);
    break;
    case 'down': 
    snakeHead = [snakeHead[0] + 4, snakeHead[1]];
    snakePos.splice(0,1);
    break;
  }

  snakePos.push(snakeHead);
  this.setState({
    snakePosition : snakePos
  })
}
  

render(){
  return(
    <div className='App'>      
      <main className='snake-board'>
       <div className='container'>
          <div className='snake-field'>
             <Snake snakePosition={this.state.snakePosition} />
             <Fruit fruit={this.state.snakeFruit} />
          </div>
        </div>
      </main>
    </div>

  );
 }
}

export default App;
