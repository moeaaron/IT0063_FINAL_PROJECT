$(document).ready(function() {
    $(".add-to-cart").click(function() {
        const item = $(this).data("item");
        const price = $(this).data("price");

        // Check if user is registered
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData) {
            alert("Please register before adding items to the cart.");
            window.location.href = "register.html";
            return;
        }

        // Add item to cart
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const itemIndex = cart.findIndex(cartItem => cartItem.item === item);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity++;
        } else {
            cart.push({ item, price, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));

        // Show notification
        const notification = $(`
            <div class="notification">
                ${item} has been added to the cart. <span class="close-notification">&times;</span>
            </div>
        `);
        $(".notification").replaceWith(notification);
        notification.show();

        // Close notification after 3 seconds
        setTimeout(function() {
            notification.fadeOut("slow", function() {
                $(this).remove();
            });
        }, 3000);
    });

    // Close notification when clicking the close button
    $(document).on("click", ".close-notification", function() {
        $(this).closest(".notification").fadeOut("slow", function() {
            $(this).remove();
        });
    });
});