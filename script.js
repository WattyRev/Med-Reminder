var Namespace = function(){};
var Meds = new Namespace();

// Variables
localStorage.lastTaken = localStorage.lastTaken || new Date().toDateString();
Meds.lastTaken = localStorage.lastTaken;
Meds.touchingTimer = null;
Meds.takenTimer = null;

Meds.checkStatus = function() {
    $('#content').removeClass('urgent');
    var current = new Date().toDateString();
    console.log(current, Meds.lastTaken);
    var message;
    if (current !== Meds.lastTaken) {
        message = 'You have not taken your meds yet today.';
        $('#content').addClass('urgent');
    } else {
        message = 'You have already taken your meds today.';
        $('#content').removeClass('urgent');
    }
    $('.message').text(message);
    Meds.timeout(Meds.timeUntilMidnight());
};

Meds.timeUntilMidnight = function() {
    var current = new Date();
    var numHours = 23 - current.getHours();
    var numMinutes = 59 - current.getMinutes();
    return (numHours * 60 + numMinutes) * 60 * 1000;
};

Meds.timeout = function(duration) {
    Meds.takenTimer = setTimeout(function() {
        Meds.checkStatus();
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
    Meds.lastTaken = new Date().toDateString();
    localStorage.lastTaken = new Date().toDateString();
    clearTimeout(Meds.takenTimer);
    Meds.checkStatus();
};

$(function() {
    var functions = [
        Meds.checkStatus,
        Meds.bindButton
    ];

    functions.forEach(function(fn) {
        fn();
    });
});
