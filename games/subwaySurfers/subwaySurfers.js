$(function () {
    const character = document.getElementById("character");
    const block = document.getElementById("block");
    const score = document.getElementById("score");
    let scoreCount = 0;

    let charLeftPosition = parseInt($(character).css("left"));
    function moveLeft() {
        charLeftPosition -= 100;
        $(character).css("left", charLeftPosition);
        console.log(charLeftPosition);
    }
    function moveRight() {
        charLeftPosition += 100;
        $(character).css("left", charLeftPosition);
        console.log(charLeftPosition);
    }

    //char event
    $(document).keydown(function(e){
        if (e.which == 37) {
            if (charLeftPosition > 0) moveLeft();
        } else if (e.which == 39) {
            if (charLeftPosition < 200) moveRight();
        }        
    });

    // block event
    block.addEventListener('animationiteration', () => {
        let randNum = Math.floor(Math.random() * 3);
        $(block).css("left", randNum * 100);
    })

    // game event
    $(".btn-start").click(function (e) { 
        e.preventDefault();
        $(block).addClass("block-slide");
        $(".btn-start").fadeOut();

        const gameplay = setInterval(() => {
            let charLeft = parseInt($(character).css("left"));
            let blockLeft = parseInt($(block).css("left"));
            let blockTop = parseInt($(block).css("top"));
            
            if (charLeft == blockLeft && blockTop < 500 && blockTop > 300) {
                $(block).css("animation", "none");
                clearInterval(gameplay);
                $("#hide").fadeOut();
                lose();
            }
            $(score).text(++scoreCount);
    
        }, 100)
    });
    
    // modal ================================
    function lose() {
        let text1 = $("<p>Game Over &#x2639;</p>").attr({
            "class": "lead text-center",
            "id": "text-1"
        });
        let text2 = $(`<p>Score kamu &rarr; ${scoreCount}</p>`).attr({
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
