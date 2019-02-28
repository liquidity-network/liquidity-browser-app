$(document).ready(function(){

  console.log("hello alice with address: " + ALICE_PUB);

  $("#alice-address").text(ALICE_PUB);
  var balance = 0;

  // Setup the NocustManager
  const nocustManagerA = new NocustManager({
    rpcApi: web3,
    hubApiUrl: HUB_API_URL,
    contractAddress: HUB_CONTRACT_ADDRESS,
  });

  async function callBack (transfer) {
      console.log(transfer)
      console.log("Alice is receiving a transfer of "+ transfer.amount + " wei from " + transfer.wallet.address);
      $("#send-button").prop('disabled', false);
      $("#send-button").text('💸 Send To Alice');
      $("#alice-alert").text("Alice is receiving a transfer of " + transfer.amount + " wei from " + transfer.wallet.address + " with tx id " + transfer.id);
      $("#alice-alert").removeClass("d-none");
      balance = await nocustManagerA.getNocustBalance(ALICE_PUB);
      $("#alice-balance").text('Balance: ' + balance);
  }

  async function register() {
    // Register an address to be used with the Nocust manager
    await nocustManagerA.registerAddress(ALICE_PUB);
    
    // Trigger a log upon an incoming transfer
    nocustManagerA.subscribeToIncomingTransfer(ALICE_PUB, callBack)

    console.log("Alice is ready to receive transfers !");
    $("#send-button").prop('disabled', false);
    $("#send-button").text('💸 Send To Alice');
  }

  register();

});