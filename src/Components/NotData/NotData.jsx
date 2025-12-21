export default function NotData({ icon, header, details }) {
  return (
    <div className="text-gray-600 dark:text-gray-500 flex flex-col gap-3 items-center justify-center my-10">
      {icon}
      <h3 className="text-3xl font-semibold">{header}</h3>
      <p>{details}</p>
    </div>
  );
}
