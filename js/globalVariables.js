/**REASSIGNMENT VARIABLES */
var reAssignmentInputs = `<div id='reAssignment'>
    <div  class='row '>
        <div class='col-4'>
            <label for='reAssignTo' class='col-form-label'>ReassignTo</label>
            <input id='reAssignTo' type='number' class='form-control' placeholder='Employee #...' required/>
        </div>
        <div class='col-5'>
            <label class='col-form-label' for='reAssignToName'>Emp. Name:</label>
            <input id='reAssignToName' type='text' class='form-control' placeholder="Autofill..." disabled/>
        </div>
        <div class='col-3'>
            <label class='col-form-label'>Team:</label>
            <input id='reAssignToTeam' type='text' class='form-control' placeholder="Autofill..." disabled/>
        </div>
    </div>
    <div class='row'>
        <div class = 'col-4'></div>
        <div class = 'col-5'>
            <label class='col-form-label' for='dept' >Department:</label>
            <input id='dept' type='text' class='form-control' placeholder="Autofill..." disabled/>
        </div>
        <div class = 'col-3'></div>
    </div>
    <div class='row col-form-label-lg mt-3'>
        <div class='col'>
            <label class='col-form-label'>Reassignment Description:</label>
            <textarea id='reAssignmentDes' class='form-control text-center w-50' rows='2' required></textarea>
        </div>
    </div>
    <button class='submitReassignment w-100 btn btn-primary btn-lg mt-3' id='submitReassignment'>Submit for Reassignment</button>
</div>`;

/**DATE VARIABLES */
const month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

const date = new Date();
const currentDay = date.getDate();
/**ALERTS GLOBAL VARIABLES*/
let fontColor;
let bgOverlayColor;
let bgColorImage;
let bgColor;
let bdGifUrl;
let bdPosition;
let bdColor;

/**APPROVAL QDN NUMBER INPUT */
const qdnNumberInput = document.getElementById("qdnNumber");
/**OBJECT RESPONSIBLE FOR ALERTS*/
const alertObject = {
    /** ERROR ALERT */
    async errorAlert() {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
                popup: 'colored-toast'
            },
            allowEscapeKey: false,
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            //**This will let you pause and play the alert loading*/
            didOpen: (toast) => { 
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        await Toast.fire({
            icon: 'error',
            title: `${this.title}`,
            html:"<b style ='color:red;'>"+  `${this.body}` +"</b>",
        });
    },
    /**DEFAULT ALERT THEME*/
    defaultThemeSetting() {
        fontColor = "#595959";
        bgColor = `#fff`;
        /**DEFAULT LINEAR radial gradient*/
        bdColor = `radial-gradient(circle, rgba(128,0,0, 0.6) 0%, rgba(127,127,7,0.6) 46%)`;
        /**BEE GIF */
        bdGifUrl = `url("https://boholbeefarm.com/img/buzzbee.gif")`;
        bdPosition = `center`
    },
    /**HALLOWEEN ALERT THEME*/
    halloweenThemeSetting() {
        fontColor = "#fff";
        bgColor = `#000`;
        /**broom with pumpkin image*/
        bgColorImage = `#000 url(https://images.pexels.com/photos/5408080/pexels-photo-5408080.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)`;
        /**HALLOWEEN*/
        bdColor = `linear-gradient(94deg, rgba(186,59,0,0.6) 0%, rgba(0,0,0,0.6) 100%)`;
        /**GHOST GIF**/
        bdGifUrl = `url("https://images.squarespace-cdn.com/content/v1/57fc473b6a496313f1bf59ea/1597463916534-UJCWHLQ8HC1I591ZWVIS/giphy-ghost-alt.gif")`;
        bdPosition = `top left`;
    },
    /**CHRISTMAS ALERT THEME */
    christmasThemeSetting() {
        fontColor = "#fff";
        bgColorImage = `linear-gradient(45deg, rgba(4,186,0,1) 0%, rgba(200,7,7,1) 100%)`;
        /**CHRISTMAS GRADIENT*/
        bdColor ='linear-gradient(45deg, rgba(17,121,0, 0.6) 0%, rgba(215,166,0, 0.6) 51%, rgba(184,0,0, 0.6) 100%)';
        /**GHOST GIF**/
        bdGifUrl = 'url("https://i.giphy.com/media/7XAD7iitnID83tQ1WC/giphy.webp")';
        bdPosition = `bottom left`;
    },
    /**NEW YEAR'S ALERT THEME*/
    newYearThemeSetting() {
        fontColor = "#fff";
        bgColorImage = `radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(185,185,185,1) 100%)`;
        /**NEW YEAR GRADIENT*/
        bdColor =`radial-gradient(circle, rgba(0,0,0,0.8687850140056023) 70%, rgba(185,185,185,0) 100%)`;
        /**FIREWORKS GIF**/
        bdGifUrl = `url("https://i.giphy.com/media/3OvuH0GxGvbiakzthp/giphy.webp")`;
        bdPosition = `center`;
    },
    /**METHOD FOR CHECKING WHAT THEME 
     * SHOULD WE USE BASED ON THE DATE*/
    setTheme(){
        const currentDay = date.getDate();
        switch(this.monthOnly){
            case "November":
                if ((currentDay > 0) && (15 >= currentDay)){
                    this.halloweenThemeSetting();/**HALLOWEEN*/
                }
                else{
                    this.christmasThemeSetting();/**CHRISTMAS*/
                }
            break;
            case "December": 
                this.christmasThemeSetting();/**CHRISTMAS*/
            break;
            case "January": 
                this.newYearThemeSetting();/**NEW YEAR*/
            break;
            default:
                this.defaultThemeSetting();/**DEFAULT*/
            break;
        };
    },
    /** SUCCESS ALERT */
    successAlert() {
        this.setTheme();
        return Swal.fire({
            title: `<h2 style="color: ${fontColor}; font-weight: bold;"> ${this.title}</h2>`,
            html:`<b style ='color:${fontColor}; font-size: 1.5rem'>`+  `${this.body}` +"</b>",
            width: 400,
            /**SUCCESS GIF*/
            imageUrl: 'https://images.squarespace-cdn.com/content/v1/5063b09ee4b016af496f9ae8/1580760898623-CS6M1E5EM0S45D4328ZG/success_celebration_400.gif',
            imageWidth: 200,
            imageHeight: 200,
            timer: 2500,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false, 
            background: `${bgColorImage}`,
            backdrop:`${bdPosition}
            no-repeat
            ${bdGifUrl},
            ${bdColor}
            ${bdPosition}`,
            //**This will let you pause and play the alert loading*/
            didOpen: (toast) => { 
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        }); 
    },
    /** SUCCESS ALERT */
    reprocessAlert() {
        this.setTheme();
        return Swal.fire({
            title: `<span style="color: ${fontColor}; font-weight: bold;">${this.title}</span>`,
            html: `<input style="color: ${fontColor};" type="text" id="login" class="swal2-input" placeholder="Username">
            <input style="color: ${fontColor};" type="password" id="password" class="swal2-input" placeholder="Password">`,
            confirmButtonText: 'Submit!',
            width: 600,
            padding: '1.2rem',
            background: `${bgColorImage}`,
            backdrop: `
            ${bdPosition}
            no-repeat
            ${bdGifUrl},
            ${bdColor}
            ${bdPosition}`,
            focusConfirm: false,
            preConfirm: function() {
                return new Promise(async function (resolve) {
                    const empId = Swal.getPopup().querySelector('#login').value
                    const password = Swal.getPopup().querySelector('#password').value
                    var employeeId = $.trim(empId);
                    var empPass = $.trim(password);
                    const qndNum = $("#qdnNumber").val().replace(/\s/g,'');
                    /**TRY CATCH BLOCK TO VALIDATE THE PASSWORD*/ 
                    try{
                        /**STORING PARAMETERS INTO OBJECT */
                        /**NOTE
                         * a = for ajax request number
                         * b = for employee Number
                         * c = for employee Password
                         * d,e = for ajax name value stored in formData which will used 
                         * for post request in getDetail.php*/
                        const parameter = {a: 22, b: employeeId, c: empPass, d: "empId", e: "userPassInput"};
                        /**INSTANCE OF THE approversOnLoadRequestEvent OBJECT*/
                        const validate = new approversOnLoadRequestEvent(parameter);
                        /**METHOD EXECUTION*/
                        await validate.reprocessCredValRequest();
                    }
                    catch{
                        Swal.showValidationMessage(`Invalid Approver ID or Password!`);
                    };
                    /**TODO
                     * VALIDATE PASSWORD
                     * IF VALID:
                     *      # SUCCESS ALERT
                     *      # CHECK IF REASSIGNMENT EXITS
                     *      # EXIST: GET THE EMAILS RECEIVERS data[0]['to']
                     *      # EXIST FALSE: GET THE EMAILS RECEIVERS OF data[i]['issuedTo']
                     *      # SET STATUS TO 0
                     * IF INVALID;
                     *      # JUST SWAL VALIDATION MESSAGE     
                     */
                    setTimeout(function () {
                        resolve();
                    }, 250);    
                });
            }
        }); 
    }       
};
/**OBJECT RESPONSIBLE FOR REASSIGNMENT EVENT*/
const reAssignEvent = {
    unsetReAssignmentData: function(){
        /**REMOVING REASSIGNMENT */
        let reAssignment = document.querySelectorAll(".fromDbData");
        for(let i=0;i<reAssignment.length;i++){
            reAssignment[i].remove();
        }
    },
    toggleOff: async function() {
        $("#reAssignment, #submitReassignment").remove();
        $("#reAssignDiv").after($('#analysisSection').html());
        this.unsetReAssignmentData();
        let currentMatchedQdnNum = $("#qdnNumber").val().replace(/\s/g,'');
        /*INSTANCE OF ONLOAD REQUEST*/
        const onloadRequest = new onLoadRequestEvent(8, currentMatchedQdnNum);
        /**MATCHED QDN NUMBER FROM urlParam Parameter */
        let details = await onloadRequest.searchQdnDetails();
        const filteredDetails = Object.values(details[0]);
        appendToDOM(filteredDetails);
    },
    autoComplete: function(response) {
        // VARIABLE FOR EACH ROW RESULT FROM DATABASE
        var empName = response[0]['EMP_NAME'];
        var empTeam = response[0]['TEAM'];
        var empDepart = response[0]['DEPARTMENT'];
        // console.log("Details from Database", empName, "Team", empTeam);
        // PARSING VARIABLE TO THE HTML ELEMENT
        $('#reAssignToName').val(empName);
        $('#reAssignToTeam').val(empTeam);
        $('#dept').val(empDepart);
        $("#reAssignToName,#reAssignToTeam, #reAssignTo, #dept")
            .css({
                "border": "",
            });
        $("#reAssignToName, #reAssignToTeam")
            .attr("placeholder", "");
        $("#reAssignToName, #reAssignToTeam, #reAssignTo, #dept")
            .css({
                "color": "",
                "border": "1px solid #63f200"
            });
    },
};
/** OBJECT RESPONSIBLE FOR DATABASE REQUEST */
const requestObject = {
    /**Request for latest QDN DETAILS */
    latestQdn() {
        return $.ajax({
            type: 'POST',
            url: "./php/getDetails.php",
            data: {request: this.requestNum },
            cache: false,
            dataType: "json",
        });
    },
    /**Request for Reassignment details */
    requestForReassignment(){
        return $.ajax({
            type: 'POST',
            url: "./php/getDetails.php",
            data: { matchedReAss: this.findThis, request: this.requestNum },
            cache: false,
            dataType: "json"
        });
    },
    /**request for containment, correction or corrective data */
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
                    console.log(window.location.href);
                    reject(xhr.statusText);
                   
                };
            }
            xhr.open("POST", "./php/getDetails.php");
            xhr.send(formData);
        });
    },
    searchQdnDetails() {
        return $.ajax({
            type: 'POST',
            url: "./php/getDetails.php",
            data: { matchedQdnNum: this.usrInput, request: this.requestNum },
            cache: false,
            dataType: "json",
        });
    },
    searchForEmployee() {
        return $.ajax({
            type: 'POST',
            url: "./php/getDetails.php",
            data: { employeeId: this.usrInput, request: this.requestNum },
            cache: false,
            dataType: "json",
        });
    },
    /**RETURN SUGGESTION JSON DATA*/
    autoCompleteDataRequest(){
        return new Promise ((resolve, reject)=>{
            $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data:{request: this.requestNum, searchForThisQdnNo: this.usrInput, status: this.status},
                cache: false,
                dataType: "json",
                success: function(response){
                    resolve(response);
                },
                error: function(e){
                    reject(e);
                }
            });
        });
    },
    /**RETURN SUGGESTION JSON DATA*/
    reprocessCredValRequest(){
        return new Promise ((resolve, reject)=>{
            const creds = new FormData();
            creds.append(this.name,  this.userName);
            creds.append(this.name1,  this.password);
            creds.append('request', this.request);
            $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: creds,
                processData: false,
                contentType: false,
                cache: false,
                dataType: "json",
                success: function(response){
                    resolve(response);
                    /**Success Alert for  Reassignment */
                    const reprocessAlertFormat = new alertFactory(`REPROCESS GRANTED!<br> 🎉 🥳 🎉`,
                    `<b style="color:#c4c4c4;">QDN Number:</b><em>${qndNum}</em>`);
                    /**METHOD EXECUTION*/
                    reprocessAlertFormat.successAlert().then(()=>{
                        window.location.href ='';
                    });
                },
                error: function(e){
                    reject(e);
                }
            });
        });
    },
    /**TEST METHOD*/
    testCases() {
        const sampleObject = this.one;
        return sampleObject;
    }
};
/** OBJECT RESPONSIBLE FOR APPENDING DATA TO THE DOM */
const eventsObject = {
    /**Appending to the fieldset or
     * for instance the card below the qnd
     * number input*/
    append() {
        const dataLen = this.data.length;
        $('.analysisSection').remove();
        $("#reAssignDiv").remove();
        $(".issueDetails").after($('.reAssignmentBtn').html());
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
    },/**METHOD ENDS HERE*/
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
    },/**METHOD ENDS HERE*/
    /**Appending reassignment details*/
    appendReassignment() {
        if (this.data){
            let dataLen = this.data.length;
            // LOOP TO CHECK IF THERE IS A MATCHED ID BETWEEN ANALYSIS AND REASSIGNMENT TABLE
            for (let i=0;i<dataLen;i++) {
                // FORMAT OF CUSTOM ELEMENT TO APPEND IF THERE IS A REASSIGNMENT
                const colDiv = document.createElement("div");
                const row1Div = document.createElement("div");
                const row2Div = document.createElement("div");
                const row3Div = document.createElement("div");
                const row4Div = document.createElement("div");
                const row1Lbl = document.createElement("label");
                const row2Lbl = document.createElement("label");

                colDiv.className = "fromDbData row";
                colDiv.id = i;
                row1Div.className = "col-sm-2";
                row2Div.className = "col";
                row3Div.className = "col-sm-2";
                row4Div.className = "col";

                row1Lbl.className = "telfordRed col-form-label";
                row1Lbl.id = "labelSpanName" + i;
                row1Lbl.innerText = "Reassigned To: "

                row2Lbl.className = "telfordRed col-form-label";
                row2Lbl.id = "labelSpanTeam" + i;
                row2Lbl.innerText = "Team: ";
                // END OF FORMAT 

                // CHECKING THE COUNTER
                if (!i) {
                    let reAssEmpName = this.data[i]["reAssignedName"];
                    let reAssignedTeam = this.data[i]["reAssignedTeam"];

                    const span = document.createElement("span");
                    const span2 = document.createElement("span");

                    span.className = "fromdbResutl";
                    span.id = "reAssignToNameSpan" + i;
                    span.innerText = " " + reAssEmpName;

                    span2.className = "fromdbResutl";
                    span2.id = "reAssignToTeamSpan" + i;
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
                }
                else {
                    let reAssEmpName = this.data[i]["reAssignedName"];
                    let reAssignedTeam = this.data[i]["reAssignedTeam"];
                    let newId = document.getElementById(i - 1);

                    const span = document.createElement("span");
                    const span2 = document.createElement("span");

                    span.className = "fromdbResutl";
                    span.id = "reAssignToNameSpan" + i;
                    span.innerText = " " + reAssEmpName;

                    span2.className = "fromdbResutl";
                    span2.id = "reAssignToTeamSpan" + i;
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
                };
            };
        }
    },/**METHOD ENDS HERE*/
    appendTableContent() {
        /**Check if data is not null*/
        if ( this.data ) {
            let dataLen = this.data.length;
            /**LOOP TO HANDLE THE Containments Result*/
            for (let i=0;i<dataLen;i++) {
                let actions = this.data[i]['actions'];
                let responsible = this.data[i]['responsible'];
                let when = this.data[i]['when'];
                let status = this.data[i]['status'];
                let fetchedId = this.data[i]['analysis_tbl_id'];

                const tblRow = document.createElement('tr');

                const tblRowCol = document.createElement('td');
                const tblRowCol1 = document.createElement('td');
                const tblRowCol2 = document.createElement('td');
                const tblRowCol3 = document.createElement('td');
                /**Assigning for the element attributes */
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
                /**END OF Assigning*/
                /**INSERTING TABLE ROW ABOVE THE CLASS "tdboyCorrection"*/
                if ((fetchedId === this.analysisTblId) && (!i)) {
                    $(`.${this.tableName}Tbody`).prepend($(tblRow));
                    $(tblRow).append(tblRowCol);
                    $(tblRow).append(tblRowCol1);
                    $(tblRow).append(tblRowCol2);
                    $(tblRow).append(tblRowCol3);
                }
                /**INSERTING TABLE ROW BELOW THE THE NEWLY INSERTED ROW*/
                else if ((fetchedId === this.analysisTblId) && (i)) {
                    const tblRowNew = document.createElement('tr');
                    tblRowNew.id = `${this.tableName}` + i;
                    var newtr = document.getElementById(`${this.tableName}` + (i - 1));
                    $(newtr).after(tblRow);
                    $(tblRow).append(tblRowCol);
                    $(tblRow).append(tblRowCol1);
                    $(tblRow).append(tblRowCol2);
                    $(tblRow).append(tblRowCol3);
                };
            };/**</ END OF LOOP*/
        }/**END OF IF STATEMENT*/
    },/**METHOD ENDS HERE*/
    appendApproverTableContent() {
        /**Check if data is not null*/
        if ( this.data ) {
            let dataLen = this.data.length;
            /**LOOP TO HANDLE THE Containments Result*/
            for (let i=0;i<dataLen;i++) {
                let actions = this.data[i]['actions'];
                let responsible = this.data[i]['responsible'];
                let when = this.data[i]['when'];
                let status = this.data[i]['status'];
                /**INSERTING TABLE ROW ABOVE THE CLASS "tdboyCorrection"*/
                if (!i) {
                    /**APPENDING DATA TO THE EXISTING TABLE LAYOUT */
                    document.getElementById(`${this.tableName}Col`).innerText = actions;
                    document.getElementById(`${this.tableName}RespCol`).innerText = responsible;
                    document.getElementById(`${this.tableName}WhenCol`).innerText = when;
                    document.getElementById(`${this.tableName}StatCol`).innerText = status;
                }
                /**INSERTING TABLE ROW BELOW THE THE NEWLY INSERTED ROW*/
                else {
                    /**CREATING ROW ELEMENT */
                    const trElement = document.createElement('tr');
                    trElement.classList.add(`${this.tableName}Row${i}`);
                    /**ADDING THIS CLASS WILL ALLOW US TO REMOVED THE INSERTED ROWS */
                    trElement.classList.add(`insertedRow`);
                    /**CREATING ROW COLUMN*/
                    /**COLUMN ACTIONS */
                    const actElement = document.createElement('td');
                    actElement.innerText = actions;
                    /**COLUMN RESPONSIBLE */
                    const respElement = document.createElement('td');
                    respElement.innerText = responsible;
                    /**COLUMN WHEN */
                    const whenElement = document.createElement('td');
                    whenElement.innerText = when;
                    /**COLUMN STATUS */
                    const statElement = document.createElement('td');
                    statElement.innerText = status;
                    /**APPENDING ROW ELEMENT TO THE TABLE BODY */
                    $(`#${this.tableName}Tbody`).append(trElement);
                    /**APPENDING ROW CELL DATA*/
                    $(trElement).append(actElement);
                    $(trElement).append(respElement);
                    $(trElement).append(whenElement);
                    $(trElement).append(statElement);
                };
            };/**</ END OF LOOP*/
        }/**END OF IF STATEMENT*/
    },/**METHOD ENDS HERE*/
    /**THIS WILL QDN NUMBERS AS ARRAY */
    ACRawDataToArray(){
        /**This will hold the loop result */
        let qdnNumbers = [];
        /**storing length in variable will make
         * the script run faster than usual*/
        let dataLen = this.data.length;
        /**LOOP TO push the QDN Numbers*/
        for (var i = 0; i < dataLen; i++) {
            qdnNumbers.push(this.data[i]['qdnNo']);
        };
        return qdnNumbers;      
    },
};
/**OBJECT TO UNSET THE INSERTED DATA FROM DATABASE USING SEARCH EVENT
 * OR SOMETHING*/
const unsetInsertedData = {
    /**REMOVED THE INSERTED ROWS
     * SET DEFAULT VALUE OF TABLES  */
    approvalRemovedInsertedRwo(){
        let reAssignment = document.querySelectorAll(".insertedRow");
        for(let i=0;i<reAssignment.length;i++){
            reAssignment[i].remove();
        }
    },
    approvalSetTableDefaultValue(){
        let defaultColumn = document.querySelectorAll('.defaultCol');
        for(let i=0;i<defaultColumn.length;i++){
            $(defaultColumn[i]).html("Blank");
        };
    }

};
/**OBJECT FOR THE EMAIL FORMAT*/
const emailFormats = {
    initialEmailFormat(){
        // SCRIPT FOR EMAIL SENDING AND EMAIL
        Email.send({
            Host: "smtp.gmail.com",
            Username : "systemqdn2021@gmail.com",
            Password : "tjvxdnvqvepgtwck",
            // To : this.receiver,
            To : "chanchristianarana@gmail.com",
            From : "systemqdn2021@gmail.com",
            // Subject : "Reanalysis Granted QDN No. " + this.qndNumber ,
            Subject : this.subject,
            Body : this.body +
            "<br><strong>Note:</strong><br>" +
            "<i>    This notification is an automated message. Please do not reply directly to this email.</i>"
            // Body : "Need to Reprocess QDN Number " + "<a href='http://127.0.0.1/sandbox/QDN/approval.php'>" + this.qndNumber + "</a> <br>" + "Requested by: " + this.authPerson +   "<br><br>" +
            // "<strong>Note:</strong><br>" +
            // "<i>  This notification is an automated message. Please do not reply directly to this email.</i>" 
        });
    }
     
};
function sendEmail(details){
    return Object.create(emailFormats, {
        receiver :{value: details.r},
        subject: {value: details.s},
        body: {value: details.b}
    })
};