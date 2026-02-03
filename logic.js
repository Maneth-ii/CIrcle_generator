const scale = 12;

const form = document.getElementById("circle-form");
const radiusInput = document.getElementById("radius");
const useCaseSelect = document.getElementById("use-case");
const errorMessage = document.getElementById("radius-error");
const circle = document.getElementById("circle");
const diameterElement = document.getElementById("diameter-el");
const circumferenceElement = document.getElementById("circumference-el");
const areaElement = document.getElementById("area-el");
const circleSizeLabel = document.getElementById("circle-size");
const insightText = document.getElementById("insight-text");

const formatNumber = (value) => value.toFixed(2);
const formatLength = (value) => `${formatNumber(value)} cm`;
const formatMeters = (value) => `${formatNumber(value / 100)} m`;
const formatArea = (value) => `${formatNumber(value)} cm²`;
const formatAreaMeters = (value) => `${formatNumber(value / 10000)} m²`;

const buildInsight = ({ radius, diameter, circumference, area, useCase }) => {
    switch (useCase) {
        case "garden":
            return `You will need about ${formatLength(circumference)} (${formatMeters(
                circumference,
            )}) of edging to surround a circular garden bed.`;
        case "table":
            return `A round tabletop cover should provide roughly ${formatArea(area)} (${formatAreaMeters(
                area,
            )}) of surface coverage.`;
        case "pizza":
            return `A pizza with a ${formatLength(diameter)} diameter serves about ${formatArea(
                area,
            )} of surface area.`;
        default:
            return "Choose a use case to see a practical summary.";
    }
};

const resetOutputs = () => {
    diameterElement.textContent = "--";
    circumferenceElement.textContent = "--";
    areaElement.textContent = "--";
    circleSizeLabel.textContent = "Diameter preview: --";
    circle.style.width = "120px";
    circle.style.height = "120px";
    insightText.textContent = "Add a radius and choose a use case to see a real-world summary.";
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
    const area = Math.PI * radius * radius;
    const pixelDiameter = diameter * scale;

    diameterElement.textContent = formatLength(diameter);
    circumferenceElement.textContent = formatLength(circumference);
    areaElement.textContent = formatArea(area);
    circleSizeLabel.textContent = `Diameter preview: ${Math.round(pixelDiameter)} px`;
    insightText.textContent = buildInsight({
        radius,
        diameter,
        circumference,
        area,
        useCase: useCaseSelect.value,
    });

    circle.style.width = `${pixelDiameter}px`;
    circle.style.height = `${pixelDiameter}px`;
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    updateCircle();
});

radiusInput.addEventListener("input", updateCircle);
useCaseSelect.addEventListener("change", updateCircle);

updateCircle();
