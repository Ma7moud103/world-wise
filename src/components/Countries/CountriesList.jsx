import Spinner from "../Spinner/Spinner"
import styles from "./CountryList.module.css"
import Message from "../Message/Message"
import CountryItem from "./CountryItem"
import { CitiesContextConsumer } from "../../context/CitiesContext"

const CountriesList = () => {
    const { cities, isLoading } = CitiesContextConsumer()
    if (isLoading) return <Spinner />
    if (!cities.length) return <Message message={"Add your first city by clicking on a city on the map"} />
    

    const countries = cities.reduce((arr, city) => { 
        if(!arr.map(c => c.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji, id: city.id }];
        else return arr;
    },[])
  return (
      <ul className={styles.countriesList}>
          {countries.map((country) => <CountryItem country={country} key={country.id} />)}
    </ul>
  )
}

export default CountriesList