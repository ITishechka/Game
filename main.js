document.addEventListener('DOMContentLoaded', function () {

  function createNumbersArray(count) {
    let cardsCount = count;
    let cardsNumberArray = [];

    for (let i = 1; i <= cardsCount / 2; i++) {
      cardsNumberArray.push(i);
      cardsNumberArray.push(i);
    }
    console.log(cardsNumberArray);
    return cardsNumberArray
  }

  // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

  // создание массива объектов (перемешанный массив чисел)
  function createCards(obj) {
    const cardsArray = [];
    for (let i = 0; i <= obj.length - 1; i++) {
      const cardNumber = document.createElement('div');
      cardNumber.classList.add('card__number');
      cardNumber.textContent = obj[i];
      cardsArray.push(cardNumber.outerHTML);
    }
    return cardsArray;
  }

  function startGame(cards) {
    const shuffledNumbersArray = shuffle(createNumbersArray(cards));
    const cardsNumber = createCards(shuffledNumbersArray);
    const playingField = document.getElementById('game');
    const container = document.querySelector('.container');
    let openCards = [];
    let matchedCards = [];

    for (arr of cardsNumber) {
      playingField.innerHTML += arr;
    }

    const cardsElements = document.querySelectorAll('.card__number');
    cardsElements.forEach((card) => {
      card.addEventListener('click', () => {
        if (!card.classList.contains('card__number-open') && openCards.length < 2) {
          card.classList.add('card__number-open');
          openCards.push(card);
          if (openCards.length == 2) {
            if (openCards[0].textContent == openCards[1].textContent) {
              openCards.forEach((card) => {
                card.classList.add('card__number-matched');
                matchedCards.push(card);
              });
              openCards = [];
            } else {
              setTimeout (() => {
                openCards.forEach((card) => {
                  card.classList.remove('card__number-open');
                });
                openCards = [];
              }, 1000)
            }
          }
          if (matchedCards.length === cardsElements.length) {
            const buttonRestart = document.createElement('button');
            buttonRestart.textContent = 'СЫГРАТЬ ЕЩЕ';
            buttonRestart.classList.add('btn', 'btn-restart');
            const containerGame = document.getElementById('game');
            containerGame.append(buttonRestart);

            buttonRestart.addEventListener('click', () => {
              playingField.innerHTML ='';
              container.classList.add('container-max')
              const buttons = document.querySelectorAll('button');
              buttons.forEach((button) => {
                button.disabled = false;
              })
            })
          }
        }
      });
    });

    switch (cards) {
      case 6:
        container.classList.remove('container-max');
        break;
      case 8:
        container.classList.remove('container-06');
        break;
      case 12:
        container.classList.remove('container-06');
        break;
    }
  }


  const button_6 = document.getElementById('btn-6').addEventListener('click', (e) => {
    startGame(6);
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.disabled = true;
    });
  });

  const button_8 = document.getElementById('btn-8').addEventListener('click', (e) => {
    startGame(8);
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.disabled = true;
    });
  });

  const button_12 = document.getElementById('btn-12').addEventListener('click', (e) => {
    startGame(12);
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.disabled = true;
    });
  });
});
