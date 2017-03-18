<?php

namespace UserBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use UserBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;

use FOS\UserBundle\Util\TokenGenerator;

class RegistrationController extends Controller
{
    public function registerAction(Request $request)
    {
        $userManager = $this->container->get('fos_user.user_manager');
        $validator = $this->get('validator');
        $tokenGenerator = new TokenGenerator();
        $token = $tokenGenerator->generateToken();
        
        // Paramètres de requête
        $email = $request->request->get("email");
        $first = $request->request->get("first");
        $second = $request->request->get("second");

        // Test des mots de passes
        if ($first == "") {
            return $this->sendErrorMessage("Les mots de passes doivent être remplis.");
        }

        if ($first != $second) {
            return $this->sendErrorMessage("Les mots de passes ne correspondent pas.");
        }

        // Création de l'utilisateur
        $user = $userManager->createUser();
        $user->setEmail($email);
        $user->setPlainPassword($first);
        $user->setPassword("xxxx");             // J'inscris un mot de passe bidon afin que le validateur puisse valider le user sans qu'il retourne une erreur de mot de passe non rempli. Il sera ensuite remplacé par le vrai mot de passe encodé
        $user->setEnabled(false);
        $user->setRoles(array('ROLE_USER'));
        $user->setConfirmationToken($token);

        // Validation de l'utilisateur
        $validationErrors = $validator->validate($user);

        if (count($validationErrors) > 0) {     // S'il y a des erreurs de validations
            return $this->sendErrorMessage($validationErrors[0]->getMessage());
        }

        try {
            // Persist l'utilisateur
            $userManager->updateUser($user, true);
            
            // Averti l'utilisateur par email avec un lien d'activation de l'utilisateur
            $this->get("user.mailer")->sendConfirmationEmailMessage($user);

            // Retourne la réponse
            return new JsonResponse([
                'success' => true
            ], 200);
        } catch(UniqueConstraintViolationException $e){     // S'il existe déjà
            return $this->sendErrorMessage("Cet utilisateur existe déjà.");
        } catch (\Exception $e) {                           // Toute autre exception
            return $this->sendErrorMessage("Une erreur inconnue s'est produite lors de l'enregistrement de l'utilisateur.");
        }
    }

    private function sendErrorMessage($errorMessage) {
        return new JsonResponse([
            'success' => false,
            'error' => $errorMessage
        ], 500);
    }
}
