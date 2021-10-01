<?php
//DATABASE CONNECTION
require("../php/cnfg.php");
// FOR AJAX REQUEST' S
$request = $_POST['request'];  
  //=========================================
 // PROD AUTH UPDATE 
//===========================================
switch ($request) {
    case 1: 
        $prod_auth_col     = $_POST['approverName'];
        $qdnNumber  = $_POST['qdnNumber'];
        $Insert = "UPDATE `telford_db`.`analysis_tbl`
                            SET
                            `prod_auth_col` = ?
                            WHERE `qdnNo` = ?"; 
        $stmtinsert = $db->prepare($Insert);
        $result = $stmtinsert->execute([$prod_auth_col, $qdnNumber]);
        if ($result){
            echo "Insert SUCCESS!";
        }
    break;
    //=========================================
    // EE AUTH UPDATE 
    //===========================================
    case 2: 
        $ee_auth_col     = $_POST['approverName'];
        $qdnNumber  = $_POST['qdnNumber'];
        $Insert = "UPDATE `telford_db`.`analysis_tbl`
                            SET
                            `ee_auth_col` = ?
                            WHERE `qdnNo` = ?"; 
        $stmtinsert = $db->prepare($Insert);
        $result = $stmtinsert->execute([$ee_auth_col, $qdnNumber]);
        if ($result){
            echo "Insert SUCCESS!";
        }
    break;
    //=========================================
    // PE AUTH UPDATE 
    //===========================================
    case 3: 
        $pe_auth_col     = $_POST['approverName'];
        $qdnNumber  = $_POST['qdnNumber'];
        $Insert = "UPDATE `telford_db`.`analysis_tbl`
                            SET
                            `pe_auth_col` = ?
                            WHERE `qdnNo` = ?"; 
        $stmtinsert = $db->prepare($Insert);
        $result = $stmtinsert->execute([$pe_auth_col, $qdnNumber]);
        if ($result){
            echo "Insert SUCCESS!";
        }
    break;
    //=========================================
    // QA AUTH UPDATE 
    //===========================================
    case 4: 
        $qa_auth_col     = $_POST['approverName'];
        $qdnNumber  = $_POST['qdnNumber'];
        $Insert = "UPDATE `telford_db`.`analysis_tbl`
                            SET
                            `qa_auth_col` = ?
                            WHERE `qdnNo` = ?"; 
        $stmtinsert = $db->prepare($Insert);
        $result = $stmtinsert->execute([$qa_auth_col, $qdnNumber]);
        if ($result){
            echo "Insert SUCCESS!";
        }
    break;
    //=========================================
    // OTHERS AUTH UPDATE 
    //===========================================
    case 5: 
        $others_auth_col     = $_POST['approverName'];
        $qdnNumber  = $_POST['qdnNumber'];
        $Insert = "UPDATE `telford_db`.`analysis_tbl`
                            SET
                            `others_auth_col` = ?
                            WHERE `qdnNo` = ?"; 
        $stmtinsert = $db->prepare($Insert);
        $result = $stmtinsert->execute([$others_auth_col, $qdnNumber]);
        if ($result){
            echo "Insert SUCCESS!";
        }
    break;
    //=========================================
    // UPDATE STATUS AND STATUS RESPONSIBLE
    //===========================================
    case 6: 
        $status     = $_POST['status'];
        $status_resp  = $_POST['status_resp'];
        $qdnNumber  = $_POST['qndNumber'];
        $Insert = "UPDATE `analysis_tbl`
                SET
                `status` = ? ,
                `status_resp` = ?
                WHERE `qdnNo` = ?"; 
        $stmtinsert = $db->prepare($Insert);
        $result = $stmtinsert->execute([$status, $status_resp, $qdnNumber]);
        if ($result){
            echo "Insert SUCCESS!";
        }
    break;
    case 7: 
        $status     = $_POST['status'];
        $qdnNumber  = $_POST['qndNumber'];
        $Insert = "UPDATE `analysis_tbl`
                SET
                `status` = ? 
                WHERE `qdnNo` = ?"; 
        $stmtinsert = $db->prepare($Insert);
        $result = $stmtinsert->execute([$status, $qdnNumber]);
        if ($result){
            echo "Insert SUCCESS!";
        }

    break;
}
?>
