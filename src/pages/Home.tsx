import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { type Category } from '../types/api'

const CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/categories.php'

type CategoriesResponse = {
  categories: Category[]
}

function Home() {
  const { data, loading, error } = useFetch<CategoriesResponse>(CATEGORIES_URL)

  if (loading) {
    return <p>Loading categories...</p>
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>
  }

  const categories = data?.categories ?? []

  if (categories.length === 0) {
    return <p>No categories found.</p>
  }

  return (
    <main>
      <h1>Recipe Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.idCategory}>
            <Link to={`/category/${category.strCategory}`}>{category.strCategory}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Home
