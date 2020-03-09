# Liquidity Browser App Example

Super simple one-click browser wallets, transferring coins over a NOCUST hub.

Clone, and just execute index.html in your favorite browser!


## How is bundle.js generated?

Bundle.js is a browser friendly compilation of all dependencies required to use nocust-client

1) A dummy npm project with index.js 
  ```
  const Web3 = require('web3') // Web3 1.0.0-beta.37 only for now
  const BigNumber = require('bignumber.js')
  const { NocustManager } = require('nocust-client')

  window.getWeb3 = function(){
      return Web3;
  };

  window.getBigNumber = function(){
    return BigNumber;
  };

  window.getNocustManager = function(){
    return NocustManager;
  };
  ```

2) package.json including dependencies as in [here](https://liquidity-network.github.io/nocust-client-library/docs/getting-started)

3) then dependencies are bundled using browserify
  ```
  browserify index.js -o bundle.js
  ```
