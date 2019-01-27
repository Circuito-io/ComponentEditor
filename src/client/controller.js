import 'whatwg-fetch';
import urlJoin from 'proper-url-join';

function list_all_factory(objPrefix) {
    return ()=> {
        return fetch(urlJoin('/api', objPrefix))
        .then(response => response.json())
        .catch(err => console.log('parsing failed: ' + err));
    };
}

export const list_all_blocks = list_all_factory('blocks');
export const list_all_parts = list_all_factory('parts');
export const list_all_coders = list_all_factory('coders');

export function cacheData() {
    let cachedData = {blocks: null, parts: null, coders: null};
    return list_all_blocks()
    .then(blocks => {
        cachedData.blocks = blocks;
        return list_all_parts();
    })
    .then(parts => {
        cachedData.parts = parts;
        return list_all_coders();
    })
    .then(coders => {
        cachedData.coders = coders;
        return cachedData;
    })
    .catch(err => {
        console.log("Failed caching - " + err);
        throw err;
    });
}

function read_a_factory(objPrefix) {
    return name => {
        return window.fetch(urlJoin('/api', objPrefix, name))
        .then(response => response.json())
        .catch(err => console.log('parsing failed: ' + err));
    }
}

export const read_a_block = read_a_factory('blocks');
export const read_a_part = read_a_factory('parts');
export const read_a_coder = read_a_factory('coders');

function update_a_factory(objPrefix) {
    return (name, data)=> {
        return window.fetch(urlJoin('/api', objPrefix, name), {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .catch(err => console.log('parsing failed: ' + err));
    }
}

export const update_a_block = update_a_factory('blocks');
export const update_a_part = update_a_factory('parts');
export const update_a_coder = update_a_factory('coders');

export function invoke_upload() {
    return window.fetch('/api/upload')
    .catch((err) => console.log('upload failed: ' + err));
}

export function read_a_svgdata(img) {
    return window.fetch(urlJoin('/api/svgdata', img))
        .then((response) => response.json())
        .catch((ex) => {
            console.log('parsing failed', ex);
        })
}

export function gitpod_open(path) {
    return window.fetch(urlJoin('/api/open', encodeURIComponent(path)))
        .catch((ex) => {
            console.log('gitpod open failed', ex);
        });
}