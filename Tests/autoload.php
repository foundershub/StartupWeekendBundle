<?php

spl_autoload_register(function ($class) {
    if (strpos($class, 'Foundershub') === 0) {
        $parts = explode('\\', $class);
        array_shift($parts);
        require_once __DIR__ . '/../Foundershub/' . join(DIRECTORY_SEPARATOR, $parts) . '.php';
        return true;
    }
    return false;
});
