import './App.css'

import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from './pages/MainRoutes';

function App() {
  //const [result, _reexecuteQuery] = useRecipeDetailQuery({ variables: { recipeId: "00000000-0000-0000-0000-000000000000" } })

  //let recipeDetail = data!.recipeDetail;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //let {id, title, description, steps, ...rest } = recipeDetail;

          //<p>{recipeDetail.id}: {recipeDetail.title}: {recipeDetail.description}</p>
          //<ul>
//{steps.map(step => (<li key={step.id}>{step.description}, {step.duration}</li>))}
          //</ul>
  return (
<>
<MantineProvider withGlobalStyles withNormalizeCSS>
<Router>
<MainRouter />
</Router>
</MantineProvider>

</>
  )
}

export default App
