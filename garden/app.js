const { EVMWallet } = require("@catalogfi/wallets");
const { JsonRpcProvider, Wallet, ethers } = require("ethers");
const { Orderbook } = require('@gardenfi/orderbook');


const {
  BitcoinWallet,
  BitcoinProvider,
  BitcoinNetwork,
} = require("@catalogfi/wallets");



const bitcoinProvider = new BitcoinProvider(BitcoinNetwork.Testnet)

// Create a bitcoin wallet from a private key
const bitcoinPk = '1468e97d3b37c09b38c1c9e66758fa57b15a5a0d5d935c2c53a401811f79a0b0';
const bitcoinWallet = BitcoinWallet.fromPrivateKey(bitcoinPk, bitcoinProvider);

// Print bitcoin wallet amount
bitcoinWallet.getBalance().then(value => console.log(value));

// Create a ethereum wallet from a private key
const ethereumProvider = new JsonRpcProvider("https://rpc.ankr.com/eth_holesky");
// const privateKey = "a995a8718cc7b1e1e90405305d270f0f5f60111aedf5deeffc4702a38f04afad";
const privateKey = "1468e97d3b37c09b38c1c9e66758fa57b15a5a0d5d935c2c53a401811f79a0b0";
const wallet = new Wallet(privateKey, ethereumProvider);
const evmWallet = new EVMWallet(wallet);

console.log(evmWallet)
// Get the Ethereum wallet balance
// ethereumProvider.getBalance(wallet.address).then(balance => {
//   // The balance is in Wei, convert it to Ether
//   const etherString = ethers.utils.formatEther(balance);
//   console.log('Ethereum Wallet Balance:', etherString);
// }).catch(error => {
//   console.error('Error fetching Ethereum wallet balance:', error);
// });