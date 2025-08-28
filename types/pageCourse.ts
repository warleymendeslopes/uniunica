import { CourseDetailResponse } from "./detailsCourse";
import { VerifyModality } from "./siteConfig";

export type PageCourseProps = {
  course: CourseDetailResponse;
  modality?: VerifyModality | string;
};