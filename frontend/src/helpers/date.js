const getTime = (date) => {
  const cDate = new Date(date);
  const minutes = cDate.getMinutes();
  const hour = cDate.getHours();

  return `${hour < 10 ? `0${hour}` : `${hour}`}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
};

const getFullDate = (date) => {
  const cDate = new Date(date);
  const day = cDate.getDate();
  const month = cDate.getMonth();
  const year = cDate.getFullYear();

  return `${day}/${month}/${year}`;
};

export { getTime, getFullDate };
