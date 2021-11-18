// ** ✅ ==> DONE
// ** 🔚 ==> END
// Example starter JavaScript for disabling form submissions if there are invalid fields
(async function () {
  'use strict'
  /**OBJECT CREATION AND ASSIGNING PROPERTIES*/
  function issuanceAlertFactory(title, body, data ) {
    return Object.create(alertObject, {
        data: {value: data},
        title: {value: title},
        body: {value: body},
        monthOnly: {value: month[date.getMonth()]}
    });
  };
  function issuanceGlobalRequest(param) {
    return Object.create(requestObject, {
        name: {value: param.a},
        requestNum: {value: param.b},
        val: {value: param.c},
    });
  };
  function issuanceAlgoEvt (data){
    return Object.create(eventsObject, {
      rawEmailData : {value: data},
       /**Email Instance (issuance)*/
       receivers:{value: data.a},
       qndNum: {value: data.b}
    })
  };
  /**OBJECT CREATION AND ASSIGNING PROPERTIES
  * RESPONSIBLE FOR EMAIL PROPERTIES*/
  function issuanceSendEmail(details){
    return Object.create(emailFormats, {
        receivers :{value: details.r},
        subject: {value: details.s},
        body: {value: details.b}
    });
  };

  class mainObject  {
    constructor (){
      this.qdnNumber         = $("#qdnNumber").html();
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
      .then(async function (response) {
        /**INSTANTIATING THE MAIN CLASS */
        const initiateMainObj = new mainObject();
        if (response.status == 200 && response.ok){
          // console.log("This is the response from insert Event", response);
          /**STORING THE PARAMETERS VALUE INTO AN OBJECT TO REDUCE THE PARAMETERS*/
          const issuanceCustomParam = {a:"issuedToEmpNo", b:13, c: $("#issuedToEmpNumber").val()};
          /**INSTANCE TO GET THE APPROVERS EMAIL OF THE PERSON RESPONSIBLE FOR THE QDN */
          const emailDetailsReq = new issuanceGlobalRequest(issuanceCustomParam);
          const issuanceRawReceiversData = await emailDetailsReq.requestWith2param();
          /**INSTANCE TO PROCESS THE FORMAT OF RECEIVERS */
          const issuanceFormatReceivers = new issuanceAlgoEvt(issuanceRawReceiversData);
          /**METHOD TO FORMAT RECEIVERS*/
          const issuanceReceivers = issuanceFormatReceivers.formatRawDataOfReceivers();
          /** SEND EMAILS */
          const issuanceEmailDetails = {a:issuanceReceivers, b:  $("#qdnNumber").html()};
          /**INSTANCE FOR SENDING EMAIL */
          const issuanceSettingEmailDetails = new issuanceAlgoEvt(issuanceEmailDetails);
          try{
            /** SEND EMAILS */
            const issuanceEmailFormat = {r: issuanceSettingEmailDetails.receivers, s:`QDN Issuance`,b: `<p>Good Day,</p><br>
            <p>Please see below issuance under your respective area.</p> <br> 
            <b>QDN No.: </b><a href='${window.location.protocol}//${window.location.hostname}/QDN/analysis.php?qdnNo=${issuanceSettingEmailDetails.qndNum}'>${issuanceSettingEmailDetails.qndNum}</a><br> 
            <b>Discrepancy: </b>${initiateMainObj.qdnDefects}<br>  
            <b>Issued To: </b>${initiateMainObj.qdnITEN}<br> 
            <b>Issued By: </b>${initiateMainObj.qdnIBEN} <br> 
            <b>Station: </b>${initiateMainObj.qdnStation} <br>  
            <b>Date/Time: </b>${initiateMainObj.qdnDateTime} <br><br> 
            <b>LOT DETAILS</b><br> 
              <b>&emsp;Lot ID No.: </b>${initiateMainObj.qdnLotId} <br> 
              <b>&emsp;Package Type: </b>${initiateMainObj.qdnPkgtype} <br> 
              <b>&emsp;Part Name: </b>${initiateMainObj.qdnDeviceName} <br> 
              <b>&emsp;Machine No.: </b>${initiateMainObj.qdnMachine}`};
            const issuanceEmailThing = new issuanceSendEmail(issuanceEmailFormat);
            issuanceEmailThing.initialEmailFormat();
            // This will INSTANTIATE the success ALERT FACTORY
            const issuanceAlertFormat = new issuanceAlertFactory(`ISSUANCE SUCCESS!<br> 🎉 🥳 🎉`, 
            `QDN <em>${$("#qdnNumber").html()}</em> Sent for analysis!`);
            /**METHOD EXECUTION*/
            await issuanceAlertFormat.successAlert()
            .then(function(){
              window.location.reload();
            });
          }
          catch(e){
              const sendingEmailError = new issuanceAlertFactory(`Something Went Wrong 🤔!`,
              `Sending Email Failed!.<br>
              Location: form-validation.js <br>
              StatusCode: "${e.status}"`);
              /**METHOD EXECUTION*/
              await sendingEmailError.errorAlert();
          }
        }
        else{
          // error inserting to the database.
          initiateMainObj.errorAlert(response.statusText);
        };
      });
    };
    //🔚* Method to insert into the database Ends Here!
  };
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
          console.log(window.location.protocol)
        }
        else{
          event.preventDefault();
          event.stopPropagation();
          // WILL DISABLE THE BUTTON TEMPORARILY TO AVOID MULTIPLE SENT 
          // REQUEST TO DATABASE.
          $(":input[id ='issuanceSubmit']").prop('disabled', true);
          const instanceMainObj = new mainObject();
          instanceMainObj.insertToDatabase();
        };
        form.classList.add('was-validated')
      }, false)
    });
})();
