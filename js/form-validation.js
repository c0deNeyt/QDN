// ** ✅ ==> DONE
// ** 🔚 ==> END
// Example starter JavaScript for disabling form submissions if there are invalid fields
(async function () {
  'use strict'
  class mainObject  {
    constructor (){
      this.qdnNumber         = $("#qdnNumber").html();;
      this.qdnIBENo          = $("#issuedByEmpNumber").val();
      this.qdnIBEN           = $("#issuedByEmpName").val();
      this.qdnIBET           = $("#issuedByEmpTeam").val();
      this.qdnITENo          = $("#issuedToEmpNumber").val();
      this.qdnITEN           = $("#issuedToEmpName").val();
      this.qdnITET           = $("#issuedToEmpTeam").val();
      this.qdnCustomer       = $("#customer").val();
      this.qdnMachine        = $("#machine").val();
      this.qdnPkgtype        = $("#packageType").val();
      this.qdnDeviceName     = $("#partName").val();
      this.qdnStation        = $("#station").val();
      this.qdnLotId          = $("#lotId").val();
      this.qdnTeamResp       = $("#teamResp").val();
      this.qdnDateTime       = $("#dateTime").val();
      this.qdnClassification = $("input[name = 'classification']:checked").val();
      this.qdnDefects        = $("#defects").val();
    };
    // Method to insert into the database;
    insertToDatabase() {
      //*request url
      let url = './php/process.php';
      //Setting up body parameter using FromData
      let formData = new FormData();
      formData.append('qdnNumber2Db',         `${this.qdnNumber}`);
      formData.append('qdnIBENo2Db',          `${this.qdnIBENo}`);
      formData.append('qdnIBEN2Db',           `${this.qdnIBEN}`);
      formData.append('qdnIBET2Db',           `${this.qdnIBET}`);
      formData.append('qdnITENo2Db',          `${this.qdnITENo}`);
      formData.append('qdnITEN2Db',           `${this.qdnITEN}`);
      formData.append('qdnITET2Db',           `${this.qdnITET}`);
      formData.append('qdncustomer2Db',       `${this.qdnCustomer}`);
      formData.append('qdnmachine2Db',        `${this.qdnMachine}`);
      formData.append('qdnpkgtype2Db',        `${this.qdnPkgtype}`);
      formData.append('qdnDeviceName2Db',     `${this.qdnDeviceName}`);
      formData.append('qdnStation2Db',        `${this.qdnStation}`);
      formData.append('qdnLotId2Db',          `${this.qdnLotId}`);
      formData.append('qdnTeamResp2Db',       `${this.qdnTeamResp}`);
      formData.append('qdnDateTime2Db',       `${this.qdnDateTime}`);
      formData.append('qdnClassification2Db', `${this.qdnClassification}`);
      formData.append('qdnDefects2Db',        `${this.qdnDefects}`);
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
    //🔚* Method to insert into the database Ends Here!
    //**Method for success alert!*/
    successAlert  = async() => {
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
      })
      await Toast.fire({
        icon: 'success',
        title: 'Success!',
        html:"QDN " + "<b style ='color:red;'>"+  `${this.qdnNumber}` +"</b>"
        + " Sent for analysis!",
      }).then(()=>{
        window.location.replace("index.php");
      });
    };
    //🔚* Method for success alert Ends Here!
    //**METHOD TO GET EMAIL RECEIVERS*/
    fetchEmail() {
      let noIdea = `${this.qdnITENo}`
      let plainEmpNum = (noIdea.trim());
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
    };
    //🔚**METHOD TO GET EMAIL RECEIVERS ENDS HERE!*/
    // METHOD TO CONVERT EMAIL DETAILS INTO STRING
    emailDetails (data){
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
    //🔚** METHOD TO CONVERT EMAIL DETAILS INTO STRING ENDS HERE*/
    // METHOD THAT WILL SEND AN EMAIL
    sendEmail = receivers => {
      Email.send({
        Host: "smtp.gmail.com",
        Username : "systemqdn2021@gmail.com",
        Password : "tjvxdnvqvepgtwck",
        // To : receivers,
        To : "chanchristianarana@gmail.com",
        From : "systemqdn2021@gmail.com",
        Subject : "QDN Issuance",
        Body : "Good Day," + "<br>" + "<br>" +
        "Please see below issuance under your respective area." + "<br>" + "<br>" +
        "<b>QDN No.:</b> "      + "<a href='http://tk-server.tspi.com:999/analysis.php'>" + `${this.qdnNumber}` + "</a>" + "<br>" +
        "<b>Discrepancy:</b> "  + `${this.qdnDefects}` + "<br>" + 
        "<b>Issued To:</b> "    + `${this.qdnITEN}` + "<br>" +
        "<b>Issued By:</b> "    + `${this.qdnIBEN}` + "<br>" +
        "<b>Station:</b> "      + `${this.qdnStation}` + "<br>" + 
        "<b>Date/Time:</b> "    + `${this.qdnDateTime}` + "<br>" + "<br>" +
        "<pre><b>Lot Details</b><br>" +
        "   <b>Lot ID No.:</b> "   + `${this.qdnLotId}` + "<br>" +
        "   <b>Package Type:</b> " + `${this.qdnPkgtype}` + "<br>" +
        "   <b>Part Name:</b> "    + `${this.qdnDeviceName}` +  "<br>" +
        "   <b>Machine No.:</b> "  + `${this.qdnMachine}` + "<br>" +
        "</pre>" +  
        "<strong>Note:</strong>" + "<br>" +
        "<pre>  This notification is an automated message. Please do not reply directly to this email.</pre>"
      });
    };
  
  };
  //*FUNCTION FOR ERROR ALERT*/
  let errorAlert = errorCode => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Something went wrong on " + errorCode + "!", 
    });
  };//🔚*FUNCTION FOR ERROR ALERT ENDS HERE!*/
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
          try{
            //Instantiating the object
            const initiateMainObj = new mainObject();
            // Fetch the initial emails from db.
            const fetchRawEmails = await initiateMainObj.fetchEmail();
            // Convert the object into a string format
            const receivers = initiateMainObj.emailDetails(fetchRawEmails);
            // execute the insert event to the database
            initiateMainObj.insertToDatabase();
            // This will send an emails
            initiateMainObj.sendEmail(receivers);
            // This will execute the success alert method
            initiateMainObj.successAlert();
          }
          catch (err){
            errorAlert(err);
          }
        };
        
        form.classList.add('was-validated')
      }, false)
    });
})();
