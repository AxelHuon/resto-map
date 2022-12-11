import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Icon } from "leaflet";
import "../../../style/main.css";
import { restoreOutline } from "leaflet/src/dom/DomUtil";

const RoomMap = ({
  restaurants,
  users,
  room,
  changePositionFinalPoint,
  currentUser,
  allTime,
}) => {
  const [postionCenterMap, setPostionCenterMap] = useState([
    48.893139, 2.22691,
  ]);

  //Différent Icons de la map
  const customIcon = L.divIcon({
    className: "custom-div-icon user",
    html: "<div><img src='assets/pictos/marker-user.svg'> </div>",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });
  const customIconCurrentUser = L.divIcon({
    className: "custom-div-icon user",
    html: "<div><img src='assets/pictos/marker-current-user.svg'> </div>",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });
  const customIconResto = L.divIcon({
    className: "custom-div-icon resto",
    html: "<div><img src='assets/pictos/marker-resto.svg'></div>",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });
  const customIconFinalPoint = L.divIcon({
    className: "custom-div-icon final-point",
    html: "<div><img src='assets/pictos/marker-final.svg'></div>",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });

  //Tableau des restaurants selectionné par des user
  const [restaurantsSelected, setRestaurantsSelected] = useState([]);
  useEffect(() => {
    let arrayID = [];
    let arrayObject = [];
    users.map((item) => {
      arrayID.push(item.choosenResto);
    });
    restaurants.map((item) => {
      if (arrayID.includes(item.id)) {
        arrayObject.push(item);
        setRestaurantsSelected(arrayObject);
      }
    });
  }, [users]);

  //Draggle marker
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          changePositionFinalPoint(marker.getLatLng());
        }
      },
    }),
    []
  );

  //Ligne pour relier les points
  const [allPostionResto, setAllPostionResto] = useState([]);
  useEffect(() => {
    let arrayAllPositions = [];
    restaurantsSelected.map((item) => {
      arrayAllPositions.push([item.location.long, item.location.lat]);
    });
    setAllPostionResto(arrayAllPositions);
  }, [restaurantsSelected]);
  const [allLinesRestoToFinalPoint, setAllLinesRestoToFinalPoint] = useState(
    []
  );
  useEffect(() => {
    let newLinesArray = [];
    allPostionResto.map((item) => {
      newLinesArray.push([item, [room.finalPoint.long, room.finalPoint.lat]]);
    });
    setAllLinesRestoToFinalPoint(newLinesArray);
  }, [allPostionResto, room]);

  let locUserRestoFinalPoint = [];
  let idRestorant = "";

  users.map((item) => {
    if (item.id === currentUser.id) {
      locUserRestoFinalPoint.push([item.location]);
      idRestorant = item.choosenResto;
    }
  });

  restaurantsSelected.map((item) => {
    if (item.id === idRestorant) {
      locUserRestoFinalPoint.push([item.location]);
    }
  });

  locUserRestoFinalPoint.push([room.finalPoint]);
  const [totalDistanceMetre, setTotalDistanceMetre] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [rhours, setRhours] = useState("");
  const [rminutes, setRminutes] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [dateToArrive, setDateToArrive] = useState(new Date());
  const [dateArrive, setDateArrive] = useState(new Date());
  const [dateToGo, setDateToGo] = useState(new Date());

  useEffect(() => {
    if (locUserRestoFinalPoint.length > 2) {
      const totalDistance =
        L.latLng([
          locUserRestoFinalPoint[0][0].lat,
          locUserRestoFinalPoint[0][0].long,
        ]).distanceTo(
          L.latLng([
            locUserRestoFinalPoint[1][0].lat,
            locUserRestoFinalPoint[1][0].long,
          ])
        ) +
        L.latLng([
          locUserRestoFinalPoint[1][0].lat,
          locUserRestoFinalPoint[1][0].long,
        ]).distanceTo(
          L.latLng([
            locUserRestoFinalPoint[2][0].lat,
            locUserRestoFinalPoint[2][0].long,
          ])
        );
      setTotalTime(Math.floor(totalDistance / 83));
      setTotalDistanceMetre(totalDistance.toFixed());
      setRhours(Math.floor(Math.floor(totalDistance / 83) / 60));
      setRminutes(
        Math.round(
          (Math.floor(totalDistance / 83) / 60 -
            Math.floor(Math.floor(totalDistance / 83) / 60)) *
            60
        )
      );

      allTime.map((item, index) => {
        if (allTime.length - 1 === index) {
          setCurrentTime(item.time);
        }
      });

      setDateToArrive(new Date());
      dateToArrive.setHours(Math.trunc(currentTime));
      dateToArrive.setMinutes(0);
      setDateArrive(dateToArrive);

      let dateToGo = dateToArrive;
      dateToGo.setHours(
        dateToGo.getHours() - Math.floor(Math.floor(totalDistance / 83) / 60)
      );
      dateToGo.setMinutes(
        dateToGo.getMinutes() -
          Math.round(
            (Math.floor(totalDistance / 83) / 60 -
              Math.floor(Math.floor(totalDistance / 83) / 60)) *
              60
          )
      );
    }
  }, [restaurantsSelected, changePositionFinalPoint, room, users, currentTime]);

  return (
    <div className="map" id="map">
      <div className={"display-info-in-map text-white"}>
        <div>
          <p>Heure d'arrivé</p>
          <p>{currentTime ? currentTime : "0"}h</p>
        </div>
        <div>
          <p>Heure de départ</p>
          <p>
            {dateArrive.getHours()}h {dateArrive.getMinutes()}
          </p>
        </div>
        <div>
          <p>Temps total</p>
          <p>{totalTime} minutes</p>
        </div>
        <div>
          <p>Temps total en heure et minutes</p>
          <p>
            {rhours}
            heure et {rminutes} minutes
          </p>
        </div>
        <div>
          <p>Distance total</p>
          <p>{totalDistanceMetre} metres</p>
        </div>
      </div>
      <MapContainer center={postionCenterMap} zoom={13} scrollWheelZoom={true}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {users.map((item, index) => {
          if (item.id === currentUser.id) {
            return (
              <Marker
                key={index}
                icon={customIconCurrentUser}
                position={[item.location.long, item.location.lat]}
              ></Marker>
            );
          } else {
            return (
              <Marker
                key={index}
                icon={customIcon}
                position={[item.location.long, item.location.lat]}
              ></Marker>
            );
          }
        })}
        {restaurantsSelected.map((item, index) => {
          return (
            <Marker
              key={index}
              icon={customIconResto}
              position={[item.location.long, item.location.lat]}
            ></Marker>
          );
        })}
        <Marker
          ref={markerRef}
          draggable={true}
          eventHandlers={eventHandlers}
          icon={customIconFinalPoint}
          position={[room.finalPoint.long, room.finalPoint.lat]}
        ></Marker>
        {allLinesRestoToFinalPoint.map((item, index) => {
          return <Polyline key={index} positions={item} />;
        })}

        {users.map((item, index) => {
          let userRestoChoosen = item.choosenResto;
          let postionOfResto = [];
          let postionUser = [item.location.long, item.location.lat];
          restaurants.map((resto) => {
            if (resto.id === userRestoChoosen) {
              postionOfResto.push(resto.location.long, resto.location.lat);
            }
          });
          let position = [postionUser, postionOfResto];
          return <Polyline key={index} positions={position} />;
        })}
      </MapContainer>
    </div>
  );
};

export default RoomMap;
