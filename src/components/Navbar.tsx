import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const [term, setTerm] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = term.trim()
    if (!trimmed) return
    navigate(`/search?query=${encodeURIComponent(trimmed)}`)
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites</Link>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', marginLeft: '1rem' }}>
        <input
          type="search"
          placeholder="Search recipes"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  )
}

export default Navbar
