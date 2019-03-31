const HUB_CONTRACT_ADDRESS = "0xb0f0FE02b1B9A6167E93d382bdeE68521B0f3022";
const HUB_API_URL = "https://rinkeby.liquidity.network/";
const RPC_URL = "https://rinkeby.infura.io/";



const Web3 = getWeb3();
const BigNumber = getBigNumber();
const NocustManager = getNocustManager();

const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
const wallets = web3.eth.accounts.wallet.create(2);


const BOB_PUB = wallets[0].address;
const BOB_PRIV =  wallets[0].privateKey;

const ALICE_PUB = wallets[1].address;
const ALICE_PRIV = wallets[1].privateKey;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}