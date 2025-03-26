import PropTypes from "prop-types";

interface ActivityListProps {
  title: string;
  description: string;
  numberofUpdate: number;
}

const ActivityList: React.FC<ActivityListProps> = ({
  title,
  description,
  numberofUpdate,
}) => {
  return (
    <>
      <div className="flex justify-between gap-2 py-6 hover:cursor-pointer">
        <div>
          <p className="font-semibold">{title}</p>
          <p className="mt-3">{`${description}...`}</p>
        </div>
        <p className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white">
          {numberofUpdate}
        </p>
      </div>
      <p className="border opacity-10" />
    </>
  );
};

ActivityList.propTypes = {
  description: PropTypes.string.isRequired,
  numberofUpdate: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default ActivityList;
