import "whatwg-fetch";
import urlJoin from "proper-url-join";

function list_all_factory(objPrefix) {
  return () => {
    return fetch(urlJoin("/api", objPrefix))
      .then(response => response.json())
      .catch(err => console.log("parsing failed: " + err));
  };
}

export const list_all_blocks = list_all_factory("blocks");
export const list_all_parts = list_all_factory("parts");
export const list_all_coders = list_all_factory("coders");

export function cacheData() {
  let cachedData = {
    blocks: null,
    parts: null,
    coders: null,
    blocksData: null,
    controllers: null
  };
  return list_all_blocks()
    .then(blocksData => {
      // blocks are fetched as objects with several fields
      cachedData.blocksData = blocksData;
      cachedData.blocks = blocksData.map(block => block.name);
      cachedData.controllers = blocksData
        .filter(block => block.category && block.category.includes("controller"))
        .map(block => block.name);
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
    return window
      .fetch(urlJoin("/api", objPrefix, name))
      .then(response => response.json())
      .catch(err => console.log("parsing failed: " + err));
  };
}

export const read_a_block = read_a_factory("blocks");
export const read_a_part = read_a_factory("parts");
export const read_a_coder = read_a_factory("coders");

function update_a_factory(objPrefix) {
  return (name, data) => {
    return window
      .fetch(urlJoin("/api", objPrefix, name), {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })
      .catch(err => console.log("parsing failed: " + err));
  };
}

export const update_a_block = update_a_factory("blocks");
export const update_a_part = update_a_factory("parts");
export const update_a_coder = update_a_factory("coders");

function delete_a_factory(objPrefix) {
  return name => {
    return window.fetch(urlJoin("/api", objPrefix, name), {
      method: "delete"
    });
  };
}

export const delete_a_block = delete_a_factory("blocks");
export const delete_a_part = delete_a_factory("parts");
export const delete_a_coder = delete_a_factory("coders");

export function invoke_upload() {
  return window
    .fetch("/api/upload")
    .catch(err => console.log("upload failed: " + err));
}

export function read_a_svgdata(img) {
  return window
    .fetch(urlJoin("/api/svgdata", encodeURIComponent(img)))
    .then(response => response.json());
}

export function gitpod_open(path) {
  return window
    .fetch(urlJoin("/api/open", encodeURIComponent(path)))
    .catch(ex => {
      console.log("gitpod_open failed", ex);
    });
}

export function delete_a_coder_file(name, filename) {
  return window
    .fetch(urlJoin("/api/coders", name, filename), { method: "delete" })
    .catch(ex => {
      console.log("delete_a_coder_file failed", ex);
    });
}
