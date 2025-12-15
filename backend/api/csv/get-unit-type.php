<?php
require_once '../connect.php';

try {
    // Prepare and execute query
    $stmt = $conn->prepare("SELECT code, label, bedrooms_label, area_unit, area_ac, area_total, color FROM plan_code ORDER BY id ASC");
    $stmt->execute();
    
    // Fetch all results
    $planCodes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Set headers for CSV download
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="plan_codes_' . date('Ymd_His') . '.csv"');
    header('Pragma: no-cache');
    header('Expires: 0');
    
    // Create output stream
    $output = fopen('php://output', 'w');
    
    // Add BOM for UTF-8 (helps Excel display Unicode correctly)
    fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF));
    
    // Write CSV header
    if (!empty($planCodes)) {
        fputcsv($output, array_keys($planCodes[0]));
        
        // Write data rows
        foreach ($planCodes as $planCode) {
            fputcsv($output, $planCode);
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
} catch(Exception $e) {
    // Return error response
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}

// Close connection
$conn = null;
?>
