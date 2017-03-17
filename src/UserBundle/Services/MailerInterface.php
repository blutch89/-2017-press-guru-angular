<?php
namespace UserBundle\Services;

use UserBundle\Entity\User;

interface MailerInterface {
    public function sendConfirmationEmailMessage(User $user);
}
