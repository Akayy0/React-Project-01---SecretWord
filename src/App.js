// css
import './App.css';

// react
import { useCallback,useEffect,useState } from 'react';

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

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);

  const [words] = useState(wordsList)
  

  // states para as funçoes responsaveis por definir as letras,categorias e suas palavras
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([]);

  // Função de aleatorização das palavras e suas categorias
  const pickWordAndCategory = () =>{
    // para categorias
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    // para palavras
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    return {word,category};
  }
 






  // função que ficara responsavel para começar o jogo
    // A função start game ia como prop ao componente start screen
    // a partir disso ao clciarmos no botao, somos direcionados ao proximo estagio
    // ela tambem ficara responsavel por definir as palavras que seram aplicadas ao jogo
    const startGame = () =>{
      // função para pegar a palavra e categoria
      const {word,category} = pickWordAndCategory();
      console.log(word,category)



    setGameStage(stages[1].name);
  };

  // função responsavel pelo input da letra no jogo e tambem o fim do jogo
  const verifyLetter = () =>{
    setGameStage(stages[2].name);
  }

  // função para reiniciar o jogo
  const retry = () =>{
    setGameStage(stages[0].name);
  };


  return (
    <div className='App'>
      {/* teremos acesso a função, como prop, no componente */}
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && <Game verifyLetter={verifyLetter}/>}
      {gameStage === "end" && <GameOver retry={retry}/>}
      
      
    </div>
  );
}

export default App;
