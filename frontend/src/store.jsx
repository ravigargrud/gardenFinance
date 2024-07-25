import {
    BitcoinWallet,
    BitcoinProvider,
    BitcoinNetwork,
} from "@catalogfi/wallets";

import { EVMWallet } from "@catalogfi/wallets";
import { JsonRpcProvider, Wallet } from "ethers";

import { Orderbook } from '@gardenfi/orderbook';


const bitcoinProvider = new BitcoinProvider(BitcoinNetwork.Mainnet);

// Create a bitcoin wallet from a private key
const bitcoinPk = 'YOUR BITCOIN PRIVATE KEY';
const bitcoinWallet = BitcoinWallet.fromPrivateKey(bitcoinPk, bitcoinProvider);


// Create a ethereum wallet from a private key
const ethereumProvider = new JsonRpcProvider("https://rpc.ankr.com/eth");
const privateKey = "YOUR PRIVATE KEY";
const wallet = new Wallet(privateKey, ethereumProvider);

const evmWallet = new EVMWallet(wallet);

