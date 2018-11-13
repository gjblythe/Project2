var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Tools.findAll({}).then(function(dbTools) {
      res.render("index", {
        msg: "Welcome!",
        tools: dbTools
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/api/tools/:id", function(req, res) {
    db.Tools.findOne({ where: { id: req.params.id } }).then(function(dbTools) {
      res.render("Tools", {
        tools: dbTools
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
