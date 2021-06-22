<?php

require("../php/cnfg.php");

if(isset($_POST)){

	$corrective2DB 		= $_POST['corrective2DB'];
	$correctiveResp2DB 	= $_POST['correctiveResp2DB'];
	$correctiveWhen2DB 	= $_POST['correctiveWhen2DB'];
	$correctiveStatus2DB 	= $_POST['correctiveStatus2DB'];
	$id 					= $_POST['id'];
	
	$Insert = "INSERT INTO `telford_db`.`correctives`
				(`actions`,
				`responsible`,
				`when`,
				`status`,
				`analysis_tbl_id`)
				VALUES	
					(?, ?, ?, ?, ?)"; 
	$stmtinsert = $db->prepare($Insert);
	$result = $stmtinsert->execute([$corrective2DB, $correctiveResp2DB, $correctiveWhen2DB, $correctiveStatus2DB, $id]);
};
	
?>
