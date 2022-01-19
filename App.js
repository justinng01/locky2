var Contracts = { BookingContract: {
    abi: [
        {
            "inputs": [],
            "name": "bookingCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "bookingList",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "bookingNo",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "documentNo",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "receiver",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "locker",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "booker",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_documentNo",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_receiver",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_locker",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_booker",
                    "type": "string"
                }
            ],
            "name": "registerNewBooking",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    address: "0x8f18188cdfb9bcfc73c4ddc23ea6a3fdf60fed51",
    endpoint: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    }}

    function BookingApp(Contract) {
    this.web3 = null;
    this.instance = null;
    this.Contract = Contract;
    }



BookingApp.prototype.bindButtons = function() {
    var that = this;

    $(document).on("click", "#button-register", function() {
        that.registerNewBooking();
    });
}
    

BookingApp.prototype.registerNewBooking = function(){
    var newDocumentID = $("#newDocumentID").val();
    var newReciever = $("#newReciever").val();
    var newLockerNumber = $("#newLockerNumber").val();
    var newBooker = $("#newBooker").val();
    $("#message").text("Registering new booking: " + newDocumentID + newReciever + newLockerNumber + newBooker);

    this.instance.registerNewBooking(newDocumentID, newReciever, newLockerNumber, newBooker,
        { from: this.web3.eth.accounts[0], gas : 1000000, gasPrice: 1000000000, gasLimit: 10000000},
        function() {
            if (receipt.status == 1) {
                $("#newDocumentID").val("");
                $("#newReciever").val("");
                $("#newLockerNumber").val("");
                $("#newBooker").val("");
            }
            else{
                $("#message").text("Registration Failed");
            }
            
        }
    )
}

BookingApp.prototype.onReady = function() {
    this.init(function () {
        $('#message').append("DApp loaded successfully.");
        });
        this.bindButtons();
    }
    




BookingApp.prototype.init = function(cb) {
    // enable and connect to MetaMask
    if (window.ethereum) {
        this.web3 = new Web3(ethereum);
    try {
        ethereum.enable();
    } catch (error) {
    }
    }

    // Create the contract interface using the ABI provided in the configuration.
    var contract_interface = this.web3.eth.contract(this.Contract.abi);
    
    // Create the contract instance for the specific address provided in the configuration.
    this.instance = contract_interface.at(this.Contract.address);
    
    cb();
}

if(typeof(Contracts) === "undefined") var Contracts={ BookingContract: { abi: [] }};
var BookingApp = new BookingApp(Contracts['BookingContract']);
    
$(document).ready(function() {
    BookingApp.onReady();
    });
    


// //Calls the bookingCount function in the smart contract
// BookingApp.prototype.getBookingCount = function (cb) {
//     this.instance.bookingCount(function (error, bookingCount) {
//         cb(error, bookingCount);
//     });
// };

// // Calls the bookingList function in the smart contract
// BookingApp.prototype.getBooking = function (bookingNo, cb) {
//     this.instance.bookingList(bookingNo, function (error, booking) {
//         cb(error, booking);
//     });
// };
