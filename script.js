var Namespace = function(){};
var Meds = new Namespace();

// Variables
localStorage.lastTaken = localStorage.lastTaken || new Date().getTime();
Meds.lastTaken = parseInt(localStorage.lastTaken);
Meds.touchingTimer = null;
Meds.takenTimer = null;

Meds.runTimer = function() {
    $('#content').removeClass('urgent');
    var current = new Date().getTime();
    var timeAgo = '';
    var timePassed = current - Meds.lastTaken;
    var checkNext = 0;
    // < 1 minute
    if (timePassed < 60 * 1000) {
        timeAgo = 'a moment ago';
        checkNext = 60 * 1000;
    // < 1 hour
    } else if (timePassed < 60 * 60 * 1000) {
        timeAgo = 'a little bit ago';
        checkNext = 60 * 60 * 1000;
    // < 19 hours
    } else if (timePassed < 19 * 60 * 60 * 1000){
        timeAgo = 'a little while ago';
        checkNext = 19 * 60 * 60 * 1000;
    } else {
        timeAgo = 'a while ago';
        checkNext = false;
        $('#content').addClass('urgent');
    }

    if (checkNext) {
        Meds.timeout(checkNext);
    }
    Meds.showTime(timeAgo);
};

Meds.showTime = function(time) {
    $('span').text(time);
};

Meds.timeout = function(duration) {
    Meds.takenTimer = setTimeout(function() {
        Meds.runTimer();
    }, duration);
};

Meds.bindButton = function() {
    $('.touch').bind('touchstart', function() {
        $(this).addClass('touching');
        Meds.touchingTimer = setTimeout(Meds.takeMeds, 2000);
    });
    $('.touch').bind('touchend', function() {
        $(this).removeClass('touching');
        clearTimeout(Meds.touchingTimer);
    });
};

Meds.takeMeds = function() {
    $('.touch').removeClass('touching');
    $('#content').removeClass('urgent');
    Meds.lastTaken = new Date().getTime();
    localStorage.lastTaken = new Date().getTime();
    clearTimeout(Meds.takenTimer);
    Meds.runTimer();
};

$(function() {
    var functions = [
        Meds.runTimer,
        Meds.bindButton
    ];

    functions.forEach(function(fn) {
        fn();
    });
});
