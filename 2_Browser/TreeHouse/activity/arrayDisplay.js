let inputBox = document.querySelector(".input-box");
let arrayDisplayArea = document.querySelector(".array-display-area");

inputBox.addEventListener("keydown", (e) => {
    try {
        if (e.ctrlKey && e.key === "Enter") {
            let parsedArray = parseArray(inputBox.value);                                        // Parse input before display
            if (parsedArray == null) return;

            let arrayContainer = document.querySelector(".array-cont");
            if (arrayContainer) arrayContainer.remove();

            arrayContainer = document.createElement("div");
            arrayContainer.setAttribute("class", "array-cont");
            arrayDisplayArea.appendChild(arrayContainer);

            parsedArray.forEach((value, idx) => {
                let arrayBox = document.createElement("div");
                arrayBox.setAttribute("class", "array-box");

                if (idx === parsedArray.length - 1) arrayBox.style.borderRight = "1px solid #d1d8e0";           // Edge case for last array box border

                let textBox = document.createElement("div");
                textBox.textContent = (String(value).length > 2) ? `${value}..` : value;
                arrayBox.appendChild(textBox);
                arrayContainer.appendChild(arrayBox);
            })
        }
    }
    catch (e) {
        console.log(e);
    }
});

function parseArray(input) {
    try {
        if (input.length > 30) return false;

        let inputArr = input.split(",");
        let parseState = true;
        let parsedArray = inputArr.map(value => {
            if (!Number(value)) {
                parseState = false;
            }
            
            return Number(value);
        });

        return parseState ? parsedArray : null;
    }
    catch (e) {
        console.log(e);
    }
}