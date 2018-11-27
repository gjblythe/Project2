// Get references to page elements
var userNameInput = $("#userName");
var toolInput = $("#tool");
var priceInput = $("#price");
var qtyInput = $("#qty");
// var userId = $("userId");
var $submitBtn = $("#sendMessageButton");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveUser: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/user",
      data: JSON.stringify(example)
    });
  },
  saveTools: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/tools",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/tools",
      type: "GET"
    });
  },
  getUsers: function() {
    return $.ajax({
      url: "api/user",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/tools/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/api/" + example.id);
      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": tools.id
        })
        .append($a);
      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var newUser = {
    userName: userNameInput.val().trim()
  };

  var newTool = {
    userName: userNameInput.val().trim(),
    tool: toolInput.val().trim(),
    price: priceInput.val().trim(),
    qty: qtyInput.val().trim()
  };

  if (userNameInput.val() === "") {
    alert("Please Enter a proper Username.");
    return;
  } else if (priceInput.val() === "") {
    alert("Please enter a Price.");
    return;
  } else if (qtyInput.val() === "") {
    alert("Please enter a Quantity.");
    return;
  }

  API.saveUser(newUser)
    .then(function() {
      console.log("Save user is being called");
      location.reload();
      refreshExamples();
      return API.saveTools(newTool);
    })
    .then(function() {
      console.log("Save tools is being called");
      console.log("After refresh.");
      userNameInput.val("");
      toolInput.val("");
      priceInput.val("");
      qtyInput.val("");
    });
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    location.reload();
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
