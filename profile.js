$(document).ready(function() {
    const profileDetails = $("#profile-details");
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
        const profileHTML = `
            <div class="form-group">
                <label>Name:</label>
                <span>${userData.ign}</span>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <span>${userData.email}</span>
            </div>
            <div class="form-group">
                <label>Player ID:</label>
                <span>${userData.playerId}</span>
            </div>
        `;
        profileDetails.html(profileHTML);
    } else {
        profileDetails.html("<p>Please register to view your profile details.</p>");
    }
});