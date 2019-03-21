var stompClient = null;

function connect() {
    var socket = new SockJS('/jsa-stomp-endpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        $("#conversation").show();
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/hi', function (status) {
            showGreeting(JSON.parse(status.body).status);
        });
    });
}

function sendMessage(message) {
    stompClient.send("/jsa/hello", {}, JSON.stringify({'emotion': message}));
}

function showGreeting(message) {
    $("#hellos").append("<tr><td><img width='35px' src='" + chooseEmotion(message) + "'></td></tr>");
}

function chooseEmotion(message) {
    switch (message) {
        case 'haha':
            return '/resources/static/image/Haha-500px.gif';
        case 'love':
            return '/resources/static/image/Love-500px.gif';
        case 'sad':
            return '/resources/static/image/Sad-500px.gif';
        case 'wow':
            return '/resources/static/image/Wow-500px.gif';
        case 'angry':
            return '/resources/static/image/Angry-500px.gif';
        default:
            break;
    }
}

$(function () {
    connect();
    document.querySelectorAll('input[type="button"]').forEach(function (e) {
        e.addEventListener('click', function () {
            sendMessage(e.value);
        });
    });
});