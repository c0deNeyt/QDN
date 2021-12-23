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
					WHERE `EMP_NO` = ?"; 
	$stmtUpdate = $db->prepare($sqlUpdate);
	$result = $stmtUpdate->execute([$pass, $id]);

	$dataRequest = "SELECT `approvers`.`password`,
                                `approvers`.`EMP_NO`,
                                `emp_masterlist`.`EMP_NAME`,
                                `emp_masterlist`.`EMP_NO`
                        FROM
                            `telford_db`.`approvers`
                        INNER JOIN
                            `telford_db`.`emp_masterlist`
                        ON
                            `approvers`.`EMP_NO` = `emp_masterlist`.`EMP_NO`
                        WHERE
                            `approvers`.`EMP_NO` = '$id' ";
	$dataFromDatabase = $db->prepare($dataRequest);
	$dataFromDatabase -> execute();

	while($row = $dataFromDatabase->fetch(PDO::FETCH_ASSOC)){
		$EMP_NAME = $row['EMP_NAME'];
		$data[] = array("EMP_NAME" => $EMP_NAME);
	}
	if ( $data ){
	echo json_encode($data);
	}
	else{
		echo "NotFound";
	};
};

?>	
