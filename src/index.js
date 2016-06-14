import storage from 'electron-json-storage';
import * as Promise from 'bluebird';

const storageGet = Promise.promisify(storage.get);
const storageSet = Promise.promisify(storage.set);

export default (key) => ({
    load() {
        return storageGet(key).then((jsonState) => JSON.parse(jsonState) || {});
    },

    save(state) {
        const jsonState = JSON.stringify(state);
        return storageSet(key, jsonState);
    }
});
