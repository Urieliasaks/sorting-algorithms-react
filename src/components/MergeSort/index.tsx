import { AnimatedGraph } from "../";
import { useState, useEffect } from "react";

interface MergeSortProps {
	data: number[];
}

const sortFunc = (data: number[]) => {
	let steps: number[][] = [];
	steps.push([...data]);
	const mergeInPlace = (arr: number[], start: number, end: number) => {
		let len = end - start + 1;
		let h = Math.ceil(len / 2);
		while (h >= 1) {
			let i = start;
			while (i + h <= end) {
				if (arr[i] > arr[i + h]) {
					let temp = arr[i];
					arr[i] = arr[i + h];
					arr[i + h] = temp;
					steps.push([...data]);
				}
				i++;
			}
			if (h == 1) break;
			h = Math.ceil(h / 2);
		}
	};

	const mergeSortInPlace = (arr: number[], start: number, end: number) => {
		if (start == end) return;
		let mid = Math.floor((start + end) / 2);
		mergeSortInPlace(arr, start, mid);
		mergeSortInPlace(arr, mid + 1, end);
		mergeInPlace(arr, start, end);
	};
	mergeSortInPlace(data, 0, data.length - 1);
	return steps;
};

const MergeSort = ({ data }: MergeSortProps) => {
	const [iterations, setIterations] = useState<number[][]>();

	useEffect(() => {
		setIterations(sortFunc([...data]));
	}, [data]);
	if (iterations) {
		return <AnimatedGraph iterations={iterations} />;
	}
	return <></>;
};

export default MergeSort;
