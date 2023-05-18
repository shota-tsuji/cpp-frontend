import React from "react";
import '../App.css';
import {Grid, Container, Box, Button, Divider} from '@mantine/core';
import { Route, Routes } from "react-router-dom";
import RecipeRouter from "./recipes/RecipeRoutes";
import StepButton from "../features/process/StepButton";

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
        <div className="process-bar-side">
           <div style={{pos: "absolute", top: 0, left: 0, width: 80, height: 60}} >
               <span>0min</span>
           </div>
            <div style={{pos: "absolute", top: 60, left: 0, width: 80, height: 60}} >
                <span>5min</span>
            </div>
        </div>
        <div className="process-bar-horizontal">
            <div style={{height: 60}}>
                <Divider style={{pos: "absolute", top: 0, left: 0, width: 500}}/>
            </div>
            <div style={{height: 80}}>
                <Divider style={{pos: "absolute", top: 0, left: 0, width: 1000}}/>
            </div>
        </div>
        <div >
            <StepButton top={0} left={80} height={58} description="Step1" />
            <StepButton top={60} left={80} height={58} description="Step2" />
        </div>
        <div className="process-step">
            <StepButton top={60} left={340} height={58} description="Step3" />
            <StepButton top={120} left={340} height={58} description="Step4" />
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
