import { DataLevel } from '@/components/AccessData/DataAggregator';
import { LGA, PollingUnit, SearchResults, State, Ward } from '@/types';
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
  iconUrl: `/assets/maps/danger-map.svg`,
  iconRetinaUrl: `/assets/maps/danger-map.svg`,
  iconAnchor: undefined,
  popupAnchor: undefined,
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(24, 24),
});

export interface MapProps {
  data?: State | LGA | Ward | PollingUnit;
  regionKey: DataLevel;
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

function extractBounds(
  data: State | LGA | Ward | PollingUnit,
  region: DataLevel,
) {
  let x = 9.082;
  let y = 8.6753;
  let X = 9.082;
  let Y = 8.6753;

  let initialized = false;
  const pollingUnits = extractPollingUnits(data, region);

  pollingUnits?.map((pu) => {
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

function extractPollingUnits(
  data: State | LGA | Ward | PollingUnit,
  region: DataLevel,
) {
  if (region == `state_results`) {
    const newData = data as State;
    return newData.polling_units;
  } else if (region == `local_government_results`) {
    const newData = data as LGA;
    return newData.polling_units;
  } else if (region == `ward_results`) {
    const newData = data as LGA;
    return newData.polling_units;
  } else {
    const newData = data as PollingUnit;
    return [newData];
  }
}

export default function VisualizedMapReport({ data, regionKey }: MapProps) {
  const mapRef = useRef<L.Map>(null);
  const [mapTop, setMapTop] = useState<LatLong>({ lat: 9.082, long: 8.6753 });
  const [mapBottom, setMapBottom] = useState<LatLong>({
    lat: 9.082,
    long: 8.6753,
  });

  useEffect(() => {
    if (data) {
      const [[x, y], [X, Y]] = extractBounds(data, regionKey);
      setMapTop({ lat: x, long: y });
      setMapBottom({ lat: X, long: Y });

      mapRef.current?.fitBounds([
        [x, y],
        [X, Y],
      ]);
    }
  }, [data]);

  if (!data)
    return (
      <Box
        width={`full`}
        height={[`300px`, `400px`]}
        bgColor={`primary.100`}
      ></Box>
    );

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
        {extractPollingUnits(data, regionKey)?.map((pu) => {
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
