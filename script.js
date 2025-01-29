
const BASE_API_URL = "https://chicken-game-predictor.onrender.com";

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${BASE_API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            alert("Login successful!");
            fetchGameData(data.session);
        } else {
            alert(`Login failed: ${data.error}`);
        }
    } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred during login.");
    }
});

async function fetchGameData(session) {
    try {
        const response = await fetch(`${BASE_API_URL}/game-data`, {
            method: "GET",
            headers: { Authorization: `Bearer ${session}` },
        });
        const data = await response.json();
        if (response.ok) {
            document.getElementById("game-data").innerText = JSON.stringify(data.gameData, null, 2);
        } else {
            alert(`Failed to fetch game data: ${data.error}`);
        }
    } catch (error) {
        console.error("Error fetching game data:", error);
        alert("An error occurred while fetching game data.");
    }
}
