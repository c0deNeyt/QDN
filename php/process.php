<?php

require("../php/cnfg.php");

if(isset($_POST)){

	$qdnNumber2Db 			= $_POST['qdnNumber2Db'];
	$qdnIBENo2Db 			= $_POST['qdnIBENo2Db'];
	$qdnIBEN2Db 			= $_POST['qdnIBEN2Db'];
	$qdnIBET2Db 			= $_POST['qdnIBET2Db'];
	$qdnITENo2Db 			= $_POST['qdnITENo2Db'];
	$qdnITEN2Db 			= $_POST['qdnITEN2Db'];
	$qdnITET2Db 			= $_POST['qdnITET2Db'];
	$qdncustomer2Db 		= $_POST['qdncustomer2Db'];
	$qdnmachine2Db 			= $_POST['qdnmachine2Db'];
	$qdnpkgtype2Db 			= $_POST['qdnpkgtype2Db'];
	$qdnDeviceName2Db 		= $_POST['qdnDeviceName2Db'];
	$qdnStation2Db 			= $_POST['qdnStation2Db'];
	$qdnLotId2Db 			= $_POST['qdnLotId2Db'];
	$qdnTeamResp2Db 		= $_POST['qdnTeamResp2Db'];
	$qdnDateTime2Db 		= $_POST['qdnDateTime2Db'];
	$qdnClassification2Db 	= $_POST['qdnClassification2Db'];
	$qdnDefects2Db			= $_POST['qdnDefects2Db'];
	$qdnFailureMode2Db		= $_POST['qdnFailureMode2Db'];
	

		$Insert = "INSERT INTO analysis_tbl (qdnNo, issuedBy, issuedByName, issuedByTeam, issuedTo, issuedToName, issuedToTeam, customer, machine, packageType, deviceName, station, lotId, teamResp, dateTime, classification, defects, failure_mode) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; 
		$stmtinsert = $db->prepare($Insert);
		$result = $stmtinsert->execute([$qdnNumber2Db, $qdnIBENo2Db, $qdnIBEN2Db, $qdnIBET2Db, $qdnITENo2Db, $qdnITEN2Db, $qdnITET2Db, $qdncustomer2Db, $qdnmachine2Db, $qdnpkgtype2Db, $qdnDeviceName2Db, $qdnStation2Db, $qdnLotId2Db, $qdnTeamResp2Db, $qdnDateTime2Db, $qdnClassification2Db, $qdnDefects2Db, $qdnFailureMode2Db]);
		if($result){
			$anotherInsert = "INSERT INTO `telford_db`.`qdnNo`
							(`qdnNo`)
						VALUES (?)"; 
			$stmtinsertTwo = $db->prepare($anotherInsert);
			$result2 = $stmtinsertTwo->execute([$qdnNumber2Db]);
		};
};

?>
