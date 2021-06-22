<?php

require("../php/cnfg.php");

if(isset($_POST)){

	$id 					= $_POST['id'];
	$correctiveAct2Db		= $_POST['correctiveAct2Db'];
	$correctiveResp2Db 		= $_POST['correctiveResp2Db'];
	$correctiveWhen2Db 		= $_POST['correctiveWhen2Db'];
	$correctiveStatus2Db 	= $_POST['correctiveStatus2Db'];

	$sqlUpdate = "UPDATE 
					`telford_db`.`correctives`
					SET
						`actions` = ?,
						`responsible` = ?,
						`when` =  ?,
						`status` = ? 
				WHERE 
					`id` = ?"; 
	$stmtUpdate = $db->prepare($sqlUpdate);
	$result = $stmtUpdate->execute([ $correctiveAct2Db, $correctiveResp2Db, $correctiveWhen2Db, $correctiveStatus2Db, $id]);
};

?>	
