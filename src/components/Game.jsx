import Square from './../components/Square';
import { useEffect, useState } from 'react';
import { TURN } from './../const.js';
import WinnerModal from './WinnerModal.jsx';

export default function Game({board, setBoard, dim}){

	const [turn, setTurn] = useState(TURN.x);
	const [winner, setWinner] = useState(null);
	const [winnerText, setWinnerText] = useState(null);

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
				setWinner(first_col);
				setWinnerText('El juego ha terminado, parece que ha ganado');
				return;
			}

			if(win_row && first_row != ''){
				setWinner(first_row);
				setWinnerText('El juego ha terminado, parece que ha ganado');
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
			setWinner(board[0][0]);
			setWinnerText('El juego ha terminado, parece que ha ganado');
			return;
		}

		if(other_diag && board[0][board.length - 1] != ''){
			setWinner(board[0][board.length - 1]);
			setWinnerText('El juego ha terminado, parece que ha ganado');
			return;
		}

		if(is_filled){
			setWinner('');
			setWinnerText('El juego ha terminado, parece que hubo un empate');
			return;
		}

	}, [board]);

	return (
		<>
			<main className='board'>
				<h1>Gato</h1>
				<section className='game' style={{gridTemplateColumns: `repeat(${dim}, 1fr)`}}>
					{
						board.map((element, row) => (
							element.map((e, col) => (
								<Square 
                                    key={`row-${row}-col-${col}`} 
                                    className={`row-${row}-col-${col}`} 
                                    updateBoard={() => {updateBoard(row, col);}}
                                >{e}</Square>
							))
						))
					}
				</section>

				<section className='turn'>
					<Square isSelected={turn == TURN.x}>{TURN.x}</Square>
					<Square isSelected={turn == TURN.o}>{TURN.o}</Square>
				</section>

				{winner && <WinnerModal winnerText={winnerText} winner={winner} />}
			</main>
		</>
	);

}