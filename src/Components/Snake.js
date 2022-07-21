const Snake = ({snakePosition}) => (
    <>
      {snakePosition.map((snake, index) => {
          const [row, column] = snake;
  
          return (
            <div
              className={`snake-body ${index === snakePosition.length - 1 && 'head'}`}
              key={index}
              style={{
                gridRowStart: row + 1,
                gridColumnStart: column + 1
              }}
            /> 
          )
        }
      )
      }
  
    </>
  );
  
  export default Snake;