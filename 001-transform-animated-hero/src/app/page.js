"use client";

import Link from "next/link";
import useFitText from "./use-fit-text";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const fitTextRef = useFitText(0.5, 10.75);

  const imageRef = useRef(null);

  const copyRef = useRef(null);

  useGSAP(() => {
    const text = fitTextRef.current;
    if (!text) return;

    const chars = text.innerText.split("");

    text.innerText = "";

    chars.forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      text.appendChild(span);
    });

    gsap.from(text.children, {
      opacity: 1,
      duration: 1,
      stagger: {
        amount: 0.5,
        each: 0.2,
      },

      y: "100%",
      ease: "power3.out",
    });

    const image = imageRef.current;
    if (!image) return;

    console.log(image);

    gsap.to(image.children, {
      y: "-100%",
      delay: 0.8,
      duration: 1.2,
      stagger: {
        amount: 0.5,
        each: 0.2,
      },
      ease: "power3.out",
    });

    const copy = copyRef.current;
    if (!copy) return;

    gsap.from(copy.children, {
      y: 20,
      opacity: 0,
      delay: 1.4,
      duration: 0.8,
      stagger: {
        amount: 0.2,
        each: 0.1,
      },
      ease: "power3.out",
    });
  });

  return (
    <main className="flex min-h-screen w-full flex-col px-[30px]">
      <nav className="flex items-start justify-between pt-[30px]">
        <Link href="/" className="font-extrabold leading-5">
          <span>Nice.</span>
          <br />
          <span className="text-primary">Transform</span>
        </Link>

        <button
          className="flex size-[50px] flex-col items-center justify-center gap-2 rounded-full border border-black"
          aria-label="Open menu"
        >
          <span className="h-0.5 w-5 bg-black"></span>
          <span className="h-0.5 w-5 bg-black"></span>
        </button>
      </nav>

      <div className="overflow-hidden">
        <h1
          ref={fitTextRef}
          className="w-full font-extrabold leading-[0.9] tracking-[-0.1em] text-white"
        >
          Transform
        </h1>
      </div>

      <div className="mt-[30px] grid h-full flex-1 grid-cols-[repeat(15,1fr)] gap-x-[30px] justify-self-stretch">
        <div className="col-span-7 flex flex-col justify-end gap-[30px] pb-[30px]">
          <div ref={copyRef}>
            <p className="mb-2.5 max-w-[435px] font-medium leading-[22px] tracking-[0.04em]">
              We&apos;re not just another agency. We&apos;re your partners in{" "}
              <span className="font-extrabold text-primary underline">
                digital transformation.
              </span>
            </p>
            <p className="max-w-[435px] font-medium leading-[22px] tracking-[0.04em]">
              Ready to stand out in the digital landscape? Let&apos;s create
              something extraordinary together.
            </p>
          </div>

          <Button />
        </div>
        <div
          ref={imageRef}
          className="relative col-span-8 -mr-[30px] flex overflow-hidden bg-gray-700"
          style={{
            backgroundImage: "url('/hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-white"></div>
        </div>
      </div>
    </main>
  );
}

const Button = () => {
  const buttonRef = useRef(null);

  const buttonChildren = useState({
    border: null,
    copy: null,
    carrets: null,
  });

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    buttonChildren.border = button.querySelector(".button-border");
    buttonChildren.copy = button.querySelector(".button-copy");
    buttonChildren.carrets = button.querySelector(".button-carrets");
  }, []);

  const buttonOnHover = () => {
    gsap.to(buttonChildren.border, {
      scale: 1.05,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(buttonChildren.copy, {
      x: -10,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(buttonChildren.carrets.children, {
      x: 10,
      duration: 0.4,
      stagger: {
        amount: 0.3,
        each: 0.2,
      },
      ease: "power3.out",
    });
  };

  const buttonOnLeave = () => {
    gsap.to(buttonChildren.border, {
      scale: 1,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(buttonChildren.copy, {
      x: 0,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(buttonChildren.carrets.children, {
      x: 0,
      duration: 0.4,
      stagger: {
        amount: 0.2,
        each: -0.1,
      },
      ease: "power3.out",
    });
  };

  return (
    <button
      onMouseEnter={buttonOnHover}
      onMouseLeave={buttonOnLeave}
      ref={buttonRef}
      className="relative flex h-[90px] max-w-[376px] items-center justify-between px-10 font-extrabold uppercase leading-[22px] tracking-[0.04em]"
    >
      <span className="button-border absolute inset-0 rounded-full border border-black"></span>
      <span className="button-copy">Get Started</span>

      <span className="button-carrets flex items-center -space-x-0.5">
        <Carret />
        <Carret />
        <Carret />
      </span>
    </button>
  );
};

const Carret = () => {
  return (
    <svg
      width="14"
      height="22"
      viewBox="0 0 14 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="carret"
    >
      <path d="M0 22L8.5 11L14 11L5.5 22L0 22Z" fill="black" />
      <path d="M0 0L8.5 11L14 11L5.5 -2.40413e-07L0 0Z" fill="black" />
    </svg>
  );
};
