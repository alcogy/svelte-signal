import SignalServer from "$lib/signal-server.js";
import type { SignalReceiveArgs } from "$lib/types.js";

export function load() {
	const ss = SignalServer.instance;
	if (!ss.hasReceiving()) {
		//  your function.
		ss.setReceiving((args: SignalReceiveArgs) => {
			const targets = ss.getTargets(args.id);
			for (const con of targets) {
				con.client.send('sent for' + args.data);
			}
		})
	}
}