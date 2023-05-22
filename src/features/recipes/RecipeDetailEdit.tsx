import {useNavigate, useParams} from "react-router-dom";
import {RecipeDetail, useRecipeDetailQuery, useUpdateRecipeDetailMutation} from "../../generated/graphql";
import {useForm} from "@mantine/form";
import {Box, Button, Center, Code, Group, Text, TextInput, Title} from "@mantine/core";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {IconGripVertical} from '@tabler/icons-react';
import * as _ from 'lodash';

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
        <RecipeEdit description={description} id={id} steps={steps} title={title}/>
    );
}

function RecipeEdit({id, title, description, steps}: RecipeDetail) {
    const navigate = useNavigate();
    const [_updateRecipeDetailResult, updateRecipeDetail] = useUpdateRecipeDetailMutation();

    // To compare modified steps, keep original recipe detail
    const originalSteps = _.cloneDeep(steps);

    // TODO: Filtering with respect to step ids
    const handleSubmit = async (values: RecipeDetail) => {
        console.info(originalSteps);
        console.info(values);
        //await updateRecipeDetail({recipeDetailData: {id: values.id, title: values.title, description: values.description, steps: values.steps}});
        //navigate(`/recipes/${id}`);
    };

    const form = useForm({
        initialValues: {
            title: title,
            description: description,
            steps: steps
        },
    });

    const fields = form.values.steps.map((_, index) => (
        <Draggable key={index} index={index} draggableId={index.toString()}>
            {(provided) => (
                <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
                    <Center {...provided.dragHandleProps}>
                        <IconGripVertical size="1.2rem"/>
                    </Center>
                    <TextInput placeholder="John Doe" {...form.getInputProps(`steps.${index}.description`)} />
                    <TextInput
                        placeholder="example@mail.com"
                        {...form.getInputProps(`steps.${index}.duration`)}
                    />
                    <TextInput
                        placeholder="resource name"
                        {...form.getInputProps(`steps.${index}.resourceId`)}
                    />
                </Group>
            )}
        </Draggable>
    ));

    return (
        <Box maw={800} mx="auto">
            <Title order={1} mt="auto">Edit Recipe</Title>
            <form onSubmit={form.onSubmit(async (values) => {
                    const recipeDetail = {id: id, title: values.title, description: values.description, steps: values.steps};
                    await handleSubmit(recipeDetail);
                }
            )}>
                <TextInput
                    placeholder="example@mail.com"
                    {...form.getInputProps(`title`)}
                />
                <TextInput
                    placeholder="example@mail.com"
                    {...form.getInputProps(`description`)}
                />

                    <DragDropContext
                        onDragEnd={({destination, source}) => {
                            form.reorderListItem('steps', {from: source.index, to: destination.index});
                            console.info(form.values.steps);
                        }
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

                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>

            <Group position="center" mt="md">
                <Button onClick={() => form.insertListItem('steps', {description: '', duration: '', resourceId: ''})}>
                    Add cooking step
                </Button>
            </Group>

            <Text size="sm" weight={500} mt="md">
                Form values:
            </Text>
            <Code block>{JSON.stringify(originalSteps, null, 2)}</Code>
        </Box>
    );
}