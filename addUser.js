// Pattern Validations
var namePattern = /^[A-Za-z]*$/;
var emailPattern = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


// Validating user
function validateUser(){

    var flag = true;
    var users = JSON.parse(localStorage.getItem("users"));
    clearErorMessages();

    // Name Validation
    if($("#firstName").val() == "" || namePattern.test($("#firstName").val()) != true){
        flag = false;
        $("#fnameCheck").text("Please enter a valid name");
        return flag;
    }

    // Email Validation
    if ($("#emailAddress").val() == "" || emailPattern.test($("#emailAddress").val()) != true ) {
        $("#femailCheck").text("Please enter a valid mail");
        flag = false;
        return flag;
    }
    

    // Password Validation
    if ($("#password").val() == "" || passwordPattern.test($("#password").val()) != true) {
        $("#fpasswordCheck").text("Please enter a valid password");
        flag = false;
        return flag;
    }

    // Status Valdation
    if($("#status").is(":checked") != true){
        $("#fstatusCheck").text("Please check the status of a user");
        flag = false;
        return flag;
    }

    return flag;
}

// Clear erors
function clearErorMessages() {
    let erors;
    erors = document.getElementsByClassName("formeror");
    // console.log(erors);

    for (let item of erors) {
        item.innerHTML = "";
    }
}

// save user
function registerUser(){

    var transactionArray=[];
    var users = JSON.parse(localStorage.getItem("users"));
    if(!validateUser()){
        return;
    }
    else if(users.some(em=> $("#emailAddress").val() == em.email) == true){
        $("#femailCheck").text("Email already exist , Enter a different email");
        flag = false;
        return flag;
    }

    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var email = $('#emailAddress').val();
    var password = $('#password').val();
    var status = $('#status').val();

    var userObj = {
        firstName : firstName,
        lastName : lastName,
        email : email,
        password : password,
        transactions : transactionArray,
        status : status,
        userType : "user"
    }
    
    users.push(userObj);
    localStorage.setItem("users",JSON.stringify(users));
    clearFields();
    location.replace( "adminUsersPage.html");
}

// Clear Input Fields
function clearFields(){
    $('#firstName').val("");
    $('#lastName').val("");
    $('#emailAddress').val("");
    $('#password').val("");
    $('#status').val("");
}