document.addEventListener('DOMContentLoaded', function () {
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
    const memoryGame = document.getElementById('memoryGame');
  
    let cards = [];
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let moves = 0;
    let playerName;
  
    // Função para criar as cartas
    function createCards() {
      cards = [...cardValues, ...cardValues];
      cards = cards.sort(() => Math.random() - 0.5);
  
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
    }
  
    // Função para iniciar o jogo
    function startGame() {
      createCards();
  
      // Iniciando o contador de jogadas
      moves = 0;
  
      // Perguntando ao jogador o nome antes de iniciar o jogo
      playerName = prompt('Qual é o seu nome?') || 'Jogador';
    }
  
    // Iniciando o jogo
    startGame();
  
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
      incrementMoves();
    }
  
    function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
  
      // Verificando se todas as cartas foram combinadas
      if (document.querySelectorAll('.flipped').length === cards.length) {
        showCongratulations();
      }
  
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
  
    function incrementMoves() {
      moves++;
    }
  
    function showCongratulations() {
      const congratsMessage = `Parabéns, ${playerName}! Você completou o jogo em ${moves} jogadas.`;
      alert(congratsMessage);
    }
  });
  