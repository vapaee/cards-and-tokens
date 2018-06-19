<?php

namespace Vapaee\Provider;

use Vapaee\Services\DatabaseService as DatabaseService; 
use Silex\Application;
use Pimple\ServiceProviderInterface;
use Pimple\Container;

class DatabaseServiceProvider implements ServiceProviderInterface
{
    private $service = null;
    
    public function __construct() {
        $this->service = new DatabaseService();
    }    
    
    
    public function register(Container $app)
    {
        $app['db'] = function () use ($app) {            
            return $this->service;
        };
    }
    
    public function boot(Application $app) {}    
}
