"use client";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useEffect } from 'react';

interface NumberMotionProps {
  children: React.ReactNode;
}

export const NumberMotion: React.FC<NumberMotionProps> = ({children}) => {
  gsap.registerPlugin(useGSAP)
  const containerRef = useRef(null);

  useEffect(() => {
    const parentElements = document.querySelectorAll(".parent");
    parentElements.forEach((parentEl) => {
      const numberLetter = parentEl.querySelector(".number-letter");
      gsap.to(numberLetter, {
        y: function() {
          const targetNumber = parseInt(parentEl.getAttribute('data-number') || '0');
          return `${-targetNumber}em`;
        },
        duration: 1,
        ease: "power2.inOut",
      });
    });
  }, [children])

  return (
    <span ref={containerRef} className="text-[#F9CDCD]">
      {children?.toString().split("").map((num, index) => {
        const isNumber = !isNaN(parseInt(num));
        return isNumber ? (
          <span key={index} className="inline-flex justify-center overflow-hidden h-[1em] parent" data-number={num}>
            <span className="inline-flex flex-col number-letter relative" style={{transform: "translateY(0)"}}>
              {[...Array(10)].map((_, index) => (
                <span className="inline-block" key={index}>{index}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={index} className="">{num === " " ? "\u00A0" : num}</span>
        )
      })}
    </span>
  );
};
