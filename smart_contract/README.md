Creating and Deploying an Ethereum Smart Contract Using Truffle

    Prerequisites:

    Install Node.js and npm
    Install Ganache (https://archive.trufflesuite.com/ganache/)
    Install the MetaMask extension
    Install Truffle:

    npm install -g truffle

1. Initialize the Truffle Project

        truffle init

2. Generate a Smart Contract

        truffle create contract <YourContractName>

3. Compile the Contract

        truffle compile

4. Deploy the Contract

        truffle migrate

5. Verify the Deployment

        truffle console

⚠️ Note:
Before deploying, make sure to start Ganache first.
Also, modify the truffle-config.js file to configure:

    Connection to Ganache (host, port, network_id)
    The Solidity compiler version

Happy Coding! 🚀
