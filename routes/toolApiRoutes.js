var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/tools", function(req, res) {
    db.Tools.findAll({}).then(function(dbTools) {
      res.json(dbTools);
    });
  });

  // Create a new example
  app.post("/api/tools", function(req, res) {
    db.Tools.create(req.body).then(function(dbTools) {
      res.json(dbTools);
    });
  });

  // Delete an example by id
  app.delete("/api/tools/:id", function(req, res) {
    db.Tools.destroy({ where: { id: req.params.id } }).then(function(dbTools) {
      res.json(dbTools);
    });
  });
};
