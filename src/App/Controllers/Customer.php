<?php

    namespace Framework\App\Controllers;

    use Framework\Core\Controller;

    /**
     * Short Customer Description
     *
     * Long Customer Description
     *
     * @package            Application\App
     * @subpackage         Controllers
     */
    class Customer extends Controller
    {
        public function __construct()
        {
            parent::__construct();
        }

        public function index()
        {
            $customers = [
                [
                    'name' => 'Tester',
                    'balance' => 120.00,
                ],
                [
                    'name' => 'Another Tester',
                    'balance' => 100.00,
                ],
            ];

            //echo "" . var_export($customers, 1) . "</pre>";
        }

    }
