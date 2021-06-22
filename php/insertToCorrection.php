<?php

require("../php/cnfg.php");

if(isset($_POST)){

	$correction2DB 			= $_POST['correction2DB'];
	$correctionResp2DB 		= $_POST['correctionResp2DB'];
	$correctionWhen2DB 		= $_POST['correctionWhen2DB'];
	$correctionStatus2DB 	= $_POST['correctionStatus2DB'];
	$id 					= $_POST['id'];
	
	$Insert = "INSERT INTO `telford_db`.`corrections`
				(`actions`,
				`responsible`,
				`when`,
				`status`,
				`analysis_tbl_id`)
				VALUES
					(?, ?, ?, ?, ?)"; 
	$stmtinsert = $db->prepare($Insert);
	$result = $stmtinsert->execute([$correction2DB, $correctionResp2DB, $correctionWhen2DB, $correctionStatus2DB, $id]);
}
	
?>
