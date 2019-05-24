<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/event")
 */
class EventController extends AbstractController
{
    /**
     * @Route(".json", name="event_json", methods={"GET"})
     */
    public function indexJson(EventRepository $eventRepository): JsonResponse
    {
        $data = [];

        foreach ($eventRepository->findAll() as $event) {
            $data[] = [
                'title' => $event->getTitle(),
                'start' => $event->getStart(),
                'end' => $event->getEnd(),
            ];
        }

        return new JsonResponse($data);
    }
}
