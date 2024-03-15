'use client';

import React, {useEffect} from 'react'
import 'ol/ol.css'
import {Map, View} from 'ol'
import { defaults as defaultControls, FullScreen } from 'ol/control'
import {fromLonLat} from 'ol/proj'
import { Tile as TileLayer } from 'ol/layer'
import { XYZ } from 'ol/source'

import {
    DragRotateAndZoom,
    defaults as defaultInteractions,
} from 'ol/interaction'
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

type MapComponentProps = {
    center?: {x: number, y: number} ;
}

const MapComponent = ({center}: MapComponentProps ) => {

    const coord = center ?
        [
            center.x,
            center.y
        ]
        : [126.784587, 37.645143];
    

    useEffect(() => {
        const vworldKey = 'F79DF30C-7109-30C4-8E1F-1539EF5FC93D';

        const poiSource = new VectorSource();
        const poiLayer = new VectorLayer({
            source: poiSource,
        });

        const map = new Map({
            controls: defaultControls({zoom: false, rotate: false}).extend([
                new FullScreen(),
            ]),
            interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: `https://api.vworld.kr/req/wmts/1.0.0/${vworldKey}/Base/{z}/{y}/{x}.png`,
                    }),
                }),
                poiLayer,
            ],
            target: `map`,
            view: new View({
                center: fromLonLat(coord),
                zoom: 15,
            }),
        });

        return () => {
            map.setTarget(undefined);
            map.dispose();
        }
    }, []);


    return (
        <>
            <div id="map" className={"p-2 w-full h-96"}/>
        </>
    )


}

export default MapComponent;