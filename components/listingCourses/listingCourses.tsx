"use client"
import type React from "react"
import { useState } from "react"
import { Pagination } from "@heroui/react"
import type { CourseResponse } from "@/types/list-courses"
import {usePathname, useRouter} from "next/navigation";
import {useFilteredCourses} from "@/hooks/useFilteredCourses";

export default function ListingCourse({ responseCourse }: { responseCourse?: CourseResponse }) {
    const router = useRouter();
    const pathname: string =  usePathname();
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const coursesPerPage = 10
    const filteredCourses = useFilteredCourses(responseCourse, search);
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)
    const startIndex = (currentPage - 1) * coursesPerPage
    const endIndex = startIndex + coursesPerPage
    const currentCourses = filteredCourses.slice(startIndex, endIndex)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setCurrentPage(1)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 font-poppins">
            <input
                type="search"
                placeholder="Pesquise por nome do curso ou carga horária..."
                value={search}
                onChange={handleSearchChange}
                className="dark:bg-[#2a2a2a] p-3 rounded-lg outline-none w-full h-[55px]"
            />
            {search && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{filteredCourses.length} curso(s) encontrado(s)</p>
            )}

            {currentCourses.map((course, index) => (
                <div
                    key={startIndex + index}
                    className="bg-[#eaeaea] dark:bg-[#2a2a2a] dark:text-white rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between shadow-lg"
                >
                    <div className="flex-1 pr-6">
                        <p className="text-sm dark:text-gray-300 font-bold mb-2">{course.workload || 0} horas</p>
                        <h4 className="font-bold text-[1.3rem] lg:text-2xl text-[#0059ff] mb-4 uppercase">{course.name}</h4>
                        <p className="dark:text-gray-300 text-base text-justify leading-relaxed max-w-2xl">
                            {course.objective ?? course.description}
                        </p>
                    </div>
                    <div className="mt-6 md:mt-0">
                        <button
                            onClick={() => router.push(`${pathname}/${course.alias}`)}
                            className="bg-gradient-to-r to-yellow-400 from-orange-500 text-black font-bold px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition">
                            CONHECER CURSO
                        </button>
                    </div>
                </div>
            ))}

            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <Pagination
                        loop
                        showControls
                        color="primary"
                        page={currentPage}
                        total={totalPages}
                        onChange={handlePageChange}
                    />
                </div>
            )}
            {filteredCourses.length === 0 && search && (
                <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">Nenhum curso encontrado para "{search}"</p>
                </div>
            )}
        </section>
    )
}
