// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingDApp {
    // Variables to store poll details and results
    string public question;
    uint public yesVotes;
    uint public noVotes;
    uint public votingEnd;
    mapping(address => bool) public voters;

    // Events to notify on key actions
    event Voted(address indexed voter, bool vote);
    event VotingStarted(string question, uint duration);

    // Modifier to allow actions only during the voting period
    modifier duringVotingPeriod() {
        require(block.timestamp <= votingEnd, "Voting period has ended");
        _;
    }

    // Constructor to initialize the voting pool
    constructor(string memory _question, uint _duration) {
        startVoting(_question, _duration);
    }

    // Internal function to start a voting pool
    function startVoting(string memory _question, uint _duration) internal {
        question = _question;
        votingEnd = block.timestamp + _duration;
        yesVotes = 0;
        noVotes = 0;

        emit VotingStarted(_question, _duration);
    }

    // Public function to cast a vote
    function vote(bool _vote) public duringVotingPeriod {
        require(!voters[msg.sender], "You have already voted");

        voters[msg.sender] = true;

        if (_vote) {
            yesVotes++;
        } else {
            noVotes++;
        }

        emit Voted(msg.sender, _vote);
    }

    // Public function to get the voting results
    function getResults() public view returns (string memory, uint, uint) {
        require(block.timestamp > votingEnd, "Voting is still ongoing");
        return (question, yesVotes, noVotes);
    }

    // Public function to get the current voting pool details
    function getPoolDetails() public view returns (string memory, uint) {
        return (question, votingEnd);
    }
}