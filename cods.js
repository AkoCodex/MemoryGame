document.addEventListener("DOMContentLoaded", () => {
  // Elementos dos painéis de menu
  const menuPanel1 = document.querySelector(".menu__1");
  const menuPanel2 = document.querySelector(".menu__2");
  const menu1Title = document.querySelector(".menu1__title");
  const menu2Title = document.querySelector(".menu2__title");
  const menuList1 = document.querySelector(".menu1__list");
  const menuList2 = document.querySelector(".menu2__list");

  // Alterna visualmente entre os dois menus ao clicar
  menuPanel1.addEventListener("click", () => {
    menuPanel1.classList.remove("multiplayer");
    menuPanel2.classList.remove("multiplayer");
    setTimeout(() => {
      menu1Title.style.display = "initial";
      menuList1.style.display = "initial";
      menu2Title.style.display = "none";
      menuList2.style.display = "none";
    }, 350);
  });

  menuPanel2.addEventListener("click", () => {
    menuPanel1.classList.add("multiplayer");
    menuPanel2.classList.add("multiplayer");
    setTimeout(() => {
      menu1Title.style.display = "none";
      menuList1.style.display = "none";
      menu2Title.style.display = "initial";
      menuList2.style.display = "initial";
    }, 350);
  });

  // Lista com todas as cartas possíveis (pares)
  let allCardArray = [
    {
      name: "hamburguer",
      img: "imagens/hamburguer.png",
    },
    {
      name: "hamburguer",
      img: "imagens/hamburguer.png",
    },
    {
      name: "Hot-dog",
      img: "imagens/hotdog.png",
    },
    {
      name: "Hot-dog",
      img: "imagens/hotdog.png",
    },
    {
      name: "coca",
      img: "imagens/coca.png",
    },
    {
      name: "coca",
      img: "imagens/coca.png",
    },
    {
      name: "macarronada",
      img: "imagens/macarronada.png",
    },
    {
      name: "macarronada",
      img: "imagens/macarronada.png",
    },
    {
      name: "batata-frita",
      img: "imagens/batatafrita.png",
    },
    {
      name: "batata-frita",
      img: "imagens/batatafrita.png",
    },
    {
      name: "sobre-coxa",
      img: "imagens/sobrecoxa.png",
    },
    {
      name: "sobre-coxa",
      img: "imagens/sobrecoxa.png",
    },
    {
      name: "salada",
      img: "imagens/salada.png",
    },
    {
      name: "salada",
      img: "imagens/salada.png",
    },
    {
      name: "wraple",
      img: "imagens/wraple.png",
    },
    {
      name: "wraple",
      img: "imagens/wraple.png",
    },
    {
      name: "aneis-de-cebola",
      img: "imagens/aneisdecebola.png",
    },
    {
      name: "aneis-de-cebola",
      img: "imagens/aneisdecebola.png",
    },
    {
      name: "pizza",
      img: "imagens/pizza.png",
    },
    {
      name: "pizza",
      img: "imagens/pizza.png",
    },
    {
      name: "sorvete",
      img: "imagens/sorvete.png",
    },
    {
      name: "sorvete",
      img: "imagens/sorvete.png",
    },
    {
      name: "sushi",
      img: "imagens/sushi.png",
    },
    {
      name: "sushi",
      img: "imagens/sushi.png",
    },
  ];

  // Elementos da interface
  const menu = document.querySelector(".menu");
  const gameMenu = document.querySelector(".game__menu");
  const twelveCards = document.querySelector("#menuButton1");
  const eighteenCards = document.querySelector("#menuButton2");
  const twentyFourCards = document.querySelector("#menuButton3");
  const triple = document.querySelector("#menuButton4");
  const twoPlayers = document.querySelector("#menuButton5");
  const twoPlayersTriple = document.querySelector("#menuButton6");

  const mainMenuButton = document.querySelector(
    ".game__menu__mainmenu__button"
  );
  const restart = document.querySelector(".restart");
  const yes = document.querySelector(".restart__button--yes");
  const no = document.querySelector(".restart__button--no");
  const grid = document.querySelector(".display__grid");
  const result = document.querySelector(".game__menu__points");
  const moves = document.querySelector(".game__menu__moves");

  const resultDisplay = document.querySelector("#game__menu__points__result");
  const player1Result = document.querySelector(".game__menu__points__player1");
  const player2Result = document.querySelector(".game__menu__points__player2");
  const secondPlayer = document.querySelector(
    ".game__menu__points__player2__title"
  );
  const player1ResultDisplay = document.querySelector(
    ".game__menu__points__player1__result"
  );
  const player2ResultDisplay = document.querySelector(
    ".game__menu__points__player2__result"
  );
  const remainingMovesDisplay = document.querySelector(
    ".game__menu__moves__result"
  );

  // Estado do jogo
  let remainingMoves = 0;
  let cardArray = [];
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let player1CardsWon = [];
  let player2CardsWon = [];
  let isBoardLocked = false;
  let isTriple = false;
  let hasRemainingMoves = true;
  let isTwoPlayers = false;
  let turn = "player1";

  //Inicia ou reinicia o jogo quando chamada
  function startGame(count) {
    cardArray = [...allCardArray]
      .slice(0, count)
      .sort(() => 0.5 - Math.random());

    // Reset dos dados
    cardsWon = [];
    player1CardsWon = [];
    player2CardsWon = [];
    resultDisplay.textContent = 0;
    remainingMovesDisplay.textContent = remainingMoves;
    player1ResultDisplay.textContent = 0;
    player2ResultDisplay.textContent = 0;

    if (isTwoPlayers) {
      remainingMoves = 1;
    }

    switchToGame();
    createBoard();
  }

  // Faz a transição do menu para o jogo
  function switchToGame() {
    menu.style.display = "none";
    gameMenu.style.display = "flex";
  }

  //cria o tabuleiro do jogo, com base no quantidade de duplas de cartas
  //e define os atributos de img e id
  function createBoard() {
    // Substitui pares por trios se for modo "triple"
    if (isTriple) {
      allCardArray[2].name = "hamburguer";
      allCardArray[2].img = "imagens/hamburguer.png";
      allCardArray[3].name = "coca";
      allCardArray[3].img = "imagens/coca.png";
      allCardArray[8].name = "macarronada";
      allCardArray[8].img = "imagens/macarronada.png";
      allCardArray[9].name = "sobre-coxa";
      allCardArray[9].img = "imagens/sobrecoxa.png";
      allCardArray[14].name = "salada";
      allCardArray[14].img = "imagens/salada.png";
      allCardArray[15].name = "aneis-de-cebola";
      allCardArray[15].img = "imagens/aneisdecebola.png";
      allCardArray[20].name = "pizza";
      allCardArray[20].img = "imagens/pizza.png";
      allCardArray[21].name = "sushi";
      allCardArray[21].img = "imagens/sushi.png";
    }

    for (let i = 0; i < cardArray.length; i++) {
      let cardFlip = document.createElement("div");
      let cardInner = document.createElement("div");
      let cardFront = document.createElement("div");
      let cardBack = document.createElement("div");
      let frontCard = document.createElement("img");
      let backCard = document.createElement("img");
      cardFlip.setAttribute("class", "card-flip");
      cardInner.setAttribute("class", "card-inner");
      cardFront.setAttribute("class", "card-front");
      cardBack.setAttribute("class", "card-back");
      frontCard.setAttribute("src", "imagens/virada.png");
      backCard.setAttribute("src", cardArray[i].img);
      cardInner.setAttribute("data-id", i);
      cardBack.setAttribute("data-id", i);
      frontCard.setAttribute("data-id", i);
      frontCard.addEventListener("click", flipCard);
      grid.appendChild(cardFlip);
      cardFlip.appendChild(cardInner);
      cardInner.appendChild(cardBack);
      cardBack.appendChild(backCard);
      cardInner.appendChild(cardFront);
      cardFront.appendChild(frontCard);
    }
  }

  //pega o id e passa para checagem, e mostra a imagem da carta
  function flipCard() {
    if (isBoardLocked) {
      return;
    }
    let cardId = this.getAttribute("data-id");
    let cardInnerId = this.closest(".card-inner");
    if (cardsChosenId.includes(cardId)) {
      return;
    }
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    cardInnerId.classList.add("fliped");

    // Verifica quantidade de cartas selecionadas
    if (isTriple == false) {
      if (cardsChosen.length === 2) {
        isBoardLocked = true;
        setTimeout(() => {
          checkForMatch();
          if (remainingMoves > 0) {
            isBoardLocked = false;
          }
        }, 1200);
      }
    }
    if (isTriple == true) {
      if (cardsChosen.length === 3) {
        isBoardLocked = true;
        setTimeout(() => {
          checkForMatch();
          if (remainingMoves > 0) {
            isBoardLocked = false;
          }
        }, 1200);
      }
    }
  }

  //verifica se ambas as cartas selecionadas contidas cardsChosen são iguais para
  //somar um ponto ou voltar para a img original(virada), reseta cardsChosen
  function checkForMatch() {
    // Jogo solo
    if (isTwoPlayers == false) {
      // pares
      if (isTriple == false) {
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) {
          document.querySelector(
            `[data-id="${optionOneId}"]`
          ).style.visibility = "hidden";
          document.querySelector(
            `[data-id="${optionTwoId}"]`
          ).style.visibility = "hidden";
          cardsWon.push(cardsChosen);
        } else {
          document
            .querySelector(`[data-id="${optionOneId}"]`)
            .closest(".card-inner")
            .classList.remove("fliped");
          document
            .querySelector(`[data-id="${optionTwoId}"]`)
            .closest(".card-inner")
            .classList.remove("fliped");
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length / 2) {
          resultDisplay.textContent =
            "Parabéns, você encontrou todos os pares!!";
          restart.style.display = "initial";
        }
      }

      // trios
      if (isTriple == true) {
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        const optionTreeId = cardsChosenId[2];

        if (
          cardsChosen[0] === cardsChosen[1] &&
          cardsChosen[0] === cardsChosen[2]
        ) {
          document.querySelector(
            `[data-id="${optionOneId}"]`
          ).style.visibility = "hidden";
          document.querySelector(
            `[data-id="${optionTwoId}"]`
          ).style.visibility = "hidden";
          document.querySelector(
            `[data-id="${optionTreeId}"]`
          ).style.visibility = "hidden";
          cardsWon.push(cardsChosen);
        } else {
          document
            .querySelector(`[data-id="${optionOneId}"]`)
            .closest(".card-inner")
            .classList.remove("fliped");
          document
            .querySelector(`[data-id="${optionTwoId}"]`)
            .closest(".card-inner")
            .classList.remove("fliped");
          document
            .querySelector(`[data-id="${optionTreeId}"]`)
            .closest(".card-inner")
            .classList.remove("fliped");
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
        if (cardsWon.length === cardArray.length / 3) {
          resultDisplay.textContent =
            "Parabéns, você encontrou todos os pares!!";
          restart.style.display = "initial";
        }
      }
      remainingMoves--;
      remainingMovesDisplay.textContent = remainingMoves;

      if (isTriple == false) {
        if (remainingMoves == 0 && cardsWon.length !== cardArray.length / 2) {
          resultDisplay.textContent = "Que pena!, suas jogadas acabaram";
          restart.style.display = "initial";
          isBoardLocked = true;
          console.log(isBoardLocked);
        }
      }
      if (isTriple == true) {
        if (remainingMoves == 0 && cardsWon.length !== cardArray.length / 3) {
          resultDisplay.textContent = "Que pena!, suas jogadas acabaram";
          restart.style.display = "initial";
          isBoardLocked = true;
        }
      }
    }

    // Modo multiplayer
    if (isTwoPlayers) {
      // pares
      if (isTriple == false) {
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        if (cardsChosen[0] === cardsChosen[1]) {
          document.querySelector(
            `[data-id="${optionOneId}"]`
          ).style.visibility = "hidden";
          document.querySelector(
            `[data-id="${optionTwoId}"]`
          ).style.visibility = "hidden";
          if (turn == "player1") {
            player1CardsWon.push(cardsChosen);
            player1ResultDisplay.textContent = player1CardsWon.length;
          } else if (turn == "player2") {
            player2CardsWon.push(cardsChosen);
            player2ResultDisplay.textContent = player2CardsWon.length;
          }
        } else {
          document
            .querySelector(`[data-id="${optionOneId}"]`)
            .closest(".card-inner")
            .classList.remove("fliped");
          document
            .querySelector(`[data-id="${optionTwoId}"]`)
            .closest(".card-inner")
            .classList.remove("fliped");
          if (turn == "player1") {
            turn = "player2";
            player1Result.style.color = "gray";
            player2Result.style.color = "white";
          } else if (turn == "player2") {
            turn = "player1";
            player1Result.style.color = "white";
            player2Result.style.color = "gray";
          }
        }
        cardsChosen = [];
        cardsChosenId = [];
        if (player1CardsWon.length === cardArray.length / 2) {
          player1ResultDisplay.textContent =
            "Parabéns, você encontrou todos os pares!!";
          player2ResultDisplay.textContent =
            "Que pena, mais sorte da próxima vez!";
          restart.style.display = "initial";
        }
        if (player2CardsWon.length === cardArray.length / 2) {
          player1ResultDisplay.textContent =
            "Que pena, mais sorte da próxima vez!";
          player2ResultDisplay.textContent =
            "Parabéns, você encontrou todos os pares!!";
          restart.style.display = "initial";
        }

        if (player1CardsWon.length + player2CardsWon.length == 12) {
          if (player1CardsWon.length > player2CardsWon.length) {
            player1ResultDisplay.textContent =
              "Parabéns, você encontrou a maioria do pares!!";
            player2ResultDisplay.textContent = "Que pena, menos pares!";
            restart.style.display = "initial";
          } else if (player1CardsWon.length == player2CardsWon.length) {
            player1ResultDisplay.textContent = "Caramba! um empate!";
            player2ResultDisplay.textContent = "Caramba! um empate!";
            restart.style.display = "initial";
          } else {
            player1ResultDisplay.textContent = "Que pena, menos pares!";
            player2ResultDisplay.textContent =
              "Parabéns, você encontrou a maioria do pares!!";
            restart.style.display = "initial";
          }
        }
      }

      // trios
      if (isTriple == true) {
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];
        const optionTreeId = cardsChosenId[2];

        if (
          cardsChosen[0] === cardsChosen[1] &&
          cardsChosen[0] === cardsChosen[2]
        ) {
          document.querySelector(
            `[data-id="${optionOneId}"]`
          ).style.visibility = "hidden";
          document.querySelector(
            `[data-id="${optionTwoId}"]`
          ).style.visibility = "hidden";
          document.querySelector(
            `[data-id="${optionTreeId}"]`
          ).style.visibility = "hidden";
          cardsWon.push(cardsChosen);
          if (turn == "player1") {
            player1CardsWon.push(cardsChosen);
            player1ResultDisplay.textContent = player1CardsWon.length;
          } else if (turn == "player2") {
            player2CardsWon.push(cardsChosen);
            player2ResultDisplay.textContent = player2CardsWon.length;
          }
        } else {
          document
            .querySelector(`[data-id="${optionOneId}"]`)
            .closest(".card-inner")
            .classList.remove("fliped");
          document
            .querySelector(`[data-id="${optionTwoId}"]`)
            .closest(".card-inner")
            .classList.remove("fliped");
          document
            .querySelector(`[data-id="${optionTreeId}"]`)
            .closest(".card-inner")
            .classList.remove("fliped");
          if (turn == "player1") {
            turn = "player2";
            player1Result.style.color = "gray";
            player2Result.style.color = "white";
          } else if (turn == "player2") {
            turn = "player1";
            player1Result.style.color = "white";
            player2Result.style.color = "gray";
          }
        }
        cardsChosen = [];
        cardsChosenId = [];
        if (player1CardsWon.length === cardArray.length / 3) {
          player1ResultDisplay.textContent =
            "Parabéns, você encontrou todos os pares!!";
          player2ResultDisplay.textContent =
            "Que pena, mais sorte da próxima vez!";
          restart.style.display = "initial";
        }
        if (player2CardsWon.length === cardArray.length / 3) {
          player1ResultDisplay.textContent =
            "Que pena, mais sorte da próxima vez!";
          player2ResultDisplay.textContent =
            "Parabéns, você encontrou todos os pares!!";
          restart.style.display = "initial";
        }
        if (player1CardsWon.length + player2CardsWon.length == 8) {
          if (player1CardsWon.length > player2CardsWon.length) {
            player1ResultDisplay.textContent =
              "Parabéns, você encontrou a maioria do pares!!";
            player2ResultDisplay.textContent = "Que pena, menos pares!";
            restart.style.display = "initial";
          } else if (player1CardsWon.length == player2CardsWon.length) {
            player1ResultDisplay.textContent = "Caramba! um empate!";
            player2ResultDisplay.textContent = "Caramba! um empate!";
            restart.style.display = "initial";
          } else {
            player1ResultDisplay.textContent = "Que pena, menos pares!";
            player2ResultDisplay.textContent =
              "Parabéns, você encontrou a maioria do pares!!";
            restart.style.display = "initial";
          }
        }
      }

      if (hasRemainingMoves) {
        remainingMoves--;
        remainingMovesDisplay.textContent = remainingMoves;

        if (isTriple == false) {
          if (remainingMoves == 0 && cardsWon.length !== cardArray.length / 2) {
            resultDisplay.textContent = "Que pena!, suas jogadas acabaram";
            restart.style.display = "initial";
            isBoardLocked = true;
            console.log(isBoardLocked);
          }
        }
        if (isTriple == true) {
          if (remainingMoves == 0 && cardsWon.length !== cardArray.length / 3) {
            resultDisplay.textContent = "Que pena!, suas jogadas acabaram";
            restart.style.display = "initial";
            isBoardLocked = true;
          }
        }
      }
    }
  }

  //deleta as cartas quando o jogo reinicia ou volta para o menu
  function deleteCards() {
    let cardsToDelete = document.querySelectorAll("div.card-flip");
    cardsToDelete.forEach((card) => card.remove());
  }

  // botão "sim" do painel de reset, reinicia o jogo
  function isYes() {
    restart.style.display = "none";
    setTimeout(deleteCards, 1);
    if (isTwoPlayers == false) {
      if (cardArray.length == 12) {
        setTimeout(() => startGame(12), 3);
        remainingMoves = 16;
      } else if (cardArray.length == 18) {
        setTimeout(() => startGame(18), 3);
        remainingMoves = 22;
      } else {
        setTimeout(() => startGame(24), 3);
        remainingMoves = 30;
      }
      if (isTriple == true) {
        remainingMoves = 37;
      }
    } else {
      if (cardArray.length == 12) {
        setTimeout(() => startGame(12), 3);
      } else if (cardArray.length == 18) {
        setTimeout(() => startGame(18), 3);
      } else {
        setTimeout(() => startGame(24), 3);
      }
    }
    isBoardLocked = false;
  }

  //botão "não" do painl de reset, volta para o menu
  function isNo() {
    menu.style.display = "flex";
    gameMenu.style.display = "none";
    restart.style.display = "none";
    isTwoPlayers = false;
    deleteCards();

    // Reverte cartas no modo triple
    if (isTriple == true) {
      isTriple = false;
      allCardArray[2].name = "hot-dog";
      allCardArray[2].img = "imagens/hotdog.png";
      allCardArray[3].name = "hot-dog";
      allCardArray[3].img = "imagens/hotdog.png";
      allCardArray[8].name = "batata-frita";
      allCardArray[8].img = "imagens/batatafrita.png";
      allCardArray[9].name = "batata-frita";
      allCardArray[9].img = "imagens/batatafrita.png";
      allCardArray[14].name = "wraple";
      allCardArray[14].img = "imagens/wraple.png";
      allCardArray[15].name = "wraple";
      allCardArray[15].img = "imagens/wraple.png";
      allCardArray[20].name = "sorvete";
      allCardArray[20].img = "imagens/sorvete.png";
      allCardArray[21].name = "sorvete";
      allCardArray[21].img = "imagens/sorvete.png";
    }
  }

  mainMenuButton.addEventListener("click", isNo);

  yes.addEventListener("click", isYes);
  no.addEventListener("click", isNo);

  // Cada botão inicia o jogo com configurações diferentes com base no mode e quantidade de cartas

  twelveCards.addEventListener("click", () => {
    result.style.display = "initial";
    moves.style.display = "initial";
    player1Result.style.display = "none";
    player2Result.style.display = "none";
    remainingMoves = 16;
    hasRemainingMoves = true;
    isTwoPlayers = false;
    startGame(12);
  });

  eighteenCards.addEventListener("click", () => {
    result.style.display = "initial";
    moves.style.display = "initial";
    player1Result.style.display = "none";
    player2Result.style.display = "none";
    remainingMoves = 22;
    hasRemainingMoves = true;
    isTwoPlayers = false;
    startGame(18);
  });

  twentyFourCards.addEventListener("click", () => {
    result.style.display = "initial";
    moves.style.display = "initial";
    player1Result.style.display = "none";
    player2Result.style.display = "none";
    remainingMoves = 30;
    hasRemainingMoves = true;
    isTwoPlayers = false;
    startGame(24);
  });

  triple.addEventListener("click", () => {
    result.style.display = "initial";
    moves.style.display = "initial";
    player1Result.style.display = "none";
    player2Result.style.display = "none";
    isTriple = true;
    hasRemainingMoves = true;
    isTwoPlayers = false;
    remainingMoves = 37;
    startGame(24);
  });

  twoPlayers.addEventListener("click", () => {
    result.style.display = "none";
    moves.style.display = "none";
    player1Result.style.display = "initial";
    player2Result.style.display = "initial";
    player1Result.style.color = "white";
    player2Result.style.color = "gray";
    secondPlayer.textContent = "Jogador 2";
    hasRemainingMoves = false;
    let turn = "player1";
    isTwoPlayers = true;
    startGame(24);
  });

  twoPlayersTriple.addEventListener("click", () => {
    result.style.display = "none";
    moves.style.display = "none";
    player1Result.style.display = "initial";
    player2Result.style.display = "initial";
    player1Result.style.color = "white";
    player2Result.style.color = "gray";
    secondPlayer.textContent = "Jogador 2";
    isTriple = true;
    let turn = "player1";
    isTwoPlayers = true;
    hasRemainingMoves = false;
    startGame(24);
  });
});
