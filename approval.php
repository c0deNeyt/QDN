<!DOCTYPE html>
<html lang="en" oncontextmenu="return false">
<!-- <html lang="en"> -->
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="QUALITY DEVIATION NOTICE System">
    <meta name="author" content="Christian Araña, and open source Contributors">
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
    <link type="text/css" href="./css/index.css" rel="stylesheet">
    <!------------------------------------------------------------------>
    <!-- JQUERY STYLESHEET -->
    <link rel="stylesheet" href="./js/jquery-ui-1.12.1/jquery-ui.css">
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
    <script defer src="./js/approvers.js"></script>
    <!------------------------------------------------------------------>
    <script defer src="./js/approversAuth.js"></script>
    <!------------------------------------------------------------------>
    <script src="./js/analysisFormValidation.js" defer></script>
    <!------------------------------------------------------------------>
    <script src="./js/sweetalert2.all.min.js" ></script>
    <!------------------------------------------------------------------>
    <!-- JQUERY UI -->
    <!------------------------------------------------------------------>
    <script src="https://smtpjs.com/v3/smtp.js"></script>
    <!------------------------------------------------------------------>
    <script src="./js/jquery-ui-1.12.1/external/jquery/jquery.js"></script>
    <!------------------------------------------------------------------>
    <script src="./js/jquery-ui-1.12.1/jquery-ui.js"></script>
    <script src="./js/j_ui/jquery-ui.js"></script>
    <!------------------------------------------------------------------>
    <script src="./js/jquery-ui-1.12.1/jquery-ui.min.js"></script>
    <!------------------------------------------------------------------>
    <style>
      *{
        margin: 0;
        padding: 0;
      }
      body *{
        /* outline: 1px solid grey; */
        margin: 0;
        font-family: "Lato", sans-serif;
      }

      .overflow {
        height: 200px;
      }

      /*==============================================================
                              "SIDE BAR STYLE"
      ================================================================*/
      .sidebar {
        background-image: linear-gradient(to bottom, #dbf900, #dbfb48, #dcfc6a, #defd88, #e1fda2);
        margin: 0;
        padding: 0;
        width: 200px;
        background-color: #f1f1f1;
        position: fixed;
        height: 100%;
        overflow: auto;
      }
        .sidebar a {
          display: block;
          color: black;
          padding: 20px;
          text-decoration: none;
        }

          .sidebar a:hover:not(.active) {
            color: rgb(0, 0, 0);
            position: sticky;
            transform: scale(1.19);/* (120% zoom) */
            z-index:99;
          }
          .sidebar img, svg {
            vertical-align: middle;
            width: 40px;
            margin: 10px;
        }

      /*======================================
        "SYSTEM TITTLE STYLE INSIDE SIDEBAR"
      ========================================*/
      .sysName{
        display: block;
        text-align: center;
        border: 5px;
        border-bottom: 2px solid #00000030;
        margin-bottom: 15px;
      }
        .sysName img{
          width: 8rem;
          border-radius: 3px;
        }

      /*==============================================================
                        "MAIN CONTENT STYLE"
      ================================================================*/
      div.content {
        margin-left: 200px;
        padding: 1px 16px;
        height: 100vh;
      
      }
        .card{
          padding: 20px;
          margin: 20px auto;
          background-color: #ffffffeb;
        }
        h4.mb-4 {
          color: #8c7000;
          font-weight: bold;
          width: 23rem;
          padding: 4px;
        }

        fieldset.issueDetails {
          border: 0.1px solid gray;
          padding: 22px;
          margin: 0px 0px 38px 0px;
          box-shadow: 1px 5px 9px 0px gray;
        }
        .fromdbResutl {
          font-weight: bold;
          color: #212529;
        }
      
        .form-check-label {
          margin: 0px 0px 0px 1rem;
        }
        span.invalid {
          padding: 20px;
          color: red;
        }
        .telfordRed{
          color:  #800000;
        }
        
        #productionAuth-button, #EEAuth-button, #PEAuth-button, #qaAuth-button,  #othersAuth-button {
          border-top: none;
          background-color: #fff0;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid black;
          border-radius: 0;
        }
        .ui-selectmenu-text {
            padding: 0 0 0 2rem;
        }
          [for="productionAuth"] {
            padding: .3rem 0 0 4.1rem;
            display: inline-block;
            font-weight: bold;
          }

          [for="EEAuth"] {
            padding: .3rem 0 0 1.5rem;
            display: inline-block;
            font-weight: bold;
          }

          [for="PEAuth"] {
            padding: .3rem 0 0 1.5rem;
            display: inline-block;
            font-weight: bold;
          }

          [for="qaAuth"] {
            padding: .3rem 0 0 1.5rem;
            display: inline-block;
            font-weight: bold;
          }
          [for="othersAuth"] {
            padding: .3rem 0 0 5.5rem;
            display: inline-block;
            font-weight: bold;
          }
          a.col {
              text-decoration: none;
          }
          .appBtnIcon {
            width: 4rem;
            margin-left: 2.5rem;
          }
          .btnIconLbl {
            display: block;
            color: black;
            font-weight: bold;
            padding: .5rem 0 0 0;
            margin: 0 0 0 2rem;
          }
          #approvalBtns a:hover:not(.active) {
              color: rgb(0, 0, 0);
              position: sticky;
              transform: scale(1.1);
              z-index: 99;
          }



      /* FOR SWEET ALERT */
      .colored-toast.swal2-icon-success {
        background-color: #a5dc86 !important;
      }

      .colored-toast.swal2-icon-error {
        background-color: #f27474 !important;
      }

      .colored-toast.swal2-icon-warning {
        background-color: #f8bb86 !important;
      }

      .colored-toast.swal2-icon-info {
        background-color: #3fc3ee !important;
      }

      .colored-toast.swal2-icon-question {
        background-color: #87adbd !important;
      }

      .colored-toast .swal2-title {
        color: white;
      }

      .colored-toast .swal2-close {
        color: white; 
      }

      .colored-toast .swal2-content {
        color: white;
      }



      /*==============================================================
                          "RESPONSIVE STYLE"
      ================================================================*/

      @media screen and (max-width: 700px) {
        div.content {
        margin-left: 200px;
        padding: 64px 16px;
        height: 100vh;
      
      }
      /*======================
        "NAME INCLUDING LOGO"
      ========================*/
        .sysName{
          display: inline-block;
          text-align: center;
          width: 11rem;
          vertical-align: top;
          margin: 3px 0px 0px -6px;
          border-bottom: none;
          border-right: 2px solid #00000030;
        }
      /*====================
        "TOP NAV BAR"
      ======================*/
        .sidebar {
          width: 100%;
          height: 80px;
          z-index: 99;
          display: block;
          overflow: unset;
        }
          .sidebar a {
            display: inline-block;
            font-size: 0;
            line-height: 0;
            color: transparent;
            padding: 0;
            margin: 0.7rem 0.5rem 0.7rem 0.5rem;
            
          }
          .sidebar a img {
            vertical-align: middle;
            width: 41px;
            margin: 0px 7px;
          }
        div.content {margin-left: 0;}
      }

      @media screen and (max-width: 400px) {
      /*======================
        "NAME INCLUDING LOGO"
      ========================*/
        .sysName {
          width: 6rem;
          font-size: 20px;
        }
          .sysName img{
            width: 5rem;
            border-radius: 1px;
          }
          .sysName h4 {
            font-size: 17px;
            padding: 0px;
            margin: -7px;
          }
      /*====================
        "TOP NAV BAR"
      ======================*/
        .sidebar {
          width: 100%;
          height: 70px;
          z-index: 99;
          display: inline;
          overflow: scroll; /*WHEN SCREEN DROPS < 240PX*/
        }
          .sidebar a {
            display: inline-block;
            font-size: 0;
            line-height: 0;
            color: transparent;
            padding: 0;
            margin: 0.7rem 0.5rem 0.7rem 0.5rem;
          }
          .sidebar a img {
            vertical-align: middle;
            width: 30px;
            margin: 6px 5px;
          }
        h4.mb-4 {
        width: 19rem;
        overflow: scroll;

        }
      }

    </style>
  </head>
  <body oncontextmenu="return false">
    <div class="sidebar">
      <div class="sysName">
        <img src="./images/TELFORDmd.jpg" alt="TELFORD_LOGO">
        <h4>QDN SYSTEM</h4>
      </div>
      <a href="issuance.php"><img src="./images/svg/003-data gathering.svg"></img>Issuance</a>
      <a href="analysis.php"><img src="./images/svg/009-data research.svg"></img>Analysis</a>
    </div>
      
    <div class="content">
      <div class="card mb-10">
        <form class="needs-validation" novalidate>
          <h4 class="mb-4">Approval Section</h4>
          <div class="row col-md-12 mb-3">
            <div class="errorSpan col-sm-4">
              <label for="qdnNumber" class="form-label">QDN #:</label>
              <input type="text" class="form-control" id="qdnNumber" required>
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
                <span class="fromdbResutl" id="rooCause"></span>
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
                <tbody id="tblBodyContId">
                  <tr id="containmentRow">
                    <td id = "containmentCol">Empty!</td>
                    <td id = "containmentRespCol">Empty!</td>
                    <td id = "containmentWhenCol">Empty!</td>
                    <td id = "containmentStatCol">Empty!</td>
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
                <tbody id="tblBodyCorrId">
                  <tr id = "correctionTblRow">
                    <td id = "correctionTblCol">Empty!</td>
                    <td id = "correctionTblRespCol">Empty!</td>
                    <td id = "correctionTblWhenCol">Empty!</td>
                    <td id = "correctionTblStatCol">Empty!</td>
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
                <tbody id="tblBodyCorrtvId">
                <tr id = "correctiveTblRow">
                    <td id = "correctiveTblCol">Empty!</td>
                    <td id = "correctiveTblRespCol">Empty!</td>
                    <td id = "correctiveTblWhenCol">Empty!</td>
                    <td id = "correctiveTblStatCol">Empty!</td>
                  </tr>
                </tbody>
                <!-- END OF TABLE -->
              </table>
              <!-- END OF TABLE DIVISION -->
            </div>
            <!-- END OF FIELDSET  -->
          </fieldset>

          <div class="row ">
              <div id="approvalDiv" class = "approvalDiv col">
                <div>
                  <select id="productionAuth" class="">
                    <option value="" selected disabled>Needs Approval...</option>
                  </select>
                </div>
                <span for="productionAuth">Production</span>
              </div>

              <div class = "EEAuth col">
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

          <div id = "approvalBtns" class="row mt-2">
            <a class = "col text-center" id="reProcess" ><img class="appBtnIcon" src="./images/svg/process.svg" alt="REPROCESS_ICON"><span class = "btnIconLbl">SUBMIT FOR REPROCESS</span></a>
            <a class = "col text-center" id="caseClosed" ><img class="appBtnIcon" src="./images/svg/check.svg" alt="CLOSED_QDN_ICON"><span class = "btnIconLbl">SAVE AS CLOSED QDN</span></a>
          </div>
        </form>
      </div>  
    </div>
  
  </body>
</html>