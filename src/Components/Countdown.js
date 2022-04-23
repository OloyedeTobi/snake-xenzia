import { Component } from "react";

const initialstate = {
    time: "",
    counter: 4,
    startGame: false

}

class Countdown extends Component{
  state = initialstate;

  componentDidMount(){
      this.interval =  setInterval(() => this.countdown(), 1000)
  }



  countdown(){
      this.setState(state =>{

        if(this.state.counter === 0){
           clearInterval(); 
           this.state.startGame = true
        }
          return{
              ...state,
              time: this.counter,
             counter: this.counter - 1

        }

        


      })
  }

     render() {
     return(
         <div>
           {this.state.time}
         </div>
     )
    }
 }


 export default Countdown;