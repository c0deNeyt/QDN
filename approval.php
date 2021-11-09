<!DOCTYPE html>
<html lang="en" oncontextmenu="return true">
<!-- <html lang="en"> -->
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
    <link href="./bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="./bootstrap/css/bootstrap.css" rel="stylesheet">
    <!------------------------------------------------------------------>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <!------------------------------------------------------------------>
    <!-- Custom styles for this template -->
    <!------------------------------------------------------------------>
    <link href="./css/simple-sidebar.css" rel="stylesheet">
    <!------------------------------------------------------------------>
    <link type="text/css" href="./css/approval.css" rel="stylesheet">
    <!------------------------------------------------------------------>
    <!-- JQUERY STYLESHEET -->
    <link rel="stylesheet" href="./js/jquery-ui-1.12/jquery-ui.css">
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
    <!-- <script defer src="./js/approvers.js"></script> -->
    <!------------------------------------------------------------------>
    <script defer src="./js/approversAuth.js"></script>
    <!------------------------------------------------------------------>
    <script src="./js/analysisFormValidation.js" defer></script>
    <!------------------------------------------------------------------>
    <script src="./js/sweetalert2.all.min.js"></script>
    <!------------------------------------------------------------------>
    <!-- JQUERY UI -->
    <!------------------------------------------------------------------>
    <script src="https://smtpjs.com/v3/smtp.js"></script>
    <!------------------------------------------------------------------>
    <script src="./js/jquery-ui-1.12/jquery-ui.js"></script>
    <!-- -------------------------------------------------------------- -->
    <!-- UNCOMMENT TO TEST HOW FAST THE PAGE LOAD
    <script type="text/javascript">
            var timerStart = Date.now();
    </script> -->
   
  </head>
  <body oncontextmenu="return true">
    <div class="sidebar">
      <div class="sysName">
        <img src="./images/TELFORDmd.jpg" alt="TELFORD_LOGO">
        <h4>QDN SYSTEM</h4>
      </div>
      <a href="index.php"><img src="./images/svg/003-data gathering.svg"></img>Issuance</a>
      <a href="analysis.php"><img src="./images/svg/009-data research.svg"></img>Analysis</a>
    </div>
      
    <div class="content">
      <div class="card mb-10">
        <form class="needs-validation" novalidate>
          <h4 class="mb-4">Approval Section</h4>
          <div class="row col-md-12 mb-3">
            <div class="errorSpan col-sm-4">
              <label for="qdnNumber" class="form-label">QDN #:</label>
              <input autocomplete = "off" type="text" class="form-control is-invalid" id="qdnNumber">
            </div>
          </div>
          <!--
          ================
            ROW #2
          ================  
          -->  
          <fieldset class="issueDetails" class = "mb-3">
            <div class="row">
              <div class="col-md-2">
                <label for="issuedByEmpNumber" class="telfordRed col-form-label">Issued By: </label>
              </div>
              <div class="col"> 
                <span class='fromdbResutl' id='ibName'></span>
              </div>  
              <div class="col-md-2">
                <label id="issuedByTeam" class="telfordRed col-form-label">Team: </label>
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
              <div class="col-md-2">
                <label for="issuedToEmpNumber"  class="telfordRed col-form-label">Issued To: </label>
              </div>
              <div class="col">
                  <span class="fromdbResutl" id="itName"></span>
              </div>
              <div class="col-md-2">
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
                <div class="col-md-6">
                  <label id="labelSpanName" class="col-form-label">Reassignment To: </label>
                </div>
                <div class="col-md-6">
                    <label id="labelSpanTeam" class="col-form-label">Team: </label>
                </div>
              
              </div>
            </script>
            <!-- <div id="reAssignmentDiv2" class="row">
                <div class="col-md-2">
                  <label id="labelSpanName" class="col-form-label">Reassigned To: </label>
                </div>
                <div class="col">
                    <span class="fromdbResutl" id="#">Pedro Penduko</span>
                </div>
                <div class="col-md-2">
                    <label id="labelSpanTeam" class="col-form-label">Team: </label>
                </div>
                <div class="col">
                    <span class="fromdbResutl" id="#">AB Normal</span>
                </div>
              
              </div> -->
            <!--
            ================
                ROW #4
            ================  
            -->
            <div class="row ">
              <div class="col-md-2">
                <label class="telfordRed col-form-label">Date/Time: </label>
              </div>
              <div class="col">
                <span class="fromdbResutl" id="dateTime"></span>
              </div>
              <div class="col-md-2">
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
            <div class="row">
              <div class="col-md-2">
                <label for="station" class="telfordRed col-form-label">Station: </label>
              </div>
              <div class="col">
                <span class="fromdbResutl" id="station"></span>
              </div>
              <div class="col-md-2">
                <label class="telfordRed col-form-label">Team/Resp: </label>
              </div>
              <div class="col">
                <span class="fromdbResutl" id="teamResp"></span>
              </div>
            </div>  
          <!--
            ================
                ROW #5.1
            ================  
            -->  
            <div class="row">
              <div class="col-md-2">
                <label class="telfordRed col-form-label">Machine: </label>
              </div>
              <div class="col">
                <span class="fromdbResutl" id="machine"></span>
              </div>
              <div class="col-md-2">
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
              <div class="col-md-2">
                <label for="deviceName" class="telfordRed col-form-label">Part Name: </label>
              </div>
              <div class="col">
                <span class="fromdbResutl" id="partName"></span>
              </div>
              <div class="col-md-2">
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
              <div class="col-md-2">
                <label for="deviceName" class="telfordRed col-form-label">Classification: </label>
              </div>
              <div class="col">
                <span class="fromdbResutl" id="classification"></span>
              </div>
              <div class="col-md-2">
                <label for="lotId" class="telfordRed col-form-label">Failure Mode: </label>
              </div>
              <div class="col">
                <span class="fromdbResutl" id="failureMode"></span>
              </div>
            </div>
            <!--
            ================
                ROW #7.1
            ================  
            -->    
            <div class="row">
              <div class="col-md-2">
                <label class="telfordRed col-form-label">Disposition: </label>
              </div>
              <div class="col">
                <span class="fromdbResutl" id="disposition"></span>
              </div>
              <div class="col-md-2">
                <label for="lotId" class="telfordRed col-form-label">Defects/Failure: </label>
              </div>
              <div class="col">
                <span class="fromdbResutl" id="rootCause"></span>
              </div>
            </div>
            <!--
            ================
                ROW #8
            ================  
            -->          
            <div class="row">
              <div class="col-md-12">
                <label for="nonconformity" class="telfordRed md-2 col-form-label-lg">Nonconformity/ Defects: </label>
                <span class="fromdbResutl" id="defects"></span>
              </div>
            </div>
            <!--
            ================
                ROW #9
            ================  
            -->       
            <div class="row mb-4">
              <div class="col-md-12">
                <label class="telfordRed  col-form-label-lg">Defect/Failure Description: </label>
                <span class="fromdbResutl" id="codDes"></span>
              </div>
            </div>
            <!--
            ===============================
                ROW #10 (Containment Table)
            ===============================  
            -->
            <div class="table-responsive-sm">       
              <table class="table table-bordered">
                <thead id="tblHeadContId" class="thead-light">
                  <tr class="table-danger">
                    <th scope="col" class="telfordRed">Containment</th>
                    <th scope="col" class="telfordRed">Responsible</th>
                    <th scope="col" class="telfordRed">When</th>
                    <th scope="col" class="telfordRed">Status</th>
                  </tr>
                </thead>
                <tbody id="containmentTbody">
                  <tr id="containmentRow">
                    <td id = "containmentCol" class="defaultCol">Blank</td>
                    <td id = "containmentRespCol" class="defaultCol">Blank</td>
                    <td id = "containmentWhenCol" class="defaultCol">Blank</td>
                    <td id = "containmentStatCol" class="defaultCol">Blank</td>
                  </tr>
                </tbody>
                <!-- END OF TABLE -->
              </table>
              <!-- END OF TABLE DIVISION -->
            </div>
            <!--
            ===============================
              #ROW #11 (Correction Table)
            ===============================  
            -->
            <div class="table-responsive-sm">       
              <table class="table table-bordered">
                <thead id = "tblHeadCorrId" class="thead-light">
                  <tr class="table-danger">
                    <th scope="col" class="telfordRed">Correction</th>
                    <th scope="col" class="telfordRed">Responsible</th>
                    <th scope="col" class="telfordRed">When</th>
                    <th scope="col" class="telfordRed">Status</th>
                  </tr>
                </thead>
                <tbody id="correctionTbody">
                  <tr id = "correctionRow">
                    <td id = "correctionCol" class="defaultCol">Blank</td>
                    <td id = "correctionRespCol" class="defaultCol">Blank</td>
                    <td id = "correctionWhenCol" class="defaultCol">Blank</td>
                    <td id = "correctionStatCol" class="defaultCol">Blank</td>
                  </tr>
                </tbody>
                <!-- END OF TABLE -->
              </table>
              <!-- END OF TABLE DIVISION -->
            </div>
            <!--
            ===============================
              #ROW #11 (Corrective Table)
            ===============================  
            -->
            <div class="table-responsive-sm">       
              <table class="table table-bordered">
                <thead id = "tblHeadCorrtvId" class="thead-light">
                  <tr class="table-danger">
                    <th scope="col" class="telfordRed">Corrective</th>
                    <th scope="col" class="telfordRed">Responsible</th>
                    <th scope="col" class="telfordRed">When</th>
                    <th scope="col" class="telfordRed">Status</th>
                  </tr>
                </thead>
                <tbody id="correctiveTbody">  
                <tr id = "correctiveRow">
                    <td id = "correctiveCol" class="defaultCol">Blank</td>
                    <td id = "correctiveRespCol" class="defaultCol">Blank</td>
                    <td id = "correctiveWhenCol" class="defaultCol">Blank</td>
                    <td id = "correctiveStatCol" class="defaultCol">Blank</td>
                  </tr>
                </tbody>
                <!-- END OF TABLE -->
              </table>
              <!-- END OF TABLE DIVISION -->
            </div>
            <!-- END OF FIELDSET  -->
          </fieldset>

          <div id="allCommands">
            <div class="row ">
                <div id="approvalDiv" class = "approvalDiv col">
                  <div>
                    <select id="productionAuth">
                      <option value="" selected disabled>Needs Approval...</option>
                    </select>
                  </div>
                  <span for="productionAuth">Production</span>
                </div>
                <div class ="EEAuth col">
                  <div>
                    <select id="EEAuth">
                      <option value="" selected disabled>Needs Approval...</option>
                    </select>
                  </div>
                  <span for="EEAuth">Equipment Engineering</span>
                </div>
                <div class = "PEAuth col">
                  <div>
                    <select id="PEAuth">
                      <option value="" selected disabled>Needs Approval...</option>
                    </select>
                  </div>
                  <span for="PEAuth">Process Engineering</span>
                </div>  
                <div class = "qaAuth col">
                  <div>
                    <select id="qaAuth">
                      <option value="" selected disabled>Needs Approval...</option>
                    </select> 
                  </div>
                  <span for="qaAuth">Quality Assurance</span>
                </div>
            </div>

            <div class="mt-5 mb-5 row">
              <div class = "col-4"></div>
              <div class = "othersAuth col">
                <div>
                  <select id="othersAuth">
                    <option value="" selected disabled>Needs Approval...</option>
                  </select> 
                </div>
                <span for="othersAuth">Others</span>
              </div>
              <div class = "col-4"></div>
            </div>
            <!-- REANALYSIS AND CLOSE QND BUTTON -->
            <div id = "approvalBtns" class="row mt-2">
              <a class = "col text-center" id="reProcess" ><img class="appBtnIcon" src="./images/svg/process.svg" alt="REPROCESS_ICON"><span class = "btnIconLbl">SUBMIT FOR REPROCESS</span></a>
              <a class = "col text-center" id="caseClosed" ><img class="appBtnIcon" src="./images/svg/check.svg" alt="CLOSED_QDN_ICON"><span class = "btnIconLbl">SAVE AS CLOSED QDN</span></a>
            </div>

          </div>

        </form>
      </div>  
    </div>
      

    <!-- UNCOMMENT TO TEST HOW FAST IS THE PAGE LOAD -->
    <!-- <script type="text/javascript">
             $(document).ready(function() {
                 console.log("Time until DOMready: ", Date.now()-timerStart);
             });
             $(window).load(function() {
                 console.log("Time until everything loaded: ", Date.now()-timerStart);
             });
      </script> -->

  </body>
</html>