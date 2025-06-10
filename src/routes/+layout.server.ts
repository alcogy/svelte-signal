import SignalServer from "$lib/signal-server.js";
import type { SignalReceiveArgs } from "$lib/types.js";

export function load() {
	const ss = SignalServer.instance;
	if (!ss.hasReceiving()) {
		ss.setReceiving((args: SignalReceiveArgs) => {
			console.log('received: %s', args.data);
			args.ws.send('thank you for ' + args.data);
		})
	}
}