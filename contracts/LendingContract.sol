// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LendingContract {
    address public owner;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public loans;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        balances[msg.sender] += msg.value;
    }

    function borrow(uint256 amount) external {
        require(amount > 0, "Borrow amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Not enough balance to borrow");
        loans[msg.sender] += amount;
        balances[msg.sender] -= amount;
    }

    function repayLoan(uint256 amount) external {
        require(amount > 0, "Repayment amount must be greater than 0");
        require(
            loans[msg.sender] >= amount,
            "Not enough loan balance to repay"
        );
        loans[msg.sender] -= amount;
        balances[msg.sender] += amount;
    }

    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }

    function getLoanBalance() external view returns (uint256) {
        return loans[msg.sender];
    }
}
