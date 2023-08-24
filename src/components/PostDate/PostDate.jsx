import {parseDateTime} from 'utilities/parseDateTime';

export const PostDate = ({ createdAt }) => {
  const { day, month, hour, minute } = parseDateTime(createdAt);

  return (
    <>
      <p>
        {month} {day}
      </p>
      <span>·</span>
      <p>
        {hour}:{minute} UTC
      </p>
    </>
  );
};
