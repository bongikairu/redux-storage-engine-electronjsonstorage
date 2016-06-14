import storage from 'electron-json-storage';
import * as Promise from 'bluebird';

const storageGet = Promise.promisify(storage.get);
const storageSet = Promise.promisify(storage.set);

export default (key, backup) => ({
    load() {
        return storageGet(key).then((jsonState) => JSON.parse(jsonState) || {});
    },

    save(state) {
        const jsonState = JSON.stringify(state);

        if (backup !== undefined) {
            return new Promise((resolve) => {
                storageSet('backup.' + key, jsonState).then(() => {
                    storageSet(key, jsonState).then(resolve);
                });
            });
        }

        return storageSet(key, jsonState);
    }
});
