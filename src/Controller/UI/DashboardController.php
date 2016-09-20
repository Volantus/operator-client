<?php
namespace Volante\SkyBukkit\Monitor\Src\Controller\UI;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Bundle\FrameworkBundle\Templating\EngineInterface;
use Symfony\Component\HttpFoundation\Response;
use Volante\SkyBukkit\Monitor\Src\FlightStatus\NetworkStatus\NetworkStatusRepository;

/**
 * Class DashboardController
 * @package Volante\SkyBukkit\Monitor\Src\Controller\UI
 */
class DashboardController extends Controller
{
    /**
     * @var EngineInterface
     */
    private $TemplateEngine;

    /**
     * @var NetworkStatusRepository
     */
    private $networkStatusRepository;

    /**
     * DashboardController constructor.
     * @param EngineInterface $TemplateEngine
     * @param NetworkStatusRepository $networkStatusRepository
     */
    public function __construct(EngineInterface $TemplateEngine, NetworkStatusRepository $networkStatusRepository = null)
    {
        $this->TemplateEngine = $TemplateEngine;
        $this->networkStatusRepository = $networkStatusRepository ?: new NetworkStatusRepository();
    }

    /**
     * @return Response
     */
    public function show()
    {
        $networkStatus = $this->networkStatusRepository->get();
        return $this->TemplateEngine->renderResponse('dashboard.html.twig', ['activeItem' => 'dashboard', 'networkStatus' => $networkStatus]);
    }
}