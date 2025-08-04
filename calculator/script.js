const invalidLabel = "Invalid Operation";
const allowedLetter = ["/", "*", "-", "+", "Enter", "c", "C", "AC", ".", "=", "Backspace"];
let stack = [];
const history = [];

function checkValidChar(thisitem) {
    if (thisitem.value && thisitem.value.trim()) {

    } else {
        thisitem.value = ""
    }
}

function handleButtonClick(thisitem, key = null) {
    if (thisitem) {
        key = thisitem.getAttribute('data-button')
    }
    const display = document.getElementById('display')

    if (!(/^[0-9]+$/.test(key)) && !allowedLetter.includes(key)) {
        return false
    }

    try {
        switch (key) {
            case "AC":
            case "c":
            case "C":
                display.value = "0"
                stack = []
            case "Backspace":
                if (display.value.slice(-1) == ".") stack.pop()
                display.value = display.value.slice(0, -1)
                break;
            case "=":
            case "Enter":
                let result = display.value ? eval(display.value) : ""
                display.value = result
                if (result.toString().includes(".")) stack = ["."]
                history.push({ input: display.value, output: result, time: new Date().toLocaleDateString() })
                break;
            default:
                console.log(stack)
                if (display.value === invalidLabel || display.value === "0") {
                    display.value = ""
                }
                if (key == "." && stack.includes(".")) {
                    return false
                }
                if (key == ".") stack.push(".")
                if (!display.value && display.value.startsWith("0")) {
                    display.value += "0"
                }
                if (key !== "." && allowedLetter.includes(key)) {
                    stack.pop()
                }
                display.value += key
        }
    } catch (error) {
        console.error(error);
        display.value = invalidLabel
    }
}

document.addEventListener("keydown", function (event) {
    if (document.activeElement && (document.activeElement.id !== "display" || event.key === "Enter")) {
        handleButtonClick(null, event.key)
    }
})