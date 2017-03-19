<?php

namespace PressBundle\Handler;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;

/**
 * class AuthenticationFailureHandler
 *
 * @author Nicolas Macherey <nicolas.macherey@gmail.com>
 */
class AuthenticationFailureHandler implements AuthenticationFailureHandlerInterface
{
    /**
     * {@inheritdoc}
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        if ($exception->getMessage() == "User account is disabled.") {
            $response = new JsonResponse(['success' => false, "error" => "Account disabled"], 401);
        } else {
            $response = new JsonResponse(['success' => false], 401);    // TODO: supprimer la partie "data"
        }

        return $response;
    }
}