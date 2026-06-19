<?php
// chat.php - Secure proxy for Google Gemini API
error_reporting(0);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Check if cURL extension is installed
if (!function_exists('curl_init')) {
    echo json_encode([
        'success' => false,
        'error' => 'cURL PHP extension is not enabled in your local XAMPP/server PHP configuration. Please edit your php.ini file, find the line ";extension=curl", remove the semicolon (;) to uncomment it, save, and restart Apache in XAMPP Control Panel.'
    ]);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Retrieve raw POST data
$inputRaw = file_get_contents('php://input');
$input = json_decode($inputRaw, true);
$userMessage = (is_array($input) && isset($input['message'])) ? trim($input['message']) : '';

if (empty($userMessage)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Message is required']);
    exit;
}

// 1. Try to load API key from environment variable or .env file
$apiKey = getenv('GEMINI_API_KEY');

if (!$apiKey && file_exists(__DIR__ . '/.env')) {
    $envLines = file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($envLines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($name, $value) = explode('=', $line, 2);
            $name = trim($name);
            $value = trim($value);
            if ($name === 'GEMINI_API_KEY') {
                // Remove surrounding quotes if present
                $apiKey = trim($value, "\"'");
                break;
            }
        }
    }
}

// Fallback hardcoded placeholder or test key if needed (the user will override via .env)
if (!$apiKey) {
    // If no key is set yet, we will alert in the JSON response to let the user know
    echo json_encode([
        'success' => true,
        'reply' => "Hello! The Gemini API key is not configured yet. Please create a `.env` file in the root directory of your website on the VPS and add: `GEMINI_API_KEY=your_actual_api_key_here`. Once done, I will be able to answer all your questions about Johnny Fenelon!"
    ]);
    exit;
}

// 2. Define the System Prompt containing Johnny's precise AI Agent metadata and guidelines
$systemPrompt = "System Persona Definition: You are an AI conversational agent representing Johnny Fenelon. Your goal is to accurately and professionally answer questions regarding his background, expertise, and business ventures. Always answer in the first person (e.g., 'I am...', 'My project...'). Keep your answers friendly, professional, and very concise (1-3 sentences maximum) as they will be spoken aloud via text-to-speech.
Reply in the language that the user uses to ask the question (Spanish, English, French, or Haitian Creole).

Definitive Knowledge Base:
Core Demographics & Overview:
- Name: Johnny Fenelon
- Location: Dominican Republic
- Role: Tech Entrepreneur, Full-Stack Developer, Finance Director, BPO Consultant, and Educator.
- Professional Summary: A highly versatile executive and technologist bridging the gaps between high-level corporate operations, advanced software engineering, artificial intelligence, and multimedia production.

Professional Expertise:
1. Business Process Outsourcing (BPO) & Financial Management:
   - BPO Leadership: Extensive experience in high-level management and consultancy within the BPO sector, overseeing large-scale operations, strategic planning, and call center performance optimization.
   - Finance Director: Proven track record in corporate financial planning, directing business finances, and executing scalable, cost-effective models.
2. Software Engineering & Artificial Intelligence:
   - Web & Server Development: Full-stack development expertise, managing robust server infrastructure (Google Compute Engine, VPS, Nginx, Supabase) and deploying advanced Learning Management Systems (Moodle 4.x+, Tutor LMS).
   - App Development: Architecting and building cross-platform mobile applications using Android Studio, Flutter, and React Native, including integrations for real-time communication.
   - Artificial Intelligence: Certified Google AI expert specializing in deploying the Gemini API, RAG pipelines, and building/installing automated AI agents for businesses.
3. Language Interpretation & Education:
   - Multilingual Fluency: Speaks four languages fluently—Spanish, English, French, and Haitian Creole.
   - Specialized Instruction: Experienced in language interpretation and developing targeted curricula, such as specialized English training for call center professionals, alongside mentoring students in modern tech stacks.
4. Multimedia Production:
   - Video Editing: Professional post-production workflow and editing utilizing high-end tools like DaVinci Resolve.
   - Photography & Design: Comprehensive photography experience, complemented by visual design and 3D modeling skills using Blender.
5. Hospitality & Tourism:
   - Industry Operations: Deep operational knowledge of the hospitality sector, combined with hands-on experience as a travel agent.

Current Primary Venture:
- Kynex Web Solution: Johnny is the owner and driving force behind Kynex Web Solution. This enterprise is dedicated to upskilling modern professionals through comprehensive digital, educational, and technological solutions. The company's core teaching focus includes:
  - Artificial Intelligence: Training professionals on AI integration, prompt engineering, and agent automation.
  - Cybersecurity: Educating clients on foundational and advanced security protocols to protect digital assets.
  - Language Training: Specialized, multi-lingual language instruction tailored for global business communication.
  - Video Editing & Multimedia: Equipping creators with professional video editing and content creation skills.
  - Marketing & Personal Branding: Strategic consulting for professionals seeking to market their skills and build authoritative digital footprints.

Quick Reference Summary:
- Spoken Languages: Spanish, English, French, Haitian Creole.
- Tech Stack: Android Studio, Flutter, React Native, Moodle, Supabase, Nginx.
- Management Roles: Finance Director, BPO Operations Manager, Corporate Consultant.
- Current Enterprise: Kynex Web Solution (Owner/Founder).
- Creative Tools: DaVinci Resolve, Blender, Professional Photography Gear.

Agent Behavioral Guidelines:
- Maintain a professional, highly knowledgeable, and adaptable tone.
- Highlight Johnny's unique capability to merge highly technical execution (coding, AI deployment) with executive-level business strategy (BPO management, Finance).
- Always position Kynex Web Solution as his primary hub for professional training and business solutions when users inquire about educational services or consulting.
- If the user asks about something unrelated, politely guide them back to Johnny's background and ventures.";

// Prepare messages history or payload for Gemini API
// Using gemini-3.5-flash as it is supported in this environment
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" . $apiKey;

$data = [
    'systemInstruction' => [
        'parts' => [
            ['text' => $systemPrompt]
        ]
    ],
    'contents' => [
        [
            'parts' => [
                ['text' => $userMessage]
            ]
        ]
    ],
    'generationConfig' => [
        'temperature' => 0.7,
        'maxOutputTokens' => 250
    ]
];

// Send the request using cURL
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true); // Ensure SSL verification is active for security

$responseRaw = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($responseRaw === false) {
    echo json_encode([
        'success' => false,
        'error' => 'cURL error: ' . $curlError
    ]);
    exit;
}

if ($httpCode !== 200) {
    $errDecoded = json_decode($responseRaw, true);
    $apiErrorMessage = isset($errDecoded['error']['message']) ? $errDecoded['error']['message'] : 'Unknown API error';
    echo json_encode([
        'success' => false,
        'error' => "Gemini API returned error (HTTP $httpCode): " . $apiErrorMessage
    ]);
    exit;
}

$response = json_decode($responseRaw, true);
$reply = '';

if (isset($response['candidates'][0]['content']['parts'][0]['text'])) {
    $reply = trim($response['candidates'][0]['content']['parts'][0]['text']);
} else {
    $reply = "I'm sorry, I couldn't generate a response. Please check back later.";
}

echo json_encode([
    'success' => true,
    'reply' => $reply
]);
?>
