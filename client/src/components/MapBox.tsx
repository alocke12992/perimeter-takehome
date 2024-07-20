import { FC } from "react";
import { Map } from "react-map-gl";
import EnvVars from "../lib/EnvVars";

export type Props = {
  lat: number;
  long: number;
  children: React.ReactNode;
};

const MapBox: FC<Props> = ({ children, lat, long }) => {
  return (
    <Map
      mapboxAccessToken={EnvVars.MapBoxToken}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      style={{
        width: "100vh",
        height: "100vh",
      }}
      initialViewState={{
        longitude: long,
        latitude: lat,
        zoom: 11,
      }}
    >
      {children}
    </Map>
  );
};

export default MapBox;
