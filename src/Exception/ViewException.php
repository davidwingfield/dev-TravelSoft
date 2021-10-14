<?php

    namespace Framework\Exception;

    use Exception;
    use Throwable;

    /**
     * ViewException
     *
     * Short Controller Description
     *
     * Long Controller Description
     *
     * @package         Application\Exception
     * @uses            used in prod env for logging all type of error of php code in a file for further debugging
     *                  and code performance
     */
    class ViewException extends Exception
    {
        public function __construct($message, $code = 0, Throwable $previous = null)
        {
            // some code

            // make sure everything is assigned properly
            parent::__construct($message, $code, $previous);
        }

        // custom string representation of object
        public function __toString()
        {

            return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
        }

        public function customFunction()
        {
            echo "A custom function for this type of exception\n";
        }

    }
