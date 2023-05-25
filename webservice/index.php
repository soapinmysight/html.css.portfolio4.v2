<?php
//Require functions for actions
require_once "includes/actions.php";

$data = 'vghvghvh';

if (!isset($_GET['id'])) {
    $data = getCards();
} else {
    $data = getCardsDetails($_GET['id']);
}
//Set the header & output JSON so the client will know what to expect.
header("Content-Type: application/json");
echo json_encode($data);

exit;
?>