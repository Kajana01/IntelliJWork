import React from 'react'
import { Link } from 'react-router-dom'

const HeaderComponent = () => {
  return (
    <header>
      <nav className="header">

        
        <div className="flex-grow-1"></div>

        
        <span className="navbar-brand mb-0 h1 text-center">
          Employee Management System
        </span>

       <div className="flex-grow-1 text-end d-flex align-items-center justify-content-end">

          <Link to="/employees" className="custom-nav-btn">
  Employees
          </Link>

        <Link to="/departments" className="custom-nav-btn ms-3">
            Departments
        </Link>

</div>

      </nav>
    </header>
  )
}

export default HeaderComponent
