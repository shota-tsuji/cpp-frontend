import {useNavigate, useParams} from "react-router-dom";
import {RecipeDetail, useRecipeDetailQuery, useUpdateRecipeDetailMutation} from "../../generated/graphql";
import {useForm} from "@mantine/form";
import {Box, Button, Center, Code, Group, Text, TextInput} from "@mantine/core";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {IconGripVertical} from '@tabler/icons-react';

// TODO: order_number 更新だけをする form 作成
export default function RecipeDetailEdit() {
    const {recipeId} = useParams();
    const [result, _reexecuteQuery] = useRecipeDetailQuery({variables: {recipeId: recipeId!}});
    const {data, fetching, error} = result;

    if (error != null) {
        return <>{JSON.stringify(error)}</>;
    }

    if (fetching || data == null) {
        return <p>Loading...</p>;
    }

    const {id, title, description, steps} = data!.recipeDetail;

    //const [result, _reexecuteQuery] = useUpdateRecipeDetailMutation({});
    return (
        <RecipeEdit description={description} id={id} steps={steps} title={title} />
    );
}

function RecipeEdit({id, title, description, steps}: RecipeDetail) {
    const navigate = useNavigate();
    const [_updateRecipeDetailResult, updateRecipeDetail] = useUpdateRecipeDetailMutation();

    /*
    const form = useForm({
        initialValues: {
            title: title,
            description: description,
            steps: steps,
        }
    });


    const handleSubmit = async (values: RecipeDetail) => {
        console.info(values);
        await updateRecipeDetail({recipeDetailData: {id: values.id, title: values.title, description: values.description, steps: values.steps}});
        navigate(`/recipes/${id}`);
    };

    return (
        <Box maw={300} mx="auto">
            <Title order={1} mt="auto">Edit Recipe</Title>
            <form onSubmit={}>
            </form>
        </Box>
    );
     */

    const form = useForm({
        initialValues: {
            steps: [
                { description: 'John Doe', orderNumber: 'john@mantine.dev' },
                { description: 'Bill Love', orderNumber: 'bill@mantine.dev' },
                { description: 'Nancy Eagle', orderNumber: 'nanacy@mantine.dev' },
                { description: 'Lim Notch', orderNumber: 'lim@mantine.dev' },
                { description: 'Susan Seven', orderNumber: 'susan@mantine.dev' },
            ],
        },
    });

    const fields = form.values.steps.map((_, index) => (
        <Draggable key={index} index={index} draggableId={index.toString()}>
            {(provided) => (
                <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
                    <Center {...provided.dragHandleProps}>
                        <IconGripVertical size="1.2rem" />
                    </Center>
                    <TextInput placeholder="John Doe" {...form.getInputProps(`steps.${index}.description`)} />
                    <TextInput
                        placeholder="example@mail.com"
                        {...form.getInputProps(`steps.${index}.orderNumber`)}
                    />
                </Group>
            )}
        </Draggable>
    ));

    return (
        <Box maw={500} mx="auto">
            <DragDropContext
                onDragEnd={({ destination, source }) =>
                    form.reorderListItem('steps', { from: source.index, to: destination.index })
                }
            >
                <Droppable droppableId="dnd-list" direction="vertical">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {fields}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            <Group position="center" mt="md">
                <Button onClick={() => form.insertListItem('steps', { description: '', orderNumber: '' })}>
                    Add cooking step
                </Button>
            </Group>

            <Text size="sm" weight={500} mt="md">
                Form values:
            </Text>
            <Code block>{JSON.stringify(form.values, null, 2)}</Code>
        </Box>
    );
}