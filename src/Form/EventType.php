<?php

namespace App\Form;

use App\Entity\Event;
use App\Entity\Category;
use App\Form\Type\TdDateTimeType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class EventType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('start', TdDateTimeType::class)
            ->add('end', TdDateTimeType::class)
            ->add('category', EntityType::class, [
                'class' => Category::class,
                'placeholder' => false,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Event::class,
        ]);
    }
}
