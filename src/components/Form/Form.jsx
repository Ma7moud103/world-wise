
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import Back from "../Back";
import useUrlPosition from "../../hooks/useUrlPosition";
import { baseUrl, convertToEmoji } from "../../utl/ReusableFunctions";

 import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import DatePicker from "react-datepicker";
import { CitiesContextConsumer } from "../../context/CitiesContext";
function Form() {
  const navigate = useNavigate()
  const [lat, lng] = useUrlPosition()
  const { CreateNewCity , isLoading } = CitiesContextConsumer()
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState(""); 
  const [emoji, setEmoji] = useState("")
  const [GeolocationError, setGeolocationError] = useState(null)
  const [GeolocationLoading, setGeolocationLoading] = useState(false)

//fetch city data from api
  async function fetchCityData() {
    try {
      setGeolocationError(null)
      setGeolocationLoading(true);
      const response = await fetch(
        `${baseUrl}?latitude=${lat}&longitude=${lng}`
      );
      const data = await response.json();

      if (!data.countryCode) throw new Error("that doesn't seem to be a city. click somewhere else")
      setCityName(data.city || data.locality || "");
      setCountry(data.countyName || "");
      setEmoji(convertToEmoji(data.countryCode));
    } catch (error) {
      setGeolocationError(error.message);
    } finally {
      setGeolocationLoading(false);
      
    }
  }


 

useEffect(() => {
  if (!lat && !lng) return ; 
  fetchCityData();
}, [lat, lng]);
  
  const handleSubmit = async(e) => {
    e.preventDefault()

    if (!cityName || !date) return 
    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      lat,
      lng
    }
    await CreateNewCity(newCity)
    navigate("/app/cities");
    
  }

  if (GeolocationLoading) return <Spinner />;
  if (!lat && !lng) return <Message message={"Start by clicking on somewhere on the map"} />;
  if (GeolocationError) return <Message message={GeolocationError} />;

  return (
    <form className={`${styles.form} ${isLoading?styles.loading:""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker onChange={(date) => setDate(date)}
          selected={date} dateFormat={"dd/MM/yyyy"}/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button  type={"primary"}>Add</Button>
        <Back/>
      </div>
    </form>
  );
}

export default Form;
