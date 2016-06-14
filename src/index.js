import storage from 'electron-json-storage';
import * as Promise from 'bluebird';
Promise.promisifyAll(storage);

export default (key) => ({
    load() {
        return storage.get(key).then((jsonState) => JSON.parse(jsonState) || {});
    },

    save(state) {
        const jsonState = JSON.stringify(state);
        return storage.set(key, jsonState);
    }
});
