import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import Spinner from '../components/Spinner'
import useFetch from '../hooks/useFetch'
import { type MealSummary } from '../types/api'

const FILTER_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php'

type CategoryResponse = {
  meals: MealSummary[] | null
}

function Category() {
  const { categoryName } = useParams()
  const url = categoryName ? `${FILTER_URL}?c=${encodeURIComponent(categoryName)}` : ''
  const { data, loading, error } = useFetch<CategoryResponse>(url)

  if (!categoryName) {
    return <ErrorMessage message="No category provided." />
  }

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error.message} />

  const meals = data?.meals ?? []

  if (meals.length === 0) {
    return <p>No recipes found for {categoryName}.</p>
  }

  return (
    <main>
      <h1>{categoryName} Recipes</h1>
      <ul>
        {meals.map((meal) => (
          <li key={meal.idMeal}>
            <Link to={`/recipe/${meal.idMeal}`}>{meal.strMeal}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Category
