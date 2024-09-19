"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
  useMap,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import Image from "next/image";

// Define the types for the state and event handlers
interface LatLng {
  lat: number;
  lng: number;
}

interface Weather {
  cod?: string;
  weather: { description: string; icon: string }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  visibility: number;
  wind: {
    speed: number;
    gust: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  timezone: number;
}

export default function Map() {
  const [map, setMap] = useState<L.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    if (map) {
      map.setView([0, 0], 2); // Centered on the world with zoom level 2
    }
  }, [map]);

  const position: LatLng = {
    lat: -34.70559994976545,
    lng: -58.395103881776734,
  };

  const CustomGeoSearchControl = () => {
    const map = useMap();

    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = GeoSearchControl({
        provider,
        style: "bar",
        autoComplete: true,
        autoCompleteDelay: 250,
        showMarker: false,
        showPopup: true,
        marker: {
          icon: new L.Icon.Default(),
          draggable: false,
        },
        maxMarkers: 1,
        retainZoomLevel: false,
        animateZoom: true,
      });

      // Check if the control already exists before adding it to the map
      const existingControl = map.getContainer().querySelector(".geosearch");
      if (!existingControl) {
        map.addControl(searchControl);
      }
    }, [map]);

    return null;
  };

  const handleClick = async (e: L.LeafletMouseEvent) => {
    console.log(e.latlng);
    setSelectedLocation(e.latlng);

    const { lat, lng } = e.latlng;

    const apikey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=es&units=Metric&appid=${apikey}`
    );
    const data = await res.json();

    setWeather(data);
  };

  const LocationMarker = () => {
    useMapEvents({
      click: handleClick,
    });
    console.log(weather);

    if (!weather) return null;
    if (weather.cod === "400") return null;

    const tiempo = weather.weather[0].description;
    const temperatura = weather.main.temp;
    const termica = weather.main.feels_like;
    const humedad = weather.main.humidity;
    const presion = weather.main.pressure;
    const visibility = weather.visibility;
    const viento = weather.wind.speed;
    const rafagas = weather.wind.gust;
    const amanecer = new Date((weather.timezone + weather.sys.sunrise) * 1000)
      .toUTCString()
      .substring(17, 22);
    const atardecer = new Date((weather.timezone + weather.sys.sunset) * 1000)
      .toUTCString()
      .substring(17, 22);

    const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    // const rotateClass = `font-bold inline-block transform rotate-${weather.wind.deg} ease-in-out`;
    return (
      <Marker position={selectedLocation!}>
        <Popup>
          <div>
            <div>
              <Image
                src={icon}
                width={50}
                height={50}
                alt={tiempo}
                className="m-auto "
              />
            </div>
            <div className="p-1 ">
              <span className="font-bold">Tiempo:</span> {tiempo}
            </div>
            <div className="p-1">
              <span className="font-bold">Temperatura:</span> {temperatura}°C
            </div>
            <div className="p-1">
              <span className="font-bold">Sensación térmica:</span> {termica}°C
            </div>
            <div className="p-1">
              <span className="font-bold">Humedad:</span> {humedad}%
            </div>
            <div className="p-1">
              <span className="font-bold">Presión:</span> {presion} hPa
            </div>
            <div className="p-1">
              <span className="font-bold">Visibilidad:</span> {visibility} mts
            </div>
            <div className="p-1">
              <span className="font-bold">Viento:</span> {viento} m/s
            </div>
            {/* <div className="p-1">
              <span className={rotateClass}>▲</span>
            </div> */}
            <div className="p-1">
              <span className="font-bold">Ráfagas:</span> {rafagas} m/s
            </div>
            <div className="p-1">
              <span className="font-bold">Amanecer:</span> {amanecer} hs
            </div>
            <div className="p-1">
              <span className="font-bold">Atardecer:</span> {atardecer} hs
            </div>
          </div>
        </Popup>
      </Marker>
    );
  };

  return (
    <MapContainer
      center={position}
      zoom={10}
      style={{ height: "98vh", width: "98vw", margin: "auto" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://github.com/pnvdev">pnvdev</a>'
      />
      <CustomGeoSearchControl />
      <LocationMarker />
    </MapContainer>
  );
}
