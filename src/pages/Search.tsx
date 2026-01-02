import { Link, useSearchParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import Spinner from '../components/Spinner'
import useFetch from '../hooks/useFetch'
import { type MealSummary } from '../types/api'

const SEARCH_URL = 'https://www.themealdb.com/api/json/v1/1/search.php'

type SearchResponse = {
  meals: MealSummary[] | null
}

function Search() {
  const [params] = useSearchParams()
  const query = params.get('query') || ''
  const url = query ? `${SEARCH_URL}?s=${encodeURIComponent(query)}` : ''
  const { data, loading, error } = useFetch<SearchResponse>(url)

  if (!query) {
    return <ErrorMessage message="No search query provided." />
  }

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error.message} />

  const meals = data?.meals ?? []

  if (meals.length === 0) {
    return <p>No results found for "{query}".</p>
  }

  return (
    <main>
      <h1>Search Results for "{query}"</h1>
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

export default Search
