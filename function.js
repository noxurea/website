const toggleCheckbox = document.querySelector('.switch input[type="checkbox"]');
const toggleLabel = document.getElementById('toggle-label');
const themeLink = document.querySelector('link[href="lightmode.css"]') || document.querySelector('link[href="darkmode.css"]');

const lightTheme = "lightmode.css";
const darkTheme = "darkmode.css";
const display = document.getElementById("display");

function switchTheme(isDark) {
    if (isDark) {
        themeLink.href = darkTheme; 
        localStorage.setItem("theme", "dark");
        toggleLabel.textContent = "Switch to Light";
    } else {
        themeLink.href = lightTheme; 
        localStorage.setItem("theme", "light");
        toggleLabel.textContent = "Switch to Dark";
    }
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    toggleCheckbox.checked = true;
    switchTheme(true);
} else {
    toggleCheckbox.checked = false;
    switchTheme(false);
}

toggleCheckbox.addEventListener("change", function () {
    switchTheme(this.checked);
});

function appendToDisplay(input) {
    if (input === "( )") {
        const lastChar = display.value.slice(-1);
        if (/\d/.test(lastChar) || lastChar === ")") {
            display.value += ")";
        } else {
            display.value += "(";
        }
    } else if (input === "%") {
        let lastNumberMatch = display.value.match(/-?\d+(\.\d+)?$/);
        if (lastNumberMatch) {
            let lastNumber = parseFloat(lastNumberMatch[0]);
            let percentageValue = lastNumber / 100;
            display.value = display.value.replace(lastNumberMatch[0], percentageValue);
        }
    } else {
        display.value += input;
    }
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        if (display.value.includes("/0")) {
            throw new Error("Cannot divide by zero");
        }
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Undefined";
    }
}

function toggleSign() {
    let currentValue = display.value;
    if (currentValue === "") return;

    let lastNumberMatch = currentValue.match(/-?\d+(\.\d+)?$/);
    if (lastNumberMatch) {
        let lastNumber = lastNumberMatch[0];
        let toggledNumber = lastNumber.startsWith("-") ? lastNumber.slice(1) : `-${lastNumber}`;
        display.value = currentValue.replace(lastNumber, toggledNumber);
    }
}
