document.addEventListener('DOMContentLoaded', function() {
    const donateForm = document.getElementById('donate-form');

    donateForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const amount = document.getElementById('amount').value.trim();
        const paymentMethod = document.getElementById('payment-method').value;

        if (!name || !email || !amount || !paymentMethod) {
            alert('Please fill in all required fields.');
            return;
        }

        if (isNaN(amount) || parseFloat(amount) <= 0) {
            alert('Please enter a valid donation amount.');
            return;
        }

        // Simulate form submission
        alert(`Thank you, ${name}! Your donation of $${amount} has been processed successfully.`);
        donateForm.reset();

        // In a real-world scenario, you would send this data to a server for processing
        // and integrate with a payment gateway for secure transactions.
    });

    // Add input validation for the amount field
    const amountInput = document.getElementById('amount');
    amountInput.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
    });

    // Highlight selected payment method
    const paymentMethodSelect = document.getElementById('payment-method');
    paymentMethodSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        Array.from(this.options).forEach(option => option.classList.remove('selected'));
        selectedOption.classList.add('selected');
    });
});