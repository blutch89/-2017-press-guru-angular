<?php

namespace UserBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use FOS\UserBundle\Entity\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use PressBundle\Entity\Tag;
use PressBundle\Entity\Article;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser {

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    
    /**
     * @ORM\OneToMany(targetEntity="PressBundle\Entity\Article", mappedBy="owner")
     */
    private $articles;
    
    /**
     * @ORM\OneToMany(targetEntity="PressBundle\Entity\Tag", mappedBy="owner")
     */
    private $tags;
    

    public function __construct() {
        parent::__construct ();
        
        $this->articles = new ArrayCollection();
    }
    
    // Permet d'utiliser l'email en tant que username
    public function setEmail($email) {
         parent::setEmail($email);
         $this->setUsername($email);
    }
    
    public function getArticles() {
        return $this->articles;
    }
    
    public function addArticle(Article $article) {
        $this->articles[] = $article;
        $article->setOwner($this);
        
        return $this;
    }
    
    public function removeArticle(Article $article) {
        $this->articles->removeElement($article);
        
        return $this;
    }
    
    public function getTags() {
        return $this->tags;
    }
    
    public function addTag(Tag $tag) {
        $this->tags[] = $tag;
        $tag->setOwner($this);
        
        return $this;
    }
    
    public function removeTag(Tag $tag) {
        $this->tags->removeElement($tag);
        
        return $this;
    }

}