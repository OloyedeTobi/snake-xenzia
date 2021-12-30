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
      snakePosition: [[0,0],[0,1.7]],
      snakeFruit: fruitCordinate(),
      direction: 'right'
       
    }
    
  componentDidMount() {
    // setInterval(this.handleKeyDown, this.state.speed);
    // document.addEventListener('keydown', this.handleKeyDown);
    
  }

  handleKeyDown = (e) => {
   console.log(e)
    switch(e.keyCode) {
    case  37: 
     this.setState({direction: 'left'});
     
     break;
     
     case 38 : 
     this.setState({direction: 'up'});
     break;

     case 39 : 
     this.setState({direction: 'right'});
     break;

     case 40: 
     this.setState({direction: 'down'});
     break;
  }
}





changeDirection = () => {
  let snakePos = [...this.state.snakePosition];
  let snakeHead = snakePos[snakePos.length - 1];

  switch(this.state.direction) {
    case 'left': 
    snakeHead = [snakeHead[0], snakeHead[1] - 1.6];
    break;
    case 'up': 
    snakeHead = [snakeHead[0] + 1.6, snakeHead[1]];
    break;
    case 'right': 
    snakeHead = [snakeHead[0], snakeHead[1] + 1.6];
    break;
    case 'down': 
    snakeHead = [snakeHead[0] - 1.6, snakeHead[1]];
    break;
  }

  snakePos.push(snakeHead);
  snakePos.unshift();
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
