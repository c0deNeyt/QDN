"use strict";
var strict = (function() { return !this; })();
console.log("STRICT MODE: " ,strict);
/**OBJECT CREATION AND ASSIGNING PROPERTIES*/
function onLoadRequestEvent(param1, param2, param3){
    return Object.create(requestObject, {
        requestNum :{value: param1},
        findThis :{value: param2},
        name :{value: param3},
        usrInput: {value: param2},
        status: {value: param3}
    })
};
/**OBJECT CREATION AND ASSIGNING PROPERTIES*/
function onloadAppendToDOM(data, selectorIDs, tableName) {
    return Object.create(eventsObject, {
        data: {value: data},
        selectorIDs: {value: selectorIDs},
        analysisTblId: {value: selectorIDs},
        /**table variables*/
        tableName: {value: tableName}
    });
};
/**OBJECT CREATION AND ASSIGNING PROPERTIES*/
function alertFactory(tittle, body, data ) {
    return Object.create(alertObject, {
        data: {value: data},
        title: {value: tittle},
        body: {value: body},
        monthOnly: {value: month[date.getMonth()]}
    });
};
/**OBJECT CREATION AND ASSIGNING PROPERTIES (global request)
 * This aims to avoid too many parameters in my functions*/
 function analysisGlobalRequest(param) {
    return Object.create(requestObject, {
        no: {value: param},
        name: {value: param.a},
        requestNum: {value: param.b},
        val: {value: param.c},
        name1: {value: param.d},
        val1: {value: param.e},
    });
};
/**OBJECT CREATION AND ASSIGNING PROPERTIES
 * RESPONSIBLE FOR EMAIL PROPERTIES*/
 function analysisSendEmail(details){
    return Object.create(emailFormats, {
        receivers :{value: details.r},
        subject: {value: details.s},
        body: {value: details.b}
    });
};
/**SET DEFAULT VALUE FUNCTION FUNCTION*/
async function appendToDOM(filteredData) {
const selectorsIDs = ["qdnNumber", "ibName","ibTeam","itName",
"itTeam", "dateTime", "customer", "station",
"teamResp", "machine", "pkgType","partName",
"lotId", "classification", "defects", "CODstatement"];
const selectorRadio = ["man", "MaChine", "material", "method",
                        "environment", "useAsIs", "mcmr", "rework",
                        "splitLot", "shutdown", "shipBack", "production",
                        "process", "Maintenance", "Facilities", "QA","Others"];
const analysisQdnId = filteredData[19];
    /**INSTANCE OF ONLOAD APPEND OBJECT*/
    const onloadAppendEvent = new onloadAppendToDOM(filteredData, selectorsIDs);
    // /**INSTANCE OF ONLOAD APPEND OBJECT*/
    const onloadAppendRadioVal = new onloadAppendToDOM(filteredData, selectorRadio);
    // /**APPEND EXECUTION ON ANALYSIS id="issueDetails"*/
    onloadAppendEvent.append();
    /**APPEND EXECUTION ON ANALYSIS id="issueDetails"*/
    /**NOTE: 
     * I decided to separate this method to identify which radio
     * item should checked based on the data item
     * -p. I decided to loop through the 
     * selector instead of looping through the data("filteredData parameter"). */
    onloadAppendRadioVal.appendRadio();
    /**CONTAINMENT, CORRECTION, AND CORRECTIVE INSTANCE */
    const containmentRequest = new onLoadRequestEvent(10, analysisQdnId, 'matchedContainment');
    const correctionRequest = new onLoadRequestEvent(11, analysisQdnId, 'matchedCorrection');
    const correctiveRequest = new onLoadRequestEvent(12, analysisQdnId, 'matchedCorrective');
    /**METHOD  EXECUTION STORING DATA TO CONSTANT VARIABLE
     * Note:
     * cont = containment
     * corr = correction
     * crtv = corrective*/
    const cont = await containmentRequest.requestForTableData();
    const corr = await correctionRequest.requestForTableData();
    const crtv = await correctiveRequest.requestForTableData();
    /**Instance of appending table data.
     * Note:
     * onloadAppendToDOM accept 3 parameters as follows:
     * First : array/object contain either containment, correction and corrective details
     * Second : the ID of the latest QDN number
     * Third : the table body class name.*/
    const onloadAppendCont = new onloadAppendToDOM(cont, analysisQdnId, "containment");
    const onloadAppendCorr = new onloadAppendToDOM(corr, analysisQdnId, "correction");
    const onloadAppendCrtv = new onloadAppendToDOM(crtv, analysisQdnId, "corrective");
    /**Execution of method(appendTableContent) from object onloadAppendToDOM*/
    onloadAppendCont.appendTableContent();
    onloadAppendCorr.appendTableContent();
    onloadAppendCrtv.appendTableContent();
    /**TO REMOVED ASSIGNMENT INPUT SECTION IF EXIST*/
    $("#reAssignment").remove();
    document.getElementById("qdnNumber").classList.remove("is-invalid");
    document.getElementById("qdnNumber").classList.add("is-valid");    
try{
    /**INSTANCE OF ONLOAD REQUEST with parameter of 9 for requestNum and 
     *filteredData[19] for findThis (qndID or analysis_tbl id) */
    const reassignmentRequest = new onLoadRequestEvent(9, analysisQdnId);
    /**EXECUTING THE METHOD TO FETCH THE DATA FROM THE AJAX REQUEST */
    const reAssRawData = await reassignmentRequest.requestForReassignment();
    /**INSTANCE OF APPEND OBJECT */
    const onloadAppendReass = new onloadAppendToDOM(reAssRawData);
    /**EXECUTION OF METHOD APPEND REASSIGNMENT IF EXIST*/
    onloadAppendReass.appendReassignment();
}
catch (e){
    /**Error HANDLING*/
    // console.log("NO REASSIGNMENT", e);
}
};
/**FUNCTION TO UNSET LOADED DATA*/
function unsetData() {
    /**REMOVING ELEMENT WITH .fromdbResult CLASS*/
    let spanElement = document.querySelectorAll('.fromdbResutl');
    for(let i=0;i<spanElement.length;i++){
        $(spanElement[i]).html("");
    };
    document.getElementById("qdnNumber").classList.remove("is-valid");
    document.getElementById("qdnNumber").classList.add("is-invalid");
    reAssignEvent.unsetReAssignmentData();
    /**REMOVING input fields*/
    $(".analysisSection").remove();
    $("#reAssignDiv").remove();
    $("#reAssignment").remove();
};
/**MAIN FUNCTION FOR ANALYSIS*/
(async function() {//*✅*/
    /**INSTANCE OF URSearchParams */
    const parameter = new URLSearchParams(window.location.search);
    /**FETCHING param name */
    const urlParam = parameter.get('qdnNo');
    const qdnNumberInput = document.getElementById("qdnNumber");
    /**CHECK IF THE CUSTOM URL IS VALID */
    if (urlParam){
        document.getElementById("qdnNumber").value = urlParam;
        /**ADD BOOTSTRAP VALIDATION valid*/
        qdnNumberInput.classList.remove("is-invalid")
        qdnNumberInput.classList.add("is-valid");
        /**trycatch block to check the validity of url */
        try{
            /*INSTANCE OF ONLOAD REQUEST*/
            const onloadRequest = new onLoadRequestEvent(8, urlParam);
            /**MATCHED QDN NUMBER FROM urlParam Parameter */
            const details = await onloadRequest.searchQdnDetails();
            const filteredDetails = Object.values(details[0]);
            appendToDOM(filteredDetails);
        }
        catch(e){
            /**ERROR HANDLING*/
            /**ADD BOOTSTRAP VALIDATION INVALID*/
            qdnNumberInput.classList.remove("is-valid")
            qdnNumberInput.classList.add("is-invalid");
            if (e.readyState === 4){
                /**INSTANCE OF ALERT FACTORY */
                const error = new alertFactory(`Something Went Wrong 🤔!`,
                `Invalid URL 😈😈😈.<br>
                Status: ${e.status} <br>
                statusText: " ${e.statusText} "`);
                /**METHOD EXECUTION*/
                await error.errorAlert();
            }
        }
    }
    else{
        // console.log("Custom URL is",false);
        /*INSTANCE OF ONLOAD REQUEST*/
        const onloadRequest = new onLoadRequestEvent(8.2);
        /**ONLOAD RAW DATA */
        const result = await onloadRequest.latestQdn();
        /**CONVERTING THE OJECT INTO ARRAY OF OBJECT VALUE*/
        const filteredData = Object.values(result[0]);
        appendToDOM(filteredData);
    };
    //=====================================================>
    // START OF ANALYSIS AUTOCOMPLETE(AC) KEYUP FUNCTION
    //=====================================================>
    $("#qdnNumber").on("input", async function () {
        /** .replace will removed excess spaces */
        let usrInput = $(this).val().replace(/\s/g,'');
         /**AUTOCOMPLETE SETTING PARAMETERS INSTANCE*/
        const analInstanceACSuggestion = new onLoadRequestEvent(7.1, usrInput,0);
        try{
            /**approversOnLoadRequestEvent METHOD*/
            const analACSuggestion = await analInstanceACSuggestion.autoCompleteDataRequest();
            /**AC APPENDING RESULT*/
            const acRawData = new onloadAppendToDOM(analACSuggestion);
            /**onloadAppendToDOM METHOD*/
            const analysisSuggestions = await acRawData.ACRawDataToArray();
            /*INSTANCE OF ONLOAD REQUEST*/
            const onloadRequest = new onLoadRequestEvent(8, usrInput);
            /**MATCHED QDN NUMBER FROM urlParam Parameter */
            const details = await onloadRequest.searchQdnDetails();
            const filteredDetails = Object.values(details[0]);
            appendToDOM(filteredDetails);
            reAssignEvent.unsetReAssignmentData();
            $(this).autocomplete({
                source: analysisSuggestions,
                select: async function(event, ui){
                    let analysisSelectedItem =  ui["item"]["value"];
                    /*INSTANCE OF ONLOAD REQUEST*/
                    const onloadRequest = new onLoadRequestEvent(8, analysisSelectedItem);
                    /**MATCHED QDN NUMBER FROM urlParam Parameter */
                    const details = await onloadRequest.searchQdnDetails();
                    const filteredDetails = Object.values(details[0]);
                    appendToDOM(filteredDetails);
                    reAssignEvent.unsetReAssignmentData();
                },
            });
        }
        catch (e){
            /**ERROR HANDLING*/
            unsetData();
        };
    });
    $(document).on("change", "#reAssign", function () {
        // this will contain a reference to the checkbox   
        if (this.checked === true) {
            // the checkbox is now checked 
            $(".analysisSection").remove();
            $("#reAssignDiv").after(reAssignmentInputs);
        } 
        else {
            /**FROM globalVariables.js */
           reAssignEvent.toggleOff();
        }
    });
    $(document).on("keyup", "#reAssignTo", async function () {
        try{
            /*INSTANCE OF ONLOAD REQUEST*/
            const onloadRequest = new onLoadRequestEvent(3, $(this).val());
            /**MATCHED QDN NUMBER FROM urlParam Parameter */
            let response = await onloadRequest.searchForEmployee();
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
            /**FROM globalVariables.js */
            reAssignEvent.autoComplete(response);
        }
        catch (e){
            $(this).removeClass("is-valid");
            $(this).addClass("is-invalid");
            $("#reAssignToName, #reAssignToTeam, #dept")
            .val("")
            .attr("placeholder", "Invalid 😡")
            .css({
                "color": "red",
                "border": "1px solid red"
            });
            $("#reAssignTo").css("border", "1px solid red");
        }
    });
})();

/**
 * SUBMIT FORT APPROVAL CLICK EVENT HANDLER 
 **/
$(document).on('click', '#forApproval', async function (){
    /**TO DO'S:
     * PROMPT FOR SUBMISSION ✅
     * CHECK THE STATUS
     *      IF NOT 0 = THROW AN INFO ALERT
     *      IF 0 = SET STATUS TO 1
     * CHECK IF THERE IS RE-ASSIGNMENT ✅
     */
    /**PROMPT ALERT*/
    Swal.fire({
        title: 'Are you sure?',
        html: "Sending this QDN (Number: " + "<b style ='color:red;'>"+ $("#qdnNumber").val() +"</b>"
            + ") for approval won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Submit this!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const reAssParam = {a:"qdnNum", b:18, c: $("#qdnNumber").val()};
            try{
                /*INSTANCE RESPONSIBLE FOR REASSIGNMENT
                TRY CATCH WILL FAIL IF NO RESULT FOUND*/
                const reassignmentReq = new analysisGlobalRequest(reAssParam);
                const reAssignmentDetails = await reassignmentReq.requestWith2param();
                /**OVERRIDING reAssParam*/
                reAssParam.a = "qdnNumber";
                reAssParam.b = 9.1;
                /**GET QDN NUMBER OF PERSON RESPONSIBLE */
                const reassignmentReq1 = new analysisGlobalRequest(reAssParam); 
                const resultRawDetails = await reassignmentReq1.requestWith2param();
                /**PERSON RESPONSIBLE EMP NO.*/
                let respEmpNo = resultRawDetails[0]['empNo'];
                let respEmpDept= resultRawDetails[0]['pl'];
                // console.log("REASSIGNMENT IS PRESENT!!");
                switch (respEmpDept === "G & A"){
                    // G&A EMPLOYEE
                    case true:
                        /**OVERRIDING reAssParam*/
                        reAssParam.a = "issuedToEmpNo";
                        reAssParam.b = 13;
                        reAssParam.c = respEmpNo;
                        /**INSTANCE TO FIND EMAIL RECEIVERS OF RESP EMP*/
                        const initEmpEmailIns = new analysisGlobalRequest(reAssParam);
                        /**METHOD TO FETCH EMAIL*/
                        const r = await initEmpEmailIns.requestWith2param();
                        /**THIS WILL FILTER THE OBJECT AND CONVERT TO ARRAY
                         * RESULTING EMAILS INSIDE THE ARRAY*/
                        let initEmpEmailRes = Object.keys(r).map((key) => r[key]['emailscol']);
                        /**INITIAL OTHERS EMAILS*/ 
                        const reassignmentReq2 = new analysisGlobalRequest(14.4);
                        /**METHOD TO FETCH OTHERS EMAIL*/
                        const a = await reassignmentReq2.requestWith1param();
                        /**THIS WILL FILTER THE OBJECT AND CONVERT TO ARRAY*/
                        let initOthersMail = Object.keys(a).map((key) => a[key]['emailscol']);
                        /**THIS WILL MERGE THE initEmpEmailRes & initOthersMail INTO ARRAY*/
                        const combinedEmails = initEmpEmailRes.concat(initOthersMail);
                        /**REMOVE DUPLICATE INSIDE THE ARRAY*/
                        const insRmvDuplicates = new onloadAppendToDOM(combinedEmails);
                        /**METHOD TO REMOVE THE DUPLICATE EMAILS*/
                        const removedDuplicates = insRmvDuplicates.removeEmailDuplicates();
                        /**CONVERTING ARRAY INTO STING*/
                        const emailsReceivers = removedDuplicates.toString();
                        //** SEND EMAILS */
                        const detailsWGandA = {r:emailsReceivers, s:`QDN No. ${$("#qdnNumber").val()} FOR APPROVAL`, b:`<p>QDN No. <a href="${window.location.protocol}//${window.location.hostname}/QDN/approval.php?qdnNo=${$("#qdnNumber").val()}">${$("#qdnNumber").val()}</a> needs approval. </p><br>`};
                        /**instance to send email */
                        const submitForApprovalEmailIns = new analysisSendEmail(detailsWGandA);
                        /**METHOD TO SEND EMAIL */
                        await submitForApprovalEmailIns.initialEmailFormat();
                    break;8
                    //NOT G&A EMPLOYEE
                    default:
                        /**OVERRIDING reAssParam*/
                        reAssParam.a = "issuedToEmpNo";
                        reAssParam.b = 13;
                        reAssParam.c = respEmpNo;
                        /**INSTANCE TO FIND EMAIL RECEIVERS OF RESP EMP*/
                        const initEmpEmailInsNoGandA = new analysisGlobalRequest(reAssParam);
                        /**METHOD TO FETCH EMAIL*/
                        const intMailNoGandA = await initEmpEmailInsNoGandA.requestWith2param();
                        /**THIS WILL FILTER THE OBJECT AND CONVERT TO ARRAY
                         * RESULTING EMAILS INSIDE THE ARRAY*/
                        const initEmpEmailResNoGandA = Object.keys(intMailNoGandA).map((key) => intMailNoGandA[key]['emailscol']);
                        /**PROD, PE, EE, QA */
                        /**INITIAL APPROVERS MAIL WITHOUT APPROVERS OTHERS EMAILS*/
                        const reassignmentReq3 = new analysisGlobalRequest(17);
                        /**METHOD*/
                        const approversReceivers = await reassignmentReq3.requestWith1param(); 
                        /**METHOD TO FETCH OTHERS EMAIL*/
                        /**THIS WILL FILTER THE OBJECT AND CONVERT TO ARRAY*/
                        const initNoGandA = Object.keys(approversReceivers).map((key) => approversReceivers[key]['emailscol']);
                        /**THIS WILL MERGE THE initEmpEmailRes & initOthersMail INTO ARRAY*/
                        const combinedEmailsNoGandA = initEmpEmailResNoGandA.concat(initNoGandA);
                        /**REMOVE DUPLICATE INSIDE THE ARRAY*/
                        const insRmvDuplicatesNoGandA = new onloadAppendToDOM(combinedEmailsNoGandA);
                        /**METHOD TO REMOVE THE DUPLICATE EMAILS*/
                        const removedDuplicatesNoGandA = insRmvDuplicatesNoGandA.removeEmailDuplicates();
                        /**CONVERTING ARRAY INTO STING*/
                        const emailsReceiversNoGandA = removedDuplicatesNoGandA.toString();
                        //** SEND EMAILS */
                        const detailsNoGandA = {r:emailsReceiversNoGandA, s:`QDN No. ${$("#qdnNumber").val()} FOR APPROVAL`, b:`<p>QDN No. <a href="${window.location.protocol}//${window.location.hostname}/QDN/approval.php?qdnNo=${$("#qdnNumber").val()}">${$("#qdnNumber").val()}</a> needs approval. </p><br>`};
                        /**instance to send email */
                        const submitForApprovalEmailInsNoGandA = new analysisSendEmail(detailsNoGandA);
                        /**METHOD TO SEND EMAIL */
                        await submitForApprovalEmailInsNoGandA.initialEmailFormat();
                    break;
                };
                // This will INSTANTIATE the success ALERT FACTORY
                const analysisAlertFormat = new alertFactory(`SUBMISSION SUCCESS!<br> 🎉 🥳 🎉`, `QDN <em>${$("#qdnNumber").html()}</em> Sent for approval!`);
                /**METHOD EXECUTION*/
                analysisAlertFormat.successAlert().then(function(){
                    /**SETTING THE STATUS TO 1 */ 
                    const setStatusVAr = {a:"qndNumber", b:16, c: $("#qdnNumber").val(), d:"status", e:1};
                    /** instance for update request in analysis_tbl*/
                    const settingStatus = new analysisGlobalRequest(setStatusVAr);
                    settingStatus.requestWith3param();  
                    //RELOAD THE PAGE
                    window.location.reload();
                });
            }
            catch{
                //**INITIAL EMAILS */
                //**THIS WILL LOOK FOR EMP NUMBER OF EMPLOYEE RESPONSIBLE IF NO REASSIGNMENT*/
                /**OVERRIDING reAssParam*/
                reAssParam.a = "searchForThisQdnNo";
                reAssParam.b = 7.2;
                /**GET QDN NUMBER OF PERSON RESPONSIBLE */
                const reassignmentReq4 = new analysisGlobalRequest(reAssParam); 
                const resultRawDetails = await reassignmentReq4.requestWith2param();
                /**PERSON RESPONSIBLE EMP NO.*/
                const noReAssResp1EmpNo = resultRawDetails[0]['issuedTo'];
                const noReAssRespDept = resultRawDetails[0]['pl'];
                switch (noReAssRespDept === "G & A"){
                    // G&A EMPLOYEE
                    case true:
                        /**OVERRIDING reAssParam*/
                        reAssParam.a = "issuedToEmpNo";
                        reAssParam.b = 13;
                        reAssParam.c = noReAssResp1EmpNo;
                        /**INSTANCE TO FIND EMAIL RECEIVERS OF RESP EMP*/
                        const initEmpEmailIns = new analysisGlobalRequest(reAssParam);
                        /**METHOD TO FETCH EMAIL*/
                        const r = await initEmpEmailIns.requestWith2param();
                        /**THIS WILL FILTER THE OBJECT AND CONVERT TO ARRAY
                         * RESULTING EMAILS INSIDE THE ARRAY*/
                        let initEmpEmailRes = Object.keys(r).map((key) => r[key]['emailscol']);
                        /**INITIAL OTHERS EMAILS*/ 
                        const reassignmentReq2 = new analysisGlobalRequest(14.4);
                        /**METHOD TO FETCH OTHERS EMAIL*/
                        const a = await reassignmentReq2.requestWith1param();
                        /**THIS WILL FILTER THE OBJECT AND CONVERT TO ARRAY*/
                        let initOthersMail = Object.keys(a).map((key) => a[key]['emailscol']);
                        /**THIS WILL MERGE THE initEmpEmailRes & initOthersMail INTO ARRAY*/
                        const combinedEmails = initEmpEmailRes.concat(initOthersMail);
                        /**REMOVE DUPLICATE INSIDE THE ARRAY*/
                        const insRmvDuplicates = new onloadAppendToDOM(combinedEmails);
                        /**METHOD TO REMOVE THE DUPLICATE EMAILS*/
                        const removedDuplicates = insRmvDuplicates.removeEmailDuplicates();
                        /**CONVERTING ARRAY INTO STING*/
                        const emailsReceivers = removedDuplicates.toString();
                        //** SEND EMAILS */
                        const detailsWGandA = {r:emailsReceivers, s:`QDN No. ${$("#qdnNumber").val()} FOR APPROVAL`, b:`<p>QDN No. <a href="${window.location.protocol}//${window.location.hostname}/QDN/approval.php?qdnNo=${$("#qdnNumber").val()}">${$("#qdnNumber").val()}</a> needs approval. </p><br>`};
                        /**instance to send email */
                        const submitForApprovalEmailIns = new analysisSendEmail(detailsWGandA);
                        /**METHOD TO SEND EMAIL */
                        await submitForApprovalEmailIns.initialEmailFormat();
                    break;8
                    //NOT G&A EMPLOYEE
                    default:
                        /**OVERRIDING reAssParam*/
                        reAssParam.a = "issuedToEmpNo";
                        reAssParam.b = 13;
                        reAssParam.c = noReAssResp1EmpNo;
                        /**INSTANCE TO FIND EMAIL RECEIVERS OF RESP EMP*/
                        const initEmpEmailInsNoGandA = new analysisGlobalRequest(reAssParam);
                        /**METHOD TO FETCH EMAIL*/
                        const intMailNoGandA = await initEmpEmailInsNoGandA.requestWith2param();
                        /**THIS WILL FILTER THE OBJECT AND CONVERT TO ARRAY
                         * RESULTING EMAILS INSIDE THE ARRAY*/
                        const initEmpEmailResNoGandA = Object.keys(intMailNoGandA).map((key) => intMailNoGandA[key]['emailscol']);
                        /**PROD, PE, EE, QA */
                        /**INITIAL APPROVERS MAIL WITHOUT APPROVERS OTHERS EMAILS*/
                        const reassignmentReq3 = new analysisGlobalRequest(17);
                        /**METHOD*/
                        const approversReceivers = await reassignmentReq3.requestWith1param(); 
                        /**METHOD TO FETCH OTHERS EMAIL*/
                        /**THIS WILL FILTER THE OBJECT AND CONVERT TO ARRAY*/
                        const initNoGandA = Object.keys(approversReceivers).map((key) => approversReceivers[key]['emailscol']);
                        /**THIS WILL MERGE THE initEmpEmailRes & initOthersMail INTO ARRAY*/
                        const combinedEmailsNoGandA = initEmpEmailResNoGandA.concat(initNoGandA);
                        /**REMOVE DUPLICATE INSIDE THE ARRAY*/
                        const insRmvDuplicatesNoGandA = new onloadAppendToDOM(combinedEmailsNoGandA);
                        /**METHOD TO REMOVE THE DUPLICATE EMAILS*/
                        const removedDuplicatesNoGandA = insRmvDuplicatesNoGandA.removeEmailDuplicates();
                        /**CONVERTING ARRAY INTO STING*/
                        const emailsReceiversNoGandA = removedDuplicatesNoGandA.toString();
                        //** SEND EMAILS */
                        const detailsNoGandA = {r:emailsReceiversNoGandA, s:`QDN No. ${$("#qdnNumber").val()} FOR APPROVAL`, b:`<p>QDN No. <a href="${window.location.protocol}//${window.location.hostname}/QDN/approval.php?qdnNo=${$("#qdnNumber").val()}">${$("#qdnNumber").val()}</a> needs approval. </p><br>`};
                        /**instance to send email */
                        const submitForApprovalEmailInsNoGandA = new analysisSendEmail(detailsNoGandA);
                        /**METHOD TO SEND EMAIL */
                        await submitForApprovalEmailInsNoGandA.initialEmailFormat();
                    break;
                };
                // This will INSTANTIATE the success ALERT FACTORY
                const analysisAlertFormat = new alertFactory(`SUBMISSION SUCCESS!<br> 🎉 🥳 🎉`, `QDN <em>${$("#qdnNumber").html()}</em> Sent for approval!`);
                /**METHOD EXECUTION*/
                analysisAlertFormat.successAlert().then(function(){
                    /**SETTING THE STATUS TO 1 */ 
                    const setStatusVAr = {a:"qndNumber", b:16, c: $("#qdnNumber").val(), d:"status", e:1};
                    /** instance for update request in analysis_tbl*/
                    const settingStatus = new analysisGlobalRequest(setStatusVAr);
                    settingStatus.requestWith3param();  
                    //RELOAD THE PAGE
                    window.location.reload();
                });
            }
        };
    });
});