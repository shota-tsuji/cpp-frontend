import React from "react";
import {Route, Routes} from "react-router-dom";
import ResourceIndexPage from "./ResourceIndexPage";

export default function ResourceRouter() {
    return (
        <React.Fragment>
            <Routes>
                <Route index element={<ResourceIndexPage/>}/>
            </Routes>
        </React.Fragment>
    );
}
