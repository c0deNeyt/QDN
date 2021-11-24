// ** ✅ ==> DONE
// ** 🔚 ==> END
// Example starter JavaScript for disabling form submissions if there are invalid fields
(async function () {
  'use strict'
  /**OBJECT CREATION AND ASSIGNING PROPERTIES*/
  function issuanceAlertFactory(param1, param2, param3) {
    return Object.create(alertObject, {
        title: {value: param1},
        body: {value: param2},
        data: {value: param3},
        monthOnly: {value: month[date.getMonth()]},
    });
  };
  /**OBJECT CREATION AND ASSIGNING PROPERTIES*/
  function issuanceAlertFactory(title, body, data ) {
    return Object.create(alertObject, {
        data: {value: data},
        title: {value: title},
        body: {value: body},
        monthOnly: {value: month[date.getMonth()]}
    });
  };// ** 🔚 ==> END
  function issuanceGlobalRequest(param) {
    return Object.create(requestObject, {
        name: {value: param.a},
        requestNum: {value: param.b},
        val: {value: param.c},
    });
  };// ** 🔚 ==> END
  function issuanceAlgoEvt (data){
    return Object.create(eventsObject, {
      rawEmailData : {value: data},
       /**Email Instance (issuance)*/
       receivers:{value: data.a},
       qndNum: {value: data.b},
       qdnNumber: {value: data.a},
       qdnIBENo: {value: data.b},
       qdnIBEN: {value: data.c},
       qdnIBET: {value: data.d},
       qdnITENo: {value: data.e},
       qdnITEN: {value: data.f},
       qdnITET: {value: data.g},
       qdnCustomer: {value: data.h},
       qdnMachine: {value: data.i},
       qdnPkgtype: {value: data.j},
       qdnDeviceName: {value: data.k},
       qdnStation: {value: data.l},
       qdnLotId: {value: data.m},
       qdnTeamResp: {value: data.n},
       qdnDateTime: {value: data.o},
       qdnClassification: {value: data.p},
       qdnDefects: {value: data.q},
    })
  };// ** 🔚 ==> END
  /**OBJECT CREATION AND ASSIGNING PROPERTIES
  * RESPONSIBLE FOR EMAIL PROPERTIES*/
  function issuanceSendEmail(details){
    return Object.create(emailFormats, {
        receivers :{value: details.r},
        subject: {value: details.s},
        body: {value: details.b}
    });
  };// ** 🔚 ==> END
  class mainObject  {
    constructor (data) {
      this.issuanceVariables = data;
    }
    /**METHOD TO FETCH EMAIL RECEIVERS */
    async  validIssuanceEvt(){
      /**STORING THE PARAMETERS VALUE INTO AN OBJECT TO REDUCE THE PARAMETERS*/
      const issuanceCustomParam = {a:"issuedToEmpNo", b:13, c: $("#issuedToEmpNumber").val()};
      try{
        /**INSTANCE TO GET THE APPROVERS EMAIL OF THE PERSON RESPONSIBLE FOR THE QDN */
        const emailDetailsReq = new issuanceGlobalRequest(issuanceCustomParam);
        /**METHOD OF THE INSTANCE emailDetailsReq */
        const issuanceRawReceiversData = await emailDetailsReq.requestWith2param();
        if(issuanceRawReceiversData.length > 3){
          console.log("RECEIVERS FOUND", issuanceRawReceiversData);
          /**INSTANCE TO PROCESS THE FORMAT OF RECEIVERS */
          const issuanceFormatReceivers = new issuanceAlgoEvt(issuanceRawReceiversData);
          /**METHOD TO FORMAT RECEIVERS*/
          const issuanceReceivers = issuanceFormatReceivers.formatRawDataOfReceivers();
          /**INSERTING TO THE DATABASE */
          this.insertToDatabase();
          /**PARSING PARAMETER VALUES NEEDED FOR issuanceSendEmail Object below*/
          const issuanceEmailFormat = {r: issuanceReceivers, s: "QDN Issuance", b: `<p>Good Day,</p>
          <p>Please see below issuance under your respective area.</p>  
          <b>QDN No.: </b><a href='${window.location.protocol}//${window.location.hostname}/QDN/analysis.php?qdnNo=${this.issuanceVariables.a}'>${this.issuanceVariables.a}</a><br> 
          <b>Discrepancy: </b>${this.issuanceVariables.q}<br>  
          <b>Issued To: </b>${this.issuanceVariables.f}<br> 
          <b>Issued By: </b>${this.issuanceVariables.c} <br> 
          <b>Station: </b>${this.issuanceVariables.l} <br>  
          <b>Date/Time: </b>${this.issuanceVariables.o} <br><br> 
          <b>LOT DETAILS</b><br> 
            <b>&emsp;Lot ID No.: </b>${this.issuanceVariables.m} <br> 
            <b>&emsp;Package Type: </b>${this.issuanceVariables.j} <br> 
            <b>&emsp;Part Name: </b>${this.issuanceVariables.k} <br> 
            <b>&emsp;Machine No.: </b>${this.issuanceVariables.i}`};
          /**INSTANCE FOR SENDING EMAIL */
          const issuanceEmailThing = new issuanceSendEmail(issuanceEmailFormat);
          /** SEND EMAILS */
          issuanceEmailThing.initialEmailFormat();
          // This will INSTANTIATE the success ALERT FACTORY
          const issuanceAlertFormat = new issuanceAlertFactory(`ISSUANCE SUCCESS!<br> 🎉 🥳 🎉`, 
          `QDN <em>${$("#qdnNumber").html()}</em> Sent for analysis!`);
          /**METHOD EXECUTION*/
          issuanceAlertFormat.successAlert().then(function(){
            //RELOAD THE PAGE
            window.location.reload();
          });
        }
        else{
          const errorReceivers = new issuanceAlertFactory(`Something Went Wrong 🤔!`,
          `🤦 No email(s) available 🤦<br>
          Location: for-validation.js`);
          /**METHOD EXECUTION*/
          await errorReceivers.errorAlert();
        };
      }
      catch(e){
        const error = new issuanceAlertFactory(`Something Went Wrong 🤔!`,
        `🤦 SERVER ERROR! 🤦<br>
        ERROR CODE: ${e.status}`);
        /**METHOD EXECUTION*/
        await error.errorAlert();
        console.log(e);
      } // ** 🔚 ==> END 
      // const issuanceRawReceiversData = await emailDetailsReq.requestWith2param();
    };
    // Method to insert into the database;
    insertToDatabase() {
      /**INSTANCE FOR INSERT EVENT TO THE DATABASE */
      const insertData = new issuanceAlgoEvt(this.issuanceVariables);
      insertData.issuanceInsertEvent();
    };
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
          /** SweetAlert to show each item 
          // store in invalid list when loop is finished.*/
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
          /**PARSING VALUE TO THE OJECT THAT WILL SERVER AS 
           * PARAMETER*/
          const issuanceVariables = {a: $("#qdnNumber").html(), b: $("#issuedByEmpNumber").val(),
          c: $("#issuedByEmpName").val(), d: $("#issuedByEmpTeam").val(), 
          e: $("#issuedToEmpNumber").val(), f: $("#issuedToEmpName").val(),
          g: $("#issuedToEmpTeam").val(), h: $("#customer").val(), 
          i: $("#machine").val(), j: $("#packageType").val(), 
          k: $("#partName").val(), l: $("#station").val(), 
          m: $("#lotId").val(), n: $("#teamResp").val(),
          o: $("#dateTime").val(), p: $("input[name = 'classification']:checked").val(), 
          q: $("#defects").val()};
          /**INSTANCE FOR THE MAIN OBJECT */
          const instanceMainObj = new mainObject(issuanceVariables);
          /**METHOD EXECUTION*/
          instanceMainObj.validIssuanceEvt();
        };
        form.classList.add('was-validated')
      }, false)
    });
})();
