const Score=({score, title,classN}) => {
     return(
         <div className={classN}>
             <span className="score-title">{title}: </span>
             <span className="score-point">{score}</span>
        </div>
     )
}

export default Score