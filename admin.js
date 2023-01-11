// Check
if(!localStorage.getItem("currentLoggedInUser") || JSON.parse(localStorage.getItem("currentLoggedInUser")).userType != "admin"){
    $("body").html(`Kindly<a href="home.html"> Login Here </a>First`);    
}

// Update current logged user on logout
function logOut() {
    localStorage.removeItem("currentLoggedInUser");
}

//All Users Transactions

function showAllTransaction() {
    var str="";
    var users = JSON.parse(localStorage.getItem('users'));

    if($("#userDropDown").val() == "" ){
        str="";
    }

    else if($("#userDropDown").val() == "All"){
        // var currentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));
        str += `<tr><th scope="col">VehicleNumber</th><th scope="col">VehicleType</th><th scope="col">VehiclePrice</th><th scope="col">RegisterDate</th><th scope="col">CreatedBy</th><th scope="col">Creator Email</th></tr>`;

        for (let i of users) {
            if (i.userType != "admin")
                for (let j of i.transactions)
                    str += `<tr><td>${j.vehicleNumber}</td><td>${j.vehicleType}</td><td>${j.vehiclePrice}</td><td>${j.registerDate}</td><td>${i.firstName} ${i.lastName}</td><td>${i.email}</td></tr>`;
        }
    }

    else{
        console.log($("#userDropDown").val());
        var currentUser = users.find(em=>em.email == $("#userDropDown").val())

        str += `<tr><th scope="col">VehicleNumber</th><th scope="col">VehicleType</th><th scope="col">VehiclePrice</th><th scope="col">RegisterDate</th><th scope="col">CreatedBy</th><th scope="col">Creator Email</th></tr>`;

        for(let i of currentUser.transactions){
            str += `<tr><td>${i.vehicleNumber}</td><td>${i.vehicleType}</td><td>${i.vehiclePrice}</td><td>${i.registerDate}</td><td>${currentUser.firstName} ${currentUser.lastName}</td><td>${currentUser.email}</td></tr>`;
        }

    }

    $("#transactionTableBody").html(str);
}


function usersDropDown() {
    showDD();

    var users = JSON.parse(localStorage.getItem('users'));

    var str =`<option value="" class="dropdown-item" selected>None</option>`;
    str += `<option value="All" class="dropdown-item" >All</option>`;

    for (let i of users) {
        if (i.userType != "admin")
            str += `<option value="${i.email}" class="dropdown-item">${i.firstName} ${i.lastName}</option>`;
    }

    $("#userDropDown").html(str);
}

function showDD() {
    $("#transactionsDD").css("display", "block");
}

function hideTransactions(){
    $("#transactionsDD").hide();
    // $(".showUsersTransactions").hide();
}