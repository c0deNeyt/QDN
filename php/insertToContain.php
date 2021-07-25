<?php

require("../php/cnfg.php");

if(isset($_POST)){
	
	$containment2DB 		= $_POST['containment2DB'];
	$containmentResp2DB 	= $_POST['containmentResp2DB'];
	$containmentWhen2DB 	= $_POST['containmentWhen2DB'];
	$containmentStatus2DB 	= $_POST['containmentStatus2DB'];
	$id 					= $_POST['id'];
	
	$Insert = "INSERT INTO 
				`telford_db`.`containments`
				(`actions`,`responsible`,`when`,`status`,`analysis_tbl_id`)
				VALUES (?, ?, ?, ?, ?)"; 
	$stmtinsert = $db->prepare($Insert);
	$result = $stmtinsert->execute([$containment2DB, $containmentResp2DB, $containmentWhen2DB, $containmentStatus2DB, $id]);
}
	
?>
