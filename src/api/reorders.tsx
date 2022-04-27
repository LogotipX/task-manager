import { tasksContainerArr } from "../App";

export function reorderTasks(
  list: tasksContainerArr,
  fromDragElIdx: number,
  toDragElIdx: number,
  fromContainer: number,
  toContainer: number
) {
  const reorderedList = Array.from(list);
  const [removed] = reorderedList[fromContainer].issues.splice(
    fromDragElIdx,
    1
  );
  reorderedList[toContainer].issues.splice(toDragElIdx, 0, removed);

  return reorderedList;
}

export function reorderContainers(
  list: tasksContainerArr,
  fromDragElIdx: number,
  toDragElIdx: number
) {
  const reorderedList = Array.from(list);
  const [removed] = reorderedList.splice(fromDragElIdx, 1);
  reorderedList.splice(toDragElIdx, 0, removed);

  return reorderedList;
}
