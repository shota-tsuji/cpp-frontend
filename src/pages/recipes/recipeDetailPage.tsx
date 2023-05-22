import React from "react";
import {useRecipeDetailQuery} from "../../generated/graphql";
import {useParams} from "react-router-dom";
import {Center, Timeline, Title} from "@mantine/core";

export default function RecipeDetailPage() {
    //const { id } = useParams<{ te: string }>();
    const params = useParams();
    const [result, _reexecuteQuery] = useRecipeDetailQuery({variables: {recipeId: params.recipeId!}});
    const {data, fetching, error} = result;

    if (error != null) {
        return <>{JSON.stringify(error)}</>;
    }
    if (fetching) return <p>Loading...</p>;

    const recipeDetail = data!.recipeDetail;
    const {title, description, steps} = recipeDetail;

    return (
        <React.Fragment>
            <Title order={1} mt="auto">{title}</Title>
            <Title order={2}>{description}</Title>
            <Center>
                <Timeline active={1} bulletSize={32} lineWidth={4}>
                    {steps.map(step => (<Timeline.Item title={step.description} key={step.id}>
                        {step.duration}min: resource:{step.resourceId}: {step.orderNumber}
                    </Timeline.Item>))}
                </Timeline>
            </Center>
        </React.Fragment>
    );
}
