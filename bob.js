$(document).ready(function(){
  console.log("hello bob with address: " + BOB_PUB);

  $("#bob-address").text(BOB_PUB);

  var balance = 0;
  
  // Specify to which commit-chain we want to connect
  const nocustManagerB = new NocustManager({
    rpcApi: web3,
    operatorApiUrl: HUB_API_URL,
    contractAddress: HUB_CONTRACT_ADDRESS,
  });

  async function callBack (transfer) {
      console.log(transfer)
      console.log("Bob is receiving a transfer of " + transfer.amount + " wei from " + transfer.wallet.address);
      $("#send-button").prop('disabled', false);
      $("#send-button").text('💸 Send To Alice');
      $("#bob-alert").text("Bob is receiving a transfer of " + transfer.amount + " wei from " + transfer.wallet.address + " with tx id " + transfer.id);
      $("#bob-alert").removeClass("d-none");
      $("#bob-balance").text('Balance: ...updating...');
      await sleep(10000);
      balance = await nocustManagerB.getNOCUSTBalance(BOB_PUB);
      $("#bob-balance").text('Balance: ' + balance);
  }

  const getMoney = () => {
    $("#send-button").prop('disabled', true);
    $("#send-button").text('Receiving...');
    $("#get-money-button").prop('disabled', true);

    const Http = new XMLHttpRequest();
    const url="https://faucet.liquidity.network/" + BOB_PUB;
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
      console.log(Http.responseText)
    }
  }

  async function register() {
    // Register an address to be used with the Nocust manager
    await nocustManagerB.registerAddress(BOB_PUB);

    // Trigger a log upon an incoming transfer
    nocustManagerB.subscribeToIncomingTransfer(BOB_PUB, callBack)

    console.log("Bob is ready to receive transfers !");
    $("#get-money-button").removeClass("d-none");
  }
  
  const sendToALice = async () => {
    $("#bob-alert").addClass("d-none");

    var val = $("#amount").val() || 0;
    val = parseInt(val);
    console.log(val);

    if(val > balance){
      $("#bob-alert").text("😭 Insufficient Funds!!");
      $("#bob-alert").removeClass("d-none");
      return;
    }

    $("#send-button").prop('disabled', true);
    $("#send-button").text('⌛ Sending...');
    $("#get-money-button").prop('disabled', true);
    
    // Send fETH on the commit-chain to Alice  
    const txId = await nocustManagerB.sendTransaction({
        to: ALICE_PUB,
        // 0.00 fEther in Wei as BigNumber. 
        amount: val,
        from: BOB_PUB,
     });
  
    console.log("Transfer to Alice sent ! Transaction ID: ", txId);
  }

  register();

  window.sendToALice = sendToALice;
  window.getMoney = getMoney;
  
});




