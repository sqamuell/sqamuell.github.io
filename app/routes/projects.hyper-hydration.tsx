import { Link } from "@remix-run/react";
export default function HyperHydration() {
	return (
		<div>
			<h1>
				Water Sports: <i>Hyper Hydration</i> (2023)
			</h1>
			<br />
			<p>
				<i>Water Sports: Hyper Hydration</i> is a foray into
				machine learning involving optimization algorithms. It places a tubular geometry, representing a
				water bottle at the center of the inquiry. Firstly, single objective
				optimization for the 3D profile that empties itself the fastest and then
				multi-objective optimization by balancing emptying speed and surface
				area. This project was developed as part of the Computational Explorations
				seminar at ITECH master's program in collaboration with Chris Kang,
				Markus Renner, and Cornelius Carl. The code and studies for this project can be found on <Link className="underline hover:text-yellow-500" to="https://github.com/sqamuell/hyper-hydration" rel="noopener noreferrer" target="_blank">GitHub</Link>.
			</p>
			<br />
			<img alt="" id="1" src={"/mats/water_sports/hh_cover.jpg"} className="lg:w-2/4" />
			<br />
			<p>
				The project's initial phase involved implementing various algorithms
				encompassing both single and multi-objective optimization techniques to
				efficiently optimize the shape of a water bottle. The project aimed to
				develop a water bottle model with fixed top and bottom sizes while
				allowing for a variable profile along the entire circumference. The
				primary objective was identifying optimal parameters for efficient water
				release, minimizing the time required for water to exit.
			</p>
			<br />
			<img alt="" id="3" src={"/mats/water_sports/hh_aim.png"} />
			<br />
			<p>
				The single-objective optimization focused on maximizing water expulsion
				speed from the bottle. The multi-objective optimization strategy
				introduced an additional factor - the size of the exit cap. The aim was
				to strike a balance between water release speed and minimizing the cap
				size, a challenge due to the conflicting nature of these two objectives.
			</p>
			<br />
			<p>
				The workflow utilized a Python library to generate NURBS surfaces
				exported as STL files. These were processed by a Blender script to
				combine static bodies representing the cap and water storage. An
				alternative Python library was later used to address seam issues. Post
				mesh generation, FluidX3d, a modified CFD simulation, used STL files as
				input. Adjustments were made to the simulation's source code using C++
				for dynamic data exchange. A Python script managed the process,
				leveraging algorithms to trigger simulation runs.
			</p>
			<br />
			<img alt="" id="4" src={"/mats/water_sports/hh_sim_setup.png"} />
			<br />
			<p>
				The bottle's design utilized 5 circles with 6 control points each,
				totaling 30 parameters. Control points allowed flexible shape creation
				along a line between the central point and a radius of 1. Static bodies
				were consistently incorporated at both ends of the bottle, serving
				distinct purposes. The first housed water storage, while the final acted
				as the cap for controlled water release.
			</p>
			<br />
			<center>
				<table>
					<tbody>
						<tr>
							<td>
								<img alt="" id="5" src={"/mats/water_sports/hh_sim1.gif"} />
							</td>
							<td>
								<img alt="" id="6" src={"/mats/water_sports/hh_sim2.gif"} />
							</td>
						</tr>
						<tr>
							<td>
								<img alt="" id="7" src={"/mats/water_sports/hh_sim3.gif"} />
							</td>
							<td>
								<img alt="" id="8" src={"/mats/water_sports/hh_sim4.gif"} />
							</td>
						</tr>
					</tbody>
				</table>
			</center>
			<br />
			<p>
				Initial observations from single-objective optimization were
				inconclusive regarding curvature patterns. Throughout experimentation,
				the rbfopt algorithm outperformed others in speed and robustness,
				demonstrating advantages in optimization efficiency. Optimized
				single-objective designs aimed to enhance drainage efficiency through
				vortex creation, achieving an 11% improvement compared to a simple
				cylinder. Further analysis was needed to understand these improvements.
			</p>
			<br />
			<p>
				<b>Single-Objective Convergence & Robustness</b>
			</p>
			<img alt="" id="9" src={"/mats/water_sports/hh_single.png"} />
			<br />
			<p>
				In the context of multi-objective optimization, it was observed that
				both NSGA2 and NSGA3 yielded similar outputs. However, NSGA2
				outperformed other algorithms in terms of convergence and objective
				achievement. Unfortunately, the extensive simulation time of
				approximately 12 hours per run posed a challenge in evaluating algorithm
				robustness.
			</p>
			<br />
			<p>
				<b>Multi-Objective Convergence & Robustness</b>
			</p>
			<img alt="" id="10" src={"/mats/water_sports/hh_multi.png"} />
			<br />
			<p>
				In contrast to single-objective optimization results, the outcomes of
				multi-objective optimization displayed distinct differences in optimized
				objectives and overall bottle shape. Unlike single-objective
				optimization, which focused on specific improvements, multi-objective
				optimization considered multiple objectives simultaneously.
			</p>
			<br />
			<p>
				<b>Clustering</b>
			</p>
			<img alt="" id="11" src={"/mats/water_sports/hh_clustering.png"} />
			<br />
			<p>
				The optimization process explores a broader range of design
				possibilities and objectives, leading to a greater diversity in the
				optimized bottle shapes and objectives achieved. The multi-objective
				optimization aims to strike a balance between conflicting objectives,
				such as maximizing drainage efficiency while minimizing simulation steps
				or achieving an optimal shape while considering stability or other
				factors.
			</p>
			<br />
			<p>
				<b>Results (in simulation steps)</b>
			</p>
			<table className="hidden md:block" >
				<tbody>
					<tr className="*:w-1/4">
						<td>
							<img alt="" id="12" src={"/mats/water_sports/hh_normal.gif"} />
						</td>
						<td>
							<img alt="" id="13" src={"/mats/water_sports/hh_rbf_opt.gif"} />
						</td>
						<td>
							<img alt="" id="14" src={"/mats/water_sports/hh_cmaes.gif"} />
						</td>
						<td>
							<img alt="" id="15" src={"/mats/water_sports/hh_random.gif"} />
						</td>
					</tr>
					<tr>
						<td>None: 17,396</td>
						<td>RBFOpt: 15,849</td>
						<td>CMAE-S: 15,863</td>
						<td>Random: 16,004</td>
					</tr>
				</tbody>
			</table>
			<table className="block md:hidden" >
				<tbody>
					<tr className="*:w-1/2">
						<td>
							<img alt="" id="12" src={"/mats/water_sports/hh_normal.gif"} />
						</td>
						<td>
							<img alt="" id="13" src={"/mats/water_sports/hh_rbf_opt.gif"} />
						</td>
					</tr>
					<tr>
						<td>None: 17,396</td>
						<td>RBFOpt: 15,849</td>
					</tr>
					<tr className="*:w-1/2">
						<td>
							<img alt="" id="14" src={"/mats/water_sports/hh_cmaes.gif"} />
						</td>
						<td>
							<img alt="" id="15" src={"/mats/water_sports/hh_random.gif"} />
						</td>
					</tr>
					<tr>
						<td>CMAE-S: 15,863</td>
						<td>Random: 16,004</td>
					</tr>
				</tbody>
			</table>
			<br />
			<p>
				The diverse objectives and inherent trade-offs in multi-objective
				optimization generated a broader spectrum of optimized bottle shapes and
				objectives. This diversity allowed for a comprehensive exploration of
				the design space, enabling decision-makers to select solutions aligned
				with their specific needs and priorities
			</p>
		</div>
	);
}
