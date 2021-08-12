<!DOCTYPE html>
<!-- <html lang="en" oncontextmenu="return false"> -->
  <html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="QUALITY DEVIATION NOTICE System">
  <meta name="author" content="Christian Araña, and open source Contributors">
  <!-- This will remove or prevent cache -->
  <meta http-equiv='cache-control' content='no-cache'>
  <meta http-equiv='expires' content='0'>
  <meta http-equiv='pragma' content='no-cache'>
  <!-- Cache Control Ends Here -->
  <link rel="icon" href="images/asti.ico"  type="image/x-icon">
  <title>Quality Deviation Notice</title>
  <!------------------------------------------------------------------>
  <!-- Bootstrap core CSS-->
  <!------------------------------------------------------------------>
  <link href="./bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <!------------------------------------------------------------------>
  <link href="./bootstrap/css/bootstrap.css" rel="stylesheet">
  <!------------------------------------------------------------------>
  <!-- Custom styles for this template -->
  <link href="./css/simple-sidebar.css" rel="stylesheet">
  <!------------------------------------------------------------------>
  <link href="./css/index.css" rel="stylesheet">
  <!------------------------------------------------------------------>
  <!-- JQUERY STYLESHEET -->
  <!------------------------------------------------------------------>
  <link rel="stylesheet" href="./js/jquery-ui-1.12.1/jquery-ui.css">
  <!------------------------------------------------------------------>
  <!-- Bootstrap core JS -->
  <!------------------------------------------------------------------>
  <script src="./bootstrap/js/bootstrap.bundle.min.js"></script>
  <!------------------------------------------------------------------>
  <script src="./bootstrap/js/bootstrap.js"></script>
  <!------------------------------------------------------------------>
  <script src="./bootstrap/js/bootstrap.bundle.js"></script>
  <!------------------------------------------------------------------>
  <script src="https://use.fontawesome.com/5fe0351dea.js"></script>
  <!------------------------------------------------------------------>
  <!-- JS-->
  <script type="text/javascript" src="./js/jquery-3.6.0.min.js"></script>
  <script defer src="./js/form-validation.js"></script>
  <!------------------------------------------------------------------> 
  <script src="./js/issuance.js" defer></script>
  <!------------------------------------------------------------------>
  <script src="./js/autoGeneratedQdnNo.js" defer></script>
  <!------------------------------------------------------------------>
  <script src="./js/time_date.js" defer></script>
  <!------------------------------------------------------------------>
  <script src="./js/sweetalert2.all.min.js" defer></script>
  <!------------------------------------------------------------------>
  <!-- JQUERY STYLESHEET -->
  <!------------------------------------------------------------------>
  <script src="https://smtpjs.com/v3/smtp.js"></script>
  <!------------------------------------------------------------------>
  <!-- JQUERY UI -->
  <!------------------------------------------------------------------>
  <script src="./js/jquery-ui-1.12.1/external/jquery/jquery.js"></script>
  <!------------------------------------------------------------------>
  <script src="./js/jquery-ui-1.12.1/jquery-ui.js"></script>
  <!------------------------------------------------------------------>
  <script src="./js/j_ui/jquery-ui.js"></script>
  <!------------------------------------------------------------------>
  <script src="./js/jquery-ui-1.12.1/jquery-ui.min.js"></script>
  <!------------------------------------------------------------------>

</head>
<body>
  <div class="sidebar">
    <div class="sysName">
      <img src="./images/TELFORDmd.jpg" alt="TELFORD_LOGO">
      <h4>QDN SYSTEM</h4>
    </div>
    <a href="analysis.php"><img src="./images/svg/009-data research.svg"></img>Analysis</a>
    <a href="approval.php"><img src="./images/svg/026-decision.svg"></img>Approval</a>
  </div>
    
  <div class="content">
    <div class="card">
      <form class="needs-validation" novalidate>
        <h4 class="mb-4">QUALITY DEVIATION NOTICE</h4>

        <div class="row col-md-12">
          <div class="col-sm-4">
          <label for="qdnNumber" class="form-label">QDN #:</label>
          <span type="text" class="form-control" id="qdnNumber" ></span>
        </div>
         <!--
        ================
          ROW #2
        ================  
        -->  
        <div class="row col-md-12 ">
          <div class="col-md-4">
            <label for="Issued By Employee Number" class="col-form-label">Issued By:</label>
            <input id="issuedByEmpNumber" inputName = "Issued By Employee Number" type="number" class="form-control" placeholder="Employee #" required/>
          </div>
          <div class="col-md-5">
            <label class="col-form-label">Emp. Name:</label>
            <input class="autofill" id="issuedByEmpName"  type="text"/>
          </div>
          <div class="col-md-3">
            <label class="col-form-label">Team:</label>
            <input class="autofill" id="issuedByEmpTeam"  type="text" />
          </div>
        </div>
        <!--
        ================
            ROW #3
        ================  
        -->  
        <div id="issuedToDiv" class="row col-md-12">
          <div class="col-md">
            <label for="Issued To Employee Number" class="col-form-label">Issued To:</label>
            <input id="issuedToEmpNumber" type="number" inputName = "Issued To Employee Number" class="form-control" placeholder="Employee #" required/>
            <div class="invalid-feedback">
              Required field.
            </div>
          </div>
          <div class="col-md-5">
              <label for="issuedToEmpName" class="col-form-label">Emp. Name:</label>
              <input class="autofill" id="issuedToEmpName" type="text"  />
          </div>
          <div class="col-md-3">
              <label for="issuedToEmpTeam" class="col-form-label">Team:</label>
              <input class="autofill" id="issuedToEmpTeam" type="text" />
          </div>
        </div>
        <!--
        ================
            ROW #4
        ================  
        -->
        <div class="row col-md-12">
          <div class="col-md-4">
            <label for="station" class="col-form-label">Station:</label>
            <input class="autofill station" id="station" type="text" placeholder="AutoFill..."/>
          </div>
          <div class="col-md-4">
            <label class="col-form-label">Team/Resp:</label>
            <input class="autofill teamResp" id="teamResp" type="text"  placeholder="AutoFill..."/>
          </div>
          <div class="col-md-4">
            <label class="col-form-label">Date/Time:</label>
            <input class="autofill dateTime" id="dateTime" type="text"  placeholder="Autogenerated..."/>
          </div>
        </div>  
        <!--
        ================
            ROW #5
        ================  
        -->  
        <div class="row col-md-12">
          <div class="col-md-4">
            <label class="col-form-label">Customer:</label>
              <select class="form-select" id="customer" inputName = "Customer" required>
                <option value="" disabled selected hidden></option>
                <option>N/A</option>
                <option>ADLT</option>
                <option>ADGT</option>
              </select>
          </div>
          <div class="col-md-4">
            <label class="col-form-label">Machine:</label>
            <input id="machine" type="text" class="form-control" inputName = "Machine" required/>
          </div>
          <div class="col-md-4">
            <label for="packageType" class="col-form-label">Package Type:</label>
            <input class="autofill" id="packageType" type="text" class="form-control"  inputName = "Package Type" required/>
          </div>
        </div>
        <!--
        ================
            ROW #6
        ================  
        -->  
        <div class="row col-md-12">
          <div class="col-md-4">
            <label for="deviceName" class="col-form-label">Part Name:</label>
            <input class="form-control" id="partName" type="text" class="form-control" inputName = "Part Name" required/>
          </div>
          <div class="col-md-4">
            <label for="lotId" class="col-form-label">Lot ID:</label>
            <input id="lotId" type="text" class="form-control" inputName = "Lot ID" name = "Lot ID"required />
          </div>
        </div>
        <!--
        ================
            ROW #7
        ================  
        -->  
        <label class="col-md-3   mt-4 col-form-label-lg">Classification:</label>
        <div class="row col-md-12 mb-4">
          <div class="col-md-6 ml-4">
              <input type="radio" class="form-check-input " inputName = "Classification" name="classification" id="minor" value="Minor" required> 
              <label for="minor" class="form-check-label">Minor</label>
              <input type="radio" class="form-check-input " name="classification" id="major" value="Major" required>
              <label for="major" class="form-check-label">Major</label></label>
          </div>
        </div>
        <!--
        ================
            ROW8
        ================  
        -->          
        <div class="row col-md-12 mb-4">
          <div class="col-md-12">
            <label for="exampleTextarea1" class="col-form-label-lg">NONCONFORMITY/ DEFECTS:</label>
            <textarea id="defects"  rows="4" class="form-control" inputName = "Nonconformity Defects" required></textarea>
          </div>
        </div>  
        <button id="submit" class="w-100 btn btn-success btn-lg mt-3" type="submit">Send for Review & Analysis</button>
      </form>
    </div>  

    </div>
  
</body>
</html>
