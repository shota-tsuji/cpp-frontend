import React from "react";
import {useResourcesQuery} from "../../generated/graphql";
import {useDisclosure} from '@mantine/hooks';
import {Button, Paper, Group, Modal, Table, Title} from "@mantine/core";
import {useForm} from "@mantine/form";

export default function ResourceIndexPage() {
    const [opened, {open, close}] = useDisclosure(false);
    const form = useForm({
        initialValues: {
            amount: 1,
        },
    });

    const [result, _reexecuteQuery] = useResourcesQuery();
    const {data, fetching, error} = result;
    console.log(JSON.stringify({fetching, data, error}, null, 2));

    if (error != null) {
        return <>{JSON.stringify(error)}</>;
    }
    if (fetching) return <p>Loading...</p>;

    const resourceList = data!.resources.map(resource => (
        <tr key={resource.id}>
            <td>{resource.name}</td>
            <td>{resource.amount}</td>
            <td>
                <Button onClick={open}>Open modal</Button>
            </td>
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
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>{resourceList}</tbody>
                </Table>
            </Paper>
        </React.Fragment>
    );
}