import './page.css'
export default function Home() {
  return (
    <div className='container'>
      <div className="center-box">
        Image
      </div>
      <div className='book-title'>
        Book a room
      </div>
      <div className="search-bar">
        <select className="dropdown">
          <option value="1">👤 1</option>
          <option value="2">👥 2</option>
          <option value="3">👥 3</option>
          <option value="4">👥 4</option>
        </select>

        <input
          type="date"
          className="date-input"
          defaultValue="2025-06-03"
        />
      </div>
      <button className="search-button">SEARCH FOR ROOMS</button>
    </div>
  )
}
