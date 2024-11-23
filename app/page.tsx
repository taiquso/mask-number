"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { NumberMotion } from "./components/animations/Animations"
import { useState } from "react"


export default function Home() {
  gsap.registerPlugin(useGSAP)
  useGSAP(() => {
    gsap.fromTo(".title-letter", {
      y: "75%",
      rotateX: -88,
    }, {
      y: 0,
      rotateX: 0,
      stagger: 0.08,
      duration: 0.7,
      delay: 0.5,
    })
  })

  const [value, setValue] = useState(0);

  return(
    <main className="p-10">
      <div className="flex">
        <h1 className="text-[#F9CDCD] text-[10rem] leading-[8rem] font-bold uppercase title max-w-[1000px]" >
          {"Mask number animation using gsap".split(" ").map((letter, index) => (
            <span style={{
              perspective: "100vw"
            }}  className="inline-block overflow-hidden" key={index}>
            <span style={{
              transform: "rotateX(-88deg), translateY(75%)",
              transformOrigin: "50% 75%",
              transformStyle: "preserve-3d"
            }} className="inline-block tracking-tighter title-letter mr-8">
              {letter}
            </span>
            </span>
          ))}
        </h1>
      </div>
      <div className="flex flex-col py-12 uppercase text-9xl font-bold">
        <p className="flex">
        <NumberMotion>{value}</NumberMotion>
        <span className="text-[#F9CDCD]">$</span>
        </p>
      </div>
      <button 
        className="bg-[#F9CDCD] py-5 px-12 text-2xl rounded" 
        onClick={() => {
          setValue(Math.floor(Math.random() * 1500) + 1)
        }}
      >
        Shuffle Value
      </button>
    </main>
  )
}