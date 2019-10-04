$(document).ready(function () {


    var articleContainer = $(".article-container");


    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);



    initiatePage();

    function initiatePage() {

        articleContainer.empty();
        $.get("/api/headlines?saved=true").then(function (data) {
            if (data && data.length) {
                renderArticles(data);
            } else {
                renderEmpty();
            }
        })
    }



    function renderEmpty() {
        var emptyArticlesAlert = $([
            "<div class='alert alert-warnging text-center'>", "<h1> No saved articles!</h1>",
            "</div>"
        ].join(""));
        articleContainer.append(emptyArticlesAlert)
    }


    function renderArticles(articles) {

        var articlePanels = [];

        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels)
    }

    function createPanel(article) {
        var panel = $(["<div class'panel panel-default'>", "<div class='panel-heading'>", "<h1>", article.headline, "<a class='btn btn-success save'>", "save article", "</a>", "</h1>", "</div>", "<div class='panel-body'>", article.summary, "</div>", "</div>"].join(""));
        panel.data("_id", article._id);
        return panel;
    }

    function handleArticleDelete() {
        var articleToDelete = $(this).parents(".panel").data();


        $.ajax({
            method: "DELETE",
            url: "/api/headlines/" + articleToDelete._id
        }).then(function (data) {
            if (data.ok) {
                initiatePage();
            }
        })
    }

    function handleArticleNotes() {
        var currentArticle = $(this).parents(".panel").data();

        $.get("/api/notes/" + currentArticle._id).then(function (data) {
            var text = [
                "<div class='container-fluid text-center'>", "<h1>Notes for this Article: ", currentArticle._id, "</h1>", "<br/>", "<ul class='list-group note-container'>", "</ul>", "<textarea placeholder='New Note' rows='4' cols='60'></textarea>", "</div>"
            ].join("");

            bootbox.dialog({
                message: text,
                closeButton: true
            });
            var noteData = {
                _id: currentArticle._id,
                notes: data || []
            };

            $(".btn.save").data("article", noteData);
            renderNotesList(noteData);
        })
    }

    function renderNotesList(data) {
        var notesToRender = [];
        var currentNote;
        if (!data.notes.length) {
            currentNote = [
                "<li class='list-group-item'>", "You have not added any notes for this article yet", "</li>"
            ].join("");
            notesToRender.push(currentNote)
        } else {
            for (var i = 0; i < data.notes.length; i++) {
                currentNote = $(["<li class='list-group-item note'>", data.notes[i].text, "<button class='btn btn-danger note-delete'>X</button>", "</li>"].join(""));

                currentNote.children("button").data("_id", data.notes[i]._id);

                notesToRender.push(currentNote);
            }
        }

        $(".note-container").append(notesToRender)
    }

    function handleNoteSave(){
        var noteData;
        var newNote = $(".bootbox-body textarea").val().trim();

        if (newNote){
            noteData={
                _id:$(this).data("article")._id,
                noteText:newNote
            };
            $.post("/api/notes",noteData).then(function(){
                bootbox.hideAll();
            })
        }
    }



    function handleNoteDelete(){

        var noteToDelete = $(this).data("_id");
        $.ajax({
            url:"/api/notes/"+noteToDelete,
            method:"DELETE"
        }).then(function(){
            bootbox.hideAll();
        })
    }

})