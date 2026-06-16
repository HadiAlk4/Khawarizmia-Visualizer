import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomeScreen from './pages/HomeScreen'
import BubbleSort from './algorithms/sorting/BubbleSort'

function App() {

  return (
    
    <Router>
      <Routes>
      <Route path = "/" element= {<HomeScreen />} />
      <Route path="/sorting/BubbleSort" element={<BubbleSort />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
    
    
  )
}

export default App
