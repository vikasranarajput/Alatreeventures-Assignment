document.addEventListener('DOMContentLoaded', () => {
  const raffleStatusElement = document.getElementById('raffle-status');
  const joinRaffleBtn = document.getElementById('join-raffle-btn');
  const refreshRaffleBtn = document.getElementById('refresh-raffle-btn');
  const referralTokenInput = document.getElementById('referral-token-input');
  const paymentForm = document.getElementById('payment-form');
  const ticketQuantityInput = document.getElementById('ticket-quantity');
  const paymentStatus = document.getElementById('payment-status');

  const MOCK_USER_ID = 'user_paris_lore_123';

  const getRaffleTickets = async (userId) => {
    return new Promise(resolve => {
      setTimeout(() => {
        let tickets = parseInt(localStorage.getItem(`raffleTickets_${userId}`) || '0', 10);
        resolve({ success: true, tickets: tickets });
      }, 500);
    });
  };

  const addRaffleTicket = async (userId, referralCode = '') => {
    return new Promise(resolve => {
      setTimeout(() => {
        let tickets = parseInt(localStorage.getItem(`raffleTickets_${userId}`) || '0', 10);
        let bonusTickets = 0;

        if (referralCode && referralCode.length > 3) {
          bonusTickets = 2;
        }

        tickets += 1 + bonusTickets;
        localStorage.setItem(`raffleTickets_${userId}`, tickets);
        resolve({ success: true, tickets: tickets });
      }, 700);
    });
  };

  const resetRaffleTickets = async (userId) => {
    return new Promise(resolve => {
      setTimeout(() => {
        localStorage.setItem(`raffleTickets_${userId}`, '0');
        resolve({ success: true, tickets: 0 });
      }, 300);
    });
  };

  const updateRaffleStatus = async () => {
    raffleStatusElement.textContent = 'Loading tickets...';
    try {
      const data = await getRaffleTickets(MOCK_USER_ID);
      if (data.success) {
        raffleStatusElement.textContent = `You have ${data.tickets} tickets.`;
        raffleStatusElement.style.color = 'var(--accent-color)';
      } else {
        raffleStatusElement.textContent = 'Error fetching tickets.';
        raffleStatusElement.style.color = 'var(--primary-color)';
      }
    } catch (error) {
      console.error('Failed to update raffle status:', error);
      raffleStatusElement.textContent = 'Error, please try again.';
      raffleStatusElement.style.color = 'var(--primary-color)';
    } finally {
      joinRaffleBtn.disabled = false;
      joinRaffleBtn.textContent = 'Join the Raffle';
      refreshRaffleBtn.disabled = false;
    }
  };

  const initializeRaffleTickets = async () => {
    const currentTickets = parseInt(localStorage.getItem(`raffleTickets_${MOCK_USER_ID}`) || '0', 10);
    if (currentTickets === 0) {
      localStorage.setItem(`raffleTickets_${MOCK_USER_ID}`, '5');
    }
    await updateRaffleStatus();
  };

  joinRaffleBtn.addEventListener('click', async () => {
    joinRaffleBtn.disabled = true;
    joinRaffleBtn.textContent = 'Adding ticket...';
    const referralCode = referralTokenInput.value.trim();

    try {
      const data = await addRaffleTicket(MOCK_USER_ID, referralCode);
      if (data.success) {
        raffleStatusElement.textContent = `Success! You now have ${data.tickets} tickets.`;
        raffleStatusElement.style.color = 'green';
        referralTokenInput.value = '';
      } else {
        raffleStatusElement.textContent = 'Failed to add ticket. Try again.';
        raffleStatusElement.style.color = 'var(--primary-color)';
      }
    } catch (error) {
      console.error('Failed to join raffle:', error);
      raffleStatusElement.textContent = 'Error joining raffle, please try again.';
      raffleStatusElement.style.color = 'var(--primary-color)';
    } finally {
      setTimeout(updateRaffleStatus, 1500);
    }
  });

  refreshRaffleBtn.addEventListener('click', async () => {
    refreshRaffleBtn.disabled = true;
    raffleStatusElement.textContent = 'Refreshing tickets...';
    try {
      const data = await resetRaffleTickets(MOCK_USER_ID);
      if (data.success) {
        raffleStatusElement.textContent = `Tickets refreshed to ${data.tickets}.`;
        raffleStatusElement.style.color = 'var(--accent-color)';
      } else {
        raffleStatusElement.textContent = 'Failed to refresh tickets.';
        raffleStatusElement.style.color = 'var(--primary-color)';
      }
    } catch (error) {
      console.error('Failed to refresh tickets:', error);
      raffleStatusElement.textContent = 'Error refreshing tickets, please try again.';
      raffleStatusElement.style.color = 'var(--primary-color)';
    } finally {
      setTimeout(updateRaffleStatus, 1000);
    }
  });

  initializeRaffleTickets();
});
