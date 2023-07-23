<?php
require "connect.php";
//generate complaint id
$employee_id = $_COOKIE['name'];
function generateComplaintId($con) {
    $lastComplaintId = 0;
    $result = $con->query("SELECT MAX(complaint_id) as maxid FROM complaints");
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $lastComplaintId = $row["maxid"];
    }
    $newComplaintId = $lastComplaintId + 1;
    return $newComplaintId;
}
$complaintId = generateComplaintId($con);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $stmt = $con->prepare("insert into complaints (complaint_id,employee_id, issue_date, type, msg) values(?, ?, ?, ?, ?)");
    if ($stmt === false) {
        die("Error: " . $con->error);
    }
    $stmt->bind_param("iisss", $complaintId,$employee_id, $_POST["issuedate"], $_POST["complaint-type"], $_POST["additional-comments"]);
        // Execute the prepared statement and check if the insertion was successful
        if ($stmt->execute()) {
            //Complaint successfully raised! We are working to rectify the probelm
            echo "<body style='background-color: #f8f9fc; display:flex; justify-content:center; align-items:center; text-align:center'>
                    <div style='padding:15px; background-color: #1cc88a;'>
                    <p>Complaint successfully raised! We are working to rectify the probelm</p>
                    </div>
                </body>";
        } 
        else {
            echo "Error: " . $stmt->error;
        }

        // Close the prepared statement and database 
        $stmt->close();
}
?>