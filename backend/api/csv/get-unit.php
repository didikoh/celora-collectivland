<?php
require_once '../connect.php';

try {
    // Prepare SQL query to get all units
    $sql = "SELECT 
                level_id,
                unit_no,
                type,
                status,
                view
            FROM unit
            ORDER BY level_id ASC, unit_no ASC";
    
    // Execute query
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    // Fetch all results
    $units = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Add "Name" field to each unit
    foreach ($units as &$unit) {
        $unit['Name'] = $unit['level_id'] . '-' . $unit['unit_no'];
    }
    unset($unit); // Break reference
    
    // Set headers for CSV download
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="units_data_' . date('Ymd_His') . '.csv"');
    header('Pragma: no-cache');
    header('Expires: 0');
    
    // Create output stream
    $output = fopen('php://output', 'w');
    
    // Add BOM for UTF-8 (helps Excel display Unicode correctly)
    fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));
    
    // Write CSV header
    if (!empty($units)) {
        fputcsv($output, array_keys($units[0]));
        
        // Write data rows
        foreach ($units as $unit) {
            fputcsv($output, $unit);
        }
    }
    
    fclose($output);
    exit();
    
} catch(PDOException $e) {
    // Return error response
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        "success" => false,
        "message" => "Query failed: " . $e->getMessage()
    ]);
}

// Close connection
$conn = null;
?>
