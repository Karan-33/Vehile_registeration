// Check
if(!localStorage.getItem("currentLoggedInUser") || JSON.parse(localStorage.getItem("currentLoggedInUser")).userType != "admin"){
    $("body").html(`Kindly<a href="home.html"> Login Here </a>First`);    
}

$( document ).ready(function() {
    showUsers();
});
 
function showUsers(){
    var users = JSON.parse(localStorage.getItem("users"));
    if(users.length>1)
        var str=`<tr><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Password</th><th scope="col">Status</th></tr>`;
    for(let i of users){
        if(i.userType == 'user'){
            str+=`<tr><td>${i.firstName} ${i.lastName}</td><td>${i.email}</td><td>${i.password}</td><td>${i.status}</td></tr>`;
        }
    }

    $("#tableBody").html(str);
}