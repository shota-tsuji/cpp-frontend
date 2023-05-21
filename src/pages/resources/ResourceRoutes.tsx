import React from "react";
import {Route, Routes} from "react-router-dom";
import ResourceIndexPage from "./ResourceIndexPage";
import ResourceDetailPage from "./ResourceDetailEdit";
import ResourceDetailEdit from "./ResourceDetailEdit";

export default function ResourceRouter() {
    return (
        <React.Fragment>
            <Routes>
                <Route index element={<ResourceIndexPage/>}/>
                <Route path=":resourceId/*" element={<ResourceDetailPage/>}/>
            </Routes>
        </React.Fragment>
    );
}
