const crypto = require('crypto');
const superagent = require('superagent');

let API_KEY = '';
let SECRET  = '';

function HMAC(input) {
    if (SECRET === '') throw "Please provide your HMAC SECRET";
    const hmac = crypto.createHmac('sha256', SECRET);
    hmac.write(input);
    return hmac.digest('hex');
}

function isLoggedIn() {
    return !((!API_KEY || API_KEY === '') || (!SECRET || SECRET === ''));
}

function login(key, secret) {
    API_KEY = key;
    SECRET  = secret;
}

async function getAccount() {
    if (!isLoggedIn()) throw "You must login to StakeCube with your API KEY and SECRET before sending private requests";
    try {
        // Format the input and craft a HMAC signature
        const input = "nonce=" + Date.now();
        const hmac = HMAC(input);

        // Send the request
        let res = await superagent
        .get('https://stakecube.io/api/v2/user/account?' + input + "&signature=" + hmac)
        .set('X-API-KEY', API_KEY)
        .set('User-Agent', 'StakeCube Node.js Library')
        .send();
        return res.body;
    } catch (e) {
        throw e;
    }
}

async function getOpenOrders() {
    if (!isLoggedIn()) throw "You must login to StakeCube with your API KEY and SECRET before sending private requests";
    try {
        // Format the input and craft a HMAC signature
        const input = "nonce=" + Date.now();
        const hmac = HMAC(input);
    
        // Send the request
        let res = await superagent
        .get('https://stakecube.io/api/v2/exchange/spot/myOpenOrder' + input + "&signature=" + hmac)
        .set('X-API-KEY', API_KEY)
        .set('User-Agent', 'StakeCube Node.js Library')
        .send();
        return res.body;
    } catch (e) {
        throw e;
    }
}

async function getOrderbook(market, side) {
    if (!isLoggedIn()) throw "You must login to StakeCube with your API KEY and SECRET before sending private requests";
    try {
        let res = await superagent
        .get('https://stakecube.io/api/v2/exchange/spot/orderbook?market=' + market + '&side=' + side)
        .set('X-API-KEY', API_KEY)
        .set('User-Agent', 'StakeCube Node.js Library')
        .send();
        return res.body;
    } catch (e) {
        throw e;
    }
}

async function myTrades(market, limit = 100) {
    if (!isLoggedIn()) throw "You must login to StakeCube with your API KEY and SECRET before sending private requests";
    try {
        // Format the input and craft a HMAC signature
        const input = "nonce=" + Date.now() + "&market=" + market + "&limit=" + limit;
        const hmac = HMAC(input);

        // Send the request
        let res = await superagent
        .get('https://stakecube.io/api/v2/exchange/spot/myTrades?' + input + "&signature=" + hmac)
        .set('X-API-KEY', API_KEY)
        .set('User-Agent', 'StakeCube Node.js Library')
        .send();
        return res.body;
    } catch (e) {
        throw e;
    }
}

async function getOrderHistory(market, limit = 100) {
    if (!isLoggedIn()) throw "You must login to StakeCube with your API KEY and SECRET before sending private requests";
    try {
        // Format the input and craft a HMAC signature
        const input = "nonce=" + Date.now() + "&market=" + market + "&limit=" + limit;
        const hmac = HMAC(input);

        // Send the request
        let res = await superagent
        .get('https://stakecube.io/api/v2/exchange/spot/myOrderHistory?' + input + "&signature=" + hmac)
        .set('X-API-KEY', API_KEY)
        .set('User-Agent', 'StakeCube Node.js Library')
        .send();
        return res.body;
    } catch (e) {
        throw e;
    }
}

async function postOrder(market, side, price, amount) {
    if (!isLoggedIn()) throw "You must login to StakeCube with your API KEY and SECRET before sending private requests";
    try {
        // Format the input and craft a HMAC signature
        const input = "nonce=" + Date.now() + "&market=" + market + "&side=" + side + "&price=" + price + "&amount=" + amount;
        const hmac = HMAC(input);

        // Send the request
        let res = await superagent
        .post('https://stakecube.io/api/v2/exchange/spot/order')
        .set('X-API-KEY', API_KEY)
        .set('User-Agent', 'StakeCube Node.js Library')
        .send(input + "&signature=" + hmac);
        return res.body;
    } catch (e) {
        throw e;
    }
}

async function cancelAll(market) {
    if (!isLoggedIn()) throw "You must login to StakeCube with your API KEY and SECRET before sending private requests";
    try {
        // Format the input and craft a HMAC signature
        const input = "nonce=" + Date.now() + "&market=" + market;
        const hmac = HMAC(input);

        // Send the request
        let res = await superagent
        .post('https://stakecube.io/api/v2/exchange/spot/cancelAll')
        .set('X-API-KEY', API_KEY)
        .set('User-Agent', 'StakeCube Node.js Library')
        .send(input + "&signature=" + hmac);
        return res.body;
    } catch (e) {
        throw e;
    }
}

module.exports = { login, getAccount, getOpenOrders, myTrades, getOrderHistory, postOrder, cancelAll };