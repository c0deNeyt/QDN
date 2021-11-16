$(document).ready(function(){    
    // ** ✅ ==> DONE
    // ** 🔚 ==> END
    class objectForUpdatingValue {
        constructor(){
            this.currentQdnNum     = $("#qdnNumber").val();
            this.qdnFailureMode    = $("input[name = 'failureMode']:checked").val();
        };
        // METHOD FOR ERROR ALERT
        errorAlert = async (errorVar) => {
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
        };
        //**🔚
        //**METHOD THAT WILL FIND THE CURRENT QND ID */
        findCurrentQdnId () {
            let toSearch = `${this.currentQdnNum}`;
            return $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: {request: 7.2, 
                searchForThisQdnNo: toSearch},
                cache : false,
                dataType: "json ",
                // error: (xhr)=>{
                //     this.errorAlert(xhr.responseText);
                // }
            });
        };
        //**🔚
        // METHOD TO GET CONTAINMENT DETAILS
        getContainmentDetails(currentQdnId){
            return $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: {matchedContainment: currentQdnId, request: 10},
                cache : false,
                dataType: "json",
                error: (xhr)=>{
                    this.errorAlert(xhr.responseText);
                }
            });
        };
        // ** 🔚 
        //METHOD TO UPDATE THE ANALYSIS DATA FROM TIME TO TIME
        dataUpdate = async function() {
            // const rawQdnDetails =  await this.findCurrentQdnId();
            // let  qdnId = rawQdnDetails[0].id;
            // const containmentDetails = await this.getContainmentDetails(qdnId);
            // console.log("This is the", containmentDetails);
        };
    };
    // INTERVAL FUNCTION TO CHECK THE STATUS OF QDN EVERY 500 Millisecond
    setInterval( function(){ 
        var currentMatchedQdnNum = $("#qdnNumber").val();
        // REQUEST TO GET THE CURRENT STATUS OF QDN (request 8.1)
        let checkStatus  = currentMatchedQdnNum => {
            return new Promise ((resolve, reject) => {
                let req = new XMLHttpRequest();
                let data = new FormData();
                data.append('matchedQdnNum', currentMatchedQdnNum);
                data.append('request', 8.1);
                req.responseType = "json";
                req.onload = () => {
                    if (req.readyState === 4 && req.status === 200){
                        let output = req.response;
                        resolve(output);
                    }
                    else{
                        reject(req.statusText);
                    };
                };
                req.open('POST', './php/getDetails.php');
                req.send(data);
            });
        };
        let exec = async() => {
            try{
                let response =  await checkStatus(currentMatchedQdnNum);
                // CHECK IF RESPONSE IS NULL 
                if ( response ){
                    //UPDATED STATUS OF QDN
                    var status = response[0]['status'];
                    let reAssBtn = document.getElementsByClassName("submitReassignment");
                    if (status == 1){
                        var forTanggal = document.getElementById('analysisBtn');
                        var reassignToggle = document.getElementById('reAssignDiv');
                        $(forTanggal).remove();
                        $(reassignToggle).remove();
                        if (reAssBtn){
                            $(reAssBtn).remove();
                        };
                    };
                    const checkForUpdate = new objectForUpdatingValue();
                     checkForUpdate.dataUpdate();
                };//**</ END OF CHECKING IF loadDataFromDb(response) IS NULL*/
                
            }
            catch(err){
                console.log("Something went wrong. Check submitForApproval.js", err);
            }
            //========================================================
            // INTEGRATION OF URL SEARCH
            //========================================================
            // const test = (new URL(document.location)).searchParams;
            // const test2 = test.get('qndNo');
            // if(test2){
            //     console.log(true, test2);
            // }
            // else{
            //     console.log(false, "from else")
            // }
           
            // document.getElementById("qdnNumber").value = test2;

        }
        exec();
    }, 500);
    // </END OF INTERVAL TO CHECK THE QDN STATUS
    //**FUNCTION TO CHECK REASSIGNMENT*/
    let checkReAss = (qdnNumber) => {
        //PROMISE 
        return new Promise ((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            let data = new FormData();
            data.append('qdnNum', qdnNumber);
            data.append('request', 18);
            xhr.responseType = "json";//**This will convert responseTest to JSON*/
            xhr.onload = () =>{
                if (xhr.readyState === 4 && xhr.status === 200){
                    let output = xhr.response;
                    resolve(output);
                }
                else{
                    reject(xhr.statusText);
                };
            };
            xhr.open('POST', './php/getDetails.php');
            xhr.send(data);
        });
    };//🔚**FUNCTION CHECKING REASSIGNMENT ENDS HERE!*/

    //**FUNCTION THAT WILL GENERATE THE INITIAL EMAIL
    // RECEIVERS
    let fetchEmailRecievers = (empNumero) => {
        return new Promise ((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            let data = new FormData();
            data.append('issuedToEmpNo', empNumero);
            data.append('request', 13);
            xhr.responseType = "json";//**This will convert responseTest to JSON format*/
            xhr.onload = () =>{
                if (xhr.readyState === 4 && xhr.status === 200){
                    let output = xhr.response;
                    resolve(output);
                }
                else{
                    reject(xhr.statusText);
                };
            };
            xhr.open('POST', './php/getDetails.php');
            xhr.send(data);
        });
    };//🔚**GENERATION OF INITIAL RECEIVERS ENDS HERE!*/

    let approversMail = () => {
        return new Promise ((resolve, reject) => {
            let xhr = new XMLHttpRequest;
            let data = new FormData;
            data.append('request', 17);
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
            xhr.send(data);
        });
    };//**🔚 
    //**FUNCTION THAT WILL GET QDN REASSIGMENT PRODUCTLINE VALUE */
    // WILL RETURN THE LATEST REASSIGNENT
    let fetchReassPlDetails = qdnNumber => {
        return new Promise ((resolve, reject) =>{
            let request = new XMLHttpRequest();
            let data = new FormData();
            data.append('qdnNumber', qdnNumber);
            data.append('request', 9.1);
            request.responseType = "json";
            request.onload = ()=>{
                if(request.readyState == 4 && request.status == 200){
                    let result = request.response;
                    resolve(result);
                }else{
                    reject(request.statusText);
                }
            };
            request.open("POST", "./php/getDetails.php");
            request.send(data);
        });
    };
    // WILL RETURN ISSUEDTO DETAILS
    let fetchPlDetails = qdnNumber => {
        return new Promise ((resolve, reject) =>{
            let request = new XMLHttpRequest();
            let data = new FormData();
            data.append('qdnNumber', qdnNumber);
            data.append('request', 9.2);
            request.responseType = "json";
            request.onload = ()=>{
                if(request.readyState == 4 && request.status == 200){
                    let result = request.response;
                    resolve(result);
                }else{
                    reject(request.statusText);
                }
            };
            request.open("POST", "./php/getDetails.php");
            request.send(data);
        });
    };//**🔚
    //**FUNCTION THAT WILL FETCH APPROVERS*/
    let fetchOthersApprover = () => {
        return new Promise ((resolve, reject) =>{
            let request = new XMLHttpRequest();
            let data = new FormData();
            data.append('request', 14.4);
            request.responseType = "json";
            request.onload = ()=>{
                if(request.readyState == 4 && request.status == 200){
                    let result = request.response;
                    resolve(result);
                }else{
                    reject(request.statusText);
                }
            };
            request.open("POST", "./php/getDetails.php");
            request.send(data);
        });
    };
    //**FUNCTION THAT WILL LOOP THROUGH THE RESULTS OF fetchEmailReceivers Result */
    //**AND RETURN THE FINAL RECEIVERS FORMAT*/
    let generateEmailReceivers =  (objEmail) => {
            let objEmailLen = objEmail.length;
            let receivers= [];   
            if ( objEmail ){    
                // LOOP TO HANDLE EACH EMAIL RESULTS
                for (let i = 0; i < objEmailLen; i++){
                    if ( receivers ){
                        let x = objEmail[i]['emailscol'];
                        receivers.push(x);
                    }
                    else{
                        let emailResult = objEmail[i]['emailscol'];
                        receivers.push(emailResult);
                    };
                };
            };
            return receivers;
    };//🔚*FUNCTION FOR RECEIVERS FORMAT ENDS HERE*/

    //*FUNCTION THAT WILL SEND AN EMAIL AND ALERT WHEN APPROVAL BUTTON CONFIRMED*/
    let emailSentAlert = ( qndNumber, receiver ) => {
        // SCRIPT FOR EMAIL SENDING AND EMAIL FORMATS
        Email.send({
            Host: "smtp.gmail.com",
            Username : "systemqdn2021@gmail.com",
            Password : "tjvxdnvqvepgtwck",
            To : receiver,
            // To : "chanchristianarana@gmail.com",
            From : "systemqdn2021@gmail.com",
            Subject : "QDN No. " + qndNumber  + " FOR APPROVAL" ,
            Body : "QDN " + `<a href="${window.location.href}?qdnNo=${qdnNumber}">` + qndNumber + "</a> needs approval.<br><br>" + 
            "<strong>Note:</strong><br>" +
            "<i>  This notification is an automated message. Please do not reply directly to this email.</i>" 
        });
        // ALERT WHEN STATUS SUCCESSFULLY SET TO 1
        /**Success Alert for  Reassignment */
        const alertFormat = new alertFactory(`SUCCESS! <br> 🎉 🥳 🎉`,
        `<b style="color:#c4c4c4;">QDN Number:</b> <em>${qndNumber}</em> Sent for approval!`);
        /**METHOD EXECUTION*/
        alertFormat.successAlert().then(()=>{
          window.location.href = `?`;
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
                var status = 1;
                setStatus(status, qdnNumber, newReceivers );
            };
        });
    };//**🔚

    //**FUNCTION THAT WILL REMOVE DUPLICATE EMAILS
    let removeDupMails = (combinedEmails) => {
        let combinedEmailsLen = combinedEmails.length;
        let emailsArray = "";
        for (let i = 0; i < combinedEmailsLen; i++ ){
            if((emailsArray.indexOf(combinedEmailsLen) == -1) && (emailsArray)){
                emailsArray = emailsArray + ", " + combinedEmails[i];
            }
            else if ((emailsArray.indexOf(combinedEmails[i]) == -1)){
                emailsArray = emailsArray + combinedEmails[i];
            }
        };
       return emailsArray;
    }; //**🔚

    // REQUEST FOR ALL QDN DETAILS (request 7)
    // THIS IS TO GET THE EMPLOYEE NUMBER OF 
    // PERSON RESPONSIBLE TO THE QDN
    let analysisTblReq = () => {
        return new Promise ((resolve, reject) => {
            let xhr = new XMLHttpRequest;
            let data = new FormData;
            data.append('request', 7);
            xhr.responseType = "json";
            xhr.onload = () => {
                if (xhr.readyState === 4 && xhr.status === 200){
                    let issuedToEmpID = xhr.response;
                    resolve(issuedToEmpID);
                }
                else{
                    reject(xhr.statusText);
                };
            }
            xhr.open("POST", "./php/getDetails.php");
            xhr.send(data);

        });
    };//**🔚
            
    //**THIS WILL LOOK FOR EMP NUMBER OF EMPLOYEE REPONSIBEL IF NO REASSIGNMENT*/
    let  verifyEmpId = async (qdnNumber) => { 
        let x = await analysisTblReq();
        // CHECK IF receiverData(receiver) PARAM IS NULL
        if ( x  ){
            // console.log("This is for analysis QDN Details", response[0]['issuedTo']);
            var responseLen = x.length
            // LOOT TO CHECK EVERY QDN DETAILS
            for (var i = 0; i < responseLen; i++){
                var qdnNUm = x[i]['qdnNo'];
                // IF THE QDN No. MATCHED TO THE CURRENT QDN
                // GET THE ISSUED TO EMPLOYEE No. 
                if(qdnNUm == qdnNumber){
                    var issuedToEmpID = x [i]['issuedTo'];
                };
            };
           
        };
        return issuedToEmpID;
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
    $(document).on('click', '#forApproval', async function (){
        let qdnNumber = document.getElementById('qdnNumber').value;
        let asynchronousEvents = async() => { 
            try{
                //**CHECKING FOR REASSIGNMENT*/
                //**TRUE: GET THE EMPNUMBER OF REASSIGNED RESPONDENT*/
                //**FALSE: CHECK THE CURRENT QDN NUMBER IF EXIST*/
                const check4Reassignments = await checkReAss(qdnNumber);
                //**APPROVERS EMAILS*/
                const approverEmails = await approversMail();
                //**OTHERS APPROVERS LIST*/
                const othersApprovers = await fetchOthersApprover();
                //**INITIAL EMAILS */
                //**THIS WILL LOOK FOR EMP NUMBER OF EMPLOYEE REPONSIBEL IF NO REASSIGNMENT*/
                const issuedToEmpID = await verifyEmpId(qdnNumber);
                let emails4QDNReceivers;
                if (check4Reassignments != null){//**THIS WILL VALIDATE IF THERE IS REASSIGNMENT */
                    emails4QDNReceivers = await fetchEmailRecievers(check4Reassignments[0]['to']);
                }else{
                    emails4QDNReceivers = await fetchEmailRecievers(issuedToEmpID);
                };

                //**PARSING INTO ARRAY INITIAL EMAILS*/
                let initialEmail = generateEmailReceivers(emails4QDNReceivers);
                //**PARSING INTO ARRAY APPROVERS EMAILS*/
                let approverMails = generateEmailReceivers(approverEmails);
                //**COMBINING TWO ARRAYS using concatinate */
                const combinedEmails = initialEmail.concat(approverMails);
                const othersApproverList = generateEmailReceivers(othersApprovers);
                const combinedEmails2 = combinedEmails.concat(othersApproverList);
                
                //**IF THERE IS REASSIGNMENT WILL RETURN EMP DETAILS WITH PRODUCTLINE TO CHECK */
                // IF THE EMP IS G&A OR NOT
                const reassPLDetails = await fetchReassPlDetails(qdnNumber);
                //**IF NO REASSIGNMENT THIS WILL RETURN DETAILS WITH PRODUCTLINE TO CHECK */
                // IF THE EMP IS G&A OR NOT 
                const empPLDetails = await fetchPlDetails(qdnNumber);
            
                //**CHECKING FOR REASSIGNMENT*/
                switch (check4Reassignments !== null){
                    case true:
                        // console.log("REASSIGNMENT IS PRESENT!!");
                        switch (reassPLDetails[0]['pl'] == "G & A"){
                            // G&A EMPLOYEE
                            case true:
                                //**FUNCTION EXECUTION TO REMOVE DUPLICATE EMAILS*/
                                const finalEmailReceivers = removeDupMails(combinedEmails2);
                                // console.log("G & A DETECTED!!", finalEmailReceivers);
                                forApprovalDialogBox(finalEmailReceivers, qdnNumber);
                            break;
                            //NOT G&A EMPLOYEE
                            default:
                                //**FUNCTION EXECUTION TO REMOVE DUPLICATE EMAILS*/
                                const emailsNotGandA = removeDupMails(combinedEmails);
                                // console.log("G & A NOOOOOOT DETECTED!!", emailsNotGandA);
                                forApprovalDialogBox(emailsNotGandA, qdnNumber);
                            break;
                        };
                    break;
                    default:
                        // console.log("NO REASSIGNMENT DETECTED!!");
                        switch (empPLDetails[0]['pl'] == "G & A"){
                            case true:
                                //**FUNCTION EXECUTION TO REMOVE DUPLICATE EMAILS*/
                                const finalEmailReceivers = removeDupMails(combinedEmails2);
                                // console.log("G & A DETECTED!!", finalEmailReceivers);
                                forApprovalDialogBox(finalEmailReceivers, qdnNumber);
                            break;
                            default:
                                //**FUNCTION EXECUTION TO REMOVE DUPLICATE EMAILS*/
                                const emailsNotGandA = removeDupMails(combinedEmails);
                                // console.log("G & A NOOOOOOOOT DETECTED!!", emailsNotGandA);
                                forApprovalDialogBox(emailsNotGandA, qdnNumber);
                            break;
                        };
                    break;
                };
            }
            catch (err){//**This will catch the error of our promises */
                errorAlert(err);
                // console.log("Something went wrong. Check submitForApproval.js", err);
            }
        };
        asynchronousEvents();
    }); // </END OF SUBMIT FOR APPROVAL CLICK FUNCTION
});         