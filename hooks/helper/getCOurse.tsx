import { detailsCourse } from "@/services/api";
import { CourseDetailResponse } from "@/types/detailsCourse";

export async function getCourse(
  param2: string,
  modality: string,
  isGraduacao = false
): Promise<CourseDetailResponse | null> {
  try {
    const data: CourseDetailResponse = await detailsCourse(param2, modality, isGraduacao);
    if (!data || !data.data) {
      return null;
    }
    return data;
  } catch (e) {
    return null;
  }
}
