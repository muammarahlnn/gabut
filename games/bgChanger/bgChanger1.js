$(document).ready(() => {
    const colors = [
        "lightcoral",
        "salmon",
        "pink",
        "deeppink",
        "tomato",
        "yellow",
        "moccasin",
        "peachpuff",
        "khaki",
        "lavender",
        "orchid",
        "greenyellow",
        "lightgreen",
        "aqua",
        "azure",
        "cyan"
    ];

    // if button lot here is clicked
    let numLot = 0;
    $("#btn-lot").dblclick((e) => { 
        e.preventDefault();
        let numMustClicked = $("<p></p>").attr({
            "class": "lead",
            "id": "num-lot"
        }).text(generateRandomNumber(10, 25));
        numLot = numMustClicked.html();

        $("#btn-lot").slideUp("slow");
        $(".disabled").slideUp("slow");
        $(".disabled").after(numMustClicked);
        $("#num-lot").hide();
        $("#num-lot").fadeIn("slow");
    });

    // if button selected colors is clicked
    let selectedClicked = 0;
    $("#btn-clickme").click((e) => {
        e.preventDefault();
        if (numLot === 0) {
            notLot();
            showModal();
            return;
        }

        let color = colors[selectedClicked % colors.length];
        if (selectedClicked++ === 0 && randomClicked === 0) {
            $(".submit").before(setTextColor(color));
        } else {
            $("#p-color").text(color);
        }
        $("body").css("backgroundColor", color);
    });

    // if button random colors is clicked
    let randomClicked = 0;
    $("#btn-random").click(function(e) {
        e.preventDefault();
        if (numLot == 0) {
            let text;
            notLot(text);
            showModal();
            return;
        }

        const r = generateRandomNumber(1, 255);
        const g = generateRandomNumber(151, 255);
        const b = generateRandomNumber(1, 255);
        let color = `rgb(${r}, ${g}, ${b})`;

        if (randomClicked++ === 0 && selectedClicked === 0) {
            $(".submit").before(setTextColor(color));
        } else {
            $("#p-color").text(color);
        }
        $("body").css("backgroundColor", color);
    });

    // if button submit is clicked
    $('.submit').click(function (e) { 
        e.preventDefault();
        showModal();

        if (numLot == 0) {
            notLot();
        } else if (numLot == selectedClicked && numLot == randomClicked) {
            won();
        } else {
            lose();
        }
    });

    // == function =============================
    function setTextColor(text) {
        let para = $("<p></p>").attr({
            "class": "lead",
            "id" : "p-color"
        });

        $(para).text(text);
        return para;
    }

    function generateRandomNumber(start, end) {
        return Math.round(Math.random() * (end - start) + start);
    }

    let notLotAdded = false;
    function notLot() {
        if (notLotAdded) return;
        let text1 = $("<p>Kamu belum mengundi :)</p>").attr({
            "class": "lead text-center",
            "id": "text-1"
        });
        let text2 = $("<p>Silahkan undi angka anda pada button Lot here</p>").attr({
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
        notLotAdded = true;
    }

    function isNotLotAdded() {
        $('#text-1').remove();
        $('#text-2').remove();
        $('.modal-submit-footer .btn').remove();
    }


    function won() {
        if (notLotAdded) {
            isNotLotAdded();
        }
        let text1 = $("<p>Yeayyy &#x1F389;&#x1F389;&#x1F389;</p>").attr({
            "class": "lead text-center",
            "id": "text-1"
        });
        let text2 = $("<p>Kamu berhasil menyelesaikan level ini</p>").attr({
            "class": "lead text-center",
            "id": "text-2"
        });
        $('.modal-submit-text').prepend(text1, text2);

        
        let btnRetry = $("<a></a>").attr({
            "href": "",
            "class": "btn btn-secondary"
        }).text("Retry");

        let btnNextLevel = $("<a></a>").attr({
            "href": "bgChanger2.html",
            "class": "btn btn-primary"
        }).text("Next level");
        $(".modal-submit-footer").append(btnRetry, btnNextLevel);
    }

    function lose() {
        if (notLotAdded) {
            isNotLotAdded();
        }
        let text1 = $("<p>Yahhh &#x2639;&#x2639;&#x2639;</p>").attr({
            "class": "lead text-center",
            "id": "text-1"
        });
        let text2 = $("<p>Kamu gagal menyelesaikan level ini</p>").attr({
            "class": "lead text-center",
            "id": "text-2"
        });
        let answer = $(
            `</br><p>Selected colors = ${selectedClicked} --> ${numLot}</p><p>Random colors = ${randomClicked} --> ${numLot}</p>`
        ).attr("class", "lead text-center");

        $('.modal-submit-text').prepend(text1, text2);
        $('.modal-submit-text').append(answer);

        
        let btnRetry = $("<a></a>").attr({
            "class": "btn btn-secondary",
            "href": ""
        }).text("Retry");
        $(".modal-submit-footer").append(btnRetry);
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