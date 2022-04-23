import * as VscIcons  from 'react-icons/vsc';



const SoundToggle = ({handleToggle,soundOn}) =>{


    return(
    <div className='toggle' >
        {
        soundOn ?

        <VscIcons.VscUnmute
        className= "icon"  
        onClick={handleToggle} 
        fontSize = "2.8em"
        color = "white"
        /> 
        
        : 

        <VscIcons.VscMute
        className= "icon"  
        onClick={handleToggle} 
        color = "white"
        fontSize = "2.8em"
        /> 
        
        }
    </div>
    )
}



export default SoundToggle;
