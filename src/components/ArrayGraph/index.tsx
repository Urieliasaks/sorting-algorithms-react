type Color = {
	red: number;
	green: number;
	blue: number;
};

interface ArrayGraphProps {
	data: number[];
	color: Color;
	color2?: Color;
}

const ArrayGraph = ({ data, color, color2 }: ArrayGraphProps) => {
	const sorted = [...data].sort((a, b) => a - b);
	const biggest = sorted[data.length - 1];

	const mapValue = (val: number) => {
		return (1000 / biggest) * val;
	};

	const mapColor = (index: number): Color => {
		if (!color2) return color;
		const mapComp = (
			val: number,
			inStart: number,
			inEnd: number,
			outStart: number,
			outEnd: number
		) => outStart + ((outEnd - outStart) / (inEnd - inStart)) * (val - inStart);
		let red = mapComp(index, 0, data.length - 1, color.red, color2.red);
		let green = mapComp(index, 0, data.length - 1, color.green, color2.green);
		let blue = mapComp(index, 0, data.length - 1, color.blue, color2.blue);
		return { red: red, green: green, blue: blue };
	};

	const colorToString = (color: Color) => {
		return `rgb(${color.red},${color.green},${color.blue})`;
	};

	return (
		<svg viewBox="0 0 1000 1000" width="100%" height="100%">
			{data.map((value, index) => (
				<rect
					key={index}
					x={(index * 1000) / data.length}
					y={1000 - mapValue(value)}
					width={1000 / data.length}
					height={mapValue(value)}
					fill={value == sorted[index] ? colorToString(mapColor(index)) : "#000a"}
				/>
			))}
		</svg>
	);
};

export default ArrayGraph;
