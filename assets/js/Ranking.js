class Ranking{

    constructor(){}    

    generateRanking(){

        if(!localStorage.hasOwnProperty('ranking')){

            let flag = Boolean(getParams('score'));
            let name = localStorage.getItem('playerName');
            let score = parseInt(localStorage.getItem('totalScore'));
            let emptyRanking;

            if(flag & (score > 0)){

                emptyRanking = {
                    "ranking":[
                        {"name":name, "score":localStorage.getItem('totalScore')},
                        {"name":"Empty", "score":"0"},
                        {"name":"Empty", "score":"0"},
                        {"name":"Empty", "score":"0"},
                        {"name":"Empty", "score":"0"},  
                        {"name":"Empty", "score":"0"}, 
                        {"name":"Empty", "score":"0"},
                        {"name":"Empty", "score":"0"},  
                        {"name":"Empty", "score":"0"}, 
                        {"name":"Empty", "score":"0"}                                     
                    ]              
                }                 

            }else{
                emptyRanking = {
                    "ranking":[
                        {"name":"Empty", "score":"0"},
                        {"name":"Empty", "score":"0"},
                        {"name":"Empty", "score":"0"},
                        {"name":"Empty", "score":"0"},
                        {"name":"Empty", "score":"0"},
                        {"name":"Empty", "score":"0"}, 
                        {"name":"Empty", "score":"0"},
                        {"name":"Empty", "score":"0"},
                        {"name":"Empty", "score":"0"},
                        {"name":"Empty", "score":"0"}                 
                    ]              
                }           
            }

            localStorage.setItem('ranking',JSON.stringify(emptyRanking));

        }else{

            let score = parseInt(localStorage.getItem('totalScore'));

            if((score > 0)){

                let data = JSON.parse(localStorage.getItem('ranking'));
                let name = localStorage.getItem('playerName');
                let flag = true;
                let savedBefore = false;
                let newData = [];

                data.ranking.forEach((player) => {
                    
                    if((player.name == name) && (parseInt(player.score) >= score)) {
                        savedBefore = true;
                    }
                });    

                if(!savedBefore){

                    data.ranking.forEach((player) => {

                        let playerName = player.name;
                        let playerScore = parseInt(player.score);

                        if((score > playerScore) && flag){
                            newData.push({'name':name,'score':score})
                            newData.push({'name':playerName,'score':playerScore});                       
                            flag = false;
                        }else{
                            newData.push({'name':playerName,'score':playerScore});
                        }

                    });

                    data.ranking = newData;

                    newData.pop();

                    localStorage.setItem('ranking',JSON.stringify(data));

                }

            } 

        }

    }

    showRanking(){

        let data = JSON.parse(localStorage.getItem('ranking'));

        data.ranking.forEach((player,index) => {

            let mainContainerDiv = $('#main-container');
            
            let rowElement = $('<div></div>');
            rowElement.addClass('row d-flex justify-content-center ranking-name animate__animated animate__flipInX');

            let col1 = $('<div></div>').addClass('col-6');

            let col2 = $('<div></div>').addClass('col-6');       

            let h3_col1 = $('<h3></h3>');
            let h3_col2 = $('<h3></h3>');

            h3_col1.append(`${index+1}.  ${player.name}`);

            col1.append(h3_col1);

            h3_col2.append(`${player.score} pts`);

            col2.append(h3_col2);

            rowElement.append(col1);
            rowElement.append(col2);

            mainContainerDiv.append(rowElement);

        });        

    }

    runRanking(){

        if(window.location.href.indexOf("ranking") > -1) {
            this.generateRanking();
            this.showRanking();
        }

    }

}