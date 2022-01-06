

const Snake = (props) => {
    
    return( 
        <div>  
        {props.snakePosition.map((snake, index) => {

            const snakecord = {
                top: `${snake[0]}%`,
                left: `${snake[1]}%`
            }
          
            
             return(
                    <div className="snake-body" key={index} style={snakecord}></div>
                   )
            }
           )
          }   
           
    </div>
    )
};

           


export default Snake;