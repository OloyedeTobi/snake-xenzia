const Fruit = ({position}) => {
    const [row, column] = position;
  
    return (
      <div
        className="egg"
        style={{
          gridRowStart: row + 1,
          gridColumnStart: column + 1
        }}
      />
    )
  };

  export default Fruit;