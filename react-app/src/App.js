import {useState,useEffect} from "react";
import {ethers} from 'ethers';
import './App.css';
import Login from './components/Login';
import Connected from "./components/Connected";

function App() {
  const [provider,setProvider] = useState(null); //set the current provider 
  const [account,setAccount] = useState(null);  //set userAddress
  const [isConnected,setIsConnected] = useState(null);

  useEffect( () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  });


  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function connectToMetamask(){
    if(window.ethereum){ //to check if the wallet is connected on page reload
     try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      await provider.send("eth_requestAccounts",[]); //request the provider to give all the accounts avalible
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      console.log("Metamask connected",address);
      setIsConnected(true);
     }
     catch(err){
      console.error(err);
     }

    }else{
      console.error("Metamask is not detected in the browser");
    }
  }
  return (
    <div className="App">
   

      {isConnected ? <Connected account={account}/> : <Login connectWallet={connectToMetamask}/>}
      

    </div>
  );
}

export default App;
