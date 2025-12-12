import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { CitiesContextConsumer } from "../../context/CitiesContext";


const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

const CityItem = ({ city }) => {
    const { cityName, date, emoji, lat, lng } = city;
    
  const { currentCity, DeleteACity } = CitiesContextConsumer()
  const handleDelete = async (e) => {
    e.preventDefault();
   await DeleteACity(city.id);
  }
  return (
      <li>
          <Link to={`${city.id}?lat=${lat}&lng=${lng}`} className={`${styles.cityItem} ${currentCity.id === city.id ? styles["cityItem--active"] : ""}`}>
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.cityName}>{cityName}</h3>
              <time className={styles.date}>({formatDate(date)})</time>
        <button onClick={handleDelete} className={styles.deleteBtn}>&times;</button>
         </Link>    
    </li>
  )
}

export default CityItem