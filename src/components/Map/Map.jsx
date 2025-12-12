  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import styles from "./Map.module.css";
  import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet'
  import { CitiesContextConsumer } from "../../context/CitiesContext";
  import { useGeolocation } from "../../hooks/useGeolocation";
  import Button from "../Button/Button";
  import useUrlPosition from "../../hooks/useUrlPosition";

  const Map = () => {
    const [mapPosition, setMapPosition] = useState([40.4664, 3.71338])
    const { isLoading:isLoadingPosition , position:GeoPosition, getGeolocation} = useGeolocation()
    const [lat, lng] = useUrlPosition()

  const {cities}  = CitiesContextConsumer()


    useEffect(() => {
      if (lat && lng) setMapPosition([lat, lng])
    },[lat, lng])
  

    useEffect(() => {
      if (GeoPosition) setMapPosition([GeoPosition.lat, GeoPosition.lng])
    }, [GeoPosition])
    
    return ( 
      <div className={styles.mapContainer} >
    {!GeoPosition  && (   <Button type={"position"} onClick={getGeolocation}>{isLoadingPosition  ? "Loading...": "use your position" }</Button>)}
        <MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {cities.map((city)=>{
            return (
              <Marker key={city.id} position={[city.lat, city.lng]}>
                <Popup>
                  <span>{ city.emoji}</span>

                  <span>     {city.notes}    </span>
                </Popup>
              </Marker>
            )
          })}
          <ChangeCenter position={mapPosition} />
          <DetectClick/>
        </MapContainer>

      </div>
    ) 
  }

  function ChangeCenter({ position }) {
    const map = useMap()
    map.setView(position)
    return null
  }


  function DetectClick() {
    const navigate = useNavigate()
    useMapEvent({
      click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`), 
    })
  }
  export default Map