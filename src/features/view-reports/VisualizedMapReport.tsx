import { SearchResults } from '@/types';
import { Box } from '@chakra-ui/react';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet-boundary-canvas';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  MapContainer,
  Marker,
  Rectangle,
  TileLayer,
  useMap,
} from 'react-leaflet';

const iconPerson = new L.Icon({
  iconUrl: `/assets/icons/danger-map.svg`,
  iconRetinaUrl: `/assets/icons/danger-map.svg`,
  iconAnchor: undefined,
  popupAnchor: undefined,
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(24, 24),
});

export interface MapProps {
  data?: SearchResults;
}

export interface LatLong {
  lat: number;
  long: number;
}

function SetBoundsRectangles({
  top,
  btm,
}: {
  top: LatLngTuple;
  btm: LatLngTuple;
}) {
  const map = useMap();

  const innerHandlers = useMemo(
    () => ({
      click() {
        console.log([top, btm]);
        map.fitBounds([top, btm]);
      },
    }),
    [map, top, btm],
  );

  useEffect(() => {
    map.fitBounds([top, btm]);
  }, [top, btm, map]);

  return (
    <>
      <Rectangle
        bounds={[top, btm]}
        eventHandlers={innerHandlers}
        pathOptions={{ color: `#228A78` }}
      />
    </>
  );
}

function extractBounds(data: SearchResults) {
  let x = 9.082;
  let y = 8.6753;
  let X = 9.082;
  let Y = 8.6753;

  let initialized = false;

  data?.state_results.data[0]?.polling_units?.map((pu) => {
    if (!pu.location.latitude || !pu.location.longitude) return null;

    if (!initialized) {
      x = parseFloat(pu.location.latitude);
      y = parseFloat(pu.location.latitude);
      X = parseFloat(pu.location.longitude);
      Y = parseFloat(pu.location.longitude);

      initialized = true;
    }

    // Update the large lat
    if (parseFloat(pu.location.latitude) > X)
      X = parseFloat(pu.location.latitude);

    // Update the small lat
    if (parseFloat(pu.location.latitude) < x)
      x = parseFloat(pu.location.latitude);

    // Update the large long
    if (parseFloat(pu.location.longitude) > Y)
      Y = parseFloat(pu.location.longitude);

    // Update the small long
    if (parseFloat(pu.location.longitude) < y)
      y = parseFloat(pu.location.longitude);
  });

  if (!initialized)
    return [
      [4, 3],
      [14, 15],
    ];

  return [
    [x, y],
    [X, Y],
  ];
}

export default function VisualizedMapReport({ data }: MapProps) {
  const mapRef = useRef<L.Map>(null);
  const [mapTop, setMapTop] = useState<LatLong>({ lat: 9.082, long: 8.6753 });
  const [mapBottom, setMapBottom] = useState<LatLong>({
    lat: 9.082,
    long: 8.6753,
  });

  useEffect(() => {
    if (data) {
      const [[x, y], [X, Y]] = extractBounds(data);
      setMapTop({ lat: x, long: y });
      setMapBottom({ lat: X, long: Y });

      mapRef.current?.fitBounds([
        [x, y],
        [X, Y],
      ]);
    }
  }, [data]);

  return (
    <Box width={`full`} height={[`300px`, `400px`]}>
      <MapContainer
        center={[9.082, 8.6753]}
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: `100%`, width: `100%`, zIndex: 1 }}
        dragging={true}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data?.state_results.data[0]?.polling_units?.map((pu) => {
          // pu.violencereports?.map((reports, index) => (

          // ));
          if (!pu.location.latitude || !pu.location.longitude) return null;

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
        <SetBoundsRectangles
          btm={[mapBottom.lat, mapBottom.long]}
          top={[mapTop.lat, mapTop.long]}
        />
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
