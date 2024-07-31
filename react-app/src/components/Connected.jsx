import react from "react";
import GlobalCountdown from "./GlobalCountdown";
// 

const Connected = (props) =>{
    return(
        <div className="login-container">
            <GlobalCountdown targetDate={props.votingStatus}/>    
            <h1 className="welcome-message"> You are connected to metamask</h1>
            <p className="connected-account">Metamask Account: {props.account}</p>
            <h3> {props.question}</h3>
            <div className="button_container" >
            <button className="button_green" onClick={() => props.voteFunction(true)}>Yes</button>
            <button className="button_red" onClick={() => props.voteFunction(false)}>No</button>
            {false && <div className="outer_counter">
            <p>
                Polling Finished
            </p>
            <p> Number of No in polling {isNaN(props.noVote)? "None": props.noVote}</p>
            <p> Number of Yes in polling {isNaN(props.yesVote)? "None": props.yesVote}</p>
            </div>}
            

          
            </div>
            
        </div>
    )
}

export default Connected;