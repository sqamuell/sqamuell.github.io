export default function BubbleGAN() {
	return (
		<div>
			<h1>BubblesToFloors (2021)</h1>
			<br />
			<p>
				The Bubble2Floor is an implementation of the Pix2Pix GAN-model, and is a
				tool for spatial prototyping of built spaces. This project was completed
				in collaboration with Twisha Raja. It works in three main steps-
			</p>
			<br />
			<img alt="" id="1" src={"/mats/bubbles_floors/workflow.jpg"} />
			<br />
			<p>
				The objective of the bubble2floor Generator the design of housing units.
				The workflow is includes the use of a few different softwares that are
				popularly employed in design circles.
			</p>
			<br />
			<img alt="" id="3" src={"/mats/bubbles_floors/animation.gif"} />
			<br />
			<p>
				Bubble-diagrams generated from the Rhino-Grasshopper workspace are
				pushed through a pytorch model trained on bubble-diagram and floor plan
				pairs.This model is utilized to generate a series of floor plan
				representations of the bubble-diagram, which then creates approximated
				room geometries using openCV on these images.
			</p>
			<br />
			<img alt="" id="2" src={"/mats/bubbles_floors/data.jpg"} />
			<br />
			<p>
				The generated floor plan image is then passed through openCV to define
				the locations of walls. Finally, the walls are extruded with Rhino &
				Grasshopper, then tweaked to the designers’ liking.
			</p>
			<br />
			<img alt="" id="2" src={"/mats/bubbles_floors/floor_plans.png"} />
		</div>
	);
}
