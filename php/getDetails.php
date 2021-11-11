<?php

//DATABASE CONNECTION
require("./cnfg.php");

 // FOR AJAX REQUEST' S
$request = $_POST['request'];  

switch ($request) {
    //=========================================
    //  FOR QDN NUMBER
    //===========================================
    case 1:
        $qdnNoReq = $_POST['qdnNoReq'];
        // SQL QUERY DATA REQUEST THAT IS MATCHED TO STORED QDN# AT DB 
        // "qdnNOReq" --> CAME FROM AJAX REQUEST OF issuance.js
        $dataRequest = "SELECT  
                            `analysis_tbl`.`qdnNo`
                        FROM 
                            `telford_db`.`analysis_tbl`
                        WHERE  
                            `analysis_tbl`.`qdnNo`
                        LIKE 
                            '%$qdnNoReq%' 
                        ORDER BY
                            `analysis_tbl`.`id`
                        DESC LIMIT 1";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase ->execute();
        // FETCHED DATA FROM DATABASE
        while($row =$dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $qdnNo       = $row['qdnNo'];
            // STORING DATA TO AN ARRAY
            $data[] = array("qdnNo" => $qdnNo);
        }
        // ENCODING ARRAY TO JSON FORMAT
        if ($data){
            echo json_encode($data);
        };
    break;
    //=========================================
    //  FOR AUTOCOMPLETE MACHINES SUGGESTIONS
    //===========================================
    case 2: 
        $machineList = $_POST["machineList"];
        $dataRequest = "SELECT machines, package_type FROM tspi_machines WHERE machines LIKE '%$machineList%' LIMIT 6";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();
        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $machines = $row['machines'];
            $pkg_type = $row['package_type'];

            $data[] = array("machines" => $machines, "package_type" => $pkg_type);
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    //==========================================
    //  FOR EMPLOYEE AUTOCOMPLETE
    //===========================================
    case 3:
        $employeeId = $_POST['employeeId'];
        // SQL QUERY DATA REQUEST THAT IS MATCHED TO USER INPUT STORED IN "employeeId"
        // "employeeId" --> CAME FROM AJAX REQUEST OF issuance.js
        $dataRequest = "SELECT * FROM emp_masterlist WHERE EMP_NO = '$employeeId'";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase ->execute();
        
        // FETCHED DATA FROM DATABASE
        while($row =$dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $nameDbResult       = $row['EMP_NAME'];
            $teamDbResult       = $row['TEAM'];
            $departmentDbResult = $row['DEPARTMENT'];
            $stationDbResult    = $row['STATION'];
            $plDbResult         = $row['PRODUCT_LINE'];

            // STORING DATA TO AN ARRAY
            $empData[] = array("EMP_NAME" => $nameDbResult, "TEAM" => $teamDbResult, "DEPARTMENT" => $departmentDbResult,"STATION" => $stationDbResult, "PRODUCT_LINE" => $plDbResult);
        }
        // ENCODING ARRAY TO JSON FORMAT
        if ( $empData ){
            echo json_encode($empData);
        };
    break;
    //=========================================
    //  FOR PACKAGE TYPE AUTOCOMPLETE SELECTION
    //===========================================
    case 4:
        $machineList = $_POST["machineList"];
        $dataRequest = "SELECT package_type FROM tspi_machines WHERE machines = '$machineList'";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $pkg_type = $row['package_type'];

            $data[] = array("package_type" => $pkg_type);
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    //=========================================
    //  FOR AUTOCOMPLETE PART NAME SUGGESTIONS 
    //===========================================
    case 5:
        $thisPartName = $_POST["thisPartName"];
        $dataRequest = "SELECT * FROM part_names WHERE names LIKE '%$thisPartName%' LIMIT 6";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $names = $row['names'];
            $lead_count = $row['lead_counts'];

            $data[] = array("names" => $names, "lead_counts" => $lead_count);
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    //=========================================
    //  FOR AUTOCOMPLETE PART NAME SELECTION
    //===========================================
    case 6:
        $matchedPartName = $_POST["matchedPartName"];
        $dataRequest = "SELECT names, lead_counts FROM part_names WHERE names = '$matchedPartName'";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $lead_counts = $row['lead_counts'];

            $data[] = array("lead_counts" => $lead_counts);
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    //=========================================
    //  FOR  ANALYSIS AUTOCOMPLETE   
    //===========================================
    case 7:
        $dataRequest = "SELECT * 
                        FROM `analysis_tbl`
                        WHERE `status` = 0
                        ORDER BY `id` DESC
                        LIMIT 1";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $id      = $row['id'];
            $qdnNo   = $row['qdnNo'];
            $status  = $row['status'];
            $issuedTo  = $row['issuedTo'];

            $data[] = array("id" => $id, "qdnNo" => $qdnNo, "status" => $status, "issuedTo" => $issuedTo);
        }
        if ( $data ){
            echo json_encode($data);
        }
        else{
            echo "ERROR FETCHING DATA!";
        };
    break;
    case 7.1:
        $searchForThisQdnNo = $_POST["searchForThisQdnNo"];
        $status = $_POST["status"];
        $dataRequest = "SELECT 
                            `analysis_tbl`.`id`, 
                            `analysis_tbl`.`qdnNo`
                        FROM 
                            `telford_db`.`analysis_tbl`
                        WHERE
                            `analysis_tbl`.`qdnNo`
                        LIKE 
                            '%$searchForThisQdnNo%'
                        AND 
                            `analysis_tbl`.`status` = $status
                        ORDER BY 
                            `analysis_tbl`.`id` DESC
                         LIMIT 5";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $id      = $row['id'];
            $qdnNo   = $row['qdnNo'];

            $data[] = array("id" => $id, "qdnNo" => $qdnNo);
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    case 7.2:
        $searchForThisQdnNo = $_POST["searchForThisQdnNo"];
        $dataRequest = "SELECT `id`, 
                                `qdnNo`
                        FROM `analysis_tbl`
                        WHERE `qdnNo` = '$searchForThisQdnNo'
                        AND `status` = 0";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $id      = $row['id'];
            $qdnNo   = $row['qdnNo'];

            $data[] = array("id" => $id, "qdnNo" => $qdnNo);
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    //=========================================
    //  FOR AUTOCOMPLETE ANALYSIS SELECTION 
    //===========================================
    case 8:
        $matchedQdnNum = $_POST["matchedQdnNum"];
        $dataRequest = "SELECT * FROM 
                            `telford_db`.`analysis_tbl`
                        WHERE
                            `analysis_tbl`.`qdnNo` = '$matchedQdnNum'  
                        AND
                            `analysis_tbl`.`status` = 0";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $id                     = $row['id'];
            $qdnNo                  = $row['qdnNo'];
            $issuedByName           = $row['issuedByName'];
            $issuedByTeam           = $row['issuedByTeam'];
            $issuedToName           = $row['issuedToName'];
            $issuedToTeam           = $row['issuedToTeam'];
            $customer               = $row['customer'];
            $machine                = $row['machine'];
            $packageType            = $row['packageType'];
            $deviceName             = $row['deviceName'];
            $station                = $row['station'];
            $lotId                  = $row['lotId'];
            $teamResp               = $row['teamResp'];
            $dateTime               = $row['dateTime'];
            $classification         = $row['classification'];
            $defects                = $row['defects'];
            $failure_mode           = $row['failure_mode'];
            $disposition            = $row['disposition'];
            $cause_of_defects       = $row['cause_of_defects'];
            $cause_of_defects_des   = $row['cause_of_defects_des'];
            $status                 = $row['status'];

            $data[] = array("qdnNo" => $qdnNo, "issuedByName" => $issuedByName,
                "issuedByTeam" => $issuedByTeam, "issuedToName" => $issuedToName,
                "issuedToTeam" => $issuedToTeam, "dateTime" => $dateTime,
                "customer" => $customer, "station" => $station,
                "teamResp" => $teamResp, "machine" => $machine, 
                "packageType" => $packageType,"deviceName" => $deviceName, 
                "lotId" => $lotId, "classification" => $classification,
                "defects" => $defects, "failure_mode" => $failure_mode,
                "disposition" => $disposition, "cause_of_defects" => $cause_of_defects, 
                "cause_of_defects_des" => $cause_of_defects_des, "qdnId" => $id     
            );
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    //=========================================
    //  FOR AUTOCOMPLETE ANALYSIS SELECTION 
    //===========================================
    case 8.1:
        $matchedQdnNum = $_POST["matchedQdnNum"];
        $dataRequest = "SELECT `analysis_tbl`.`status` FROM `telford_db`.`analysis_tbl` WHERE `analysis_tbl`.`qdnNo` = '$matchedQdnNum' ";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $status                 = $row['status'];
            $data[] = array("status" => $status);
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    case 8.2:
        $dataRequest = "SELECT * FROM 
                            `telford_db`.`analysis_tbl`
                        WHERE `analysis_tbl`.`status` = 0
                        ORDER BY `analysis_tbl`.`id` DESC
                        LIMIT 1";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase ->execute();
        while($row =$dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $id                     = $row['id'];
            $qdnNo                  = $row['qdnNo'];
            $issuedByName           = $row['issuedByName'];
            $issuedByTeam           = $row['issuedByTeam'];
            $issuedToName           = $row['issuedToName'];
            $issuedToTeam           = $row['issuedToTeam'];
            $customer               = $row['customer'];
            $packageType            = $row['packageType'];
            $machine                = $row['machine'];
            $deviceName             = $row['deviceName'];
            $station                = $row['station'];
            $lotId                  = $row['lotId'];
            $teamResp               = $row['teamResp'];
            $dateTime               = $row['dateTime'];
            $classification         = $row['classification'];
            $defects                = $row['defects'];
            $failure_mode           = $row['failure_mode'];
            $disposition            = $row['disposition'];
            $cause_of_defects       = $row['cause_of_defects'];
            $cause_of_defects_des   = $row['cause_of_defects_des'];
            $prod_auth_col          = $row['prod_auth_col'];
            $ee_auth_col            = $row['ee_auth_col'];
            $pe_auth_col            = $row['pe_auth_col'];
            $qa_auth_col            = $row['qa_auth_col'];
            $others_auth_col        = $row['others_auth_col'];
            // STORING DATA TO AN ARRAY
            $qndNoData[] = array("qdnNo" => $qdnNo, "issuedByName" => $issuedByName,
                "issuedByTeam" => $issuedByTeam, "issuedToName" => $issuedToName,
                "issuedToTeam" => $issuedToTeam, "dateTime" => $dateTime,
                "customer" => $customer, "station" => $station,
                "teamResp" => $teamResp, "machine" => $machine, 
                "packageType" => $packageType,"deviceName" => $deviceName, 
                "lotId" => $lotId, "classification" => $classification,
                "defects" => $defects, "failure_mode" => $failure_mode,
                "disposition" => $disposition, "cause_of_defects" => $cause_of_defects, 
                "cause_of_defects_des" => $cause_of_defects_des, "qdnId" => $id     
            );
        }
        // ENCODING ARRAY TO JSON FORMAT
        if ( $qndNoData ){
            echo json_encode($qndNoData);
        };
    break;
    //========================================
    //  FOR CHECKING IF THERE IS A REASSIGNMENT 
    //  FOR THE QDN   
    //===========================================
    case 9:
        $matchedReAss = $_POST["matchedReAss"];
        $dataRequest = "SELECT `analysis_tbl`.`id`,
                            `analysis_tbl`.`issuedByName`,
                            `reassignments_tbl`.`reAssignedName`,
                            `reassignments_tbl`.`reAssignedTeam`,
                            `reassignments_tbl`.`reAssignDescription`,
                            `reassignments_tbl`.`analysis_tbl_id`
                            FROM 
                                `telford_db`.`analysis_tbl`
                            INNER JOIN 
                                    `telford_db`.`reassignments_tbl`
                                ON 
                                    `analysis_tbl`.`id` = `reassignments_tbl`.`analysis_tbl_id`
                                WHERE 
                                    `analysis_tbl`.`id` = '$matchedReAss'
                                AND 
                                    `reassignments_tbl`.`analysis_tbl_id` = '$matchedReAss'";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $issuedByName         = $row['issuedByName'];
            $reAssignedName         = $row['reAssignedName'];
            $reAssignedTeam         = $row['reAssignedTeam'];
            $reAssignDescription    = $row['reAssignDescription'];
            $analysis_tbl_id        = $row['analysis_tbl_id'];


            $data[] = array("issuedByName" => $issuedByName,
                            "reAssignedName" => $reAssignedName,
                            "reAssignedTeam" => $reAssignedTeam,
                            "reAssignDescription" => $reAssignDescription,
                            "analysis_tbl_id" => $analysis_tbl_id
            );
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    //**THIS OUT QDNNo, empNo, empName and product
    //line if there is reassignment
    case 9.1:
        $qdnNUmber = $_POST['qdnNumber'];
        $dataRequest = "SELECT `analysis_tbl`.`qdnNo`,
                            `emp_masterlist`.`EMP_NO`,
                            `reassignments_tbl`.`reAssignedName`,
                            `emp_masterlist`.`PRODUCT_LINE`
                        FROM 
                            `telford_db`.`analysis_tbl`
                        INNER JOIN 
                                `telford_db`.`reassignments_tbl`
                            ON 
                                `analysis_tbl`.`id` = `reassignments_tbl`.`analysis_tbl_id`
                        INNER JOIN
                            `telford_db`.`emp_masterlist`
                        ON
                            `emp_masterlist`.`EMP_NO` = `reassignments_tbl`.`reAssignedTo`
                        WHERE 
                            `analysis_tbl`.`qdnNo` = '$qdnNUmber'
                        ORDER BY `reassignments_tbl`.`id` DESC LIMIT 1";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $qdnNumber         = $row['qdnNo'];
            $empNubmer         = $row['EMP_NO'];
            $empName         = $row['reAssignedName'];
            $empProductLine    = $row['PRODUCT_LINE'];


            $data[] = array("qndNumber" => $qdnNumber,
                            "empNo" => $empNubmer,
                            "name" => $empName,
                            "pl" => $empProductLine
            );
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    //**THIS OUT QDNNo, empNo, empName and product
    //line if reassignment is null
    case 9.2:
        $qdnNUmber = $_POST['qdnNumber'];
        $dataRequest = "SELECT
                            `analysis_tbl`.`qdnNo`,
                            `emp_masterlist`.`EMP_NO`,
                            `emp_masterlist`.`EMP_NAME`,
                            `emp_masterlist`.`PRODUCT_LINE`
                        FROM 
                            `telford_db`.`analysis_tbl`
                        INNER JOIN
                            `telford_db`.`emp_masterlist`
                        ON
                            `analysis_tbl`.`issuedTo` = `emp_masterlist`.`EMP_NO`
                        WHERE  `analysis_tbl`.`qdnNo` = '$qdnNUmber'";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $qdnNumber         = $row['qdnNo'];
            $empNumber         = $row['EMP_NO'];
            $empName         = $row['EMP_NAME'];
            $empProductLine    = $row['PRODUCT_LINE'];

            $data[] = array("qndNumber" => $qdnNumber,
                            "empNo" => $empNumber,
                            "name" => $empName,
                            "pl" => $empProductLine
            );
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    //========================================
    //  FOR CHECKING IF THERE IS A CONTAINMENT 
    //  FOR THE QDN   
    //===========================================
    case 10:
        $matchedContainment = $_POST["matchedContainment"];
        $dataRequest = "SELECT `containments`.`id`,
                            `containments`.`actions`,
                            `containments`.`responsible`,
                            `containments`.`when`,
                            `containments`.`status`,
                            `containments`.`analysis_tbl_id`
                            FROM 
                                `telford_db`.`analysis_tbl`
                            INNER JOIN 
                                `telford_db`.`containments`
                                ON 
                                    `analysis_tbl`.`id` =   `containments`.`analysis_tbl_id`
                                WHERE 
                                    `analysis_tbl`.`id` = $matchedContainment
                                AND 
                                    `containments`.`analysis_tbl_id` = $matchedContainment ";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $id             = $row['id'];
            $actions        = $row['actions'];
            $responsible    = $row['responsible'];
            $when           = $row['when'];
            $status         = $row['status'];
            $containmentId  = $row['analysis_tbl_id'];

            $data[] = array("id" => $id,
                            "actions" => $actions,
                            "responsible" => $responsible,
                            "when" => $when,
                            "status" => $status,
                            "analysis_tbl_id" => $containmentId 
            );
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    //========================================
    //  FOR CHECKING IF THERE IS A CORRECTION 
    //  FOR THE QDN   
    //===========================================
    case 11:
        $matchedCorrection = $_POST["matchedCorrection"];
        $dataRequest = "SELECT `corrections`.`id`,
                            `corrections`.`actions`,
                            `corrections`.`responsible`,
                            `corrections`.`when`,
                            `corrections`.`status`,
                            `corrections`.`analysis_tbl_id`
                            FROM 
                                `telford_db`.`analysis_tbl`
                            INNER JOIN 
                                `telford_db`.`corrections`
                                ON 
                                    `analysis_tbl`.`id` =   `corrections`.`analysis_tbl_id`
                                WHERE 
                                    `analysis_tbl`.`id` =  $matchedCorrection
                                AND 
                                    `corrections`.`analysis_tbl_id` =  $matchedCorrection";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $id             = $row['id'];
            $actions        = $row['actions'];
            $responsible    = $row['responsible'];
            $when           = $row['when'];
            $status         = $row['status'];
            $correctionId  = $row['analysis_tbl_id'];

            $data[] = array("id" => $id,
                            "actions" => $actions,
                            "responsible" => $responsible,
                            "when" => $when,
                            "status" => $status,
                            "analysis_tbl_id" => $correctionId 
            );
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    //===========================================
    //  FOR CHECKING IF THERE IS A CORRECTIVE 
    //  FOR THE QDN   
    //===========================================
    case 12:
        $matchedCorrective = $_POST["matchedCorrective"];
        $dataRequest = "SELECT `correctives`.`id`,
                            `correctives`.`actions`,
                            `correctives`.`responsible`,
                            `correctives`.`when`,
                            `correctives`.`status`,
                            `correctives`.`analysis_tbl_id`
                        FROM 
                            `telford_db`.`analysis_tbl`
                        INNER JOIN 
                            `telford_db`.`correctives`
                            ON 
                                `analysis_tbl`.`id` =   `correctives`.`analysis_tbl_id`
                            WHERE 
                                `analysis_tbl`.`id` = $matchedCorrective 
                            AND 
                                `correctives`.`analysis_tbl_id` = $matchedCorrective";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $id             = $row['id'];
            $actions        = $row['actions'];
            $responsible    = $row['responsible'];
            $when           = $row['when'];
            $status         = $row['status'];
            $correctionId  = $row['analysis_tbl_id'];

            $data[] = array("id" => $id,
                            "actions" => $actions,
                            "responsible" => $responsible,
                            "when" => $when,
                            "status" => $status,
                            "analysis_tbl_id" => $correctionId 
            );
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    //===========================================
    //  FOR EMAIL RECEIVER    
    //===========================================
    case 13:
        $issuedToEmpNo = $_POST["issuedToEmpNo"];
        $dataRequest = "SELECT 
                            `emp_masterlist`.`EMP_NAME`,
                            `emails`.`emailscol`
                            FROM 
                                `telford_db`.`emp_masterlist`
                            INNER JOIN 
                                `telford_db`.`emp_has_emails`
                            ON 
                                `emp_masterlist`.`EMP_NO` = `emp_has_emails`.`emp_masterlist_EMP_NO`
                            INNER JOIN 
                                `telford_db`.`emails`
                            ON 
                                `emp_has_emails`.`emails_id` = `emails`.`id`
                            WHERE 
                                `EMP_NO` =  $issuedToEmpNo ";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $EMP_NAME   = $row['EMP_NAME'];
            $emailscol  = $row['emailscol'];
            
            $data[] = array("EMP_NAME" => $EMP_NAME,
                            "emailscol" => $emailscol
            );
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    //===========================================
    //  FOR APPROVER LIST    
    //===========================================
    // PROD AUTH
    case 14:
        $dataRequest = "SELECT 
                            `emp_masterlist`.`EMP_NAME`,
                            `emp_masterlist`.`EMP_NO`,
                            `emails`.`emailscol`
                        FROM 
                            `telford_db`.`auth_prod`
                        INNER JOIN 
                            `telford_db`.`approvers`
                        ON 
                            `auth_prod`.`approvers_id` = `approvers`.`id`
                        INNER JOIN
                            `telford_db`.`emails`
                        ON
                            `approvers`.`emails_id` = `emails`.`id`
                        INNER JOIN
                            `telford_db`.`emp_masterlist`
                        ON 
                            `approvers`.`EMP_NO` = `emp_masterlist`.`EMP_NO`";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $approversId   = $row['EMP_NO'];
            $EMP_NAME   = $row['EMP_NAME'];
            $emailscol  = $row['emailscol'];
            
            $data[] = array("id" =>   $approversId, "EMP_NAME" => $EMP_NAME,
                            "emailscol" => $emailscol
            );
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    // EE AUTH
    case 14.1:
        $dataRequest = "SELECT 
                            `emp_masterlist`.`EMP_NAME`,
                            `emp_masterlist`.`EMP_NO`,
                            `emails`.`emailscol`
                        FROM 
                            `telford_db`.`auth_ee`
                        INNER JOIN 
                            `telford_db`.`approvers`
                        ON 
                            `auth_ee`.`approvers_id` = `approvers`.`id`
                        INNER JOIN
                            `telford_db`.`emails`
                        ON
                            `approvers`.`emails_id` = `emails`.`id`
                        INNER JOIN
                            `telford_db`.`emp_masterlist`
                        ON 
                            `approvers`.`EMP_NO` = `emp_masterlist`.`EMP_NO`";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $approversId   = $row['EMP_NO'];
            $EMP_NAME   = $row['EMP_NAME'];
            $emailscol  = $row['emailscol'];
            
            $data[] = array("id" =>   $approversId, "EMP_NAME" => $EMP_NAME,
                            "emailscol" => $emailscol
            );
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    // PE AUTH
    case 14.2:
        $dataRequest = "SELECT 
                            `emp_masterlist`.`EMP_NAME`,
                            `emp_masterlist`.`EMP_NO`,
                            `emails`.`emailscol`
                        FROM 
                            `telford_db`.`auth_pe`
                        INNER JOIN 
                            `telford_db`.`approvers`
                        ON 
                            `auth_pe`.`approvers_id` = `approvers`.`id`
                        INNER JOIN
                            `telford_db`.`emails`
                        ON
                            `approvers`.`emails_id` = `emails`.`id`
                        INNER JOIN
                            `telford_db`.`emp_masterlist`
                        ON 
                            `approvers`.`EMP_NO` = `emp_masterlist`.`EMP_NO`";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $approversId   = $row['EMP_NO'];
            $EMP_NAME   = $row['EMP_NAME'];
            $emailscol  = $row['emailscol'];
            
            $data[] = array("id" =>   $approversId, "EMP_NAME" => $EMP_NAME,
                            "emailscol" => $emailscol
            );
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    // QA AUTH
    case 14.3:
        $dataRequest = "SELECT 
                            `emp_masterlist`.`EMP_NAME`,
                            `emp_masterlist`.`EMP_NO`,
                            `emails`.`emailscol`
                        FROM 
                            `telford_db`.`auth_qa`
                        INNER JOIN 
                            `telford_db`.`approvers`
                        ON 
                            `auth_qa`.`approvers_id` = `approvers`.`id`
                        INNER JOIN
                            `telford_db`.`emails`
                        ON
                            `approvers`.`emails_id` = `emails`.`id`
                        INNER JOIN
                            `telford_db`.`emp_masterlist`
                        ON 
                            `approvers`.`EMP_NO` = `emp_masterlist`.`EMP_NO`";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $approversId   = $row['EMP_NO'];
            $EMP_NAME   = $row['EMP_NAME'];
            $emailscol  = $row['emailscol'];
            
            $data[] = array("id" =>   $approversId, "EMP_NAME" => $EMP_NAME,
                            "emailscol" => $emailscol
            );
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    // OTHERS AUTH
    case 14.4:
        $dataRequest = "SELECT 
                            `emp_masterlist`.`EMP_NAME`,
                            `emp_masterlist`.`EMP_NO`,
                            `emails`.`emailscol`
                        FROM 
                            `telford_db`.`auth_others`
                        INNER JOIN 
                            `telford_db`.`approvers`
                        ON 
                            `auth_others`.`approvers_id` = `approvers`.`id`
                        INNER JOIN
                            `telford_db`.`emails`
                        ON
                            `approvers`.`emails_id` = `emails`.`id`
                        INNER JOIN
                            `telford_db`.`emp_masterlist`
                        ON 
                            `approvers`.`EMP_NO` = `emp_masterlist`.`EMP_NO`";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $approversId   = $row['EMP_NO'];
            $EMP_NAME   = $row['EMP_NAME'];
            $emailscol  = $row['emailscol'];
            
            $data[] = array("id" =>   $approversId, "EMP_NAME" => $EMP_NAME,
                            "emailscol" => $emailscol
            );
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    //===========================================
    //  FOR APPROVER LIST AUTHENTICATION REQUEST
    //===========================================
    case 15:        
        $userPassInput  = $_POST['userPassInput'];
        $empId          = $_POST['empId'];

        $dataRequest = "SELECT 
                            `emp_masterlist`.`EMP_NAME`,
                            `emails`.`emailscol`,
                            `approvers`.`id`,
                            `approvers`.`password`
                        FROM 
                            `telford_db`.`emp_masterlist`
                        INNER JOIN 
                            `telford_db`.`approvers`
                        ON 
                            `emp_masterlist`.`EMP_NO` = `approvers`.`EMP_NO`
                        INNER JOIN 
                            `telford_db`.`emails`
                        ON 
                            `approvers`.`emails_id` = `emails`.`id` 
                        WHERE `emp_masterlist`.`EMP_NO` =  $empId";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            
            $hashed_password = $row['password'];    
            if(password_verify($userPassInput, $hashed_password)) {
                $approversId   = $row['id'];
                $EMP_NAME   = $row['EMP_NAME'];
                $data[] = array("id" =>   $approversId, "EMP_NAME" => $EMP_NAME
                );
                echo json_encode($data);
            } 
        }
    break;
    //===========================================
    // UPDATE REQUEST FOR STATUS 
    //===========================================
    case 16:
        $status     = $_POST['status'];
        $qndNumber  = $_POST['qndNumber'];
        $Insert = "UPDATE `analysis_tbl`
                SET
                `status` = ?
                WHERE `qdnNo` = ?"; 
        $stmtinsert = $db->prepare($Insert);
        $result = $stmtinsert->execute([$status, $qndNumber]);
        if ($result){
            echo "Insert SUCCESS!";
        }
    break;
    //===========================================
    // PROD, EE, PE, AND QA AUTH DETAILS
    //===========================================
    case 17:
        $dataRequest = "SELECT 
                            `EMP_NAME`,
                            `emailscol`
                            FROM 
                            `telford_db`.`approvers`
                            INNER JOIN 
                                `telford_db`.`auth_prod`
                            ON 
                                `auth_prod`.`approvers_id` = `approvers`.`id`
                            INNER JOIN
                                `telford_db`.`emails`
                            ON
                                `approvers`.`emails_id` = `emails`.`id`
                            INNER JOIN
                                `telford_db`.`emp_masterlist`
                            ON 
                                `approvers`.`EMP_NO` = `emp_masterlist`.`EMP_NO`
                        UNION
                        SELECT 
                            `EMP_NAME`,
                            `emailscol`
                            FROM 
                            `telford_db`.`approvers`
                            INNER JOIN 
                                `telford_db`.`auth_ee`
                            ON 
                                `auth_ee`.`approvers_id` = `approvers`.`id`
                            INNER JOIN
                                `telford_db`.`emails`
                            ON
                                `approvers`.`emails_id` = `emails`.`id`
                            INNER JOIN
                                `telford_db`.`emp_masterlist`
                            ON 
                                `approvers`.`EMP_NO` = `emp_masterlist`.`EMP_NO`
                        UNION
                        SELECT 
                            `EMP_NAME`,
                            `emailscol`
                            FROM 
                            `telford_db`.`approvers`
                            INNER JOIN 
                                `telford_db`.`auth_pe`
                            ON 
                                `auth_pe`.`approvers_id` = `approvers`.`id`
                            INNER JOIN
                                `telford_db`.`emails`
                            ON
                                `approvers`.`emails_id` = `emails`.`id`
                            INNER JOIN
                                `telford_db`.`emp_masterlist`
                            ON 
                                `approvers`.`EMP_NO` = `emp_masterlist`.`EMP_NO`
                        UNION
                        SELECT 
                            `EMP_NAME`,
                            `emailscol`
                            FROM 
                            `telford_db`.`approvers`
                            INNER JOIN 
                                `telford_db`.`auth_qa`
                            ON 
                                `auth_qa`.`approvers_id` = `approvers`.`id`
                            INNER JOIN
                                `telford_db`.`emails`
                            ON
                                `approvers`.`emails_id` = `emails`.`id`
                            INNER JOIN
                                `telford_db`.`emp_masterlist`
                            ON 
                                `approvers`.`EMP_NO` = `emp_masterlist`.`EMP_NO`";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
                $empName   = $row['EMP_NAME'];
                $email   = $row['emailscol'];
                $data[] = array("EMP_NAME" => $empName, "emailscol" =>  $email);
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    case 17.1:
        $dataRequest = "SELECT 
                            `EMP_NAME`,
                            `emailscol`
                            FROM 
                            `telford_db`.`approvers`
                            INNER JOIN 
                                `telford_db`.`auth_prod`
                            ON 
                                `auth_prod`.`approvers_id` = `approvers`.`id`
                            INNER JOIN
                                `telford_db`.`emails`
                            ON
                                `approvers`.`emails_id` = `emails`.`id`
                            INNER JOIN
                                `telford_db`.`emp_masterlist`
                            ON 
                                `approvers`.`EMP_NO` = `emp_masterlist`.`EMP_NO`
                            UNION
                            SELECT 
                            `EMP_NAME`,
                            `emailscol`
                            FROM 
                            `telford_db`.`approvers`
                            INNER JOIN 
                                `telford_db`.`auth_ee`
                            ON 
                                `auth_ee`.`approvers_id` = `approvers`.`id`
                            INNER JOIN
                                `telford_db`.`emails`
                            ON
                                `approvers`.`emails_id` = `emails`.`id`
                            INNER JOIN
                                `telford_db`.`emp_masterlist`
                            ON 
                                `approvers`.`EMP_NO` = `emp_masterlist`.`EMP_NO`
                            UNION
                            SELECT 
                            `EMP_NAME`,
                            `emailscol`
                            FROM 
                            `telford_db`.`approvers`
                            INNER JOIN 
                                `telford_db`.`auth_pe`
                            ON 
                                `auth_pe`.`approvers_id` = `approvers`.`id`
                            INNER JOIN
                                `telford_db`.`emails`
                            ON
                                `approvers`.`emails_id` = `emails`.`id`
                            INNER JOIN
                                `telford_db`.`emp_masterlist`
                            ON 
                                `approvers`.`EMP_NO` = `emp_masterlist`.`EMP_NO`
                            UNION
                            SELECT 
                            `EMP_NAME`,
                            `emailscol`
                            FROM 
                            `telford_db`.`approvers`
                            INNER JOIN 
                                `telford_db`.`auth_qa`
                            ON 
                                `auth_qa`.`approvers_id` = `approvers`.`id`
                            INNER JOIN
                                `telford_db`.`emails`
                            ON
                                `approvers`.`emails_id` = `emails`.`id`
                            INNER JOIN
                                `telford_db`.`emp_masterlist`
                            ON 
                                `approvers`.`EMP_NO` = `emp_masterlist`.`EMP_NO`";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $empName   = $row['EMP_NAME'];
            $email   = $row['emailscol'];
            $data[] = array("EMP_NAME" => $empName, "emailscol" =>  $email);
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    //===========================================
    // REQUEST FOR STATUS QDN REASSIGNMENT 
    //===========================================
    case 18:
        $qdnNum = $_POST['qdnNum'];
        $dataRequest = "SELECT `reAssignedTo`,
                            `reAssignedName`,
                            `reAssignedTeam`,
                            `department`,
                            `reAssignDescription`
                        FROM `analysis_tbl`
                        INNER JOIN `reassignments_tbl`
                        ON
                            `analysis_tbl`.`id` =  `reassignments_tbl`.`analysis_tbl_id`
                        WHERE 
                            `analysis_tbl`.`qdnNo` = '$qdnNum'
                        ORDER BY
                        `reassignments_tbl`.`id` DESC LIMIT 1";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $to      = $row['reAssignedTo'];
            $name   = $row['reAssignedName'];
            $team   = $row['reAssignedTeam'];
            $dept   = $row['department'];
            $des   = $row['reAssignDescription'];

            $data[] = array("to" => $to, "name" => $name,"team" => $team, "dept" => $dept, "des" => $des);
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    //===========================================
    // REQUEST FOR QDN DETAILS  
    // (for approval section)
    //===========================================
    case 19:
        $dataRequest = "SELECT * 
                        FROM `analysis_tbl`
                        WHERE `status` = 1
                        ORDER BY `id` DESC
                        LIMIT 1";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase ->execute();
        while($row =$dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $id                     = $row['id'];
            $qdnNo                  = $row['qdnNo'];
            $issuedByName           = $row['issuedByName'];
            $issuedByTeam           = $row['issuedByTeam'];
            $issuedToName           = $row['issuedToName'];
            $issuedToTeam           = $row['issuedToTeam'];
            $customer               = $row['customer'];
            $packageType            = $row['packageType'];
            $machine                = $row['machine'];
            $deviceName             = $row['deviceName'];
            $station                = $row['station'];
            $lotId                  = $row['lotId'];
            $teamResp               = $row['teamResp'];
            $dateTime               = $row['dateTime'];
            $classification         = $row['classification'];
            $defects                = $row['defects'];
            $failure_mode           = $row['failure_mode'];
            $disposition            = $row['disposition'];
            $cause_of_defects       = $row['cause_of_defects'];
            $cause_of_defects_des   = $row['cause_of_defects_des'];
            $prod_auth_col          = $row['prod_auth_col'];
            $ee_auth_col            = $row['ee_auth_col'];
            $pe_auth_col            = $row['pe_auth_col'];
            $qa_auth_col            = $row['qa_auth_col'];
            $others_auth_col        = $row['others_auth_col'];
            // STORING DATA TO AN ARRAY
            $qndNoData[] = array("qdnNo" => $qdnNo, "issuedByName" => $issuedByName,
                "issuedByTeam" => $issuedByTeam, "issuedToName" => $issuedToName,
                "issuedToTeam" => $issuedToTeam, "dateTime" => $dateTime,
                "customer" => $customer, "station" => $station,
                "teamResp" => $teamResp, "machine" => $machine, 
                "packageType" => $packageType,"deviceName" => $deviceName, 
                "lotId" => $lotId, "classification" => $classification, 
                "failure_mode" => $failure_mode, "disposition" => $disposition, 
                "defects" => $defects, "cause_of_defects" => $cause_of_defects, 
                "cause_of_defects_des" => $cause_of_defects_des, "prod_auth_col" => $prod_auth_col, 
                "ee_auth_col" => $ee_auth_col,"pe_auth_col" => $pe_auth_col, 
                "qa_auth_col" => $qa_auth_col, "others_auth_col" => $others_auth_col,
                "qdnId" => $id     
            );
        }
        // ENCODING ARRAY TO JSON FORMAT
        if ( $qndNoData ){
            echo json_encode($qndNoData);
        };
    break;
    case 19.1:
        $selectorID = $_POST['selectorID'];
        $qdnNum = $_POST['qdnNum'];
        $dataRequest = "SELECT `analysis_tbl`.`prod_auth_col`,
                               `analysis_tbl`.`ee_auth_col`,
                               `analysis_tbl`.`pe_auth_col`,
                               `analysis_tbl`.`qa_auth_col`,
                               `analysis_tbl`.`others_auth_col` 
                        FROM `analysis_tbl`
                        WHERE `qdnNo` = '$qdnNum'
                        AND `status` = 1";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase ->execute();
        while($row =$dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $prod_auth_col          = $row['prod_auth_col'];
            $ee_auth_col            = $row['ee_auth_col'];
            $pe_auth_col            = $row['pe_auth_col'];
            $qa_auth_col            = $row['qa_auth_col'];
            $others_auth_col        = $row['others_auth_col'];
            // STORING DATA TO AN ARRAY
            switch ($selectorID) {
                case "productionAuth":
                    // echo "This is Production result from getDetails.php file";
                    $qdnNoData[] = array("auth_col" => $prod_auth_col);
                break;
                case "EEAuth":
                    // echo "This is Equipment Engineering result from getDetails.php file";
                    $qdnNoData[] = array("auth_col" => $ee_auth_col);
                break;
                case "PEAuth":
                    // echo "This is PE result from getDetails.php file";
                    $qdnNoData[] = array("auth_col" => $pe_auth_col);
                break;
                case "qaAuth":
                    // echo "This is QA result from getDetails.php file";
                    $qdnNoData[] = array("auth_col" => $qa_auth_col);
                break;
                case "othersAuth":
                    // echo "This is Others result from getDetails.php file";
                    $qdnNoData[] = array("auth_col" => $others_auth_col);
                break;
            }
        }
        // ENCODING ARRAY TO JSON FORMAT
        if ( $qdnNoData ){
            echo json_encode($qdnNoData);           
        };
    break;
    case 19.2:
        $matchedQdnNum = $_POST["matchedQdnNum"];
        $dataRequest = "SELECT * 
                        FROM 
                            `telford_db`.`analysis_tbl`
                        WHERE
                            `analysis_tbl`.`qdnNo` = '$matchedQdnNum'
                        AND
                        `analysis_tbl`.`status` = 1";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase ->execute();
        while($row =$dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $id                     = $row['id'];
            $qdnNo                  = $row['qdnNo'];
            $issuedByName           = $row['issuedByName'];
            $issuedByTeam           = $row['issuedByTeam'];
            $issuedToName           = $row['issuedToName'];
            $issuedToTeam           = $row['issuedToTeam'];
            $customer               = $row['customer'];
            $packageType            = $row['packageType'];
            $machine                = $row['machine'];
            $deviceName             = $row['deviceName'];
            $station                = $row['station'];
            $lotId                  = $row['lotId'];
            $teamResp               = $row['teamResp'];
            $dateTime               = $row['dateTime'];
            $classification         = $row['classification'];
            $defects                = $row['defects'];
            $failure_mode           = $row['failure_mode'];
            $disposition            = $row['disposition'];
            $cause_of_defects       = $row['cause_of_defects'];
            $cause_of_defects_des   = $row['cause_of_defects_des'];
            $prod_auth_col          = $row['prod_auth_col'];
            $ee_auth_col            = $row['ee_auth_col'];
            $pe_auth_col            = $row['pe_auth_col'];
            $qa_auth_col            = $row['qa_auth_col'];
            $others_auth_col        = $row['others_auth_col'];
            // STORING DATA TO AN ARRAY
            $qndNoData[] = array("qdnNo" => $qdnNo, "issuedByName" => $issuedByName,
                "issuedByTeam" => $issuedByTeam, "issuedToName" => $issuedToName,
                "issuedToTeam" => $issuedToTeam, "dateTime" => $dateTime,
                "customer" => $customer, "station" => $station,
                "teamResp" => $teamResp, "machine" => $machine, 
                "packageType" => $packageType,"deviceName" => $deviceName, 
                "lotId" => $lotId, "classification" => $classification, 
                "failure_mode" => $failure_mode, "disposition" => $disposition, 
                "defects" => $defects, "cause_of_defects" => $cause_of_defects, 
                "cause_of_defects_des" => $cause_of_defects_des, "prod_auth_col" => $prod_auth_col, 
                "ee_auth_col" => $ee_auth_col,"pe_auth_col" => $pe_auth_col, 
                "qa_auth_col" => $qa_auth_col, "others_auth_col" => $others_auth_col,
                "qdnId" => $id     
            );
        }
        // ENCODING ARRAY TO JSON FORMAT
        if ( $qndNoData ){
            echo json_encode($qndNoData);
        };
    break;
    //=========================================
    // REQUEST FOR QDN REASSIGNMENT 
    //===========================================
    case 20:
        $qdnNum = $_POST['qdnNum'];
        $dataRequest = "SELECT * 
                        FROM `telford_db`.`analysis_tbl`
                        WHERE `analysis_tbl`.`qdnNo` = '$qdnNum' 
                        AND `analysis_tbl`.`status` = 1";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase ->execute();
        while($row =$dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $id                     = $row['id'];
            $qdnNo                  = $row['qdnNo'];
            $issuedByName           = $row['issuedByName'];
            $issuedByTeam           = $row['issuedByTeam'];
            $issuedTo               = $row['issuedTo'];
            $issuedToName           = $row['issuedToName'];
            $issuedToTeam           = $row['issuedToTeam'];
            $customer               = $row['customer'];
            $packageType            = $row['packageType'];
            $machine                = $row['machine'];
            $deviceName             = $row['deviceName'];
            $station                = $row['station'];
            $lotId                  = $row['lotId'];
            $teamResp               = $row['teamResp'];
            $dateTime               = $row['dateTime'];
            $classification         = $row['classification'];
            $defects                = $row['defects'];
            $failure_mode           = $row['failure_mode'];
            $disposition            = $row['disposition'];
            $cause_of_defects       = $row['cause_of_defects'];
            $cause_of_defects_des   = $row['cause_of_defects_des'];
            $prod_auth_col          = $row['prod_auth_col'];
            $ee_auth_col            = $row['ee_auth_col'];
            $pe_auth_col            = $row['pe_auth_col'];
            $qa_auth_col            = $row['qa_auth_col'];
            $others_auth_col        = $row['others_auth_col'];

            // STORING DATA TO AN ARRAY
            $qndNoData[] = array("qdnNo" => $qdnNo, "issuedByName" => $issuedByName,
                "issuedByTeam" => $issuedByTeam,"issuedTo" =>  $issuedTo,
                "issuedToTeam" => $issuedToTeam, "issuedToName" => $issuedToName,
                "customer" => $customer,"packageType" => $packageType, "machine" => $machine,
                "deviceName" => $deviceName, "station" => $station, "lotId" => $lotId,
                "teamResp" => $teamResp, "dateTime" => $dateTime,"id" => $id,
                "classification" => $classification, "defects" => $defects,
                "failure_mode" => $failure_mode, "disposition" => $disposition,
                "cause_of_defects" => $cause_of_defects, "cause_of_defects_des" => $cause_of_defects_des, "prod_auth_col" => $prod_auth_col, "ee_auth_col" => $ee_auth_col, "pe_auth_col" => $pe_auth_col, "qa_auth_col" => $qa_auth_col, "others_auth_col" => $others_auth_col 
            );
        }
        // ENCODING ARRAY TO JSON FORMAT
        if ( $qndNoData ){
            echo json_encode($qndNoData);
        };
    break;
    //=========================================
    //  FOR  APPROVAL AUTOCOMPLETE (AC)
    //===========================================
    case 21:
        $searchForThisQdnNo = $_POST["searchForThisQdnNo"];
        $dataRequest = "SELECT `id`, 
                            `qdnNo`
                        FROM `analysis_tbl`
                        WHERE `qdnNo` 
                        LIKE '%$searchForThisQdnNo%'
                        AND `status` = 1 
                        LIMIT 5";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $id      = $row['id'];
            $qdnNo   = $row['qdnNo'];

            $data[] = array("id" => $id, "qdnNo" => $qdnNo);
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
    //============================================
    //  FOR APPROVER LIST AUTHENTICATION REQUEST
    //==============================================
    case 22:
        $userPassInput  = $_POST['userPassInput'];
        $empId          = $_POST['empId'];
        $qdnId          = $_POST['qdnId'];
        $dataRequest = "SELECT `approvers`.`password`,
                                `approvers`.`EMP_NO`,
                                `emp_masterlist`.`EMP_NAME`,
                                `emp_masterlist`.`EMP_NO`
                        FROM
                            `telford_db`.`approvers`
                        INNER JOIN
                            `telford_db`.`emp_masterlist`
                        ON
                            `approvers`.`EMP_NO` = `emp_masterlist`.`EMP_NO`
                        WHERE
                            `approvers`.`EMP_NO` = '$empId'"; 
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();
        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $hashed_password = $row['password'];    
            if(password_verify($userPassInput, $hashed_password)) {
                $EMP_NO   = $row['EMP_NO'];
                $EMP_NAME   = $row['EMP_NAME'];
                $data[] = array( "EMP_NAME" => $EMP_NAME);
            }; 
        };
        if ($data){
            echo json_encode($data);
            $Insert = "UPDATE `telford_db`.`analysis_tbl`
                        SET
                        `status_resp` = ?
                        WHERE `analysis_tbl`.`id` = 4 "; 
            $insertStmt = $db->prepare($Insert);
            $result = $insertStmt->execute([$EMP_NAME]);
        };
        break;
        //=========================================
        //  FOR AUTOCOMPLETE MACHINES SUGGESTIONS
        //===========================================
        case 23:
        $empNumero = $_POST["empNumero"];
        $dataRequest = "SELECT `EMP_NAME`
                        FROM `emp_masterlist`
                        WHERE `EMP_NO` = '$empNumero' ";
        $dataFromDatabase = $db->prepare($dataRequest);
        $dataFromDatabase -> execute();

        while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
            $EMP_NAME = $row['EMP_NAME'];

            $data[] = array("EMP_NAME" => $EMP_NAME);
        }
        if ( $data ){
            echo json_encode($data);
        };
    break;
};    
?>
