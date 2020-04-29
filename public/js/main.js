$(document).ready(function () {
  function displayColors() {
    return $.get("/api/colors").done(function (data) {
      console.log(data);
      const container = $("#colorList").empty();
      data.map((color) =>
        container.append(
          `<div class="" style="background-color: #${color.hex};">${color.name}
             <button type="button" class="close" data-hex="${color.hex}"><span>&times;</span></button>
          </div>`
        )
      );
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
    $.post("/api/colors", { name: name, hex: hex })
      .done(function (data) {
        displayColors();
      })
      .fail(function (data) {
        alert(data.responseJSON.error);
      });
  });

  $("#colorList").on("click", "button.close", function () {
    var hex = $(this).data("hex");
    $.ajax({ method: "DELETE", url: `/api/colors/${hex}` })
      .done(function (data) {
        displayColors();
      })
      .fail(function (data) {
        alert(data.responseJSON.error);
      });
  });

  displayColors();
});
