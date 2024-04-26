import { Link } from "@remix-run/react";
export default function HyperHydration() {
	return (
		<div>
			<h1>
				Droplets (2024)
			</h1>
			<br />
			<p>
				Donec sed tincidunt dolor. Praesent laoreet mattis vehicula. Quisque suscipit diam in nisi laoreet fermentum. Curabitur sollicitudin eleifend lorem vel consectetur. Quisque porta nec tellus et elementum. Cras eget turpis eget leo ornare congue et et nibh. Sed non eros a odio facilisis facilisis. Curabitur sollicitudin at ipsum et pretium. Curabitur vestibulum mi justo, eu iaculis arcu cursus non. Phasellus pellentesque euismod ligula nec suscipit. Aliquam scelerisque nec lectus sed placerat.
			</p>
			<br />
			<img src={"/mats/droplets/figure-ground.gif"} />
			<br />
			<p>
				Aenean at suscipit massa. In at diam feugiat, feugiat elit eu, maximus enim. Nulla consequat eleifend iaculis. Mauris viverra tempus augue. Donec vitae suscipit orci. Phasellus vehicula ipsum vel nisl egestas ullamcorper. Maecenas ac leo eu eros elementum porta.
			</p>
			<br />
			<img src={"/mats/droplets/marble.gif"} />
		</div>
	);
}
