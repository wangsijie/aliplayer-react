import React, { useEffect, useRef, useMemo, FunctionComponent } from 'react';
import fetchJsFromCDN from './fetch-js-from-cdn';
import './deps/aliplayercomponents-1.0.5.min.js';
import './index.css';

const SOURCE_URL = 'https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js';

interface Props {
    config?: any;
    onGetInstance?: Function;
}

const Aliplayer: FunctionComponent<Props> & { components: any } = ({ config, onGetInstance }) => {
    if (!config) {
        throw new Error('Missing Aliplayer config');
    }

    const id = useMemo(() => `aliplayer-${Math.floor(Math.random() * 1000000)}`, []);
    const player = useRef(null);

    useEffect(() => {
        if (!id || player.current) { return }
        fetchJsFromCDN(SOURCE_URL, 'Aliplayer')
        .then((data: any) => {
            const Aliplayer = data;
            if (player.current) { return }
            player.current = new Aliplayer({
                ...config,
                "id": id,
            }, (player: any) => {
                onGetInstance && onGetInstance(player);
            });
        });
    }, [id, config]);

    return <div id={id}></div>
}

Aliplayer.components = window.AliPlayerComponent;

export default Aliplayer
