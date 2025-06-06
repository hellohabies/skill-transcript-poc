import { api } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface Config {
  facultiesId: string;
  curriculumsId?: string;
}

export function useFaculties(config?: Config) {
  const facultiesId = config?.facultiesId || "";
  const curriculumsId = config?.curriculumsId || "";

  const { data: facultiesResponse, isLoading: isLoadingFaculties } = useQuery({
    queryKey: ["faculties"],
    queryFn: () => api.faculties.get(),
  });

  const faculties = useMemo(() => {
    if (!facultiesResponse) return [];
    return facultiesResponse.data?.data;
  }, [facultiesResponse]);

  const selectedFaculty = useMemo(() => {
    if (!facultiesResponse) return null;
    return facultiesResponse.data?.data.find((f) => f.id === facultiesId) || null;
  }, [facultiesResponse, facultiesId]);

  const selectedCurriculum = useMemo(() => {
    if (!selectedFaculty) return null;
    return selectedFaculty.curriculums.find((c) => c.id === curriculumsId) || null;
  }, [selectedFaculty, curriculumsId]);

  const curriculums = useMemo(() => {
    if (!facultiesResponse) return [];
    return selectedFaculty?.curriculums || [];
  }, [facultiesResponse, selectedFaculty]);

  return {
    faculties,
    selectedFaculty,
    selectedCurriculum,
    curriculums,
    isLoadingFaculties,
  };
}
