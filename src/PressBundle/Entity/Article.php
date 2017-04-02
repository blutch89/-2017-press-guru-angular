<?php

namespace PressBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * Article
 *
 * @ORM\Table(name="articles")
 * @ORM\Entity(repositoryClass="PressBundle\Repository\ArticleRepository")
 * @UniqueEntity(fields={"link"}, message="Cet article existe déjà")
 */
class Article
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
     * @ORM\Column(name="title", type="text")
     * @Assert\NotBlank()
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="picture", type="string", length=255, nullable=true)
     */
    private $picture;

    /**
     * @var string
     *
     * @ORM\Column(name="link", type="text")
     * @Assert\NotBlank()
     */
    private $link;
    
    /**
     * @var string
     *
     * @ORM\Column(name="domain_name", type="string", length=255)
     */
    private $domainName;
    
    /**
     * @var string
     *
     * @ORM\Column(name="favicon", type="text", nullable=true)
     */
    private $favicon;
    
    /**
     * @var boolean
     *
     * @ORM\Column(name="archived", type="boolean")
     */
    private $archived;
    
    /**
     * @ORM\Column(name="creation_date", type="datetime")
     */
    private $creationDate;
    
    /**
    * @ORM\ManyToMany(targetEntity="Tag", inversedBy="articles", cascade={"persist"})
    */
    private $tags;
    
    /**
     * @ORM\ManyToOne(targetEntity="UserBundle\Entity\User")
     * @ORM\JoinColumn(name="owner", referencedColumnName="id", nullable=true)
     */
    private $owner;
    
    // Constructeur
    public function __construct() {
        $this->tags = new ArrayCollection();
        $this->creationDate = new \DateTime();
    }
    
    private function calculateDomainName() {
        $arrLink = parse_url($this->link);
        $host = $arrLink["host"];
        
        return $host;
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
     * Set title
     *
     * @param string $title
     * @return Article
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Article
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set picture
     *
     * @param string $picture
     * @return Article
     */
    public function setPicture($picture)
    {
        $this->picture = $picture;

        return $this;
    }

    /**
     * Get picture
     *
     * @return string 
     */
    public function getPicture()
    {
        return $this->picture;
    }

    /**
     * Set link
     *
     * @param string $link
     * @return Article
     */
    public function setLink($link)
    {
        $this->link = $link;
        $this->domainName = $this->calculateDomainName();

        return $this;
    }

    /**
     * Get link
     *
     * @return string 
     */
    public function getLink()
    {
        return $this->link;
    }
    
    public function setDomainName($domainName)
    {
        $this->domainName = $domainName;

        return $this;
    }
    
    public function getDomainName()
    {
        return $this->domainName;
    }
    
    public function setFavicon($favicon)
    {
        $this->favicon = $favicon;

        return $this;
    }
    
    public function getFavicon()
    {
        return $this->favicon;
    }
    
    public function getTags() {
        return $this->tags;
    }
    
    public function addTag(Tag $tag) {
        $this->tags[] = $tag;
        $tag->getArticles()[] = $this;
        
        return $this;
    }
    
    public function removeTag(Tag $tag) {
        $this->tags->removeElement($tag);
        
        return $this;
    }

    /**
     * Set archived
     *
     * @param boolean $archived
     * @return Article
     */
    public function setArchived($archived)
    {
        $this->archived = $archived;

        return $this;
    }

    /**
     * Get archived
     *
     * @return boolean 
     */
    public function getArchived()
    {
        return $this->archived;
    }

    /**
     * Set owner
     *
     * @param \UserBundle\Entity\User $owner
     * @return Article
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

    /**
     * Set creation_date
     *
     * @param \DateTime $creationDate
     * @return Article
     */
    public function setCreationDate($creationDate)
    {
        $this->creationDate = $creationDate;

        return $this;
    }

    /**
     * Get creation_date
     *
     * @return \DateTime 
     */
    public function getCreationDate()
    {
        return $this->creationDate;
    }
}
