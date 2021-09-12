
// Example starter JavaScript for disabling form submissions if there are invalid fields
(async function () {
  'use strict'
  //**INITIALIZING VARIABLES*/
  let qdnNumber         = $("#qdnNumber").html();
  let qdnIBENo          = $("#issuedByEmpNumber").val();
  let qdnIBEN           = $("#issuedByEmpName").val();
  let qdnIBET           = $("#issuedByEmpTeam").val();
  let qdnITENo          = $("#issuedToEmpNumber").val();
  let qdnITEN           = $("#issuedToEmpName").val();
  let qdnITET           = $("#issuedToEmpTeam").val();
  let qdnCustomer       = $("#customer").val();
  let qdnMachine        = $("#machine").val();
  let qdnPkgtype        = $("#packageType").val();
  let qdnDeviceName     = $("#partName").val();
  let qdnStation        = $("#station").val();
  let qdnLotId          = $("#lotId").val();
  let qdnTeamResp       = $("#teamResp").val();
  let qdnDateTime       = $("#dateTime").val();
  let qdnClassification = $("input[name = 'classification']:checked").val();
  let qdnDefects        = $("#defects").val();

  //*FUNCTION FOR ERROR ALERT*/
  let errorAlert = errorCode => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Something went wrong on " + errorCode + "!", 
    });
  };//🔚*FUNCTION FOR ERROR ALERT ENDS HERE!*/
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
  //**FUNCTION TO CHECK REASSIGNMENT*/
  let fetchEmail = (plainEmpNum) => {
    //PROMISE 
    return new Promise ((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let data = new FormData();
        data.append('issuedToEmpNo', plainEmpNum);
        data.append('request', 13);
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
    return receiver;
  };
  //🔚**FUNCTION TO HANDLE EMAIL DETAILS ENDS HERE*/

  // FUNCTION THAT WILL SEND AN EMAIL
  let sendEmail = receivers => {
    console.log("This is the email receivers", receivers);
    Email.send({
      Host: "smtp.gmail.com",
      Username : "systemqdn2021@gmail.com",
      Password : "tjvxdnvqvepgtwck",
      // To : receiver,
      To : "chanchristianarana@gmail.com",
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
  };
  // function to insert into the database;
  let insertToDatabase = () => {
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
    return fetch(url, { method: 'POST', body: formData })
    .then(function (response) {
      //converting format to JSON DATA
      if (response.status == 200 && response.ok){
        return response;
      }
      else{
        // error inserting to the database.
        errorAlert(response.statusText);
      };
    });
  };
  // let test = await fetchEmail(12856);
  // let z = emailDetails(test);
  
  // console.log("This is x return!!", sendEmail(z));
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
          // WILL DISABLE THE BUTTON TEMPORARILY TO AVOID MULTIPLE SENT 
          // REQUEST TO DATABASE.
          $(":input[id ='issuanceSubmit']").prop('disabled', true);
  
          const noIdea = document.getElementById('issuedToEmpNumber').value;
          let trimVal = (noIdea.trim());
          let plainEmpNum = trimVal;
          try{
            const insertingData = await insertToDatabase();
            const rawEmail = await fetchEmail(plainEmpNum);
            let receivers = emailDetails(rawEmail);
            sendEmail(receivers);
            successAlert(qdnNumber);
          }
          catch (err){
            errorAlert(err);
          }
        };
        
        form.classList.add('was-validated')
      }, false)
    });
})();
