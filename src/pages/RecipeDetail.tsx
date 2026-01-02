import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import Spinner from '../components/Spinner'
import { useFavorites } from '../context/FavoritesContext'
import useFetch from '../hooks/useFetch'
import { type MealDetail } from '../types/api'

const LOOKUP_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php'

type MealResponse = {
  meals: MealDetail[] | null
}

function RecipeDetail() {
  const { recipeId } = useParams()
  const url = recipeId ? `${LOOKUP_URL}?i=${encodeURIComponent(recipeId)}` : ''
  const { data, loading, error } = useFetch<MealResponse>(url)
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  if (!recipeId) {
    return <ErrorMessage message="No recipe ID provided." />
  }

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error.message} />

  const meal = data?.meals?.[0]

  if (!meal) {
    return <ErrorMessage message="Recipe not found." />
  }

  const favorited = isFavorite(meal.idMeal)

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(meal.idMeal)
    } else {
      addFavorite(meal.idMeal)
    }
  }

  // Extract ingredients
  const ingredients: Array<{ ingredient: string; measure: string }> = []
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof MealDetail
    const measureKey = `strMeasure${i}` as keyof MealDetail
    const ingredient = meal[ingredientKey]
    const measure = meal[measureKey]

    if (ingredient && typeof ingredient === 'string' && ingredient.trim()) {
      ingredients.push({
        ingredient,
        measure: typeof measure === 'string' ? measure : '',
      })
    }
  }

  return (
    <main>
      <Link to="/">← Back to Home</Link>
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} width="400" />
      <p>
        <strong>Category:</strong> {meal.strCategory}
      </p>
      <p>
        <strong>Area:</strong> {meal.strArea}
      </p>

      <button onClick={handleToggleFavorite}>
        {favorited ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
      </button>

      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((item, idx) => (
          <li key={idx}>
            {item.ingredient} - {item.measure}
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p>{meal.strInstructions}</p>
    </main>
  )
}

export default RecipeDetail
