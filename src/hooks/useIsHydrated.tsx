import { useState, useEffect } from "react";

const useIsHydrated = (containerName?: string) => {
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    if (!isHydrated) {
      setIsHydrated(true);
      if (containerName) {
        console.log(`${containerName} hydrated`);
      }
    }
  }, [isHydrated, containerName]);

  return isHydrated;
};

export default useIsHydrated;
