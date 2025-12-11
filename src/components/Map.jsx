import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
const Map = () => {
  const nagivate = useNavigate()
  const [searchParams, setSearchParams ]= useSearchParams()
  const lat = searchParams.get("lat")
  const lng = searchParams.get("lng")
  return (
    <div className={styles.mapContainer} onClick={()=>{nagivate("form")}}>
      <button onClick={() => { 
        setSearchParams({lat:33,lng:33})
      }}> change me </button>
    </div>
  )
}

export default Map