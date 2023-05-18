import {Button} from '@mantine/core';

export type StepButtonProps = {
    top: number;
    left: number;
    height: number;
    description: string;
};

export default function StepButton(props: StepButtonProps) {
    return (
        <Button className="process-step" style={{width: 250, height: props.height, pos: "absolute", top: props.top, left: props.left}}>
            {props.description}
        </Button>
    );
}