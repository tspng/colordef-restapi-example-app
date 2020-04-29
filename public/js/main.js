$(document).ready(function () {
  /* Get all colors from the API and display them inside #colorList element */
  function getColorsAction() {
    return $.get("/api/colors").done(function (data) {
      const container = $("#colorList").empty();
      data.map((color) =>
        container.append(
          `<div class="colorbox" data-hex="${color.hex}" style="background-color: #${color.hex};">
             <span class="name">${color.name}</span>
             <button type="button" class="close"><span>&times;</span></button>
          </div>`
        )
      );
    });
  }

  function saveColorAction({ name, hex }) {
    $.post("/api/colors", { name: name, hex: hex })
      .done(function (data) {
        getColorsAction();
      })
      .fail(function (data) {
        alert(data.responseJSON.error);
      });
  }

  function deleteColorAction(hex) {
    $.ajax({ method: "DELETE", url: `/api/colors/${hex}` })
      .done(function (data) {
        getColorsAction();
      })
      .fail(function (data) {
        alert(data.responseJSON.error);
      });
  }

  function updateColorAction({ name, hex }) {
    $.ajax({
      method: "PUT",
      url: `/api/colors/${hex}`,
      data: { hex: hex, name: name },
    })
      .done(function (data) {
        getColorsAction();
      })
      .fail(function (data) {
        alert(data.responseJSON.error);
      });
  }

  /* Add new color form submit handler */
  $("#colorAddForm").submit(function (event) {
    // Stop form from submitting normally
    event.preventDefault();
    const form = $(this),
      name = form.find("input[name='name']").val(),
      hex = form.find("input[name='hex']").val().replace(/^#/, "");
    saveColorAction({ name, hex });
  });

  /* Delete color click handler */
  $("#colorList").on("click", "button.close", function () {
    deleteColorAction($(this).parent().data("hex"));
  });

  /* Show color name edit form handler */
  $("#colorList").on("dblclick", ".name", function () {
    const name = $(this).text();
    $(this).empty();
    $("<input type='text'>").appendTo(this).val(name).focus();
  });

  /* Update color name handler */
  $("#colorList").on("focusout", ".name > input", function () {
    const name = $(this).val(),
      hex = $(this).parent().parent().data("hex");
    updateColorAction({ name, hex });
  });

  // Get and display all colors when document is ready
  getColorsAction();
});
