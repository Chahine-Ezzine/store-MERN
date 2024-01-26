import { useState } from 'react'
import './CreateItem.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CreateItem({ addProduct = () => {} }) {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const newProduct = {
      name: productName,
      category,
      price: Number(price),
      description,
    }

    axios
      .post('http://localhost:5555/items', newProduct)
      .then((response) => {
        addProduct(response.data)

        setProductName('')
        setCategory('')
        setDescription('')
        setPrice('')

        setIsModalOpen(false)

        navigate('/store/list')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const closeModal = () => {
    setIsModalOpen(false)
    navigate('/')
  }

  return (
    <>
      {isModalOpen && (
        <div className="store-modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <label htmlFor="productName">Product Name</label>
              <input
                id="productName"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />

              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <label htmlFor="description">Description</label>
              <input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <div className="modal-actions">
                <button type="submit" className="add-btn">
                  ADD PRODUCT
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
export default CreateItem
