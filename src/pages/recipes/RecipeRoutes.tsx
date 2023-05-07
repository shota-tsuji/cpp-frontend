import React from "react";
import { Redirect, Route, Routes } from "react-router-dom";
import RecipeIndexPage from "./RecipeIndexPage";
import RecipeDetailPage from "./recipeDetailPage";

const RecipeIndex = () => {
    return (
<p>RecipeIndex</p>
            );
}

const RecipeIndex2 = () => {
    return (
<p>RecipeIndex2</p>
            );
}
// <Route path="recipes" element={<RecipeIndex />} /> 
//<Route path="/recipes" element={<RecipeIndexPage />} />

// use index route to distinguish index from matching other patterns.
// https://reactrouter.com/en/main/route/route#index
export default function RecipeRouter() {
    return (
            <React.Fragment>
            <div>
            <Routes>
            <Route index element={<RecipeIndexPage />} />
            <Route path=":recipeId" element={<RecipeDetailPage />} />
            </Routes>
            </div>
            </React.Fragment>
            );
}
