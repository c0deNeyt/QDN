<?php

require("../php/cnfg.php");

if(isset($_POST)){

	$id 				= $_POST['id'];
	$disposition2Db		= $_POST['disposition2Db'];
	$COD2Db 			= $_POST['COD2Db'];
	$CODstatement2Db 	= $_POST['CODstatement2Db'];
	$Insert = "UPDATE `telford_db`.`analysis_tbl`
						SET
						`disposition` = ?,
						`cause_of_defects` = ?,
						`cause_of_defects_des` = ?
						WHERE `id` = ?"; 
	$stmtinsert = $db->prepare($Insert);
	$result = $stmtinsert->execute([ $disposition2Db, $COD2Db, $CODstatement2Db, $id]);
}

?>
