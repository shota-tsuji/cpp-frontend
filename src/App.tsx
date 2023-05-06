import './App.css'

//import { useRecipesQuery, useRecipeDetailQuery } from './generated/graphql';
import { useRecipesQuery } from './generated/graphql';
import { MantineProvider, Table } from '@mantine/core';

function App() {
  //const [result, _reexecuteQuery] = useRecipeDetailQuery({ variables: { recipeId: "00000000-0000-0000-0000-000000000000" } })
  const [result, _reexecuteQuery] = useRecipesQuery();
  const { data, fetching, error } = result;
  console.log(JSON.stringify({ fetching, data, error }, null, 2));

  if (error != null) {
    return <>{JSON.stringify(error)}</>;
  }
  if (fetching) return <p>Loading...</p>;

  //let recipeDetail = data!.recipeDetail;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //let {id, title, description, steps, ...rest } = recipeDetail;

          //<p>{recipeDetail.id}: {recipeDetail.title}: {recipeDetail.description}</p>
          //<ul>
//{steps.map(step => (<li key={step.id}>{step.description}, {step.duration}</li>))}
          //</ul>
  const recipes = data!.recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td>{recipe.title}</td>
              </tr>
              ));

  return (
<>
<MantineProvider withGlobalStyles withNormalizeCSS>
<Table>
	<thead>
		<tr>
				<th>Recipe name</th>
		</tr>
	</thead>
	<tbody>{recipes}</tbody>
</Table>
</MantineProvider>

</>
  )
}

export default App
