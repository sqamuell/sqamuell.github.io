import { Link } from "@remix-run/react";
export default function HyperHydration() {
	return (
		<div>
			<h1>
				Cloud Sketch (2022)
			</h1>
			<br />
			<p>
				Aenean at suscipit massa. In at diam feugiat, feugiat elit eu, maximus enim. Nulla consequat eleifend iaculis. Mauris viverra tempus augue. Donec vitae suscipit orci. Phasellus vehicula ipsum vel nisl egestas ullamcorper. Maecenas ac leo eu eros elementum porta.
			</p>
			<br />
			<img className="m-auto md:w-7/12" src={"/mats/cloud-sketch/clouds.gif"} />
		</div>
	);
}
