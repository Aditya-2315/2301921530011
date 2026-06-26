import MinHeap from "./minHeap.js";

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function getPriority(notification) {
  return priorityMap[notification.type] || 0;
}

function compareNotifications(a, b) {
  const priorityDiff = getPriority(a) - getPriority(b);

  if (priorityDiff !== 0) {
    return priorityDiff;
  }

  return (
    new Date(a.createdAt).getTime() -
    new Date(b.createdAt).getTime()
  );
}

export function getTopPriorityNotifications(
  notifications,
  limit = 10
) {
  const heap = new MinHeap(compareNotifications);

  for (const notification of notifications) {
    heap.insert(notification);

    if (heap.size() > limit) {
      heap.remove();
    }
  }

  return heap
    .toArray()
    .sort((a, b) => {
      const priorityDiff =
        getPriority(b) - getPriority(a);

      if (priorityDiff !== 0) {
        return priorityDiff;
      }

      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
    });
}