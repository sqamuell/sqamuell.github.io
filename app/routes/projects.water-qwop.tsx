import Container from "~/container";

export default function WaterQWOP() {
	return (<Container>
		<h1>
			Water Sports: <i>Water QWOP</i> (2023)
		</h1>
		<br />
		<p>
			<i>Water Sports: Water QWOP</i> is a foray into
			machine learning involving reinforcement learning. Conceptually,
			it is quite similar to the flash game <i>QWOP</i>. This project was developed as part of the Computational Explorations
			seminar at ITECH master´s program in collaboration with Chris Kang,
			Markus Renner, and Cornerlius Carl.
		</p>
		<br />
		<img alt="" id="2" src={"/mats/water_sports/qwop_agent_begin.gif"} className="md:w-2/4" />
		<br />
		<p>
			Drawing inspiration from the extensively studied game QWOP, the team
			aimed to develop their own version of the game. In this iteration, the
			primary objective was to optimize the distance water could be thrown,
			striving for maximum range.
		</p>
		<br />
		<img alt="" id="16" src={"/mats/water_sports/qwop_concept.png"} />
		<br />
		<p>
			To establish a reward system, water droplets were programmed to propel
			themselves before freezing upon floor contact. Measurements were taken
			from the bucket's position to the landing spot, determining a reward
			based on average distance per throw. This reward calculation evaluated
			the agent's performance in maximizing throwing distance.
		</p>
		<img alt="" id="17" src={"/mats/water_sports/qwop_measurement.gif"} />
		<br />
		<p>
			The Unity-based agent featured elongated arms with hinge joints,
			connected at the base, and equipped with a bucket. Water spheres within
			the bucket simulated throwing.
		</p>
		<br />
		<table>
			<tbody>
				<tr>
					<td>
						<img alt="" id="18" src={"/mats/water_sports/qwop_agent.png"} />
					</td>
					<td>
						<img
							alt=""
							id="19"
							src={"/mats/water_sports/qwop_agent_begin.gif"}
						/>
					</td>
				</tr>
			</tbody>
		</table>
		<br />
		<p>
			The agent's arms are composed of four distinct sections, each equipped
			with five hinge joints. Among these joints, four are driven by motors
			that respond to specific key presses, enabling controlled articulation
			of the arms. The bucket, on the other hand, accommodates ten individual
			spheres that represent the water. These spheres possess the ability to
			move freely and are propelled in accordance with the velocity and
			movement of the bucket, simulating the throwing action.
		</p>
		<img alt="" id="20" src={"/mats/water_sports/qwop_controls.png"} />
		<p>
			The actuation of the right shoulder is assigned to the key Q, the right
			elbow to the key W, the left elbow to the key O, the right elbow to the
			key P, and the forward and backward rotation of the bucket at the wrists
			is controlled by the keys A and S, respectively.
		</p>
		<br />
		<img alt="" id="21" src={"/mats/water_sports/qwop_agent_array.gif"} />
		<br />
		<p>
			With the environment now configured, a prefab was generated to
			streamline the setup process. This prefab served as a template for
			creating multiple agents that could undergo simultaneous training. By
			employing this approach, the training process could be efficiently
			conducted across numerous instances of the agent, allowing for parallel
			training and enhanced optimization.
		</p>
		<br />
		<p>
			<b>Run 1: Reward & Episode Length</b>
		</p>
		<img alt="" id="22" src={"/mats/water_sports/qwop_run1.png"} />
		<br />
		<p>
			In the initial run, rewards were exclusively based on the speed of the
			bucket, neglecting other factors. Agents were limited to observing the
			position, rotation, and velocity of the bucket. Their actions were
			determined by discrete key presses, with a total of six available
			controls. The corresponding configuration file (.yaml) can be found in
			the config folder of the Unity setup. Notably, the agent demonstrated
			visible improvement within this setup, indicating progress in achieving
			optimal performance.
		</p>
		<br />
		<img alt="" id="23" src={"/mats/water_sports/qwop_agent_shakey.gif"} />
		<br />
		<p>
			Upon conducting a more thorough analysis, it became apparent that due to
			a bug affecting the rewards attributed to the water being tossed and the
			subsequent average calculation, the agent's behavior became excessively
			reliant on the speed of the bucket. This unintended outcome manifested
			as the observed "shaky-shakey" behavior. Consequently, it was necessary
			to fine-tune both the observation inputs and reward system in order to
			correct this issue and achieve the desired behavior from the agent.
		</p>
		<br />
		<p>
			<b>Runs 2-4: Reward & Episode Length</b>
		</p>
		<img alt="" id="24" src={"/mats/water_sports/qwop_run2-4.png"} />
		<br />
		<p>
			Subsequent training runs (2-4) primarily focused on refining the code,
			identifying and rectifying bugs to enhance the agent's behavior.
			Unfortunately, these iterations did not yield significant progress in
			terms of training outcomes beyond bug fixing. The primary objective
			during this phase was to troubleshoot and resolve issues that were
			impeding the optimization of the agent's performance.
		</p>
		<br />
		<img alt="" id="25" src={"/mats/water_sports/qwop_rewards.png"} />
		<br />
		<p>
			After persistent efforts, the bug that hindered the agent from receiving
			rewards was successfully resolved. Additionally, the maximum length of
			steps before resetting the episode was extended to 10,000, granting the
			agent more opportunities for exploration and learning. Notably, a
			significant improvement was made by allowing the agent to access the
			position information of all geometric elements within the scene. This
			expanded observation capability provided the agent with a more
			comprehensive understanding of its environment, which would likely
			contribute to enhanced performance and more sophisticated
			decision-making.
		</p>
		<br />
		<img alt="" id="26" src={"/mats/water_sports/qwop_agent_begin.gif"} />
		<br />
		<p>
			Under the revised constraints and expanded capabilities, the agent
			underwent an extensive training process, encompassing approximately 18
			million steps. Throughout this training period, the agent demonstrated a
			gradual improvement in its ability to throw water over a distance. It is
			worth noting that while the agent's performance falls short of that of a
			skilled human, with an average of 2.5 meter throws, the observed trend
			reveals promising signs of continual progress and learning over time.
			This incremental improvement suggests that with further iterations and
			refinement, the agent's performance has the potential to approach or
			even surpass human proficiency in the task.
		</p>
		<br />
		<p>
			<b>Run 5: Reward & Episode Length</b>
		</p>
		<img alt="" id="27" src={"/mats/water_sports/qwop_run5.png"} />
		<br />
		<p>
			The observed behavior of the agent, as described above, indicates a
			tendency to swing the bucket back and forth before dumping the geometry
			out. It is hypothesized that additional training runs and further
			fine-tuning of parameters are necessary to achieve the desired outcome
			and refine the model's behavior. This iterative process of
			experimentation, adjustment, and evaluation is often required to
			optimize the training of machine learning models and align their actions
			more closely with the intended objectives. By conducting additional runs
			and carefully tweaking the parameters, it is expected that the agent's
			performance can be further improved and the undesired swinging behavior
			can be mitigated.
		</p></Container>
	);
}
