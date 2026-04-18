<?php
// ============================================================
//  Jardicook — Handler formulaire de contact
//  Reçoit le POST, valide, envoie l'email, retourne du JSON
// ============================================================

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Autoriser uniquement les POST depuis le propre domaine
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
    exit;
}

// ---- Récupération & nettoyage des champs ----
function clean(string $value): string {
    return htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
}

$prenom    = clean($_POST['prenom']    ?? '');
$nom       = clean($_POST['nom']       ?? '');
$email     = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$telephone = clean($_POST['telephone'] ?? '');
$profil    = clean($_POST['profil']    ?? '');
$projet    = clean($_POST['projet']    ?? '');
$consent   = isset($_POST['consent']);

// ---- Validation ----
$errors = [];

if (empty($prenom))                          $errors[] = 'Prénom obligatoire.';
if (empty($nom))                             $errors[] = 'Nom obligatoire.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Adresse email invalide.';
if (empty($profil))                          $errors[] = 'Profil obligatoire.';
if (strlen($projet) < 20)                    $errors[] = 'Décrivez votre projet (20 caractères minimum).';
if (!$consent)                               $errors[] = 'Vous devez accepter l\'utilisation de vos données.';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// ---- Construction de l'email ----
$destinataire = 'contact@jardicook.fr';
$sujet        = '=?UTF-8?B?' . base64_encode('[Jardicook] Nouvelle demande de devis — ' . $prenom . ' ' . $nom) . '?=';

$corps  = "Nouvelle demande de devis reçue via jardicook.com\n";
$corps .= str_repeat('=', 60) . "\n\n";
$corps .= "Prénom    : $prenom\n";
$corps .= "Nom       : $nom\n";
$corps .= "Email     : $email\n";
$corps .= "Téléphone : " . ($telephone ?: 'Non renseigné') . "\n";
$corps .= "Profil    : $profil\n\n";
$corps .= "--- Projet ---\n$projet\n\n";
$corps .= str_repeat('=', 60) . "\n";
$corps .= "Envoyé le : " . date('d/m/Y à H:i') . "\n";

$entetes  = "From: noreply@jardicook.com\r\n";
$entetes .= "Reply-To: $email\r\n";
$entetes .= "MIME-Version: 1.0\r\n";
$entetes .= "Content-Type: text/plain; charset=UTF-8\r\n";
$entetes .= "Content-Transfer-Encoding: 8bit\r\n";

// ---- Envoi ----
$envoye = mail($destinataire, $sujet, $corps, $entetes);

if ($envoye) {
    // Email de confirmation au visiteur
    $sujet_confirm = '=?UTF-8?B?' . base64_encode('Votre demande Jardicook a bien été reçue') . '?=';
    $corps_confirm  = "Bonjour $prenom,\n\n";
    $corps_confirm .= "Nous avons bien reçu votre demande et vous répondrons sous 48 heures ouvrées.\n\n";
    $corps_confirm .= "Voici un récapitulatif de votre message :\n";
    $corps_confirm .= str_repeat('-', 40) . "\n";
    $corps_confirm .= $projet . "\n";
    $corps_confirm .= str_repeat('-', 40) . "\n\n";
    $corps_confirm .= "À très bientôt,\nL'équipe Jardicook\n";
    $corps_confirm .= "contact@jardicook.fr | jardicook.com\n";

    $entetes_confirm  = "From: Jardicook <contact@jardicook.fr>\r\n";
    $entetes_confirm .= "MIME-Version: 1.0\r\n";
    $entetes_confirm .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mail($email, $sujet_confirm, $corps_confirm, $entetes_confirm);

    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Votre demande a bien été envoyée.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur serveur. Veuillez réessayer ou nous écrire directement.']);
}
