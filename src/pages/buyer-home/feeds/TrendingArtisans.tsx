import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";

const TrendingArtisans = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const artisans = [
    {
      id: "1",
      name: "FLAIR",
      followers: "2.5K",
      image: "/assets/images/no_image.png",
    },
    {
      id: "2",
      name: "GLAMOUR",
      followers: "1.8K",
      image: "/assets/images/no_image.png",
    },
    {
      id: "3",
      name: "SVELTE",
      followers: "3.2K",
      image: "/assets/images/no_image.png",
    },
    {
      id: "4",
      name: "VERVE",
      followers: "1.2K",
      image: "/assets/images/no_image.png",
    },
    {
      id: "5",
      name: "STYLE",
      followers: "4.1K",
      image: "/assets/images/no_image.png",
    },
    {
      id: "6",
      name: "ELEGANCE",
      followers: "2.9K",
      image: "/assets/images/no_image.png",
    },
  ];

  return (
    <div className="relative w-full rounded-xl bg-card flex flex-col flex-wrap items-stretch justify-start p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            Trending Artisans
          </h3>
        </div>
        <button className="text-sm text-primary font-medium flex items-center gap-2 hover:opacity-80 transition-opacity">
          View all
          <FaArrowRightLong size={14} />
        </button>
      </div>

      <div className="flex flex-col gap-4 h-[280px] overflow-y-auto scrollbar-none">
        {artisans.map((artisan) => (
          <div
            key={artisan.id}
            className="group relative flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
            onMouseEnter={() => setHoveredId(artisan.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <RxAvatar className="w-8 h-8 text-gray-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-text-primary">
                  {artisan.name}
                </span>
                <span className="text-sm text-gray-500">
                  {artisan.followers} followers
                </span>
              </div>
            </div>

            <button
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                hoveredId === artisan.id
                  ? "bg-primary text-white"
                  : "text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingArtisans;
