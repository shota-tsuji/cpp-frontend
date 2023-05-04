import './App.css'

import { useRecipesQuery } from './generated/graphql';


function App() {
  const [result, _reexecuteQuery] = useRecipesQuery();
  const { data, fetching, error } = result;
  console.log(JSON.stringify({ fetching, data, error }, null, 2));

  if (error != null) {
    return <>{JSON.stringify(error)}</>;
  }
  if (fetching) return <p>Loading...</p>;


  return (
          <ul>
          {data.recipes.map(recipe => (
                      <li key={recipe.id}>{recipe.id}, {recipe.title}, {recipe.description}</li>
                      ))}
          </ul>

  )
}

export default App
