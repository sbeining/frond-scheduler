<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/bot_plot")
 */
class BotPlotController extends AbstractController
{
    /**
     * @Route("/{urlSecret}", name="bot_plot_index")
     */
    public function index(User $user): Response
    {
        return $this->render('bot_plot/index.html.twig', [
            'user' => $user,
        ]);
    }
}

