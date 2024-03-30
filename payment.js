$(document).ready(function() {
    const paymentForm = $("#payment-form");
    const creditCardRadio = $("#credit-card");
    const paypalRadio = $("#paypal");
    const creditCardDetails = $("#credit-card-details");
    const paypalDetails = $("#paypal-details");

    creditCardRadio.on("change", function() {
        creditCardDetails.show();
        paypalDetails.hide();
    });

    paypalRadio.on("change", function() {
        paypalDetails.show();
        creditCardDetails.hide();
    });

    paymentForm.on("submit", function(event) {
        event.preventDefault();

        const paymentMethod = $("input[name='payment-method']:checked").val();
        const paymentDetails = paymentMethod === "credit-card"
            ? {
                cardNumber: $("#card-number").val(),
                expiryDate: $("#expiry-date").val(),
                cvv: $("#cvv").val()
            }
            : {
                paypalEmail: $("#paypal-email").val()
            };

        // Process payment
        console.log("Payment Method:", paymentMethod);
        console.log("Payment Details:", paymentDetails);

        // Add transaction to transaction history
        const cart = JSON.parse(localStorage.getItem("cart"));
        const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        const transaction = {
            date: new Date().toLocaleDateString(),
            items: cart.map(item => `${item.item} x ${item.quantity}`),
            total: totalAmount.toFixed(2)
        };
        let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
        transactions.push(transaction);
        localStorage.setItem("transactions", JSON.stringify(transactions));

        // Clear cart
        localStorage.removeItem("cart");

        // Redirect to transactions page
        window.location.href = "transactions.html";
    });
});