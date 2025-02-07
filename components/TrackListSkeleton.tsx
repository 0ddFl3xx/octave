
export const PCTrackListSkeleton = ({ count = 5 }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <tr key={index} className="border-b border-white/20">
            <td className="py-4 w-8">
              <div className="h-4 w-4 bg-white/10 animate-pulse rounded" />
            </td>
            <td className="py-4">
              <div className="flex items-center">
                <div className="size-10 mr-4 bg-white/10 animate-pulse rounded" />
                <div className="h-4 w-32 bg-white/10 animate-pulse rounded" />
              </div>
            </td>
            <td className="py-4">
              <div className="h-4 w-24 bg-white/10 animate-pulse rounded" />
            </td>
            <td className="py-4">
              <div className="h-4 w-20 bg-white/10 animate-pulse rounded" />
            </td>
            <td className="py-4 w-8">
              <div className="h-4 w-8 bg-white/10 animate-pulse rounded" />
            </td>
          </tr>
        ))}
    </>
  );
};

export const MobileTrackListSkeleton = ({ count = 10 }) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <li key={index} className="flex items-center gap-4 animate-pulse">
            {/* Image skeleton */}
            <div className="size-10 rounded-md bg-white/10" />

            {/* Text content skeleton */}
            <div className="flex-1">
              {/* Track name skeleton */}
              <div className="h-4 w-3/4 bg-white/10 rounded" />

              {/* Artist name skeleton */}
              <div className="h-3 w-1/2 bg-white/10 rounded mt-2" />
            </div>

            {/* Menu icon skeleton */}
            <div className="size-5 bg-white/10 rounded" />
          </li>
        ))}
    </>
  );
};

