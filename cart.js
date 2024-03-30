$(document).ready(function() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = $("#cart-items");
    const totalAmountContainer = $("#total-amount");

    cart.forEach(function(item) {
        const row = `
            <tr>
                <td>${item.item}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" class="form-control quantity" value="${item.quantity}" min="1">
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger remove-item">Remove</button>
                </td>
            </tr>
        `;
        cartItemsContainer.append(row);
    });

    function updateTotal() {
        let total = 0;
        $(".quantity").each(function() {
            const price = $(this).closest("tr").find("td:nth-child(2)").text().replace("$", "");
            const quantity = $(this).val();
            total += price * quantity;
        });
        totalAmountContainer.text("$" + total.toFixed(2));
    }

    updateTotal();

    $(".quantity").on("change", function() {
        const row = $(this).closest("tr");
        const price = parseFloat(row.find("td:nth-child(2)").text().replace("$", ""));
        const quantity = parseInt($(this).val());
        row.find("td:nth-child(4)").text("$" + (price * quantity).toFixed(2));
        updateTotal();
    });

    $(".remove-item").on("click", function() {
        const row = $(this).closest("tr");
        const item = row.find("td:first-child").text();
        const cart = JSON.parse(localStorage.getItem("cart"));
        const updatedCart = cart.filter(cartItem => cartItem.item !== item);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        row.remove();
        updateTotal();
    });

    $("#proceed-to-payment").on("click", function() {
        window.location.href = "payment.html";
    });
});