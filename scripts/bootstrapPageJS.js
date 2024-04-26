// if not logged user then redirect to login
if(!localStorage.getItem('loggedUser')){
    window.location.href="loginPageHTML.html";
}


// Initialize intlTelInput plugin for profile edit contact input
const ProfileEditinput = document.querySelector("#profileEditContact");
const ProfileEditITI = window.intlTelInput(ProfileEditinput, {
    initialCountry: "in",
    separateDialCode: true,
    hiddenInput: "full",
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
});
// Listen to the input event and update the country code accordingly
ProfileEditinput.addEventListener("#profileEditContact", function() {
  const selectedCountryData = ProfileEditITI.getSelectedCountryData();
  console.log("Country Code: +" + selectedCountryData.dialCode);
});


// create and store make user of skills array keep it as below like this as possible but mandatory to below it of skillsArray.
function changeAndStoreInformation() {
    // getting role
    let roleObj;
    if ($("#profileEditAdminCheck").is(':checked') || $("#profileEditAdminCheck").prop('indeterminate')) {
        if ($("#profileEditAdminReadCheck").is(':checked') && $("#profileEditAdminWriteCheck").is(':checked')) { roleObj = { "Admin": ["Read", "Write"] }; }
        else if ($("#profileEditAdminReadCheck").is(':checked') && !$("#profileEditAdminWriteCheck").is(':checked')) { roleObj = { "Admin": ["Read"] }; }
        else { roleObj = { "Admin": ["Write"] }; }
    }
    else {
        if ($("#profileEditUserReadCheck").is(':checked') && $("#profileEditUserWriteCheck").is(':checked')) { roleObj = { "User": ["Read", "Write"] }; }
        else if ($("#profileEditUserReadCheck").is(':checked') && !$("#profileEditUserWriteCheck").is(':checked')) { roleObj = { "User": ["Read"] }; }
        else { roleObj = { "User": ["Write"] }; }
    }
    // getting gender and pic path accordingly
    let gender = "Other";
    let profilePic = "../assets/profile/other.png";
    if ($("#profileEditGenderMale").is(':checked')) {
        gender = "Male";
        profilePic = "../assets/profile/male.png";
    }
    if ($("#profileEditGenderFemale").is(':checked')) {
        gender = "Female";
        profilePic = "../assets/profile/female.png";
    }
    
    // getting id of logged in user to search and update information
    let currUserID = JSON.parse(localStorage.getItem("loggedUser")).id;
    // getting all users
    let users = JSON.parse(localStorage.getItem("allUsers"));
    // search user with current id
    let userToUpdate = users.find(element => element.id === currUserID);
    // updating the edited information below
    userToUpdate.fname=$("#profileEditFname").val();
    userToUpdate.lname=$("#profileEditLname").val();
    userToUpdate.fname=$("#profileEditFname").val();
    userToUpdate.dob=$("#profileEditDOB").val();
    userToUpdate.address=$("#profileEditAddress").val();
    userToUpdate.role=roleObj;
    userToUpdate.gender=gender;
    userToUpdate.preferredlanguage=$("#profileEditLanguage").val();
    userToUpdate.programmingSkills=skillsArray;
    userToUpdate.email=$("#profileEditEmail").val();
    userToUpdate.contact=$("#profileEditContact").val();
    userToUpdate.profilepic=profilePic;
    let password=$("#profileEditPassword").val();
    if(password){userToUpdate.password=password;} // changing only if the password is edited
    // updating logged-in user in local storage
    localStorage.setItem("loggedUser", JSON.stringify(userToUpdate));
    // updating all users in local storage
    localStorage.setItem("allUsers", JSON.stringify(users));
}


// DOCUMENT ON LOAD
$(document).ready(function(){
    let loggedUserData = JSON.parse(localStorage.getItem("loggedUser"));
    $("#navbarProfilePic").attr("src",loggedUserData.profilepic);
});


// PROFILE INFORMATION SCRIPT STARTS HERE
let currSkills=[];
$("#profileInfoModal").on('show.bs.modal', function () {
    let loggedUserData = JSON.parse(localStorage.getItem('loggedUser')); // get logged in user
    $("#profileInfoPic").attr("src",loggedUserData.profilepic); // adding profile pic path into src attribute

    // likewise adding fetched information below into element
    $('#profileInfoID').text(loggedUserData.id);
    $('#profileInfoEmail').text(loggedUserData.email);
    let lname=loggedUserData.lname;
    if(lname){$('#profileInfoName').text(loggedUserData.fname +" "+ loggedUserData.lname);}
    else{$('#profileInfoName').text(loggedUserData.fname);}
    $('#profileInfoContact').text(loggedUserData.contact);
    $('#profileInfoDOB').text(loggedUserData.dob);
    $('#profileInfoGender').text(loggedUserData.gender);
    $('#profileInfoLanguage').text(loggedUserData.preferredlanguage);

    // if address is provided then add into element
    if(loggedUserData.address){$('#profileInfoAddress').text(loggedUserData.address);}
    // displaying role
    let role = loggedUserData.role;
    let keyRole = Object.keys(role)[0];
    let formatRole = `${keyRole} : ${role[keyRole].length === 1 ? role[keyRole][0] : role[keyRole].join(' and ')}`;
    $("#profileInfoRole").text(formatRole);

    // skills making sure that it not gets duplicated on closing and opening the Edit.
    let skills = loggedUserData.programmingSkills;
    skills.forEach(skill => {
        if(!currSkills.includes(skill)){
            // creating and adding each skill as pill
            let spanD = $('<div>').addClass('pillP d-flex mx-1 fw-bold text-primary').text('>')
            let spanP = $('<div>').addClass('fw-bold text-secondary').text(skill);
            spanD.append(spanP);
            $("#profileInfoSkillPills").append(spanD);
            currSkills.push(skill);
        }
    });
})


// PROFILE EDIT SCRIPT STARTS HERE
$("#profileEditModal").on('show.bs.modal', function () {
    // if closed and opened again modal must get values neatly, discarding unsaved but edited values in form
    resetProfileEdit();

    // on loading the preferred languages must get loaded in datalist as options from local storage
    let prefLang = JSON.parse(localStorage.getItem("preferredLanguages"));
    $.each(prefLang, function (index, item) {
        $("#profileEditLanguage").append('<option value="' + item + '">' + item + '</option>');
    });

    // getting the information to display from logged in user
    let loggedUserData = JSON.parse(localStorage.getItem('loggedUser'));
    $('#profileEditID').text(loggedUserData.id);
    $('#profileEditEmail').val(loggedUserData.email);
    $('#profileEditFname').val(loggedUserData.fname);
    let lname=loggedUserData.lname;
    if(lname){$('#profileEditLname').val(loggedUserData.lname);}
    $('#profileEditContact').val(loggedUserData.contact.slice(-10)); // slicing contact to only get last 10 digit.
    $('#profileEditDOB').val(loggedUserData.dob);
    $('#profileEditGender' + loggedUserData.gender).prop('checked', true);
    $('#profileEditLanguage').val(loggedUserData.preferredlanguage);
    $('#profileEditAddress').val(loggedUserData.address);

    // for role need to clear them so that no conflict occurs
    NullifyCheck($('#profileEditAdminCheck'));
    NullifyCheck($('#profileEditAdminReadCheck'));
    NullifyCheck($('#profileEditAdminWriteCheck'));
    NullifyCheck($('#profileEditUserCheck'));
    NullifyCheck($('#profileEditUserReadCheck'));
    NullifyCheck($('#profileEditUserWriteCheck'));

    // getting role value
    let role = loggedUserData.role;
    let keyRole = Object.keys(role)[0];
    // check if it have both read and write previliage
    if (role[keyRole].length == 1) {
        $('#profileEdit' + keyRole + 'Check').prop('indeterminate', true);
        $('#profileEdit' + keyRole + role[keyRole][0] + 'Check').prop('checked', true);
    }
    else {
        $('#profileEdit' + keyRole + 'Check').prop('checked', true);
        $('#profileEdit' + keyRole + role[keyRole][0] + 'Check').prop('checked', true);
        $('#profileEdit' + keyRole + role[keyRole][1] + 'Check').prop('checked', true);
    }
    $('#profileEditAminCheck').prop('disabled',true);
});


// SCRIPT FOR PILLS IN EDIT SECTION STARTS HERE
let skillsArray = [];
$(document).ready(function () {
    $('#profileEditModal').on('show.bs.modal', function () {
        // revert the input border
        $("#profileEditSkill").on('click', function () {
            revertBorder($(this));
            $(this).val('');
        })
        // initialize the array to get skills
        let arr=[];
        arr=JSON.parse(localStorage.getItem("programmingSkills"));
        // integrate autocomplete with edit skill input
        $("#profileEditSkill").autocomplete({
            source: arr,
            position: { my : "right top", at: "right bottom" },
        });
        // get skills from localstroage and add to to input options
        let prefSkill = JSON.parse(localStorage.getItem("programmingSkills"));
        $.each(prefSkill, function (index, item) {
            $("#profileEditSkillList").append('<option value="' + item + '">' + item + '</option>');
        });
        // existing skill records adding as pills
        let loggedUserData=JSON.parse(localStorage.getItem('loggedUser'));
        let skills = loggedUserData.programmingSkills;
        skills.forEach(skill => {
            if(!skillsArray.includes(skill)){
                // create and add each skill as a pill
                let spanH = $('<div>').addClass('pillSpan bg-secondary text-white text-nowrap border d-flex py-1 px-2 mr-1 mt-1');
                let spanP = $('<div>').addClass('pillP px-1').text(skill);
                let spanC = $('<div>').addClass('crossIcon rounded-circle px-1').text('⛌');
                spanH.append(spanP);
                spanH.append(spanC);
                $("#profileEditSkillPills").append(spanH);
                skillsArray.push(skill);
            }
        });
        // on change ie. adding the skill
        $('#profileEditSkill').on('change', function () {
            var selectedSkill = $(this).val().toLowerCase();
            if (selectedSkill && !skillsArray.includes(selectedSkill)) {
                let spanH = $('<div>').addClass('pillSpan text-white text-nowrap rounded-4 border d-flex py-1 px-2 mr-1 mt-1');
                let spanP = $('<div>').addClass('pillP px-1').text(selectedSkill);
                let spanC = $('<button>').addClass('btn btn-close-white m-0 ml-1 py-0 px-1 rounded-circle crossIcon');
                spanC.text('⛌');
                spanH.append(spanP);
                spanH.append(spanC);
                $('#profileEditSkillPills').append(spanH);
                $(this).val(''); // Clear input after selecting skill
                skillsArray.push(selectedSkill);
            }
            else {$('#profileEditSkill').val("");}
        });
        // when cross icon is cliked closet element with class pillspan is deleted ie, parent
        $(document).on('click', '.crossIcon', function () {
            let skillToRemove = $(this).prev().text().trim();
            skillsArray = skillsArray.filter(function (e) { return e !== skillToRemove; });
            $(this).closest('.pillSpan').remove();
            console.log(skillsArray);
        });
    });

});


// CHANGES TO BE DONE

// edit email click and check
$('#profileEditEmail').on('click',function(){ initModalInput($(this),$("#editemailspan"));});
$('#profileEditEmail').on('change',function(){
    if(($(this).val()) && (!isValidEditEmail())){invalidateModalChangeInput($(this),$("#editemailspan"));}
});
// edit fname click and change
$('#profileEditFname').on('click',function(){initModalInput($(this),$("#editfnamespan"));});
$('#profileEditFname').on('change',function(){
    if(($(this).val()) && (!isValidModalFname($(this)))){invalidateModalChangeInput($(this),$("#editfnamespan"));}
});
// edit lname click and change
$('#profileEditLname').on('click',function(){initModalInput($(this),$("#editlnamespan"));});
$('#profileEditLname').on('change',function(){
    if(($(this).val()) && (!isValidModalLname($(this)))){invalidateModalChangeInput($(this),$("#editlnamespan"));}
});
// edit contact click and change
$('#profileEditContact').on('click',function(){initModalInput($(this),$("#editcontactspan"));});
$('#profileEditContact').on('change',function(){
    if(($(this).val()) && (!isValidModalContact($(this)))){invalidateModalChangeInput($(this),$("#editlnamespan"));}
});
// edit dob click and change
$('#profileEditDOB').on('click',function(){initModalInput($(this),$("#editdobspan"));});
$('#profileEditDOB').on('change',function(){
    if(($(this).val()) && (!isValidModalDate($(this)))){invalidateModalChangeInput($(this),$("#editdobspan"));}
});
// edit gender-male
$("#profileEditGenderMale").on('click', function () {removeSpan($("#editgenderspan"));});
// edit gender-female
$("#profileEditGenderFemale").on('click', function () {removeSpan($("#editgenderspan"));});
// edit gender-other
$("#profileEditGenderOther").on('click', function () {removeSpan($("#editgenderspan"));});
// edit language click
$("#profileEditLanguage").on('click',function(){initModalInput($(this),$("#editlangspan"));});
// edit address click
$("#profileEditAddress").on('click',function(){initModalInput($(this),$("#editaddressspan"));});
// edit skill click
$("#profileEditSkill").on('click',function(){initModalInput($(this),$("#editskillspan"));});
// edit password
$("#profileEditPassword").on('click',function(){initModalInput($(this),$("#editpassspan"));});
// edit password at each change
$("#profileEditChangePassword").on('click',function(){initModalInput($(this),$("#editcpassspan"));});
//role (uneditable, just display) - returning false to make it uneditable
$('#profileEditAdminCheck').on('click',function(){return false;});
$('#profileEditAdminReadCheck').on('click',function(){return false;});
$('#profileEditAdminWriteCheck').on('click',function(){return false;});
$('#profileEditUserCheck').on('click',function(){return false;});
$('#profileEditUserReadCheck').on('click',function(){return false;});
$('#profileEditUserWriteCheck').on('click',function(){return false;});

// changes button on pressed do
$("#profileEditChangeButton").on('click', function () {
    let flag = true;
    if (!isValidModalFName($("#profileEditFname"))) {flag=invalidateModalInput($("#profileEditFname"),$("#editfnamespan"));}
    if (!isValidModalLName($("#profileEditLname"))) {flag=invalidateModalInput($("#profileEditLname"),$("#editlnamespan"));}
    if (!isValidModalDate($("#profileEditDOB"))) {flag=invalidateModalInput($("#profileEditDOB"),$("#editdobspan"));}
    if (!isValidModalAddress($("#profileEditAddress"))) {flag=invalidateModalInput($("#profileEditAddress"),$("#editaddressspan"));}
    if (!isValidModalGender($("#profileEditGenderMale"),$("#profileEditGenderFemale"),$("#profileEditGenderOther"))) {flag=invalidateGender($("#profileEditGenderMale"),$("#profileEditGenderFemale"),$("#profileEditGenderOther"),$("#editgenderspan"))}
    if (!isValidModalPrefLang($("#profileEditLanguage"))) {flag=invalidateModalInput($("#profileEditLanguage"),$("#editlangspan"));}
    if (!isValidModalProgSkil($("#profileEditSkill"))) {flag=invalidateModalInput($("#profileEditSkill"),$("#editskillspan"));}
    if (!isValidEditEmail()) {flag=invalidateModalInput($("#profileEditEmail"),$("#editemailspan"));}
    if (!isValidModalContact($("#profileEditContact"))) {flag=invalidateModalInput($("#profileEditContact"),$("#editcontactspan"));}

    // if all above conditions met then do
    if (flag) {
        // the information gets updated here
        changeAndStoreInformation();
        // nullify all inputs and checks
        resetProfileEdit();
        // empty the pills
        $('#profileEditSkillPills').empty();
        // empty skillsarray to make sure pills came back at modal open
        skillsArray=[];
        // hide modal
        $('#profileEditModal').modal('hide');
        // show toast
        $('#homeToastMsg').text("Changes are perform successfuly !!");
        $("#viewHomeToast").toast('show');
        $("#homeToastButton").text('Okay');
        $("#homeToastButton").on('click',function(){
            $("#viewHomeToast").toast('hide');
        })
        // reload page to reload the profile pic changed gender-wise
        setTimeout(function(){
            location.reload();
        },1000);
    }

})


// profile logout button on pressed
$('#profileLogOutButton').on('click',function(){
    localStorage.removeItem('loggedUser');
    window.location.href = "loginPageHTML.html";
})


disableLogin();
