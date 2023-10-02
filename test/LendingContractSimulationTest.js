// Import necessary Truffle libraries and the contract artifacts
const LendingContract = artifacts.require("LendingContract");

contract("LendingContract", (accounts) => {
  let lendingContract;
  const user = accounts[1];
  const borrowAmount = web3.utils.toWei("15", "ether"); // Borrow more than the deposited balance

  beforeEach(async () => {
    lendingContract = await LendingContract.new({ from: accounts[0] });
  });

  it("should prevent borrowing more than available balance", async () => {
    const depositAmount = web3.utils.toWei("10", "ether");
    await lendingContract.deposit({ from: user, value: depositAmount });

    try {
      await lendingContract.borrow(borrowAmount, { from: user });
      assert.fail("Borrowing more than deposited balance should fail");
    } catch (error) {
      // Ensure that the error message contains "Not enough balance to borrow"
      assert.include(
        error.message,
        "Not enough balance to borrow",
        "Error message should indicate insufficient balance"
      );
    }

    const loanBalance = await lendingContract.getLoanBalance({ from: user });
    assert.equal(
      loanBalance.toString(),
      "0",
      "Loan balance should remain zero"
    );
  });
});
