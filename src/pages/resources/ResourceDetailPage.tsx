import React from "react";
import {Center, Route, Routes, Text, useParams} from "react-router-dom";
import {useResourceQuery} from "../../generated/graphql";
import {Title} from "@mantine/core";
import ResourceDetailEdit from "./ResourceDetailEdit";

export default function ResourceDetailPage() {
    const params = useParams();
    const [result, _reexecuteQuery] = useResourceQuery({variables: {resourceId: params.resourceId!}});
    const {data, fetching, error} = result;
    console.info(data);

    if (error != null) {
        return <>{JSON.stringify(error)}</>;
    }
    if (fetching || data == null) return <p>Loading...</p>;

    const {id, name, amount} = data.resource;

    return (
        <React.Fragment>
            <Title order={1} mt="auto">{name}</Title>
            <Center>
                <Text>Amount: {amount}</Text>
            </Center>
            <div>
                <Routes>
                    <Route path="edit" element={<ResourceDetailEdit/>}/>
                </Routes>
            </div>
        </React.Fragment>
    );
}