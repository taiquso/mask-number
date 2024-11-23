"use client";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useEffect } from 'react';

interface NumberMotionProps {
  children: React.ReactNode;
}

export const NumberMotion: React.FC<NumberMotionProps> = ({children}) => {
  gsap.registerPlugin(useGSAP);
  const containerRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (containerRef.current && wrapperRef.current) {
      wrapperRef.current.style.overflow = 'visible';
      const finalWidth = containerRef.current.offsetWidth;
      wrapperRef.current.style.overflow = 'hidden';

      tl.to(wrapperRef.current, {
        width: finalWidth,
        duration: 1,
        ease: "power2.inOut"
      });
    }

    const parentElements = document.querySelectorAll(".parent");
    parentElements.forEach((parentEl) => {
      const numberLetter = parentEl.querySelector(".number-letter");
      if (numberLetter) {
        tl.to(numberLetter, {
          y: function() {
            const targetNumber = parseInt(parentEl.getAttribute('data-number') || '0');
            return `${-targetNumber}em`;
          },
          duration: 1,
          ease: "power2.inOut",
        }, "<");
      }
    });
  }, [children]);

  return (
    <span 
      ref={wrapperRef} 
      className="inline-block overflow-hidden"
      style={{ width: "auto" }}
    >
      <span ref={containerRef} className="text-[#F9CDCD] whitespace-nowrap">
        {children?.toString().split("").map((num, index) => {
          const isNumber = !isNaN(parseInt(num));
          return isNumber ? (
            <span 
              key={index} 
              className="inline-flex justify-center overflow-hidden h-[1em] parent" 
              data-number={num}
            >
              <span 
                className="inline-flex flex-col number-letter relative" 
                style={{transform: "translateY(0)"}}
              >
                {[...Array(10)].map((_, index) => (
                  <span className="inline-block" key={index}>{index}</span>
                ))}
              </span>
            </span>
          ) : (
            <span key={index}>{num === " " ? "\u00A0" : num}</span>
          );
        })}
      </span>
    </span>
  );
};