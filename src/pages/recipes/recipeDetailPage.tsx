import React from "react";
import { useRecipeDetailQuery } from "../../generated/graphql";
import { Route, useParams } from "react-router-dom";

export default function RecipeDetailPage() {
  //const { id } = useParams<{ te: string }>();
  const params = useParams();
  const [result, _reexecuteQuery] = useRecipeDetailQuery({ variables: { recipeId: params.recipeId! } });
  const { data, fetching, error } = result;

  if (error != null) {
    return <>{JSON.stringify(error)}</>;
  }
  if (fetching) return <p>Loading...</p>;

  let recipeDetail = data!.recipeDetail;
  let {title, description, steps, ...rest } = recipeDetail;

  return (
            <React.Fragment>
          <p>{recipeDetail.id}: {recipeDetail.title}: {recipeDetail.description}</p>
          <ul>
{steps.map(step => (<li key={step.id}>{step.description}, {step.duration}</li>))}
          </ul>
            </React.Fragment>
          );
}
