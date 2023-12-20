document.addEventListener('DOMContentLoaded', function () {
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
    const memoryGame = document.getElementById('memoryGame');
  
    // Duplicate the card values to create pairs
    const cards = [...cardValues, ...cardValues];
  
    // Shuffle the cards using Fisher-Yates algorithm
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  
    // Create HTML elements for each card
    cards.forEach((value, index) => {
      const card = document.createElement('div');
      card.classList.add('memory-card');
      card.dataset.value = value;
  
      const cardInner = document.createElement('div');
      cardInner.classList.add('card-inner');
  
      const faceFront = document.createElement('div');
      faceFront.classList.add('face', 'front');
      faceFront.textContent = '?';
  
      const faceBack = document.createElement('div');
      faceBack.classList.add('face', 'back');
      faceBack.textContent = value;
  
      cardInner.appendChild(faceFront);
      cardInner.appendChild(faceBack);
      card.appendChild(cardInner);
  
      card.addEventListener('click', flipCard);
  
      memoryGame.appendChild(card);
    });
  
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
  
    function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;
  
      this.classList.add('flipped');
  
      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
      }
  
      secondCard = this;
      checkForMatch();
    }
  
    function checkForMatch() {
      const isMatch = firstCard.dataset.value === secondCard.dataset.value;
  
      isMatch ? disableCards() : unflipCards();
    }
  
    function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
  
      resetBoard();
    }
  
    function unflipCards() {
      lockBoard = true;
  
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
  
        resetBoard();
      }, 1000);
    }
  
    function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
    }
  });
  