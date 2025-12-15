<?php
// Include database connection
require_once '../connect.php';

try {
    // Query to get all facilities
    $sql = "SELECT 
                id,
                level,
                level_name,
                facility_number,
                facility_name
            FROM facilities
            ORDER BY level ASC, facility_number ASC";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    $facilities = $stmt->fetchAll();
    
    // Add custom "Name" variable to each facility
    $result = array_map(function($facility) {
        $facility['Name'] = $facility['level'] . '-' . $facility['facility_number'];
        return $facility;
    }, $facilities);
    
    // Prepare response data
    $responseData = [
        "success" => true,
        "count" => count($result),
        "data" => $result
    ];
    
    // Save to JSON file
    $jsonFile = __DIR__ . '/facilities_data.json';
    file_put_contents($jsonFile, json_encode($responseData, JSON_PRETTY_PRINT));
    
    // Return success response
    http_response_code(200);
    echo json_encode($responseData, JSON_PRETTY_PRINT);
    
} catch(PDOException $e) {
    // Return error response
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error fetching facilities: " . $e->getMessage()
    ]);
}

// Close connection
$conn = null;
?>
