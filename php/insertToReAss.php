<?php

require("../php/cnfg.php");

if(isset($_POST)){
	// VARIABLE FROM analysisFormValidation.js
	$reAssignTo2Db 			= $_POST['reAssignTo2Db'];
	$reAssignToName2Db 		= $_POST['reAssignToName2Db'];
	$reAssignToTeam2Db 		= $_POST['reAssignToTeam2Db'];
	$reAssignToDept2Db 		= $_POST['reAssignToDept2Db'];
	$reAssignToDes2Db 		= $_POST['reAssignToDes2Db'];
	$openQdnID2Db 			= $_POST['openQdnID2Db'];
	$Insert = "INSERT INTO `telford_db`.`reassignments_tbl`
				(`reAssignedTo`,
				`reAssignedName`,
				`reAssignedTeam`,
				`department`,
				`reAssignDescription`,
				`analysis_tbl_id`)
				VALUES
				(?, ?, ?, ?, ?, ?)"; 
	$stmtinsert = $db->prepare($Insert);
	$result = $stmtinsert->execute([$reAssignTo2Db, $reAssignToName2Db, $reAssignToTeam2Db, $reAssignToDept2Db, $reAssignToDes2Db, $openQdnID2Db]);
};
	
?>
