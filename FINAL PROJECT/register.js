document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registration-form");
    const playerIdInput = document.getElementById("player-id");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const ign = document.getElementById("ign").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const playerId = generatePlayerId();
        playerIdInput.value = playerId;

        // Store user data in localStorage
        const userData = {
            email: email,
            password: password,
            playerId: playerId,
            ign: ign
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        // Here, you can add code to submit the form data to a server or perform other actions
        console.log("Registration successful!");
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Player ID:", playerId);
        console.log("In-Game Name:", ign);
    });

    function generatePlayerId() {
        const min = 1000;
        const max = 9999;
        const part1 = Math.floor(Math.random() * (max - min + 1)) + min;
        const part2 = Math.floor(Math.random() * (max - min + 1)) + min;
        const part3 = Math.floor(Math.random() * (max - min + 1)) + min;
        return `${part1} ${part2} ${part3}`;
    }
});