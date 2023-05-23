import React, {useMemo, useRef} from "react";
import {Recipe, useRecipesQuery} from '../../generated/graphql';
import {Button, Paper, Title} from '@mantine/core';
import RecipeAddButton from "../../features/recipes/RecipeAddButton";
import {Link} from "react-router-dom";
import type {MRT_ColumnDef} from 'mantine-react-table';
import {MantineReactTable, MRT_TableInstance} from 'mantine-react-table';

export default function RecipeIndexPage() {
    const [result, _reexecuteQuery] = useRecipesQuery();
    const {data, fetching, error} = result;
    console.log(JSON.stringify({fetching, data, error}, null, 2));
    const tableInstanceRef = useRef<MRT_TableInstance<Recipe>>(null); //ts

    const columns = useMemo<MRT_ColumnDef<Recipe>[]>(
        () => [
            {
                accessorKey: 'title',
                header: 'Title',
            },
            {
                accessorKey: 'description',
                header: 'Description',
                mantineTableHeadCellProps: {sx: {color: 'green'}}, //custom props
            },
        ],
        [],
    );


    if (error != null) {
        return <>{JSON.stringify(error)}</>;
    }
    if (fetching) return <p>Loading...</p>;

    const recipes = data!.recipes.map((recipe) => (
        <tr key={recipe.id}>
            <td>
                <Link to={recipe.id}>{recipe.title}</Link>
            </td>
        </tr>
    ));

    /*
            <Table>
                <thead>
                <tr>
                    <th>Recipe name</th>
                </tr>
                </thead>
                <tbody>{recipes}</tbody>
            </Table>
     */

    const someEventHandler = () => {
        const rowSelection = tableInstanceRef.current.getState().rowSelection;
        console.info(rowSelection);
    };

    return (
        <React.Fragment>
            <Title order={1} mt="auto">Recipes</Title>
            <Paper shadow="xs" mt="md" p="lg">

                <RecipeAddButton/>
                <MantineReactTable
                    columns={columns}
                    data={data!.recipes}
                    enableRowSelection //enable some features
                    enableColumnOrdering
                    enableGlobalFilter={false} //turn off a feature
                    renderTopToolbarCustomActions={({table}) => {
                        const handle = () => {
                            console.info(table.getSelectedRowModel().flatRows);
                        };

                        return (
                            <Button onClick={handle}>
                                {'Do Something with Selected Rows'}
                            </Button>
                        );
                    }}
                />
            </Paper>
        </React.Fragment>
    );
}
