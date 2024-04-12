import Container from "~/container";

export default function Placeholder() {
	return (<Container>
		<h1>15-112: placeHolder (2020)</h1>
		<br />
		<p>
			A wide variety of 3D scanning technology exists today that use a series
			of images to construct a form based on the content of the images. This
			project situates itself on an edge of those, allowing the user to
			generate a 3D model from 360-degree images through online databases.
			Much other software including Autodesk Recap, Multi-view environment,
			and Meshroom all serve to generate geometry from image distances. In
			fact, human’s perception of space uses the same underlying logic as all
			these programs. The slight differences in images sent to our brain from
			our eyes tells us what is near and what is far.
		</p>
		<br />
		<video width="100%" height="auto" controls>
			<source src="/mats/place_holder/tutorial.mp4" type="video/mp4" />
			Your browser does not support the video tag.
		</video>
		<br />
		<p>
			The project, titled placeMaker, was an exploration of photogrammetric
			techniques written from-scratch with Python. It is an inquiry into quick
			generation of site geometry (buildings, roads, etc.) for use in site
			mapping and architectural design. First, the user selects two 360-degree
			panoramic images either from google maps or elsewhere. Then, placeMaker
			interprets the selected images and detects edges. Finally, the program
			cross-references the images to place them in 3D space and allows the
			user to fly through and examine the projected geometry.
		</p>
		<br />
		<img alt="" id="1" src={"/mats/place_holder/workflow.jpg"} /></Container>
	);
}
