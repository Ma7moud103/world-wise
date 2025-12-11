import { BrowserRouter, Route, Routes } from "react-router-dom"
import Product from "./pages/Product"
import Homepage from "./pages/Homepage"
import Pricing from "./pages/Pricing"
import AppLayout from "./pages/AppLayout"
import PageNotFound from "./pages/PageNotFound"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import { useEffect, useState } from "react"
import { getCities } from "./data/getCities"
import CountriesList from "./components/CountriesList"

const App = () => {

  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);

  
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await getCities();

        if (res.error) {
          throw res.error;

        }

        setCities(res.cities);

      } catch (err) {
        console.log("err fetching cities:", error);
        setError(err);

      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  

  return (

    <BrowserRouter>
      <Routes>
        <Route  index element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="app" element={<AppLayout />} >
          <Route index element={<CityList cities={cities} isLoading={isLoading} />} />

          <Route path="cities" element={<CityList cities={cities } isLoading={isLoading} />} />
          <Route path="countries" element={<CountriesList cities={cities} isLoading={isLoading}/>} />
          <Route path="form" element={<div>form</div>} />


        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App