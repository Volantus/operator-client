<?php
namespace Volante\SkyBukkit\Monitor\Src\FlightStatus\Network;

use Ratchet\ConnectionInterface;
use Volante\SkyBukkit\Monitor\Src\Subscription\Topic;

/**
 * Class Connection
 * @package Volante\SkyBukkit\Monitor\Src\FlightStatus\Network
 */
class Client
{
    /**
     * @var ConnectionInterface
     */
    private $connection;

    /**
     * @var Topic[]
     */
    private $subscriptions = [];

    /**
     * Client constructor.
     * @param ConnectionInterface $connection
     */
    public function __construct(ConnectionInterface $connection)
    {
        $this->connection = $connection;
    }

    /**
     * @return ConnectionInterface
     */
    public function getConnection(): ConnectionInterface
    {
        return $this->connection;
    }

    /**
     * @return Topic[]
     */
    public function getSubscriptions(): array
    {
        return $this->subscriptions;
    }
}