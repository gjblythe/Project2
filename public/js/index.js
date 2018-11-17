// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/tools",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/tools",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/tools/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/tools/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": Tools.id
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
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);


/* These are the objects that will store the input to be sent to the API

Tool object

var userNameInput = $('#userName');
var toolInput = $('#tool');
var priceInput = $('#price');
var qtyInput = $('#qty');


var newTool = {
    userName: userNameInput
      .val()
      .trim(),
    tool: toolInput
      .val()
      .trim(),
    price: priceInput
      .val()
      .trim(),
    qty: qtyInput
      .val()
      .trim(),
    userId: userSelect.val()
  };
  
User Object

  var newUserInput = $('#newUserName');
  var toolsCheckedOutInput = $('toolCheckedOut');


  var newUser = {
    userName: newUserInput
      .val()
      .trim(),
    tools: toolsCheckedOutInput
      .val()
      .trim()
  }; 
  */