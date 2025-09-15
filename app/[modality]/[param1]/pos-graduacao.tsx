'use client'
import {notFound} from "next/navigation";
import ListingCourse from "@/components/listingCourses/listingCourses";
import {useEffect, useState} from "react";
import {listCourses} from "@/services/api";
import {CourseResponse} from "@/types/list-courses";

export default function ListCoursesPosGraduacao({area}: {area: string}) {
    const [loading, setLoading] = useState<boolean>(false);
    const [listcourse, setListCourse] = useState<CourseResponse>();
    useEffect(() => {
        async function detailsCourse(){
            const listcourse: CourseResponse = await listCourses({
                modality: 'pos-graduacao',
                area: area,
            });
            setListCourse(listcourse)
            setLoading(true)
        }
        detailsCourse().catch()
    }, [area]);

    return (
        <>
            {loading ? (
                <>
                    {listcourse && listcourse.data.length <= 0 ? notFound() : <ListingCourse responseCourse={listcourse} /> }
                </>
            ): (
                <>
                carregando...
                </>
            )
            }

        </>
    )
}