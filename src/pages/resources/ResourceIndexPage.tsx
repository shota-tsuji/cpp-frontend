import React, {useMemo} from "react";
import {Resource, useResourcesQuery} from "../../generated/graphql";
import {useDisclosure} from '@mantine/hooks';
import {Button, Paper, Title} from "@mantine/core";
import type {MRT_ColumnDef} from 'mantine-react-table';
import {MantineReactTable} from 'mantine-react-table';

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
                    enableRowSelection //enable some features
                    enableColumnOrdering
                    enableGlobalFilter={false} //turn off a feature
                />
            </Paper>
        </React.Fragment>
    );
}