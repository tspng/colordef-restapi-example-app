$(document).ready(function () {
  function getColors() {
    return $.get("/colors").done(function (data) {
      console.log(data);
      alert("got all new colors from api");
    });
  }

  $("#colorAddForm").submit(function (event) {
    // Stop form from submitting normally
    event.preventDefault();

    // Get some values from elements on the page:
    var $form = $(this),
      name = $form.find("input[name='name']").val(),
      hex = $form.find("input[name='hex']").val().replace(/^#/, "");

    // Send the data using post
    $.post("/colors", { name: name, hex: hex })
      .done(function (data) {
        //var content = $(data).find("#content");
        $("#debug").empty().append(data);
        getColors();
      })
      .fail(function () {
        alert("error");
      })
      .always(function () {
        alert("finished");
      });
  });

  getColors();
});
