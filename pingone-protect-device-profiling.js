function profileDevice(
    callback,
    behavioralDataCollection = true,
    collectDeviceTrustAttributes = false,
    deviceTrustAgentTimeout,
    deviceTrustAgentPort,
    deviceProfilingTimeout,
    collectGeoLocation,
    collectGeoLocationWithPrompt
) {
    const signalsSdkInitPromise = new Promise((resolve, reject) => {
        onPingOneSignalsReady(function () {
            _pingOneSignals.init({
                agentIdentification: collectDeviceTrustAttributes === true,
                agentTimeout: deviceTrustAgentTimeout ?? undefined,
                agentPort: deviceTrustAgentPort ?? undefined,
                behavioralDataCollection: behavioralDataCollection,
                htmlGeoLocation: collectGeoLocation && !!navigator.geolocation
            }).then(() => {
                console.log("PingOne Signals initialized successfully");
                resolve();
            }).catch((e) => {
                console.error("SDK Init failed", e);
                reject(e);
            });
        });
    });

    const geoLocationPromise = new Promise((resolve) => {
        if (!(collectGeoLocationWithPrompt && !!navigator.geolocation)) {
            setTimeout(callback, deviceProfilingTimeout);
            resolve();
            return;
        }

        let completed = false;

        const geoLocationTimeout = setTimeout(() => {
            if (!completed) {
                console.warn("Geolocation prompt timeout reached");
                completed = true;
                resolve();
            }
        }, deviceProfilingTimeout);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (!completed) {
                    clearTimeout(geoLocationTimeout);
                    completed = true;
                    const geoData = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        altitude: position.coords.altitude,
                        speed: position.coords.speed,
                        heading: position.coords.heading,
                        timestamp: position.timestamp,
                        error_code: null,
                        error_message: null
                    };
                    // Store in session storage
                    sessionStorage.setItem('pos_geo', JSON.stringify(geoData));
                    console.log("Geolocation permission granted.");
                    resolve();
                }
            },
            (error) => {
                if (!completed) {
                    clearTimeout(geoLocationTimeout);
                    completed = true;
                    const geoData = {
                        latitude: null,
                        longitude: null,
                        accuracy: null,
                        altitude: null,
                        speed: null,
                        heading: null,
                        timestamp: Date.now(),
                        error_code: error.code,
                        error_message: error.message
                    };
                    // Store in session storage
                    sessionStorage.setItem('pos_geo', JSON.stringify(geoData));
                    console.warn("Geolocation permission denied or unavailable:", error.message);
                    resolve();
                }
            },
            {
                enableHighAccuracy: true,
                timeout: deviceProfilingTimeout,
                maximumAge: 0
            }
        );
    });

    Promise.all([signalsSdkInitPromise, geoLocationPromise])
        .then(() => {
            getDeviceProfileData(callback);
        })
        .catch((e) => {
            console.error("Failed to profile device:", e);
        });
}

function onPingOneSignalsReady(callback) {
    if (window['_pingOneSignalsReady']) {
        callback();
    } else {
        document.addEventListener('PingOneSignalsReadyEvent', callback);
    }
}

/**
 * Calls the getData method and with the output, calls the callback function.
 *
 * @param callback
 */
function getDeviceProfileData(callback) {
    _pingOneSignals.getData()
        .then(result => callback(result))
        .catch(error => console.error('getData Error!', error));
}