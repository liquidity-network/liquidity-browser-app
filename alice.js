$(document).ready(function(){

  console.log("hello alice with address: " + ALICE_PUB);

  $("#alice-address").text(ALICE_PUB);

  // Setup the LQDManager
  const lqdManagerA = new LQDManager({
    rpcApi: web3,
    hubApiUrl: HUB_API_URL,
    contractAddress: HUB_CONTRACT_ADDRESS,
  });

  function callBack (transfer) {
      console.log(transfer)
      console.log("Alice received a transfer of 0 wei from " + transfer.wallet.address);
      $("#send-button").prop('disabled', false);
      $("#send-button").text('💸 Send To Alice');
      $("#alice-alert").text("Alice received a transfer of " + transfer.amount + " wei from " + transfer.wallet.address + " with tx id " + transfer.id);
      $("#alice-alert").removeClass("d-none");
      $("#get-money-button").prop('disabled', false);
  }

  async function register() {
    // Register an address to be used with the LQD manager
    const incomingTransferEventEmitter = await lqdManagerA.register(ALICE_PUB);

    // Trigger a log upon an incoming transfer
    incomingTransferEventEmitter.on('IncomingTransfer', callBack)

    console.log("Alice is ready to receive transfers !");
    $("#send-button").prop('disabled', false);
    $("#send-button").text('Send To Alice');
  }

  register();

});