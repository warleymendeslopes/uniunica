import { CourseDetailResponse } from "./detailsCourse";

export type VerifyModality = "pos-graduacao" | "graduacao" | "segunda-graduacao" | "disciplina-isolada";

export type PaginacaoCurso = {
  course: CourseDetailResponse;
  modality?: VerifyModality;
};