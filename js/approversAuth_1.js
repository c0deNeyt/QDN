'use strict'

// CONSTRUCTOR FUNCTION
function Approval(){
    this.userInputPass;
    this.empId;
    this.approverName;
};
Approval.prototype.getVal = function() {
    const initObj = {
        pass: this.userInputPass,
        id: this.empId,
        empName: this.approverName,
    }
    return initObj;
};
class approverReq {
    constructor (){
        const initVal = new Approval()
        const credObj = initVal.getVal();
        this.result = credObj.pass;
        this.empId = credObj.id;
        this.approversName = credObj.empName;
    }
    /** REQUEST FOR APPROVERS LIST METHOD */
    approversListReq(reqNum) {
        return $.ajax({
            type: 'POST',
            url: './php/getDetails.php',
            data: {request: `${reqNum}`},
            cache: false,
            dataType:'json'
        });
    };
    /** Method to verify the approvers
     * credentials*/
    checkCredsDetails(){
        return $.ajax({
            type: 'POST',
            url: './php/getDetails.php',
            data: { userPassInput: `${this.result}`, empId: `${this.empId}`, request: 15},
            dataType: 'json',
            success: function () {
                const innerInitVal = new Approval()
                const innerCredObj = initVal.getVal();
                this.approversName = innerCredObj.empName;
                // alert here
                // insert details to the db
                
            },
            error: function (error) {
                // ERROR HANDLING ALERT WHEN PASSWORD NOT MATCHED
                // Swal.showValidationMessage(`Invalid approver or password`);
                // ERROR ALERT HERE!! 
                console.log("Something went wrong!", error);
            }
        });
    };
}
class alerts {
    inputCredentials () {
        return Swal.fire({
            title: 'Login Form',
            html: `<input type="password" id="password" class="swal2-input" placeholder="Password">`,
            confirmButtonText: 'Authenticate',
            focusConfirm: false,
            // showLoaderOnConfirm: true,
            preConfirm: () => {
                const login = Swal.getPopup().querySelector('#login').value
                const password = Swal.getPopup().querySelector('#password').value
                if (!login || !password) {
                    Swal.showValidationMessage(`Please enter login and password`)
                }
                return { login: login, password: password }
            }
        }).then((result) => {
        Swal.fire(`
            Login: ${result.value.login}
            Password: ${result.value.password}
            `.trim())
        })
    }
    credentialAlert (data){
        Swal.fire({
            title: 'Enter your password',
            html: `<input type="password" id="password" class="swal2-input" placeholder="Password">`,
            inputPlaceholder: 'Enter your password',
            focusConfirm: false,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: function (result) { // OK BUTTON
                const inputCreds = {
                    empId : data.item.label,
                    approverName: data.item.label,
                    password : Swal.getPopup().querySelector('#password').value.trim()
                }
                Approval.prototype.setCredsVal = function() {
                    this.empId = inputCreds.empId;
                    this.approverName = inputCreds.approverName;
                    this.password = inputCreds.password;
                }
                const set = new Approval();
                set.setCredsVal();
                return new Promise(function (resolve, reject) {
                    // REQUEST TO VALIDATE DATE APPROVER PASSWORD 
                    // BASED ON THE PASSWORD INPUT (result parameter)
                    
                    setTimeout(function () {
                        resolve();
                    }, 250);
                });
            },
            didDestroy: function (result) {
                Swal.showValidationMessage(`Please enter login and password`)
                // $('#productionAuth-button span.ui-selectmenu-text').html();
            }
        });
    };
};
class approverEvt extends alerts {
    constructor() {
       super();
    }
    credValidation () {+
        this.selectmenu({
            /* HANDLE SELECT EVENT WHEN 
             * APPROVER NAME IS CLICKED */
            select: function (click, data) {
                this.alerts = new alerts();
                this.alerts.credentialAlert(data);
            },
        })
        .selectmenu("menuWidget")
        .addClass("overflow");
    }
};
// </END FUNCTION TO HANDLE PRODUCTION APPROVERS DETAILS 
class prodAuthentication extends approverEvt{
    valOthersCred(){
        return $.ajax({
            type: 'POST',
            url: './php/getDetails.php',
            data: { userPassInput: `${this.result}`, empId: `${this.empId}`, request: 15},
            dataType: 'json',
            success: function (response) {
                if (response){
                    // PASSWORD MATCHED CHANGE THE PLACE HOLDER TO OR INNER TEXT
                    // OF SELECT OPTION INTO SELECTED NAME OF APPROVER
                    // authEvtEe(approverName);
                    // $('#EEAuth-button span.ui-selectmenu-text').html(approverName);
                    // alert();
                    console.log("Success!!", response);                                                                                         
                }else{
                    // ERROR HANDLING ALERT WHEN PASSWORD NOT MATCHED
                    Swal.showValidationMessage(`Invalid approver or password`);
                };
            },
            error: function (error) {
                // ERROR HANDLING ALERT WHEN PASSWORD NOT MATCHED
                // Swal.showValidationMessage(`Invalid approver or password`);
                console.log("Something went wrong!", error);
            }
        });
    };
};
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

}

//FUNCTION TO RESPONSIBLE FOR INSTANTIATING
(async function() {
    /* Request for approvers list */
    const approverReqExec = new approverReq();
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
    
    // const param = {
    //     prod:PROD, prodMy:"top center", prodAt:"top", prodOf:".approvalDiv",
    //     ee: EE, eeMy:"top center", eeAt:"top", eeOf:".approvalDiv"
    // };

    /** Instance of Approvers event */
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
})();
