$(document).ready(function () {
    $(".btn").click(function (e) { 
        e.preventDefault();
        $('#days').html("21");        
    });
    const thisYear = new Date().getFullYear();
    const newYear = `1 Jan ${thisYear + 1} 00:00:00`;
    function countdown() {
        const now = new Date().getTime();
        const distance = new Date(newYear).getTime() - now;
        
        const days = Math.floor(distance / 1000 / 3600 / 24);
        const hours = Math.floor(distance / 1000 / 3600 % 24);
        const minutes = Math.floor(distance / 1000 / 60 % 60);
        const seconds = Math.floor(distance / 1000 % 60);
        
        // console.log(`${days} : ${hours} : ${minutes} : ${seconds}`);
        $('#days').html(days);
        $('#hours').html(hours);
        $('#minutes').html(minutes);
        $('#seconds').html(seconds);
    }
    setInterval(countdown, 1000);

});