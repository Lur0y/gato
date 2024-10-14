import Square from "./Square";

export default function WinnerModal({winnerText, winner}){

    return(
        <>
            <section className='winner'>
                <div className='text'>
                    <h2>{winnerText}</h2>
                    <header className='win'>
                        {winner && <Square>{winner}</Square>}
                    </header>
                    <footer>
                        <button onClick={() => {window.location.reload();}}>Empezar de nuevo</button>
                    </footer>
                </div>
            </section>
        </>
    );

}