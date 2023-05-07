import React from "react";
import { Redirect, Route, Routes } from "react-router-dom";
import RecipeIndexPage from "./RecipeIndexPage";

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

export default function RecipeRouter() {
    return (
            <React.Fragment>
            <div>
            <RecipeIndexPage />
            </div>
            </React.Fragment>
            );
}
