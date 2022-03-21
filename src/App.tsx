import "./App.css";
import { useState, ChangeEvent } from "react";
import { ArrayGraph, MergeSort } from "./components";

const App = () => {
	const [data, setData] = useState<number[]>([]);
	const [numOfItems, setNumOfItems] = useState<number>(10);
	const [activeGraph, setActiveGraph] = useState<string>("");

	const DisplayGraph = () => {
		switch (activeGraph) {
			case "Merge Sort":
				return <MergeSort data={data} />;
			default:
				return <></>;
		}
	};

	const shuffleArray = (arr: number[]): number[] => {
		let randomIndex;
		let currentIndex = arr.length;
		while (currentIndex != 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
		}
		return arr;
	};

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		e.target.value = e.target.value.replace(/[^0-9]/g, "");
		setNumOfItems(parseInt(e.target.value));
	};

	const onSubmitForm = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (numOfItems < 10) {
			alert("Minimum 10 items");
			return;
		}
		let temp = Array.from(Array(numOfItems).keys()).map((x) => x + 1);
		setData(shuffleArray(temp));
		setActiveGraph("Merge Sort");
	};

	return (
		<div className="app-main">
			<div>
				<h1>Sorting Algorithms Visualizer</h1>
				<h2>{activeGraph}</h2>
			</div>
			<form className="app-form" onSubmit={onSubmitForm}>
				<input
					className="number-input"
					placeholder="Type number of items..."
					onChange={onChangeInput}
					maxLength={2}
				/>
				<button type="submit">Start</button>
			</form>
			<div className="display-graph-container">
				<DisplayGraph />
			</div>
		</div>
	);
};

export default App;
