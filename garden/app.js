const express = require('express');
const Web3 = require('web3');

const app = express();
const port = 3000;

// Connect to local Ethereum node
const provider = new Web3.providers.http.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider);
console.log(web3.utils)
// const web3 = new Web3('http://localhost:8545');

app.use(express.json());

// API to get the balance of an Ethereum address
app.get('/balance/:address', async (req, res) => {
  const { address } = req.params;
  try {
    const balance = await web3.eth.getBalance(address);
    res.send({ balance: web3.utils.fromWei(balance, 'ether') });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// API to send a transaction
app.post('/sendTransaction', async (req, res) => {
  const { from, to, value, privateKey } = req.body;
  try {
    const signedTransaction = await web3.eth.accounts.signTransaction(
      {
        to,
        value: web3.utils.toWei(value, 'ether'),
        gas: 2000000
      },
      privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    res.send({ receipt });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Ethereum API listening at http://localhost:${port}`);
});
