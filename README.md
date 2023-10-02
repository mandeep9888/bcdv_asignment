# BCDV 4028 Assignment

Foobar is a Python library for dealing with word pluralization.

### Step 1

Setup a local ganache network with truffle and deploy TokanA and Bridge A contract onto the local ganache network
![Token A and Bridge A contract deployments ](https://github.com/mandeep9888/bcdv_asignment/blob/20e4ca3631d30ef8f451009e155f2474602aeffc/truffleMigrate_tokenA_bridgeA.png).

### step 2

Setup a sepolia network with truffle and deploy TokanB and Bridge B contract onto the Sepolia test Network
![Token B and Bridge B contract deployments ](https://github.com/mandeep9888/bcdv_asignment/blob/20e4ca3631d30ef8f451009e155f2474602aeffc/truffleMigrate_sepolia_tokenB_bridgeB.png).

### step 3

Run truffle test

![truffle test ](https://github.com/mandeep9888/bcdv_asignment/blob/20e4ca3631d30ef8f451009e155f2474602aeffc/truffleTest.png).

### step 4

get the addresses from Ganache network 

Token A address : ```0xDc48A86e641C978D14074653B398E29c6f5b69e6``` 

Bridge A address : ```0xE82F51f09Ae22ac8bDF96a4a163744E599DD9A5d```

get the addresses from sepolia testnet

Token B address : ```0xAF0CDCD1637693D51b1F72211079BCA2372b14bD``` 

Bridge B address : ```0x10e600ca0E7Ee4F4C7314EdA757187E937A08F16```

### Step 5

Run [Demo](https://github.com/mandeep9888/bcdv_asignment/blob/20e4ca3631d30ef8f451009e155f2474602aeffc/script/demo.js) Script add bridges to one another and transfer tokens over bridges

### step 6 

transfer token over the bridge network

![token transfer](https://github.com/mandeep9888/bcdv_asignment/blob/20e4ca3631d30ef8f451009e155f2474602aeffc/tokenTransfer.png).

- initially bridge A does not have any token 
- Wallet A balance is `1000000000000000000000000`
- add Bridges addresses to each other using `setCounterpartBridge` function of Bridge contracts
- Approve Bridge A to transfer `50000000000` tokens
- lock `50000000000` tokens to Bridge A
- Release locked tokens to  Bridge B
- Transfer tokens
- Wallet A balance is reduced to `999999999999950000000000`

# lab 5

- Add sepolia testnet fund the account and add it to chainlink VRF website
- Get link tokens from the faucet
- Create a subscription ID
- compile [VRFv2Consumer](https://github.com/mandeep9888/bcdv_asignment/blob/8b33afcfebd8b7d81da64955192b9b19420f027e/contracts/VRFv2Consumer.sol) and Deploy with subscription ID 
- add deployed contract address a consumer to Chainlink VRF console
- Make sure you have enough LINK tokens 
- execute `requestRandomWords` function of VRFv2Consumer
- track the transaction on sepolia test
- get the random number by executing `getRequestStatus` functions

![VRF console](https://github.com/mandeep9888/bcdv_asignment/blob/8b33afcfebd8b7d81da64955192b9b19420f027e/chainLinkScreenshot.png).

![Random numbers](https://github.com/mandeep9888/bcdv_asignment/blob/8b33afcfebd8b7d81da64955192b9b19420f027e/random%20number.png).
