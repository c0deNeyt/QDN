function onLoadRequestEvent(requestNum, findThis){
    return{
        request() {
            return $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: {request: requestNum },
                cache: false,
                dataType: "json",
            });
        },
        requestForReassignment() {
            return $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: { matchedReAss: findThis, request: requestNum },
                cache: false,
                dataType: "json"
            });
        }
    }
};
function onloadAppendToDOM(data, selectorIDs) {
    const dataLen = data.length;
    const selectorIDsLen = selectorIDs.length;
    return{
        /**Appending to the fieldset or
         * for instance the card below the qnd
         * number input*/
        append() {
            $('.analysisSection').remove();
            $("#reAssignDiv").after($('#analysisSection').html());
            for(let i=0;i<dataLen;i++){
                switch (i){
                    case 0:
                        $(`#${selectorIDs[i]}`).val(data[i]);
                    break;
                    case 18:
                        $(`#${selectorIDs[15]}`).val(data[i]);
                    break; 
                    default:
                        $(`#${selectorIDs[i]}`).html(data[i]);
                    break;
                }
            };
        },
        /**Appending Radio Value if exist */
        appendRadio() {
            console.log(data);
            for(let i=0;i<selectorIDsLen;i++){
                const selectorVal = $(`#${selectorIDs[i]}`).val();
                switch(selectorVal){
                    case data[15]:
                        $(`#${selectorIDs[i]}`).prop("checked", true);
                    break;
                    case data[16]:
                        $(`#${selectorIDs[i]}`).prop("checked", true);
                    break;
                    case data[17]:
                        $(`#${selectorIDs[i]}`).prop("checked", true);
                    break;
                    case data[18]:
                        $(`#${selectorIDs[i]}`).val(data[i]);
                    break;
                }
            }   
        },
        appendTable() {

        }
    }
};

$(document).ready(async function () {//*✅*/
    /**
     * Onload Event
     * Search the latest qnd
     * Append to the DOM
     * 
     * Input Event
     * Search for the matched qnd
     * Matched True: Append the data to the dom 
     * Matched False: set the DOM TO default
         */
    const selectorsIDs = ["qdnNumber", "ibName","ibTeam","itName",
    "itTeam", "dateTime", "customer", "station",
    "teamResp", "machine", "pkgType","partName",
    "lotId", "classification", "defects", "CODstatement"];
    const selectorRadio = ["man", "MaChine", "material", "method",
                            "environment", "useAsIs", "mcmr", "rework",
                            "splitLot", "shutdown", "shipBack", "production",
                            "process", "Maintenance", "Facilities", "QA","Others"];
    try{
        const onloadRequest = new onLoadRequestEvent(8.2);
        const result = await onloadRequest.request();
        const filteredData = Object.values(result[0]);
        const onloadAppendEvent = new onloadAppendToDOM(filteredData, selectorsIDs);
        const onloadAppendRadioVal = new onloadAppendToDOM(filteredData, selectorRadio);
        onloadAppendEvent.append();
        onloadAppendRadioVal.appendRadio();
        const reassignmentRequest = new onLoadRequestEvent(9, filteredData[19]);
        let reassRawData = await reassignmentRequest.requestForReassignment();
        console.log("THIS IS THE REASSIGNMENT", x);
    }catch (e){
        console.log(e);
    }
   
   

    //=====================================================>
    // START OF ANALYSIS AUTOCOMPLETE(AC) KEYUP FUNCTION
    //=====================================================>
    $("#qdnNumber").on("input", async function () {
        /** .replace will removed excess spaces */
        var usrInput = $(this).val().replace(/\s/g,'');
        var usrInputLen = usrInput.length;
        // let selectorsIDs = ["qdnNumber", "ibName","ibTeam","itName",
        //                     "itTeam", "dateTime", "customer", "station",
        //                     "teamResp", "machine", "pkgType","partName",
        //                     "lotId", "classification", "defects",];
        // const onloadRequest = new onLoadRequestEvent(8.2);
        // const result = await onloadRequest.request();
        // const filteredData = Object.values(result[0]);
        // const onloadAppendEvent = new onloadAppendToDOM(filteredData, selectorsIDs);
        // onloadAppendEvent.append();

        // console.log("THIS IS THE REQUEST RESULT", filteredData);
        // if (usrInputLen){
        //     /*Instantiate AnalysisReq*/
        //     const analysisRequest = new AnalysisRequest(usrInput);
        //     const analysisEvt = new AnalysisEvent(); 
            
        //     try{
        //         let result = await analysisRequest.qdnDetails();
        //         let qndRawValue = Object.values(result[0]);
        //         let selectorsIDs = ["ibName","ibTeam","itName",
        //                             "itTeam", "dateTime", "customer",
        //                             "station", "teamResp", "machine",
        //                             "pkgType","partName","lotId",
        //                             "classification","defects",];
        //         analysisEvt.qdnResultFound();
        //         $("#reAssignDiv").after(analysisSectionTemplate);
        //         for(let i=0;i<qndRawValue.length;i++){
        //             switch (i){
        //                 case 16:
        //                     // console.log("This is the case 16", qndRawValue[i]);
        //                     if(qndRawValue[i] !== null){

        //                     }
        //                 break;
        //                 default:
        //                     $(`#${selectorsIDs[i]}`).html(qndRawValue[i+2]);
        //                 break;
        //             };
                    
        //         } 
        //         console.log(Object.keys(result[0]), Object.values(result[0]));
        //     }catch{
        //         analysisEvt.noQdnResultFound();
        //         console.log("the noQdnResultFound!!");
        //     }
            
        // }else{

        // }
    });
});