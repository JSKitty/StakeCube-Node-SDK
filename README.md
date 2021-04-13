# StakeCube-Node-SDK
The official StakeCube API SDK for Node.js - Available on NPM!

## Install
NPM: `npm i stakecube-node-sdk`

...or clone via git and import the module yourself!

## Setup
To start using the StakeCube SDK, import the module in the format you prefer below:

```js
let SC = require('stakecube-node-sdk');
```
or...
```js
import { login, getAccount, ... } from 'stakecube-node-sdk';
```

After installing the module, grab your **API Key** and **Secret** from your StakeCube account interface, to use private APIs with this package, you'll have to call the below method:
```js
// Example code
let SC = require('stakecube-node-sdk');
SC.login("your_api_key", "your_secret");
```
Then you're ready to roll!

---

## Usage

### Note: If you're looking for Advanced REST API documentation, please use [this document](https://github.com/stakecube/DevCube/tree/master/rest-api) from DevCube!

### Login
> Authenticates with your StakeCube account via API Key + Secret, this will allow you to use Private APIs.
- Method: `login(key, secret);`

Parameter | Description | Example
------------ | ------------- | -------------
(required) key | the SC account's API key | N/A
(required) secret | the SC account's Secret | N/A

Example:
```js
SC.login("api_key", "secret"); // 'true'
```

### Get Arbitrage Info
> Gets arbitrage information for a chosen coin ticker.
- Method: `getArbitrageInfo(ticker);`

Parameter | Description | Example
------------ | ------------- | -------------
(required) ticker | the ticker of a coin | SCC

Example:
```js
SC.getArbitrageInfo("SCC").then(res => { console.log(res) }); // { 'coingecko-provided market info object' }
```

### Get Markets
> Gets a list of all StakeCube markets under the chosen base market, optionally sorted by `volume` or `change`, but by default sorted alphabetically.
- Method: `getMarkets(base, orderBy);`

Parameter | Description | Example
------------ | ------------- | -------------
(required) base | the chosen base coin | BTC
(optional) orderBy | the ordering of the list | `volume` or `change`

Example:
```js
SC.getMarkets("SCC", "volume").then(res => { console.log(res) }); // result: { SCC_BTC: {}, DASH_BTC: {} ... }
```

---

### Get OHLC Data
> Gets an array of the last 500 candles for the chosen market pair and interval.
- Method: `getOhlcData(market, interval);`

Parameter | Description | Example
------------ | ------------- | -------------
(required) market | the chosen market pair | SCC_BTC
(required) interval | the per-candle timeframe / period | `1m`, `5m`, `15m`, `30m`, `1h`, `4h`, `1d`, `1w`, `1mo`

Example:
```js
SC.getOhlcData("SCC_BTC", "1d").then(res => { console.log(res) }); // result: { depth: { asks: [], bids: []}, lines: [], trades: [] }
```

---

### Get Rate Limits
> Gets the current global StakeCube rate-limits for APIs.
- Method: `getRatelimits();`

Example:
```js
SC.getRatelimits().then(res => { console.log(res) }); // result: [ { rate_limit_type: "REQUEST_WEIGHT", interval: "DAY" ... } ... ]
```

---

### Get Orderbook
> Gets the orderbook of a chosen market, optionally a specified side, but by default will load both orderbook sides.
- Method: `getOrderbook("SCC_BTC");`

Parameter | Description | Example
------------ | ------------- | -------------
(required) market | the chosen market pair | SCC_BTC
(optional) side | the orderbook side | `buy` or `sell`

Example:
```js
SC.getOrderbook("SCC_BTC").then(res => { console.log(res) }); // result: { asks: [], bids: [] }
```

---

... more docs coming soon!