import React from "react";
import {useRecipesQuery} from '../../generated/graphql';
import {Table} from '@mantine/core';
import RecipeAddButton from "../../features/recipes/RecipeAddButton";
import {Link} from "react-router-dom";

export default function RecipeIndexPage() {
    const [result, _reexecuteQuery] = useRecipesQuery();
    const {data, fetching, error} = result;
    console.log(JSON.stringify({fetching, data, error}, null, 2));

    if (error != null) {
        return <>{JSON.stringify(error)}</>;
    }
    if (fetching) return <p>Loading...</p>;

    const recipes = data!.recipes.map((recipe) => (
        <tr key={recipe.id}>
            <td>
                <Link to={recipe.id}>{recipe.title}</Link>
            </td>
        </tr>
    ));

    return (
        <React.Fragment>
            <RecipeAddButton/>
            <Table>
                <thead>
                <tr>
                    <th>Recipe name</th>
                </tr>
                </thead>
                <tbody>{recipes}</tbody>
            </Table>
        </React.Fragment>
    );
}
