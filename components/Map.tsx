"use client";
import React from "react";
import L from "leaflet";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import marketIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import marketIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: marketIcon.src,
  iconRetinaUrl: marketIcon2x.src,
  shadowUrl: markerShadow.width,
});

type Props = {
  center?: number[];
};

export default function Map({ center }: Props) {
  return (
    <MapContainer
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
      zoom={center ? 5 : 2}
      center={(center as L.LatLngExpression) ?? [51, -0.09]}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && <Marker position={center as L.LatLngExpression} />}
    </MapContainer>
  );
}
