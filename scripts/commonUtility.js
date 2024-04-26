console.log("common utility.");

function f(){
    console.log("alsdkf;sadkfj");
}


// INITIALS LOCAL STORAGE TO GET USER COUNT -> allUsers -> pLangs -> pskills
if(!localStorage.getItem("allUsers")){
    var myArray = [{"id":0,"fname":"user0f","lname":"user0l","dob":"date","address":"hahaha","role":{"adminuser":["read","write"]},"gender":"aintKnow","preferredlanguage":"none","programmingSkills":["nothing","nothin2"],"email":"user@gmail.com","contact":"0000000000","password":"User@123"}];
    localStorage.setItem("allUsers",JSON.stringify(myArray));
}
if(!localStorage.getItem("preferredLanguages")){
    var preferredLanguages = ["English","Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "Gujarati", "Kannada", "Odia", "Punjabi"];
    localStorage.setItem("preferredLanguages",JSON.stringify(preferredLanguages));
}
if(!localStorage.getItem("programmingSkills")){
    var programmingSkills = ["Problem Solving", "Algorithm Design", "Data Structures", "OOPs", "Functional Programming", "Web Development", "Mobile App Development", "Database Management", "Network Programming", "Game Development", "Machine Learning", "Artificial Intelligence", "Data Analysis", "Cloud Computing", "DevOps", "Blockchain Development", "Cybersecurity", "Software Testing", "Embedded Systems", "UI/UX Design", "Scripting", "Version Control", "(CI/CD)", "Agile Methodologies", "Scrum", "Kanban", "Technical Writing", "Project Management", "Team Collaboration", "Debugging", "Code Review"];
    localStorage.setItem("programmingSkills",JSON.stringify(programmingSkills));
}
// chnange the logic to availability




// INITIALING STUFF




// FUNCTIONS UTILITIES
const FnameRegex = /^[a-zA-Z]{1,}$/;
const LnameRegex = /^[a-zA-Z]{0,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,16}$/;
const contactRegex = /^\d{10}$/;
var curDate;
var updateObj;

// GENERAL FUNCTIONS
// red and revert border of element
function redBorder(ele) { ele.css('border-color', '#ff0000'); }
function revertBorder(ele) { ele.css('border-color', '#5e6278'); }
// nullify the value of element
function Nullify(ele) { ele.val(''); }
// check buttons nullify
function NullifyCheck(ele) { ele.prop('indeterminate', false); ele.prop('checked', false); }
// show red toast
function showRedToast(msg) {
    $("#redToastMsgID").text(msg);
    $("#viewRedToast").toast("show");
}
// show green toast
function showGreenToast(msg) {
    $("#greenToastMsgID").text(msg);
    $("#viewGreenToast").toast("show");
}
// display span of element
function DisplaySpan(ele) {
    ele.css('visibility', 'visible');
    ele.css('position', 'relative');
}
// remove the span showed before
function removeSpan(ele) {
    ele.css('visibility', 'hidden');
    ele.css('position', 'absolute');
}


// LOGIN FORM SPECIFIC FUNCTIONS
// DISABLE LOGIN BUTTON
function disableLogin() {
    console.log("this is disable.")
    if ($("#getEmail").val() === "") {$("#loginButton").prop('disabled', true);}
    else {$("#loginButton").prop('disabled', false);}
}
// INITIATE LOGIN INPUTS, SPANS WHEN INPUT IS CLICKED
function initLoginInput(init){
    disableLogin();
    revertBorder($(init));
}
// PERFORM IF LOGIN CREDENTIALS ARE INVALID
function invalidateLogin(){
    showRedToast("Invalid Credentials, Please try again!!");
    disableLogin();
    redBorder($("#getEmail"));
    redBorder($("#getPassword"));
}
// LOGIN FORM USER CREDENTIALS CHECKS
function isValidLoginCredentials() {
    let flag = false;
    let users = JSON.parse(localStorage.getItem("allUsers"));
    if(users){
        let userToUpdate = users.find(element => element.email === $("#getEmail").val());
        if (userToUpdate) {
            if (userToUpdate.password === $("#getPassword").val()) {
                localStorage.setItem("loggedUser", JSON.stringify(userToUpdate));
                flag=true;
            }
        }
    }
    return flag;
}


// FORGOT MODAL SPECIFIC FUNCTIONS
// DISABLE FORGOT BUTTON
function disableForgetButton() {
    if ($("#getForgotEmail").val() === "" || $("#getForgotPassword").val() === "") {$("#forgotButton").prop('disabled', true);}
    else {$("#forgotButton").prop('disabled', false);}
}
// INITIATE FORGOT INPUTS, SPANS WHEN INPUT IS CLICKED
function initForgotInput(init,span){
    disableForgetButton();
    revertBorder($(init));
    removeSpan($(span));
}
// PERFORM IF FORGOT INPUT IS INVALID
function invalidateForgotInput(input,span){
    disableForgetButton();
    redBorder($(input));
    Nullify($(input));
    DisplaySpan($(span));
    return false;
}
// PERFORM IF FORGOT CREDENTIALS ARE INVALID
function invalidateForgot(){
    showRedToast("Invalid Credentials, Please try again!!");
    disableLogin();
    redBorder($("#getEmail"));
    redBorder($("#getPassword"));
    document.getElementById("loginForm").reset();
}
// PERFORM
// FORGOT EMAIL CHECKS
function isValidForgotMail() {
    let flag = false;
    let users = JSON.parse(localStorage.getItem("allUsers"));
    if(users){
        let userToUpdate = users.find(element => element.email === $("#getForgotEmail").val());
        if (userToUpdate) { flag = true; }
    }
    return flag;
}
// FORGOT PASSWORD CHECK
function isValidForgotPassword() {
    return passwordRegex.test($("#getForgotPassword").val());
}
// FORGOT CONFIRM PASSWORD CHECK
function isValidForgotConfirmPassword() {
    if (isValidForgotPassword()) {return ($("#getForgotPassword").val() === $("#getForgotConfirmPassword").val());}
    return false;
}
// forgot password changes
function getAndChangePassword() {
    let users = JSON.parse(localStorage.getItem("allUsers"));
    let userToUpdate = users.find(element => element.email === $("#getForgotEmail").val());
    userToUpdate.password = $("#getForgotPassword").val();
    localStorage.setItem("allUsers", JSON.stringify(users));
}


// SIGNUP MOPDAL SPECIFIC FUNCTIONS
// DISABLE SINGUP BUTTON
function disableSignup() {
    if ($("#getModalFname").val() === "" ||
        $("#getModalDOB").val() === "" ||
        !($("#getModalGenderMale").is(":checked") ||
            $("#getModalGenderFemale").is(":checked") ||
            $("#getModalGenderOther").is(":checked")) ||
        !($("#getModalAdminReadCheck").is(":checked") ||
            $("#getModalAdminWriteCheck").is(":checked") ||
            $("#getModalUserReadCheck").is(":checked") ||
            $("#getModalUserWriteCheck").is(":checked")) ||
        $("#getModalPreferredLanguage").val() === "" ||
        $("#getModalProgrammingSkill").val() === "" ||
        $("#getModalEmail").val() === "" ||
        $("#getModalContact").val() === "" ||
        $("#getModalPassword").val() === "") {
        $("#signupButton").prop('disabled', true);
    } else {
        $("#signupButton").prop('disabled', false);
    }
}
// SIGNUP/EDIT INPUT INITIATE WHEN CLICKED
function initModalInput(input,span){
    // disableSignup();
    revertBorder($(input));
    removeSpan($(span));
}
// SIGNUP/EDIT CKECK BOX INITIATE WHEN CLICKED
function initModalCheck(check){
    // disableSignup();
    removeSpan($(check));
}
// SIGNUP/EDIT INPUT INVALIDATING ON CHANGE
function invalidateModalChangeInput(input,span){
    // disableSignup();
    redBorder($(input));
    DisplaySpan($(span));
}
// SIGNUP/EDIT INPUT INVALIDATING ON SUBMIT ALSO RETURN FALSE
function invalidateModalInput(input,span){
    // disableSignup();
    redBorder($(input));
    Nullify($(input));
    DisplaySpan($(span));
    return false;
}
// SINGUP/EDIT MODAL FNAME CHECK
function isValidModalFName(input) {
    return FnameRegex.test($(input).val());
}
// SINGUP/EDIT LNAME CHECK
function isValidModalLName(input) {
    return LnameRegex.test($(input).val());;
}
// SINGUP/EDIT DATE CHECK
function isValidModalDate(input) {
    curDate = new Date()
    if ($(input).val() === "") {
        return false;
    }
    return (($(input).val()) <= ((curDate.getFullYear() - 15).toString() + "-" + (curDate.getMonth() + 1).toString() + "-" + curDate.getDate().toString()));
}
// SINGUP/EDIT ADRESS CHECK
function isValidModalAddress(input) {
    return true;
}
// SINGUP only ROLE CHECK
function isValidModalRole() {
    return $("#getModalAdminCheck").prop('indeterminate') || $("#getModalUser").prop('indeterminate') || $("#getModalUserCheck").is(':checked') || $("#getModalAdminCheck").is(':checked') || $("#getModalAdminReadCheck").is(':checked') || $("#getModalAdminWriteCheck").is(':checked') || $("#getModalUserReadCheck").is(':checked') || $("#getModalUserWriteCheck").is(':checked');
}
// SINGUP/EDIT GENDER CHECK
function isValidModalGender(inputMale,inputFemale,inputOther) {
    return $(inputMale).is(':checked') || $(inputFemale).is(':checked') || $(inputOther).is(':checked');
}
function invalidateGender(inputMale,inputFemale,inputOther,span){
    NullifyCheck($(inputMale));
    NullifyCheck($(inputFemale));
    NullifyCheck($(inputOther));
    DisplaySpan($(span));
    return false;
}
// SINGUP/EDIT PREFERRED LANGUAGE CHECK
function isValidModalPrefLang(input) {
    if ($(input).val() === ""){return false;}
    return true;
}
// SINGUP/EDIT PROGAMMING SKILLS CHECK
function isValidModalProgSkil(input) {
    if (skillsArray.length === 0){return false;}
    return true;
}
// SINGUP EMAIL CHECK
function isValidModalEmail() {
    let users = JSON.parse(localStorage.getItem("allUsers"));
    if(users){
        let userToUpdate = users.find(element => element.email === $("#getModalEmail").val());
        if (userToUpdate) { return false; }
    }
    return emailRegex.test($("#getModalEmail").val());
}
// EDIT EMAIL CHECK
function isValidEditEmail() {
    return emailRegex.test($("#profileEditEmail").val());
}
// SINGUP/EDIT CONTACT CHECK
function isValidModalContact(input) {return contactRegex.test($(input).val());}
// SINGUP/EDIT PASSWORD CHECK
function isValidModalPassword() {return passwordRegex.test($("#getModalPassword").val());}
// SINGUP/EDIT CONFIRM PASSWORD CHECK
function isValidModalConfirmPassword() {
    if (isValidModalPassword()) {return ($("#getModalPassword").val() === $("#getModalConfirmPassword").val());}
    return false;
}
// PROFILE EDIT PASSWORD
function isValidEditPassword() {
    if($("#profileEditPassword").val()==""){return true;}
    return passwordRegex.test($("#profileEditPassword").val());
}
// PROFILE EDIT CONFIRM PASSWORD
function isValidEditConfirmPassword() {
    if (isValidEditPassword()) {return ($("#profileEditPassword").val() === $("#profileEditConfirmPassword").val());}
    return false;
}
// RESET SIGNUP MODAL INPUTS
function resetSignup(){
    // nullify values then rever borders and then remove spans
    document.getElementById("signupModalForm").reset();
    revertBorder($(".modalInput"));
    removeSpan($(".invalidSpan"));
}
// RESET PROFILE EDIT MODAL INPUTS
function resetProfileEdit(){
    // nullify values then rever borders and then remove spans
    document.getElementById("profileEditModalForm").reset();
    removeSpan($(".alertSpan"));
    revertBorder($(".editInput"));
}
