/** This File is used for functions that are not 100% related to any page(just helpers)
 *  or for simple methods that is not necessary to create a class or an object. 
 */

/** This method returns true if an specific param exist on the url. */

function getParams( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

/** This method save the player name at the beggining of the game. */

function savePlayerName(){
    if ( window.location.pathname == '/' || window.location.href.indexOf("index") > -1 ){
        $("#submit").click(function(e){
            e.preventDefault();
            let name = $("#name").val();
            localStorage.setItem('playerName',name);
            window.location.href="../pages/main.html";
        });        
    }    
}