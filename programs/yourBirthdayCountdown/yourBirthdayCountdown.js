$(document).ready(function () {
    let nextBirthday = "";
    $(".btn-primary").click(function (e) { 
        const name = $('#input-name').val();

        // dob = [year, month, day]
        const dob = $('#input-date').val().split('-');
        
        // dateNow = [month, day, year]
        const dateNow = new Date().toLocaleDateString().split('/');
        
        // exception if dob is in the future
        if (isBornInTheFuture(dob, dateNow)) {
            bornInFuture();
            return;
        }

        // add ordinal to the nextAge
        let nextAge = new Date().getFullYear() + 1 - dob[0];
        const ageLastDigit = nextAge % 10;
        nextAge = addOrdinal(nextAge, ageLastDigit);
        console.log(nextAge);

        // change the title
        $('#title').html(`${name}'s ${nextAge} Birthday Countdown`);

        // remove html
        $('.form').slideUp("slow");
        $('.btn-primary').slideUp("slow");

        // add html
        const times = ['days', 'hours', 'minutes', 'seconds'];
        for (let i = 0; i < times.length; i++) {
            let content = $('<div></div>').attr('class', 'box');
            const time = $('<h1></h1>').attr({
                'class': 'display-2 timer',
                'id': times[i]
            }).text('0');
            const temp = capitalizeFirstLetter(times[i]);
            const txt = $('<p></p>').attr('class', 'lead txt').text(temp);
            $(content).append(time);
            $(content).append(txt);

            $('#content').append(content);
        }
        $('#content').addClass('text-center');
        
        // set dob to date string
        nextBirthday = convertToDate(dob);
        console.log(nextBirthday);


    });
    setInterval(countdown, 1000);

    function isBornInTheFuture(dob, dateNow) {
        if (dob[0] > dateNow[2]) {
            return true;
        } else if (dob[0] == dateNow[2] && dob[1] > dateNow[0]) {
            return true;
        } else if (dob[1] == dateNow[0] && dob[2] > dateNow[1]) {
            return true;
        }
        return false;   
    }

    function addOrdinal(num, condition) {
        switch (condition) {
            case 1:
                num += "st";
                break;
            case 2:
                num += "nd";
                break;
            case 3:
                num += "rd";
                break;
            default:
                num += "th";
                break;
        }
        return num;
    }

    function convertToDate(arrDate) {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        let ans = arrDate[2] + " ";
        ans += months[arrDate[1]-1] + " ";
        ans += new Date().getFullYear() + " ";
        ans += "00:00:00";
        return ans;
    }

    function countdown() {
        const now = new Date().getTime();
        const distance = new Date(nextBirthday).getTime() - now;
        
        const days = Math.floor(distance / 1000 / 3600 / 24);
        const hours = Math.floor(distance / 1000 / 3600 % 24);
        const minutes = Math.floor(distance / 1000 / 60 % 60);
        const seconds = Math.floor(distance / 1000 % 60);
        
        $('#days').html(days);
        $('#hours').html(hours);
        $('#minutes').html(minutes);
        $('#seconds').html(seconds);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let notLotAdded = false;
    function bornInFuture() {
        if (notLotAdded) isNotLotAdded();
        let text1 = $("<p>Tabe' belum pki lahir sodara :)</p>").attr({
            "class": "lead text-center",
            "id": "text-1"
        });
        let text2 = $("<p>Tolong input sesuai tanggal lahirta</p>").attr({
            "class": "lead text-center",
            "id": "text-2"
        });
        $('.modal-submit-text').prepend(text1, text2);

        let btnClose = $("<a></a>").attr({
            "id": "btn-close",
            "class": "btn btn-secondary"
        }).text("Close");
        $(".modal-submit-footer").append(btnClose);

        $('#btn-close').click(function (e) { 
            e.preventDefault();
            closeModal();
        });
        showModal();
        notLotAdded = true;
    }
    
    function showModal() {
        $('#modal-submit').fadeIn("slow");
        $('body').css('overflow', 'hidden');
        $('body').css('marginRight', '16px');
    }

    function closeModal() {
        $('#modal-submit').fadeOut("slow");
        $('body').css('overflow', 'auto');
        $('body').css('marginRight', '0');
    }

    function isNotLotAdded() {
        $('.modal-submit-text .lead').remove();
        $('.modal-submit-footer .btn').remove();
    }
});