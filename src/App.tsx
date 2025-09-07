import "./App.css";
import Card from "./components/Card";
import FetchingPokemon from "./components/FetchingPokemon";

const App = () => {
  return (
    <div>
      <p>PoKEMON</p>
      <FetchingPokemon />
      <Card />
    </div>
  );
};

export default App;
