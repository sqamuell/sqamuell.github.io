import { Link } from "@remix-run/react";

export default function Honeycomb() {
	return (
		<div>
			<h1>Honeycomb: a Grasshopper Package (2023)</h1>
			<div className="inline-flex pt-5">
				<img
					alt="Honeycomb Logo"
					className="h-32 m-4 max-h-full"
					id="1"
					src={"/mats/honeycomb/Honeycomb.png"}
				/>
				<p>
					Honeycomb, a pattern generating grasshopper plugin, enables the
					creation of 2D and 3D patterns through symmetric transformations, each
					derived from the 17 wallpaper groups. Users can choose any of the
					wallpaper groups to create tilings based on Voronoi Domains and custom
					topological interlocking blocks. This project was completed in
					collaboration with Tom Görtzen and Reymond Akpanya from the RWTH
					Aachen University and Sebastian Wiesenhütter from the Technische
					Universität Dresden.
				</p>
			</div>
			<br />
			<p>
				Any feedback would be greatly appreciated and please share anything
				interesting that you create! Download the plugin from
				the <Link className="underline hover:text-yellow-500" to="https://www.food4rhino.com/en/app/honeycomb" rel="noopener noreferrer" target="_blank">Food4Rhino Forum</Link> and
				try it out. The code for this project is on <Link className="underline hover:text-yellow-500" to="https://github.com/TomGoertzen/Honeycomb/" rel="noopener noreferrer" target="_blank">GitHub</Link>.
			</p>
			<br />
			<table>
				<tbody>
					<tr>
						<td>
							<img alt="Pattern 1" id="2" src={"/mats/honeycomb/lines01.png"} />
						</td>
						<td>
							<img alt="Pattern 2" id="3" src={"/mats/honeycomb/lines02.png"} />
						</td>
						<td>
							<img alt="Pattern 3" id="4" src={"/mats/honeycomb/lines03.png"} />
						</td>
					</tr>
					<tr>
						<td>
							<img alt="Pattern 4" id="5" src={"/mats/honeycomb/lines04.png"} />
						</td>
						<td>
							<img alt="Pattern 5" id="6" src={"/mats/honeycomb/lines05.png"} />
						</td>
						<td>
							<img alt="Pattern 6" id="7" src={"/mats/honeycomb/lines06.png"} />
						</td>
					</tr>
				</tbody>
			</table>
			<table className="hidden">
				<tbody>
					<tr>
						<td>
							<img alt="placeholder" id="2" src={"/mats/honeycomb/lines01.png"} />
						</td>
						<td>
							<img alt="placeholder" id="5" src={"/mats/honeycomb/lines04.png"} />
						</td>
					</tr>
					<tr>
						<td>
							<img alt="placeholder" id="3" src={"/mats/honeycomb/lines02.png"} />
						</td>
						<td>
							<img alt="placeholder" id="6" src={"/mats/honeycomb/lines05.png"} />
						</td>
					</tr>
					<tr>
						<td>
							<img alt="placeholder" id="4" src={"/mats/honeycomb/lines03.png"} />
						</td>
						<td>
							<img alt="placeholder" id="7" src={"/mats/honeycomb/lines05.png"} />
						</td>
					</tr>
				</tbody>
			</table>
			<br />
			<p>
				The plugin consists of ten components, which work together to generate,
				manipulate and array the smallest unit of a repeating symmetrical
				pattern, named fundamental domains. Simply by changing a few parameters
				in the below script, all six tilings shown above can be created.
			</p>
			<br />
			<img
				alt="Associated Pattern Script"
				id="8"
				src={"/mats/honeycomb/line_script.png"}
			/>
			<br />
			<p>
				Each symmetry group has an infinite amount of fundamental domains, so
				the number of patterns that can be quickly created is quite large.
				Historically, Dutch Graphic Artist M. C. Escher employed the use of the{" "}
				<i>pg</i>
				wallpaper group. Honeycomb enables users to make generate similar
				imagery.
			</p>
			<br />
			<video controls>
				<source
					src={"/mats/honeycomb/interlocking_vid_desktop.mp4"}
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>
			<video className="hidden" controls>
				<source
					src={"/mats/honeycomb/interlocking_vid_mobile.mp4"}
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>
			<br />
			<p>
				The below script is responsible for the creation of the abovce
				animation. It did require some post-processing in blender, but the
				entire generation of interlocking blocks and their movement was enabled
				by Honeycomb.
			</p>
			<br />
			<img alt="placeholder" id="9" src={"/mats/honeycomb/block_script.png"} />
			<br />
			<p>
				Users also have the option to draw their own geometry and repeat it via
				the logic of the wallpaper group. Whether it is an iterlocking geometry
				(created via one of the <i>Make Interlocking Block</i> components) or a
				geometry created within Rhino-space, the grasshopper tool quickly allows
				for a repeating transformation.
			</p>
			<br />
			<table>
				<tbody>
					<tr>
						<td>
							<img
								alt="Interlocking 3D Print Front"
								id="10"
								src={"/mats/honeycomb/print_front.png"}
							/>
						</td>
						<td>
							<img
								alt="Interlocking 3D Print Back"
								id="11"
								src={"/mats/honeycomb/print_back.png"}
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<br />
			<p>
				The software has potentials to move into the physical space and become
				3D. 3D printed geometry is quick to output with a few addtional rhino or
				grasshopper commands to make a printable solid. If you, the reader, uses
				Honeycomb and creates something interesting and beautiful, please share
				it!
			</p>
			<br />
			<table>
				<tbody>
					<tr>
						<td>
							<img
								alt="Voronoi"
								id="12"
								src={"/mats/honeycomb/voronoi_big.gif"}
							/>
						</td>
						<td>
							<img
								alt="Voronoi"
								id="12"
								src={"/mats/honeycomb/voronoi_big.gif"}
							/>
						</td>
						<td>
							<img
								alt="Voronoi"
								id="12"
								src={"/mats/honeycomb/voronoi_big.gif"}
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<br />
			<p>
				This project was funded by the Deutsche Forschungsgemeinschaft (DFG,
				German Research Foundation)-SFB/TRR 280. Projekt-ID: 417002380. Tom
				Goertzen was partially supported by the FY2022 JSPS Postdoctoral
				Fellowship for Research in Japan (Short-term), ID PE22747.
			</p>
			<br />
		</div>
	);
}
