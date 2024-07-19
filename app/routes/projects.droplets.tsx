import { Link } from "@remix-run/react";
export default function HyperHydration() {
	return (
		<div>
			<h1>
				Droplets (2024)
			</h1>
			<br />
			<p>
				This series of p5.js scripts is a study of the natural system of droplets on a smooth surface (e.g. marble). The motion of this system is emergent from the behaviors of each of individual droplet and the continual addition of agents to the environment. Check out the <Link className="underline hover:text-yellow-500" to="https://editor.p5js.org/sqamuel/sketches/O5TDu6eHo" rel="noopener noreferrer" target="_blank">script</Link> (press &#9658;) if you would like to see the procedural variety output by the algorithm.
			</p>
			<br />
			<img className="m-auto md:w-7/12" src={"/mats/droplets/figure-ground.gif"} />
			<br />
			<p>
				A droplet is defined by its mass, location, and three behaviors. (1) A gravity force behavior induced when it has a certain mass. (2) A spawn additional droplet behavior induced by movement. And (3) a merging behavior induced when coming in contact with another droplet. While each inidivual droplet has no systematic outcome, the summation of them in an environment results in the emergent system shown in the surrounding gifs.
			</p>
			<br />
			<img className="m-auto md:w-7/12" src={"/mats/droplets/marble.gif"} />
		</div>
	);
}
