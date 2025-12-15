<?php
require_once '../connect.php';

try {
    // Prepare and execute query
    $stmt = $conn->prepare("SELECT * FROM plan_code ORDER BY id ASC");
    $stmt->execute();
    
    // Fetch all results
    $planCodes = $stmt->fetchAll();
    
    // Add "Name" field to each record
    foreach ($planCodes as &$planCode) {
        $planCode['Name'] = $planCode['code'] . "-" . $planCode['label'];
    }
    unset($planCode); // Break reference
    
    // Prepare data structure
    $jsonData = [
        "success" => true,
        "count" => count($planCodes),
        "data" => $planCodes,
        "generated_at" => date('Y-m-d H:i:s')
    ];
    
    // Convert to JSON with pretty print
    $jsonString = json_encode($jsonData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    
    // Define file path
    $filePath = 'plan_codes.json';
    
    // Save to file
    $bytesWritten = file_put_contents($filePath, $jsonString);
    
    if ($bytesWritten === false) {
        throw new Exception("Failed to write JSON file");
    }
    
    // Return success response
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Data saved successfully",
        "file" => $filePath,
        "records" => count($planCodes),
        "size" => $bytesWritten . " bytes"
    ]);
    
} catch(PDOException $e) {
    // Return database error response
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Query failed: " . $e->getMessage()
    ]);
} catch(Exception $e) {
    // Return file error response
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>