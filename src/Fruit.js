

const Fruit = (props) => {
   

const styleFruit = {
   top: `${props.fruit[0]}%`,
   left: `${props.fruit[1]}%`
}

return(
    <div className="egg" style={styleFruit}></div>  
 )
};

export default Fruit;