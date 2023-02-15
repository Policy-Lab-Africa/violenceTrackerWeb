import { Box, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-boundary-canvas';
import { PollingUnit, SearchResults } from '@/types';

const iconPerson = new L.Icon({
  iconUrl: `/assets/icons/danger-map.svg`,
  iconRetinaUrl: `/assets/icons/danger-map.svg`,
  iconAnchor: undefined,
  popupAnchor: undefined,
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(24, 24),
  className: `dleaflet-div-icon`,
});

export interface MapProps {
  data?: SearchResults;
}

export default function VisualizedMapReport({ data }: MapProps) {
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    console.log(
      `Data don arrived o`,
      data?.state_results.data[0]?.polling_units[2].location,
    );
  }, [data]);

  return (
    <Box width={`full`} height={[`300px`, `400px`]}>
      <MapContainer
        center={[9.082, 8.6753]}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: `100%`, width: `100%`, zIndex: 1 }}
        dragging={false}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data?.state_results.data[0]?.polling_units?.map((pu, index) => {
          // pu.violencereports?.map((reports, index) => (

          // ));
          return (
            <Marker
              key={pu.id}
              icon={iconPerson}
              position={[
                parseFloat(pu.location.latitude),
                parseFloat(pu.location.longitude),
              ]}
            />
          );
        })}
      </MapContainer>
    </Box>
  );
}

// {data?.state_results[0].data[0].polling_units?.map((pu) => (
//   // <>
//     {pu.violencereports?.map((report) => (
//       <Marker
//         key={report.id}
//         icon={iconPerson}
//         position={[
//           parseFloat(report.longitude),
//           parseFloat(report.latitude),
//         ]}
//       >
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//     ))}
//   // </>
// ))}
