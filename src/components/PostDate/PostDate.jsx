import DateParser from "utilities/dateParser";

export const PostDate = ({createdAt}) => {
  const { day, month, hours, minutes } = DateParser(createdAt);

  return (
    <>
      <p>
        {month} {day}
      </p>
      <span>·</span>
      <p>
        {hours}:{minutes} UTC
      </p>
    </>
  );
};
