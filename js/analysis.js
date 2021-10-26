const requestObject = {
    request() {
        return $.ajax({
            type: 'POST',
            url: "./php/getDetails.php",
            data: {request: this.requestNum },
            cache: false,
            dataType: "json",
        });
    },
    requestForReassignment(){
        return $.ajax({
            type: 'POST',
            url: "./php/getDetails.php",
            data: { matchedReAss: this.findThis, request: this.requestNum },
            cache: false,
            dataType: "json"
        });
    },
    requestForTableData() {
        return new Promise ((resolve, reject) => {
            let xhr = new XMLHttpRequest;
            let formData = new FormData;
            formData.append(`${this.name}`,  this.findThis);
            formData.append('request', this.requestNum);
            xhr.responseType = "json";
            xhr.onload = () => {
                if (xhr.readyState === 4 && xhr.status === 200){
                    let receiver     = xhr.response;
                    resolve(receiver);
                }
                else{
                    reject(xhr.statusText);
                };
            }
            xhr.open("POST", "./php/getDetails.php");
            xhr.send(formData);
        });
    },
}

function onLoadRequestEvent(requestNum, findThis, name){
    return Object.create(requestObject, {
        requestNum :{value: requestNum},
        findThis :{value: findThis},
        name :{value: name},
    })
};

const appendObject = {
    /**Appending to the fieldset or
     * for instance the card below the qnd
     * number input*/
    append() {
        const dataLen = this.data.length;
        $('.analysisSection').remove();
        $("#reAssignDiv").after($('#analysisSection').html());
        /**LOOP TO THE DATA*/
        for(let i=0;i<dataLen;i++){
            switch (i){
                /**Append qdn id number*/
                case 0:
                    $(`#${this.selectorIDs[i]}`).val(this.data[i]);
                break;
                /**append to the analysis cause of 
                 * defects / failure description
                */
                case 18:
                    $(`#${this.selectorIDs[15]}`).val(this.data[i]);
                break; 
                /**Append the the span items*/
                default:
                    $(`#${this.selectorIDs[i]}`).html(this.data[i]);
                break;
            }
        };
    },
    /**Appending Radio Value if exist */
    appendRadio() {
        const selectorIDsLen = this.selectorIDs.length;
        /** LOOP TO THE SELECTORS */
        for(let i=0;i<selectorIDsLen;i++){
            const selectorVal = $(`#${this.selectorIDs[i]}`).val();
            switch(selectorVal){
                /**append to the failure mode*/
                case this.data[15]:
                    $(`#${this.selectorIDs[i]}`).prop("checked", true);
                break;
                /**append to the Disposition*/
                case this.data[16]:
                    $(`#${this.selectorIDs[i]}`).prop("checked", true);
                break;
                /**append to analysis cause of 
                 * defects / failure radio item*/
                case this.data[17]:
                    $(`#${this.selectorIDs[i]}`).prop("checked", true);
                break;
            }
        }   
    },
    appendReassignment() {
        if (this.data){
            let dataLen = this.data.length;
            let count = 0;
            // LOOP TO CHECK IF THERE IS A MATCHED ID BETWEEN ANALYSIS AND REASSIGNMENT TABLE
            for (let i = 0; i < dataLen; i++) {
                let fetchedData = this.data[i]['analysis_tbl_id'];
                // FORMAT OF CUSTOM ELEMENT TO APPEND IF THERE IS A REASSIGNMENT
                const colDiv = document.createElement("div");
                const row1Div = document.createElement("div");
                const row2Div = document.createElement("div");
                const row3Div = document.createElement("div");
                const row4Div = document.createElement("div");
                const row1Lbl = document.createElement("label");
                const row2Lbl = document.createElement("label");

                colDiv.className = "fromDbData row";
                colDiv.id = count;
                row1Div.className = "col-sm-2";
                row2Div.className = "col";
                row3Div.className = "col-sm-2";
                row4Div.className = "col";

                row1Lbl.className = "telfordRed col-form-label";
                row1Lbl.id = "labelSpanName" + count;
                row1Lbl.innerText = "Reassigned To: "

                row2Lbl.className = "telfordRed col-form-label";
                row2Lbl.id = "labelSpanTeam" + count;
                row2Lbl.innerText = "Team: ";
                // END OF FORMAT 

                // CHECKING THE COUNTER
                if (!count) {
                    let reAssEmpName = this.data[i]["reAssignedName"];
                    let reAssignedTeam = this.data[i]["reAssignedTeam"];

                    const span = document.createElement("span");
                    const span2 = document.createElement("span");

                    span.className = "fromdbResutl";
                    span.id = "reAssignToNameSpan" + count;
                    span.innerText = " " + reAssEmpName;

                    span2.className = "fromdbResutl";
                    span2.id = "reAssignToTeamSpan" + count;
                    span2.innerText = " " + reAssignedTeam;

                    $("#issuedToDiv").after(colDiv);
                    $(colDiv).append(row1Div);
                    $(colDiv).append(row2Div);
                    $(colDiv).append(row3Div);
                    $(colDiv).append(row4Div);
                    //Reass Label
                    $(row1Div).append(row1Lbl);
                    //Team Label
                    $(row3Div).append(row2Lbl);
                    // Reass Span
                    $(row2Div).append(span);
                    // Team Span
                    $(row4Div).append(span2);

                    count++;
                }
                else {
                    let reAssEmpName = this.data[i]["reAssignedName"];
                    let reAssignedTeam = this.data[i]["reAssignedTeam"];
                    let newId = document.getElementById(count - 1);

                    const span = document.createElement("span");
                    const span2 = document.createElement("span");

                    span.className = "fromdbResutl";
                    span.id = "reAssignToNameSpan" + count;
                    span.innerText = " " + reAssEmpName;

                    span2.className = "fromdbResutl";
                    span2.id = "reAssignToTeamSpan" + count;
                    span2.innerText = " " + reAssignedTeam;

                    // console.log("MORE REASS", reAssEmpName, reAssignedTeam, newId)

                    $(newId).after(colDiv);
                    $(colDiv).append(row1Div);
                    $(colDiv).append(row2Div);
                    $(colDiv).append(row3Div);
                    $(colDiv).append(row4Div);
                    //Reass Label
                    $(row1Div).append(row1Lbl);
                    //Team Label
                    $(row3Div).append(row2Lbl);
                    // Reass Span
                    $(row2Div).append(span);
                    // Team Span
                    $(row4Div).append(span2);

                    count++;
                };
            };
        }
    

    },
    appendTableContent() {
        //**Check if parm data is not null
        // if not attach the item(s) to the DOM or html page
        if ( this.data ){
            let dataLen = this.data.length;
            console.log(dataLen)
            // LOOP TO HANDLE THE Containments Result
            for (let i=0;i<dataLen;i++) {
                let actions = this.data[i]['actions'];
                let responsible = this.data[i]['responsible'];
                let when = this.data[i]['when'];
                let status = this.data[i]['status'];

                const tblRow = document.createElement('tr');

                const tblRowCol = document.createElement('td');
                const tblRowCol1 = document.createElement('td');
                const tblRowCol2 = document.createElement('td');
                const tblRowCol3 = document.createElement('td');
                
                tblRow.id = `${this.tableName}` + i;

                tblRowCol.id = `${this.tableName}Act` + i;
                tblRowCol.contentEditable = true;
                tblRowCol.className = "pre-wrap";
                tblRowCol.innerText = actions;

                tblRowCol1.id = `${this.tableName}Resp` + i;
                tblRowCol1.contentEditable = true;
                tblRowCol1.className = "pre-wrap";
                tblRowCol1.innerText = responsible;

                tblRowCol2.id = `${this.tableName}When` + i;
                tblRowCol2.contentEditable = true;
                tblRowCol2.className = "pre-wrap";
                tblRowCol2.innerText = when;

                tblRowCol3.id = `${this.tableName}Status` + i;
                tblRowCol3.contentEditable = true;
                tblRowCol3.className = "pre-wrap";
                tblRowCol3.innerText = status;

                // INSERTING TABLE ROW ABOVE THE CLASS "tdbodyContainment"
                if (i === 0) {
                    console.log("i is equal to zero");
                    $(`.${this.tableName}Tbody`).prepend($(tblRow));
                    $(tblRow).append(tblRowCol);
                    $(tblRow).append(tblRowCol1);
                    $(tblRow).append(tblRowCol2);
                    $(tblRow).append(tblRowCol3);
                }
                else {
                    console.log("i is greater than 0");
                    const tblRowNew = document.createElement('tr');
                    tblRowNew.id = `${this.tableName}` + i;
                    var newtr = document.getElementById("correction" + (i - 1));
                    console.log(tblRowNew);
                    $(newtr).after(tblRow);
                    $(tblRow).append(tblRowCol);
                    $(tblRow).append(tblRowCol1);
                    $(tblRow).append(tblRowCol2);
                    $(tblRow).append(tblRowCol3);
                }
                // INSERTING TABLE ROW BELOW THE THE NEWLY INSERTED ROW
                // else {
                
                // };
            };
            // </ END OF LOOP
        };
        // </End of checking
    }
}
function onloadAppendToDOM(data, selectorIDs, tableName) {
    return Object.create(appendObject, {
        data: {value: data},
        selectorIDs: {value: selectorIDs},
        analysisTblId: {value: selectorIDs},
        /**table variables*/
        tr:{value: document.createElement('tr')},
        tblRowCol:{value: document.createElement('td')},
        tblRowCol1:{value: document.createElement('td')},
        tblRowCol2:{value: document.createElement('td')},
        tblRowCol3:{value: document.createElement('td')},
        tblRowNew:{value: document.createElement('tr')},
        tableName: {value: tableName}
    });
   
};

    
$(document).ready(async function () {//*✅*/
    /**
     * Onload Event ✅
     * Search the latest qnd ✅
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
        /*INSTANCE OF ONLOAD REQUEST*/
        const onloadRequest = new onLoadRequestEvent(8.2);
        /**ONLOAD RAW DATA */
        const result = await onloadRequest.request();
        /**CONVERTING THE OJECT INTO ARRAY OF OBJECT VALUE*/
        const filteredData = Object.values(result[0]);
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
        /**INSTANCE OF ONLOAD REQUEST with parameter of 9 for requestNum and 
         *filteredData[19] for findThis */
        const reassignmentRequest = new onLoadRequestEvent(9, filteredData[19]);
        /**EXECUTING THE METHOD TO FETCH THE DATA FROM THE AJAX REQUEST */
        let reAssRawData = await reassignmentRequest.requestForReassignment();
        /**INSTANCE OF APPEND OBJECT */
        const onloadAppendReass = new onloadAppendToDOM(reAssRawData);
        /**EXECUTION OF METHOD APPEND REASSIGNMENT IF EXIST*/
        onloadAppendReass.appendReassignment();

        /**CONTAINMENT, CORRECTION, AND CORRECTIVE INSTANCE */
        const containmentRequest = new onLoadRequestEvent(10, filteredData[19], 'matchedContainment');
        const correctionRequest = new onLoadRequestEvent(11, filteredData[19], 'matchedCorrection');
        const correctiveRequest = new onLoadRequestEvent(10, filteredData[19], 'matchedContainment');
        /**METHOD  EXECUTION STORING DATA TO CONSTANT VARIABLE
         * Note:
         * cont = containment
         * corr = correction
         * crtv = corrective
         */
        const cont = await containmentRequest.requestForTableData();
        const corr = await correctionRequest.requestForTableData();
        const crtv = await correctiveRequest.requestForTableData();
        /*Append instance */
        const onloadAppendCont = new onloadAppendToDOM(cont, filteredData[19], "containment");
        // const onloadAppendCorr = new onloadAppendToDOM(corr, filteredData[19], "correction");
        // const onloadAppendCrtv = new onloadAppendToDOM(crtv, filteredData[19], "corrective");
        onloadAppendCont.appendTableContent();
        // onloadAppendCorr.appendTableContent();
        // onloadAppendCrtv.appendTableContent();

        // console.log("This is the containment data", cont);


    }catch (e){
        console.log(e);
    }
   
   

    //=====================================================>
    // START OF ANALYSIS AUTOCOMPLETE(AC) KEYUP FUNCTION
    //=====================================================>
    $("#qdnNumber").on("input", async function () {
        /** .replace will removed excess spaces */
        let usrInput = $(this).val().replace(/\s/g,'');
        let usrInputLen = usrInput.length;
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