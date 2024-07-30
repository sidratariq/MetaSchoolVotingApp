import react from "react";
import GlobalCountdown from "./GlobalCountdown";
// 

const Connected = (props) =>{
    return(
        <div className="login-container">
            <GlobalCountdown
            targetDate={"99358160662"}
          />
            <h1 className="welcome-message"> You are connected to metamask</h1>
            <p className="connected-account">Metamask Account: {props.account}</p>
            <h3> {props.question}</h3>
            <div className="button_container" >
            <button className="button_green" onClick={() => props.voteFunction(true)}>Yes</button>
        <button className="button_red" onClick={() => props.voteFunction(false)}>No</button>
        
          
            </div>
            
        </div>
    )
}

export default Connected;