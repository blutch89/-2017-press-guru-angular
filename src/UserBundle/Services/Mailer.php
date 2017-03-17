<?php
namespace UserBundle\Services;

use Symfony\Component\HttpFoundation\Response;
use UserBundle\Entity\User;

class Mailer implements MailerInterface {
    
    private $mailer;
    private $templating;
    private $from;
    private $subject;
    private $activationLink;

    public function __construct($mailer, EngineInterface $templating, $from, $subject, $activationLink) {
        $this->mailer = $mailer;
        $this->templating = $templating;
        $this->from = $from;
        $this->subject = $subject;
        $this->activationLink = $activationLink;
    }

    public function sendConfirmationEmailMessage(User $user) {
        $body = $this->templating->render(
            "UserBundle::email.txt.twig",
            array("activation-link", $this->activationLink.$user->getConfirmationToken())
        );
        $this->sendEmailMessage($this->subject, $user->getEmail(), $body);
    }
    
    private function sendEmailMessage($subject, $to, $body) {
        $message = \Swift_Message::newInstance()
            ->setSubject($subject)
            ->setFrom($this->from)
            ->setTo($to)
            ->setBody($body);

        $this->mailer->send($message);
    }
}