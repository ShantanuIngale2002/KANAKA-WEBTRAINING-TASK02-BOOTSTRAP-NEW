// Initialize intlTelInput plugin for singup contact input
const signupInput = document.querySelector("#getModalContact");
const signupITI = window.intlTelInput(signupInput, {
    initialCountry: "in",
    separateDialCode: true,
    hiddenInput: "full",
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
});
// Listen to the input event and update the country code accordingly
signupInput.addEventListener("#getModalContact", function() {
  const selectedCountryData = signupITI.getSelectedCountryData();
  console.log("Country Code: +" + selectedCountryData.dialCode);
});

// LOGICS ARE IMPLEMENTED BELOW
// create and store make user of skills array keep it as below like this as possible but mandatory to below it of skillsArray.
function createAndStoreInformation() {
    // getting role value
    let roleObj;
    if ($("#getModalAdminCheck").is(':checked') || $("#getModalAdminCheck").prop('indeterminate')) {
        if ($("#getModalAdminReadCheck").is(':checked') && $("#getModalAdminWriteCheck").is(':checked')) { roleObj = { "Admin": ["Read", "Write"] }; }
        else if ($("#getModalAdminReadCheck").is(':checked') && !$("#getModalAdminWriteCheck").is(':checked')) { roleObj = { "Admin": ["Read"] }; }
        else { roleObj = { "Admin": ["Write"] }; }
    }
    else {
        if ($("#getModalUserReadCheck").is(':checked') && $("#getModalUserWriteCheck").is(':checked')) { roleObj = { "User": ["Read", "Write"] }; }
        else if ($("#getModalUserReadCheck").is(':checked') && !$("#getModalUserWriteCheck").is(':checked')) { roleObj = { "User": ["Read"] }; }
        else { roleObj = { "User": ["Write"] }; }
    }
    // getting gender value and image path accordingly
    let gender = "Other";
    let profilePic = "../assets/profile/other.png";
    if ($("#getModalGenderMale").is(':checked')) {
        gender = "Male";
        profilePic = "assets/profile/male.png";
    }
    if ($("#getModalGenderFemale").is(':checked')) {
        gender = "Female";
        profilePic = "../assets/profile/female.png";
    }
    // assigning my var to all users
    let myVar=JSON.parse(localStorage.getItem("allUsers"));
    if(!myVar){
        myVar=[];
    }
    // creating new user
    let newUser = {
        "id": myVar.length+1,
        "fname": $("#getModalFname").val(),
        "lname": $("#getModalLname").val(),
        "dob": $("#getModalDOB").val(),
        "address": $("#getModalAddress").val(),
        "role": roleObj,
        "gender": gender,
        "preferredlanguage": $("#getModalPreferredLanguage").val(),
        "programmingSkills": skillsArray,
        "email": $("#getModalEmail").val(),
        "contact": signupITI.getNumber(),
        "password": $("#getModalPassword").val(),
        "profilepic": profilePic
    }
    // push new user
    myVar.push(newUser);
    // update all users including new user
    localStorage.setItem("allUsers", JSON.stringify(myVar));
}

// LOGIN FORM LOGIC ALL HERE
// login email
$("#getEmail").on('click', function () {initLoginInput($(this));});
// login password
$("#getPassword").on('focus', function () {initLoginInput($(this))});
// login button on press
$("#loginButton").on('click', function () {
    if (!isValidLoginCredentials()) {
        invalidateLogin();
        document.getElementById("loginForm").reset();
    }
    else {
        let users = JSON.parse(localStorage.getItem("allUsers"));
        let userToUpdate = users.find(element => element.email === $("#getEmail").val());
        localStorage.setItem("loggedUser", JSON.stringify(userToUpdate));
        showGreenToast("You have Successfully Logged in !!.");
        // show toast
        setTimeout(function(){
            window.location.href = "bootstrapPageHTML.html";
        },1000);
    }
});
// login button is disabled here globally
disableLogin();
f();

// FORGOT MODAL LOGIN STARTS HERE
// forgot email
$("#getForgotEmail").on('click', function () {initForgotInput($(this),$("#fgmailspan"));})
// forgot password
$("#getForgotPassword").on('click', function () {initForgotInput($(this),$("#fgpassspan"));})
// forgot confirm password
$("#getForgotConfirmPassword").on('click', function () {initForgotInput($(this),$("#fgcpassspan"));})
// forgot button on pressed
$("#forgotButton").on('click', function () {
    let flag = true;
    if (!isValidForgotMail()) {flag = invalidateForgotInput($("#getForgotEmail"),$("#fgmailspan"));}
    if (!isValidForgotPassword()) {flag = invalidateForgotInput($("#getForgotPassword"),$("#fgpassspan"));}
    if (!isValidForgotConfirmPassword()) {flag = invalidateForgotInput($("#getForgotConfirmPassword"),$("#fgcpassspan"));}
    if (flag) {
        getAndChangePassword(); // change the password accrodingly
        document.getElementById("forgotModalForm").reset();
        $("#ForgotModal").modal('hide'); // close modal
        showGreenToast("Your password is changed succefully !!"); //show success toast
    }
})
// forgot button is disabled here globally
disableForgetButton();


// SINGUP MODAL LOGIC STARTS HERE
// initiates modal whenever loaded
$("#SignupModal").on('shown.bs.modal', function () {
    var prefLang = JSON.parse(localStorage.getItem("preferredLanguages"));
    $.each(prefLang, function (index, item) {
        $("#getModalPreferredLanguage").append('<option value="' + item + '">'+item+'</option>');
    });
    var prefSkill = JSON.parse(localStorage.getItem("programmingSkills"));
    $.each(prefSkill, function (index, item) {
        $("#getModalSkillList").append('<option value="' + item + '">'+item+'</option>');
    })
});
// singup fname click and change
$("#getModalFname").on('click', function () {initModalInput($(this),$("#fnspan"));});
$("#getModalFname").on('change', function () {
    if(($("#getModalFname").val()) && (!isValidModalFName($(this)))){ invalidateModalChangeInput($(this),$("#fnspan")); }
});
// singup lname click and change
$("#getModalLname").on('click', function () {initModalInput($(this),$("#lnspan"));});
$("#getModalLname").on('change', function () {
    if(($("#getModalLname").val()) && (!isValidModalLName($(this)))){invalidateModalChangeInput($(this),$("#lnspan"));}
});
// signup dob click and change
$("#getModalDOB").on('click', function () {initModalInput($(this),$("#dobspan"));});
$("#getModalDOB").on('change', function () {
    if(($("#getModalDOB").val()) && (!isValidModalDate($(this)))){invalidateModalChangeInput($(this),$("#dobspan"));}
});

// singup ROLE
//role - admin
$("#getModalAdminCheck").on('click', function () {
    initModalCheck($("#rolespan"));
    //logic for admin
    if ($(this).is(':checked')) {
        $("#getModalAdminReadCheck").prop('checked', true);
        $("#getModalAdminWriteCheck").prop('checked', true);
    }
    else {
        $("#getModalAdminReadCheck").prop('checked', false);
        $("#getModalAdminWriteCheck").prop('checked', false);
    }
    //logic for user
    $("#getModalUserCheck").prop('indeterminate', false);
    $("#getModalUserCheck").prop('checked', false);
    $("#getModalUserReadCheck").prop('checked', false);
    $("#getModalUserWriteCheck").prop('checked', false);
})
//admin read
$("#getModalAdminReadCheck").on('click', function () {
    initModalCheck($("#rolespan"));
    //logic for admin
    if ($(this).is(':checked')) {
        if ($("#getModalAdminWriteCheck").is(":checked")) {
            $("#getModalAdminCheck").prop('indeterminate', false);
            $("#getModalAdminCheck").prop('checked', true);
        }
        else {$("#getModalAdminCheck").prop('indeterminate', true);}
    }
    else {
        if ($("#getModalAdminWriteCheck").is(":checked")) {$("#getModalAdminCheck").prop('indeterminate', true);}
        else {
            $("#getModalAdminCheck").prop('indeterminate', false);
            $("#getModalAdminCheck").prop('checked', false);
        }
    }
    //logic for user
    $("#getModalUserCheck").prop('indeterminate', false);
    $("#getModalUserCheck").prop('checked', false);
    $("#getModalUserReadCheck").prop('checked', false);
    $("#getModalUserWriteCheck").prop('checked', false);
})
//admin write
$("#getModalAdminWriteCheck").on('click', function () {
    initModalCheck($("#rolespan"));
    //logic for admin
    if ($(this).is(':checked')) {
        if ($("#getModalAdminReadCheck").is(":checked")) {
            $("#getModalAdminCheck").prop('indeterminate', false);
            $("#getModalAdminCheck").prop('checked', true);
        }
        else {$("#getModalAdminCheck").prop('indeterminate', true);}
    }
    else {
        if ($("#getModalAdminReadCheck").is(":checked")) {$("#getModalAdminCheck").prop('indeterminate', true);}
        else {
            $("#getModalAdminCheck").prop('indeterminate', false);
            $("#getModalAdminCheck").prop('checked', false);
        }
    }
    //logic for user
    $("#getModalUserCheck").prop('indeterminate', false);
    $("#getModalUserCheck").prop('checked', false);
    $("#getModalUserReadCheck").prop('checked', false);
    $("#getModalUserWriteCheck").prop('checked', false);
})
//role - user
$("#getModalUserCheck").on('click', function () {
    initModalCheck($("#rolespan"));
    //logic for user
    if ($(this).is(':checked')) {
        $("#getModalUserReadCheck").prop('checked', true);
        $("#getModalUserWriteCheck").prop('checked', true);
    }
    else {
        $("#getModalUserReadCheck").prop('checked', false);
        $("#getModalUserWriteCheck").prop('checked', false);
    }
    //logic for admin
    $("#getModalAdminCheck").prop('indeterminate', false);
    $("#getModalAdminCheck").prop('checked', false);
    $("#getModalAdminReadCheck").prop('checked', false);
    $("#getModalAdminWriteCheck").prop('checked', false);
})
//user read
$("#getModalUserReadCheck").on('click', function () {
    initModalCheck($("#rolespan"));
    //logic for user
    if ($(this).is(':checked')) {
        if ($("#getModalUserWriteCheck").is(":checked")) {
            $("#getModalUserCheck").prop('indeterminate', false);
            $("#getModalUserCheck").prop('checked', true);
        }
        else {$("#getModalUserCheck").prop('indeterminate', true);}
    }
    else {
        if ($("#getModalUserWriteCheck").is(":checked")) {$("#getModalUserCheck").prop('indeterminate', true);}
        else {
            $("#getModalUserCheck").prop('indeterminate', false);
            $("#getModalUserCheck").prop('checked', false);
        }
    }
    //logic for admin
    $("#getModalAdminCheck").prop('indeterminate', false);
    $("#getModalAdminCheck").prop('checked', false);
    $("#getModalAdminReadCheck").prop('checked', false);
    $("#getModalAdminWriteCheck").prop('checked', false);
})
//user write
$("#getModalUserWriteCheck").on('click', function () {
    initModalCheck($("#rolespan"));
    //logic for user
    if ($(this).is(':checked')) {
        if ($("#getModalUserReadCheck").is(":checked")) {
            $("#getModalUserCheck").prop('indeterminate', false);
            $("#getModalUserCheck").prop('checked', true);
        }
        else {$("#getModalUserCheck").prop('indeterminate', true);}
    }
    else {
        if ($("#getModalUserReadCheck").is(":checked")) {$("#getModalUserCheck").prop('indeterminate', true);}
        else {
            $("#getModalUserCheck").prop('indeterminate', false);
            $("#getModalUserCheck").prop('checked', false);
        }
    }
    //logic for admin
    $("#getModalAdminCheck").prop('indeterminate', false);
    $("#getModalAdminCheck").prop('checked', false);
    $("#getModalAdminReadCheck").prop('checked', false);
    $("#getModalAdminWriteCheck").prop('checked', false);
})
// singup ROLE complete

// signup address
$("#getModalAddress").on('click', function () {initModalInput($(this),$("#addressspan"));});
// signup gender - Male
$("#getModalGenderMale").on('click', function () {initModalCheck($("#gspan"));});
// signup gender - Female
$("#getModalGenderFemale").on('click', function () {initModalCheck($("#gspan"));});
// signup gender - Other
$("#getModalGenderOther").on('click', function () {initModalCheck($("#gspan"));});

// signup preferred language
$("#getModalPreferredLanguage").on('click', function (event) {initModalInput($(this),$("#plspan"));});
// signup Pills Logic
let skillsArray = []; // Initialize skillsArray as an empty array
$(document).ready(function () {
    $('#SignupModal').on('shown.bs.modal', function () {
        skillsArray.splice(0,skillsArray.length);
        //resetting modal form as new
        resetSignup();
        $('#appendProgSkillsHere').empty();
        // programming skills autocomplete integration
        let arr=[];
        arr=JSON.parse(localStorage.getItem("programmingSkills"));
        $("#getModalProgrammingSkill").autocomplete({
            source: arr,
            position: { my : "right top", at: "right bottom" },
        });
        // on change means on adding pills
        $('#getModalProgrammingSkill').on('change', function () {
            var selectedSkill = $(this).val().toLowerCase();
            console.log(selectedSkill);
            if (selectedSkill && !skillsArray.includes(selectedSkill)) {
                // create and add pills
                let spanH = $('<div>').addClass('pillSpan text-white rounded-4 border d-flex py-1 px-2 mr-1 mt-1');
                let spanP = $('<div>').addClass('pillP px-1').text(selectedSkill);
                let spanC = $('<div>').addClass('crossIcon rounded-circle px-1').text('⛌');
                spanH.append(spanP);
                spanH.append(spanC);
                $('#appendProgSkillsHere').append(spanH);
                $(this).val(''); // Clear input after selecting skill
                skillsArray.push(selectedSkill);
                console.log(skillsArray);
            }
            else{$('#getModalProgrammingSkill').val("");} // nullify input
        });
    });
    // when cross is clicked the closed element with class pillspan ie. parent is cut-off
    $(document).on('click','.crossIcon', function () {
        let skillToRemove = $(this).prev().text().trim();
        skillsArray = skillsArray.filter(function (e) { return e !== skillToRemove; });
        $(this).closest('.pillSpan').remove(); // Remove the parent container
        console.log(skillsArray);
    });

});

// signup programming skills
$("#getModalProgrammingSkill").on('click', function () {initModalInput($(this),$("#psspan"));});
// singup email click and change
$("#getModalEmail").on('click', function () {initModalInput($(this),$("#espan"));});
$("#getModalEmail").on('change', function () {
    if(($("#getModalEmail").val()) && (!isValidModalEmail())){ invalidateModalChangeInput($(this),$("#espan"));}
});
// signup contact click and change
$("#getModalContact").on('click', function () {initModalInput($(this),$("#cspan"));});
$("#getModalContact").on('change', function () {
    if(($("#getModalContact").val()) && (!isValidModalContact($(this)))){ invalidateModalChangeInput($(this),$("#cspan"));}
});
// signup password click and change
$("#getModalPassword").on('click', function () {initModalInput($(this),$("#pspan"));});
$("#getModalPassword").on('change', function () {
    if(($(this).val()) && (!isValidModalPassword())){ invalidateModalChangeInput($(this),$("#pspan"));}
});
// signup confirm password click and change
$("#getModalConfirmPassword").on('click', function () {initModalInput($(this),$("#cpspan"));});
$("#getModalConfirmPassword").on('change', function () {
    if(($(this).val()) && (!isValidModalConfirmPassword())){ invalidateModalChangeInput($(this),$("#cpspan"));}
});
// signup button on pressed
$("#signupButton").on('click', function () {
    let flag = true;
    if (!isValidModalFName($("#getModalFname"))) {flag=invalidateModalInput($("#getModalFname"),$("#fnspan"));}
    if (!isValidModalLName($("#getModalLname"))) {flag=invalidateModalInput($("#getModalLname"),$("#lnspan"));}
    if (!isValidModalDate($("#getModalDOB"))) {flag=invalidateModalInput($("#getModalDOB"),$("#dobspan"));}
    if (!isValidModalRole()) {
        // disableSignup();
        NullifyCheck($("#getModalAdminCheck"));
        NullifyCheck($("#getModalAdminReadCheck"));
        NullifyCheck($("#getModalAdminWriteCheck"));
        NullifyCheck($("#getModalUserCheck"));
        NullifyCheck($("#getModalUserReadCheck"));
        NullifyCheck($("#getModalUserWriteCheck"));
        DisplaySpan($("#rolespan"));
        flag = false;
    }
    if (!isValidModalGender($("#getModalGenderMale"),$("#getModalGenderFemale"),$("#getModalGenderOther"))) {
        invalidateGender($("#getModalGenderMale"),$("#getModalGenderFemale"),$("#getModalGenderOther"),$("#gspan"));
    }
    if (!isValidModalAddress($("#getModalAddress"))) {flag=invalidateModalInput($("#getModalAddress"),$("#addressspan"));}
    if (!isValidModalPrefLang($("#getModalPreferredLanguage"))) {flag=invalidateModalInput($("#getModalPreferredLanguage"),$("#plspan"));}
    if (!isValidModalProgSkil($("#getModalProgrammingSkill"))) {flag=invalidateModalInput($("#getModalProgrammingSkill"),$("#psspan"));}
    if (!isValidModalEmail()) {flag=invalidateModalInput($("#getModalEmail"),$("#espan"));}
    if (!isValidModalContact($("#getModalContact"))) {flag=invalidateModalInput($("#getModalContact"),$("#cspan"));}
    if (!isValidModalPassword()) {
        console.log($("#getModalPassword").val());
        flag=invalidateModalInput($("#getModalPassword"),$("#pspan"));
    }
    if (!isValidModalConfirmPassword()) {flag=invalidateModalInput($("#getModalConfirmPassword"),$("#cpspan"));}
    // if all above validations are passed then do
    if (flag) {
        // store info -> reset form -> hide modal -> show toast
        createAndStoreInformation();
        document.getElementById("signupModalForm").reset();
        $("#SignupModal").modal('hide');
        showGreenToast("Successfully signed in !!! User can log in now.");
    }
})
// singup button is disabled here globally
// disableSignup();
