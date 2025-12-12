import { useState } from "react";

export function useGeolocation(defaultOptions = null) { 
    const [isLoading, setIsLoading] = useState(false)
    const [position, setPosition] = useState(defaultOptions)
    const [error, setError] = useState(null)

    function getGeolocation() { 
        if(!navigator.geolocation) 
            return setError("Geolocation is not supported by your browser")
        setIsLoading(true)
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
                setIsLoading(false)
            },
            () => {
                setError("Unable to retrieve your location")
                setIsLoading(false)
            }
        )
        
    }
    return {getGeolocation, position, isLoading, error}
}