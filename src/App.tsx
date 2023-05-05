import './App.css'

//import { useRecipesQuery, useRecipeDetailQuery } from './generated/graphql';
import { useRecipeDetailQuery } from './generated/graphql';


function App() {
  const [result, _reexecuteQuery] = useRecipeDetailQuery({ variables: { recipeId: "0" } })
  //const [result, _reexecuteQuery] = useRecipesQuery();
  const { data, fetching, error } = result;
  console.log(JSON.stringify({ fetching, data, error }, null, 2));

  if (error != null) {
    return <>{JSON.stringify(error)}</>;
  }
  if (fetching) return <p>Loading...</p>;

  let recipeDetail = data!.recipeDetail;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let {id, title, description, steps, ...rest } = recipeDetail;

  return (
<>
          <p>{recipeDetail.id}: {recipeDetail.title}: {recipeDetail.description}</p>
          <ul>
{steps.map(step => (<li key={step.id}>{step.description}, {step.duration}</li>))}
          </ul>

</>
  )
}

export default App
