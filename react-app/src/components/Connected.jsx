import react from "react";

const Connected = (props) =>{
    return(
        <div className="login-container">
            <h1 className="welcome-message"> You are connected to metamask</h1>
            <p className="connected-account">Metamask Account: {props.account}</p>
        </div>
    )
}

export default Connected;