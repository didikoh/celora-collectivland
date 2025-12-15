<?php
require_once '../connect.php';

try {
    // Prepare SQL query to get all units
    $sql = "SELECT 
                id,
                block,
                level_id,
                unit_no,
                type,
                status,
                view,
                level_view_index
            FROM unit
            ORDER BY level_id ASC, unit_no ASC";
    
    // Execute query
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    // Fetch all results
    $units = $stmt->fetchAll();
    
    // Add "Name" field to each unit
    foreach ($units as &$unit) {
        $unit['Name'] = $unit['block']. '-' . $unit['level_id'] . '-' . $unit['unit_no'];
    }
    unset($unit); // Break reference
    
    // Prepare data structure
    $data = [
        "success" => true,
        "count" => count($units),
        "timestamp" => date('Y-m-d H:i:s'),
        "data" => $units
    ];
    
    // Define the JSON file path
    $jsonFile = 'units_data.json';
    
    // Convert to JSON with pretty print
    $jsonData = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    
    // Save to file
    if (file_put_contents($jsonFile, $jsonData)) {
        // Return success response
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "message" => "Data successfully saved to JSON file",
            "file" => $jsonFile,
            "count" => count($units)
        ]);
    } else {
        // File write failed
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Failed to write JSON file"
        ]);
    }
    
} catch(PDOException $e) {
    // Return error response
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Query failed: " . $e->getMessage()
    ]);
}

// Close connection
$conn = null;
?>