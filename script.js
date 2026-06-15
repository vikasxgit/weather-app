const API_KEY = 'bf2a93912ce64fb7ae2155032261406';
const cityInput = document.getElementById("cityInput");

async function getWeather() {
    const city = cityInput.value.trim();

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const loading = document.getElementById("loading");
    const weather = document.getElementById("weather");
    const error = document.getElementById("error");

    loading.style.display = "block";
    weather.style.display = "none";
    error.style.display = "none";

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
        );

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        document.getElementById("temperature").textContent =
            Math.round(data.current.temp_c) + "°C";

        document.getElementById("city").textContent =
            data.location.name;

        document.getElementById("condition").textContent =
            data.current.condition.text;

        document.getElementById("localTime").textContent =
            data.location.localtime;

        document.getElementById("weatherIcon").src =
            "https:" + data.current.condition.icon;

        document.getElementById("feelsLike").textContent =
            Math.round(data.current.feelslike_c) + "°C";

        document.getElementById("wind").textContent =
            data.current.wind_kph + " km/h";

        document.getElementById("visibility").textContent =
            data.current.vis_km + " km";

        document.getElementById("country").textContent =
            data.location.country;

        weather.style.display = "block";

        updateBackground(data.current.condition.text);

    } catch (err) {
        console.error(err);
        error.style.display = "block";
        error.textContent = err.message;
    } finally {
        loading.style.display = "none";
    }
}

function updateBackground(condition) {
    condition = condition.toLowerCase();

    if (condition.includes("sunny") || condition.includes("clear")) {
        document.body.style.background =
            "linear-gradient(135deg, #f59e0b, #ea580c)";
    } else if (condition.includes("rain")) {
        document.body.style.background =
            "linear-gradient(135deg, #2563eb, #0f172a)";
    } else if (condition.includes("cloud")) {
        document.body.style.background =
            "linear-gradient(135deg, #64748b, #334155)";
    } else if (condition.includes("storm")) {
        document.body.style.background =
            "linear-gradient(135deg, #312e81, #0f172a)";
    } else {
        document.body.style.background =
            "linear-gradient(135deg, #0f172a, #1e293b)";
    }
}

cityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});