<?php

namespace Foundershub\Bundle\StartupWeekendBundle\Tests\Twig\Extension;

use Foundershub\Bundle\StartupWeekendBundle\Twig\Extension\ArrayMultisortTwigExtension;

class ArrayMultisortTwigExtensionTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @test
     * @group StartupWeekendBundle
     * @group TwigExtension
     */
    public function itShouldBeInstantiable()
    {
        $this->assertInstanceOf('\Foundershub\Bundle\StartupWeekendBundle\Twig\Extension\ArrayMultisortTwigExtension', $this->createTestObject());
    }

    /**
     * @test
     * @depends itShouldBeInstantiable
     * @group   StartupWeekendBundle
     * @group   TwigExtension
     */
    public function itShouldSortAnArray()
    {
        $data   = array(
            array('a' => 'b'),
            array('a' => 'a'),
            array('a' => 'c'),
        );
        $sorted = $this->createTestObject()->multisort($data, 'a');
        $this->assertNotEquals($data, $sorted);
        $this->assertEquals($sorted, array(array('a' => 'a'), array('a' => 'b'), array('a' => 'c')));
    }

    /**
     * @test
     * @depends itShouldSortAnArray
     * @group   StartupWeekendBundle
     * @group   TwigExtension
     */
    public function itShouldSortRevers()
    {
        $data   = array(
            array('a' => 'b'),
            array('a' => 'a'),
            array('a' => 'c'),
        );
        $sorted = $this->createTestObject()->multisort($data, 'a', true);
        $this->assertNotEquals($data, $sorted);
        $this->assertEquals($sorted, array(array('a' => 'c'), array('a' => 'b'), array('a' => 'a')));
    }

    /**
     * @test
     * @depends itShouldSortAnArray
     * @group   StartupWeekendBundle
     * @group   TwigExtension
     */
    public function itShouldSortAnArrayByANestedKey()
    {
        $data   = array(
            array('a' => array('a' => '5', 'b' => 'a')),
            array('a' => array('a' => '1', 'b' => 'b')),
            array('a' => array('a' => '-100', 'b' => 'c')),
        );
        $sorted = $this->createTestObject()->multisort($data, 'a.a');
        $this->assertNotEquals($data, $sorted);
        $this->assertEquals($sorted, array(
            array('a' => array('a' => '-100', 'b' => 'c')),
            array('a' => array('a' => '1', 'b' => 'b')),
            array('a' => array('a' => '5', 'b' => 'a'))
        ));
    }

    /**
     * @test
     * @depends itShouldSortAnArrayByANestedKey
     * @group   StartupWeekendBundle
     * @group   TwigExtension
     */
    public function itShouldSortAnArrayOfObjectsByANestedKey()
    {
        $data   = array(
            (object)array('a' => (object)array('a' => '5', 'b' => 'a')),
            (object)array('a' => (object)array('a' => '1', 'b' => 'b')),
            (object)array('a' => (object)array('a' => '-100', 'b' => 'c')),
        );
        $sorted = $this->createTestObject()->multisort($data, 'a.a');
        $this->assertNotEquals($data, $sorted);
        $this->assertEquals($sorted, array(
            (object)array('a' => (object)array('a' => '-100', 'b' => 'c')),
            (object)array('a' => (object)array('a' => '1', 'b' => 'b')),
            (object)array('a' => (object)array('a' => '5', 'b' => 'a'))
        ));
    }

    /**
     * @return ArrayMultisortTwigExtension
     */
    protected function createTestObject()
    {
        return new ArrayMultisortTwigExtension();
    }
}
