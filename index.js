const Web3 = require("web3"); // Web3 1.0.0-beta.36 only for now
const BigNumber = require("bignumber.js");
const { NOCUSTManager } = require("nocust-client");

window.getWeb3 = function() {
  return Web3;
};

window.getBigNumber = function() {
  return BigNumber;
};

window.getNocustManager = function() {
  return NOCUSTManager;
};
