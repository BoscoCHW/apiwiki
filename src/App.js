// import logo from './logo.svg';
// import './App.css';
import { BiArchive } from "react-icons/bi"
import CocktailInfo from "./components/CocktailInfo"
import { useState, useEffect } from "react"
// import appointmentList from "./data.json"

let cocktails = []

async function getRandomCocktail() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  
  let response = await fetch(url, {method: 'GET'})
  const data = await response.json()
  const cocktailRaw = data.drinks[0]
  
  let ingredientsArray = []
  for (let key in cocktailRaw) {
    if (key.includes("strIngredient") && cocktailRaw[key] !== null) {
      ingredientsArray.push(cocktailRaw[key])
      // console.log(key, cocktailRaw[key])
    }
  }
  
  const ingredients = ingredientsArray.join(", ")
  let cocktail = {
    id: cocktailRaw.idDrink,
    name: cocktailRaw.strDrink,
    ingredients,
    instructions: cocktailRaw.strInstructions
  }
  cocktails.push(cocktail)
  console.log(cocktails)
}


function App() {
  let [toggleButton, setToggleButton] = useState(false)
  useEffect(() => {
    const randomCocktailBtn = document.querySelector('#random-cocktail-btn')
    randomCocktailBtn.addEventListener('click', getRandomCocktail)
  })
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl"><BiArchive className="inline-block text-red-400 align-top"/>Hello World</h1>
      <div><button id="random-cocktail-btn" type="button" onClick={() => {setToggleButton(!toggleButton)}}
        className={`p-1.5 mr-1.5 mt-1 rounded text-white hover:bg-red-700 ${toggleButton ? 'bg-blue-500' : 'bg-gray-500'}`}>
        Get a Cocktail
        </button></div>
      <ul className="divide-y divide-gray-200">

        {cocktails
          .map(cocktail => (
            <CocktailInfo key={cocktail.id}
            cocktail={cocktail}
            />
          ))
        }
      </ul>
    
    </div>
  );
}

export default App;



