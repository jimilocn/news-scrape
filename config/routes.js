var scrape = require("../scripts/scrape");
var headlineController = require("../controllers/headline");
var notesController = require("../controllers/notes")

module.exports = function(router){

    router.get("/", function(request,response){
        response.render("home");
    });

    router.get("/saved", function (request,response){
        response.render("saved");
    });

    router.get("/api/fetch", function(request,response){
        headlineController.fetch(function(error,doc){
            if(!doc || doc.inseredCount===0){
                response.json({
                    message:"No articles to scrape! Try again another time"
                });
            }
            else{
                response.json({
                    message:"We found "+ doc.insertCount+" articles today!!!"
                });
            }
        });
    });


    router.get("/api/headlines", function(request,response){
        var query={};
        if(request.query.saved){
            query=request.query;
        }
        headlineController.get(query, function(data){
            response.json(data);
        })
    });



    router.delete("/api/headlines/:id", function(request,response){
        var query={};
        query._id = request.params.id;
        headlineController.delete(query,function(error,data){
            response.json(data);
        })
    })

    router.patch("/api/headlines", function(request,response){
        headlineController.update(request.body, function(error,data){
            response.json(data);
        });
    });


    router.get("/api/notes/:headline_id?", function(request,response){
        var query = {};
        if(request.params.headline_id){
            query._id = request.params.headline_id;
        }

        notesController.get(query, function(error,data){
            response.json(data);
        })
    })

    router.delete("/api/notes/:id", function(request,response){
        var query = {};
        query._id = request.params.id;
        notesController.delete(query, function (error, data){
            response.json(data);
        })
    })


    router.post("/api/notes", function(request,response){
        notesController.save(request.body, function(data){
            response.json(data);
        })
    })
}