import { Link } from "@remix-run/react";

export default function HorseChariot() {
	return (
		<div>
			<h1>Horse & Chariot (2023)</h1>
			<br />
			<p>
				Through audio transmission, touch input, drawing ability, audio
				reception and motor power, this Arduino project takes a satirical stance
				on the creation of useful devices in order to explore capabilities of
				physical computing. It consists of two robots, the Horse and the
				Chariot, who must work together in order to draw a user-defined path.
				Conceptually, this project takes a single robot with a path-planning
				drawing function and, for no useful reason, decides to separate it into
				two different robots that are connected via a string and sound. This
				project was developed as part of the Computational Design and Digital
				Fabrication seminar at ITECH master´s program in collaboration with
				Cornelius Carl and Paula Castel. All the code for this project can be found
				on <Link className="underline hover:text-yellow-500" to="https://github.com/sqamuell/horse-carriage" rel="noopener noreferrer" target="_blank">GitHub</Link>.
			</p>
			<br />
			<table>
				<tbody>
					<tr>
						<td>
							<img alt="" id="1" src={"/mats/horse_chariot/render_above.png"} />
						</td>
						<td>
							<img
								alt=""
								id="2"
								src={"/mats/horse_chariot/persp_view_real_3.png"}
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<br />
			<p>
				The Chariot is the brains of the operation, it receives a drawing from
				the user via a touchpad. It rationalizes a path into a set of movement
				commands then encodes it into a series of floating point numbers. One by
				one, the Chariot transmits the commands as audio (one approximately
				every 3 seconds) to the Horse. The Horse is the wheels of the operation.
				Using a microphone, it receives the floating point number over audio
				from the Chariot and decodes it into a movement command, which it
				promptly executes. The Horse pulls the Chariot along with it via a
				string and together they traverse the path. All the while, the Chariot
				drags chalk to mark out the users’ drawing.
			</p>
			<br />
			<img alt="" id="3" src={"/mats/horse_chariot/organization.png"} />
			<br />
			<p>
				With the objective of drawing a user input picture, the robots' process
				is organized into a series of steps that directly relate to hardware
				organization.
			</p>
			<br />
			<ol>
				<li>1. User defines path</li>
				<li>2. Path converted to audio movement commands</li>
				<li>3. Transmit (1) audio</li>
				<li>4. Decode audio movement command</li>
				<li>5. Execute movement & draw!</li>
			</ol>
			<br />
			<p>
				We will now examine these steps in greater detail in order to build a
				rounded picture of the system complexity.
			</p>
			<br />
			<h2>1. User defines path</h2>
			<br />
			<table>
				<tbody>
					<tr>
						<td>
							<img alt="" id="4" src={"/mats/horse_chariot/drawing.png"} />
						</td>
						<td>
							<img alt="" id="5" src={"/mats/horse_chariot/drawing_live.gif"} />
						</td>
					</tr>
				</tbody>
			</table >
			<br />
			<p>
				The process of drawing is initated by drawing a custom path on the
				Chariot's touchscreen. It records the drawing from the moment of contact
				until you release your finger. Internally, the path is divided into
				segments.
			</p>
			<br />
			<h2>2. Path converted to audio movement commands</h2>
			<br />
			<img alt="" id="6" src={"/mats/horse_chariot/encoding.png"} />
			<br />
			<p>
				Next, the path segemtns are converted into vectors, orient via the
				previous direction. These values are encoded as numbers between 0.000
				and 0.999, where 0.000 is left and 0.999 is right. Each value is
				converted into a series of five frequencies that are stored in a list.
			</p>
			<br />
			<h2>3. Transmit (1) audio</h2>
			<br />
			<img alt="" id="7" src={"/mats/horse_chariot/transmission.png"} />
			<br />
			<p>
				Once every two seconds, the Chariot transmits the series of five
				frequencies via audio to the Horse.
			</p>
			<br />
			<h2>4. Decode audio movement command</h2>
			<br />
			<img alt="" id="8" src={"/mats/horse_chariot/decoding.png"} />
			<br />
			<p>
				Upon recieveing audio, the Horse decodes the direction, virtually
				reverse engineering the encoding steps to determine the direction
				vector. The Horse then changes the speed of each wheel in relation to
				the movement direction.
			</p>
			<br />
			<h2>5. Execute movement & draw!</h2>
			<br />
			<img alt="" id="9" src={"/mats/horse_chariot/horse_chariot.gif"} />
			<br />
			<p>
				Once all steps are combined together, the Horse and the Chariot begin to
				draw! An observer can watch and listen as the robot moves around and
				then evaluate if the movement path is similar to that of what they had
				drawn on the touch screen.{" "}
				<i>*Above is a previous iteration of the robot body design.</i>
			</p>
			<br />
			<h2>Assembly:</h2>
			<div>
				<ul>
					<center>
						<b>Electronics</b>
					</center>
					<li>(1) Arduino Nano 33 BLE</li>
					<li>(1) Arduino Nano 33 BLE Sense</li>
					<li>(1) Breadboard</li>
					<li>(1-2) Piezo Speaker</li>
					<li>(1) 1k Ohm Resistor</li>
					<li>(1) 3.5” IPS Capacitive Touchscreen</li>
					<li>(2) DC motor</li>
					<li>(2) Matching wheel</li>
					<li>(1) Arduino Shield L298N</li>
					<li>(2) Battery Pack (9V + 12V)</li>
					<li>(1) Handful of Wires</li>
				</ul>
				<ul>
					<center>
						<b>Materials</b>
					</center>
					<li>(1) Stick of Chalk</li>
					<li>(700g) PLA</li>
					<li>(200g) Rectangular Weight</li>
					<li>(5) Castor Wheels</li>
				</ul>
				<ul>
					<center>
						<b>Tools</b>
					</center>
					<li>3D Printer</li>
					<li>Soldering Iron</li>
					<li>Wire Stripper</li>
					<li>Screwdriver</li>
					<li>Drill</li>
					<li>Caliper or ruler</li>
				</ul>
			</div>
			<br />
			<p>
				Above is the list of items needed to build this project. We found that
				the motor driver is not optimal for the task, but [
				<i>for the most part</i>] it worked. The two robots also require a
				3D-printed body, that is fully customizable.
			</p>
			<br />
			<table>
				<tbody>
					<tr>
						<td>
							<img alt="" id="10" src={"/mats/horse_chariot/exploded_back.gif"} />
						</td>
						<td>
							<img alt="" id="11" src={"/mats/horse_chariot/fritzing_back.png"} />
						</td>
					</tr>
				</tbody>
			</table >
			<br />
			<p>
				Assembly of the Chariot requires most of the hardware and software. It
				requires a 9V battery to operate.
			</p>
			<br />
			<table>
				<tbody>
					<tr>
						<td>
							<img
								alt=""
								id="12"
								src={"/mats/horse_chariot/exploded_front.gif"}
							/>
						</td>
						<td>
							<img
								alt=""
								id="13"
								src={"/mats/horse_chariot/fritzing_front.png"}
							/>
						</td>
					</tr>
				</tbody>
			</table >
			<br />
			<p>
				Assembly of the Horse is more delicate, as the motors must be fine tuned
				in relation to the incoming audio. It requires a 12V battery to operate.
			</p>
			<br />
			<img alt="" id="14" src={"/mats/horse_chariot/top_view_real.png"} />
			<br />
			<p>
				Errors in wiring during the project resulted in the destruction of (2)
				Arduino Nano BLE Senses. This was quite frustrating and mildly costly.
				If one is to attempt to recreate this project based on what is shown
				here, a newer model of a motor driver is recommended.
			</p>
		</div>
	);
}
