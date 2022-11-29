let input = "";

function recordPress(button) {
  if (button.textContent == "CE") {
    input = input
      .slice(0, -1)
      .replace(/,/g, "")
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "$&,");
  } else if (button.textContent == "AC") {
    input = "";
    document.getElementsByTagName("button")[0].innerText = "CE";
  } else if (button.textContent == "=") {
    input = eval(
      input
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/--/g, "+")
        .replace(/%/g, "/100")
        .replace(/,/g, "")
    ).toLocaleString();
    document.getElementsByTagName("button")[0].innerText = "AC";
  } else if (button.textContent == "/") {
    if (!input.replace(/,/g, "").match(/([-+÷×]|^)-\d*\.?\d*$/g)) {
      input = input
        .replace(/,/g, "")
        .replace(/\d+\.?\d*$/g, "-$&")
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "$&,");
    } else if (input.replace(/,/g, "").match(/([-+÷×]|^)-\d*\.?\d*$/g)) {
      input = input
        .replace(/,/g, "")
        .replace(/-(?=\d*\.?\d*$)/g, "")
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "$&,");
    }
  } else {
    if (input.match(/[^-+÷×]$/g) || button.textContent.match(/\d/)) {
      if (!input.match(/\.\d*$/g) || button.textContent.match(/[^.]/)) {
        if (input.match(/[^%]$/g) || button.textContent.match(/[^%]/)) {
          if (
            !input.replace(/,/g, "").match(/%$/g) ||
            !button.textContent.match(/[\d.]/)
          ) {
            input += button.textContent;
            input = input
              .replace(/,/g, "")
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "$&,");
            if (document.getElementsByTagName("button")[0].innerText == "AC") {
              document.getElementsByTagName("button")[0].innerText = "CE";
            }
          }
        }
      }
    }
  }
  document.getElementsByTagName("textarea")[0].value = input;
  document.getElementsByTagName("textarea")[0].scrollLeft =
    document.getElementsByTagName("textarea")[0].scrollWidth;
}

function updateInput() {
  input = document
    .getElementsByTagName("textarea")[0]
    .value.replace(/,/g, "")
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "$&,");

  document.getElementsByTagName("textarea")[0].value = input;
}
