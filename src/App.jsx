import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Product from "./pages/Product/Product"
import Homepage from "./pages/Homepage/Homepage"
import Pricing from "./pages/Pricing"
import AppLayout from "./pages/AppLayout/AppLayout"
import PageNotFound from "./pages/PageNotFound"
import Login from "./pages/Login/Login"
import CityList from "./components/Cities/CityList"
import CountriesList from "./components/Countries/CountriesList"
import City from "./components/Cities/City"
import Form from "./components/Form/Form"
import { CitiesContextProvider } from "./context/CitiesContext"
import { AuthContextProvider } from "./context/AuthContext"
import ProtectedRoute from "./pages/ProtectedRoute"
import Signup from "./pages/Signup/Signup"

const App = () => {

  return (
<AuthContextProvider>
    <CitiesContextProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>} >
            <Route index element={<Navigate to={"cities"} replace />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="cities" element={<CityList />} />
            <Route path="countries" element={<CountriesList />} />
            <Route path="form" element={<Form />} />


          </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<ProtectedRoute><Signup /></ProtectedRoute>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
   </CitiesContextProvider>
    </AuthContextProvider>
  )
}

export default App