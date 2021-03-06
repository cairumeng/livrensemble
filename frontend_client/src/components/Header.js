import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import useClickOutside from '../hooks/useClickOutside'
import logo from '../logo-pure.png'
import useAuth from '../context/useAuth'
import axios from 'axios'

const Header = () => {
  const [showProfile, setShowProfile] = useState(false)
  const { user } = useAuth()

  const profileRef = useClickOutside({
    clickHandler: () => setShowProfile(false),
  })
  const logout = () => {
    axios.post('auth/logout')
    localStorage.removeItem('LIVRENSEMBLE_TOKEN')
    window.location.reload()
  }

  return (
    <nav className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img className="block h-10 w-auto" src={logo} alt="logo" />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-black hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium no-rainbow"
                >
                  Home
                </Link>

                {!user && (
                  <>
                    <Link
                      to="/login"
                      className="text-black hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium no-rainbow"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="text-black hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium no-rainbow"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          {user && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              <div className="ml-3 relative" ref={profileRef}>
                <button
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  onClick={() => setShowProfile(!showProfile)}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.avatar}
                    alt=""
                  />
                </button>

                <div
                  className={classNames(
                    'z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none',
                    { hidden: !showProfile }
                  )}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer no-rainbow"
                    role="menuitem"
                    href="#"
                    tabIndex="-1"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </a>
                  <a
                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer no-rainbow"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-1"
                    href="#"
                  >
                    Settings
                  </a>
                  <a
                    onClick={logout}
                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer no-rainbow"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                    href="#"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            className="bg-gray-900 text-black block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >
            Dashboard
          </a>

          <a
            href="#"
            className="text-black hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Team
          </a>

          <a
            href="#"
            className="text-black hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Projects
          </a>

          <a
            href="#"
            className="text-black hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Calendar
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Header
