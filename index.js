/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
﻿

var jpdbBaseURL="http://api.login2explore.com:5577"; 
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stuDBName = "SCHOOL-DB";
var stuRelationName = "STUDENT-TABLE"; 
var connToken = "90932427|-31949269951404102|90955740";

$("#empid").focus;

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data); 
    localStorage.setItem("recno", lvData.rec_no);
}
function getEmpIdAsJsonObj() {
    var rollno = $('#rollno').val(); 
    var jsonStr = {
        rollno: rollno
    };  
    return JSON.stringify(jsonStr);  
}
function fillData(jsonObj) { 
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record; 
    $("#fullname").val(record.fullname); 
    $("#standard").val(record.standard);
    $("#birthdate").val(record.birthdate);
    $("#address").val(record.address);
    $("#enroll").val(record.enroll);
}
function resetForm() {
    $('#rollno').val("");
    $("#fullname").val(" ");
    $("#standard").val("");
    $("#birthdate").val(" ");
    $("#address").val("");
    $("#enroll").val("");
    $('#rollno').prop("disabled", false); 
    $('#save').prop('disabled', true); 
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $('#rollno').focus();
}

﻿
function validateData(){
    var rollno,fullname,standard,birthdate,address,enroll;
    empid = $("#rollno").val();
    empname = $("#fullname").val();
    empsal = $("#standard").val();
    hra = $("#birthdate").val();
    da = $("#adress").val();
    deduct = $( "#enroll").val();
    if (rollno === ''){
        alert("Roll no missing"); 
        $("#rollno").focus();
        return "";
    }
    if (fullname === ''){
        alert("Student Name missing");
        $("#fullname").focus();
        return "";
    }
    if (standard === ''){
        alert("standard missing"); 
        $("#standard").focus();
        return "";
    }
    if (birthdate === ''){
        alert("Birthdate missing"); 
        $("#birthdate").focus(); 
        return "";
    }
    if(address === ''){
        alert("Address missing");
        $("#address").focus(); 
        return "";
    }
    if (enroll === ''){
        alert("Enrollment missing");
        $("#enroll").focus();
        return "";
    }
    
    var jsonStrObj = { 
        rollno: rollno,
        fullname: fullname, 
        standard: standard, 
        birthdate: birthdate,
        address :address,
        enroll: enroll
    };
    return JSON.stringify(jsonStrObj);
}
﻿
﻿

function getStu() {
    var stuIdJsonObj = getStuIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, stuDBName, stuRelationName, stuIdJsonObj); 
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false); 
        $("#reset").prop("disabled", false);
        $("#empname").focus();
    } else if (resJsonObj.status === 200) {
        $("#empid").prop("disabled", true); 
        fillData(resJsonObj);
        $("#change'").prop("disabled", false);
        $("#reset").prop("disabled", false); 
        $("#empname").focus();
    }
}
//function createPUTRequest(connToken,jsonStrobj, stuDBName, stuRelationName){
//    var putRequest = "{\n"
//    + "\"token\":\""
//    + connToken
//    + "\","
//    + "\"stuDBName\":\""
//    + stuDBName
//    + "\",\n"+"\"cmd\" : \"PUT",\n"
//    + "\"rel\" :\""
//    + stuRelationName + "\","
//    + "\"jsonStr\":\n"
//    + jsonStrobj
//    +"\n"
//    + "}";
//   return putRequest ;
//    
//}
function saveData() {
    var jsonStrobj = validateData();
    if (jsonStrobj === ' '){
        return "";
    }
    var putRequest = createPUTRequest (connToken, jsonStrobj, stuDBName, stuRelationName); 
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML); 
    jQuery.ajaxSetup({async: true});
    resetForm(); 
    $('#rollno').focus();
}
﻿

function changeData() {
    $("#change").prop("disabled", true);
    jsonChg= validateData();
    var updateRequest = createLPDATERecordRequest(connToken, jsonChg, stuDBName, stuRelationName, localStorage.getItem(" recno")); 
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#rollno").focus();
}

