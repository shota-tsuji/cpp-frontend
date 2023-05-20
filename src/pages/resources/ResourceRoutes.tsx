import React from "react";
import {Route, Routes} from "react-router-dom";
import ResourceIndexPage from "./ResourceIndexPage";

export default function ResourceRouter() {
    return (
        <React.Fragment>
            <div>
                <Routes>
                    <Route index element={<ResourceIndexPage/>}/>
                </Routes>
            </div>
        </React.Fragment>
    );
}
