// LOGICS ARE IMPLEMENTED BELOW

// LOGIN FORM LOGIC ALL HERE
// login email
// $("#getEmail").on('click', function () {initLoginInput($(this));});
// // login password
// $("#getPassword").on('focus', function () {initLoginInput($(this))});
// // login button on press
// $("#loginButton").on('click', function () {


// These bootstrap is not making any gradual increase in time or decrease in space hence using bootstrap for validations seem unuseful.
//     // bootstrap form control
//     'use strict'
//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     const forms = document.querySelectorAll('.needs-validation')
//     // Loop over them and prevent submission
//     Array.from(forms).forEach(form => {
//         form.addEventListener('submit', event => {
//         if (!form.checkValidity()) {
//             event.preventDefault();
//             event.stopPropagation();
//         }
//         form.classList.add('was-validated');
//     }, false)
//     });
//     let validations=true;
//     validations=isValidLoginCredentials();
//     console.log(validations);
//     if(validations){
//         let users = JSON.parse(localStorage.getItem("allUsers"));
//         let userToUpdate = users.find(element => element.email === $("#getEmail").val());
//         localStorage.setItem("loggedUser", JSON.stringify(userToUpdate));
//         showGreenToast("You have Successfully Logged in !!.");
//         // show toast
//         setTimeout(function(){
//             window.location.href = "bootstrapPageHTML.html";
//         },1000);
//     }