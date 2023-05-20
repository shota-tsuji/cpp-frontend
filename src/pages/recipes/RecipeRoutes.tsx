import React from "react";
import {Route, Routes} from "react-router-dom";
import RecipeIndexPage from "./RecipeIndexPage";
import RecipeDetailPage from "./recipeDetailPage";

// use index route to distinguish index from matching other patterns.
// https://reactrouter.com/en/main/route/route#index
export default function RecipeRouter() {
    return (
        <React.Fragment>
            <div>
                <Routes>
                    <Route index element={<RecipeIndexPage/>}/>
                    <Route path=":recipeId/*" element={<RecipeDetailPage/>}/>
                </Routes>
            </div>
        </React.Fragment>
    );
}
