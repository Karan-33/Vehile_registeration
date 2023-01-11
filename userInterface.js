$(document).ready(function () {
    // Check
    if (!localStorage.getItem("currentLoggedInUser") || JSON.parse(localStorage.getItem("currentLoggedInUser")).userType != "user") {
        $("body").html(`Kindly<a href="home.html"> Login Here </a>First`);
    }
    else
        showUserName();
});

// Pattern Validations
var namePattern = /^[A-Za-z]*$/;
var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Show user name on welcome page 
function showUserName() {
    var currentUSer = JSON.parse(localStorage.getItem("currentLoggedInUser"));
    $("#heading").text(`Welcome ${currentUSer.firstName} ${currentUSer.lastName}`);
}

// User profile
function showUserProfile() {
    var currentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));
    var str = `<tr><th scope="col">Firstname</th><th scope="col">Lastname</th><th scope="col">Email</th><th scope="col">Password</th></tr>`;


    str += `<tr><td>${currentUser.firstName}</td><td>${currentUser.lastName}</td><td>${currentUser.email}</td><td>${currentUser.password}</td><td><button type="button" class="btn btn-primary" data-bs-target="#updateProfile" data-bs-toggle="modal" onclick="updateModalData()">Update Profile</tr>`;

    $("#profileTableBody").html(str);
}

// Modal data
function updateModalData() {
    var currentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));

    $('#firstName').val(currentUser.firstName);
    $('#lastName').val(currentUser.lastName);
    $('#emailAddress').val(currentUser.email);
    $('#password').val(currentUser.password);
}

// Updated data 
function updateUserData() {

    if (!validateUser()) {
        return;
    }

    var currentUser = JSON.parse(localStorage.getItem("currentLoggedInUser"));
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var password = $("#password").val();

    currentUser.firstName = firstName;
    currentUser.lastName = lastName;
    currentUser.password = password;

    localStorage.setItem("currentLoggedInUser", JSON.stringify(currentUser));
    $("#saveMessage").text("Profile Updated!");
    showUserName();
    showUserProfile();
}

// Validating user
function validateUser() {

    var flag = true;
    var firstName = $("#firstName").val();
    var password = $("#password").val();

    clearErorMessages();

    // Name Validation
    if (firstName == "" || namePattern.test(firstName) != true) {
        flag = false;
        $("#fnameCheck").text("Please enter a valid email");
        return flag;
    }

    // Password Validation
    if (password == "" || passwordPattern.test(password) != true) {
        $("#fpasswordCheck").text("Please enter a valid password");
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

// Update current logged user on logout
function updateCurrentUser() {
    localStorage.removeItem("currentLoggedInUser");
}