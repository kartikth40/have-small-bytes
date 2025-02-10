"use client";
import { useEffect, useState } from "react";
import styles from '@/app/post/[slug]/page.module.scss'


export default function BackToTopButton() {
  const {backToTopBtn} = styles
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY < lastScrollY && window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`${backToTopBtn} ${visible ? styles.showBackToTopBtn : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ▲ Back to Top
    </button>
  );
}
