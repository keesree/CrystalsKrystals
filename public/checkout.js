// public/checkout.js
document.getElementById('checkout-form').addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent the default form submission

    const email = document.getElementById('email').value;
    // Replace this with your actual cart data
    const cart = JSON.stringify({ items: ['item1', 'item2'], total: 100 }); 

    try {
        const response = await fetch('http://localhost:3000/send-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, cart }),
        });

        if (response.ok) {
            alert('Order sent successfully!');
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send order.');
    }
});
