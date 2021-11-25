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
     * PROMPT FOR SUBMISSION
     * CHECK THE STATUS
     *      IF NOT 0 = THROW AN INFO ALERT
     *      IF 0 = SET STATUS TO 1
     * CHECK IF THERE IS RE-ASSIGNMENT
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
                const reassignmentReq = new analysisGlobalRequest(reAssParam);
                await reassignmentReq.requestWith2param();
                /**INITIAL APPROVERS MAIL WITHOUT APPROVERS OTHERS EMAILS*/
                const reassignmentReq1 = new analysisGlobalRequest(17);
                const initMail = await reassignmentReq1.requestWith1param(); 
                /**INITIAL OTHERS EMAILS*/ 
                const reassignmentReq2 = new analysisGlobalRequest(14.4);
                const initOthersMail = await reassignmentReq2.requestWith1param();  
                console.log(initOthersMail);
            }
            catch(e){
                console.log("No reassignment!");
            }
        };
    });
});