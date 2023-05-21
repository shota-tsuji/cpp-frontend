import React, {useMemo} from "react";
import {Resource, useResourcesQuery} from "../../generated/graphql";
import {useDisclosure} from '@mantine/hooks';
import {Box, Button, Group, Menu, NumberInput, Paper, TextInput, Title} from "@mantine/core";
import type {MRT_ColumnDef} from 'mantine-react-table';
import {MantineReactTable} from 'mantine-react-table';
import {useForm} from "@mantine/form";
import {IconEdit} from '@tabler/icons-react';

export default function ResourceIndexPage() {
    const [opened, {open, close}] = useDisclosure(false);
    const columns = useMemo<MRT_ColumnDef<Resource>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
            },
            {
                accessorKey: 'name',
                header: 'Name',
                mantineTableHeadCellProps: {sx: {color: 'green'}}, //custom props
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
            }
        ],
        [],
    );

    const [result, _reexecuteQuery] = useResourcesQuery();
    const {data, fetching, error} = result;
    console.log(JSON.stringify({fetching, data, error}, null, 2));

    if (error != null) {
        return <>{JSON.stringify(error)}</>;
    }
    if (fetching) return <p>Loading...</p>;

    const resources = data!.resources;

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
                <MantineReactTable
                    columns={columns}
                    data={resources}
                    enableRowActions
                    enableRowSelection //enable some features
                    enableColumnOrdering
                    enableGlobalFilter={false} //turn off a feature
                    renderRowActionMenuItems={({row}) => [<Menu.Item icon={<IconEdit/>} key={1} onClick={() => {
                        console.info('View Profile', row);
                    }}>Edit</Menu.Item>]}
                />
            </Paper>
            <ResourceEdit id={0} name="aaa" amount={10}/>
        </React.Fragment>
    );
}

type ResourceEditProps = {
    id: number;
    name: string;
    amount: number;
}

function ResourceEdit({id, name, amount}: ResourceEditProps) {
    const form = useForm({
        initialValues: {
            name: name,
            amount: amount,
        }
    });
    return (
        <Box maw={300} mx="auto">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="your@email.com"
                    {...form.getInputProps('name')}
                />

                <NumberInput
                    withAsterisk
                    mt="md"
                    label="Amount"
                    {...form.getInputProps('amount')}
                />

                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    );
}