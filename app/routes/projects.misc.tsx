import Container from "~/container";

export default function Misc() {
	return (<Container>
		<h1>Misc Representation (2017-)</h1>
		<br />
		<p>
			This page is dedicated to projects and representations that was not
			interesting enough or did not have enough content to merit an entire
			page. For this reason, there is quite a bit of random (possibly weird)
			stuff with no relation to each other. Please enjoy.
		</p>
		<br />
		{/* <center><button id="snakeButton"><a href="/projects/snake.html">Play Snake</a></button></center> */}
		<img alt="" id="1" src={"/mats/misc/drawing2.jpg"} />
		<br />
		<table>
			<tbody>
				<tr>
					<td>
						<img alt="" id="2" src={"/mats/misc/drawing0.jpg"} />
					</td>
					<td>
						<img alt="" id="3" src={"/mats/misc/drawing1.jpg"} />
					</td>
				</tr>
				<tr>
					<td>
						<img alt="" id="4" src={"/mats/misc/drawing3.jpg"} />
					</td>
					<td>
						<img alt="" id="5" src={"/mats/misc/drawing4.jpg"} />
					</td>
				</tr>
			</tbody>
		</table>
		<br />
		<img alt="" id="6" src={"/mats/misc/sewing.gif"} />
		<br />
		<img alt="" id="7" src={"/mats/misc/community_elevation.jpg"} />
		<img alt="" id="8" src={"/mats/misc/community_render.jpg"} />
		<br />
		<img alt="" id="9" src={"/mats/misc/grasshopper_sketch.gif"} />
		<br />
		<img alt="" id="10" src={"/mats/misc/firewatch_exp.jpg"} />
		<br />
		<img alt="" id="11" src={"/mats/misc/firewatch_front.jpg"} />
		<br />
		<img alt="" id="12" src={"/mats/misc/weights.jpg"} />
		<br />
		<img alt="" id="13" src={"/mats/misc/eggwerd.gif"} /></Container>
	);
}
