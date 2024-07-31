import {useState,useEffect} from "react";
import {ethers} from 'ethers';
import {contractAbi, contractAddress} from './constants/constants';
import './App.css';
import Login from './components/Login';
import Connected from "./components/Connected";

function App() {
  const [provider,setProvider] = useState(null); //set the current provider 
  const [account,setAccount] = useState(null);  //set userAddress
  const [isConnected,setIsConnected] = useState(null); //set true if user is connected to metamask
  const [votingStatus, setVotingStatus] = useState(true); // get current time from smartcontract
  const [question, setQuestion] = useState('');
  const [CanVote,setCanVote] = useState(false);
  const [yesVote,setYesVote] = useState(0);
  const [noVote,setNoVote] = useState(0);
  const [finished,setFinished] = useState(false);

  useEffect( () => {

    getCurrentQuestion();
    getCurrentStatus();
    getResults();
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  });

  async function vote(value) {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract (
      contractAddress, contractAbi, signer
    );

    const tx = await contractInstance.vote(value);
    await tx.wait();
    canVote();
    }catch(err){
      console.log("Error occured vote Function",err)
    }
    
}

  async function canVote() { // if certain address is allowed to vote
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      // const voteStatus = await contractInstance.voters(await signer.getAddress());
      // setCanVote(voteStatus);
    }catch(err){
      console.error("Error occured canVote",err)
    }
}

  function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account !== accounts[0]) {
      setAccount(accounts[0]);
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function getCurrentStatus() {
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const status = await contractInstance.votingEnd();
      console.log("Blockchain end time",parseInt(status));
      const now = new Date();
      console.log(" Blockchain end time Time from now:::",now.getTime())
      const timeLeft = now.getTime()- 99358160662 ;
      console.log("Value of timeLeft",timeLeft);
      setVotingStatus(parseInt(status));
      console.log(votingStatus);
    }
    catch(err){
      console.error("Error occured getCurrentStatus",err)
    }
}

async function getCurrentQuestion() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contractInstance = new ethers.Contract (
    contractAddress, contractAbi, signer
  );
  const currentQuestion = await contractInstance.question();
  console.log(currentQuestion);
  setQuestion(currentQuestion);
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

  async function getResults(){
    try{
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract (
        contractAddress, contractAbi, signer
      );
      const status = await contractInstance.getResults();
      const numOfYes = parseInt(status[1]);
      const numOfNo = parseInt(status[2]);
      setYesVote(numOfYes);
      setNoVote(numOfNo);
      console.log("Value of status:::",numOfYes,numOfNo);

    }
    catch(err){
      console.error("Error occured getCurrentStatus",err)
    }
  }


  return (
    <div className="App">
      {isConnected ? <Connected account={account} question={question} voteFunction={vote} yesVote={yesVote} noVote={noVote} votingStatus={votingStatus}/> : <Login connectWallet={connectToMetamask}/>}

    </div>
  );
}

export default App;
