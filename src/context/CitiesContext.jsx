import { createContext, useContext, useEffect, useReducer } from "react";
import { getCities } from "../data/getCities";
import { getCity } from "../data/getCitiyWithId";
import { createCity } from "../data/CreateCity";
import { deleteCity } from "../data/DeleteCity";

const citiesContext = createContext();  

const initialState = {
    cities: [],
    isLoading: false,
    error: null,
    currentCity: {}
}
function reducer(state, action) {
  switch (action.type) {
    case "cities/loading":
      return { ...state, isLoading: true, error: null };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "cities/rejected":
      return { ...state, isLoading: false, error: action.payload };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "cities/created":
      return { ...state, cities: [...state.cities, action.payload], isLoading: false , currentCity: action.payload };
    case "cities/deleted":
      return { ...state, cities: state.cities.filter((city) => city.id !== action.payload), isLoading: false, currentCity: {} };
    default: throw new Error("Unknown action type");
    
  }
  }

function CitiesContextProvider({ children }) { 
const [{cities,isLoading , currentCity , error}, dispatch] = useReducer(reducer, initialState);

    // const [cities, setCities] = useState([])
    // const [currentCity, setCurrentCity] = useState({})

    //   const [isLoading, setIsLoading] = useState(false)
      // const [error, setError] = useState(null);
    
      
      useEffect(() => {
        (async () => {
          dispatch({ type: "cities/loading" });
          try {
            const res = await getCities();
            if (res.error) throw res.error;
            dispatch({ type: "cities/loaded", payload: res.cities });
          } catch (err) {
            dispatch({ type: "cities/rejected", payload: err});
          } 
          })();
          
          
      }, []);
    
    

  async function handleFetchingCity(id) {

    if(Number(id) === currentCity.id) return; // to avoid refetching the same city
      dispatch({ type: "cities/loading" });
        try {
          

            const res = await getCity(id);

            if (res.error) throw res.error;

            dispatch({ type: "city/loaded", payload: res.city });

        } catch (err) {
          dispatch({ type: "cities/rejected", payload: err });

        } 
  }
  

  async function CreateNewCity(city) {
    dispatch({ type: "cities/loading" });
    try {
    

      const res = await createCity(city);

     dispatch({ type: "cities/created", payload: res.data[0] })

      if (res.error) {
        throw res.error;
      }

    } catch (err) {
      // console.log("err adding city:", err);
      // setError(err);
      dispatch({ type: "cities/rejected", payload: err });


    } 
  }


  async function DeleteACity(cityId) {
    dispatch({ type: "cities/loading" });
    try {
     

      const res = await deleteCity(cityId);

      dispatch({ type: "cities/deleted", payload: cityId })
      if (res.error) {
        throw res.error;
      }

    } catch (err) {
      dispatch({ type: "cities/rejected", payload: err });


    }
  }
    
    
  return <citiesContext.Provider value={{ cities, isLoading, error, currentCity, handleFetchingCity, CreateNewCity, DeleteACity }} >
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