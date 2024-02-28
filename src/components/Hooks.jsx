export const sortedData = (inputData) => {
  const sortValue = inputData.sort((a, b) => {
    if (a.status === "active" && b.status !== "active") {
      return -1;
    } else if (a.status !== "active" && b.status === "active") {
      return 1;
    } else if (a.status === "completed" && b.status !== "completed") {
      return -1;
    } else if (a.status !== "completed" && b.status === "completed") {
      return 1;
    } else {
      return 0;
    }
  });
  return sortValue;
};


