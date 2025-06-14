// GoogleMapLoader.tsx
import { ReactNode } from "react"
import { useJsApiLoader } from "@react-google-maps/api"

const GoogleMapLoader = ({ children, language }: { children: (isLoaded: boolean) => ReactNode; language: string }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey:"AIzaSyBLiOodzt9osWkm1FWmAeFGBbyUPapQcNw",
    libraries: ["places"],
    language: language,
  })

  if (loadError) return <p>Error loading Google Maps</p>

  return <>{children(isLoaded)}</>
}

export default GoogleMapLoader