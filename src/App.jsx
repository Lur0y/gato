import { useEffect, useState } from "react";
import Game from "./components/Game";

export default function App() {
	
	const [playing, setPlaying] = useState(false);
	const [dim, setDim] = useState(3);
	const [board, setBoard] = useState(Array(dim).fill().map(() => Array(dim).fill('')));

	return(
		<>
			{
				playing? 
					<Game dim={dim} board={board} setBoard={setBoard} />
				:
				<div className="input-container">
					<h1 className="title-input">Selecciona el tamaño del juego</h1>
					<input 
						type="number" 
						className='input-dim' 
						id="input-dim-id" 
						defaultValue={3}	
						onChange={(e) => {
							
							let new_dim = parseInt(e.target.value);
							
							if(new_dim > 0){
								setDim(new_dim);
								setBoard(Array(new_dim).fill().map(() => Array(new_dim).fill('')));
							}
							
						}}
					/>
					<button
						className="button-play" 
						onClick={() => {
							setPlaying(true);
						}}
					>¡Jugar!</button>
				</div>
			}
		</>
	);

}
