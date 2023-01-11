$(document).ready(function () {
    if (!localStorage.getItem("currentLoggedInUser") || JSON.parse(localStorage.getItem("currentLoggedInUser")).userType != "user") {
        $("body").html(`Kindly<a href="home.html"> Login Here </a>First`);
    }
    else{
        var currentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));
    $("#heading").text(`Welcome ${currentUser.firstName} ${currentUser.lastName}`);    
    $("#createdBy").val(`${currentUser.firstName} ${currentUser.lastName}`);
    console.log($("#createdBy").text());
    showTransaction();
    }
});


function showTransaction() {

    var currentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));
    
    if(currentUser["transactions"].length>0){
        var str = `<tr><th scope="col">VehicleNumber</th><th scope="col">VehicleType</th><th scope="col">VehiclePrice</th><th scope="col">RegisterDate</th><th scope="col">CreatedBy</th></tr>`;
        for (let i of currentUser.transactions) {
            str += `<tr><td>${i.vehicleNumber}</td><td>${i.vehicleType}</td><td>${i.vehiclePrice}</td><td>${i.registerDate}</td><td>${currentUser.firstName} ${currentUser.lastName}</td></tr>`;
        }
    }    
    // console.log(currentUser["transactions"]);
    $("#transactionTableBody").html(str);
}

// Vehicle validation
function vehicleValidation(){

    var flag = true;
    clearErorMessages();

    // Vehicle Number
    if($("#vehicleNumber").val() == ""){
        $("#fnumberCheck").text("Please enter a valid vehicle number");
        flag = false;
        return flag;
    }

    // Price
    if($("#vehiclePrice").val()=="" || $("#vehiclePrice").val()<0){
        $("#fpriceCheck").text("Please enter a valid price");
        flag = false;
        return flag;
    }

    // Registeration Date
    if($("#regDate").val()==""){
        $("#fdateCheck").text("Please select a valid date");
        flag = false;
        return flag;
    }

    return flag;

}

// Clear erors
function clearErorMessages() {
    let erors;
    erors = document.getElementsByClassName("formeror");
    
    for (let item of erors) {
        item.innerHTML = "";
    }
}

// Save Transaction Details
function saveTransaction(){

    var currentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));    
    var users = JSON.parse(localStorage.getItem("users"));
    var user = users.find(em=>em.email == currentUser.email);
    console.log(user);

    if(!vehicleValidation()){
        return;
    }

    var vehicleNumber = $("#vehicleNumber").val();
    var vehicleType = $("#vehicleType").val();
    var price = $("#vehiclePrice").val();
    var regDate= $("#regDate").val();
    var creator = $("#createdBy").val();

    var transactionObj={
        vehicleNumber : vehicleNumber,
        vehicleType : vehicleType,
        vehiclePrice : price,
        registerDate : regDate,
        createdBy : creator
    };


    currentUser["transactions"].push(transactionObj);
    user["transactions"].push(transactionObj);
    localStorage.setItem("currentLoggedInUser",JSON.stringify(currentUser));
    localStorage.setItem('users',JSON.stringify(users));
    $("#message").text("Data Saved Successfully!");
    
    clearInputFields();
    showTransaction();
}

// Clear Input Fields
function clearInputFields(){
    $("#vehicleNumber").val("");
    $("#vehicleType").val("");
    $("#vehiclePrice").val("");
    $("#regDate").val("");
}