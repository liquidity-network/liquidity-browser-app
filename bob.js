$(document).ready(function () {
  console.log("hello bob with address: " + BOB_PUB);

  $("#bob-address").text(BOB_PUB);

  var balance = 0;

  async function callBack(transfer) {
    console.log(transfer)
    console.log("Bob is receiving a transfer of " + transfer.amount + " wei from " + transfer.wallet.address);
    $("#send-button").prop('disabled', false);
    $("#send-button").text('💸 Send To Alice');
    $("#bob-alert").text("Bob is receiving a transfer of " + transfer.amount + " wei from " + transfer.wallet.address + " with tx id " + transfer.id);
    $("#bob-alert").removeClass("d-none");
    $("#bob-balance").text('Balance: ...updating...');
    await sleep(10000);
    balance = await nocust.getBalance(BOB_PUB);
    $("#bob-balance").text('Balance: ' + balance);
  }

  // const getMoney = () => {
  //   $("#send-button").prop('disabled', true);
  //   $("#send-button").text('Receiving...');
  //   $("#get-money-button").prop('disabled', true);

  //   const xmlHttp = new XMLHttpRequest();
  //   const url = FAUCET_URL;
  //   xmlHttp.open("POST", url);
  //   xmlHttp.setRequestHeader('Content-type', 'application/json');
  //   xmlHttp.send(JSON.stringify({ "address": BOB_PUB }));
  // }

  async function register() {
    // Register an address to be used with the Nocust manager
    try {
      nocust.addPrivateKey(BOB_PRIV);
      console.log("Added private key for Bob");
      await nocust.registerWallet(BOB_PUB);
      console.log("Registered for Bob");
      // Trigger a log upon an incoming transfer
      nocust.subscribe({
        address: BOB_PUB,
        event: 'TRANSFER_CONFIRMATION',
        callback: callBack,
      });
      console.log("subscribed for Bob");

      console.log("Bob is ready to receive transfers !");
      // $("#get-money-button").removeClass("d-none");
    }
    catch (err) {
      if (err.message.includes("timeout")) {
        console.log("Restarting registration due to timeout");
        register();
      }
    }
  }

  const sendToALice = async () => {
    $("#bob-alert").addClass("d-none");

    var val = $("#amount").val() || 0;
    val = parseInt(val);
    console.log(val);

    if (val > balance) {
      $("#bob-alert").text("😭 Insufficient Funds!!");
      $("#bob-alert").removeClass("d-none");
      return;
    }

    $("#send-button").prop('disabled', true);
    $("#send-button").text('⌛ Sending...');
    // $("#get-money-button").prop('disabled', true);

    // Send fETH on the commit-chain to Alice  
    const tx = await nocust.transfer({
      from: BOB_PUB,
      to: ALICE_PUB,
      amount: 0,
    });

    console.log("Transfer to Alice sent ! Transaction ID: ", tx.txId);

    $("#send-button").text('💸 Send To Alice');
    $("#send-button").prop('disabled', false);
    alert(`'Transfer to Alice is sent! Transaction ID: ${tx.txId}`)
  }

  register();

  window.sendToALice = sendToALice;
  // window.getMoney = getMoney;
});




