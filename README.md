# Svelte Signal
Svelte Signal is a full-stack web socket library.

## How to use
### Set up server
At root of routes directory.
### +layout.server.ts
```typescript
import SignalServer from "$lib/signal-server.js";
import type { SignalReceiveArgs } from "$lib/types.js";

export function load() {
	const ss = SignalServer.instance;
	if (!ss.hasReceiving()) {
		ss.setReceiving((args: SignalReceiveArgs) => {
			// put your function.
		})
	}
}
```

### +page.server.ts
```typescript
import SignalClient from "$lib/signal-client.js";
const sc = new SignalClient('ws://localhost:8080');
sc.on('open', (e) => console.log('opened!'));
sc.on('message', (data) => console.log(data));
```

⚠️ **SignalClient** is used WebSocket API on browser. Therefore, you can use only client mode. If you don't use SSR, disable it like this.
### +page.ts
```typescript
export let ssr = false;
```


