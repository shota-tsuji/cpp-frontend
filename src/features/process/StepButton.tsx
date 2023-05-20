import {Button, Text} from '@mantine/core';

export type StepButtonProps = {
    id: number;
    recipe_name: string;
    description: string;
    top: number;
    height: number;
};

export default function StepButton(props: StepButtonProps) {
    return (
        <Button className="process-step" style={{width: 250, height: props.height, pos: "absolute", top: props.top, left: 0}}>
            <Text>{props.recipe_name}:{props.description}</Text>
        </Button>
    );
}