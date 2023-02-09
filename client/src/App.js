import { Routes, Route } from 'react-router-dom'
import ListUsers from './listUser/ListUser'
function App() {
  return (
    <Routes>
      <Route index element={<ListUsers />} />
      <Route path='listUsers' element={<ListUsers />} />
    </Routes>
  )
}

export default App
