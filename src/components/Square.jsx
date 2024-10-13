export default function Square({children, updateBoard, index, isSelected}){

    return (
        <>
            <div className={`square ${isSelected? 'is-selected' : ''}`} onClick={updateBoard}>
                {children}
            </div>
        </>
    );
    
}