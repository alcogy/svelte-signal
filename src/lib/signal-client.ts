import type { SignalType } from "./types.js";
import { PREFIX_ID } from "./types.js";

export default class SignalClient {
	private ws: WebSocket;
	private id: string  = '';

	constructor(url: string) {
		this.ws = new WebSocket(url, 'protocolOne');
	}
	
	public on(type: SignalType, fn: (e: any) => any) {
		switch(type) {
			case 'open':
				this.ws.onopen = fn;
				break;
			case 'message':
				this.ws.onmessage = (e) => { 
					const data = e.data as string;
					// SET CLIENT ID.
					if (data.indexOf(PREFIX_ID) >= 0) {
						this.id = data.replace(PREFIX_ID, '');
					} else {
						fn(e.data);
					}
				};
				break;
			case 'close':
				this.ws.onclose = fn;
				break;
			case 'error':
				this.ws.onerror = fn;
				break;
		}
	}

	public sendText(text: string) {
		this.ws.send(JSON.stringify({ id: this.id, msg: text}));
	}
	
}
