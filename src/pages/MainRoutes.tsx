import React from "react";
import '../App.css';
import {Grid, Container, Box, Button, Divider} from '@mantine/core';
import { Route, Routes } from "react-router-dom";
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
            <Route path="/process/*" element={<MyGrid />} />
            </Routes>
            );
}

function MyGrid() {
return (
    <div className="process">
        <div className="process-bar-horizontal">
            <div style={{height: 80}}>
                <Divider size={10} style={{pos: "absolute", top: 10, left: 10, width: 500}}/>
            </div>
            <div style={{height: 80}}>
                <Divider size={10} style={{pos: "absolute", top: 10, left: 10, width: 1000}}/>
            </div>
            <div style={{height: 80}}>
                <Divider size={10} style={{pos: "absolute", top: 10, left: 10, width: 1000}}/>
            </div>
        </div>
        <div >
            <Button className="process-step" style={{width: 80, pos: "absolute", top: 20, left: 0}}>Step 1</Button>
            <Button className="process-step" style={{width: 80, pos: "absolute", top: 20, left: 100}}>Step 2</Button>
        </div>
        <div className="process-step">
            <Button className="process-step" style={{width: 120, pos: "absolute", top: 100, left: 0, ta: "left"}}>Step 3</Button>
            <Button className="process-step" style={{width: 80, pos: "absolute", top: 100, left: 100}}>Step 4</Button>
        </div>
        <div className="process-bar-vertical" style={{height: 80}}>
            <Divider orientation="vertical" size={10} style={{pos: "absolute", top: 10, left: 80, height: 200}}/>
        </div>
        <div className="process-bar-vertical" style={{height: 80, top: 0, left: 100}}>
            <Divider orientation="vertical" size={10} style={{pos: "absolute", height: 200}}/>
        </div>
        <div className="process-bar-vertical" style={{height: 80, top: 0, left: 200}}>
            <Divider orientation="vertical" size={10} style={{pos: "absolute", height: 200}}/>
        </div>
    </div>
  );
}
