import React, { useEffect, useRef, useMemo, FunctionComponent } from 'react';
import fetchJsFromCDN from './fetch-js-from-cdn';
import './deps/aliplayercomponents-1.0.5.min.js';
import './index.css';

const SOURCE_URL = 'https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js';

interface Props {
    config?: any;
    onGetInstance?: Function;
    onGetComponents?: Function;
}

const Aliplayer: FunctionComponent<Props> = ({ config, onGetInstance, onGetComponents }) => {
    if (!config) {
        throw new Error('Missing Aliplayer config');
    }

    const id = useMemo(() => `aliplayer-${Math.floor(Math.random() * 1000000)}`, []);
    const player = useRef(null);

    useEffect(() => {
        if (!id || player.current) { return }
        fetchJsFromCDN(SOURCE_URL, ['Aliplayer'])
        .then((data: any[]) => {
            const Aliplayer = data[0];
            if (player.current) { return }
            player.current = new Aliplayer({
                ...config,
                "id": id,
            }, (player: any) => {
                onGetInstance && onGetInstance(player);
            });
        });
    }, [id, config]);

    useEffect(() => {
        onGetComponents && onGetComponents(window.AliPlayerComponent)
    }, [onGetComponents])

    return <div id={id}></div>
}

export default Aliplayer
