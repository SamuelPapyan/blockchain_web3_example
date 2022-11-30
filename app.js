const Web3 = require('web3')
require("dotenv").config()

const api = process.env.API_KEY
const rpc = `https://eth-goerli.g.alchemy.com/v2/${api}`
const contractAddress = "0x623df7fcf3ad2fa11cd28a59408cffc3f1bee2f2";
const web3 = new Web3(rpc)
const abi = require('./abi.json');
const PK = process.env.PRIVATE_KEY

const main = async ()=>
{
    const contract = new web3.eth.Contract(abi, contractAddress);
    const count = await contract.methods.getCount().call();
    console.log(count.toString());

    const encodedData = await contract.methods.increment().encodeABI()

    const tx = {
        to: contractAddress,
        gas: 10000000,
        data: encodedData
    }
    const signedTransaction = await web3.eth.accounts.signTransaction(tx, PK);
    console.log(signedTransaction);
    const response = await web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
    );
    console.log(response);
}

main();