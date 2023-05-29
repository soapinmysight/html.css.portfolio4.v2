<?php
//Require functions for actions
require_once "includes/actions.php";

//It first checks if an 'id' parameter is provided.
if (!isset($_GET['id'])) {
    //If not, it calls a function to get all the cards' data.
    $data = getCards();
//If the 'id' parameter is present, it calls a different function to get the details of a specific card based on the provided ID.
} else {
    $data = getCardsDetails($_GET['id']);
}
//Set the header & output JSON so the client will know what to expect.
header("Content-Type: application/json");
//The retrieved data is then encoded into JSON format and sent as a response to the client.
echo json_encode($data);

exit;
?>