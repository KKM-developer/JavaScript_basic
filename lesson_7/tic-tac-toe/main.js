const equals3 = (a, b, c) => {
  return (a == b && b == c && a != '');
}

const checkWinner = (model) => {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(model[i][0], model[i][1], model[i][2])) {
      return winner = model[i][0];
    }
  }  

  // vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(model[0][i], model[1][i], model[2][i])) {
      return winner = model[0][i];
    }
  }

  // diagonal
  if (equals3(model[0][0], model[1][1], model[2][2])) {
    return winner = model[0][0];
  }
  if (equals3(model[0][2], model[1][1], model[2][0])) {
    return winner = model[0][2];
  }
  
  //tie (нормального ничего не смог придумать... так же пришлось добавить return winner сразу после каждой проверки, т.к. если поле полность заполненно и остался последний
  // решающий ход, то после нажатия на клетку оповещалась ничья, т.к. проверка на ничью стоит последней)
  let chek = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (model[i][j] != '') {
        chek += 1;
      }
    }
  }
  if (chek == 9) {
    return winner = 'tie'
  }
}

const game = () => {
  const model = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  const playerX = 'X';
  const playerO = 'O';
  let currentPlayer = playerX;

  const $game = document.querySelector('#game');
  const $table = document.createElement('table');

  for (let i = 0; i < 3; i++) {
    const $tr = document.createElement('tr');
    $tr.dataset.index = i;

    for (let j = 0; j < 3; j++) {
      const $td = document.createElement('td');
      $td.dataset.index = j;
      $tr.appendChild($td);
    }

    $table.appendChild($tr);
  }

  $game.appendChild($table);

  $table.addEventListener('click', (e) => {
    const row = e.target.parentNode.dataset.index;
    const column = e.target.dataset.index;

    // 2. check if td assigned (с защитой от перезаписи оказалось немного проще)
    if (model[row][column] == '') {
      model[row][column] = currentPlayer;
      e.target.innerHTML = currentPlayer;
      currentPlayer = currentPlayer === playerX ? playerO : playerX;
    }
    const winner = checkWinner(model);
    if (winner) {
      alert(`Winner: ${winner}`);
    }
    // 1. tie

    
  });
}

window.onload = () => {
  game();
};
