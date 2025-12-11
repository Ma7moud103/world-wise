import { createContext, useContext, useEffect, useState } from "react";
import { getCities } from "../data/getCities";
import { getCity } from "../data/getCitiyWithId";

const citiesContext = createContext();  

function CitiesContextProvider({ children }) { 


    const [cities, setCities] = useState([])
    const [currentCity, setCurrentCity] = useState({})

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
    
    
    async function handleFetchingCity (id)  {
        try {
            setIsLoading(true);
            setError(null);

            const res = await getCity(id);

            if (res.error) {
                throw res.error;

            }

            setCurrentCity(res.city);

        } catch (err) {
            console.log("err fetching city:", err);
            setError(err);

        } finally {
            setIsLoading(false);
        }
    }
    
    
    return <citiesContext.Provider value={{ cities, setCities, isLoading, error, setError, currentCity, setCurrentCity, handleFetchingCity }} >
        {children}
    </citiesContext.Provider>       
}

function CitiesContextConsumer() { 
    const context = useContext(citiesContext);
    if (context === undefined) {
        throw new Error("CitiesContextConsumer must be used within a CitiesContextProvider")
    }else {
        return context;
    }
}


export { CitiesContextProvider, CitiesContextConsumer };