import axios from "axios";


// Cache data for 1 hour. This is only for calls that are not expected to change frequently
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

const universalisApi = axios.create({
    baseURL: "https://universalis.app/api/v2",
});

//TODO: This API is going to be deprecated soon. Check XIVAPI's discord for more information
const xivApi = axios.create({
    baseURL: "https://xivapi.com",
});

//gunna need to change this to the backend API before deploying
const backendApi = axios.create({
    baseURL: "https://xiv-trader-backend.onrender.com/items",
});

async function getDataCenters() {
    const cachedData = localStorage.getItem('dataCenters');
    const cachedTime = localStorage.getItem('dataCenters_time');

    if (cachedData && cachedTime && (Date.now() - cachedTime < CACHE_DURATION)) {
        return JSON.parse(cachedData);
    }

    let res = await xivApi.get("/servers/dc");
    const data = Object.keys(res.data);

    localStorage.setItem('dataCenters', JSON.stringify(data));
    localStorage.setItem('dataCenters_time', Date.now());

    return data;
}

async function getWorlds(dataCenter) {
    if (!dataCenter) { return ["Please select a data center"] }

    const cachedData = localStorage.getItem(`worlds_${dataCenter}`);
    const cachedTime = localStorage.getItem(`worlds_${dataCenter}_time`);

    if (cachedData && cachedTime && (Date.now() - cachedTime < CACHE_DURATION)) {
        return JSON.parse(cachedData);
    }

    let res = await xivApi.get(`/servers/dc`);
    const data = res.data[dataCenter];

    localStorage.setItem(`worlds_${dataCenter}`, JSON.stringify(data));
    localStorage.setItem(`worlds_${dataCenter}_time`, Date.now());

    return data;
}


// get all items tradable with the selected currency
async function getItems(currency) {
    let res = await backendApi.get("/", {
        params: {
            currency,
        },
    });


    return res.data.items;
}

//universalis API limits requests to 100 items a request. Not an issue with current data but may be in the future
//gets the market data for all items tradable with the selected currency on the selected world
async function getMarketData(world, currency) {

    // get all items tradable with the selected currency
    let itemsRes = await getItems(currency);
    // get the item ids
    let itemsIds = itemsRes.map((item) => item.id);
    // get the market data for each item
    let marketData = await universalisApi.get(`${world}/${itemsIds.join(",")}`);

    //merge market data with item data
    itemsRes = itemsRes.map((item) => {
        let marketItem = marketData.data.items[item.id];
        return {
            ...item,
            ...marketItem,
        };
    });
    return itemsRes;
}


export { getDataCenters, getWorlds, getMarketData };
