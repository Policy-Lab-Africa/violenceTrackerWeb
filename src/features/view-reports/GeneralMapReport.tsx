import { ViolenceReport } from '@/types';
import { Box, useMediaQuery } from '@chakra-ui/react';
import L from 'leaflet';
import 'leaflet-boundary-canvas';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

const iconPerson = new L.Icon({
  iconUrl: `/assets/maps/danger-map.svg`,
  iconRetinaUrl: `/assets/maps/danger-map.svg`,
  iconAnchor: undefined,
  popupAnchor: undefined,
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(24, 24),
  className: `dleaflet-div-icon`,
});

export default function GeneralMapReport({
  data,
}: {
  data?: ViolenceReport[];
}) {
  const mapRef = useRef<L.Map>(null);
  const [isLargerThan800] = useMediaQuery(`(min-width: 800px)`, {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });

  return (
    <Box width={`full`} height={[`300px`, `600px`]}>
      <MapContainer
        center={[9.082, 8.6753]}
        zoom={isLargerThan800 ? 7 : 5}
        scrollWheelZoom={false}
        style={{ height: `100%`, width: `100%`, zIndex: 1 }}
        dragging={true}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data?.map((vr, index) => {
          if (
            !vr.polling_unit.location.latitude ||
            !vr.polling_unit.location.longitude
          )
            return null;

          return (
            <Marker
              key={vr.id}
              icon={iconPerson}
              position={[
                parseFloat(vr.polling_unit.location.latitude),
                parseFloat(vr.polling_unit.location.longitude),
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
