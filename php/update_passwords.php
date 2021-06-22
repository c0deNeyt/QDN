<?php

require("../php/cnfg.php");

if(isset($_POST)){

	$id 		= $_POST['id'];
	$temp		= $_POST['pass'];
	$pass = password_hash($temp, PASSWORD_DEFAULT);
	// $pass		= sha1(md5($temp));

	$sqlUpdate = "UPDATE `telford_db`.`approvers`
					SET
					`password` = ? 
					WHERE `id` = ?"; 
	$stmtUpdate = $db->prepare($sqlUpdate);
	$result = $stmtUpdate->execute([$pass, $id]);
};

?>	
