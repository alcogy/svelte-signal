<script lang="ts">
	import SignalClient from "$lib/signal-client.js";

	let message = $state('');
	let text = $state('');
	const sc = new SignalClient('ws://localhost:8080');
	sc.on('open', (e) => console.log('hello ws'));
	sc.on('message', (e) => message = e.data as string);

	function onClickSned() {
		sc.sendText(text);
	}
</script>

<h1>Welcome to your library project</h1>
<input type="text" bind:value={text} /><button type="button" onclick={onClickSned}>Send</button>
<p>{message}</p>
