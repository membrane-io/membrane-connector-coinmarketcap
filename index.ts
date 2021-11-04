const { http } = M.nodes;

const baseUrl = "https://pro-api.coinmarketcap.com/v1";
const apiKey = "API_KEY_COIN_MARKET";

// Helper function to make API calls
async function api(method, url, body?) {
    const headers = {
        "X-CMC_PRO_API_KEY": apiKey
    }
    try {
        const json = await http.resource({ method, url, headers: JSON.stringify(headers), body: JSON.stringify(body) }).$query(`{ body }`);
        return JSON.parse(json.body);
    } catch (e) {
        throw e;
    }
}

const getRandomPrice = (min, max) => {
    return Math.random() * (max - min) + min;
}

const apiGet = (path) => api('GET', baseUrl + path);

export const Root = {
    symbolPrice: async ({ args: { symbol }}) => {

        if (!symbol) {
            throw new Error("Coin symbol cannot be null");
        }

        symbol = symbol.toUpperCase();

        try {
            const coinInfo = await apiGet(`/cryptocurrency/quotes/latest?symbol=${symbol}`);
            const price = coinInfo["data"][symbol]["quote"]["USD"]["price"];
            return {
                symbol,
                price
            };
        } catch (e) {
            throw e;
        }
    },
    echoSymbol: async ({ args: { symbol }}) => {

        if (!symbol) {
            throw new Error("Coin symbol cannot be null");
        }

        const price = getRandomPrice(50000, 70000);

        try {
            return {
                symbol,
                price
            };
        } catch (e) {
            throw e;
        }
    }
}
