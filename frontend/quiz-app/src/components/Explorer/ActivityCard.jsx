export const ActivityCard = ({ title, type, count, image, progress }) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all ">
      <div className="aspect-video rounded-t-xl overflow-hidden bg-purple-50">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{count} {type}</span>
          <span className="text-sm font-medium text-purple-600">{progress}</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
    </div>
  );
};