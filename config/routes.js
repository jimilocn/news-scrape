module.exports = function(router){

    router.get("/", function(request,response){
        response.render("home");
    });

    router.get("/saved", function (request,response){
        response.render("saved");
    })
}