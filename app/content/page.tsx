'use client'

import Calendar from "@/components/Calender";
import { Metadata } from "next";
import Contents from '../../components/Contents/Contents'

export const metadata: Metadata = {
  title: "Content Page | TechNoobs admin panel",
  description: "This is Calendar page for TailAdmin Next.js",
  // other metadata
};

const CalendarPage = () => {
  return (
    <>
      {/* <Calendar /> */}
      <Contents/>
      
    </>
  );
};

export default CalendarPage;
