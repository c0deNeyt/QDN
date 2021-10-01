'use strict'

// CONSTRUCTOR FUNCTION
function Approval(){
    this.userInputPass;
    this.empId;
    this.approverName;
    this.userReqId;
    this.qdnNumber;
};
/** THIS FUNCTION WILL CREAT AN OBJECT */
Approval.prototype.getVal = function() {
    const initObj = {
        pass: this.userInputPass,
        id: this.empId,
        empName: this.approverName,
        requestId: this.userReqId,
        qdnNumber:  this.qdnNumber,
    }
    return initObj;
};
Approval.prototype.getQdnNum = function () {
    let e = document.getElementById('qdnNumber');
    this.qdnNumber = e.value;
    let r = this.qdnNumber
    return r;
}

function FetchApprover(qndNumber){
    this.fetching = new Promise (function (resolve, reject) {
        const formData = new FormData();
        formData.append('qdnNum', qndNumber);
        formData.append('request', 19.1);
        fetch('./php/getDetails.php', {
        method: 'POST',
        body: formData
        })
        .then(response => response.json())
        .then(result => {
            resolve(result);
        })
        .catch(error => {
            const alert = new alerts();
            reject(reject)
            alert.errorAlert(error);
        });
    });
};
function SetSelectDefaultVal(selectorId, approversArray) {
    this.fetchApproverNow = function() {
        // return approversArray;
    }
    $(`#${selectorId}-button`).html(`${approversArray}`);
}

/** CLASS FOR THE REQUEST */
class approverReq {
    // constructor(qndNo){
    //     this.qdnNumber = qndNo;
    // }
    /** REQUEST FOR APPROVERS LIST METHOD */
    approversListReq(reqNum) {
        return $.ajax({
            type: 'POST',
            url: './php/getDetails.php',
            data: {request: `${reqNum}`},
            cache: false,
            dataType:'json'
        });
    }
    /** Method to verify the approvers
     * credentials*/
    checkCredsDetails(){
        const initVal = new Approval();
        initVal.setCredsVal();
        const credObj = initVal.getVal();
        console.log(this);
        return $.ajax({
            type: 'POST',
            url: './php/getDetails.php',
            data: { userPassInput: credObj.pass, empId: credObj.id, request: 15},
            dataType: 'json',
            success: function () {
                /** INSTANTIATING THE approverReq class or object
                 * inside the scope of success this function*/
                const alert = new alerts();
                this.initUpdate = new approverReq();
                /** This will execute the updateApprover method */
                this.initUpdate.updateApprover();
                alert.successAlert();
            },
            error: function (error) {
                // ERROR HANDLING ALERT WHEN PASSWORD NOT MATCHED
                Swal.showValidationMessage(`Invalid password.`);
            }
        });
    }
    /** The valid credential will execute this method
     * Update the Approver to the DB*/
    updateApprover() {
        const iniCreds = new Approval();
        iniCreds.setCredsVal();
        const n = iniCreds.getVal();
        $.ajax({
            type: 'POST',
            url: "./php/authUpdate.php",
            data: { approverName : n.empName, qdnNumber: n.qdnNumber, request: n.requestId },
            cache: false,
            dataType: "json",
        });
    }
    /** REQUEST FOR QND DETAILS */
    getQdnDetails() {
        return new Promise (function (resolve, reject) {
            const formData = new FormData();
            formData.append('qdnNum', "T8321-137");
            formData.append('request', 19.1);
            fetch('./php/getDetails.php', {
            method: 'POST',
            body: formData
            })
            .then(response => response.json())
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                const alert = new alerts();
                reject(reject)
                alert.errorAlert(error);
            });
        })

    }
};
/** CLASS FOR ALL ALERTS */
class alerts {
    /** APPROVAL PASSWORD MODAL */
    credentialAlert (data, selectorID){
        Swal.fire({
            title: 'Enter your password',
            html: `<input type="password" id="password" class="swal2-input" placeholder="Password">`,
            inputPlaceholder: 'Enter your password',
            focusConfirm: false,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: function () { // OK BUTTON
                return new Promise(function (resolve, reject) {
                    /**Setting the value of a factory function Approval*/
                    Approval.prototype.setCredsVal = function() {
                        const inputCreds = {
                            empId : data.item.value,
                            approverName: data.item.label,
                            password : Swal.getPopup().querySelector('#password').value.trim()
                        }
                        switch (selectorID) {
                            case "productionAuth":
                                this.userReqId=1;
                            break;
                            case "EEAuth":
                                this.userReqId=2;
                            break;
                            case "PEAuth":
                                this.userReqId=3
                            break;
                            case "qaAuth":
                                this.userReqId=4;
                            break;
                            case "othersAuth":
                                this.userReqId=5;
                            break;
                        }
                        this.empId = inputCreds.empId;
                        this.approverName = inputCreds.approverName;
                        this.userInputPass = inputCreds.password;
                        this.qdnNumber = document.getElementById('qdnNumber').value;
                    };
                    const appReq = new approverReq();
                    /** This will validate the user input */
                    appReq.checkCredsDetails();
                    setTimeout(function () {
                        resolve();
                    }, 1000);
                });
            },
            didDestroy: function (result) {
                // HANDLE THE CANCEL EVENT HERE
                console.log("You canCeled the alert!!");
            }
        });
    };
    /** ERROR ALERT */
    async errorAlert(errorVar) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
              popup: 'colored-toast'
            },
            allowEscapeKey: false,
            showConfirmButton: false,
            timer: 500000,
            timerProgressBar: true,
            //**This will let you pause and play the alert loading*/
            didOpen: (toast) => { 
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          await Toast.fire({
            icon: 'error',
            title: 'Something Went Wrong!',
            html:"<b style ='color:red;'>"+  errorVar +"</b>",
          });
    }
    /** SUCCESS ALERT */
    async successAlert() {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
              popup: 'colored-toast'
            },
            allowEscapeKey: false,
            showConfirmButton: false,
            timer: 10000,
            timerProgressBar: true,
            //**This will let you pause and play the alert loading*/
            didOpen: (toast) => { 
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        await Toast.fire({
            icon: 'success',
            title: 'Access Granted!',
        }).then(()=>{
            window.location.replace("approval.php?qdnNumber=T71221-1");
        });
    }
};
/** CLASS FOR THE EVENT HANDLERS */
class approverEvt extends alerts {
    constructor() {
       super();
    };
    credValidation () {
        this.selectmenu({
            /* HANDLE SELECT EVENT WHEN 
             * APPROVER NAME IS CLICKED */
            select: async function (click, data) {
                // console.log("(credentialAlert Executed!)", this.id);
                /**this will return password input modal */
                this.accessingAlerts = new approverEvt();
                this.accessingAlerts.credentialAlert(data, this.id);
                const qndNum = new Approval();
                const getQdnNum = qndNum.getQdnNum();
                const getObj = qndNum.getVal();
                
                const test =  new FetchApprover(getObj.qdnNumber);
                let r = await test.fetching;
                console.log(r[0]['qa_auth_col']);
                const approverFromDb = new SetSelectDefaultVal(this.id, r[0]['qa_auth_col']);
                // let x = approverFromDb.fetchApprover();
                // console.log(x);
                /**
                 * CRATE A FUNCTION THAT WILL SET THE VALUE
                 * OF THE SELECT MENU BASED ON THE DATABASE
                 * IF THE VALUE IS NULL HAVE IT BE Needs Approval...
                 * 
                 * SET THE SELECT ELEMENT VALUE BASED ONT HE DB
                 */
            },
            /** This will set the position of 
             * select menu*/
            position: {
                my: "center center",
                at: "center top", 
                collision: "fit"
            },
        })
        .selectmenu("menuWidget")
        .addClass("overflow");
    };
};
/** CLASS FOR THE MAIN LOGIC */
class appendAuth extends approverReq{
    appendAuthToDOM (data, selector) {
        let dataLen = data.length;
        // LOOP TO HANDLE EACH APPROVER NAMES
        for (var i = 0; i < dataLen; i++) {
            var approverName = data[i]['EMP_NAME'];
            var empNum = data[i]['id'];
            // APPENDING APPROVER NAME TO THE SELECT MENU
            var option = new Option(approverName, empNum);
            $(option).html(approverName);
            selector.append(option);
        };
        return selector;
    };
    // URL TO SEAR QND NUMBER
    // test() {
    //     const parameter = (new URL(document.location)).searchParams;
    //     const urlParam = parameter.get('qndNo');
    //     document.getElementById("qdnNumber").value = urlParam;
    // }
};
//FUNCTION TO RESPONSIBLE FOR INSTANTIATING
(async function() {
    /**INSTANTIATING... */
    const approverReqExec = new approverReq();  
    /* Request for approvers list */
    let rawDataProd = await approverReqExec.approversListReq(14);
    let rawDataEE = await approverReqExec.approversListReq(14.1);
    let rawDataPE = await approverReqExec.approversListReq(14.2);
    let rawDataQA = await approverReqExec.approversListReq(14.3);
    let rawDataO = await approverReqExec.approversListReq(14.4);
    /** Appending the approvers list to the DOM */
    const appendAuthExec = new appendAuth();
    /** Appending prod approvers... */
    let PROD = appendAuthExec.appendAuthToDOM(rawDataProd, $("#productionAuth"));
    /** Appending EE approvers... */
    let EE = appendAuthExec.appendAuthToDOM(rawDataEE, $("#EEAuth"));
    /** Appending PE approvers... */
    let PE = appendAuthExec.appendAuthToDOM(rawDataPE, $("#PEAuth"));
    /** Appending QA approvers... */
    let QA = appendAuthExec.appendAuthToDOM(rawDataQA, $("#qaAuth"));
    /** Appending Others approvers... */
    let O = appendAuthExec.appendAuthToDOM(rawDataO, $("#othersAuth"));
   
    /** Instance of Approvers event each param contains selector*/
    const approverEvtExec = new approverEvt();
    /** Prod parameter binding */
    const executeProdBind = approverEvtExec.credValidation.bind(PROD);
    executeProdBind();
    /** EE parameter binding */
    const executeEeBind = approverEvtExec.credValidation.bind(EE);
    executeEeBind();
    /** PE parameter binding */
    const executePeBind = approverEvtExec.credValidation.bind(PE);
    executePeBind();
    /** QA parameter binding */
    const executeQaBind = approverEvtExec.credValidation.bind(QA);
    executeQaBind();
    /** Others parameter binding */
    const executeOBind = approverEvtExec.credValidation.bind(O);
    executeOBind();

    const qndNum = new Approval();
    const getQdnNum = qndNum.getQdnNum();
    const getObj = qndNum.getVal();
    console.log("I need this QDN Number %c" + getObj.qdnNumber, 'background: #000; color: lightGreen;');   
})();
/**TO OD LIST 
 * >> ALERT FOR ACCESS GRANTED | Done
 * >> CHECK THE ALWAYS REFER TO THE DB VALUE OF APPROVERS
 * >>> REQUEST QND LATEST AUTH VALUE 
 * >>> APPEND TO THE SELECT MENU VALUE 
 * 
 */

  