import { WebSocket } from "ws";

export const PREFIX_ID = '@#id:';

export type SignalReceiveArgs = {
	ws: WebSocket;
	id: string;
	data: WebSocket.RawData;
}
export type SignalType = 'open' | 'message' | 'close' | 'error';

export type Connection = {
	id: string;
	client: WebSocket;
}