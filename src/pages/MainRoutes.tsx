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
        <div className="process-step" style={{top: props.top, left: props.left, height: props.height, width: 260}}>
            {step_buttons}
        </div>
    );
}

type VerticalStartBarProps = {height: number; width: number;}

function VerticalStartBar(props: VerticalStartBarProps) {
    return (
        <div className="process-bar-vertical" style={{top: 0, left: 0, height: props.height, width: props.width}}>
        </div>
    );
}

type TimeLabelProps = {
    time: number;
}

function TimeLabel(props: TimeLabelProps) {
    return (
        <div style={{pos: "absolute", top: 0, left: 0, width: 80, height: 60}} >
            <span>{props.time}min</span>
        </div>
    );
}

type TimeHorizontalBarProps = { width: number; }

function TimeHorizontalBar(props: TimeHorizontalBarProps) {
    return (
        <div style={{height: 60}}>
            <Divider style={{pos: "absolute", top: 0, left: 0, width: props.width}}/>
        </div>
    );
}

function ProcessGrid() {
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
            height: 118,
            description: "Step2"
        }
    ];
    const unit_of_time = 5;
    const time_label_count = 6;
    const bar_width = 260 * 2 + 80;
    const time_label_values = Array.from(Array(time_label_count).keys()).map(x => x * unit_of_time);
    const time_label_list = time_label_values.map((value) => <TimeLabel time={value} />);
    const bar_list = Array.from(Array(time_label_count).keys()).map(_ => <TimeHorizontalBar width={bar_width} />);
return (
    <div className="process">
        <div className="process-bar-side">
            {time_label_list}
        </div>
        <div className="process-bar-horizontal">
            {bar_list}
        </div>

        <VerticalStartBar height={300} width={80} />

        <ResourceColumn top={0} left={80} height={300} steps={resource0_steps} />
        <ResourceColumn top={0} left={340} height={300} steps={resource1_steps} />
    </div>
  );
}
