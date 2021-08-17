
// Example starter JavaScript for disabling form submissions if there are invalid fields
(async function () {
  'use strict'
  let successAlert  = async(qdnNumber) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast'
      },
      allowEscapeKey: false,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    await Toast.fire({
      icon: 'success',
      title: 'Success!',
      html:"QDN " + "<b style ='color:red;'>"+ qdnNumber +"</b>"
      + " Sent for analysis!",
    }).then(()=>{
      window.location.replace("index.php");
    });
  };
  let x = () => {
    var qdnNumber         = $("#qdnNumber").html();
    var qdnIBENo          = $("#issuedByEmpNumber").val();
    var qdnIBEN           = $("#issuedByEmpName").val();
    var qdnIBET           = $("#issuedByEmpTeam").val();
    var qdnITENo          = $("#issuedToEmpNumber").val();
    var qdnITEN           = $("#issuedToEmpName").val();
    var qdnITET           = $("#issuedToEmpTeam").val();
    var qdnCustomer       = $("#customer").val();
    var qdnMachine        = $("#machine").val();
    var qdnPkgtype        = $("#packageType").val();
    var qdnDeviceName     = $("#partName").val();
    var qdnStation        = $("#station").val();
    var qdnLotId          = $("#lotId").val();
    var qdnTeamResp       = $("#teamResp").val();
    var qdnDateTime       = $("#dateTime").val();
    var qdnClassification = $("input[name = 'classification']:checked").val();
    var qdnDefects        = $("#defects").val();
    var qdnFailureMode    = $("input[name = 'failureMode']:checked").val();
    //*request url
    let url = './php/process.php';
    //Setting up body parameter using FromData
    let formData = new FormData();
    formData.append('qdnNumber2Db',         qdnNumber);
    formData.append('qdnIBENo2Db',          qdnIBENo);
    formData.append('qdnIBEN2Db',           qdnIBEN);
    formData.append('qdnIBET2Db',           qdnIBET);
    formData.append('qdnITENo2Db',          qdnITENo);
    formData.append('qdnITEN2Db',           qdnITEN);
    formData.append('qdnITET2Db',           qdnITET);
    formData.append('qdncustomer2Db',       qdnCustomer);
    formData.append('qdnmachine2Db',        qdnMachine);
    formData.append('qdnpkgtype2Db',        qdnPkgtype);
    formData.append('qdnDeviceName2Db',     qdnDeviceName);
    formData.append('qdnStation2Db',        qdnStation);
    formData.append('qdnLotId2Db',          qdnLotId);
    formData.append('qdnTeamResp2Db',       qdnTeamResp);
    formData.append('qdnDateTime2Db',       qdnDateTime);
    formData.append('qdnClassification2Db', qdnClassification);
    formData.append('qdnDefects2Db',        qdnDefects);
    formData.append('qdnFailureMode2Db',    qdnFailureMode);
    return fetch(url, { method: 'POST', body: formData })
    .then(function (response) {
      //converting format to JSON DATA
      if (response.status == 200 && response.ok){
        return response;
      };
    })
    // .then(function (finalOutput) {
    //   console.log("This is finalOutput inside the fetch", finalOutput);
    //   return finalOutput;
    // });
  };
  let z  = await x();
  console.log("This is x return!!", z);
  // Fetch all the forms we want to apply custom Bootstrap validation styles 
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', async function (event) {
        if (!form.checkValidity()) {
          //**This will stop page from reloading faster*/
          event.preventDefault();
          event.stopPropagation();
          let invalids = $(".form-control:invalid, .form-control.is-invalid, .form-select:invalid, .form-select.is-invalid, input[inputName].form-check-input:invalid");
          let invalidsLen = invalids.length;
          let invalidList;
          // **Loop to handle each invalid items
          for (let i = 0; i < invalidsLen; i++){
            if (i == 0 ){
              invalidList = "<i class='fa fa-exclamation-triangle'></i> " + invalids[i].getAttribute("inputName");
            }
            else{
              invalidList = invalidList + "<br>" + "<i class='fa fa-exclamation-triangle'></i> " + invalids[i].getAttribute("inputName");
            };
          };/*Loop Ends here!*/
          // ** SweetAlert to show each item 
          // store in invalid list when loop is finished.
          Swal.fire({
            icon: 'error',
            title: 'User error check input(s)!',
            customClass: {
              html: "invalidInputAlert",
            },
            html: invalidList,
          }); /*SweetAlert Ends here!*/   
        }
        else{
          event.preventDefault();
          event.stopPropagation();
          $(":input[id ='issuanceSubmit']").prop('disabled', true)
          var qdnNumber         = $("#qdnNumber").html();
          var qdnIBENo          = $("#issuedByEmpNumber").val();
          var qdnIBEN           = $("#issuedByEmpName").val();
          var qdnIBET           = $("#issuedByEmpTeam").val();
          var qdnITENo          = $("#issuedToEmpNumber").val();
          var qdnITEN           = $("#issuedToEmpName").val();
          var qdnITET           = $("#issuedToEmpTeam").val();
          var qdnCustomer       = $("#customer").val();
          var qdnMachine        = $("#machine").val();
          var qdnPkgtype        = $("#packageType").val();
          var qdnDeviceName     = $("#partName").val();
          var qdnStation        = $("#station").val();
          var qdnLotId          = $("#lotId").val();
          var qdnTeamResp       = $("#teamResp").val();
          var qdnDateTime       = $("#dateTime").val();
          var qdnClassification = $("input[name = 'classification']:checked").val();
          var qdnDefects        = $("#defects").val();
          var qdnFailureMode    = $("input[name = 'failureMode']:checked").val();
          const noIdea = document.getElementById('issuedToEmpNumber').value;
          var trimVal = (noIdea.trim());
          var plainEmpNum = trimVal;

          // let url = './php/process.php';
          // //Setting up body parameter using FromData
          // let formData = new FormData();
        
          // return fetch(url, { method: 'POST', body: formData })
          // .then(function (response) {
          //  if (response.status == 200 && response.ok){
          //    
          // };
          // })
          // .then(function (finalOutput) {
          //   console.log("This is finalOutput inside the fetch", finalOutput);
          //   return finalOutput;
          // });
          $.ajax({
            url: './php/process.php',
            type: 'POST',
            data:{qdnNumber2Db:         qdnNumber,
                  qdnIBENo2Db:          qdnIBENo,
                  qdnIBEN2Db:           qdnIBEN,
                  qdnIBET2Db:           qdnIBET,
                  qdnITENo2Db:          qdnITENo,
                  qdnITEN2Db:           qdnITEN,
                  qdnITET2Db:           qdnITET,
                  qdncustomer2Db:       qdnCustomer,
                  qdnmachine2Db:        qdnMachine,
                  qdnpkgtype2Db:        qdnPkgtype,
                  qdnDeviceName2Db:     qdnDeviceName,
                  qdnStation2Db:        qdnStation,
                  qdnLotId2Db:          qdnLotId,
                  qdnTeamResp2Db:       qdnTeamResp,
                  qdnDateTime2Db:       qdnDateTime,
                  qdnClassification2Db: qdnClassification,
                  qdnDefects2Db:        qdnDefects,
                  qdnFailureMode2Db:    qdnFailureMode 
                },
            cache : false, 
            success: function(){

               // request for QDN compliance designated Email Receiver (request 13)
              $.ajax({
                type: 'POST',
                url: "./php/getDetails.php",
                data: {issuedToEmpNo: plainEmpNum, request: 13},
                cache : false,
                dataType: "json",
                success:  emailDetails,
                error: function (){
                  alert("Something went wrong when saving! Line 98 FormValidation.js")
                },
              });

              // FUNCTION TO HANDLE EMAIL DETAILS
              function emailDetails (data){
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

                // console.log ("This is the Receivers >", receiver);
                // CODE TO SEND EMAILS 
                Email.send({
                    Host: "smtp.gmail.com",
                    Username : "systemqdn2021@gmail.com",
                    Password : "tjvxdnvqvepgtwck",
                    // To : receiver,
                    To : "chanchristianarana@gmaill.com",
                    From : "systemqdn2021@gmail.com",
                    Subject : "QDN Issuance",
                    Body : "Good Day," + "<br>" + "<br>" +
                    "Please see below issuance under your respective area." + "<br>" + "<br>" +
                    "<b>QDN No.:</b> "      + "<a href='http://tk-server.tspi.com:999/analysis.php'>" + qdnNumber + "</a>" + "<br>" +
                    "<b>Discrepancy:</b> "  + qdnDefects + "<br>" + 
                    "<b>Issued To:</b> "    + qdnITEN + "<br>" +
                    "<b>Issued By:</b> "    + qdnIBEN + "<br>" +
                    "<b>Station:</b> "      + qdnStation + "<br>" + 
                    "<b>Date/Time:</b> "    + qdnDateTime + "<br>" + "<br>" +
                    "<pre><b>Lot Details</b><br>" +
                    "   <b>Lot ID No.:</b> "   + qdnLotId + "<br>" +
                    "   <b>Package Type:</b> " + qdnPkgtype + "<br>" +
                    "   <b>Part Name:</b> "    + qdnDeviceName +  "<br>" +
                    "   <b>Machine No.:</b> "  + qdnMachine + "<br>" +
                    "</pre>" +  
                    "<strong>Note:</strong>" + "<br>" +
                    "<pre>  This notification is an automated message. Please do not reply directly to this email.</pre>"
                });

                //  console.log("Email are SENT!");
              };
            
              successAlert(qdnNumber);
              return false;
            }
          });
        };
        
        form.classList.add('was-validated')
      }, false)
    });
})();
