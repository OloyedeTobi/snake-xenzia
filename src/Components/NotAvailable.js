import '../Styles/notavailable.css'

export const NotFound = () =>{   
    return(
        <div>
            <div className="not-found-con">
                <div>
                    <img src="notFound.png" alt="page not available on mobile"/>
                </div>
                <div>
                    <h1 style={{color: "white"}}>oop!</h1>
                    <p style={{color: "white"}}>You appear to be trying to play this game on a mobile device; please return later as the site is still under construction. For the time being, use a desktop or laptop to access!</p>
                </div>
           </div> 
        </div>
    )
}

