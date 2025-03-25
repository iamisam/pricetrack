import React from "react";
import {Document} from "react-pdf";
import { pdfjs } from "react-pdf";
import PDFComponent from "../components/PDFComponent";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();

const About = () => {
    return (
        <div className="min-h-full flex flex-col justify-between items-center">
            <div className="text-white text-center font-semibold text-2xl m-10 justify-center items-center mb-10">
                <p className="text-white">Hi, I am Isam Abdul Aziz. I made this project for an assignment. Check out the detailed report:</p>
                <br />
            </div>
            <PDFComponent />
        </div>
    );
}

export default About;