<?php
// Allow CORS for local testing
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'msg' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);
$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';

// Validate input
if (empty($name) || empty($email)) {
    echo json_encode(['success' => false, 'msg' => 'Name and email are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'msg' => 'Invalid email format']);
    exit;
}

// Database connection (XAMPP local settings)
try {
    $pdo = new PDO(
        "mysql:host=localhost;dbname=johnscos_portfolio1;charset=utf8mb4",
        "johnscos_portfolio1",           // Your cPanel database username
        "Welcome#1-*",      // Your database password
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]
    );
    
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'msg' => 'Database connection failed']);
    exit;
}

// Insert subscriber
try {
    $stmt = $pdo->prepare("INSERT INTO subscribers (name, email) VALUES (:name, :email)");
    $stmt->execute([
        ':name' => $name,
        ':email' => $email
    ]);
    
    echo json_encode(['success' => true, 'msg' => 'Subscribed successfully']);
} catch (PDOException $e) {
    // Check if it's a duplicate email error
    if ($e->getCode() == 23000) {
        echo json_encode(['success' => true, 'msg' => 'Already subscribed']);
    } else {
        echo json_encode(['success' => false, 'msg' => 'Database error']);
    }
}
?>