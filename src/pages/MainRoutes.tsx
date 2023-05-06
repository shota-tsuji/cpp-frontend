import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useRecipesQuery } from '../generated/graphql';
import { Table } from '@mantine/core';

export default function MainRouter() {
  const [result, _reexecuteQuery] = useRecipesQuery();
  const { data, fetching, error } = result;
  console.log(JSON.stringify({ fetching, data, error }, null, 2));

  if (error != null) {
    return <>{JSON.stringify(error)}</>;
  }
  if (fetching) return <p>Loading...</p>;

  const recipes = data!.recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td>{recipe.title}</td>
              </tr>
              ));

  return (

<Table>
	<thead>
		<tr>
				<th>Recipe name</th>
		</tr>
	</thead>
	<tbody>{recipes}</tbody>
</Table>
  )
}
