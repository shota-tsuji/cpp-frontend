import {Resource, useResourceQuery} from "../../generated/graphql";
import {useParams} from "react-router-dom";
import {Box, Button, Group, NumberInput, TextInput, Title} from "@mantine/core";
import {useForm} from "@mantine/form";

export default function ResourceDetailEdit() {
    const { resourceId } = useParams();
    const [result, _reexecuteQuery] = useResourceQuery({ variables: { resourceId: resourceId! } });
    const {data, fetching, error} = result;

    if (error != null) {
        return <>{JSON.stringify(error)}</>;
    }

    if (fetching || data == null) {
        return <p>Loading...</p>;
    }

    const {id, name, amount} = data!.resource;

    return (
        <ResourceEdit amount={amount} id={id} name={name}/>
    );
}

function ResourceEdit({id, name, amount}: Resource) {
    const form = useForm({
        initialValues: {
            name: name,
            amount: amount,
        }
    });

    const handleSubmit = () => {
        //put your validation logic here
        //onClose();
        console.info('submitted');
    };

    return (
        <Box maw={300} mx="auto">
            <Title order={1} mt="auto">{id}:{name}:{amount}</Title>
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
        </Box>
    );
}
