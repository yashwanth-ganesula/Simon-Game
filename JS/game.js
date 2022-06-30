var colors=["green","red", "yellow","blue"];
var randomNumberList=[];
var gamePattern=[];
var userPattern=[];
var levelNumber=0;
// generate random number between 1 to 4
var gameStarted=false;

$(document).on('keypress',function(e) {
    // checking if space key is pressed
    if(e.which == 32 && gameStarted==false) {
        console.log('Space key pressed');
        // $(".headline").text("Level "+levelNumber);
        // $(".sub-heading").text("");
        displayLevel(levelNumber);
        nextPattern()
        gameStarted=true;
    }
    // if any other key then error warning
    else{
        playSound("wrong");
    }
});

$(".btn").click(function(e){
    var userChosenColor = e.target.id;
    userPattern.push(userChosenColor);
    console.log(userPattern);
    playSound(userChosenColor);
    checkPattern(userPattern.length-1);
});

function checkPattern(currentLevel){
    if (userPattern[currentLevel]=== gamePattern[currentLevel]){
        if(userPattern.length===gamePattern.length){
            setTimeout(function(){
                nextPattern();
            },1000);
        }
    }
    else{
        playSound("wrong");
    }
}

function nextPattern(){
    userPattern=[];
    levelNumber++;
    // $(".headline").text("Level "+levelNumber);
    // $(".sub-heading").text("");
    displayLevel(levelNumber);
    randomNumber= (Math.floor(Math.random() * 4)+1);
    console.log('Random number: '+randomNumber);
    gamePattern.push(colors[randomNumber-1]);
    playSound(colors[randomNumber-1]);
    console.log("game pattern: "+gamePattern);
}

// name parameter is always taking color as input
function playSound(name){
    console.log('playing --> ./sounds/'+name+'.mp3');
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
    if (name=="wrong"){
        document.querySelector("body").classList.add("wrong-key-pressed");
        setTimeout(function(){
            document.querySelector("body").classList.remove("wrong-key-pressed");
        },300);
        $(".headline").text("Game Over 😵‍💫");
        $(".sub-heading").text("Press space key to restart");
        startOver();
    }
    else{
        $("#" + name).addClass("pressed");
        setTimeout(function () {
            $("#" + name).removeClass("pressed");
        }, 100);
    }

}
function startOver(){
    levelNumber=0;
    gamePattern=[];
    gameStarted=false;
}
function displayLevel(levelNumber){
    if (levelNumber<=3){
        $(".headline").text("🔥 Level "+levelNumber+" 🔥");
    }
    else if(levelNumber<=6){
        $(".headline").text("🔥🔥 Level "+levelNumber+" 🔥🔥");
    }
    else if (levelNumber<=10){
        $(".headline").text("🔥🔥🔥🔥 Level "+levelNumber+" 🔥🔥🔥🔥");
    }
    else{
        $(".headline").text("Level "+levelNumber);
    }
    $(".sub-heading").text("");
}
