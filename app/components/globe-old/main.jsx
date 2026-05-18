// app/components/globe/main.jsx
import * as THREE from three;
import { useEffect, useRef, useState } from react;

import App from ./app;
import Globe from ./globe;
import Lines from ./lines;
import Marker from ./marker;
import Markers from ./markers;
import Points from ./points;

import gridData from ~/components/globe/data/grid;
import countriesData from ~/components/globe/data/countries;
import connectionsData from ~/components/globe/data/connections;

import { getCountries } from ~/components/globe/data/processing;
import { config, elements, groups, animations } from ~/components/globe/utils/config;

import styles from ./main.module.css;

const Main = () => {
    const [controls, setControls] = useState({ changed: true });
    const [data, setData] = useState({ grid: [], countries: [], connections: [] });
    const [isLoading, setIsLoading] = useState(true);
    const appRef = useRef();
    const globeRef = useRef();
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    useEffect(() => {
        if (!appRef.current) {
            appRef.current = new App({ setup, animate, preload });
            window.onresize = appRef.current.handleResize;
        }

        return () => {
            if (appRef.current?.guiRef) {
                appRef.current.guiRef.destroy();
            }
            window.onresize = null;
        };
    }, []);

    const preload = async () => {
        try {
            const loadedData = {
                grid: gridData.grid,
                countries: countriesData.countries,
                connections: getCountries(connectionsData.connections, countriesData.countries),
            };

            setData(loadedData);

            globeRef.current = new Globe();
            await globeRef.current.loadTextures();

            setIsLoading(false);
            setHasLoadedOnce(true);
            return true;
        } catch (error) {
            console.error(Erreur
