let input = "";

function recordPress(button) {
  if (button.textContent == "CE") {
    input = input.slice(0, -1);
  } else if (button.textContent == "AC") {
    input = "";
  } else if (button.textContent.match(/\d/)) {
    if (!input.match(/%$/g)) {
      input += button.textContent;
    }
  } else if (button.textContent.match(/[-+×÷]/)) {
    if (input.match(/[\d%]$/g)) {
      input += button.textContent;
    }
  } else if (button.textContent == ".") {
    if (input.match(/(^|[-+×÷])\d*$/g)) {
      input += button.textContent;
    }
  } else if (button.textContent == "%") {
    if (input.match(/\d$/g)) {
      input += button.textContent;
    }
  } else if (button.textContent == "/") {
    if (!input.match(/([-+÷×]|^)-\d*\.?\d*$/g)) {
      input = input.replace(/\d+\.?\d*$/g, "-$&");
    } else if (input.match(/([-+÷×]|^)-\d*\.?\d*$/g)) {
      input = input.replace(/-(?=\d*\.?\d*$)/g, "");
    }
  } else if (button.textContent == "=") {
    input = eval(
      input
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/--/g, "+")
        .replace(/%/g, "/100")
    ).toString();
    document.getElementsByTagName("button")[0].innerText = "AC";
  }

  if (button.textContent != "=") {
    document.getElementsByTagName("button")[0].innerText = "CE";
  }

  document.getElementsByTagName("textarea")[0].value = input.replace(
    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
    "$&,"
  );

  document.getElementsByTagName("textarea")[0].scrollLeft =
    document.getElementsByTagName("textarea")[0].scrollWidth;
}

function updateInput() {
  input = document.getElementsByTagName("textarea")[0].value.replace(/,/g, "");

  document.getElementsByTagName("textarea")[0].value = input.replace(
    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
    "$&,"
  );
}
