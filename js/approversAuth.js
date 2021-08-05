$(document).ready(function () {
    //==============================================================
    // FUNCTIONS TO HANDLE APPROVERS AUTH EVENT
    //==============================================================
    function authEvtProd(approverName){
        var qdnNumber = document.getElementById('qdnNumber').value;
        $.ajax({
            type: 'POST',
            url: "./php/authUpdate.php",
            data: { prod_auth_col: approverName, qdnNumber: qdnNumber, request: 1 },
            cache: false,
            dataType: "json"
        });
    };
    function authEvtEe(approverName){
        var qdnNumber = document.getElementById('qdnNumber').value;
        $.ajax({
            type: 'POST',
            url: "./php/authUpdate.php",
            data: { ee_auth_col: approverName, qdnNumber: qdnNumber, request: 2 },
            cache: false,
            dataType: "json"
        });
    };
    function authEvtPe(approverName){
        var qdnNumber = document.getElementById('qdnNumber').value;
        $.ajax({
            type: 'POST',
            url: "./php/authUpdate.php",
            data: { pe_auth_col: approverName, qdnNumber: qdnNumber, request: 3 },
            cache: false,
            dataType: "json"
        });
    };
    function authEvtQa(approverName){
        var qdnNumber = document.getElementById('qdnNumber').value;
        $.ajax({
            type: 'POST',
            url: "./php/authUpdate.php",
            data: {qa_auth_col: approverName, qdnNumber: qdnNumber, request: 4 },
            cache: false,
            dataType: "json"
        });
    };
    function authEvtOthers(approverName){
        var qdnNumber = document.getElementById('qdnNumber').value;
        $.ajax({
            type: 'POST',
            url: "./php/authUpdate.php",
            data: {others_auth_col: approverName, qdnNumber: qdnNumber, request: 5 },
            cache: false,
            dataType: "json"
        });
    };
    //==============================================================
    // en FUNCTIONS TO HANDLE APPROVERS AUTH EVENT
    //==============================================================
    // FUNCTION TO SEARCH EMPLOYEE
    function searchResult(empNumber, srchResp){
        $.ajax({
            type: "POST",
            url: "./php/getDetails.php",
            data: { empNumero: empNumber, request: 23 },
            cache: false,
            dataType: "json",
            success: srchResp,
        }); 
      
    }; 
    // FUNCTION TO UPDATE STATUS WHEN 
    // CLOSING QND BUTTON IS TRIGGRD
    function saveAsClosedQdn(status, qndNumber, authPerson, receiver){
        // REQUEST TO UPDATE THE STUTUS
        $.ajax({
            type: 'POST',
            url: "./php/authUpdate.php",
            data: {status: status, status_resp: authPerson, qndNumber: qndNumber, request: 6},
            success: function(response){
                if (response){
                    // SCRIPT FOR EMAIL SENDING AND EMAIL FORMATS
                    Email.send({
                        Host: "smtp.gmail.com",
                        Username : "systemqdn2021@gmail.com",
                        Password : "tjvxdnvqvepgtwck",
                        To : receiver,
                        // To : "chanchristianarana@gmail.com",
                        From : "systemqdn2021@gmail.com",
                        Subject : "APPROVED QDN No. " + qndNumber ,
                        Body : "Accomplished QDN    " + "<a href='http://tk-server.tspi.com:999/analysis.php'>" + qndNumber + "</a> <br><br>" + 
                        "<strong>Note:</strong><br>" +
                        "<i>  This notification is an automated message. Please do not reply directly to this email.</i>" 
                    });
                }
            },
            error: function(){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            },
        });
    };
    // FUNCTION TO UPDATE STATUS WHEN 
    // REPROCESS EVENT OCCUR
    function statusAndEmail(status, qndNumber, authPerson, receiver){
         // REQUEST TO UPDATE THE STUTUS
         $.ajax({
            type: 'POST',
            url: "./php/authUpdate.php",
            data: {status: status, qndNumber: qndNumber, request: 7},
            success: function(response){
                if (response){
                    // SCRIPT FOR EMAIL SENDING AND EMAIL FORMATS
                    Email.send({
                        Host: "smtp.gmail.com",
                        Username : "systemqdn2021@gmail.com",
                        Password : "tjvxdnvqvepgtwck",
                        To : receiver,
                        // To : "chanchristianarana@gmail.com",
                        From : "systemqdn2021@gmail.com",
                        Subject : "Reanalysis Granted QDN No. " + qndNumber ,
                        Body : "Need to Reprocess QDN Number " + "<a href='http://127.0.0.1/sandbox/QDN/approval.php'>" + qndNumber + "</a> <br>" + "Requested by: " + authPerson +   "<br><br>" +
                        "<strong>Note:</strong><br>" +
                        "<i>  This notification is an automated message. Please do not reply directly to this email.</i>" 
                    });
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong updating the QDN status!'
                    });
                };
            },
            error: function(response){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            },
        });
        // </END OF REQUEST TO UPDATE THE STUTUS
    };
    // SUCCESS ALERT (sweet alert 2)
    async function alert() {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
                popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        })
        await Toast.fire({
            icon: 'success',
            title: 'Access Granted!'
        }).then(function() {
            window.location.href = "approval.php";
        });
    };
    // FUNCTION TO FETCH RECIEVER SEND EMAIL(S)
    function closeTheQdn(){
        var qndNumber = document.getElementById('qdnNumber').value;
        // REQUEST TO CHECK IF THERE IS A REASSIGNMENT 
        $.ajax({
            type: 'POST',
            url: "./php/getDetails.php",
            data: {qdnNum: qndNumber, request: 18},
            dataType: "json",
            success:  dokumentoDetalye, 
            error: noReassignment
        });
        function dokumentoDetalye(data){
            // CHECK IF dokumentoDetalye(data) PARAM IS NULL
            if ( data ){
                var empNumero = data[0]['to'];
                // request for QDN compliance designated Email Receiver (request 13)
                $.ajax({
                    type: 'POST',
                    url: "./php/getDetails.php",
                    data: {issuedToEmpNo: empNumero, request: 13},
                    cache : false,
                    dataType: "json",
                    success:  emailDetails
                });
                // FUNCTION TO HANDLE EMAIL DETAILS
                function emailDetails (data){
                    // CHECK IF emailDetails (data) PARAM IS NULL
                    if ( data ){
                        var dataLen = data.length;
                       //  LOOP FOR EVERY EMAIL ...
                        for (var i = 0; i < dataLen; i++){
                            if (receiver){
                                var emailResult = data[i]['emailscol'];
                                receiver = receiver + ", " + emailResult;
                            }
                            else{
                                var emailResult = data[i]['emailscol'];
                                receiver = emailResult;
                            };
                        };
                        // console.log("Receivers no reass|", receiver);
                        var status = 2;
                        var int = empNumero;
                        searchResult(int, function(response){
                            var z = response[0]['EMP_NAME'];
                            var authPerson = z;
                            saveAsClosedQdn(status, qndNumber, authPerson, receiver);
                        });
                        // </END OF REQUEST TO UPDATE THE STUTUS
                    };
                    // </END OF CHEKING IF emailDetails (data) PARAM IS NULL
                };
            }
            else{
                noReassignment();
            };
            // </END OF CHEKING IF dokumentoDetalye(data) PARAM IS NULL
        };
        function noReassignment(){
            // REQUEST FOR ALL QDN DETAILS (request 7)
            // THIS IS TO GET THE EMPLOYEE NUMBER OF 
            // PERSON RESPONSIBLE TO THE QDN
            $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: {qdnNum: qndNumber, request: 20},
                cache: false,
                dataType: "json",
                success: analysisDetails
            });
            // FUNCTION TO HANDLE QDN DETAILS
            function analysisDetails(data){ 
                // CHECK IF receiverData(receiver) PARAM IS NULL
                if ( data ){
                    // console.log("This is for anlysis QDN Details", data[0]['issuedTo']);
                    var dataLen = data.length
                    // LOOT TO CHECK EVERY QDN DETAILS
                    for (var i = 0; i < dataLen; i++){
                        var qdnNUm = data[i]['qdnNo'];
                        // IF THE QDN No. MATCHED TO THE CURRENT QDN
                        // GET THE ISSUED TO EMPLOYEE No. 
                        if(qdnNUm == qndNumber){
                            var issuedToEmpID = data[i]['issuedTo'];
                            // code to use the variable outside of  "analysisDetails" function
                            empAyDie(issuedToEmpID);
                        };
                    };
                };
                // </END OF CHEKING IF receiverData(receiver) PARAM IS NULL
            };
            function empAyDie(issuedToEmpID){
                // CHECK IF empAyDie(issuedToEmpID) PARAM IS NOT NULL
                if(issuedToEmpID){
                    // console.log("I need this Id >>", issuedToEmpID);
                    // request for QDN compliance designated Email Receiver (request 13)
                    $.ajax({
                        type: 'POST',
                        url: "./php/getDetails.php",
                        data: {issuedToEmpNo: issuedToEmpID, request: 13},
                        cache : false,
                        dataType: "json",
                        success:  emailDetails
                    });
                    // FUNCTION TO HANDLE EMAIL DETAILS
                    function emailDetails (data){
                        // CHECK IF empAyDie(issuedToEmpID) PARAM IS NOT NULL
                        if(data){
                            var dataLen = data.length;
                            //  LOOP FOR EVERY EMAIL ...
                            for (var i = 0; i < dataLen; i++){
                                if (receiver){
                                    var emailResult = data[i]['emailscol'];
                                    receiver = receiver + ", " + emailResult;
                                }
                                else{
                                    var emailResult = data[i]['emailscol'];
                                    receiver = emailResult;
                                };
                            };
                            // console.log("Receivers no reass|", receiver);
                            var status = 2;
                            var int = issuedToEmpID;
                            searchResult(int, function(response){
                                var z = response[0]['EMP_NAME'];
                                var authPerson = z;
                                console.log("NO reasss REceirver", receiver);
                                saveAsClosedQdn(status, qndNumber, authPerson, receiver);
                            });
                            // </END OF REQUEST TO UPDATE THE STUTUS
                        };
                        // </END OF CHECKING empAyDie(issuedToEmpID) PARAM IS NOT NULL
                    };
                };
                // END OF CHECKING IF empAyDie(issuedToEmpID) PARAM IS NOT NULL
            };
        };
    };
    // FUNCTION TO REPROCESS QDN
    function reprocessTheQdn(){
        var qndNumber = document.getElementById('qdnNumber').value;
        // REQUEST TO CHECK IF THERE IS A REASSIGNMENT 
        $.ajax({
            type: 'POST',
            url: "./php/getDetails.php",
            data: {qdnNum: qndNumber, request: 18},
            dataType: "json",
            success:  reprocessDetails, 
            error: noReass
        });
        function reprocessDetails(data){
            // CHECK IF dokumentoDetalye(data) PARAM IS NULL
            if ( data ){
                var empNumero = data[0]['to'];
                // request for QDN compliance designated Email Receiver (request 13)
                $.ajax({
                    type: 'POST',
                    url: "./php/getDetails.php",
                    data: {issuedToEmpNo: empNumero, request: 13},
                    cache : false,
                    dataType: "json",
                    success:  emailDetails
                });
                // FUNCTION TO HANDLE EMAIL DETAILS
                function emailDetails (data){
                    // CHECK IF emailDetails (data) PARAM IS NULL
                    if ( data ){
                        var dataLen = data.length;
                       //  LOOP FOR EVERY EMAIL ...
                        for (var i = 0; i < dataLen; i++){
                            if (receiver){
                                var emailResult = data[i]['emailscol'];
                                receiver = receiver + ", " + emailResult;
                            }
                            else{
                                var emailResult = data[i]['emailscol'];
                                receiver = emailResult;
                            };
                        };
                        // console.log("Receivers|", receiver);
                        var status = 0;
                        var int = empNumero;
                        searchResult(int, function(response){
                            var z = response[0]['EMP_NAME'];
                            var authPerson = z;
                            statusAndEmail(status, qndNumber, authPerson, receiver);
                        });
                    };
                    // </END OF CHEKING IF emailDetails (data) PARAM IS NULL
                };
            }
            else{
                noReass();
            };
            // </END OF CHEKING IF dokumentoDetalye(data) PARAM IS NULL
        };
        function noReass(){
            // REQUEST FOR ALL QDN DETAILS (request 7)
            // THIS IS TO GET THE EMPLOYEE NUMBER OF 
            // PERSON RESPONSIBLE TO THE QDN
            $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: {qdnNum: qndNumber, request: 20},
                cache: false,
                dataType: "json",
                success: analysisDetails
            });
            // FUNCTION TO HANDLE QDN DETAILS
            function analysisDetails(data){ 
                // CHECK IF receiverData(receiver) PARAM IS NULL
                if ( data ){
                    // console.log("This is for anlysis QDN Details", data[0]['issuedTo']);
                    var dataLen = data.length
                    // LOOT TO CHECK EVERY QDN DETAILS
                    for (var i = 0; i < dataLen; i++){
                        var qdnNUm = data[i]['qdnNo'];
                        // IF THE QDN No. MATCHED TO THE CURRENT QDN
                        // GET THE ISSUED TO EMPLOYEE No. 
                        if(qdnNUm == qndNumber){
                            var issuedToEmpID = data[i]['issuedTo'];
                            // code to use the variable outside of  "analysisDetails" function
                            empAyDie(issuedToEmpID);
                        };
                    };
                };
                // </END OF CHEKING IF receiverData(receiver) PARAM IS NULL
            };
            function empAyDie(issuedToEmpID){
                // CHECK IF empAyDie(issuedToEmpID) PARAM IS NOT NULL
                if(issuedToEmpID){
                    // console.log("I need this Id >>", issuedToEmpID);
                    // request for QDN compliance designated Email Receiver (request 13)
                    $.ajax({
                        type: 'POST',
                        url: "./php/getDetails.php",
                        data: {issuedToEmpNo: issuedToEmpID, request: 13},
                        cache : false,
                        dataType: "json",
                        success:  emailDetails
                    });
                    // FUNCTION TO HANDLE EMAIL DETAILS
                    function emailDetails (data){
                        // CHECK IF empAyDie(issuedToEmpID) PARAM IS NOT NULL
                        console.log (data);
                        if(data){
                            var dataLen = data.length;
                            var receiver = "";
                            //  LOOP FOR EVERY EMAIL ...
                            for (var i = 0; i < dataLen; i++){
                                if (receiver){
                                    var emailResult = data[i]['emailscol'];
                                    receiver = receiver + ", " + emailResult;
                                }
                                else{
                                    var emailResult = data[i]['emailscol'];
                                    receiver = emailResult;
                                };
                            };
                            console.log("Receivers no reass|", receiver);
                            var status = 0;
                            var int = issuedToEmpID;
                            searchResult(int, function(response){
                                var z = response[0]['EMP_NAME'];
                                var authPerson = z;
                                statusAndEmail(status, qndNumber, authPerson, receiver);
                            });
                        };
                        // </END OF CHECKING empAyDie(issuedToEmpID) PARAM IS NOT NULL
                    };
                };
            };
            // console.log("something went wrong!");
        };
    };
    // FUNCTION FOR CASE CLOSED EVENT 
    // RESPONSIBLE FOR LOGIN CREDENTIAL POPUP
    function caseClosedEvt(){
        Swal.fire({
            title: 'Granting to close the QDN',
            html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
            <input type="password" id="password" class="swal2-input" placeholder="Password">`,
            confirmButtonText: 'Submit!',
            focusConfirm: false,
            preConfirm: () => {
                return new Promise(function (resolve) {
                    const empId = Swal.getPopup().querySelector('#login').value
                    const password = Swal.getPopup().querySelector('#password').value

                    var employeeId = $.trim(empId);
                    var empPass = $.trim(password);
                    // REQUEST TO VALIDATE DATE APPROVER PASSWORD 
                    // BASED ON THE PASSWORD INPUT (result parameter)  
                    $.ajax({
                        type: 'POST',
                        url: './php/getDetails.php',
                        data: { userPassInput: empPass, empId: employeeId, request: 22},
                        dataType: 'json',
                        success: function (response) {
                            if(response){
                                closeTheQdn();
                                alert();
                            }
                            else{
                                Swal.showValidationMessage(`Invalid approver or password`);
                            };
                        },
                        error: function () {
                            // ERROR HANDLING ALERT WHEN PASSWORD NOT MATCHED
                            Swal.showValidationMessage(`Invalid approver or password`);
                        }
                    });
                    setTimeout(function () {
                        resolve();
                    }, 250);
                });
            }
        });

    };
    function reprocessEvt(){
        Swal.fire({
            title: 'Granting Reanalysis',
            html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
            <input type="password" id="password" class="swal2-input" placeholder="Password">`,
            confirmButtonText: 'Submit!',
            focusConfirm: false,
            preConfirm: () => {
                return new Promise(function (resolve) {
                    const empId = Swal.getPopup().querySelector('#login').value
                    const password = Swal.getPopup().querySelector('#password').value

                    var employeeId = $.trim(empId);
                    var empPass = $.trim(password);
                    // REQUEST TO VALIDATE DATE APPROVER PASSWORD 
                    // BASED ON THE PASSWORD INPUT (result parameter)  
                    $.ajax({
                        type: 'POST',
                        url: './php/getDetails.php',
                        data: { userPassInput: empPass, empId: employeeId, request: 22},
                        dataType: 'json',
                        success: function (response) {
                            if(response){
                                reprocessTheQdn();
                                alert();
                            }
                            else{
                                Swal.showValidationMessage(`Invalid approver or password`);
                            };
                        },
                        error: function () {
                            // ERROR HANDLING ALERT WHEN PASSWORD NOT MATCHED
                            Swal.showValidationMessage(`Invalid approver or password`);
                        }
                    });
                    setTimeout(function () {
                        resolve();
                    }, 250);
                });
            }
        });
    };
    // REQUEST TO VALIDATE DATE APPROVER PASSWORD 
    // BASED ON THE PASSWORD INPUT (result parameter)
    function valProdCred (result, empId, approverName){
        $.ajax({
            type: 'POST',
            url: './php/getDetails.php',
            data: { userPassInput: result, empId: empId, request: 15 },
            dataType: 'json',
            success: function (response) {
                if (response){
                    // PASSWORD MATCHED CHANGE THE PLACE HOLDER TO OR INNER TEXT
                    // OF SELECT OPTION INTO SELECTED NAME OF APPROVER
                    authEvtProd(approverName);
                    $('#productionAuth-button span.ui-selectmenu-text').html(approverName);
                    alert();
                }else{
                    // ERROR HANDLING ALERT WHEN PASSWORD NOT MATCHED
                    Swal.showValidationMessage(`Invalid approver or password`);
                };
            },
            error: function () {
                // ERROR HANDLING ALERT WHEN PASSWORD NOT MATCHED
                Swal.showValidationMessage(`Invalid approver or password`);
            }
        });
    };
    function valEeCred(result, empId, approverName){
        $.ajax({
            type: 'POST',
            url: './php/getDetails.php',
            data: { userPassInput: result, empId: empId, request: 15},
            dataType: 'json',
            success: function (response) {
                if (response){
                    // PASSWORD MATCHED CHANGE THE PLACE HOLDER TO OR INNER TEXT
                    // OF SELECT OPTION INTO SELECTED NAME OF APPROVER
                    authEvtEe(approverName);
                    $('#EEAuth-button span.ui-selectmenu-text').html(approverName);
                    alert();
                }else{
                    // ERROR HANDLING ALERT WHEN PASSWORD NOT MATCHED
                    Swal.showValidationMessage(`Invalid approver or password`);
                };
            },
            error: function () {
                // ERROR HANDLING ALERT WHEN PASSWORD NOT MATCHED
                Swal.showValidationMessage(`Invalid approver or password`);
            }
        });
    };
    function valPeCred(result, empId, approverName){
        $.ajax({
            type: 'POST',
            url: './php/getDetails.php',
            data: { userPassInput: result, empId: empId, request: 15},
            dataType: 'json',
            success: function (response) {
                if (response) {
                    // PASSWORD MATCHED CHANGE THE PLACE HOLDER TO OR INNER TEXT
                    // OF SELECT OPTION INTO SELECTED NAME OF APPROVER
                    authEvtPe(approverName);
                    $('#PEAuth-button span.ui-selectmenu-text').html(approverName);
                    alert();
                }else{
                    // ERROR HANDLING ALERT WHEN PASSWORD NOT MATCHED
                    Swal.showValidationMessage(`Invalid approver or password`);
                };
            },
            error: function () {
                // ERROR HANDLING ALERT WHEN PASSWORD NOT MATCHED
                Swal.showValidationMessage(`Invalid approver or password`);
            }
        });
    }; 
    function valQaCred(result, empId, approverName){
        $.ajax({
            type: 'POST',
            url: './php/getDetails.php',
            data: { userPassInput: result, empId: empId, request: 15},
            dataType: 'json',
            success: function (response) {
                if (response){
                    // PASSWORD MATCHED CHANGE THE PLACE HOLDER TO OR INNER TEXT
                    // OF SELECT OPTION INTO SELECTED NAME OF APPROVER
                    authEvtQa(approverName);
                    $('#qaAuth-button span.ui-selectmenu-text').html(approverName);
                    alert();
                }
                else{
                    // ERROR HANDLING ALERT WHEN PASSWORD NOT MATCHED
                    Swal.showValidationMessage(`Invalid approver or password`);
                };
            },
            error: function () {
                // ERROR HANDLING ALERT WHEN PASSWORD NOT MATCHED
                Swal.showValidationMessage(`Invalid approver or password`);
            }
        });
    };
    function valOthersCred(result, empId, approverName){
        $.ajax({
            type: 'POST',
            url: './php/getDetails.php',
            data: { userPassInput: result, empId: empId, request: 15},
            dataType: 'json',
            success: function (response) {
                if (response){
                    // PASSWORD MATCHED CHANGE THE PLACE HOLDER TO OR INNER TEXT
                    // OF SELECT OPTION INTO SELECTED NAME OF APPROVER
                    authEvtOthers(approverName);
                    $('#othersAuth-button span.ui-selectmenu-text').html(approverName);
                    alert();
                }
                else{
                    Swal.showValidationMessage(`Invalid approver or password`);
                };
            },
            error: function () {
                // ERROR HANDLING ALERT WHEN PASSWORD NOT MATCHED
                Swal.showValidationMessage(`Invalid approver or password`);
            }
        });
    }; 
    //==============================================================
    // PRODUCTION APPROVERS LIST REQUEST (request 14)
    //==============================================================
    $.ajax({
        type: 'POST',
        url: "./php/getDetails.php",
        data: { request: 14 },
        cache: false,
        dataType: "json",
        success: prodAuthDetils
    });
    // </END OF PRODUCTION APPROVERS LIST REQUEST 

    //FUNCTION TO HANDLE PRODUCTION APPROVERS DETAILS 
    function prodAuthDetils(data) {
        var dataLen = data.length;

        // LOOP TO HANDLE EACH APPROVER NAMES
        for (var i = 0; i < dataLen; i++) {
            var approverName = data[i]['EMP_NAME'];
            var empNum = data[i]['id'];

            // APPENDING APPROVER NAME TO THE SELECT MENU
            var option = new Option(approverName, empNum);
            $(option).html(approverName);
            $("#productionAuth").append(option);
        };
    };
    // </END FUNCTION TO HANDLE PRODUCTION APPROVERS DETAILS 

    // PRODUCTION AUTHENTICATION SELECT MENU
    $("#productionAuth")
    .selectmenu({
        // HANDLE SELECT EVENT WHEN APPROVER NAME IS CLICKED
        select: function (click, data) {
            // THIS WILL SET AS A PLACE HOLDER WHEN ITEM IN THE MENU IS CLICKED 
            // INSTEAD OF APPROVERS NAME
            $('#productionAuth-button span.ui-selectmenu-text').html("Needs Approval...");
            // PASSWORD ALERT POPUP WHEN YOU CLICK THE ITEM (approver name)
            //IN PRODUCTION APPROVER LIST
            Swal.fire({
                title: 'Enter your password',
                input: 'password',
                inputPlaceholder: 'Enter your password',
                inputAttributes: {
                    maxlength: 20,
                    autocapitalize: 'off',
                    autocorrect: 'off'
                },
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: function (result) { // OK BUTTON
                    return new Promise(function (resolve) {
                        var empId = data.item.value;// SELECTED EMP ID OF APPROVER
                        var approverName = data.item.label; // SELECTED NAME OF APPROVER
                        // REQUEST TO VALIDATE DATE APPROVER PASSWORD 
                        // BASED ON THE PASSWORD INPUT (result parameter)
                        valProdCred (result, empId, approverName);
                        setTimeout(function () {
                            resolve();
                        }, 250);
                    });
                },
            });
        },
        position: {
            my: "top center",
            at: "top", of: ".approvalDiv"
        },


    })
    .selectmenu("menuWidget")
    .addClass("overflow");

    //==============================================================
    // EQUIPMENT ENGINEERING APPROVERS LIST REQUEST (request 14.1)
    //==============================================================
     $.ajax({
        type: 'POST',
        url: "./php/getDetails.php",
        data: { request: 14.1},
        cache: false,
        dataType: "json",
        success: eeAuthDetails
    });
    // </END OF EQUIPMENT ENGINEERING APPROVERS LIST REQUEST 

    //FUNCTION TO HANDLE EQUIPMENT ENGINEERING APPROVERS DETAILS 
    function eeAuthDetails(data) {
        var dataLen = data.length;

        // LOOP TO HANDLE EACH APPROVER NAMES
        for (var i = 0; i < dataLen; i++) {
            var approverName = data[i]['EMP_NAME'];
            var empNum = data[i]['id'];

            // APPENDING APPROVER NAME TO THE SELECT MENU
            var option = new Option(approverName, empNum);
            $(option).html(approverName);
            $("#EEAuth").append(option);
        };
    };
    // </END FUNCTION TO HANDLE EQUIPMENT ENGINEERING APPROVERS DETAILS 

     // EQUIPMENT ENGINEERING AUTHENTICATION SELECT MENU
    $("#EEAuth")
    .selectmenu({
        // HANDLE SELECT EVENT WHEN APPROVER NAME IS CLICKED
        select: function (click, data) {
            // THIS WILL SET AS A PLACE HOLDER WHEN ITEM IN THE MENU IS CLICKED 
            // INSTEAD OF APPROVERS NAME
            $('#EEAuth-button span.ui-selectmenu-text').html("Needs Approval...");
            // PASSWORD ALERT POPUP WHEN YOU CLICK THE ITEM (approver name)
            //IN EQUIPMENT ENGINEERING APPROVER LIST
            Swal.fire({
                title: 'Enter your password',
                input: 'password',
                inputPlaceholder: 'Enter your password',
                inputAttributes: {
                    maxlength: 20,
                    autocapitalize: 'off',
                    autocorrect: 'off'
                },
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: function (result) { // OK BUTTON
                    return new Promise(function (resolve) {
                        var empId = data.item.value;// SELECTED EMP ID OF APPROVER
                        var approverName = data.item.label; // SELECTED NAME OF APPROVER
                        // REQUEST TO VALIDATE DATE APPROVER PASSWORD 
                        // BASED ON THE PASSWORD INPUT (result parameter)
                        valEeCred(result, empId, approverName); 
                        setTimeout(function () {
                            resolve();
                        }, 250);
                    });
                },
            });
        },
        position: {
            my: "top center",
            at: "top", of: ".EEAuth"
        },


    })
    .selectmenu("menuWidget")
    .addClass("overflow");

    //==============================================================
    // PROCESS ENGINEERING APPROVERS LIST REQUEST (request 14.2)
    //==============================================================
    $.ajax({
        type: 'POST',
        url: "./php/getDetails.php",
        data: { request: 14.2},
        cache: false,
        dataType: "json",
        success: peAuthDetails
    });
    // </END OF PROCESS ENGINEERING APPROVERS LIST REQUEST 

    //FUNCTION TO HANDLE PROCESS ENGINEERING APPROVERS DETAILS 
    function peAuthDetails(data) {
        var dataLen = data.length;

        // LOOP TO HANDLE EACH APPROVER NAMES
        for (var i = 0; i < dataLen; i++) {
            var approverName = data[i]['EMP_NAME'];
            var empNum = data[i]['id'];

            // APPENDING APPROVER NAME TO THE SELECT MENU
            var option = new Option(approverName, empNum);
            $(option).html(approverName);
            $("#PEAuth").append(option);
        };
    };
    // </END FUNCTION TO HANDLE PROCESS ENGINEERING APPROVERS DETAILS 

     // PROCESS ENGINEERING AUTHENTICATION SELECT MENU
    $("#PEAuth")
    .selectmenu({
        // HANDLE SELECT EVENT WHEN APPROVER NAME IS CLICKED
        select: function (click, data) {
            // THIS WILL SET AS A PLACE HOLDER WHEN ITEM IN THE MENU IS CLICKED 
            // INSTEAD OF APPROVERS NAME
            $('#PEAuth-button span.ui-selectmenu-text').html("Needs Approval...");

            // PASSWORD ALERT POPUP WHEN YOU CLICK THE ITEM (approver name)
            //IN PROCESS ENGINEERING APPROVER LIST
            Swal.fire({
                title: 'Enter your password',
                input: 'password',
                inputPlaceholder: 'Enter your password',
                inputAttributes: {
                    maxlength: 20,
                    autocapitalize: 'off',
                    autocorrect: 'off'
                },
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: function (result) { // OK BUTTON
                    return new Promise(function (resolve) {
                        var empId = data.item.value;// SELECTED EMP ID OF APPROVER
                        var approverName = data.item.label; // SELECTED NAME OF APPROVER
                        // REQUEST TO VALIDATE DATE APPROVER PASSWORD 
                        // BASED ON THE PASSWORD INPUT (result parameter)
                        valPeCred (result, empId, approverName); 
                        setTimeout(function () {
                            resolve();
                        }, 250);
                    });
                },
            });
        },
        position: {
            my: "top center",
            at: "top", of: ".PEAuth"
        },


    })
    .selectmenu("menuWidget")
    .addClass("overflow");


    //==============================================================
    // QUALITY ASSURANCE APPROVERS LIST REQUEST (request 14.3)
    //==============================================================
    $.ajax({
        type: 'POST',
        url: "./php/getDetails.php",
        data: { request: 14.3},
        cache: false,
        dataType: "json",
        success: qaAuthDetails
    });
    // </END OF QUALITY ASSURANCE APPROVERS LIST REQUEST 

    //FUNCTION TO HANDLE QUALITY ASSURANCE APPROVERS DETAILS 
    function qaAuthDetails(data) {
        var dataLen = data.length;

        // LOOP TO HANDLE EACH APPROVER NAMES
        for (var i = 0; i < dataLen; i++) {
            var approverName = data[i]['EMP_NAME'];
            var empNum = data[i]['id'];

            // APPENDING APPROVER NAME TO THE SELECT MENU
            var option = new Option(approverName, empNum);
            $(option).html(approverName);
            $("#qaAuth").append(option);
        };
    };
    // </END FUNCTION TO HANDLE QUALITY ASSURANCE APPROVERS DETAILS 

     // QUALITY ASSURANCE AUTHENTICATION SELECT MENU
    $("#qaAuth")
    .selectmenu({
        // HANDLE SELECT EVENT WHEN APPROVER NAME IS CLICKED
        select: function (click, data) {
            // THIS WILL SET AS A PLACE HOLDER WHEN ITEM IN THE MENU IS CLICKED 
            // INSTEAD OF APPROVERS NAME
            $('#qaAuth-button span.ui-selectmenu-text').html("Needs Approval...");

            // PASSWORD ALERT POPUP WHEN YOU CLICK THE ITEM (approver name)
            //IN QUALITY ASSURANCE APPROVER LIST
            Swal.fire({
                title: 'Enter your password',
                input: 'password',
                inputPlaceholder: 'Enter your password',
                inputAttributes: {
                    maxlength: 20,
                    autocapitalize: 'off',
                    autocorrect: 'off'
                },
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: function (result) { // OK BUTTON
                    return new Promise(function (resolve) {
                        var empId = data.item.value;// SELECTED EMP ID OF APPROVER
                        var approverName = data.item.label; // SELECTED NAME OF APPROVER
                        // REQUEST TO VALIDATE DATE APPROVER PASSWORD 
                        // BASED ON THE PASSWORD INPUT (result parameter)  
                        valQaCred(result, empId, approverName);
                        setTimeout(function () {
                            resolve();
                        }, 250);
                    });
                },
            });
        },
        position: {
            my: "top center",
            at: "top", of: ".qaAuth"
        },
    })
    .selectmenu("menuWidget")
    .addClass("overflow");

    //==============================================================
    // OTHERS APPROVERS LIST REQUEST (request 14.4)
    //==============================================================
    $.ajax({
        type: 'POST',
        url: "./php/getDetails.php",
        data: { request: 14.4},
        cache: false,
        dataType: "json",
        success: othersAuthDetails
    });
    // </END OF OTHERS APPROVERS LIST REQUEST 

    //FUNCTION TO HANDLE OTHERS APPROVERS DETAILS 
    function othersAuthDetails(data) {
        var dataLen = data.length;

        // LOOP TO HANDLE EACH APPROVER NAMES
        for (var i = 0; i < dataLen; i++) {
            var approverName = data[i]['EMP_NAME'];
            var empNum = data[i]['id'];

            // APPENDING APPROVER NAME TO THE SELECT MENU
            var option = new Option(approverName, empNum);
            $(option).html(approverName);
            $("#othersAuth").append(option);
        };
    };
    // </END FUNCTION TO HANDLE OTHERS APPROVERS DETAILS 

     // OTHERS AUTHENTICATION SELECT MENU
    $("#othersAuth")
    .selectmenu({
        // HANDLE SELECT EVENT WHEN APPROVER NAME IS CLICKED
        select: function (click, data) {
            // THIS WILL SET AS A PLACE HOLDER WHEN ITEM IN THE MENU IS CLICKED 
            // INSTEAD OF APPROVERS NAME
            $('#othersAuth-button span.ui-selectmenu-text').html("Needs Approval...");

            // PASSWORD ALERT POPUP WHEN YOU CLICK THE ITEM (approver name)
            //IN OTHERS APPROVER LIST
            Swal.fire({
                title: 'Enter your password',
                input: 'password',
                inputPlaceholder: 'Enter your password',
                inputAttributes: {
                    maxlength: 20,
                    autocapitalize: 'off',
                    autocorrect: 'off'
                },
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: function (result) { // OK BUTTON
                    return new Promise(function (resolve) {
                        var empId = data.item.value;// SELECTED EMP ID OF APPROVER
                        var approverName = data.item.label; // SELECTED NAME OF APPROVER
                        // REQUEST TO VALIDATE DATE APPROVER PASSWORD 
                        // BASED ON THE PASSWORD INPUT (result parameter)
                        valOthersCred(result, empId, approverName);
                        setTimeout(function () {
                            resolve();
                        }, 250);
                    });
                },
            });
        },
        position: {
            my: "top center",
            at: "top", of: ".othersAuth"
        },
    })
    .selectmenu("menuWidget")
    .addClass("overflow");

    //==============================================================
    // REPROCESS AND CLOSING QDN BUTTON CLICK EVENTS
    //==============================================================
    var reProcess = document.getElementById('reProcess');
    var caseClosed = document.getElementById('caseClosed');
    $(reProcess).click (function (e){
        reprocessEvt();
    });

    $(caseClosed).click (function (e){
        caseClosedEvt();
    });
    //==============================================================
    // </END OF REPROCESS AND CLOSING QDN BUTTON CLICK EVENTS
    //==============================================================


    document.onkeydown = function (e) {
        if (e.keyCode == 123) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            return false;
        }
    }

});

