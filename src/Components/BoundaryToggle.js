import * as MdIcons  from 'react-icons/md';



const BoundaryToggle = ({handleToggle,bounded}) =>{

    // const style = {
    //     fontSize:`1.8em`,
    //     fontWeight:"bolder",
    //     borderRadius: "5px",
    //     padding: "0.8em"
    // } 


    return(
    <div className='toggle' >
        <MdIcons.MdChangeCircle 
        className= "icon"  
        onClick={handleToggle} 
        color = {bounded ? 'rgba(255, 10, 10, 0.99)' : 'green'}
        fontSize = "2.8em"
        />
    </div>
    )
}



export default BoundaryToggle;