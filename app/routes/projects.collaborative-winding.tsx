import Container from "~/container";

export default function CollaborativeWinding() {
	return (<Container>
		<h1>Collaborative Winding: Robotic Collaboration (2020)</h1>
		<br />
		<p>
			Collabrative Winding is a robotic research/ fabrication project that
			proposes a system that utilizes robotic weaving based on an object. This
			project was a collaboration with Nick Coppula.
		</p>
		<br />
		<img alt="" id="1" src={"/mats/collaborative_weaving/robots.jpg"} />
		<br />
		<p>
			This process required collaboration between two robots and was written
			in RAPID and HAL for grasshopper. The ABB 4400 robot moves the material
			to a position inside the frame and the ABB 6640 robot loops the material
			onto a fastening system on the exterior of the frame. This robotic
			collaboration enables the internal complexity of weaving while
			maintaining a regular external frame geometry, which is then expressed
			by repeatedly bringing numerous strands back to a set of fixed
			positions.
		</p>
		<br />
		<img alt="" id="2" src={"/mats/collaborative_weaving/hook_Proc.gif"} />
		<br />
		<p>
			The project's form has a complex, spatial interior rather than a
			regulated exterior. This makes it distinct from many precedent projects
			which heavily rely on robotically woven structures aptly described as
			“shells”. The collaborators proposed a system of weaving that is
			adaptable and builds upon the existing formal language surrounding
			robotically woven structures. Inverted weaving was the development of an
			inside-out approach to weaving where the basic frame becomes external
			and the complexity becomes internal.
		</p>
		<br />
		<img alt="" id="3" src={"/mats/collaborative_weaving/tool.jpg"} />
		<br />
		<img alt="" id="4" src={"/mats/collaborative_weaving/logic.jpg"} />
		<br />
		<img
			alt=""
			id="5"
			src={"/mats/collaborative_weaving/responsibilities.jpg"}
		/>
		<br />
		<img alt="" id="6" src={"/mats/collaborative_weaving/rapidtogh.jpg"} />
		<br />
		<video width="100%" height="auto" controls>
			<source
				src={"/mats/collaborative_weaving/weaving.mp4"}
				type="video/mp4"
			/>
			Your browser does not support the video tag.
		</video>
		<br />
		<img alt="" id="7" src={"/mats/collaborative_weaving/axon.jpg"} /></Container>
	);
}
