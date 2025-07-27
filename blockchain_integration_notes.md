Blockchain Integration Notes
This document outlines the implementation of wallet connection, network detection, and transaction feedback for the technical test task.

🔗 Wallet Connection & Network Detection
We use MetaMask as the wallet provider and ethers.js to handle blockchain interactions.

The main logic is implemented in WalletConnect.js, which:

Connects to the user's wallet using eth_requestAccounts.

Retrieves the connected address and the network name using ethers.providers.Web3Provider.

Listens for events:

accountsChanged → triggers reconnection.

chainChanged → reloads the page to stay in sync.

Displays the connected address and network in the UI.

Includes a "Disconnect" button that clears local state (note: MetaMask cannot be fully disconnected from frontend logic).

👇 Example
js
Copiar
Editar
if (window.ethereum) {
  window.ethereum.on('accountsChanged', () => connectWallet());
  window.ethereum.on('chainChanged', () => window.location.reload());
}
⚙️ UI Feedback: Transaction Lifecycle
The TransactionSimulator.js component performs a simple simulation by sending ETH from the connected account to itself. It shows real-time feedback throughout the transaction lifecycle:

🔄 Sending transaction...

⏳ Waiting for confirmation...

✅ Transaction completed!

❌ Error if the transaction fails

It uses the signer.sendTransaction method from ethers.js and waits for confirmation using tx.wait().

👇 Core logic
js
Copiar
Editar
const tx = await signer.sendTransaction({
  to: await signer.getAddress(),
  value: ethers.utils.parseEther("0.00001"),
});
await tx.wait();
setStatus("✅ Transaction completed!");
🧠 Component Integration Strategy
To avoid duplicate connection buttons and ensure clean data flow:

The Navbar component holds the shared state (provider, signer).

WalletConnect receives a prop onWalletConnected and updates the parent with the connected provider and signer.

TransactionSimulator receives the signer as a prop and disables the "Simulate Tx" button if not connected.

This architecture ensures clear separation of concerns and smooth inter-component communication.

📂 Relevant Files
src/components/WalletConnect.js

src/components/TransactionSimulator.js

src/components/Navbar.jsx

🧪 How to Test
Run the project:

bash
Copiar
Editar
npm start
Click Connect Wallet to connect MetaMask.

Confirm the address and network are displayed.

Click Simulate Tx and follow the feedback status.

✅ Notes
We use ethers.js v5.x (already included in the project).

No additional dependencies were installed.

Styles are fully compatible with Bootstrap.

The UI is responsive and consistent with the original project design.

