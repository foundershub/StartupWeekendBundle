<?php

namespace Foundershub\Bundle\StartupWeekendBundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;

class FoundershubStartupWeekendExtension extends Extension implements PrependExtensionInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
        $loader->load('services.yml');
        $loader->load('controllers.yml');
        $loader->load('contentful.yml');
    }

    /**
     * Allow an extension to prepend the extension configurations.
     *
     * @param ContainerBuilder $container
     */
    public function prepend(ContainerBuilder $container)
    {
        $contentfulConfig = array();

        $contentfulConfig['thumbnails'] = array(
            array('label' => 'sponsor', 'width' => 200, 'height' => 200, 'exact' => true),
            array('label' => 'person', 'width' => 200, 'height' => 200, 'exact' => false),
        );
        $container->prependExtensionConfig('dothiv_contentful', $contentfulConfig);
    }
}
