  'use client';

  import React, { useState, useEffect, useRef } from 'react';
  import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    DirectionsRenderer,
    StandaloneSearchBox,
  } from '@react-google-maps/api';
  import { useLocale } from 'next-intl';

  const containerStyle = {
    width: '100%',
    height: '400px',
    zIndex: 999999999,
  };

  const fallbackCenter = {
    lat: 25.276987,
    lng: 55.296249,
  };

  type LatLngLiteral = google.maps.LatLngLiteral;

  interface MyMapProps {
    first?: boolean;
    defualtCenter?: LatLngLiteral;
    setLocation: React.Dispatch<
      React.SetStateAction<{
        lat: number | null;
        lng: number | null;
        name: string;
      }>
    >;
    destination?: LatLngLiteral;
  }

  const MyMap: React.FC<MyMapProps> = ({
    first,
    defualtCenter,
    setLocation,
    destination,
  }) => {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: 'AIzaSyBLiOodzt9osWkm1FWmAeFGBbyUPapQcNw',
      libraries: ['places'],
    });

    const locale = useLocale();
    const [origin, setOrigin] = useState<LatLngLiteral | null>(
      defualtCenter || null
    );
    const [markerPosition, setMarkerPosition] = useState<LatLngLiteral | null>(null);
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

    const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);

    // Get current location
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const currentLoc = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            setOrigin(currentLoc);

            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: currentLoc }, (results, status) => {
              if (status === 'OK' && results?.[0] && first) {
                setLocation({
                  ...currentLoc,
                  name: results[0].formatted_address,
                });
              }
            });
          },
          () => {
            setOrigin(fallbackCenter);
          }
        );
      } else {
        setOrigin(fallbackCenter);
      }
    }, []);

    // Compute directions
    useEffect(() => {
      if (!origin || !destination || !isLoaded) return;

      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK' && result) {
            setDirections(result);
          } else {
            console.error('Failed to fetch directions:', status);
          }
        }
      );
    }, [origin, destination, isLoaded]);

    // Handle map clicks (only when there's no destination)
    const handleMapClick = (event: google.maps.MapMouseEvent) => {
      if (!destination && event.latLng) {
        const clicked = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };

        setMarkerPosition(clicked);

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: clicked }, (results, status) => {
          if (status === 'OK' && results?.[0]) {
            setLocation({ ...clicked, name: results[0].formatted_address });
          }
        });
      }
    };

    // Handle search box result
    const onPlacesChanged = () => {
      const places = searchBoxRef.current?.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const location = place.geometry?.location;

        if (location) {
          const clicked = {
            lat: location.lat(),
            lng: location.lng(),
          };

          setMarkerPosition(clicked);
          setLocation({
            ...clicked,
            name: place.formatted_address || place.name || '',
          });

          mapRef.current?.panTo(clicked);
          mapRef.current?.setZoom(15);
        }
      }
    };

    if (!isLoaded || !origin) return <div>Loading map...</div>;

    const originStr = `${origin.lat},${origin.lng}`;
    const destStr = `${destination?.lat},${destination?.lng}`;

   return (

    <>
    
  <div style={{ position: 'relative'}}>
    {/* Search Box */}
    <div className='translate-x-[-50%]' style={{ position: 'absolute', top: "10px", left: "50%",  zIndex: 99999999999999 }} >
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={onPlacesChanged}
        
      >
        <input
          ref={inputRef}
          type="text"
          placeholder={locale === 'en' ? 'Search places...' : 'ابحث عن الأماكن...'}
          style={{
            boxSizing: 'border-box',
            border: '1px solid transparent',
            width: '260px',
            height: '40px',
            padding: '0 12px',
            borderRadius: '4px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            fontSize: '14px',
            outline: 'none',
            backgroundColor: 'white',
          }}
        />
      </StandaloneSearchBox>
    </div>

    {/* Google Map */}
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={origin}
      zoom={15}
      onClick={handleMapClick}
      onLoad={(map) => (mapRef.current = map)}
    >
      <Marker position={origin} label="You" />
      {destination ? (
        <>
          <Marker position={destination} label="Dest" />
          {directions && <DirectionsRenderer directions={directions} />}
        </>
      ) : (
        markerPosition && <Marker position={markerPosition} />
      )}
    </GoogleMap>

    {/* Directions Button */}
    {destination && (
      <a
        href={`https://www.google.com/maps/dir/?api=1&origin=${originStr}&destination=${destStr}&travelmode=driving`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          zIndex: 999999999,
          padding: '10px 20px',
          backgroundColor: '#4285F4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {locale === 'en' ? 'Get Directions' : 'احصل على الاتجاهات'}
      </a>
    )}
  </div>
  </>
);

  };

  export default MyMap;
