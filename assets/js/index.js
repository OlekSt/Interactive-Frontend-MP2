/* Modal loading on page loading 
The code was taken from https://www.tutorialrepublic.com/codelab.php?topic=faq&file=show-bootstrap-modal-on-page-load */ 

/* Array of images from assets/images/random folder  --  index.html div id="card-images" */
var images = [];
const easyCards = ["card01","card02","card03","card04"],
 mediumCards = ["card_1","card_2","card_3","card_4","card_5","card_6"],
 hardCards = ["card1","card2","card3","card4","card5","card6","card7","card8","card9"],
 randomImageArr = ["alice", "cat", "dodo", "caterpillar", "queen", "twins", "king", "madhatter", "oysters"];


/* Choosing difficulty level and closing the modal   */
let modal = document.getElementById('myModal'),
 imageE = document.getElementById('imageE'),
 imageM = document.getElementById('imageM'),
 imageH = document.getElementById('imageH'),
 main = document.getElementById('main'),
 playerBoard = document.getElementById('player-board'),
 board, // Reference from Level divs to cardsArrays[easyCards, mediumCards, HardCards]
 clicksCounterEasy = 4,
 clicksCounterMedium = 6,
 clicksCounterHard = 9,
 speed = 400,
 level,
 score = 0;

/* Initial page load with level images, Difficulty level choice function, which generates randomly 4/6/9 pics  */
$(document).ready(function(){
    $(".level-image").on("click", function() {    
        let levelImg = $(this).attr("id");
        if (levelImg === "imageE") { b = easyCards, a = b.length, level = "#game-board-easy" };
        if (levelImg === "imageM") { b = mediumCards, a = b.length, level = "#game-board-medium" }; 
        if (levelImg === "imageH") { b = hardCards, a = b.length, level = "#game-board-hard" }; 
        $('#myModal').hide();
        $("#main, #player-board").show();
        $(level).show(); // shows level game cards board - 4, 6 or 9 cards
        randomPics(a,b); // generates random images into game cards
        $(".game-card, .card-image").css({"pointer-events": "none"}); // makes cards unclickable till Play button is clicked
        board = b;
        return board, level;
    }); 
});  

/* Switching between difficulty levels on the player info board  */
$(".info-level-image").on("click", function() { 
        let currentBoard;
        if (board.length === 4) currentBoard = "#game-board-easy";
        if (board.length === 6) currentBoard = "#game-board-medium"; 
        if (board.length === 9) currentBoard = "#game-board-hard"; 
        
        index = 0; // while loop removes images from the board to be closed, so that if it is reopened, images are not double inserted
        while (index < board.length) { 
            card = board[index];
            $("#" + card).find("img:last").remove();
        index++;    
        }
        $(currentBoard).hide(); // current card board is hidden
        
        let levelImg = $(this).attr("id");
        if (levelImg === "pic_E") { b = easyCards, a = b.length, level = "#game-board-easy" };
        if (levelImg === "pic_M")  { b = mediumCards, a = b.length, level = "#game-board-medium" }; 
        if (levelImg === "pic_H") { b = hardCards, a = b.length, level = "#game-board-hard" }; 
        board = b;
        $(level).show(); //  new card board is shown
        images = [];
        rabbitRun = [];
        followRabbit = [];
        score = 0;  // Score count to zero upon level switch
        $("#score").text(score); 
        // Below: makes PlayButton active, in case it was clicked on any board, then levels switched, 
        //  and switched back to the first board, so PlayButton does not stay deactivated
        $(".btn-play").prop("disabled",false).removeClass("btn-outline-success").addClass("btn-success"); 
        randomPics(a,b); // inserts new set of randomly generated images into the new card board "level"
        return board;
});  

/* Function inseriting random pictures into game cards */
function randomPics(a,b) {    
    let i = 0;
    while (i < a) { 
        let n = Math.floor(Math.random() * randomImageArr.length);
        if (images.indexOf(n) < 0) {
        images.push(n);
        i++;
        }
    }
    
    let index = 0;
    while (index < images.length) {   
        let imgToPlace = document.getElementById(randomImageArr[ images [index] ]);
        let img = imgToPlace.cloneNode(true);
        document.getElementById(b[index]).appendChild(img); 
        index++;
    }
    return images;
}

/* Function calculates a random pattern to insert WhiteRabbit image across game cards */
let rabbitRun = [];
$(".btn-play").on("click", function() {    
    let btnId = $(this).attr("id");
    if (btnId === "btn-play-easy") { b = easyCards, a = easyCards.length }; 
    if (btnId === "btn-play-medium") { b = mediumCards, a = mediumCards.length }; 
    if (btnId === "btn-play-hard") { b = hardCards, a = hardCards.length }; 
    
    let i = 0;
    while (i < a) { 
        let n = Math.floor(Math.random() * b.length);
        if (rabbitRun.indexOf(n) < 0) {
        rabbitRun.push(n);
        i++;
        }
    }
    
    // START - Code here was written with help from tutors: Stephen & Tim  
    let index = 0, 
     rabbitImg = $("#rabbit").clone();
     card = b[rabbitRun[index]];  
        $("#" + card).find("img:first").hide(); // hide the first image 
        $("#" + card).append($(rabbitImg)).show(); // append White Rabbit image and how him
    var myInterval = setInterval(function(){ 
        $("#" + card).find("img:last").remove(); // find White Rabbit image and remove him
        $("#" + card).find("img:first").show(); // find first image and show it 
            index++;
            card = b[rabbitRun[index]];
            
        $("#" + card).find("img:first").hide(); // hide the first image
        $("#" + card).append($(rabbitImg)).show(); // append White Rabbit image and hide it
        if  (index >= rabbitRun.length) {
            clearInterval(myInterval);
        }      
    }, speed);
    return rabbitRun;
    // finish - Code here was writtne with help from tutors: Stephen & Tim  
});

/*  Identifier, clicks from which difficulty level to capture, for followRabbit below  */
$(".board").on("click", function() {    
    let boardId = $(this).attr("id");
    if (boardId === "game-board-easy") { board = easyCards };
    if (boardId === "game-board-medium") { board = mediumCards };
    if (boardId === "game-board-hard") { board = hardCards };
});

/* Capturing players' clicks through game cards  */
let followRabbit = []; 
$(".game-card").on("click", function() {     
    if (followRabbit.length === images.length) 
        return followRabbit ;
    else 
        index = board.indexOf($(this).attr("id"));
        followRabbit.push(index);
});

/* Comparison of randomly generated White Rabbit run across game cards vs players' clicks  */
/* JSON.stringify code taken from here https://attacomsian.com/blog/javascript-compare-arrays */
$(".game-card").on("click", function() { 
    if (followRabbit.length === rabbitRun.length && JSON.stringify(followRabbit) === JSON.stringify(rabbitRun))
        {  displayModal("#win-modal-1", "#caughtMe"), console.log("#win-modal-1")};  
    /* if (score === 2) { 
        setTimeout(function() {
            displayModal("#win-modal-2", "#caughtMe"), console.log("#win-modal-2");
        }, 300)};  */
    if (followRabbit.length === rabbitRun.length && JSON.stringify(followRabbit) !== JSON.stringify(rabbitRun))
        { displayModal("#lose-modal, #rabbitIsGone") };
});

/* Delay in showing win-lose modal after last cards has been clicked */
function displayModal(id) {
    setTimeout(function() {
        $(id).modal("show")
    }, 300);
}

$(".rules-button").on("click", function() {
    $("#rules").modal("show");
});

/* Clicks countdown setup for a new game, for each game board  */
let clicksCounter;
$(".btn-play").on("click", function() {    
    $(this).prop("disabled",true).css({"color":"white"}).addClass("btn-outline-success");
    $(".btn-reset").prop("disabled",true);
    let btnId = $(this).attr("id");
    if (btnId == "btn-play-easy") { clicksCounter = clicksCounterEasy,
        setTimeout(function() {
            $(".game-card, .card-image").css({"pointer-events": "auto"});
            $(".btn-reset").prop("disabled",false);
        }, speed*4)}; // Delayed activation of game cards, so a player cannot click while Rabbit Run
    if (btnId == "btn-play-medium") { clicksCounter = clicksCounterMedium, 
        setTimeout(function() {
            $(".game-card, .card-image").css({"pointer-events": "auto"});
            $(".btn-reset").prop("disabled",false);
        }, speed*6)}; // Delayed activation of game cards, so a player cannot click while Rabbit Run
    if (btnId == "btn-play-hard") { clicksCounter = clicksCounterHard, 
        setTimeout(function() {
            $(".game-card, .card-image").css({"pointer-events": "auto"});
            $(".btn-reset").prop("disabled",false);
        }, speed*9)}; // Delayed activation of game cards, so a player cannot click while Rabbit Run
});

/* Resetting clicks countdown on closing the win-lose modal */
$(".btn-reset, .btn-modal, .info-level-image").on("click", function() {    
    if (board == easyCards) { clicksCounter = clicksCounterEasy }; 
    if (board == mediumCards) { clicksCounter = clicksCounterMedium };
    if (board == hardCards) { clicksCounter = clicksCounterHard };
    $('.click-counter').text(clicksCounter);
});

/* Cicks countdown while a player is clicking through cards */
$(".game-card").on("click", function() {
    clicksCounter--;
    let countedClicks = (clicksCounter);
    $('.click-counter').text(countedClicks);
});

/*
//Additing click reaction to a game card
$(".game-card").on("click", function() {
    let card = $(this).attr("id");
    $(card).css({"border":"orange solid 2px"});
    console.log(card);
    setTimeout(function() {
        $(card).css({"border":"white solid 2px"});
        console.log(card);
    }, 2000);
});  */

/* Resetting the whole game board on closing the win-lose modal */
$(".btn-reset, .btn-modal").on("click", function() {
        index = 0; 
        while (index < board.length) {
            card = board[index];
            $("#" + card).find("img:last").remove();
        index++;    
        }
        images = [];
        rabbitRun = [];
        followRabbit = [];
        $(".btn-play").prop("disabled",false).removeClass("btn-outline-success").addClass("btn-success");
        $(".game-card,.card-image").css({"pointer-events": "none"});
        randomPics(a,b);  
});  

/* Calculating score on closing modal */
$(".btn-modal").on("click", function() {
    let btn = $(this).attr("id");
    console.log(btn);
    if (btn == "modal-btn-win") { score++ }; 
    if ((btn == "modal-btn-lose" && score > 0)) { score-- };
    $("#score").text(score);    
});