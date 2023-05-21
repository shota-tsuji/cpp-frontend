import React, {useMemo, useState} from "react";
import {Resource, useResourcesQuery} from "../../generated/graphql";
import {useDisclosure} from '@mantine/hooks';
import {Box, Button, Dialog, Group, Menu, NumberInput, Paper, TextInput, Title} from "@mantine/core";
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

    const handleSubmit = ((resource: Resource) => {
        console.info('submitted');
    });

    return (
        <React.Fragment>
            <Title order={1} mt="auto">Resources</Title>
                <MantineReactTable
                    columns={columns}
                    data={resources}
                    enableRowActions
                    enableRowSelection //enable some features
                    enableColumnOrdering
                    enableGlobalFilter={false} //turn off a feature
                    renderRowActionMenuItems={({row}) => [<Menu.Item icon={<IconEdit/>} key={1} onClick={() => {
                        open();
                    }}>Edit</Menu.Item>]}
                />
                <EditResourceDialog columns={columns} onClose={close} onSubmit={handleSubmit} open={opened} />
            <ResourceEdit id={0} name="aaa" amount={10}/>
        </React.Fragment>
    );
}

interface EditResourceDialogProps {
    columns: MRT_ColumnDef<Resource>[];
    onClose: () => void;
    onSubmit: (values: Resource) => void;
    open: boolean;
}

export const EditResourceDialog = ({columns, onClose, onSubmit, open}: EditResourceDialogProps) => {
    const [values, setValues] = useState<any>(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = '';
            return acc;
        }, {} as any),
    );
    const form = useForm({
        initialValues: {
            name: values.name,
            amount: values.amount,
        }
    });
    const handleSubmit = () => {
        //put your validation logic here
        onSubmit(values);
        onClose();
    };

    return (
            <Box maw={300} mx="auto">
                <Dialog opened={open}>
                <Title ta="center">Create New Account</Title>
                <form onSubmit={handleSubmit}>
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
                </Dialog>
            </Box>
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
            <form onSubmit={(e) => e.preventDefault()}>
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