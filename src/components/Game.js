import { useState, useRef } from "react";
import "./Game.css";

const Game = ({verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score,}) => {
  
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e) =>{
    e.preventDefault();
    verifyLetter(letter);
    setLetter("");

    // usando o hook useRef, podemos usar o mesmo no input para deixar mais dinamico o seu uso, neste caso, assim que inputamos a letra, ela e removida do input do usuario
    letterInputRef.current.focus();
  };


  return (
    <div className="game">
      <p className="points">
        <span> {score} </span>
      </p>

      <h1>Descubra a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Tentativas {guesses}</p>

      <div className="wordContainer">
        {letters.map((letter,i)=>(
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        ))}

      </div>

      <div className="letterContainer">
        <p>Encontre uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="letter" maxLength="1" required onChange={(e)=> setLetter(e.target.value)} value={letter} ref={letterInputRef} />
          <button>Enviar</button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Ja utilizadas</p>
        {wrongLetters.map((letter,i)=>(
          <span key={i}>{letter}, </span>
        ))}
      </div>

    </div>
  )
}

export default Game