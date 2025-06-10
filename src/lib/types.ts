import { WebSocket } from "ws";

export type SignalReceiveArgs = {
	ws: WebSocket;
	data: WebSocket.RawData;
}

export type SignalType = 'open' | 'message' | 'close' | 'error';