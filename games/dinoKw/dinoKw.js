$(document).ready(function () {
    
    const character = document.getElementsByClassName('character')[0];
    const block = document.getElementsByClassName('block')[0];
    let blockMoving;
    let score = 0;
    let isStart = false;

    $(document).keydown(function(e){
        if (e.which == 38 || e.which == 32 ) {
            jump();
        }
    });

    $(window).keydown(function (e) { 
        if (e.which == 38 || e.which == 40)
            e.preventDefault();
    });

    //block animation
    $('.start').click(function (e) { 
        isStart = true;
        start();

        blockMoving = setInterval(() => {
            const blockPosNow = parseInt(window
                .getComputedStyle(block)
                .getPropertyValue('left')
            );
    
            // console.log(blockPosNow);
            if (blockPosNow <= 0) {
                $(block).fadeOut();
            } else {
                $(block).fadeIn();
            }
    
            checkDead();
        }, 10);
    });

    $('body').click(function (e) { 
        jump();
    });

    const scoreInterval = setInterval(() => {
        if (isStart)
            $('.score').text(`${++score}`);
    }, 750)

    function start() {
        $(block).addClass('block-moving');
        let scoreTxt = $('<h1>0</h1>').attr({
            'class': 'display-4 score' 
        });
        
        $('.content').append(scoreTxt);
        $('.start').fadeOut();
        
    }

    // masih ngebug
    // function slide() {
    //     $(character).addClass('character-slide');
    //     $(block).addClass('block-stay');
    //     setTimeout(() => {
    //         $(character).removeClass('character-slide');
    //         $(block).removeClass('block-stay');

    //     }, 1000);
    // }

    function jump() {
        // $(character).toggleClass('character-jump');
        if (isStart) {
            $(character).addClass('character-jump');
            setTimeout(() => {
                $(character).removeClass('character-jump');
            }, 500);
        }
    }

    function checkDead() {
        const charTop = parseInt(window
            .getComputedStyle(character)
            .getPropertyValue('top')
        );
        const blockLeft = parseInt(window
            .getComputedStyle(block)
            .getPropertyValue('left')
        );
        // console.log(`chartop =  ${charTop}\nblockleft = ${blockLeft}`)
        if (blockLeft < 30 && blockLeft > 0 && charTop >= 190) {
            $(block).css('animation', 'none');
            $(block).css('display', 'none');
            isStart = false;
            clearInterval(scoreInterval);
            clearInterval(blockMoving);
            lose();
        }
    }

    // modal ================================
    function lose() {
        let text1 = $("<p>You lose &#x2639;</p>").attr({
            "class": "lead text-center",
            "id": "text-1"
        });
        let text2 = $(`<p>Score kamu &rarr; ${score}</p>`).attr({
            "class": "lead text-center",
            "id": "text-2"
        });
        $('.modal-submit-text').prepend(text1, text2);

        let btnRetry = $("<a></a>").attr({
            "href": "",
            "class": "btn btn-secondary"
        }).text("Retry");
        $(".modal-submit-footer").append(btnRetry);

        showModal();
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
});