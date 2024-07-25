import React, { useEffect, useState, createContext, useContext } from 'react';
import { EVMWallet } from '@catalogfi/wallets';
import { BrowserProvider } from 'ethers';
import { GardenJS } from '@gardenfi/core';
import { Orderbook, Chains } from '@gardenfi/orderbook';
import {
  BitcoinNetwork,
  BitcoinOTA,
  BitcoinProvider,
} from '@catalogfi/wallets';

// Contexts
const MetaMaskContext = createContext();
const GardenContext = createContext();
const SignContext = createContext();

// Network configuration on testnet
const networkConfig = {
    chainId: '17000',
    chainName: 'Ethereum testnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ankr.com/eth_holesk'],
};

// MetaMask provider component
const MetaMaskProvider = ({ children }) => {
  const [metaMaskIsConnected, setMetaMaskIsConnected] = useState(false);
  const [evmProvider, setEvmProvider] = useState(null);

  const connectMetaMask = async () => {
    if (window.ethereum !== null) {
      let provider = new BrowserProvider(window.ethereum);
      let network = await provider.getNetwork();
      if (network.chainId !== 31337n) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [networkConfig],
        });
        provider = new BrowserProvider(window.ethereum);
      }
      setEvmProvider(provider);
      setMetaMaskIsConnected(true);
    } else {
      throw new Error('MetaMask not Found');
    }
  };

  return (
    <MetaMaskContext.Provider value={{ metaMaskIsConnected, evmProvider, connectMetaMask }}>
      {children}
    </MetaMaskContext.Provider>
  );
};

// Garden provider component
const GardenProvider = ({ children }) => {
  const [garden, setGarden] = useState(null);
  const [bitcoin, setBitcoin] = useState(null);

  return (
    <GardenContext.Provider value={{ garden, bitcoin, setGarden, setBitcoin }}>
      {children}
    </GardenContext.Provider>
  );
};

// Sign provider component
const SignProvider = ({ children }) => {
  const [isMMPopupOpen, setIsMMPopupOpen] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  return (
    <SignContext.Provider value={{ isMMPopupOpen, setIsMMPopupOpen, isSigned, setIsSigned }}>
      {children}
    </SignContext.Provider>
  );
};

// Custom hooks for accessing context values
const useMetaMaskStore = () => useContext(MetaMaskContext);
const useGarden = () => useContext(GardenContext);
const useSignStore = () => useContext(SignContext);

// Only to be used once at the root level
const useGardenSetup = () => {
  const { evmProvider } = useMetaMaskStore();
  const { setGarden, setBitcoin } = useGarden();

  useEffect(() => {
    (async () => {
      if (!evmProvider) return;
      const signer = await evmProvider.getSigner();

      const bitcoinProvider = new BitcoinProvider(
        BitcoinNetwork.Regtest,
        'http://localhost:30000'
      );

      const orderbook = await Orderbook.init({
        url: 'http://localhost:8080',
        signer: signer,
        opts: {
          domain: window.location.host,
          store: localStorage,
        },
      });

      const wallets = {
        [Chains.bitcoin_regtest]: new BitcoinOTA(bitcoinProvider, signer),
        [Chains.ethereum_localnet]: new EVMWallet(signer),
      };

      const garden = new GardenJS(orderbook, wallets);

      setGarden(garden);
      setBitcoin(wallets[Chains.bitcoin_regtest]);
    })();
  }, [evmProvider, setGarden, setBitcoin]);
};

// Root component
const MainContextProvider = ({children}) => {

  useGardenSetup();

  return (
    <MetaMaskProvider>
      <GardenProvider>
        <SignProvider>
            {children}
        </SignProvider>
      </GardenProvider>
    </MetaMaskProvider>
  );
};

export { useMetaMaskStore, useGarden, useGardenSetup, useSignStore, MainContextProvider };
