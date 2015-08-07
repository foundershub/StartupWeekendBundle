// Eventify, Responsive HTML5 Event Template - Version 1.1 //

// Javascripts //
$(document).ready(function () {

    // Top Bar //
    $('.top-bar nav').addClass('hidden');
    $('.menu-link').on('click', function (
        e) {
        e.preventDefault();
        $('.top-bar nav').toggleClass(
            'hidden');
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() <= 50) {
            $('.top-bar').removeClass('alt')
        } else {
            $('.top-bar').addClass('alt')
        }
    });
    $(window).load(function () {
        if ($(window).scrollTop() <= 30) {
            $('.top-bar').removeClass('alt')
        } else {
            $('.top-bar').addClass('alt')
        }
    });

    // Calculate the viewport height //
    var viewHeight = $(window).height();
    $("#intro").css({
        'height': viewHeight
    });
    $(window).on('resize', function () {
        var viewHeight = $(window).height();
        $("#intro").css({
            'height': viewHeight
        });
    });

    // Flexslider
    // Can also be used with $(document).ready()
    $('.flexslider').flexslider({
        animation: "slide"
    });

    // Tabs //
    $('#schedule-tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    })

    // Tooltip //
    $("[rel=tooltip]").tooltip();
    $("[data-rel=tooltip]").tooltip();

    //.parallax(xPosition, speedFactor, outerHeight) options:
    //xPosition - Horizontal position of the element
    //inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
    //outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
    $('#intro').parallax("50%", 0.1);
    $('#venue').parallax("50%", 0.02);

    // Toggle //
    $('.toggle-item-title').click(function () {
        $(this).next().slideToggle();
        $(this).toggleClass(
            'ui-state-active');
    });

    // Countdown //
    $('#countdown').countdown({
        until: new Date(2015, 9 - 1, 25, 18, 0, 0), // new Date(year, mth - 1, day, hr, min, sec) - date/time to count down to
        // or numeric for seconds offset, or string for unit offset(s):
        // 'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds
        // until: '-1m +1d', for demo
        timezone: 2, // The timezone (hours or minutes from GMT) for the target times, or null for client local
        layout: '{d<}<div class="span3"><div class="digit-container">{dn}<span class="label-container">{dl}</span></div></div>{d>}{h<}<div class="span3"><div class="digit-container">{hn}<span class="label-container">{hl}</span></div></div>{h>}{m<}<div class="span3"><div class="digit-container">{mn}<span class="label-container">{ml}</span></div></div>{m>}{s<}<div class="span3"><div class="digit-container">{sn}<span class="label-container">{sl}</span></div></div>{s>}',
        timeSeparator: '', // Separator for time periods
        isRTL: false, // True for right-to-left languages, false for left-to-right
        format: 'dHMS', // Format for display - upper case for always, lower case only if non-zero,
        // 'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds
        alwaysExpire: true, // True to trigger onExpiry even if never counted down
        onExpiry: liftOff // Callback when the countdown expires -
        // receives no parameters and 'this' is the containing division
    });
    // Functions if countdown timer runs out:
    function liftOff() {
        $('.hasCountdown').css({
            display: 'none'
        });
        $('#countdown').addClass('hidden');
        $('#register-button').addClass('hidden');
        $('.register-title').addClass('hidden');
        $('.register-box').append('<h2>We are at capacity and can no longer accept registrations.</h2>');
        $('.register-box').append('<button class="btn btn-large btn-primary disabled" disabled="true" id="register-button">Sold Out</button>');
    }

    // Twitter Feed //
    $('.tweet').twittie({
        dateFormat: '%B %d, %Y',
        template: '<div class="date">{{date}}</div> {{tweet}}',
        count: 3, // define the number of tweets to be displayed, if it's one, read the lines below
        hideReplies: true
    });
    // if you want to display only one tweet, please remove the following lines:
    // if so, don't forget you need to change style.css line 1036 display property to display: block;
    setInterval(function () {
        var item = $('.tweet ul').find('li:first');
        item.animate({
            'opacity': '0'
        }, 1000, function () {
            $(this).detach().appendTo('.tweet ul').removeAttr('style');
        });
    }, 12000);

    // Google Map //
    $('#map_canvas').gmap({
        'center': new google.maps.LatLng(50.109581, 8.668941), // Change this to your desired latitude and longitude
        'zoom': 13,
        'mapTypeControl': false,
        'navigationControl': false,
        'streetViewControl': false,
        // 'styles': [{
        //  stylers: [{
        //      gamma: 0.60
        //  }, {
        //      hue: "#5DBEB2"
        //  }, {
        //      invert_lightness: false
        //  }, {
        //      lightness: 2
        //  }, {
        //      saturation: -20
        //  }, {
        //      visibility: "on"
        //  }]
        // }]
        // style from:
        // https://snazzymaps.com/style/1861/two-tone-with-labels
        'styles':
[
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text",
        "stylers": [
            {
                "saturation": "18"
            },
            {
                "lightness": "-55"
            },
            {
                "visibility": "simplified"
            },
            {
                "color": "#4484a1"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "saturation": "28"
            },
            {
                "lightness": "42"
            },
            {
                "gamma": "2.01"
            },
            {
                "weight": "1"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#aaced9"
            },
            {
                "visibility": "on"
            }
        ]
    }
]
});
    var image = {
        url: '/bundles/foundershubstartupweekend/images/marker.png', // Define the map marker file here
        // This marker is 51 pixels wide by 63 pixels tall.
        size: new google.maps.Size(51, 63),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at 26,63.
        anchor: new google.maps.Point(26, 63)
    };
    $('#map_canvas').gmap().bind('init', function () {
        $('#map_canvas').gmap('addMarker', {
            'id': 'marker-1',
            'position': '50.109581,8.668941',
            'bounds': false,
            'icon': image
        }).click(function () {
            $('#map_canvas').gmap('openInfoWindow', {
                'content': '<h4>Deutsche Bahn Silver Tower</h4><p><strong>Jürgen-Ponto-Platz 1</strong><br>60329 Frankfurt am Main, Germany</p>'
            }, this);
        });
    });
    // end
});

// Schedule
$(document).ready(function () {
    // Schedule

    function parseTime(timeStr, dt) {
    if (!dt) {
        dt = new Date();
    }

    var time = timeStr.match(/(\d+)(?::(\d\d))?\s*(p?)/i);
    if (!time) {
        return NaN;
    }
    var hours = parseInt(time[1], 10);
    if (hours == 12 && !time[3]) {
        hours = 0;
    }
    else {
        hours += (hours < 12 && time[3]) ? 12 : 0;
    }

    dt.setHours(hours);
    dt.setMinutes(parseInt(time[2], 10) || 0);
    dt.setSeconds(0, 0);
    return dt;
    }

    function compare(a,b) {
      if (parseTime(a.dataset.time) < parseTime(b.dataset.time))
        return -1;
      if (parseTime(a.dataset.time) > parseTime(b.dataset.time))
        return 1;
      return 0;
    }

    // event_list = e.g. class="events_day_3"
    function sortArrayByDate(event_list, event_section_id) {
        var array_events = [];

        $('.' + event_list).each(function(key, value) {
            array_events.push(value);
        })

        //Sorts by date
        array_events.sort(compare);

        $('.' + event_list).each(function(key, value) {
            $('#' + event_section_id).append(array_events[key]);
        });
    }

    sortArrayByDate('events_day_1', 'event-section-1');
    sortArrayByDate('events_day_2', 'event-section-2');
    sortArrayByDate('events_day_3', 'event-section-3');
});
