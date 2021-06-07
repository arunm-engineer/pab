let inputBox = document.querySelector(".input-box");
let arrayDisplayArea = document.querySelector(".array-display-area");
inputBox.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
        let parseState = parseArray(inputBox.value);                                        // Parse input before display
        if (parseState == false) return;

        let arrayContainer = document.querySelector(".array-cont");
        if (arrayContainer) arrayContainer.remove();

        arrayContainer = document.createElement("div");
        arrayContainer.setAttribute("class", "array-cont");
        arrayDisplayArea.appendChild(arrayContainer);

        let input = inputBox.value.split(",");
        input.forEach( (value, idx) => {
            let arrayBox = document.createElement("div");
            arrayBox.setAttribute("class", "array-box");

            if (idx === input.length-1) arrayBox.style.borderRight = "1px solid #d1d8e0";           // Edge case for last array box border

            let textBox = document.createElement("div");
            textBox.textContent = value;
            arrayBox.appendChild(textBox);
            arrayContainer.appendChild(arrayBox);
        })
    }
});

function parseArray(input) {
    if (input.length > 30) return false;

    let inputArr = input.split(",");
    let parseState = true;
    inputArr.forEach( value => {
        if (!Number(value)) parseState = false;
    });

    return parseState;
}