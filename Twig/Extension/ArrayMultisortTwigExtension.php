<?php

namespace Foundershub\Bundle\StartupWeekendBundle\Twig\Extension;

/**
 * Twig filter for sorting the elements of an array by key
 */
class ArrayMultisortTwigExtension extends \Twig_Extension
{
    protected $env;

    public function getName()
    {
        return 'array_multisort';
    }

    public function getFilters()
    {
        return array('multisort' => new \Twig_Filter_Method($this, 'multisort'));
    }

    public function initRuntime(\Twig_Environment $env)
    {
        $this->env = $env;
    }

    public function multisort($array, $key, $reverse = false)
    {
        $extractKey = function ($element, $key) use (&$extractKey) {
            if (strpos($key, '.') === false) {
                return is_object($element) ? $element->$key : $element[$key];
            } else {
                list($parent, $childs) = explode('.', $key, 2);
                return $extractKey(is_object($element) ? $element->$parent : $element[$parent], $childs);
            }
        };

        $keys   = array_map(function ($el) use ($key, $extractKey) {
            return $extractKey($el, $key);
        }, $array);
        $sorted = array_map(function ($el) {
            return $el;
        }, $array);
        array_multisort($keys, $reverse ? SORT_DESC : SORT_ASC, $sorted);
        return $sorted;
    }


}
