import React, { useState } from 'react'
import './layout.css'
import {
  Logo,
  ButtonIcon,
  SearchIcon,
  NotificationIcon,
  DownArrowIcon,
  AddIcon,
  LogoutIcon,
  UpArrow,
  LeftArrow,
  RightArrow,
} from '../../data/icons'
import { useNavigate } from 'react-router-dom'

const Layout = ({ children, setSearchQuery }) => {
  const navigate = useNavigate()
  const [isAllProducts, setIsAllProducts] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showAdminPopup, setShowAdminPopup] = useState(false)
  const paginationItems = [
    { name: 'back', content: <LeftArrow />, label: 'Back' },
    { name: '1', content: '1', label: '' },
    { name: '2', content: '2', label: '' },
    { name: '3', content: '3', label: '' },
    { name: 'ellipsis1', content: '...', label: '' },
    { name: '10', content: '10', label: '' },
    { name: 'next', content: <RightArrow /> },
  ]

  const handleAllProductsClick = () => {
    if (!isAllProducts) {
      navigate('/store/list')
    } else {
      navigate('/')
    }
    setIsAllProducts(!isAllProducts)
  }

  const handleAdminClick = () => {
    setShowAdminPopup(!showAdminPopup)
  }

  const handleSearchIconClick = () => {
    setShowSearch(!showSearch)
    console.log('button clicked')
  }

  const handleAddNewProductClick = () => {
    navigate('/store/create')
  }

  return (
    <div className="store-container">
      <div className="store-sidebar">
        <Logo />
        <button className="sidebar-btn" onClick={handleAllProductsClick}>
          <span>
            <ButtonIcon />
          </span>
          <p>{!isAllProducts ? 'ALL PRODUCTS' : 'HOME'}</p>{' '}
        </button>
      </div>
      <div className="store-mainContent">
        <nav className="store-navbar">
          <div className="flex-navbar">
            <div className="icon-container">
              <div onClick={handleSearchIconClick}>
                <SearchIcon />
              </div>
              {showSearch && (
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              )}
            </div>
            <NotificationIcon />
            <button className="account-btn" onClick={handleAdminClick}>
              <p>ADMIN</p>
              <span>{showAdminPopup ? <DownArrowIcon /> : <UpArrow />}</span>
            </button>
            {showAdminPopup && (
              <div className="admin-popup">
                <p className="admin">Admin</p>
                <div className="flex-logOut">
                  <p className="logOut">Log Out</p>
                  <LogoutIcon />
                </div>
              </div>
            )}
          </div>
        </nav>
        <div className="store-main">
          <div className="store-header">
            <div className="product-container">
              <h3 className="product-title">All Products</h3>

              <p className="destination">
                Home {isAllProducts && '> All Products'}
              </p>
            </div>
            <button className="Add-btn" onClick={handleAddNewProductClick}>
              <AddIcon />
              <p>ADD NEW PRODUCT</p>
            </button>
          </div>
          {children}
          <div className="pagination">
            {paginationItems.map((item) => (
              <button
                key={item.name}
                className={`pagination-item ${
                  item.name === '3' ? 'active' : ''
                }`}
              >
                {item.content}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
