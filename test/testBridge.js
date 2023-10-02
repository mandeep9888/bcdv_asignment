// const MetaCoin = artifacts.require("MetaCoin");

// contract('MetaCoin', (accounts) => {
//   it('should put 10000 MetaCoin in the first account', async () => {
//     const metaCoinInstance = await MetaCoin.deployed();
//     const balance = await metaCoinInstance.getBalance.call(accounts[0]);

//     assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
//   });
//   it('should call a function that depends on a linked library', async () => {
//     const metaCoinInstance = await MetaCoin.deployed();
//     const metaCoinBalance = (await metaCoinInstance.getBalance.call(accounts[0])).toNumber();
//     const metaCoinEthBalance = (await metaCoinInstance.getBalanceInEth.call(accounts[0])).toNumber();

//     assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, 'Library function returned unexpected function, linkage may be broken');
//   });
//   it('should send coin correctly', async () => {
//     const metaCoinInstance = await MetaCoin.deployed();

//     // Setup 2 accounts.
//     const accountOne = accounts[0];
//     const accountTwo = accounts[1];

//     // Get initial balances of first and second account.
//     const accountOneStartingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
//     const accountTwoStartingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();

//     // Make transaction from first account to second.
//     const amount = 10;
//     await metaCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });

//     // Get balances of first and second account after the transactions.
//     const accountOneEndingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
//     const accountTwoEndingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();

//     assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
//     assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
//   });
// });

// Import the artifacts which are deployed by truffle migrations
const TokenA = artifacts.require("TokenA");
const BridgeA = artifacts.require("BridgeA");

contract("BridgeA", (accounts) => {
  let tokenA, bridgeA;
  const owner = accounts[0];
  const user = accounts[1];
  const amount = 100;

  before(async () => {
    // Deploy the TokenA and BridgeA contract instances
    tokenA = await TokenA.new();
    bridgeA = await BridgeA.new(tokenA.address);
  });

  it("should properly assign the token address", async () => {
    const tokenAddress = await bridgeA.token();
    assert.equal(tokenAddress, tokenA.address);
  });

  it("should properly lock tokens", async () => {
    // Approve the bridge to spend owner's tokens
    await tokenA.approve(bridgeA.address, amount, { from: owner });

    // Lock the tokens
    await bridgeA.lockTokens(amount, { from: owner });

    // Check the bridge's token balance
    const balance = await tokenA.balanceOf(bridgeA.address);
    assert.equal(balance.toString(), amount.toString());
  });

  it("should emit TokensLocked event when tokens are locked", async () => {
    // Approve the bridge to spend owner's tokens
    await tokenA.approve(bridgeA.address, amount, { from: owner });

    // Lock the tokens and get the receipt
    const receipt = await bridgeA.lockTokens(amount, { from: owner });

    // Check if the event is emitted
    assert.equal(receipt.logs[0].event, "TokensLocked");
    assert.equal(receipt.logs[0].args.from, owner);
    assert.equal(receipt.logs[0].args.amount, amount);
  });

  it("should properly release tokens", async () => {
    // Release the tokens
    await bridgeA.releaseTokens(user, amount, { from: owner });

    // Check user's token balance
    const balance = await tokenA.balanceOf(user);
    assert.equal(balance.toString(), amount.toString());
  });
});
