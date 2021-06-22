<?php

require("../php/cnfg.php");

if(isset($_POST)){

	$id 					= $_POST['id'];
	$correctionAct2Db		= $_POST['correctionAct2Db'];
	$correctionResp2Db 		= $_POST['correctionResp2Db'];
	$correctionWhen2Db 		= $_POST['correctionWhen2Db'];
	$correctionStatus2Db 	= $_POST['correctionStatus2Db'];

	$sqlUpdate = "UPDATE 
					`telford_db`.`corrections`
					SET
						`actions` = ?,
						`responsible` = ?,
						`when` =  ?,
						`status` = ? 
				WHERE 
					`id` = ?"; 
	$stmtUpdate = $db->prepare($sqlUpdate);
	$result = $stmtUpdate->execute([ $correctionAct2Db, $correctionResp2Db, $correctionWhen2Db, $correctionStatus2Db, $id]);
};

?>	
