import type { SignalType } from "./types.js";

export default class SignalClient {
	private ws: WebSocket;

	constructor(url: string) {
		this.ws = new WebSocket(url, 'protocolOne');
	}
	
	public on(type: SignalType, fn: (e: any) => any) {
		switch(type) {
			case 'open':
				this.ws.onopen = fn;
				break;
			case 'message':
				this.ws.onmessage = fn;
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
		this.ws.send(text);
	}
	
}
