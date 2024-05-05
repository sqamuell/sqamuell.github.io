export default function CyberneticField() {
	return (
		<div>
			<h1>Cybernetic Field: Responsive Algorithm (2021)</h1>
			<br />
			<p>
				This project considers W. Ross Ashby's model for cybernetic architecture
				and seeks to create a homeostatic machine through Processing and the use
				of projection mapping. Cybernetic Field was completed incollaboration
				with Joshua Cao. Cybernetic field begins with a scene of
				randomly-generated points that are influenced by an underlying vector
				field. They gradually find a dynamic stable loop or orbit within the
				field, collectively reaching homeostatsis.
			</p>
			<br />
			<video width="100%" height="auto" controls>
				<source
					src={"/mats/cybernetic_field/mouse_interaction_x2.mp4"}
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>
			<br />
			<p>
				Flattening the depth
				image of a three-dimensional space to the projector plane with a Kinect,
				the algorithm captures objects and actors in the scene. From these
				environment elements, contour information is extracted and used to
				recalculate vector directions and amplitudes within the field. The
				points are then affected by the change in vectors, reaching many states
				of disorder in the process of restabilizing themselves.
			</p>
			<br />
			<img alt="" className="w-1/4" src={"/mats/cybernetic_field/vectorfield.png"} />
			<br />
			<p>
				Balance will
				always restore itself and the system will return to stability, always in
				a new fashion. Throughout the entire process, human actors are motivated
				to interact with the system, affect the pattern in the vector field, and
				have agency to be creative with a series of experimental different
				movements.
			</p>
			<br />
			<img alt="" src={"/mats/cybernetic_field/process_1.png"} />
			<img alt="" src={"/mats/cybernetic_field/process_2.png"} />
		</div>
	);
}
