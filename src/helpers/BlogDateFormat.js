const BlogDateFormat = (createdAt) => {
  // 📅 BlogDateFormat(item.createdAt.split("T")[0])
  // ✅ Tuesday, Aug 13, 2024
  const date = new Date(createdAt);
  const options = {
    weekday: "long", // 'Monday', 'Tuesday', etc.
    year: "numeric", // '2024'
    month: "short", // 'Aug'
    day: "numeric", // '31'
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(date);
  return formattedDate;
};

export default BlogDateFormat;
