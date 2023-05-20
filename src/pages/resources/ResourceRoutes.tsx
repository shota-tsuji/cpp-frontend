import React from "react";
import {Route, Routes} from "react-router-dom";
import ResourceIndexPage from "./ResourceIndexPage";
import RecipeDetailPage from "../recipes/recipeDetailPage";

export default function ResourceRouter() {
    return (
        <React.Fragment>
            <div>
                <Routes>
                    <Route index element={<ResourceIndexPage/>}/>
                    <Route path=":recipeId/*" element={<RecipeDetailPage/>}/>
                </Routes>
            </div>
        </React.Fragment>
    );
}
