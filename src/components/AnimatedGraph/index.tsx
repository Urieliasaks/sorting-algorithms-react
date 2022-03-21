import { ArrayGraph } from "../";
import { useState, useEffect, useRef } from "react";

const AnimatedGraph = ({ iterations }: { iterations: number[][] }) => {
	const [frame, setFrame] = useState(0);
	const counter = useRef(0);

	useEffect(() => {
		let T = frame == iterations.length - 1 ? 1000 : 50;
		counter.current = (counter.current + 1) % iterations.length;
		const timer = setTimeout(() => setFrame((frame + 1) % iterations.length), T);
		return () => clearTimeout(timer);
	}, [frame, iterations]);

	if (iterations) {
		return (
			<ArrayGraph
				data={iterations[frame]}
				color={{ red: 3, green: 4, blue: 94 }}
				color2={{ red: 202, green: 240, blue: 248 }}
			/>
		);
	}
	return <></>;
};

export default AnimatedGraph;
