import React from "react";
import {useResourcesQuery} from "../../generated/graphql";
import {Link} from "react-router-dom";
import {Paper, Table, Title} from "@mantine/core";

export default function ResourceIndexPage() {
    const [result, _reexecuteQuery] = useResourcesQuery();
    const {data, fetching, error} = result;
    console.log(JSON.stringify({fetching, data, error}, null, 2));

    if (error != null) {
        return <>{JSON.stringify(error)}</>;
    }
    if (fetching) return <p>Loading...</p>;

    const resourceList = data!.resources.map(resource => (
        <tr key={resource.id}>
            <td><Link to={resource.id}>{resource.name}</Link></td>
            <td>{resource.amount}</td>
        </tr>
    ));

    return (
        <React.Fragment>
            <Title order={1} mt="auto">Resources</Title>
            <Paper shadow="xs" mt="md" p="lg">
            <Table highlightOnHover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>{resourceList}</tbody>
            </Table>
            </Paper>
        </React.Fragment>
    );
}