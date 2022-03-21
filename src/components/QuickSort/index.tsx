import { AnimatedGraph } from "../";
import { useState, useEffect } from "react";

const sortFunc = (data: number[]) => {
	let steps: number[][] = [];
	steps.push([...data]);

	const swap = (items: number[], leftIndex: number, rightIndex: number) => {
		let temp = items[leftIndex];
		items[leftIndex] = items[rightIndex];
		items[rightIndex] = temp;
	};

	const partition = (items: number[], left: number, right: number) => {
		let pivot = items[Math.floor((right + left) / 2)],
			i = left,
			j = right;
		while (i <= j) {
			while (items[i] < pivot) {
				i++;
			}
			while (items[j] > pivot) {
				j--;
			}
			if (i <= j) {
				swap(items, i, j);
				steps.push([...data]);
				i++;
				j--;
			}
		}
		return i;
	};

	const quickSort = (items: number[], left: number, right: number) => {
		let index;
		if (items.length > 1) {
			index = partition(items, left, right);
			if (left < index - 1) {
				quickSort(items, left, index - 1);
			}
			if (index < right) {
				quickSort(items, index, right);
			}
		}
		return items;
	};
	quickSort(data, 0, data.length - 1);
	return steps;
};

interface QuickSortProps {
	data: number[];
}

const QuickSort = ({ data }: QuickSortProps) => {
	const [iterations, setIterations] = useState<number[][]>();

	useEffect(() => {
		setIterations(sortFunc([...data]));
	}, [data]);
	if (iterations) {
		return <AnimatedGraph iterations={iterations} />;
	}
	return <></>;
};

export default QuickSort;
