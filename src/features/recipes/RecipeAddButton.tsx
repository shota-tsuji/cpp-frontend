import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { CreateRecipeDetailInput, useCreateRecipeDetailMutation } from "../../generated/graphql";

async function submitRecipe() {

}

export default function RecipeAddButton() {
    const navigate = useNavigate();

    const defaultRecipe: CreateRecipeDetailInput = {
        description: "description",
        title: "Example Recipe",
        steps: []
    };

    const [_createRecipeResult, createRecipe] = useCreateRecipeDetailMutation();
    const submitRecipe = async () => {
      const result = await createRecipe({ recipeDetailData: defaultRecipe });
      // redirect recipes page
      //if (result.data == null) {}
      const recipeId = result.data!.createRecipeDetail.id;

      // https://reactrouter.com/en/main/upgrading/v5#use-usenavigate-instead-of-usehistory
      // https://reactrouter.com/en/main/hooks/use-navigate
      navigate(`/recipes/${recipeId}/edit`);
    }

    return (
            <div>
            <Button onClick={submitRecipe}>Create</Button>
            </div>
    );
}
