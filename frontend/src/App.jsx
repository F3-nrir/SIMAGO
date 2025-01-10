import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {ProductCreateFormPage, ProductUpdateFormPage} from './pages/InventoryFormPage'
import { AreaFormPage } from './pages/AreaFormPage'
import {Navigation} from './components/Navigation'
import {ProductsPage, ProductPage} from './components/ProductsList'
import {AreasPage} from './components/AreasList'
import {SalesFormPage} from './pages/SalesFormPage'
import {RecordsPage} from './pages/DashboardPage'
import {GraphicsPage} from './pages/GraphicsPage'

export function App() {
  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path="/" element={ <RedirectToIP /> } />
        <Route path="/inventory/" element={<ProductsPage/>} />
        <Route path="/inventory/product/create/" element={<ProductCreateFormPage/>} />
        <Route path="/inventory/product/update/" element={<ProductUpdateFormPage/>} />
        <Route path="/inventory/area/" element = {<AreasPage/>} />
        <Route path="/inventory/area/create/" element = {<AreaFormPage/>} />
        <Route path="/sales/" element = {<SalesFormPage/>} />
        <Route path="/records/" element = {<RecordsPage/>} />
        <Route path="/dashboard/" element = {<GraphicsPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

function RedirectToIP() {
  window.location.href = 'http://localhost:8000/admin';
  return null;
}

export default App

