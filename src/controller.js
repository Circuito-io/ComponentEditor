import 'whatwg-fetch';
import urlJoin from 'proper-url-join';

function list_all_factory(objPrefix) {
    return function() {
        return fetch('/' + objPrefix)
            .then((response) => response.json())
            .catch((ex) => {
                console.log('parsing failed', ex);
            })
    }
}

export const list_all_blocks = list_all_factory('blocks');
export const list_all_parts = list_all_factory('parts');

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

export function read_a_block(name) {
    return fetch(urlJoin('/blocks/' + name))
        .then((response) => response.json())
        .catch((ex) => {
            console.log('parsing failed', ex);
        })
};

export function update_a_block(name, data) {
    return fetch(urlJoin('/blocks/' + name), {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .catch((ex) => {
            console.log('parsing failed', ex);
        })
}
