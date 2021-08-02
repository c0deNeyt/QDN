$(document).ready(function(){    
// ** ✅ ==> DDONE
// ** 🔚 ==> END

    // INTERVAL FUNCTION TO CHECK THE STATUS OF QDN EVERY 500 Millisecond
    setInterval(function(){ 
        var currentMatchedQdnNum = $("#qdnNumber").val();
        // REQUEST TO GET THE CURRENT STATUS OF QDN (request 8.1)
        $.ajax({
            type: 'POST',
            url: "./php/getDetails.php",
            data: { matchedQdnNum: currentMatchedQdnNum, request: 8.1 },
            cache: false,
            dataType: "json",
            success: loadDataFromDb,
        });
        //FUNCTION TO HANDLE THE REQUEST FOR QND STATUS
        //IF THE STATUS = 1 then remove the buttons
        function loadDataFromDb( response ){
            // CHECK IF RESPONSE IS NULL 
            if ( response ){
                var status = response[0]['status'];
                if (status == 1){
                    var forTanggal = document.getElementById('analysisBtn');
                    var reassignToggle = document.getElementById('reAssignDiv');
                    $(forTanggal).remove();
                    $(reassignToggle).remove();
                };
            };
            // </ END OF CHECKING IF loadDataFromDb(response) IS NULL
        };
    },250);
    // </END OF INTERVAL TO CHECK THE QDN STATUS

    //**FUNCTION THAT WILL GENERATE THE INITIAL EMAIL
    // RECEIVERS
    let fetchEmailRecievers = (empNumero) => {
        // request for QDN compliance designated Email Receiver (request 13)
        var xhr = new XMLHttpRequest();
        var data = new FormData();
        data.append('issuedToEmpNo', empNumero);
        data.append('request', 13);
        xhr.open('POST', './php/getDetails.php', false);
        xhr.send(data);
        if (xhr.status === 200){
            return JSON.parse(xhr.responseText); //**This will return JSON Object*/
        }
        else {
            console.warn('request_error | submitforApproval.js Line 51');
        }
    };//🔚**FUNCTION FOR INITIAL RECEIVERS ENDS HERE!*/

    //**FUNCTION THAT WILL LOOP THROUGH THE RESULTS OF fetchEmailReceivers Result */
    //**AND RETURN THE FINAL RECEIVERS FORMAT*/
    let generateEmailReceivers = (empNum) => {
        let objEmail = fetchEmailRecievers(empNum);
        var objEmailLen = objEmail.length;
        let receiver;
        if ( objEmail ){
            // LOOP TO HANDLE EACH EMAIL RESULTS
            for (var i = 0; i < objEmailLen; i++){
                if ( receiver ){
                    receiver = receiver + ", " + objEmail[i]['emailscol'];
                }
                else{
                    var emailResult = objEmail[i]['emailscol'];
                    receiver = emailResult;
                };
            };
        };
        return receiver;
    };//🔚*FUNCTION FOR RECEIVERS FORMAT ENDS HERE*/

    //*FUNCTION THAT WILL SEND AN EMAIL AND ALERT WHEN APPROVAL BUTTON CONFIRMED*/
    let emailSentAlert = ( qndNumber, receiver ) => {
        // SCRIPT FOR EMAIL SENDING AND EMAIL FORMATS
        console.log(receiver);
        Email.send({
            Host: "smtp.gmail.com",
            Username : "systemqdn2021@gmail.com",
            Password : "tjvxdnvqvepgtwck",
            To : receiver,
            // To : "chanchristianarana@gmail.com",
            From : "systemqdn2021@gmail.com",
            Subject : "QDN No. " + qndNumber  + " FOR APPROVAL" ,
            Body : "QDN " + "<a href='http://tk-server.tspi.com:999/analysis.php'>" + qndNumber + "</a> needs approval.<br><br>" + 
            "<strong>Note:</strong><br>" +
            "<i>  This notification is an automated message. Please do not reply directly to this email.</i>" 
        });
        // ALERT WHEN STATUS SUCCESSFULLY SET TO 1
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon:'success',
            title:'Sent!',
            html:"QDN " + "<b style ='color:red;'>"+ qndNumber +"</b>"
            + " Sent for approval!",
            showConfirmButton: false
        });
    };//🔚**FUNCTION FOR SENDING EMAIL AND ALERT ENDS HERE!*/

    //**FUNCTION THAT WILL SET THE QDN STATUS*/
    let setStatus = (status, qndNumber, receivers) => {
        // REQUEST TO UPDATE THE STATUS
        $.ajax({
            type: 'POST',
            url: "./php/getDetails.php",
            data: {status: status, qndNumber: qndNumber, request: 16},
            success: () => {    
                emailSentAlert( qndNumber, receivers );
            },
            error: (error) => {
                errorAlert(error); //** ERROR FUNCTION */
            },
        });
        // </END OF REQUEST TO UPDATE THE STATUS
    };//**🔚

    //**FUNCTION THAT WILL SHOW APPROVAL BUTTON DIALOG BOX*/
    let forApprovalDialogBox = ( newReceivers, qdnNumber ) => {
        // SUBMIT FOR APPROVAL ALERT
        Swal.fire({
            title: 'Are you sure?',
            html: "Sending this QDN (Number: " + "<b style ='color:red;'>"+ qdnNumber +"</b>"
                + ") for approval won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Submit this!'
        }).then((result) => {
            if (result.isConfirmed) {
                var status = 0;
                setStatus(status, qdnNumber, newReceivers );
            };
        });
    };//**🔚

    //**FUNCTION THAT WILL REMOVE DUPLICATE EMAILS
    let removeDuplicate  = ( givenArray, receivers ) =>{
        var arrLen = givenArray.length;
        let newReceiver = receivers;
        // FOR LOOP FOR EACH EMAILS
        for (var i = 0; i < arrLen; i++){
            var authEmails = givenArray[i]['Email'];
            //CONDITION TO REMOVER DUPLICATE EMAILS
            if((i)&&(authEmails == givenArray[i-1]['Email'])){
                //This is the duplicates
            }
            else{
                //SETTING THE VALUE OF RECEIVER
                newReceiver = newReceiver + ", " + authEmails;
            };
        };
        return newReceiver;
    };//**🔚

    // REQUEST FOR ALL QDN DETAILS (request 7)
    // THIS IS TO GET THE EMPLOYEE NUMBER OF 
    // PERSON RESPONSIBLE TO THE QDN
    let analysisTblReq = () => {
        let empAyDie = $.ajax({
            type: 'POST',
            url: "./php/getDetails.php",
            data: { request: 7 },
            cache: false,
            dataType: "json",
            async: false
        });
        return empAyDie.responseJSON;
    };//**🔚
            
    // FUNCTION TO HANDLE QDN DETAILS
    let  verifyEmpId = () => { 
        let x = analysisTblReq();
        // CHECK IF receiverData(receiver) PARAM IS NULL
        if ( x  ){
            // console.log("This is for analysis QDN Details", response[0]['issuedTo']);
            var responseLen = x.length
            // LOOT TO CHECK EVERY QDN DETAILS
            for (var i = 0; i < responseLen; i++){
                var qdnNUm = x [i]['qdnNo'];
                // IF THE QDN No. MATCHED TO THE CURRENT QDN
                // GET THE ISSUED TO EMPLOYEE No. 
                if(qdnNUm == qdnNumber){
                    var issuedToEmpID = x [i]['issuedTo'];
                };
            };
            return issuedToEmpID;
        };
        // </END OF CHECKING IF receiverData(receiver) PARAM IS NULL
    };//**🔚

    //*FUNCTION FOR ERROR ALERT*/
    let errorAlert = errorCode => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Something went wrong on " + errorCode + "!", 
        });
    };//🔚*FUNCTION FOR ERROR ALERT ENDS HERE!*/

    // CLICK FUNCTION FOR APPROVAL SUBMISSION
    $(document).on('click', '#forApproval', function (){
        var qdnNumber = document.getElementById('qdnNumber').value;
        // REQUEST TO CHECK IF THESE IS THE REASSIGNMENT
        // REQUEST TO CHECK IF THESE IS THE REASSIGNMENT
        $.ajax({
            type: 'POST',
            url: "./php/getDetails.php",
            data: {qdnNum: qdnNumber, request: 18},
            dataType: "json",
            success: dokumentoDetalye,
            error: noReassignment
        });
        function dokumentoDetalye(data){
            // console.log (data);
            // CHECK IF dokumentoDetalye(data) PARAM IS NULL
            if ( data ){
                let empNumero = data[0]['to'];
                let receivers =  generateEmailReceivers(empNumero);
                // FUNCTION TO HANDLE RECEIVER(Supervisor or Manager of the employee for this reassigned QDN) DATA             
                    // CHECK IF receiverData(receiver) PARAM IS NULL
                    if ( receivers ){
                        // REQUEST FOR  PROD, EE, PE, AND QA AUTH DETAILS (request 17)
                        $.ajax({
                            type: "POST",
                            url: "./php/getDetails.php",
                            data: {request: 17},
                            dataType: "json",
                            success: function (data){
                                // CHECK IF DATA IS NOT NULL
                                if ( data ){
                                    let newReceivers = removeDuplicate ( data, receivers )
                                    forApprovalDialogBox(newReceivers, qdnNumber);
                                };
                                // </END OF CHECKING IS NOT NULL
                            },
                        });       
                    };
                    // </END OF CHECKING IF receiverData(receiver) PARAM IS NULL
               
            }else{
                noReassignment();
            };
            // </END OF CHECKING IF dokumentoDetalye(data) PARAM IS NULL
        };
        function noReassignment(error){
            // console.log (error.responseText);
            let issuedToEmpID = verifyEmpId();
            // CHECK IF empAyDie(issuedToEmpID) PARAM IS NOT NULL
            if(issuedToEmpID){
                let receivers =  generateEmailReceivers(issuedToEmpID);
                    // CHECK IF receiverData(receiver) PARAM IS NOT NULL
                    if(receivers){
                        // REQUEST FOR  PROD, EE, PE, AND QA AUTH DETAILS (request 17)
                        $.ajax({
                            type: 'POST',
                            url: "./php/getDetails.php",
                            data: {request: 17},
                            dataType: "json",
                            success: (data) => {
                                let newReceivers = removeDuplicate ( data, receivers );
                                forApprovalDialogBox(newReceivers, qdnNumber);
                            },
                        });
                        // </END OF REQUEST FOR  PROD, EE, PE, AND QA AUTH DETAILS
                    };
                    // </END OF CHECKING receiverData(receiver) PARAM IS NOT NULL
            };
            // </END OF CHECKING empAyDie(issuedToEmpID) PARAM IS NOT NULL
        };
    }); // </END OF SUBMIT FOR APPROVAL CLICK FUNCTION
});         