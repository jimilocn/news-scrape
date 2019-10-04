$(document).ready(function(){


var articleContainer = $(".article-container");
$(document).on("click", ".btn.save", handleArticleSave);
$(document).on("click", ".scrape-new", handleArticleScrape);



initiatePage();

function initiatePage(){

    articleContainer.empty();
    $.get("/api/headlines?saved=false").then(function(data){
        if(data && data.length){
            renderArticles(data);
        }
        else{
            renderEmpty();
        }
    })
}

function renderArticles(articles){

    var articlePanels = [];

    for (var i=0; i<articles.length; i++){
        
    }
}








})