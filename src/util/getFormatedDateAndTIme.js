export const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    // Format the day, month, and year
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getUTCFullYear();
  
    // Format the time
    const time = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // for AM/PM format
    });
  
    return `${day}, ${month}, ${year} ${time}`;
};

export const formatDay = (dateString) => {
  const date = new Date(dateString);

  // Format the day, month, and year
  const day = date.getUTCDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getUTCFullYear();

  return `${day}, ${month}, ${year}`;
};


export const formatTime = (dateString) => {
  const date = new Date(dateString);
  // Format the time
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // for AM/PM format
  });

  return `${time}`;
};

export const isSameDay = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};