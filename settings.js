// const HUB_CONTRACT_ADDRESS = "0x66b26B6CeA8557D6d209B33A30D69C11B0993a3a";
const HUB_CONTRACT_ADDRESS = "0x01A6cC0201F51fc6e016DB734489799031881fD3";
const HUB_API_URL = "https://rinkeby-v2.liquidity.network/";
// const HUB_API_URL = "http://localhost:8123/";
const RPC_URL = "https://rinkeby.infura.io/v3/1e82e39a71a24c6680a9e3feabe71106";
// const RPC_URL = "http://localhost:8545/";
// const FAUCET_URL = "https://rinkeby-faucet.liquidity.network";


const nocust = getNocust();
const web3 = new Web3();

const wallets = web3.eth.accounts.wallet.create(2);

const BOB_PUB = wallets[0].address;
const BOB_PRIV = wallets[0].privateKey;

const ALICE_PUB = wallets[1].address;
const ALICE_PRIV = wallets[1].privateKey;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function init() {
    await nocust.init({
        contractAddress: HUB_CONTRACT_ADDRESS,
        operatorUrl: HUB_API_URL,
        rpcUrl: RPC_URL
    });
}

init();
