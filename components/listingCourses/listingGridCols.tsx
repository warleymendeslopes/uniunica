"use client"
import type React from "react"
import { useState } from "react"
import { Pagination } from "@heroui/react"
import type {Course, CourseResponse} from "@/types/list-courses"
import {useFilteredCourses} from "@/hooks/useFilteredCourses";


export default function ListingCourseDI({ responseCourse }: { responseCourse?: CourseResponse }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const coursesPerPage = 10
    const filteredCourses: Course[] = useFilteredCourses(responseCourse, searchTerm);
    const totalPages: number = Math.ceil(filteredCourses.length / coursesPerPage)
    const startIndex: number = (currentPage - 1) * coursesPerPage
    const endIndex: number = startIndex + coursesPerPage
    const currentCourses: Course[] = filteredCourses.slice(startIndex, endIndex)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
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
                value={searchTerm}
                onChange={handleSearchChange}
                className="dark:bg-[#2a2a2a] p-3 rounded-lg outline-none w-full h-[55px]"
            />
            {searchTerm && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{filteredCourses.length} curso(s) encontrado(s)</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-poppins">
                {currentCourses.map((course: any, index: number) => (
                    <button
                        key={course?.alias ?? index}
                        className="w-full text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]/50 rounded-xl"
                        title={course.name}
                    >
                        <div
                            className={[
                                "w-full rounded-xl",
                                "bg-gray-100 text-neutral-900 border border-neutral-200 hover:bg-gray-200",
                                "dark:bg-neutral-900 dark:text-white dark:border-white/10 dark:hover:bg-neutral-800/70",
                                "px-5 py-4 md:px-6 md:py-5 transition-colors min-h-[88px] md:min-h-[96px] flex items-center",
                            ].join(" ")}
                        >
                            <p className="font-semibold uppercase leading-snug text-sm md:text-base line-clamp-3">
                                {course.name}
                            </p>
                        </div>
                    </button>
                ))}
            </div>

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
            {filteredCourses.length === 0 && searchTerm && (
                <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">Nenhum curso encontrado para "{searchTerm}"</p>
                </div>
            )}
        </section>
    )
}
