import React from 'react'
import "leaflet/dist/leaflet.css"
import Style from './LeafletMap.module.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { divIcon , Icon, point } from 'leaflet'

const LeafletMap = () => {

    const markers = [
        { id:"BahrAC" , geoCode:[36.59766421635837,53.06466614502861] , popUp:"آکادمی بحرالعلوم"},
        { id:"PrisonRealm" , geoCode:[36.55778730780621,53.0708130048005] , popUp:"تنبل خونه"},
    ];

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
        <MapContainer center={[36.578272570064556,53.06155316913632]} zoom={13} className={Style.mapContainer}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            
            <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={createCustomClusterIcon}
            >
                {markers.map((marker)=>(
                    <Marker key={marker.id} position={marker.geoCode} icon={customIcon}>
                        <Popup><span className={Style.popUp}>{marker.popUp}</span></Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    )
}

export default LeafletMap