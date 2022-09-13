// css
import './App.css';

// react
import {useCallback,useEffect,useState } from 'react';

// data
// importara os dados das palavras para inserirmos em nosso state
import {wordsList} from "./data/words"

// components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

// ficara responsavel por exibir os estagios que o jogo esta, utilizando junto ao useState
const stages = [
  {id:1, name:"start"},
  {id:2, name:"game"},
  {id:3, name:"end"},
];

const guessesQty = 3;


function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);

  const [words] = useState(wordsList)
  

  // states para as funçoes responsaveis por definir as letras,categorias e suas palavras
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  // Função de aleatorização das palavras e suas categorias
  const pickWordAndCategory = useCallback(() =>{
    // para categorias
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    // para palavras
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    return {word,category};
  },[words]);
 

  // função que ficara responsavel para começar o jogo
    // A função start game ia como prop ao componente start screen
    // a partir disso ao clciarmos no botao, somos direcionados ao proximo estagio
    // ela tambem ficara responsavel por definir as palavras que seram aplicadas ao jogo
    const startGame = useCallback(() =>{
      // limpar todas as letras
      clearLetterStates();
      // função para pegar a palavra e categoria
      const {word,category} = pickWordAndCategory();

      // parte responsavel por separar as letras da palavra escolhida
      let wordLetters = word.split("");

      wordLetters = wordLetters.map((l)=>l.toLowerCase())

      // setar os estados
      setPickedWord(word);
      setPickedCategory(category);
      setLetters(wordLetters);
     
    setGameStage(stages[1].name);
  },[pickWordAndCategory]);

  // função responsavel pelo input da letra no jogo e tambem o fim do jogo
  const verifyLetter = (letter) =>{
    const normalizedLetter = letter.toLowerCase()

    // checar se a letra ja foi utilizada
    if(guessedLetters.includes(normalizedLetter)||wrongLetters.includes(normalizedLetter)){
      return;
    }

    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters)=>[
        ...actualGuessedLetters,
        normalizedLetter,
      ])
    }else{
      setWrongLetters((actualWrongLetters)=>[
        ...actualWrongLetters,
        normalizedLetter,
      ])

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  }
  

  const clearLetterStates = () =>{
    setGuessedLetters([]);
    setWrongLetters([]);

  };
  // hook que ficara responsavel por passar para o proximo estagio
  useEffect(()=>{

    if(guesses<=0){
      // resetar todos os states
      clearLetterStates();

      setGameStage(stages[2].name);
    }

  },[guesses]);

  // verificar a vitoria
  useEffect(()=>{

    const uniqueLetters = [...new Set(letters)];
    // adcicionar score e recomeçar com outras palavras
    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name){
      
      setScore((actualScore) => (actualScore += 100));

      startGame();
    }

  },[guessedLetters, letters, startGame, gameStage])

  // função para reiniciar o jogo
  const retry = () =>{
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name);
  };


  return (
    <div className='App'>
      {/* teremos acesso a função, como prop, no componente */}
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && 
        <Game 
          verifyLetter={verifyLetter} 
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory} 
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score} />}
      {gameStage === "end" && <GameOver retry={retry} score={score}/>}
      
      
    </div>
  );
}

export default App;
