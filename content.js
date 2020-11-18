const dialog = document.querySelector("dialog");
dialog.showModal();
var audio_beep = new Audio();
audio_beep.src='sound.mp3';


const iframe = document.getElementById("alert_modal");
iframe.src = "gif/whale_eyealert.gif";



dialog.querySelector("#Btn_n").addEventListener("click", () => {
    window.close();
});

dialog.querySelector("#Btn_y").addEventListener("click", () => {
    dialog.close();
    exercise2();
});


function exercise2() {
    first.style.display='none';
    next.style.display = 'block';
    const dialog2 = document.querySelector('#next');

    dialog2.showModal();

    const img2 = document.getElementById("exercise_modal");
    img2.src = "gif/upa_text.gif";

    setTimeout(function () {
        audio_beep.play();
        img2.src ="gif/exercise1.gif";
    }, 5000);

    setTimeout(function () {
        img2.src = "gif/upa1.gif";
    }, 7800);

    setTimeout(function () {
        audio_beep.currentTime=0;
        audio_beep.play();
        img2.src = "gif/exercise2.gif";
    }, 12800);

    setTimeout(function () {
        img2.src ="gif/upa2.gif";
    }, 15600);

    setTimeout(function () {
        audio_beep.currentTime=0;
        audio_beep.play();
        img2.src = "gif/exercise3.gif";
    }, 20600);

    setTimeout(function () {
        img2.src = "gif/upa3.gif";
    }, 23400);

    setTimeout(function () {
        audio_beep.currentTime=0;
        audio_beep.play();
        img2.src = "gif/exercise4.gif";
    }, 28400);

    setTimeout(function () {
        img2.src = "gif/upa4.gif";
    }, 31200);

    setTimeout(function () {
        audio_beep.currentTime=0;
        audio_beep.play();
        img2.src = "gif/close_text.gif";
    }, 36200);

    setTimeout(function () {
        audio_beep.currentTime=0;
        audio_beep.play();
        img2.src = "gif/open_text.gif";
    }, 41400);

    setTimeout(function () {
        audio_beep.currentTime=0;
        audio_beep.play();
        img2.src = "gif/close_text.gif";
    }, 46400);

    setTimeout(function () {
        audio_beep.currentTime=0;
        audio_beep.play();
        img2.src = "gif/open_text.gif";
    }, 51400);

    setTimeout(function () {
        audio_beep.currentTime=0;
        audio_beep.play();
        img2.src = "gif/kkuk_text1.gif";
    }, 56400);

    setTimeout(function () {
        audio_beep.currentTime=0;
        audio_beep.play();
        img2.src ="gif/kkuk_text2.gif";
    }, 63400);

    setTimeout(function () {
        img2.src = "img/close.png";
    }, 70400);

    setTimeout(function () {
        dialog2.close();
        window.close();
    }, 73400);
}

