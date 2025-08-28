import { useMemo } from "react";
import {normalizeText} from "@/utils/functions";
import {CourseResponse} from "@/types/list-courses";

export function useFilteredCourses(responseCourse?: CourseResponse, searchTerm: string = "") {
    return useMemo(() => {
        if (!responseCourse?.data) return [];
        const normalizedSearchTerm: string = normalizeText(searchTerm.trim());
        const searchRegex = new RegExp(normalizedSearchTerm.split(" ").join("|"), "i");
        return responseCourse.data.filter((course) => {
            const normalizedName: string = normalizeText(course.name);
            const nameMatch: boolean = searchRegex.test(normalizedName);
            const workloadMatch: boolean =
                course.workload?.toString().includes(searchTerm.trim()) || false;

            return nameMatch || workloadMatch;
        });
    }, [responseCourse?.data, searchTerm]);
}
