<?php

    namespace Framework\Core;

    use Framework\Logger\Log;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\PHPMailer;

    /**
     * Short Model Description
     *
     * Long Model Description
     *
     * @package            Framework\Core
     */
    class Email
    {
        protected static $mail;
        protected static $body;

        public static function init(array $settings = null)
        {
            self::$mail = new PHPMailer(true);
            /**
             * Server settings
             */
            self::$mail->SMTPDebug = 0;                                                                       // Enable verbose debug output
            self::$mail->isSMTP();                                                                            // Set mailer to use SMTP
            self::$mail->Host = MAILHOST;                                                                     // Specify main and backup SMTP servers
            self::$mail->SMTPAuth = MAILSMTP;                                                                 // Enable SMTP authentication
            self::$mail->Username = MAILUSER;                                                                 // SMTP username
            self::$mail->Password = MAILPASS;                                                                 // SMTP password
            self::$mail->SMTPSecure = MAILSMTPSECURE;                                                         // Enable TLS encryption, [ICODE]ssl[/ICODE] also accepted
            self::$mail->Port = MAILPORT;
            self::$mail->From = MAILFROMADDRESS;
            self::$mail->FromName = MAILFROMNAME;
        }

        private static function generateHeaders()
        {

        }

        private static function setAttachments(array $attachments = []): bool
        {
            /** Attachments */
            foreach ($attachments AS $attachment) {
                if (isset($attachment["file"])) {
                    $file = $attachment["file"];
                    $name = ($attachment["name"]) ? $attachment["name"] : null;

                    self::$mail->addAttachment($file, $name);
                }
            }

            return true;
        }

        private static function setContent(string $template = null, array $data = [])
        {

            if (!is_null($template)) {
                $filePath = EMAILS_PATH . "/$template" . ".phtml";
                if (file_exists($filePath)) {
                    ob_start();
                    include $filePath;
                    self::$body = ob_get_clean();

                    return true;
                }
            }

            return false;
        }

        private static function setRecipient(array $recipients = [])
        {
            if (isset($recipients) && count($recipients)) {
                foreach ($recipients AS $recipient) {
                    $email = $recipient["email"];
                    $name = $recipient["name"];
                    $type = $recipient["type"];

                    if ($type === "to") {
                        self::$mail->addAddress($email, $name);
                    } else if ($type === "cc") {
                        self::$mail->addCC($email, $name);
                    } else if ($type === "bcc") {
                        self::$mail->addBCC($email, $name);
                    } else {
                        Log::$debug_log->warn("Missing Type: $type");
                    }
                }

                return true;
            }

            return false;
        }

        private static function composeEmail(array $recipients, string $subject, string $template, array $attachments = [], array $data = [])
        {

            /** Content */

            $recipients = self::setRecipient($recipients);
            $content = self::setContent($template, $data);
            $attachments = self::setAttachments($attachments);

            self::$mail->isHTML(true);
            self::$mail->Subject = $subject;
            self::$mail->Body = self::$body;
            self::$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            if ($recipients && $content && $attachments) {
                return true;
            }

            return false;
        }

        public static function send(array $recipients, string $subject, string $template, array $attachments = [], array $data = [])
        {
            $continue = self::composeEmail($recipients, $subject, $template, $attachments, $data);
            if (!$continue) {
                return $continue;
            }
            try {
                self::$mail->send();

                return true;
            } catch (Exception $e) {
                $info = self::$mail->ErrorInfo;
                //echo "Message could not be sent. Mailer Error: {$info}";
                Log::$debug_log->trace($info);
                Log::$debug_log->error($e);

                return false;
            }

        }

    }
