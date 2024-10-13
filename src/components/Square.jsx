export default function Square({children, updateBoard, className, isSelected}){

    return (
        <>
            <div className={`square ${isSelected? 'is-selected' : ''} ${className}`} onClick={updateBoard}>
                {children}
            </div>
        </>
    );
    
}