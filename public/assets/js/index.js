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

function handleArticleSave(){
    var articleToSave = $(this).parents(".panel").data();
    $.ajax({
        method:"PATCH",
        url:"/api/headlines",
        data:articleToSave
    }).then(function(data){
        if(data.ok){
            initiatePage();
        }
    })
}

function handleArticleScrape(){
    $.get("/api/fetch").then(function(data){
        initiatePage();
        bootbox.alert("<h1 class='text-center m-top-50'>"+data.message+"</h1>")
    })
}

function renderArticles(articles){

    var articlePanels = [];

    for (var i=0; i<articles.length; i++){
        articlePanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels)
}

function renderEmpty(){
    var emptyArticlesAlert = $([
        "<div class='alert alert-warnging text-center'>","<h1> No new articles!</h1>",
        "</div>"
    ].join(""));
    articleContainer.append(emptyArticlesAlert)
}

function createPanel(article){
    var panel=$(["<div class'panel panel-default'>","<div class='panel-heading'>","<h1>",article.headline,"<a class='btn btn-success save'>", "save article","</a>","</h1>","</div>","<div class='panel-body'>",article.summary,"</div>","</div>"].join(""));
    panel.data("_id", article._id);
    return panel;
}







})