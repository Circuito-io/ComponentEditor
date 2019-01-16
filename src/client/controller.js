import 'whatwg-fetch';
import urlJoin from 'proper-url-join';

function list_all_factory(objPrefix) {
    return function () {
        return fetch(urlJoin('/api', objPrefix))
            .then((response) => response.json())
            .catch((ex) => {
                console.log('parsing failed', ex);
            })
    }
}

export const list_all_blocks  = list_all_factory('blocks');
export const list_all_parts   = list_all_factory('parts');
export const list_all_coders  = list_all_factory('coders');

export var all_blocks_cached = null;
export var all_parts_cached = null;

export function cacheData() {
    return new Promise(resolve => {
        list_all_blocks()
            .then((blocks) => {
                all_blocks_cached = blocks;

                list_all_parts()
                    .then((parts) => {
                        all_parts_cached = parts;

                        resolve();
                    })
            })
    });
}

function read_a_factory(objPrefix) {
    return function (name) {
        return window.fetch(urlJoin('/api', objPrefix, name))
            .then((response) => response.json())
            .catch((ex) => {
                console.log('parsing failed', ex);
            })
    }
}

export const read_a_block = read_a_factory('blocks');
export const read_a_part = read_a_factory('parts');
export const read_a_coder = read_a_factory('coders');

function update_a_factory(objPrefix) {
    return function (name, data) {
        return window.fetch(urlJoin('/api', objPrefix, name), {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .catch((ex) => {
                console.log('parsing failed', ex);
            })
    }
}

export const update_a_block = update_a_factory('blocks');
export const update_a_part = update_a_factory('parts');
export const update_a_coder = update_a_factory('coders');


export function invoke_upload() {
    return window.fetch('/api/upload')
        .catch((ex) => {
            console.log('upload failed', ex);
        });
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