import { type FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const [term, setTerm] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const savedMode = localStorage.getItem('theme')
    if (savedMode === 'dark') {
      setIsDarkMode(true)
      document.body.classList.add('dark-mode')
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = term.trim()
    if (!trimmed) return
    navigate(`/search?query=${encodeURIComponent(trimmed)}`)
    setTerm('')
  }

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    if (newMode) {
      document.body.classList.add('dark-mode')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark-mode')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <nav>
      <Link to="/">🏠 Home</Link>
      <Link to="/favorites">⭐ Favorites</Link>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search recipes"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <button onClick={toggleTheme} style={{ marginLeft: 'auto' }}>
        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </nav>
  )
}

export default Navbar
