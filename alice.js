$(document).ready(function () {

  console.log("hello alice with address: " + ALICE_PUB);

  $("#alice-address").text(ALICE_PUB);
  var balance = 0;

  async function callBack(transfer) {
    console.log(transfer)
    console.log("Alice is receiving a transfer of " + transfer.amount + " wei from " + transfer.wallet.address);
    $("#send-button").prop('disabled', false);
    $("#send-button").text('💸 Send To Alice');
    $("#alice-alert").text("Alice is receiving a transfer of " + transfer.amount + " wei from " + transfer.wallet.address + " with tx id " + transfer.id);
    $("#alice-alert").removeClass("d-none");
    $("#alice-balance").text('Balance: ...updating...');
    await sleep(10000);
    balance = await nocust.getBalance(ALICE_PUB);
    $("#alice-balance").text('Balance: ' + balance);
  }

  async function register() {
    try {
      nocust.addPrivateKey(ALICE_PRIV);
      await nocust.registerWallet(ALICE_PUB);
      // Trigger a log upon an incoming transfer
      nocust.subscribe({
        address: ALICE_PUB,
        event: 'TRANSFER_CONFIRMATION',
        callback: callBack,
      });

      console.log("Alice is ready to receive transfers !");
      $("#send-button").prop('disabled', false);
      $("#send-button").text('💸 Send To Alice');
    }
    catch (err) {
      if (err.message.includes("timeout")) {
        console.log("Restarting registration due to timeout");
        register();
      }
    }
  }

  register();

});