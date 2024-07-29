import react from "react";

const Login = (props) =>{
    return(
        <div className="login-container">
            <h1 className="welcome-message"> Welcome to Online polling Dapp</h1>
            <button className="login-button" onClick={props.connectWallet}> Connect to Metamask </button>
        </div>
    )
}

export default Login;