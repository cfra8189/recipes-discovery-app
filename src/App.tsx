import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Category from './pages/Category'
import RecipeDetail from './pages/RecipeDetail'
import Favorites from './pages/Favorites'
import Search from './pages/Search'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  )
}

export default App
