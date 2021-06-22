<?php
//DATABASE CONNECTION
require("../php/cnfg.php");
// FOR AJAX REQUEST' S
$request = $_POST['request'];  
  //=========================================
 // PROD AUTH UPDATE 
//===========================================
if($request == 1){
    $prod_auth_col     = $_POST['prod_auth_col'];
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
    exit;
}
  //=========================================
 // EE AUTH UPDATE 
//===========================================
else if($request == 2){
    $ee_auth_col     = $_POST['ee_auth_col'];
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
    exit;
}
  //=========================================
 // PE AUTH UPDATE 
//===========================================
else if($request == 3){
    $pe_auth_col     = $_POST['pe_auth_col'];
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
    exit;
}
  //=========================================
 // QA AUTH UPDATE 
//===========================================
else if($request == 4){
    $qa_auth_col     = $_POST['qa_auth_col'];
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
    exit;
}
  //=========================================
 // OTHERS AUTH UPDATE 
//===========================================
else if($request == 5){
    $others_auth_col     = $_POST['others_auth_col'];
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
    exit;
}
  //=========================================
 // UPDATE STATUS AND STATUS RESPONSIBLE
//===========================================
else if($request == 6){
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
    exit;
}
else if($request == 7){
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
    exit;
};
?>
