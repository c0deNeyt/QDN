$(document).ready(function(){    
// ** GET THE STATUS IF = 0 TWO BTN IS ENABLE ✅
// ** GET THE STATUS IF = 1 TWO BTN IS WILL BE REMOVE AND (This will for approval✅
// ** FUNCTION TO GET THE ISSUED TO EMP NUMBER ✅
// ** IF REASSIGNED EXIST GET THE THE EMP NUMBER OF REASSIGNED PERSON✅
// ** IF THERE IS NO REASSIGNMENT REQUEST FOR ANALYSIS DATA TO CHECK THE
// QND RESPONSIBLE EMPLOYEE 

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
        function loadDataFromDb(response){
            // CHECK IF RESPONSE IS NULL 
            if (response){
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
    },500);
    // </END OF INTERVAL TO CHECK THE QDN STATUS

    // CLICK FUNCTION FOR APPROVAL SUBMISSION
    $(document).on('click', '#forApproval', function (){
        var qndNumber = document.getElementById('qdnNumber').value;
        // REQUEST TO CHECK IF THESE IS THE REASSIGNMENT
        $.ajax({
            type: 'POST',
            url: "./php/getDetails.php",
            data: {qdnNum: qndNumber, request: 18},
            dataType: "json",
            success: dokumentoDetalye,
            error: noReassignment
        });
        function dokumentoDetalye(data){
            // CHECK IF dokumentoDetalye(data) PARAM IS NULL
            // console.log(data); 
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
                        var receiver = "";
                        // LOOP TO HANDLE EACH EMAIL RESULTS
                        for (var i = 0; i < dataLen; i++){

                            if ( receiver.length == 0){
                                var emailResult = data[i]['emailscol'];
                                receiver = emailResult;
                            }
                            else if (receiver.length > 0){
                                receiver = receiver + ", " + data[i]['emailscol'];
                            };
                        };
                        receiverData(receiver);
                    };
                    // </END OF CHEKING IF emailDetails (data) PARAM IS NULL
                };

                // FUNCTION TO HANDLE RECEIVER(Supervisor or Manager of the employee for this reassigned QDN) DATA             
                function receiverData(receiver){
                    // CHECK IF receiverData(receiver) PARAM IS NULL
                    if ( data ){
                        // REQUEST FOR  PROD, EE, PE, AND QA AUTH DETAILS (request 17)
                        $.ajax({
                            type: "POST",
                            url: "./php/getDetails.php",
                            data: {request: 17},
                            dataType: "json",
                            success: function (data){
                                // CHECK IF DATA IS NOT NULL
                                if ( data ){
                                    var arrLen = data.length;
                                    // FOR LOOP FOR EACH EMAILS
                                    for (var i = 0; i < arrLen; i++){
                                        var authEmails = data[i]['Email'];

                                        //CONDITION TO REMOVER DUPLICATE EMAILS
                                        if((i > 0)&&(authEmails == data[i-1]['Email'])){
                                        }
                                        else{
                                            //SETTING THE VALUE OF RECEIVER
                                            receiver = receiver + ", " + authEmails;
                                        };
                                    };
                                    // SUBMIT FOR APPROVAL ALERT
                                    Swal.fire({
                                        title: 'Are you sure?',
                                        html: "Sending this QDN (Number: " + "<b style ='color:red;'>"+ qndNumber +"</b>"
                                            + ") for approval won't be able to revert this!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes, Submit this!'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            var status = 1;
                                            // REQUEST TO UPDATE THE STUTUS
                                            $.ajax({
                                                type: 'POST',
                                                url: "./php/getDetails.php",
                                                data: {status: status, qndNumber: qndNumber, request: 16},
                                                success: function(response){
                                                    
                                                    // SCRIPT FOR EMAIL SENDING AND EMAIL FORMATS
                                                    Email.send({
                                                        Host: "smtp.gmail.com",
                                                        Username : "systemqdn2021@gmail.com",
                                                        Password : "tjvxdnvqvepgtwck",
                                                        To : receiver,
                                                        // To : "chanchristianarana@gmail.com",
                                                        From : "systemqdn2021@gmail.com",
                                                        Subject : "QDN No. " + qndNumber  + " FOR APPROVAL",
                                                        Body : "Accomplished QDN    " + "<a href='http://tk-server.tspi.com:999/analysis.php'>" + qndNumber + "</a> <br><br>" + 
                                                        "<strong>Note:</strong><br>" +
                                                        "<i>  This notification is an automated message. Please do not reply directly to this email.</i>" 
                                                    });
                                                    // ALERT WHEN STATUS SUCCESSFULLY SET TO 1
                                                    Swal.fire(
                                                        'Sent!',
                                                        'QDN Sent for approval!',
                                                        'success'
                                                    );
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
                                        }
                                    });
                                };
                                // </END OF CHECKING IS NOT NULL
                            },
                        });       
                    };
                    // </END OF CHEKING IF receiverData(receiver) PARAM IS NULL
                };
            }else{
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
                data: { request: 7 },
                cache: false,
                dataType: "json",
                success: analysisDetails
            });
            // FUNCTION TO HANDLE QDN DETAILS
            function analysisDetails(response){ 
                // CHECK IF receiverData(receiver) PARAM IS NULL
                console.log(response); 
                if ( response ){
                    // console.log("This is for anlysis QDN Details", response[0]['issuedTo']);
                    var responseLen = response.length
                    // LOOT TO CHECK EVERY QDN DETAILS
                    for (var i = 0; i < responseLen; i++){
                        var qdnNUm = response[i]['qdnNo'];
                        // IF THE QDN No. MATCHED TO THE CURRENT QDN
                        // GET THE ISSUED TO EMPLOYEE No. 
                        if(qdnNUm == qndNumber){
                            var issuedToEmpID = response[i]['issuedTo'];
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
                        if(issuedToEmpID){
                            var dataLen = data.length;
                            var receiver = "";
                            // LOOP TO HANDLE EACH EMAIL RESULTS
                            for (var i = 0; i < dataLen; i++){
            
                                if ( receiver.length == 0){
                                    var emailResult = data[i]['emailscol'];
                                    receiver = emailResult;
                                }
                                else if (receiver.length > 0){
                                    receiver = receiver + ", " + data[i]['emailscol'];
                                };
                            };
                            receiverData(receiver);
                        };
                        // </END OF CHECKING empAyDie(issuedToEmpID) PARAM IS NOT NULL
                    };
                    // FUNCTION TO HANDLE RECEIVER(Supervisor or Manager of the employee for this reassigned QDN) DATA             
                    function receiverData(receiver){
                        // CHECK IF receiverData(receiver) PARAM IS NOT NULL
                        if(issuedToEmpID){
                            // REQUEST FOR  PROD, EE, PE, AND QA AUTH DETAILS (request 17)
                            $.ajax({
                                type: 'POST',
                                url: "./php/getDetails.php",
                                data: {request: 17},
                                dataType: "json",
                                success: function (data){
                                    var arrLen = data.length;
                                    for (var i = 0; i < arrLen; i++){
                                        var authEmails = data[i]['Email'];
            
                                        //CONDITION TO REMOVER DUPLICATE EMAILS
                                        if((i > 0)&&(authEmails == data[i-1]['Email'])){
                                        }
                                        else{
                                            //SETTING THE VALUE OF RECEIVER
                                            receiver = receiver + ", " + authEmails;
                                        };
                                    };
                                    // SUBMIT FOR APPROVAL ALERT
                                    Swal.fire({
                                        title: 'Are you sure?',
                                        html: "Sending this QDN (Number: " + "<b style ='color:red;'>"+ qndNumber +"</b>"
                                            + ") for approval won't be able to revert this!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes, Submit this!'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            var status = 1;
                                            // REQUEST TO UPDATE THE STUTUS
                                            $.ajax({
                                                type: 'POST',
                                                url: "./php/getDetails.php",
                                                data: {status: status, qndNumber: qndNumber, request: 16},
                                                success: function(response){
                                                    
                                                    // SCRIPT FOR EMAIL SENDING AND EMAIL FORMATS
                                                    Email.send({
                                                        Host: "smtp.gmail.com",
                                                        Username : "systemqdn2021@gmail.com",
                                                        Password : "tjvxdnvqvepgtwck",
                                                        To : receiver,
                                                        // To : "chanchristianarana@gmail.com",
                                                        From : "systemqdn2021@gmail.com",
                                                        Subject : "QDN No. " + qndNumber  + " FOR APPROVAL",
                                                        Body : "Accomplished QDN    " + "<a href='http://tk-server.tspi.com:999/approval.php'>" + qndNumber + "</a> <br><br>" + 
                                                        "<strong>Note:</strong><br>" +                                                        "<i>  This notification is an automated message. Please do not reply directly to this email.</i>" 
                                                    });
                                                    // ALERT WHEN STATUS SUCCESSFULLY SET TO 1
                                                    Swal.fire(
                                                        'Sent!',
                                                        'QDN Sent for approval!',
                                                        'success'
                                                    );
                                                },
                                                error: function(response){
                                                    Swal.fire({
                                                        icon: 'error',
                                                        title: 'Oops...',
                                                        text: 'Something went wrong!'
                                                    });
                                                },
                                            });
                                            
                                        }
                                    });
                                },
                            });
                            // </END OF REQUEST FOR  PROD, EE, PE, AND QA AUTH DETAILS
                        };
                        // </END OF CHECKING receiverData(receiver) PARAM IS NOT NULL
                    };
                };
                // </END OF CHECKING empAyDie(issuedToEmpID) PARAM IS NOT NULL

            };
            // console.log("something went wrong!");
        };
    }); // </END OF SUBMIT FOR APPROVAL CLICK FUNCTION
});         