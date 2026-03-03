import './App.css'

import EmployeeComponent from './Component/EmployeeComponent'
import FooterComponent from './Component/FooterComponent'
import HeaderComponent from './Component/HeaderComponent'
import ListEmployeeComponent from "./Component/ListEmployeeComponent"
import DepartmentComponent from "./Component/DepartmentComponent"  
import ViewDepartmentEmployeesComponent from "./Component/ViewDepartmentEmployeesComponent";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>

        <HeaderComponent />

        <Routes>

          {/* http://localhost:3000 */}
          <Route path='/' element={<ListEmployeeComponent />} />

          {/* http://localhost:3000/employees */}
          <Route path='/employees' element={<ListEmployeeComponent />} />

          {/* http://localhost:3000/add-employee */}
          <Route path='/add-employee' element={<EmployeeComponent />} />

          {/* http://localhost:3000/update-employee/1 */}
          <Route path='/update-employee/:id' element={<EmployeeComponent />} />

          {/*  Department Separate Page */}
          {/* http://localhost:3000/departments */}
          <Route path='/departments' element={<DepartmentComponent />} />

          <Route path="/view-department/:id" element={<ViewDepartmentEmployeesComponent />} />


        </Routes>

        <FooterComponent />

      </BrowserRouter>
    </>
  )
}

export default App
