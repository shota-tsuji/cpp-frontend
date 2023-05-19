import React from "react";
import '../App.css';
import {Route, Routes} from "react-router-dom";
import RecipeRouter from "./recipes/RecipeRoutes";
import StepButton, {StepButtonProps} from "../features/process/StepButton";

// use wildcard pattern to segregate and match to multiple nested routes.
// https://reactrouter.com/en/main/route/route#splats
// https://stackoverflow.com/questions/70815495/react-nested-routes-for-every-folder
export default function MainRouter() {
    return (
        <Routes>
            <Route path="/" element={<ProcessGrid/>}/>
            <Route path="/recipes/*" element={<RecipeRouter/>}/>
            <Route path="/process/*" element={<ProcessGrid/>}/>
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
    const step_buttons = props.steps.map((step) => <StepButton top={step.top} left={step.left} height={step.height}
                                                               description={step.description}/>);
    return (
        <div className="process-step" style={{top: props.top, left: props.left, height: props.height, width: 260}}>
            {step_buttons}
        </div>
    );
}

type VerticalStartBarProps = { height: number; width: number; }

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
        <div style={{pos: "absolute", top: 0, left: 0, width: 80, height: 60}}>
            <span>{props.time}min</span>
        </div>
    );
}

type TimeHorizontalBarProps = {
    width: number;
    height: number;
    top: number;
}

function TimeHorizontalBar(props: TimeHorizontalBarProps) {
    return (
        <div className="div-horizontal" style={{top: props.top, height: props.height, width: props.width}}>
        </div>
    );
}

function ProcessGrid() {
    const resource_steps = [
        [
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
        ], [
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
        ]
    ];

    const height = 60;
    const width = 260;
    const left_pad = 30;
    const resource_kind = 2;
    const unit_of_time = 5;

    const time_label_count = 6;
    const time_label_values = Array.from(Array(time_label_count).keys()).map(x => x * unit_of_time);
    const time_label_list = time_label_values.map((value) => <TimeLabel time={value}/>);

    const bar_width = width * resource_kind;
    const bar_list = Array.from(Array(time_label_count).keys())
        .map(i => <TimeHorizontalBar top={i * height}
                                     height={height}
                                     width={bar_width}/>);
    const bar_height = (time_label_count - 1) * height;

    const resource_columns = Array.from(Array(resource_kind).keys())
        .map(i => <ResourceColumn top={0}
                                  left={i * width + left_pad}
                                  height={bar_height}
                                  steps={resource_steps[i]}/>);

    return (
        <div className="recipe-grid" style={{top: -300, left: -400}}>
            <div className="process-bar-side">
                {time_label_list}
            </div>
            <div className="process" style={{left: 80}}>
                <div className="process-bar-horizontal" style={{left: left_pad}}>
                    {bar_list}
                </div>

                <VerticalStartBar height={bar_height} width={left_pad}/>

                {resource_columns}
            </div>
        </div>
    );
}
