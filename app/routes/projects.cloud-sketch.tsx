import { Link } from "@remix-run/react";
export default function HyperHydration() {
	return (
		<div>
			<h1>
				Cloud Sketch (2022)
			</h1>
			<br />
			<p>
				This p5.js sketch was a personal attempt to algorthimically capture the varied movement of clouds. It uses non-linear mapping of simplex noise to create both the arrangement and the drift of the clouds. Check out the <Link className="underline hover:text-yellow-500" to="https://editor.p5js.org/sqamuel/sketches/-uHONRpZg" rel="noopener noreferrer" target="_blank">script</Link> (press &#9658;) if you would like to see the procedural variety output by the algorithm.
			</p>
			<br />
			<img className="m-auto md:w-7/12" src={"/mats/cloud-sketch/clouds.gif"} />
		</div>
	);
}
