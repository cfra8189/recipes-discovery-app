import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/category/:categoryName" element={<div>Category</div>} />
        <Route path="/recipe/:recipeId" element={<div>Recipe Detail</div>} />
        <Route path="/favorites" element={<div>Favorites</div>} />
        <Route path="/search" element={<div>Search</div>} />
      </Routes>
    </>
  )
}

export default App
