const { EVMWallet } = require("@catalogfi/wallets");
const { JsonRpcProvider, Wallet, ethers } = require("ethers");
const { Chains, Orderbook, Actions, parseStatus, Assets } = require('@gardenfi/orderbook');
const { BitcoinWallet, BitcoinProvider, BitcoinNetwork } = require("@catalogfi/wallets");
const { GardenJS } = require('@gardenfi/core');

const bitcoinProvider = new BitcoinProvider(BitcoinNetwork.Testnet);

// Create a bitcoin wallet from a private key
const bitcoinPk = '1468e97d3b37c09b38c1c9e66758fa57b15a5a0d5d935c2c53a401811f79a0b0';
const bitcoinWallet = BitcoinWallet.fromPrivateKey(bitcoinPk, bitcoinProvider);

// Print bitcoin wallet amount
bitcoinWallet.getBalance().then(value => console.log('Bitcoin Wallet Balance:', value));
bitcoinWallet.getAddress().then(value => console.log("Bitcoin Address:", value));

// Create an Ethereum wallet from a private key
const ethereumProvider = new JsonRpcProvider("https://rpc.ankr.com/eth_holesky");
const privateKey = "140c8fe2425392aeeb90564d18677d71f331ea2692c8ccef52bdd345748d42ef";
const wallet = new Wallet(privateKey, ethereumProvider);
const evmWallet = new EVMWallet(wallet);

console.log(evmWallet);

if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
} else {
  console.error('MetaMask is not installed. Please install it to use this dApp.');
}

async function main() {
  // Get the Ethereum signer
  const signer = await new ethers.providers.Web3Provider(window.ethereum).getSigner();

  // Initialize the orderbook
  const orderbook = await Orderbook.init({ signer });

  const wallets = {
    [Chains.bitcoin]: bitcoinWallet,
    [Chains.ethereum]: evmWallet,
  };

  // Initialize GardenJS
  const garden = new GardenJS(orderbook, wallets);

  // Define amounts for the swap
  const sendAmount = 0.0001 * 1e8;
  const receiveAmount = (1 - 0.3 / 100) * sendAmount;

  // Create a swap order
  const orderId = await garden.swap(
    Assets.bitcoin.BTC,
    Assets.ethereum.WBTC,
    sendAmount,
    receiveAmount
  );

  // Subscribe to orders
  garden.subscribeOrders(await evmWallet.getAddress(), async (orders) => {
    // Filter the order we have just created
    const order = orders.filter((order) => order.ID === orderId)[0];
    if (!order) return;

    // Get the action we can perform on the order right now
    const action = parseStatus(order);

    if (action === Actions.UserCanInitiate || action === Actions.UserCanRedeem) {
      const swapper = garden.getSwap(order);
      // If it is UserCanInitiate, this step will lock the funds in the contract.
      // If it is UserCanRedeem, this step will unlock the funds from the contract.
      const performedAction = await swapper.next();
      console.log(
        `Completed Action ${performedAction.action} with transaction hash: ${performedAction.output}`
      );
    }
  });
}

main().catch(error => {
  console.error('Error in main function:', error);
});
