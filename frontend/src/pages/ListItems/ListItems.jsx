import React, { useState, useEffect } from 'react'
import './ListItems.css'
import battery from '../../data/battery.png'
import { FavoriteIcon } from '../../data/icons'
import axios from 'axios'

function ListItems({ products = [], setProducts = () => {}, searchQuery }) {
  const [itemToDelete, setItemToDelete] = useState(null)
  const [itemToEdit, setItemToEdit] = useState(null)
  console.log(searchQuery)
  const filteredProducts = products.filter((product) => {
    if (!searchQuery) {
      return true
    }
    const queryLower = searchQuery.toLowerCase()
    return (
      product.name.toLowerCase().includes(queryLower) ||
      product.category.toLowerCase().includes(queryLower) ||
      product.description.toLowerCase().includes(queryLower)
    )
  })

  const requestDeleteItem = (product) => {
    if (!itemToEdit) {
      setItemToDelete(product)
    }
  }

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:5555/items/${itemToDelete._id}`)
      .then(() => {
        setProducts((currentProducts) =>
          currentProducts.filter((item) => item._id !== itemToDelete._id)
        )
        setItemToDelete(null)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const cancelDelete = () => {
    setItemToDelete(null)
  }

  const requestEditItem = (product) => {
    if (!itemToDelete) {
      setItemToEdit(product)
    }
  }

  const handleEditSubmit = (updatedProduct) => {
    axios
      .put(`http://localhost:5555/items/${updatedProduct._id}`, updatedProduct)
      .then((response) => {
        setProducts((currentProducts) =>
          currentProducts.map((item) =>
            item._id === updatedProduct._id ? { ...updatedProduct } : item
          )
        )
        setItemToEdit(null) // Close the edit modal
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    axios
      .get('http://localhost:5555/items')
      .then((response) => setProducts(response.data.data))
      .catch((error) => {
        console.log(error)
      })
  }, [setProducts])

  console.log(products)
  console.log(filteredProducts)

  return (
    <div className="products-grid">
      {filteredProducts.map((item) => (
        <div key={item._id} className="product-card">
          <div className="product-flex">
            <div className="product-header-flex">
              <img src={battery} alt="Battery" />
              <div className="product-header">
                <p className="product-name">{item.name}</p>
                <p className="product-type">{item.category}</p>
                <p className="product-price">{item.price}</p>
              </div>
            </div>
            <FavoriteIcon />
          </div>
          <div className="product-description">
            <p className="description-header">Summary</p>
            <p className="description-body">{item.description}</p>
          </div>
          <div className="product-buttons">
            <button className="edit-btn" onClick={() => requestEditItem(item)}>
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => requestDeleteItem(item)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {itemToDelete && (
        <div className="delete-confirmation-modal">
          <p className="delete-confirmation-header">delete product</p>
          <p className="delete-confirmation-description">
            Are you sure you want to delete {itemToDelete.name}?
          </p>
          <button className="yes-btn" onClick={confirmDelete}>
            Delete
          </button>
          <button className="no-btn" onClick={cancelDelete}>
            Cancel
          </button>
        </div>
      )}
      {itemToEdit && (
        <EditItemModal
          item={itemToEdit}
          onSave={handleEditSubmit}
          onCancel={() => setItemToEdit(null)}
        />
      )}
    </div>
  )
}

function EditItemModal({ item, onSave, onCancel }) {
  const [productName, setProductName] = useState(item.name)
  const [category, setCategory] = useState(item.category)
  const [description, setDescription] = useState(item.description)
  const [price, setPrice] = useState(item.price)

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave({
      _id: item._id,
      name: productName,
      category,
      description,
      price: Number(price),
    })
  }

  return (
    <div className="edit-modal">
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
            Update Product
          </button>
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ListItems
