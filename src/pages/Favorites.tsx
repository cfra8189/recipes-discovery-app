import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import Spinner from '../components/Spinner'
import { useFavorites } from '../context/FavoritesContext'
import { type MealDetail } from '../types/api'

const LOOKUP_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php'

function Favorites() {
  const { favorites } = useFavorites()
  const [meals, setMeals] = useState<MealDetail[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (favorites.length === 0) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const fetchMeals = async () => {
      try {
        const mealPromises = favorites.map((id) =>
          fetch(`${LOOKUP_URL}?i=${encodeURIComponent(id)}`).then((res) => res.json()),
        )
        const responses = await Promise.all(mealPromises)
        const allMeals: MealDetail[] = []
        responses.forEach((response) => {
          if (response.meals && response.meals.length > 0) {
            allMeals.push(response.meals[0])
          }
        })
        setMeals(allMeals)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchMeals()
  }, [favorites])

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error.message} />

  if (favorites.length === 0) {
    return (
      <main>
        <h1>Your Favorites</h1>
        <p>You haven't added any favorites yet.</p>
        <Link to="/">Browse recipes</Link>
      </main>
    )
  }

  return (
    <main>
      <h1>Your Favorites</h1>
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

export default Favorites
