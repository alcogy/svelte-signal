import { WebSocketServer } from "ws";
import type { SignalReceiveArgs } from "./types.js";

export default class SignalServer {
	static _instance: SignalServer;
	private ws: WebSocketServer;
	private receiving?: (v: SignalReceiveArgs) => void = undefined;

	private constructor() {
		this.ws = new WebSocketServer({
			port: 8080,
			perMessageDeflate: {
				zlibDeflateOptions: {
					// See zlib defaults.
					chunkSize: 1024,
					memLevel: 7,
					level: 3
				},
				zlibInflateOptions: {
					chunkSize: 10 * 1024
				},
				// Other options settable:
				clientNoContextTakeover: true, // Defaults to negotiated value.
				serverNoContextTakeover: true, // Defaults to negotiated value.
				serverMaxWindowBits: 10, // Defaults to negotiated value.
				// Below options specified as default values.
				concurrencyLimit: 10, // Limits zlib concurrency for perf.
				threshold: 1024 // Size (in bytes) below which messages
				// should not be compressed if context takeover is disabled.
			}
		});
		console.log('open Web Socket server');
		this.ws.on('connection', function connection(con) {
			con.on('error', console.error);

			con.on('message', function message(data) {
				if (SignalServer.instance.receiving !== undefined) {
					SignalServer.instance.receiving({ ws: con, data: data });
				}
			});			
		});
	}

	public static get instance(): SignalServer {
		if (!SignalServer._instance) {
			SignalServer._instance = new SignalServer();
		}
		return SignalServer._instance;
	}

	public hasReceiving(): Boolean {
		return this.receiving !== undefined;
	}

	public setReceiving(fn: (v: SignalReceiveArgs) => void) {
		this.receiving = fn;
	}
}

