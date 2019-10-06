<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use GuzzleHttp\Client;

/**
 * @Route("/live")
 */
class LiveController extends AbstractController
{
    /**
     * @Route("/", name="live_index")
     */
    public function index(): Response
    {
        $channels = [
            'whoamattberry',
            'keldamist',
            'bretmwxyz',
            'aiyekara',
            'vinikyu',
            'madagascarfan2005',
        ];

        $clientId = 'q6batx0epp608isickayubi39itsckt';

        $endpoint = 'https://api.twitch.tv/helix/streams';

        $client = new Client([
            'base_uri' => 'https://api.twitch.tv/helix/',
        ]);

        $response = $client->request('GET', 'streams', [
            'query' => $this->buildUserLoginsQuery($channels),
            'headers' => [
                'Client-ID' => $clientId,
            ],
        ]);

        $responseData = json_decode($response->getBody(), true);

        if (empty($responseData['data'])) {
            return $this->redirectToRoute('calendar_index');
        }

        return $this->render('live/index.html.twig', ['stream' => $responseData['data'][0]]);
    }

    private function buildUserLoginsQuery(array $userLogins): string
    {
        $paramName = 'user_login';

        $result = [];

        foreach ($userLogins as $userLogin) {
            $result[] = "{$paramName}={$userLogin}";
        }

        return implode('&', $result);
    }
}
