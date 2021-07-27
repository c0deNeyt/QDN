<?php

require("../php/cnfg.php");

if(isset($_POST)){

	$id 				= $_POST['id'];
	$containAct2Db		= $_POST['containAct2Db'];
	$containResp2Db 	= $_POST['containResp2Db'];
	$containWhen2Db 	= $_POST['containWhen2Db'];
	$containStatus2Db 	= $_POST['containStatus2Db'];

	$sqlUpdate = "UPDATE 
				`telford_db`.`containments`
				SET
					`actions` = ?,
					`responsible` = ?,
					`when` =  ?,
					`status` = ? 
				WHERE 
					`id` = ?"; 
	$stmtUpdate = $db->prepare($sqlUpdate);
	$result = $stmtUpdate->execute([ $containAct2Db, $containResp2Db, $containWhen2Db, $containStatus2Db, $id]);
};

?>	
