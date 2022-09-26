import fetch from 'node-fetch';
const HttpsProxyAgent = require('https-proxy-agent');

export type SunriseWrapper = {
    results: Results;
    status: string;
};

export interface Results {
    sunrise: string;
    sunset: string;
    solar_noon: string;
    day_length: string;
    civil_twilight_begin: string;
    civil_twilight_end: string;
    nautical_twilight_begin: string;
    nautical_twilight_end: string;
    astronomical_twilight_begin: string;
    astronomical_twilight_end: string;
};

(async () => {
    const proxyAgent = new HttpsProxyAgent('http://proxy:3128');
    const response = await fetch('https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today', { agent: proxyAgent });
    const wrapper: SunriseWrapper = (await response.json()).results;
    console.log(wrapper.results);
})();
