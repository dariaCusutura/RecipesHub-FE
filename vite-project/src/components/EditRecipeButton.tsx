import { Button, MenuItem } from '@chakra-ui/react'
import React from 'react'
import { Recipe } from '../hooks/useRecipes'

interface Props {
    recipe: Recipe;
}

const EditRecipeButton = ({recipe} : Props) => {
  return (
    <MenuItem>Edit recipe</MenuItem>
  )
}

export default EditRecipeButton
