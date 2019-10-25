import React, { useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import fetchJsFromCDN from './fetch-js-from-cdn';
import './index.css';

const SOURCE_URL = 'https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js'

export default function Aliplayer({ config, onGetInstance }) {
    if (!config) {
        throw new Error('Missing Aliplayer config');
    }

    const id = useMemo(() => `aliplayer-${Math.floor(Math.random() * 1000000)}`, []);
    const player = useRef(null);

    useEffect(() => {
        if (!id || player.current) { return }
        fetchJsFromCDN(SOURCE_URL, ['Aliplayer'])
        .then(([Aliplayer]) => {
            if (player.current) { return }
            player.current = new Aliplayer({
                ...config,
                "id": id,
            }, (player) => {
                onGetInstance(player);
            });
        });
    }, [id, config]);

    return <div id={id}></div>
}

Aliplayer.propTypes = {
    config: PropTypes.shape().isRequired,
    onGetInstance: PropTypes.func(),
};

Aliplayer.defaultProps = {
    onGetInstance: () => {},
};
