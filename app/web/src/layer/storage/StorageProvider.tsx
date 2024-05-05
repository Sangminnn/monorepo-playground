import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { getStorageValue, setStorageValue } from "./storage";

interface StorageContextProps {
  getStorageValue: typeof getStorageValue;
  setStorageValue: typeof setStorageValue;
}

const StorageContext = createContext<StorageContextProps | null>(null);

export const useStorageContext = () => useContext(StorageContext);

interface StorageProviderProps {}

export const StorageProvider = ({
  children,
}: PropsWithChildren<StorageProviderProps>) => {
  const [storageClient] = useState(() => ({
    getStorageValue,
    setStorageValue,
  }));

  const StorageContextProvider = StorageContext.Provider;

  return (
    <StorageContextProvider value={storageClient}>
      {children}
    </StorageContextProvider>
  );
};

// 사용 시 테스트 코드
// render(
//   <StorageContext.Provider value={{
//     getStorageValue: vi.fn(),
//     setStorageValue: vi.fn()
//   }}>
//     <Component />
//   </StorageContext.Provider>
// )
