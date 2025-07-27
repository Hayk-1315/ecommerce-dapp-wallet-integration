import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function WalletConnect({ onWalletConnected }) {
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState('');

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask no está instalado');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      const { name } = await provider.getNetwork();

      setAddress(userAddress);
      setNetwork(name);
      if (onWalletConnected) onWalletConnected(provider, signer);
    } catch (err) {
      console.error('Error connecting to MetaMask:', err);
    }
  };

  const disconnectWallet = () => {
  setAddress('');
  setNetwork('');

};

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => connectWallet());
      window.ethereum.on('chainChanged', () => window.location.reload());
    }
  }, []);

  return (
  <div className="d-flex flex-column align-items-start mx-2">
    {!address ? (
      <button onClick={connectWallet} className="btn btn-outline-primary">
        Connect Wallet
      </button>
    ) : (
      <>
        <button onClick={disconnectWallet} className="btn btn-outline-danger mb-1">
          Disconnect
        </button>
        <div className="text-start small">
          <div><strong>Address:</strong> {address.slice(0, 6)}...{address.slice(-4)}</div>
          <div><strong>Network:</strong> {network}</div>
        </div>
      </>
    )}
  </div>
);
}

export default WalletConnect;