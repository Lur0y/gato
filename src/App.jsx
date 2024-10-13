import { useEffect, useState } from 'react';
import Square from './components/Square';

export default function App() {
	
	const TURN = {
		x: 'x',
		o: 'o'
	};

	const rows = 3;
	const cols = 3;

	const [board, setBoard] = useState(Array(rows).fill().map(() => Array(cols).fill('')));
	const [turn, setTurn] = useState(TURN.x);
	const [winner, setWinner] = useState(null);

	function updateBoard(row, col){
		
		if(board[row][col]){
			alert('No se puede tirar aca!!!');
			return 0;
		}

		let new_board = [...board];
		new_board[row][col] = turn;
		setBoard(new_board);
		setTurn((turn == TURN.x)? TURN.o : TURN.x);

	}

	useEffect(() => {

		let win_col = true;
		let win_row = true;
		let canonical_diag = true;
		let other_diag = true;
		let is_filled = true;

		for(let i = 0; i < board.length; i++){

			let first_col = board[i][0];
			let first_row = board[0][i];

			for(let j = 0; j < board[i].length; j++){

				if(first_col != board[i][j]){
					win_col = false;
				}

				if(first_row != board[j][i]){
					win_row = false;
				}

				if(board[i][j] == ''){
					is_filled = false;
				}

			}

			if(win_col && first_col != ''){
				setWinner('ganó el jugador ' + first_col);
				return;
			}

			if(win_row && first_row != ''){
				setWinner('ganó el jugador ' + first_row);
				return;
			}

			if(board[i][i] != board[0][0]){
				canonical_diag = false;
			}

			if(board[i][board.length - 1 - i] != board[0][board.length - 1]){
				other_diag = false;
			}

			win_row = true;
			win_col = true;

		}

		if(canonical_diag && board[0][0] != ''){
			setWinner('ganó el jugador ' + board[0][0]);
			return;
		}

		if(other_diag && board[0][board.length - 1] != ''){
			setWinner('ganó el jugador ' + board[0][board.length - 1]);
			return;
		}

		if(is_filled){
			setWinner('hubo un empate');
			return;
		}

	}, [board]);

	useEffect(() => {
		if(winner){
			alert('Se acabó el juego, ' + winner);
			window.location.reload();
		}
	}, [winner]);

	return (
		<>
			<main className='board'>
				<h1>Gato</h1>
				<section className='game'>
					{
						board.map((element, row) => (
							element.map((e, col) => (
								<Square key={`row-${row}-col-${col}`} index={`row-${row}-col-${col}`} updateBoard={() => {updateBoard(row, col);}}>{e}</Square>
							))
						))
					}
				</section>

				<section className='turn'>
					<Square isSelected={turn == TURN.x}>{TURN.x}</Square>
					<Square isSelected={turn == TURN.o}>{TURN.o}</Square>
				</section>
			</main>
		</>
	);

}
