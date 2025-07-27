import React, { useState } from 'react';
import { ethers } from 'ethers';

function TransactionSimulator({ signer }) {
  const [status, setStatus] = useState('');

  const simulateTransaction = async () => {
    if (!signer) {
      setStatus('⚠️ Wallet not connected');
      return;
    }

    try {
      setStatus('🔄 Sending simulated transaction...');
      const tx = await signer.sendTransaction({
        to: await signer.getAddress(),
        value: ethers.utils.parseEther('0.00001'),
      });
      setStatus('⏳ Waiting for confirmation...');
      await tx.wait();
      setStatus('✅ ¡Transaction completed!');
    } catch (err) {
      console.error(err);
      setStatus('❌ Error sending transaction');
    }
  };

  return (
    <div className="d-inline-block m-2 text-start">
      <button
        onClick={simulateTransaction}
        className="btn btn-success"
        disabled={!signer}
      >
        Simulate Tx
      </button>
      {status && <p className="small mt-2">{status}</p>}
    </div>
  );
}

export default TransactionSimulator;