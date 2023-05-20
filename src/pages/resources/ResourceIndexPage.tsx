import React from "react";
import {useResourcesQuery} from "../../generated/graphql";
import {Link} from "react-router-dom";
import {Table, Title} from "@mantine/core";

export default function ResourceIndexPage() {
    const [result, _reexecuteQuery] = useResourcesQuery();
    const {data, fetching, error} = result;
    console.log(JSON.stringify({fetching, data, error}, null, 2));

    if (error != null) {
        return <>{JSON.stringify(error)}</>;
    }
    if (fetching) return <p>Loading...</p>;

    const resources = data!.resources.map(resource => (
        <tr key={resource.id}>
            <td>
                <Link to={resource.id}>{resource.name}</Link>
            </td>
        </tr>
    ));

    return (
        <React.Fragment>
            <Title order={1} mt="auto">Resources</Title>
            <Table>
                <thread>
                <tr>
                    <th>Name</th>
                </tr>
                </thread>
                <tbody>{resources}</tbody>
            </Table>
        </React.Fragment>
    );
}