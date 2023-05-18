import React from "react";
import '../App.css';
import { MantineTheme, useMantineTheme, Divider} from '@mantine/core';
import { Route, Routes } from "react-router-dom";
import RecipeRouter from "./recipes/RecipeRoutes";
import StepButton, {StepButtonProps} from "../features/process/StepButton";

// use wildcard pattern to segregate and match to multiple nested routes.
// https://reactrouter.com/en/main/route/route#splats
// https://stackoverflow.com/questions/70815495/react-nested-routes-for-every-folder
export default function MainRouter() {
    return (
            <Routes>
            <Route path="/" element={<ProcessGrid />} />
            <Route path="/recipes/*" element={<RecipeRouter />} />
            <Route path="/process/*" element={<ProcessGrid />} />
            </Routes>
            );
}

type ResourceColumnProps = {
    top: number;
    left: number;
    height: number;
    steps: [StepButtonProps];
}

function ResourceColumn(props: ResourceColumnProps) {
    const theme = useMantineTheme();
    const step_buttons = props.steps.map((step) => <StepButton top={step.top} left={step.left} height={step.height} description={step.description} />);
    /* <StepButton top={0} left={0} height={58} description="Step1" /> */
    /* <StepButton top={60} left={0} height={58} description="Step2" /> */
    return (
        <div className="process-step" style={{top: props.top, left: props.left, height: props.height, width: 260, outline: "solid", color: theme.colors.dark}}>
            {step_buttons}
        </div>
    );
}

function ProcessGrid() {
    const theme = useMantineTheme();
    const resource0_steps = [
        {
            top: 0,
            left: 0,
            height: 58,
            description: "Step1"
        },
        {
            top: 60,
            left: 0,
            height: 58,
            description: "Step2"
        }
    ];
    const resource1_steps = [
        {
            top: 60,
            left: 0,
            height: 58,
            description: "Step3"
        },
        {
            top: 120,
            left: 0,
            height: 58,
            description: "Step2"
        }
    ];
    /*
        <div className="process-step" style={{top: 0, left: 340, height: 600, width: 260, outline: "solid"}}>
            <StepButton top={60} left={0} height={58} description="Step3" />
            <StepButton top={120} left={0} height={58} description="Step4" />
        </div>
     */
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
        <ResourceColumn top={0} left={80} height={600} steps={resource0_steps} />
        <ResourceColumn top={0} left={340} height={600} steps={resource1_steps} />
        <div className="process-bar-vertical" style={{height: 80, top: 0, left: 200}}>
            <Divider orientation="vertical" size={10} style={{pos: "absolute", height: 200}}/>
        </div>
    </div>
  );
}
