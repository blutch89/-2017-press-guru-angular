<?php

namespace PressBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Tag
 *
 * @ORM\Table(name="tags")
 * @ORM\Entity(repositoryClass="PressBundle\Repository\TagRepository")
 */
class Tag
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=40, unique=true)
     * @Assert\NotBlank(message="L'étiquette doit être remplie et comprise entre 2 et 40 caractères")
     * @Assert\Length(
     *      min = 2,
     *      max = 40,
     *      minMessage = "L'étiquette doit être remplie et comprise entre 2 et 40 caractères",
     *      maxMessage = "L'étiquette doit être remplie et comprise entre 2 et 40 caractères"
     * )
     */
    private $name;
    
    /**
     * @ORM\ManyToMany(targetEntity="Article", mappedBy="tags", cascade={"persist"})
     */
    private $articles;
    
    /**
     * @ORM\ManyToOne(targetEntity="UserBundle\Entity\User")
     * @ORM\JoinColumn(name="owner", referencedColumnName="id", nullable=true)
     */
    private $owner;


    // Constructeur
    public function __construct() {
        $this->articles = new ArrayCollection();
    }
    
    
    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Tag
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }
    
    public function getArticles() {
        return $this->articles;
    }
    
    public function addArticle(Article $article) {
        $this->articles[] = $article;
        $article->getTags()[] = $this;
        
        return $this;
    }
    
    public function removeArticle(Article $article) {
        $this->articles->removeElement($article);
        
        return $this;
    }

    /**
     * Set owner
     *
     * @param \UserBundle\Entity\User $owner
     * @return Tag
     */
    public function setOwner(\UserBundle\Entity\User $owner = null)
    {
        $this->owner = $owner;

        return $this;
    }

    /**
     * Get owner
     *
     * @return \UserBundle\Entity\User 
     */
    public function getOwner()
    {
        return $this->owner;
    }
}
