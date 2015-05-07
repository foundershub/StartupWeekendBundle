<?php

namespace Foundershub\Bundle\StartupWeekendBundle\Controller;

use Dothiv\ValueObject\ClockValue;
use Foundershub\Bundle\StartupWeekendBundle\Exception\RuntimeException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/../vendor/abraham/twitteroauth/twitteroauth/twitteroauth.php';

/**
 * This controller provides the twitter stream for the social board.
 */
class TwitterFeedController
{

    /**
     * @var string
     */
    private $consumer_key;

    /**
     * @var string
     */
    private $consumer_secret;

    /**
     * @var string
     */
    private $oauth_access_token;

    /**
     * @var string
     */
    private $oauth_access_token_secret;

    /**
     * @var int
     */
    private $pageLifetime;

    /**
     * @var ClockValue
     */
    private $clock;

    /**
     * @param string     $consumer_key
     * @param string     $consumer_secret
     * @param string     $oauth_access_token
     * @param string     $oauth_access_token_secret
     * @param ClockValue $clock
     * @param int        $pageLifetime
     */
    public function __construct(
        $consumer_key,
        $consumer_secret,
        $oauth_access_token,
        $oauth_access_token_secret,
        ClockValue $clock,
        $pageLifetime
    )
    {
        $this->consumer_key              = $consumer_key;
        $this->consumer_secret           = $consumer_secret;
        $this->oauth_access_token        = $oauth_access_token;
        $this->oauth_access_token_secret = $oauth_access_token_secret;
        $this->clock                     = $clock;
        $this->pageLifetime              = $pageLifetime;
    }

    /**
     * @param Request $request
     *
     * @return Response
     *
     * @throws RuntimeException
     */
    public function twitterAction(Request $request)
    {
        $auth              = new \TwitterOAuth($this->consumer_key, $this->consumer_secret, $this->oauth_access_token, $this->oauth_access_token_secret);
        $auth->host        = "https://api.twitter.com/1.1/";
        $auth->decode_json = false;
        $stream            = $auth->get('statuses/user_timeline', ['count' => $request->get('count'), 'exclude_replies' => $request->get('exclude_replies')]);

        if (!$stream) {
            throw new RuntimeException('Failed to fetch Twitter stream.');
        }

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json; charset=utf-8');
        $response->headers->set('Expires', '-1');
        $response->setStatusCode(200);
        $response->setMaxAge(0);
        $response->setPublic();
        $response->setSharedMaxAge($this->pageLifetime);
        $response->setExpires($this->clock->getNow()->modify(sprintf('+%d seconds', $this->pageLifetime)));
        $response->setContent($stream);
        return $response;
    }
}
