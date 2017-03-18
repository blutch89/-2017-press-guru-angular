<?php

namespace YahtzeeBundle\DataFixtures\ORM;


use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use UserBundle\Entity\User;
use PressBundle\Entity\Tag;
use PressBundle\Entity\Article;

class LoadBasicsDatas implements FixtureInterface, ContainerAwareInterface
{
    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function load(ObjectManager $manager)
    {
        $userManager = $this->container->get('fos_user.user_manager');

        // --------- USERS ------------
        $user1 = $userManager->createUser();
        $user1->setEmail("gigon.thoma@gmail.com");
        $user1->setPlainPassword("1234");
        $user1->setEnabled(true);
        $user1->setRoles(array('ROLE_USER'));
        $userManager->updateUser($user1, true);


        // --------- TAGS -----------
        $tag1 = new Tag();
        $tag1->setName("Etiquette 1");
        $tag1->setOwner($user1);
        
        $tag2 = new Tag();
        $tag2->setName("Etiquette 2");
        $tag2->setOwner($user1);
        
        
        // --------- ARTICLES -----------
        $article1 = new Article();
        $article1->setTitle("Les premières étoiles trahies par leurs poussières");
        $article1->setDescription("Grâce à ALMA, des astronomes ont détecté une vaste quantité de poussière d’étoiles brillante au sein d’une galaxie qui nous apparaît telle qu’elle était lorsque l’Univers était encore jeune.");
        $article1->setPicture($article1->getTitle().".jpg");
        $article1->setLink("https://www.sciencesetavenir.fr/espace/univers/les-premieres-etoiles-trahies-par-leurs-poussieres_111147");
        $article1->setArchived(false);
        $article1->setOwner($user1);
        $article1->addTag($tag2);
        
        $article2 = new Article();
        $article2->setTitle("Un neurone géant déterminant dans l'émergence de la conscience ?");
        $article2->setDescription("Des chercheurs américains ont mis en évidence des neurones géants entourant le cerveau des souris. Issus d&#39;une zone très particulière du cerveau, ils pourraient être impliqués dans le phénomène de la conscience de soi.");
        $article2->setPicture($article1->getTitle().".jpg");
        $article2->setLink("https://www.sciencesetavenir.fr/sante/cerveau-et-psy/un-neurone-geant-determinant-dans-l-emergence-de-la-conscience_111033");
        $article2->setArchived(false);
        $article2->setOwner($user1);
        $article2->addTag($tag1)
            ->addTag($tag2);
        


        // --------- PERSIST ------------
        $manager->persist($user1);
        $manager->persist($article1);
        $manager->persist($article2);

        $manager->flush();
    }
}