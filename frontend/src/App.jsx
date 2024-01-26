import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ListItems from './pages/ListItems/ListItems'
import CreateItem from './pages/CreateItem/CreateItem'

import HomePage from './pages/HomePage/HomePage'
import './App.css'
import { useState } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('') // Add this line

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct])
  }

  console.log('Search Query in App.js: ', searchQuery)

  return (
    <Layout setSearchQuery={setSearchQuery}>
      <Routes>
        <Route path="/" element={<HomePage />} />{' '}
        <Route
          path="/store/list"
          element={
            <ListItems
              products={products}
              setProducts={setProducts}
              searchQuery={searchQuery}
            />
          }
        />
        <Route
          path="/store/create"
          element={<CreateItem addProduct={addProduct} />}
        />
      </Routes>
    </Layout>
  )
}

export default App
