$(document).ready(() => {

    /** First, we save the current player name. */

    savePlayerName();

    /** Now, we are ready to generate the game. */

    if(window.location.href.indexOf("game") > -1 || window.location.href.indexOf("custom") > -1){
        let gameObj = new Game();
        gameObj.generateGame();
    } 

    /** Once the game is finished, we can show the ranking */

    if(window.location.href.indexOf("ranking") > -1){
        let rankingObj = new Ranking();
        rankingObj.runRanking();
    }

});