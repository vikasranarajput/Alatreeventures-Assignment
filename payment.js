document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('payment-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple validation (you can enhance this)
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const cardNumber = document.getElementById('card-number').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    const amount = document.getElementById('amount').value.trim();

    if (!name || !email || !cardNumber || !expiry || !cvv || !amount) {
      alert('Please fill in all fields.');
      return;
    }

    // Mock payment processing
    setTimeout(() => {
      // Redirect to confirmation page
      window.location.href = 'confirmation.html';
    }, 1000);
  });
});
