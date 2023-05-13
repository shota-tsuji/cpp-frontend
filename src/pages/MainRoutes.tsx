import React from "react";
import { Redirect, Route, Routes } from "react-router-dom";
import { useRecipesQuery } from '../generated/graphql';
import { Table } from '@mantine/core';
import RecipeRouter from "./recipes/RecipeRoutes";
const Home = () => {
    return (
<p>Home</p>
            );
}

// use wildcard pattern to segregate and match to multiple nested routes.
// https://reactrouter.com/en/main/route/route#splats
// https://stackoverflow.com/questions/70815495/react-nested-routes-for-every-folder
export default function MainRouter() {
    return (
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes/*" element={<RecipeRouter />} />
            </Routes>
            );
}
