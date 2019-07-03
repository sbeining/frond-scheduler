<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ColorType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserProfileType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('username')
            ->add('displayName')
            ->add('title')
            ->add('about', TextareaType::class)
            ->add('color', ColorType::class)
            ->add('plainPassword', RepeatedType::class, [
                'type' => PasswordType::class,
                'invalid_message' => 'The password fields must match.',
                'required' => false,
                'first_options'  => ['label' => 'Password', 'attr' => ['autocomplete' => 'new-password']],
                'second_options' => ['label' => 'Repeat Password'],
            ])
            ->add('file', FileType::class, ['label' => 'Avatar', 'required' => false])
            ->add('twitch', UrlType::class, ['required' => false])
            ->add('youtube', UrlType::class, ['required' => false])
            ->add('twitter', UrlType::class, ['required' => false])
            ->add('instagram', UrlType::class, ['required' => false])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
