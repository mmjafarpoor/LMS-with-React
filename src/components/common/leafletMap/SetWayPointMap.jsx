import React, { useState } from 'react'
import "leaflet/dist/leaflet.css"
import Style from './LeafletMap.module.css'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { divIcon , Icon, point } from 'leaflet'

const SetWayPointMap = () => {

    const [wayPoint, setWayPoint] = useState(null);

    const MapClickHandler = ({ setWayPoint }) => {
        useMapEvents({
            click(e) {
                setWayPoint(e.latlng);
            },
        });

        return null;
    };

    const customIcon = new Icon({
        iconUrl:"/images/mapPoint.png",
        iconSize:[35,35],
    });

    const createCustomClusterIcon = (cluster) => {
        return new divIcon({
            html: `<div class="clusterIcon">${cluster.getChildCount()}</div>`,
            className:"customMarkerCluster",
            iconSize: point(33,33,true),
        })
    } 

    return (
        <MapContainer  center={[36.578272570064556,53.06155316913632]} zoom={13} className={Style.mapContainer}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <MapClickHandler setWayPoint={setWayPoint} />
            <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={createCustomClusterIcon}
            >
                {wayPoint && (
                    <Marker position={wayPoint} icon={customIcon}>
                        <Popup>Waypoint</Popup>
                    </Marker>
                )}
            </MarkerClusterGroup>
        </MapContainer>
    )
}

export default SetWayPointMap