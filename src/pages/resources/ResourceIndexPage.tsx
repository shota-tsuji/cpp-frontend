import React from "react";
import {useResourcesQuery} from "../../generated/graphql";
import {Link} from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import {Button, Group, Modal, NumberInput, Paper, Table, Title} from "@mantine/core";

export default function ResourceIndexPage() {
    const [opened, { open, close }] = useDisclosure(false);
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
                <Modal opened={opened} onClose={close} title="Authentication">
                    <NumberInput
                        label="Resource count"
                        description="From 1 to 10"
                        placeholder="Resource count"
                        max={10}
                        min={1}
                    />
                </Modal>
                <Group position="center">
                    <Button onClick={open}>Open modal</Button>
                </Group>
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>{resourceList}</tbody>
            </Table>
            </Paper>
        </React.Fragment>
    );
}