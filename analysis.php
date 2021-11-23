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
  <link href="./bootstrap-4.0/css/bootstrap.min.css" rel="stylesheet">
  <link href="./bootstrap/css/bootstrap.css" rel="stylesheet">
  <link href="./css/switch/component-custom-switch.css" rel="stylesheet">
  <!------------------------------------------------------------------>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
  <!------------------------------------------------------------------>
  <!-- Custom styles for this template -->
  <!------------------------------------------------------------------>
  <link href="./css/simple-sidebar.css" rel="stylesheet">
  <!------------------------------------------------------------------>
  <link rel="stylesheet" type="text/css" href="./css/analysis.css">
  <!------------------------------------------------------------------>
  <!-- JQUERY STYLESHEET -->
  <link href="./js/jquery-ui-1.13.0/jquery-ui.css" rel="stylesheet">
  <!------------------------------------------------------------------>
  <!-- Bootstrap core JS -->
  <script src="./bootstrap/js/bootstrap.bundle.min.js"></script>
  <!------------------------------------------------------------------>
  <script src="./bootstrap/js/bootstrap.js"></script>
  <!------------------------------------------------------------------>
  <script src="./bootstrap/js/bootstrap.bundle.js"></script>
  <!------------------------------------------------------------------>
  <!--CORE JS-->
  <script type="text/javascript" src="./js/jquery-3.6.0.min.js"></script>
  <!------------------------------------------------------------------>   
  <script defer type="text/javascript" src="./js/globalVariables.js"></script>
  <!-- <script src="./js/analysis_copy.js" defer></script> -->
  <script src="./js/analysis.js" defer></script>  
  <!------------------------------------------------------------------>
  <script src="./js/analysisFormValidation.js" defer></script>
  <!------------------------------------------------------------------>
  <script src = "./js/submitForApproval.js" defer></script>
  <!------------------------------------------------------------------>
  <script src="./js/sweetalert2.all.min.js"></script>
  <!------------------------------------------------------------------>
  <!-- JQUERY UI -->
  <!------------------------------------------------------------------>
  <script defer src="./js/jquery-ui-1.13.0/external/jquery/jquery.js"></script>
  <!------------------------------------------------------------------>
  <script defer src="./js/jquery-ui.js"></script>
  <!------------------------------------------------------------------>
  <!-- EMAIL API -->
  <!------------------------------------------------------------------>
  <script src="./js/smtp.js"></script>
  <!------------------------------------------------------------------>
</head>
<body>
  <div class="sidebar">
    <div class="sysName">
      <img src="./images/TELFORDmd.jpg" alt="TELFORD_LOGO">
      <h4>QDN SYSTEM</h4>
    </div>
    <a href="index.php"><img src="./images/svg/003-data gathering.svg"></img>Issuance</a>
    <a href="approval.php"><img src="./images/svg/026-decision.svg"></img>Approval</a>
  </div>
    
  <div class="content">
    <div class="card mb-10">
      <form class="needs-validation" novalidate>
        <h4 class="mb-4">QDN Analysis</h4>
        <div class="row col-md-12 mb-3">
          <div class="errorSpan col-sm-4">
            <label for="qdnNumber" class="form-label">QDN #:</label>
            <input autocomplete = "off" type="text" class="form-control" id="qdnNumber">
            <div class="invalid-feedback">
              Invalid QND No.
            </div>  
          </div>
        </div>
        <!--
        ================
          ROW #2
        ================  
        -->  
        <fieldset class="issueDetails" id="issueDetails">
          <div class="row">
            <div class="col-sm-2">
              <label for="issuedByEmpNumber" class="telfordRed col-form-label">Issued By: </label>
            </div>
            <div class="col">
              <span class='fromdbResutl' id='ibName'></span>
            </div>
            <div class="col-sm-2">
              <label class="telfordRed col-form-label">Team: </label>
            </div>
            <div class="col">
              <span class="fromdbResutl" id="ibTeam"></span>
            </div>
          </div>
          <!--
          ================
              ROW #3
          ================  
          -->  
          <div id="issuedToDiv" class="row">
            <div class="col-sm-2">
              <label for="issuedToEmpNumber"  class="telfordRed col-form-label">Issued To: </label>
            </div>
            <div class="col">
              <span class="fromdbResutl" id="itName"></span>
            </div>
            <div class="col-sm-2">
                <label for="issuedToEmpName" class="telfordRed col-form-label">Team: </label>
            </div>
            <div class="col">
              <span class="fromdbResutl" id="itTeam"></span>
            </div>
          
          </div>
          <!--
          =======================
              ROW #3.x OPTIONAL
          =======================  
          -->  
          <script id="reAssignmentDiv1" type="text/x-custom-template">
            <div id="reAssignmentDiv2" class="row">
              <div class="col">
                <label id="labelSpanName" class="col-form-label">Reassigned To: </label>
              </div>
              <div class="col">
                  <label id="labelSpanTeam" class="col-form-label">Team: </label>
              </div>
            </div>
          </script>
          <!--
          ================
              ROW #4
          ================  
          -->
          <div class="row">
            <div class="col-sm-2">
              <label class="telfordRed col-form-label">Date/Time: </label>
            </div>
            <div class="col">
              <span class="fromdbResutl" id="dateTime"></span>
            </div>
            <div class="col-sm-2">
              <label class="telfordRed col-form-label">Customer: </label>
            </div>
            <div class="col">
              <span class="fromdbResutl" id="customer"></span>
            </div>
          </div>
          <!--
          ================
              ROW #5
          ================  
          -->  
          <div class="row ">
            <div class="col-sm-2">    
              <label for="station" class="telfordRed col-form-label">Station: </label>
            </div>
            <div class="col">
              <span class="fromdbResutl" id="station"></span>
            </div>
            <div class="col-sm-2">
              <label class="telfordRed col-form-label">Team/Resp: </label>
            </div>
              <div class="col"><span class="fromdbResutl" id="teamResp"></span>
            </div>
          </div>  
           <!--
          ================
              ROW #5.1
          ================  
          -->  
          <div class="row">
            <div class="col-sm-2">
              <label class="telfordRed col-form-label">Machine: </label>
            </div>
            <div class="col">
              <span class="fromdbResutl" id="machine"></span>
            </div>
            <div class="col-sm-2">
              <label for="packageType" class="telfordRed col-form-label">Package Type: </label>
            </div>
            <div class="col">
              <span class="fromdbResutl" id="pkgType"></span>
            </div>
          </div>
          <!--
          ================
              ROW #6
          ================  
          -->  
          <div class="row">
            <div class="col-sm-2">
              <label for="deviceName" class="telfordRed col-form-label">Part Name: </label>
            </div>
            <div class="col">
              <span class="fromdbResutl" id="partName"></span>
            </div>
            <div class="col-sm-2">
              <label for="lotId" class="telfordRed col-form-label">Lot ID: </label>
            </div>
            <div class="col">
              <span class="fromdbResutl" id="lotId"></span>
            </div>
          </div>
          <!--
          ================
              ROW #7
          ================  
          -->    
          <div class="row">
            <div class="col-sm-2">
              <label for="deviceName" class="telfordRed col-form-label">Classification: </label>
            </div>
            <div class="col">
              <span class="fromdbResutl" id="classification"></span>
            </div>
            <div class="col-sm-2">
            <label for="nonconformity" class="telfordRed col-form-label"> NC/Defects: </label>
            </div>
            <div class="col">
            <span class="fromdbResutl" id="defects"></span>
            </div>
          </div>
        </fieldset>

        <!-- <div id='reAssignment'>
          <div  class='row'>
            <div class='col-4'>
              <label for='reAssignTo' class='col-form-label'>ReassignTo</label>
              <input id='reAssignTo' type='number' class='form-control' placeholder='Employee #...' required/>
            </div>
            <div class='col-4'>
              <label class='col-form-label' for='reAssignToName'>Emp. Name:</label>
                <input id='reAssignToName' type='text' class='form-control' required/>
            </div>
            <div class='col-4'>
                <label class='col-form-label'>Team:</label>
                <input id='reAssignToTeam' type='text' class='form-control' required/>
            </div>
          </div>
          <div class='row'>
            <div class = 'col-4'></div>
            <div class = 'col-4'>
              <label class='col-form-label' for='dept' >Department:</label>
              <input id='dept' type='text' class='form-control' required/>
            </div>
            <div class = 'col-4'>
              <label class='col-form-label' for='reassTeamResp' >Team Resp:</label>
              <input id='reassTeamResp' type='text' class='form-control' required/>
            </div>
          </div>
          <div class='row col-form-label-lg mt-3'>
            <div class='col'>
              <label class='col-form-label'>Reassignment Description:</label>
              <textarea id='reAssignmentDes' class='form-control text-center w-50' rows='2' required></textarea>
            </div>
          </div>
        </div> -->

        <script class="reAssignmentBtn" type="text/x-custom-template">
          <div id="reAssignDiv" class="custom-switch custom-switch-label-yesno custom-switch-xs pl-0">
            <input class="custom-switch-input" id="reAssign" type="checkbox">
            <label class="custom-switch-btn" for="reAssign"></label>
            <div class="custom-switch-content-checked my-3">
              <span class="text-success">Reassigning...</span>
            </div>
            <div class="custom-switch-content-unchecked my-3">
              <span class="text-danger">Reassign?</span>
            </div>
          </div>
        </script>

        <script id="analysisSection" type="text/x-custom-template">
          <div class="analysisSection">
            <label class="col-md-5 col-form-label-lg">Failure Mode:</label>
            <div class="row col-md-12 mb-4">
              <div class="col-md-10 ml-4">
                <label for="classification" class="form-check-label">
                <div class="form-check form-check-inline">
                  <input name="failureMode" class="form-check-input" inputName = "Failure Mode" type="radio" value="Man" id="man" >
                  <label class="form-check-label" for="man">Man</label>
                </div>
                <div class="form-check form-check-inline">
                  <input name="failureMode" class="form-check-input" type="radio" value="Machine" id="MaChine">
                  <label class="form-check-label" for="MaChine">Machine</label>
                </div>
                <div class="form-check form-check-inline">
                  <input name="failureMode" class="form-check-input" type="radio" value="Material" id="material">
                  <label class="form-check-label" for="material">Material</label>
                </div>
                <div class="form-check form-check-inline">
                  <input name="failureMode" class="form-check-input" type="radio" value="Method" id="method">
                  <label class="form-check-label" for="method">Method</label>
                </div>
                <div class="form-check form-check-inline">
                  <input name="failureMode" class="form-check-input" type="radio" value="Environment" id="environment">
                  <label class="form-check-label" for="environment">Environment</label>
                </div>
              </div>
            </div>
            <div class="row col-md-12 mb-4">
              <label class="col-md-5 mt-3 col-form-label-lg">DISPOSITION:</label>
              <div class="col-md-10 ml-4">
                <label for="classification" class="form-check-label">
                <div class="form-check form-check-inline">
                  <input name="disposition" class="form-check-input" type="radio" value="USE AS IS" id="useAsIs" >
                  <label class="form-check-label" for="useAsIs">USE AS IS</label>
                </div>
                <div class="form-check form-check-inline">
                  <input name="disposition" class="form-check-input" type="radio" value="NCMR #" id="mcmr">
                  <label class="form-check-label" for="mcmr">NCMR #</label>
                </div>
                <div class="form-check form-check-inline">
                  <input name="disposition" class="form-check-input" type="radio" value="REWORK" id="rework">
                  <label class="form-check-label" for="rework">REWORK</label>
                </div>
                <div class="form-check form-check-inline">
                  <input name="disposition" class="form-check-input" type="radio" value="SPLIT LOT" id="splitLot">
                  <label class="form-check-label" for="splitLot">SPLIT LOT</label>
                </div>
                <div class="form-check form-check-inline">
                  <input name="disposition" class="form-check-input" type="radio" value="SHUTDOWN" id="shutdown">
                  <label class="form-check-label" for="shutdown">SHUTDOWN</label>
                </div>
                <div class="form-check form-check-inline">
                  <input name="disposition" class="form-check-input" type="radio" value="SHIP BACK" id="shipBack">
                  <label class="form-check-label" for="shipBack">SHIP BACK</label>
                </div>
              </div>
            </div>

            <div class="row col-md-12 mb-4">
              <label class="mt-3 col-form-label-lg">CAUSE OF DEFECTS / FAILURE:</label>
              <div class="col-md-12 ml-4">
                <label for="classification" class="form-check-label">
                <div class="form-check form-check-inline">
                  <input  name="COD" class="form-check-input" type="radio" value="Production" id="production" >
                  <label class="form-check-label" for="production">PRODUCTION</label>
                </div>
                <div class="form-check form-check-inline">
                  <input  name="COD" class="form-check-input" type="radio" value="Process" id="process">
                  <label class="form-check-label" for="process">PROCESS</label>
                </div>
                <div class="form-check form-check-inline">
                  <input  name="COD" class="form-check-input" type="radio" value="Maintenance" id="Maintenance">
                  <label class="form-check-label" for="Maintenance">MAINTENANCE</label>
                </div>
                <div class="form-check form-check-inline">
                  <input  name="COD" class="form-check-input" type="radio" value="Facilities" id="Facilities">
                  <label class="form-check-label" for="Facilities">FACILITIES</label>
                </div>
                <div class="form-check form-check-inline">
                  <input  name="COD" class="form-check-input" type="radio" value="QA" id="QA">
                  <label class="form-check-label" for="QA">QA</label>
                </div>
                <div class="form-check form-check-inline">
                  <input  name="COD" class="form-check-input" type="radio" value="Others" id="Others">
                  <label class="form-check-label" for="Others">Others</label>
                </div>

                <div class="row col-md-12">
                  <textarea required id="CODstatement" class="form-control mt-3 text-center w-100" rows="3"></textarea>
                </div>
              </div>
            </div>

            <table class="table table-hover table-bordered border-warning text-center" >
              <thead class="table-warning">
                <tr>
                  <th scope="col" title="Action to isolate a detected nonconformity">CONTAINMENT ACTION</th>
                  <th scope="col">RESPONSIBLE</th>
                  <th scope="col">WHEN</th>
                  <th scope="col">STATUS</th>
                </tr>
              </thead>
              <tbody class="containmentTbody">
                <tr id = "conTblRow">
                  <td id="containment" contenteditable="true" class="pre-wrap"></td>
                  <td id= "containmentResp" contenteditable="true" class="pre-wrap"></td>
                  <td id="containmentWhen" contenteditable="true" class="pre-wrap"></td>
                  <td id="containmentStatus" contenteditable="true" class="pre-wrap"></td>
                </tr>
              </tbody>
            </table>
            <table class="table table-hover table-bordered border-warning text-center" >
              <thead class="table-warning">
                <tr>
                  <th scope="col" title="Action to eliminate a detected nonconformity">CORRECTION</th>
                  <th scope="col">RESPONSIBLE</th>
                  <th scope="col">WHEN</th>
                  <th scope="col">STATUS</th>
                </tr>
              </thead>
              <tbody class = "correctionTbody">
                <tr id = "correctionTblRow"> 
                  <td id="correction" contenteditable="true" cols="3" class="pre-wrap"> </td>
                  <td id="correctionResp" contenteditable="true" class="pre-wrap"></td>
                  <td id="correctionWhen" contenteditable="true" class="pre-wrap"></td>
                  <td id="correctionStatus" contenteditable="true" class="pre-wrap"></td>
                </tr>
              </tbody>
            </table>

            <table id="b4btn" class="table table-hover table-bordered border-warning text-center" >
              <thead class="table-info">
                <tr>
                  <th scope="col" title="Action to eliminate cause of a detected nonconformity and to prevent recurrence">CORRECTIVE ACTION/S TAKEN</th>
                  <th scope="col">RESPONSIBLE</th>
                  <th scope="col">WHEN</th>
                  <th scope="col">STATUS</th>
                </tr>
              </thead>
              <tbody class = "correctiveTbody">
                <tr id = "correctiveTblRow">
                  <td id="corrective" contenteditable="true" cols="3" class="pre-wrap"></td>
                  <td id="correctiveResp" contenteditable="true" class="pre-wrap"></td>
                  <td id="correctiveWhen" contenteditable="true" class="pre-wrap"></td>
                  <td id="correctiveStatus" contenteditable="true" class="pre-wrap"></td>
                </tr>
              </tbody>
            </table>
            <div id="analysisBtn" class="row">
              <div class="col">
                <a id="forApproval" role="button" class='w-100 btn btn-secondary btn-lg mt-3' id="forApproval">Submit for Approval</a>
              </div>
              <div class="col">
                <button class='w-100 btn btn-success btn-lg mt-3' id='submitUpdate'>Submit Update(s)</button>
              </div>
            </div>
          </div>
        </script>
      </form>
    </div>   
  </div>
</body>
</html>