import "./StartScreen.css";
import logo from "../components/assets/SWlogo.png"

const StartScreen = ({startGame}) => {
  return (
    <div className="start">

      <div className="logo">
        <img src={logo} alt="logo"/>
      </div>
 
        <button onClick={startGame}>Começar</button>

    </div>
  )
}

export default StartScreen