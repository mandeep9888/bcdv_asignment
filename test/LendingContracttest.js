const LendingContract = artifacts.require("LendingContract");

contract("LendingContract", (accounts) => {
  let lendingContract;
  const user1 = accounts[1];
  const user2 = accounts[2];
  const borrowAmount = web3.utils.toWei("5", "ether"); // Borrow less than deposited balance

  beforeEach(async () => {
    lendingContract = await LendingContract.new({ from: accounts[0] });
  });

  it("should allow a user to deposit, borrow, and repay a loan", async () => {
    const depositAmount = web3.utils.toWei("10", "ether");
    await lendingContract.deposit({ from: user1, value: depositAmount });

    await lendingContract.borrow(borrowAmount, { from: user1 });
    let loanBalance = await lendingContract.getLoanBalance({ from: user1 });
    assert.equal(
      loanBalance.toString(),
      borrowAmount,
      "Loan balance should match borrowed amount"
    );

    const repaymentAmount = web3.utils.toWei("3", "ether");
    await lendingContract.repayLoan(repaymentAmount, { from: user1 });
    loanBalance = await lendingContract.getLoanBalance({ from: user1 });
    assert.equal(
      loanBalance.toString(),
      (borrowAmount - repaymentAmount).toString(),
      "Loan balance should be reduced after repayment"
    );
  });

  it("should prevent a user from repaying more than their loan balance", async () => {
    const depositAmount = web3.utils.toWei("10", "ether");
    await lendingContract.deposit({ from: user2, value: depositAmount });

    await lendingContract.borrow(borrowAmount, { from: user2 });

    const repaymentAmount = web3.utils.toWei("7", "ether"); // Repay more than the loan balance
    try {
      await lendingContract.repayLoan(repaymentAmount, { from: user2 });
      assert.fail("Repaying more than the loan balance should fail");
    } catch (error) {
      // Ensure that the error message contains "Not enough loan balance to repay"
      assert.include(
        error.message,
        "Not enough loan balance to repay",
        "Error message should indicate insufficient loan balance"
      );
    }
  });
});
