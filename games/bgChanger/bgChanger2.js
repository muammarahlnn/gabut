$(document).ready(function () {
    let isChanging = false;
    let rgb = {
        "red": 
        {
            "isClicked": false,
            "targetValue": 0,
            "currentValue": 0
        }, 
        "green": 
        {
            "isClicked": false,
            "targetValue": 0,
            "currentValue": 0
        },
        "blue":
        {
            "isClicked": false,
            "targetValue": 0,
            "currentValue": 0
        }
    };

    // if button clicked ==============================
    $('#btn-red').click(function (e) { 
        const numRed = $("<button></button>").attr({
            "class": "btn btn-danger",
            "id": "num-red"
        }).text(generateRandomNumber(10, 255));
        rgb.red.targetValue = numRed.html();
        $('#div-button').prepend(numRed);
        showLotNumber("#btn-red", "#num-red")

        rgb.red.isClicked = true;
        isChanging = isAllRGBClicked(rgb);

    });

    $('#btn-green').click(function (e) { 
        const numGreen = $("<button></button>").attr({
            "class": "btn btn-success",
            "id": "num-green"
        }).text(generateRandomNumber(10, 255));
        rgb.green.targetValue = numGreen.html();
        $('#btn-red').after(numGreen);
        showLotNumber("#btn-green", "#num-green")

        rgb.green.isClicked = true;
        isChanging = isAllRGBClicked(rgb);
    });

    $('#btn-blue').click(function (e) { 
        const numBlue = $("<button></button>").attr({
            "class": "btn btn-primary",
            "id": "num-blue"
        }).text(generateRandomNumber(10, 255));
        rgb.blue.targetValue = numBlue.html();
        $('#btn-green').after(numBlue);
        showLotNumber("#btn-blue", "#num-blue")

        rgb.blue.isClicked = true;
        isChanging = isAllRGBClicked(rgb);
    });
    

    // if range changing =====================================
    $("#range-red").on("input", function (e) {
        if (!isChanging) {
            buttonNotClicked();
            showModal();
        } else {
            rgb.red.currentValue = valueRange("#range-red", ".box-red");
            changeBgColorBody(
                isChanging, 
                rgb.red.currentValue,
                rgb.green.currentValue,
                rgb.blue.currentValue
            );
            console.log(rgb);   
        }
    });

    $("#range-green").on("input", function (e) {
        if (!isChanging) {
            buttonNotClicked();
            showModal();
        } else {
            rgb.green.currentValue = valueRange("#range-green", ".box-green")
            changeBgColorBody(
                isChanging, 
                rgb.red.currentValue,
                rgb.green.currentValue,
                rgb.blue.currentValue
            );
        }
    });

    $("#range-blue").on("input", function (e) { 
        if (!isChanging) {
            buttonNotClicked();
            showModal();
        } else {
            rgb.blue.currentValue = valueRange("#range-blue", ".box-blue")
            changeBgColorBody(
                isChanging, 
                rgb.red.currentValue,
                rgb.green.currentValue,
                rgb.blue.currentValue
            );
        }
    });

    // txt nyawa =======================================
    let nyawa = 3;
    let emotNyawa = setEmojiToText(nyawa);
    

    // if button submit clicked =================================
    $("#btn-submit").on("click", function (e) { 
        if (!isChanging) {
            buttonNotClicked();
            showModal();
        } else {
            if (rgb.red.currentValue == rgb.red.targetValue
                && rgb.blue.currentValue == rgb.blue.targetValue
                && rgb.green.currentValue == rgb.green.targetValue
            ) {
                menang();
            } else {
                if (nyawa-- === 0) kalah();
                else {
                    salah();
                    emotNyawa = setEmojiToText(nyawa);
                }
            }
        }
    });


    // ----------------------- function helper -----------------------
    function generateRandomNumber(start, end) {
        return Math.round(Math.random() * (end - start) + start);
    }

    function isAllRGBClicked(rgb) {
        let ans = true;
        for (let color in rgb)  {
            ans = ans && rgb[color].isClicked;
        }
        return ans;
    }

    function showLotNumber(btn, btnId) {
        $(btnId).hide();
        $(btn).hide("slow");
        $(btnId).show("slow");
    }
    
    function valueRange(rangeId, boxClass) {
        const value = $(rangeId).val();
        $(boxClass).html(Math.floor(value / 5) * 5);
        return value;
    }

    function changeBgColorBody(condition, ...args) {
        if (condition) {
            const color = `rgb(${args[0]}, ${args[1]}, ${args[2]})`
            $("body").css("backgroundColor", color);
            // console.log(color);
        }
    }

    function setEmojiToText(nyawa) {
        let temp = "";
        for (let i = 0; i < nyawa; i++) {
            temp += "&#x2764";
        }
        $('#emoji-nyawa').html(temp);
        return temp;
    }

    var notLotAdded = false;
    function buttonNotClicked() {
        if (notLotAdded) return;
        let text1 = $("<p>Kamu belum menekan button RGB :)</p>").attr({
            "class": "lead text-center",
            "id": "text-1"
        });
        let text2 = $("<p>Silahkan tekan ketiga button RGB yang telah disediakan</p>").attr({
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

    function menang() {
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

        let btnHome = $("<a></a>").attr({
            "href": "../../index.html",
            "class": "btn btn-primary"
        }).text("Home");
        $(".modal-submit-footer").append(btnRetry, btnHome);
        showModal();
    }

    function kalah() {
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
        $('.modal-submit-text').prepend(text1, text2);
        
        let btnRetry = $("<a></a>").attr({
            "class": "btn btn-secondary",
            "href": ""
        }).text("Retry");
        $(".modal-submit-footer").append(btnRetry);
        showModal();
    }

    function salah() {
        if (notLotAdded) {
            isNotLotAdded();
        }
        let text1 = $("<p>Duhhh &#x2639;</p>").attr({
            "class": "lead text-center",
            "id": "text-1"
        });
        let text2 = $("<p>Jawaban kamu belum tepat</p>").attr({
            "class": "lead text-center",
            "id": "text-2"
        });
        let answer = $(
            `</br><p>Red = ${rgb.red.currentValue} --> ${rgb.red.targetValue}</p>
            <p>Green = ${rgb.green.currentValue} --> ${rgb.green.targetValue}</p>
            <p>Blue = ${rgb.blue.currentValue} --> ${rgb.blue.targetValue}</p>`
        ).attr({
            "class": "lead text-center",
            "id": "text-answer"
        });

        $('.modal-submit-text').prepend(text1, text2);
        $('.modal-submit-text').append(answer);
        
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

    function isNotLotAdded() {
        $('.modal-submit-text .lead').remove();
        $('.modal-submit-footer .btn').remove();
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