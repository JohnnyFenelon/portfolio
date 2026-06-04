<?php
// Suppress all HTML error output - MUST be at the very top
error_reporting(0);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Start output buffering to catch any accidental output
ob_start();

// Set JSON headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    ob_end_clean();
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    ob_end_clean();
    echo json_encode(['success' => false, 'msg' => 'Method not allowed']);
    exit;
}

// Clear any buffered output
ob_end_clean();

// Get and validate JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['success' => false, 'msg' => 'Invalid JSON input']);
    exit;
}

$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$message = isset($input['message']) ? trim($input['message']) : '';

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['success' => false, 'msg' => 'All fields are required']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'msg' => 'Invalid email format']);
    exit;
}

// Email configuration
$to = 'academia969@johnnyfenelon.com';
$subject = 'New Contact Form Message from ' . $name;
$body = "Name: $name\n";
$body .= "Email: $email\n\n";
$body .= "Message:\n$message\n";

// Email headers - use a generic From address to avoid spam filters
$headers = "From: noreply@johnnyfenelon.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email with error suppression
$mail_sent = @mail($to, $subject, $body, $headers);

if ($mail_sent) {
    echo json_encode(['success' => true, 'msg' => 'Message sent successfully']);
} else {
    // Log the error server-side
    error_log("Contact form mail failed - From: $email, Subject: $subject");
    echo json_encode(['success' => false, 'msg' => 'Failed to send message. Please try again later.']);
}
?>