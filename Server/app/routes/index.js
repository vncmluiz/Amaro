function home(app) {

    app.get("/", function(req,res){

        res.redirect("/home.html");
    });

    app.get("/form", function(req,res){

        res.render("form.ejs");
    });
}

module.exports = home;