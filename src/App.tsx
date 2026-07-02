import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'

import HomeScreen from './pages/HomeScreen'
import BubbleSort from './algorithms/sorting/BubbleSort'
import SelectionSort from './algorithms/sorting/SelectionSort'
import InfixToPostfix from './algorithms/calculators/InfixToPostFix'
import PrefixCalc from './algorithms/calculators/PrefixCalc'
import DAryHeaps from './algorithms/special/DAryHeaps'
import AvlNoRecursion from './algorithms/special/AvlNoRecursion'

function App() {

  return (
    
    <Router>
      <Routes>
      <Route path = "/" element= {<HomeScreen />} />
      <Route path="/sorting/BubbleSort" element={<BubbleSort />} />
      <Route path="/sorting/SelectionSort" element={<SelectionSort />} />
      <Route path="/calculators/InfixToPostfix" element={<InfixToPostfix />} />
      <Route path="/calculators/PrefixCalc" element={<PrefixCalc />} />
      <Route path="/special/DAryHeaps" element={<DAryHeaps />} />
      <Route path="/special/AvlNoRecursion" element={<AvlNoRecursion />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Analytics />
    </Router>
    
    
  )
}

export default App
