// contexts/DataContext.tsx
import { shuffleArray } from "@/helpers/getdata";
import { IExercise } from "@/types";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface DataContextType {
  loading: boolean;
  error: string | null;
  loadData: () => Promise<void>;
  reloadData: () => Promise<void>;
  getDataByName: (name: string) => IExercise[] | [];
  getAllData: () => IExercise[] | [];
  getMapData: () => Map<string, IExercise[]>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

let dataMap = new Map<string, IExercise[]>();

export function DataProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://192.168.0.103:3000/get-files");
      const names = await response.json();

      let urls: string[] = [];
      names.map((name: string) =>
        urls.push(
          `http://192.168.0.103:3000/get-file/${encodeURIComponent(name)}`,
        ),
      );

      const responses = await Promise.allSettled(urls.map((url) => fetch(url)));

      for (const response of responses) {
        if (response.status === "fulfilled") {
          const fetchResponse = response.value;

          if (fetchResponse.ok) {
            const data = await fetchResponse.json();
            const dataForMap = JSON.parse(data);
            dataMap.set(dataForMap.name, dataForMap.data);
          } else {
            console.error("Ошибка HTTP:", fetchResponse.status);
          }
        } else {
          console.error("Запрос не выполнен:", response.reason);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }

  // загрузка с гит
  async function reloadData() {
    try {
      setLoading(true);
      setError(null);
      await fetch("http://localhost:3000/get-files-git");
    } catch (err) {
      console.log(err);
    }
  }

  function getDataByName(name: string) {
    return dataMap.get(name) || [];
  }

  function getAllData() {
    const merged: IExercise[] = [...dataMap.values()].flat();
    const shuffled = shuffleArray(merged);
    return shuffled;
  }

  function getMapData() {
    return dataMap;
  }

  // Загружаем данные при старте
  useEffect(() => {
    loadData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        loading,
        error,
        loadData,
        reloadData,
        getDataByName,
        getAllData,
        getMapData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

// Хук для удобного использования
export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
