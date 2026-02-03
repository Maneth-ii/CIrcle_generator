const scale = 12;

const form = document.getElementById("circle-form");
const radiusInput = document.getElementById("radius");
const errorMessage = document.getElementById("radius-error");
const circle = document.getElementById("circle");
const diameterElement = document.getElementById("diameter-el");
const circumferenceElement = document.getElementById("circumference-el");
const circleSizeLabel = document.getElementById("circle-size");

const formatNumber = (value) => value.toFixed(2);

const resetOutputs = () => {
    diameterElement.textContent = "--";
    circumferenceElement.textContent = "--";
    circleSizeLabel.textContent = "Diameter preview: --";
    circle.style.width = "120px";
    circle.style.height = "120px";
};

const updateCircle = () => {
    const rawValue = radiusInput.value.trim();

    if (rawValue === "") {
        errorMessage.textContent = "";
        resetOutputs();
        return;
    }

    const radius = Number.parseFloat(rawValue);

    if (!Number.isFinite(radius) || radius <= 0) {
        errorMessage.textContent = "Please enter a radius greater than 0.";
        resetOutputs();
        return;
    }

    errorMessage.textContent = "";

    const diameter = radius * 2;
    const circumference = 2 * Math.PI * radius;
    const pixelDiameter = diameter * scale;

    diameterElement.textContent = `${formatNumber(diameter)} cm`;
    circumferenceElement.textContent = `${formatNumber(circumference)} cm`;
    circleSizeLabel.textContent = `Diameter preview: ${Math.round(pixelDiameter)} px`;

    circle.style.width = `${pixelDiameter}px`;
    circle.style.height = `${pixelDiameter}px`;
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    updateCircle();
});

radiusInput.addEventListener("input", updateCircle);

updateCircle();
