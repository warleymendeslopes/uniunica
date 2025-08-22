'use client';
import React from 'react';
import {CourseResponse} from "@/types/list-courses";

export default function ListingCourse({responseCourse}: {responseCourse?: CourseResponse} ) {

  const [selected, setSelected] = React.useState("TODOS");
  const filtros = ["TODOS", "DESTAQUES", "LANÇAMENTO"];

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 font-poppins">

      <input type='search' placeholder='Pesquise por um curso...' className='bg-neutral-600 p-3 rounded-lg outline-none w-full h-[55px]' />

     <div className="flex flex-row justify-center gap-3">
      {filtros.map((filtro) => (
        <button
          key={filtro}
          onClick={() => setSelected(filtro)}
          className={`p-3 rounded-full border border-white transition 
            ${selected === filtro ? "bg-green-500 border-none text-white" : "bg-transparent text-white"}
          `}
        >
          {filtro}
        </button>
      ))}
    </div>

      {responseCourse!.data.map((courses, index) => (
          <div key={index} className="bg-[#eaeaea] dark:bg-[#0F0F0F] dark:text-white rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between shadow-lg">
            <div className="flex-1 pr-6">
              <p className="text-sm text-gray-300 mb-2">{courses.workload} horas</p>
              <h4 className="font-bold text-2xl text-[#0059ff] mb-4 uppercase">
                {courses.name}
              </h4>
              <p className="text-gray-300 text-base leading-relaxed max-w-2xl">
                {courses.objective ?? courses.description}
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <button className="bg-gradient-to-r to-yellow-400 from-orange-500 text-black font-bold px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition">
                CONHECER CURSO
              </button>
            </div>
          </div>
      ))}

    </section>
  );
}
