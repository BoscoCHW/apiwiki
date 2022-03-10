// import logo from './logo.svg';
// import './App.css';
import { BiArchive } from "react-icons/bi";
import CocktailInfo from "./components/CocktailInfo";
import { useState, useEffect, useCallback } from "react";
// import CustomerList from "./components/CustomerList";

async function addRandomCocktail(cocktails, setCocktails) {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  const response = await fetch(url, { method: "GET" });
  const data = await response.json();
  const cocktailRaw = data.drinks[0];

  let ingredientsArray = [];
  for (let key in cocktailRaw) {
    if (key.includes("strIngredient") && cocktailRaw[key] !== null) {
      ingredientsArray.push(cocktailRaw[key]);
    }
  }

  const ingredients = ingredientsArray.join(", ");
  const cocktail = {
    id: cocktailRaw.idDrink,
    name: cocktailRaw.strDrink,
    ingredients,
    instructions: cocktailRaw.strInstructions,
  };
  setCocktails([...cocktails, cocktail]);
}

function App() {
  let [toggleButton, setToggleButton] = useState();
  let [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    addRandomCocktail(cocktails, setCocktails);
  }, [toggleButton]);
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl">
        <BiArchive className="inline-block text-red-400 align-top" />
        Hello World
      </h1>
      <div>
        <button
          id="random-cocktail-btn"
          type="button"
          onClick={() => setToggleButton(!toggleButton)}
          className={`p-1.5 mr-1.5 mt-1 rounded text-white hover:bg-red-700 bg-blue-500`}
        >
          Get a Cocktail
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {cocktails.map((cocktail) => (
          <CocktailInfo key={cocktail.id} cocktail={cocktail} />
        ))}
      </ul>
    </div>
  );
}

export default App;
