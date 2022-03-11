var addButton = document.getElementById("add-button");
var USD_amnt = document.getElementById("usd-amount");
var LBP_amnt = document.getElementById("lbp-amount");
var trans_type = document.getElementById("transaction-type");
var sell_USD_rate = document.getElementById("sell-usd-rate");
var buy_USD_rate = document.getElementById("buy-usd-rate");

var SERVER_URL = "http://127.0.0.1:5000"

var trans_type = document.getElementById("transaction-type");

addButton.addEventListener("click", addItem);


async function addItem() {
    var in_usd = USD_amnt.value;
    var in_lbp = LBP_amnt.value;
    var type_trans_val = false;
    if (trans_type.value == "usd-to-lbp") {
        type_trans_val = true;
    }
    //var usd_to_lbp_b = (trans_type.value == "usd-to-lbp");
    console.log(in_usd, in_lbp)
    const data = {usd_amount: in_usd, lbp_amount: in_lbp, usd_to_lbp: type_trans_val}

    fetch(`${SERVER_URL}/transaction`, {
        method: 'POST',
        mode: 'cors',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    //USD_amnt.value = null;
    //LBP_amnt.value = null;
    fetchRates();
}

function fetchRates() {
    fetch(`${SERVER_URL}/exchangeRate`)
    .then(response => response.json())
    .then(data => {
        buy_USD_rate.innerHTML = data["lbp_to_usd"]
        sell_USD_rate.innerHTML = data["usd_to_lbp"]
    });
   }
   fetchRates();



