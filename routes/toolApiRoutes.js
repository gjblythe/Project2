var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/tools", function(req, res) {
    db.Tools.findAll({}).then(function(dbTools) {
      console.log("GET request"); 
      res.json(dbTools);
    });
  });

  // Create a new example
  app.post("/api/tools", function(req, res) {
    db.Tools.create(req.body).then(function(dbTools) {
      console.log("POST request");
      res.json(dbTools);
      console.log(dbTools);
    });
  });

  // Delete an example by id
  app.delete("/api/tools/:id", function(req, res) {
    db.Tools.destroy({ where: { id: req.params.id } }).then(function(dbTools) {
      console.log("DELETE request");
      res.json(dbTools);
    });
  });
};
