import 'whatwg-fetch';
import urlJoin from 'proper-url-join';

export function list_all_blocks() {
    return fetch('/blocks')
        .then((response) => response.json())
        .catch((ex) => {
            console.log('parsing failed', ex);
        })
};

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
