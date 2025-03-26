import { useEffect, useState } from "react";

function useWindowHeight(heightLimit?: number) {
  const [height, setHeight] = useState(window.innerHeight);
  const [isOverLimit, setIsOverLimit] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);

      if (heightLimit) {
        setIsOverLimit(window.innerHeight > heightLimit);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [heightLimit]);

  return { currentHeight: height, isOverLimit };
}

export default useWindowHeight;
