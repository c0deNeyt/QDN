// ** ✅ ==> DONE
// ** 🔚 ==> END
// TO DO : -------------------------------------------------------------- 
//** IDENTIFY IF THERE IS NA NEW INSERTED ROW   ✅*/
//** IF THE ROWS ARE BLANK DO NOT SUBMIT INTO DATA BASE */
//** GET THE NEW LENGTH OF EACH CONTAINMENT FOR THE CURRENT QDN  ✅*/
//** GET THE LENGTH OF EACH NEW ROW  ✅ */
//** IF NOT EQUAL UPDATE THE DATA   ✅*/
//** GET THE ID OF THE CURRENT QDN. ✅
//** APPEND QDN REASSIGNMENT TO THE CURRENT QDN✅
//** WRITE CODE ROR QDN UPDATES✅
//** INSET TO CORRECTION TABLE */
//-----------------------------------------------------------------------
(async function () {
  'use strict'
  // MAIN OBJECT
  class analysisFormValidation {
    constructor (){
      this.currentQdnNum     = $("#qdnNumber").val();
      this.qdnFailureMode    = $("input[name = 'failureMode']:checked").val();
      this.disposition       = $("input[name = 'disposition']:checked").val();
      this.varCOD            = $("input[name = 'COD']:checked").val();
      this.CODstatement      = $("#CODstatement").val(); 
      //CONTAINMENT 
      this.containment       = $("#containment").text();
      this.containmentResp   = $("#containmentResp").text();
      this.containmentWhen   = $("#containmentWhen").text();
      this.containmentStatus = $("#containmentStatus").text();
      // CORRECTION  
      this.correction        = $("#correction").text();
      this.correctionResp    = $("#correctionResp").text();
      this.correctionWhen    = $("#correctionWhen").text();
      this.correctionStatus  = $("#correctionStatus").text();
      // CORRECTIVE ACTION 
      this.corrective        = $("#corrective").text();
      this.correctiveResp    = $("#correctiveResp").text();
      this.correctiveWhen    = $("#correctiveWhen").text();
      this.correctiveStatus  = $("#correctiveStatus").text();
    };
    //**🔚</END OF ALERT WHEN INSERTING TO THE DATABASE
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
        error: (xhr)=>{
          this.errorAlert(xhr.responseText);
        }
      });
    };
    //**🔚
    //** METHOD THAT WILL UPDATE THE DATABASE OF FailureMode, */
    //** disposition, cause of defects, cause of defects description*/
    updateRadioButton (currentQdnId){
      const formData = new FormData();
      formData.append('qdnFailureMode2Db', `${this.qdnFailureMode}`);
      formData.append('disposition2Db', `${this.disposition}`);
      formData.append('COD2Db', `${this.varCOD}`);
      formData.append('CODstatement2Db',`${this.CODstatement}`);
      formData.append('id', currentQdnId);
      fetch('./php/update_analysis.php', {
        method: 'POST',
        body: formData
      })
      .then(result => {
        // this.successAlert(result.statusText);
      })
      .catch(error => {
        this.errorAlert(error);
      });
    };
    //**🔚
    updateContainment() {

    }
  };
  // Fetch all the forms we want to apply custom Bootstrap validation styles
  var forms = document.querySelectorAll('.needs-validation');
  // Loop over them and prevent submission 
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', async function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          // console.log("ok this is invalid", reAssignToName);
        }
        //**🔚 End of checking Form 
        // CONDITION IF THE CHECKING OF INPUTS ARE VALID
        else{
          event.preventDefault();
          event.stopPropagation();
          // @ HANDLES REASSIGNMENT STATE 
          if(document.getElementById('submitReassignment')){
              var findThis         = $("#qdnNumber").val().replace(/\s/g,'');
              let reAssignTo        = $("#reAssignTo").val();
              let reAssignToName    = $("#reAssignToName").val();
              let reAssignToTeam    = $("#reAssignToTeam").val();
              let reAssignToDept    = $("#dept").val();
              let reAssignmentDes   = $("#reAssignmentDes").val();
              // Function to  prepare email details to reassignment event
              function reAssignmentMail(){
                 // request for QDN compliance designated Email Receiver (request 13)
                $.ajax({
                  type: 'POST',
                  url: "./php/getDetails.php",
                  data: {issuedToEmpNo: reAssignTo, request: 13},
                  cache : false,
                  dataType: "json",
                  success: function (data){
                    if (data){
                      reAssSendEmail(data);
                    }
                    else{
                      alert ("No receiver Found! Error form file (analysisFormValidation.js) Line 55!");
                    };
                  },
                  error: ()=>{
                    alert ("No receiver Found! Error form file (analysisFormValidation.js) Line 59!");
                  },
                });
                // FUNCTION TO HANDLE EMAIL DETAILS
              };/*Function Ends here!*/

              // ** Function responsible for sending emails
              function reAssSendEmail(data){
                var dataLen = data.length;
                var receiver = "";
                // LOOP TO HANDLE EACH EMAIL RESULTS
                for (var i = 0; i < dataLen; i++){
                  var receiverLen = receiver.length;

                    if ( receiverLen == 0){
                        var emailResult = data[i]['emailscol'];
                        receiver = emailResult;
                    }
                    else if (receiverLen > 0){
                        receiver = receiver + ", " + data[i]['emailscol'];
                    };  
                };
                console.log("This is the recievers!", receiver);
                Email.send({
                  Host: "smtp.gmail.com",
                  Username : "systemqdn2021@gmail.com",
                  Password : "tjvxdnvqvepgtwck",
                  To : receiver,
                  // To : "chanchristianarana@gmail.com",
                  From : "systemqdn2021@gmail.com",
                  Subject : "QDN Area Owner Reassignment",
                  Body : "This is to notify that QDN number " + `<a href='${window.location.href}?qdnNo=${findThis}'>` + findThis + "</a>" + " was reassigned under your ownership. <br><br>" +
                  "<b>"+ "Description: " + "</b>" +
                  "<pre>    "+ reAssignmentDes +"</pre>" + 
                  "<strong>Note:</strong><br>" +
                  "<i>  This notification is an automated message. Please do not reply directly to this email.</i>" 
                });
                // console.log("Receiver Lists! |", receiver);
              };/*Function Ends Here!*/

              // Function to insert Reassignment details to database
              function reAssInsertEvent(openQdnID){
                $.ajax({
                  url: './php/insertToReAss.php',
                  type: 'POST',
                  data:{reAssignTo2Db:  reAssignTo,
                        reAssignToName2Db: reAssignToName,
                        reAssignToTeam2Db: reAssignToTeam,
                        reAssignToDept2Db: reAssignToDept,
                        reAssignToDes2Db:  reAssignmentDes,
                        openQdnID2Db:      openQdnID,
                  },
                  cache : false, 
                  success: function(){
                    reAssignmentMail();
                    /**Success Alert for  Reassignment */
                    const alertFormat = new alertFactory(`REASSIGNMENT SUCCESS!<br> 🎉 🥳 🎉`, 
                    `To: ${reAssignToName} <br>
                    Department: ${reAssignToDept}`);
                    /**METHOD EXECUTION*/
                    alertFormat.successAlert().then(()=>{
                      window.location.href = `?qdnNo=${$("#qdnNumber").val().replace(/\s/g,'')}`;
                    });
                  },
                  error: function() {
                    alert ("No receiver Found! Error form file (analysisFormValidation.js) Line 120!");
                  },
                });
              };
             
              function reAssignmentAlert(){
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Reassigned!',
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  allowEnterKey: false,
                  allowOutsideClick: false,
                  showConfirmButton: false,
                  timer: 3000
                })
                .then(function() {
                  window.location.href = "./analysis.php";
                });
              };
              // AJAX REQUEST TO FIND THE CURRENT ID OF QDN NUMBER
              // WE USE THIS ID TO STORE IN THE  REASSIGNMENT TABLE
              $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: {matchedQdnNum: findThis, request: 8},
                cache : false,
                dataType: "json",
                success: function(data){
                  if (data){
                    var openQdnID = data[0]['qdnId'];
                    // console.log(openQdnID)
                    reAssInsertEvent(openQdnID);
                  }
                  else{
                    alert ("No receiver Found! Error form file (analysisFormValidation.js) Line 154!");
                  };
                },
                error: () => {
                  alert ("No receiver Found! Error form file (analysisFormValidation.js) Line 154!");
                },
              }); /*Main Ajax request for reassignment ends here!*/
          };
          // @ HANDLES UPDATE FOR OPEN QDN
          if(document.getElementById('submitUpdate')){  
            // VARIABLE TO INITIALIZE THE CURRENT QND NUMBER
            // FROM USE INPUTS
            try{
              // Instantiating Main Object
              const mainObject = new analysisFormValidation();
              // FETCH THE ID OF CURRENT QDN
              const fetchQDNDetails =  await mainObject.findCurrentQdnId();
              // CURRENT QDN ID 
              let currentQdnId = fetchQDNDetails[0].id;
              // POSTING UPDATE TO THE DATABASE
              await mainObject.updateRadioButton(currentQdnId);
             
              //CONTAINMENT VARIABLES
              var containment       = $("#containment").text();
              var containmentResp   = $("#containmentResp").text();
              var containmentWhen   = $("#containmentWhen").text();
              var containmentStatus = $("#containmentStatus").text();
              var newContainment    = document.getElementById('conTblRow');
              var newContainmentVal = newContainment.innerText;
              var newContainmentLen = $.trim(newContainmentVal).length;
              // console.log(radioButtonsInsert);

              // CORRECTION VARIABLES 
              var correction        = $("#correction").text();
              var correctionResp    = $("#correctionResp").text();
              var correctionWhen    = $("#correctionWhen").text();
              var correctionStatus  = $("#correctionStatus").text();
              var newCorrection     = document.getElementById('correctionTblRow');
              var newCorrectionVal  = newCorrection.innerText;
              var newCorrectionLen  = $.trim(newCorrectionVal).length;

              // CORRECTIVE ACTION VARIABLES
              var corrective        = $("#corrective").text();
              var correctiveResp    = $("#correctiveResp").text();
              var correctiveWhen    = $("#correctiveWhen").text();
              var correctiveStatus  = $("#correctiveStatus").text();
              var newCorrective     = document.getElementById('correctiveTblRow');
              var newCorrectiveVal  = newCorrective.innerText;
              var newCorrectiveLen  = $.trim(newCorrectiveVal).length;

              // REQUEST FOR CORRECTION DETAILS (request 11)
              $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: {matchedCorrection: currentQdnId, request: 11},
                cache : false,
                dataType: "json",
                success: correctionInfo,
              });
              // </ END OF REQUEST 

              // FUNCTION TO HANDLE CORRECTION DETAILS
              function correctionInfo(data){
                  var correctionDataLen = data.length;
                  for (var i = 0; i < correctionDataLen; i++ ){
                    var correctionId = data[i]['id'];
                    var action  = data[i]['actions'];
                    var resp    = data[i]['responsible'];
                    var when    = data[i]['when'];
                    var status  = data[i]['status']; 
                    var correctionCombine = action + resp + when + status;

                    var correctionAct          = document.getElementById('correctionAct' + i);
                    var correctionResp         = document.getElementById('correctionResp' + i);
                    var correctionWhen         = document.getElementById('correctionWhen' + i);
                    var correctionStatus       = document.getElementById('correctionStatus' + i);
                    var correctionActVal       = correctionAct.innerText;
                    var correctionRespVal      = correctionResp.innerText;
                    var correctionWhenVal      = correctionWhen.innerText;
                    var correctionStatusVal    = correctionStatus.innerText;

                    var newCorrectionCombine   = correctionActVal + correctionRespVal + correctionWhenVal + correctionStatusVal;
                  
                    if (correctionCombine != newCorrectionCombine){
                      $.ajax({
                        url: './php/update_correction.php',
                        type: 'POST',
                        data:{id:                  correctionId,
                            correctionAct2Db:      correctionActVal,
                            correctionResp2Db:     correctionRespVal,
                            correctionWhen2Db:     correctionWhenVal,
                            correctionStatus2Db:   correctionStatusVal 
                        },
                        cache : false,
                      });
                    };
                  };
              };
              // </END OF FUNCTION TO HANDLE CORRECTION DETAILS

           
              // CONDITION TO SEND NEW DATA TO CONTAINMENT DATABASE TBL 
              // IF THERE IS A VALUE INSIDE
              if (newContainmentLen){
                // CONTAINMENT INSERT REQUEST
                $.ajax({
                  type: 'POST',
                  url: "./php/insertToContain.php",
                  cache : false,
                  data: {containment2DB:       containment,
                        containmentResp2DB:   containmentResp,
                        containmentWhen2DB:   containmentWhen,
                        containmentStatus2DB: containmentStatus,
                        id:                   currentQdnId
                  }
                });
                console.log("CONTAINMENT INSERT SUCCESS!");
                // </END OF REQUEST
              }else{
                // REQUEST FOR CORRECTION DETAILS (request 11)
                $.ajax({
                  type: 'POST',
                  url: "./php/getDetails.php",
                  data: {matchedContainment: currentQdnId, request: 10},
                  cache : false,
                  dataType: "json",
                  success: containmentInfo,
                });
                function containmentInfo(data){
                  var containDataLen = data.length;
                  for (var i = 0; i < containDataLen; i++ ){
                      var containmentId = data[i]['id'];
                      var action  = data[i]['actions'];
                      var resp    = data[i]['responsible'];
                      var when    = data[i]['when'];
                      var status  = data[i]['status']; 
                      var combine = action + resp + when + status;

                      var containAct          = document.getElementById('containmentAct' + i);
                      var containResp         = document.getElementById('containmentResp' + i);
                      var containWhen         = document.getElementById('containmentWhen' + i);
                      var containStatus       = document.getElementById('containmentStatus' + i);
                      var containActVal       = containAct.innerText ;
                      var containRespVal      = containResp.innerText;
                      var containWhenVal      = containWhen.innerText;
                      var containStatusVal    = containStatus.innerText;
                      var newCombine   = containActVal + containRespVal + containWhenVal + containStatusVal;
                      // IF STATEMENT TO CHECK IF THERE IS A CHANGES
                      if (combine != newCombine){
                        $.ajax({
                          url: './php/update_containments.php',
                          type: 'POST',
                          data:{id:               containmentId,
                              containAct2Db:      containActVal,
                              containResp2Db:     containRespVal,
                              containWhen2Db:     containWhenVal,
                              containStatus2Db:   containStatusVal 
                          },
                          cache : false
                        });
                      };
                  };
                };  
              };
              // CONDITION TO SEND NEW DATA TO CORRECTION DATABASE TBL 
              // IF THERE IS A VALUE INSIDE
              if (newCorrectionLen){
                // CORRECTION INSERT REQUEST
                $.ajax({
                  type: 'POST',
                  url: "./php/insertToCorrection.php",
                  cache : false,
                  data: {correction2DB:       correction,
                        correctionResp2DB:   correctionResp,
                        correctionWhen2DB:   correctionWhen,
                        correctionStatus2DB: correctionStatus,
                        id:                   currentQdnId
                  }
                });
                // console.log("CORRECTION INSERT SUCCESS!");
                // </END OF REQUEST
              }
              else{
                // REQUEST FOR CORRECTION DETAILS (request 11)
                $.ajax({
                  type: 'POST',
                  url: "./php/getDetails.php",
                  data: {matchedCorrection: currentQdnId, request: 11},
                  cache : false,
                  dataType: "json",
                  success: correctionInfo,
                });
                // </ END OF REQUEST 
                // FUNCTION TO HANDLE CORRECTION DETAILS
                function correctionInfo(data){
                    var correctionDataLen = data.length;
                    for (var i = 0; i < correctionDataLen; i++ ){
                      var correctionId = data[i]['id'];
                      var action  = data[i]['actions'];
                      var resp    = data[i]['responsible'];
                      var when    = data[i]['when'];
                      var status  = data[i]['status']; 
                      var correctionCombine = action + resp + when + status;

                      var correctionAct          = document.getElementById('correctionAct' + i);
                      var correctionResp         = document.getElementById('correctionResp' + i);
                      var correctionWhen         = document.getElementById('correctionWhen' + i);
                      var correctionStatus       = document.getElementById('correctionStatus' + i);
                      var correctionActVal       = correctionAct.innerText;
                      var correctionRespVal      = correctionResp.innerText;
                      var correctionWhenVal      = correctionWhen.innerText;
                      var correctionStatusVal    = correctionStatus.innerText;

                      var newCorrectionCombine   = correctionActVal + correctionRespVal + correctionWhenVal + correctionStatusVal;
                    
                      if (correctionCombine != newCorrectionCombine){
                        $.ajax({
                          url: './php/update_correction.php',
                          type: 'POST',
                          data:{id:                  correctionId,
                              correctionAct2Db:      correctionActVal,
                              correctionResp2Db:     correctionRespVal,
                              correctionWhen2Db:     correctionWhenVal,
                              correctionStatus2Db:   correctionStatusVal 
                          },
                          cache : false,
                        });
                      };
                    };
                };
                // </END OF FUNCTION TO HANDLE CORRECTION DETAILS

              };
              // CONDITION TO SEND NEW DATA TO CORRECTIVE DATABASE TBL 
              // IF THERE IS A VALUE INSIDE
              if (newCorrectiveLen){
                // CORRECTIVE INSERT REQUEST
                $.ajax({
                type: 'POST',
                url: "./php/insertToCorrective.php",
                cache : true,
                data: {corrective2DB:       corrective,
                        correctiveResp2DB:   correctiveResp,
                        correctiveWhen2DB:   correctiveWhen,
                        correctiveStatus2DB: correctiveStatus,
                        id:                  currentQdnId
                }
              });
              //  console.log("CORRECTIVE INSERT SUCCESS!");
              // </END OF REQUEST
              }
              else{
                // REQUEST FOR CORRECTIVE DETAILS (request 12)
                $.ajax({
                  type: 'POST',
                  url: "./php/getDetails.php",
                  data: {matchedCorrective: currentQdnId, request: 12},
                  cache : false,
                  dataType: "json",
                  success: correctiveInfo,
                });
                // </ END OF REQUEST 

                // FUNCTION TO HANDLE CORRECTIVE DETAILS
                function correctiveInfo(data){
                    var correctiveDataLen = data.length;
                    for (var i = 0; i < correctiveDataLen; i++ ){
                      var correctiveId = data[i]['id'];
                      var action  = data[i]['actions'];
                      var resp    = data[i]['responsible'];
                      var when    = data[i]['when'];
                      var status  = data[i]['status']; 
                      var correctiveCombine = action + resp + when + status;

                      var correctiveAct          = document.getElementById('correctiveAct' + i);
                      var correctiveResp         = document.getElementById('correctiveResp' + i);
                      var correctiveWhen         = document.getElementById('correctiveWhen' + i);
                      var correctiveStatus       = document.getElementById('correctiveStatus' + i);
                      var correctiveActVal       = correctiveAct.innerText;
                      var correctiveRespVal      = correctiveResp.innerText;
                      var correctiveWhenVal      = correctiveWhen.innerText;
                      var correctiveStatusVal    = correctiveStatus.innerText;

                      var newCorrectiveCombine   = correctiveActVal + correctiveRespVal + correctiveWhenVal + correctiveStatusVal;
                    
                      if (correctiveCombine != newCorrectiveCombine){
                        $.ajax({
                          url: './php/update_correctives.php',
                          type: 'POST',
                          data:{id:                  correctiveId,
                              correctiveAct2Db:      correctiveActVal,
                              correctiveResp2Db:     correctiveRespVal,
                              correctiveWhen2Db:     correctiveWhenVal,
                              correctiveStatus2Db:   correctiveStatusVal 
                          },
                          cache : false,
                        });
                      };
                    };
                };
                // </END OF FUNCTION TO HANDLE CORRECTIVE DETAILS
              };
              /**Success Alert for  Reassignment */
              const alertFormat = new alertFactory(`UPDATE SUCCESS! <br> 🎉 🥳 🎉`,
              `<b style="color:#c4c4c4;">QDN Number:</b> <em>${$("#qdnNumber").val().replace(/\s/g,'')}</em>`);
              /**METHOD EXECUTION*/
              alertFormat.successAlert().then(()=>{
                window.location.href = `?qdnNo=${$("#qdnNumber").val().replace(/\s/g,'')}`;
              });
            }
            catch (error){
              const newInstantObject = new analysisFormValidation();
              newInstantObject.errorAlert(error);
              console.log(error);
            }
          };// @ END OF HANDLING UPDATE FOR CURRENT QDN
        };// </END OF CONDITION IF THE CHECKING OF INPUTS ARE VALID

        form.classList.add('was-validated')
      }, false)
    })
})()
