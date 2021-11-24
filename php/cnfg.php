<?php 

$host = 'localhost';
$db   = 'telford_db';
// $user = 'admin';
$user = 'neyt';
// $pass = 'gieRHAAA9iSi3ULZ';
$pass = 'dkoalam3h';
$charset = 'utf8mb4';

$options = [
    \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
    \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
    \PDO::ATTR_EMULATE_PREPARES   => false,
];
$db = "mysql:host=$host;dbname=$db;charset=$charset";
try {
     $db = new \PDO($db, $user, $pass, $options);
} catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

?>
