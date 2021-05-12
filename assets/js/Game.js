class Game{

    /** Constructor method..we are going to use the questions object in several places.  */

    constructor(){
        this.questionObj;
    }   

    /** This method generates the blue line we can see on the main game page. */

    generateBoxLine(){

        let divElement = $('#game-container');

        if(divElement){
            divElement.css('display','block');
        }

    } 

    /** Same as above, but for the game page once you answered at least one question.
     *  This method was created for solve css issues. 
     */

    generateBoxLineStage(){

        let divElement = $('#game-container');
        let rectElement = $('rect');

        if(divElement){
            divElement.css('display','block');
        }

        if(rectElement){
            rectElement.css('animationDelay',".2s");
        }        

    }     

    /** This method loop until the element exist on the html, then return true. */
    
    waitUntilElementExist(element){
        return new Promise( resolve => {
            let checkExist = setInterval(function() {
                if ($(element).length > 0) {
                    clearInterval(checkExist);
                    resolve(true);
                }
            }, 100);
        });
    }

    /** Really important method, this will generate on screen the first question and 
      *  all the related configurations in order to work properly. */

    async generateCountDown(questionObj){

        let spanElement = $('#number-countdown');
        let question = await questionObj.getQuestion();

        if(spanElement.length > 0){

            let c = 3;

            var myfunc = setInterval(function() {

                if (c === 0) {
                    spanElement.empty().append('GO!');
                }else if(c === -1){
                    spanElement.addClass('d-none');
                    questionObj.showInformation(question);
                    clearInterval(myfunc);
                }else{
                    spanElement.empty().append(c);
                }

                c--;
                
            }, 1200);

        }

        this.generateBoxLine();

        return question;
        
    }

    /** Same as above,really important method, but in this case once you answered at least one question. */   

    async generateNewStage(questionObj){

        let spanElement = $('#number-countdown');
        let question = await questionObj.getQuestion();
        spanElement.addClass('d-none');
        questionObj.showInformation(question);
        this.generateBoxLineStage();
        return question;
        
    }   
    
    /** This method validates ifthe answer is correct or not. */ 

    async validateQuestion(question,questionObj){
        let divBoxes;
        let flag = await this.waitUntilElementExist('.box');
        if(flag){
            divBoxes = $('.box');
            if(localStorage.hasOwnProperty('isCustomGame')){
                questionObj.difficulty = atob(question.difficulty);
            }
            divBoxes.each((i,div) => {
                if($(div).text() === atob(question.correct_answer)){
                    $(div).click(() => {
                        $(div).css('backgroundColor','#47ba75');
                        questionObj.validateScore(true);
                        localStorage.setItem('playing',true);
                    });
                }else{
                    $(div).click(() => {
                        $(div).css('backgroundColor','#de1200');
                        questionObj.validateScore(false);  
                        localStorage.setItem('playing',true);
                    });                                             
                }
            });
        }
    }

    /** This method starts the game at the very beginning. */

    async runGame(){

        let question;

        if(localStorage.getItem('playing')=='true'){
            question = await this.generateNewStage(this.questionObj);
        }else{
            question = await this.generateCountDown(this.questionObj);
        }
        
        this.validateQuestion(question,this.questionObj);
    }

    /** This method generate all the necesary in order to run the game. */

    generateGame(){

        if(window.location.href.indexOf("game") > -1) {

            let difficulty = getParams('difficulty');
    
            if(difficulty != null){
                localStorage.removeItem('playing');
                localStorage.setItem('difficulty',difficulty);
                localStorage.setItem('totalScore',0);
                localStorage.removeItem('category');
                localStorage.removeItem('type');
                localStorage.removeItem('isCustomGame');
                this.questionObj = new Question(difficulty);
            }else{
                if(localStorage.hasOwnProperty('isCustomGame')){
                    let diff = localStorage.getItem('difficulty');
                    let cat = localStorage.getItem('category');
                    let type = localStorage.getItem('type');
                    this.questionObj = new Question(diff,cat,type);
                }else{
                    let diff = localStorage.getItem('difficulty');
                    this.questionObj = new Question(diff);
                }
            } 
    
            this.runGame();

        } 

        if(window.location.href.indexOf("custom") > -1) {

            $("#submit").click(function(e){

                e.preventDefault();

                let difficulty = $("#difficulty").val();
                let category = $("#category").val();
                let type = $("#type").val();

                if(difficulty === 'any'){
                    difficulty = "";
                }
                if(category === 'any'){
                    category = "";
                }    
                if(type === 'any'){
                    type = "";
                }                                              

                localStorage.setItem('difficulty',difficulty);
                localStorage.setItem('category',category);
                localStorage.setItem('type',type);
                localStorage.setItem('isCustomGame',true);
                localStorage.setItem('totalScore',0);

                let url = `https://opentdb.com/api.php?amount=50&category=${category}&difficulty=${difficulty}&type=${type}&encode=base64`;

                return $.getJSON( url, function() {})
                .then(function(data) {
                    if(data.results.length < 1){
                        $('#custom-form').attr("style", "display: none !important");
                        $('#NoQuestion').css('display','flex');
                        setTimeout(function() {
                            window.location.href="../pages/custom.html";
                        }, 1500);                        
                    }else{
                        window.location.href="../pages/game.html";
                    }
                })              

            });

        }

    }    

}