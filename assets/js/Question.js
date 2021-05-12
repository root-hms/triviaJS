class Question{

    /** Constructor method..we are going to use the paramethers later.  */

    constructor(difficulty="",cat="",type=""){
        if(cat != 'any'){
            this.category = cat;
        }else{
            this.category="";
        }
        if(difficulty != 'any'){
            this.difficulty = difficulty;
        }else{
            this.difficulty = "";
        }
        if(type != 'any'){
            this.type = type;
        }else{
            this.type = "";
        }
    }
    
    async getQuestion(){

        /** Getting all the questions that matched with our criteria */  

        let url = `https://opentdb.com/api.php?amount=50&category=${this.category}&difficulty=${this.difficulty}&type=${this.type}&encode=base64`;

        return $.ajax( url, function() {})
        .then(function(data) {
            let index = Math.floor(Math.random() * data.results.length);
            let question = data.results[index];
            return question;
        })
        .fail(function() {
            console.log( "sorry, some error ocurred :(" );
        });
                    
    }

    showInformation(question){

        let answers = [];

        /** Generating the correct html for our questions & answers */

        /** NOTE: atob function use to decode base64 data, you'll see a lot of it */

        let divQuestion = $('#question')[0];

        let questionParagraph = $('#main-question')[0];
        questionParagraph.innerHTML = atob(question.question);
        
        let questionAnswerBox = $('#choices')[0];

        if(divQuestion){
            divQuestion.style.display = "block";
        }        

        /** On this answers array we save all the answers in order to show them later.  */

        answers.push(atob(question.correct_answer));

        //console.log(atob(question.correct_answer));
        
        question.incorrect_answers.forEach(answer => {
            answers.push(atob(answer));
        });

        while( answers.length != ''){
            let index = Math.floor(Math.random() * answers.length);
            let divElement = $('<div></div>').addClass("box")[0];
            divElement.append(answers[index]);
            if(questionAnswerBox){
                questionAnswerBox.append(divElement);
            }
            answers.splice(index, 1); 
        }

    }

    /** This method handles the score logic.  */

    validateScore(flag){

        let questionDiv = $('#question');      
        
        if(flag === true){

            let validationDiv = $('#validation-message');

            questionDiv.css('opacity','.4');
            validationDiv.css('display','block');

            if(localStorage.getItem('score')!='true'){

                if(this.difficulty === 'easy'){
                    let value = parseInt(localStorage.getItem('totalScore')) + 1;
                    localStorage.setItem('totalScore',value);
                }else if(this.difficulty === 'medium'){
                    let value = parseInt(localStorage.getItem('totalScore')) + 3;
                    localStorage.setItem('totalScore',value);
                }else{
                    let value = parseInt(localStorage.getItem('totalScore')) + 5;
                    localStorage.setItem('totalScore',value);
                }
                localStorage.setItem('score',true);
            }

            setTimeout(function(){ 
                localStorage.removeItem('score');
                window.location.href="../pages/game.html";
            }, 800);
            
        }else{

            let validationDiv = $('#validation-message-error');  
            questionDiv.css('opacity','.4');

            if($('#validation-message').css('display') != 'block'){
                validationDiv.css('display','block');
            }             

            setTimeout(function(){ 
                window.location.href="../pages/ranking.html?score=yes";
            }, 800);

        }

    }

}