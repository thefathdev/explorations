import { useEffect, useRef } from "react";

const useFitText = (kompressor = 1, multiplyFactor = 10, options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const settings = {
      minFontSize: -Infinity,
      maxFontSize: Infinity,
      ...options,
    };

    const resizer = () => {
      el.style.fontSize =
        Math.max(
          Math.min(
            el.clientWidth / (kompressor * multiplyFactor),
            parseFloat(settings.maxFontSize),
          ),
          parseFloat(settings.minFontSize),
        ) + "px";

      el.style.color = settings.color || "#000";
    };

    resizer();

    window.addEventListener("resize", resizer);
    window.addEventListener("orientationchange", resizer);

    return () => {
      window.removeEventListener("resize", resizer);
      window.removeEventListener("orientationchange", resizer);
    };
  }, [kompressor, options, multiplyFactor]);

  return elementRef;
};

/*!
 * This hook is extracted from:
 * FitText.js 1.0 jQuery free version
 *
 * Copyright 2011, Dave Rupert http://daverupert.com
 * Released under the WTFPL license
 * http://sam.zoy.org/wtfpl/
 * Modified by Slawomir Kolodziej http://slawekk.info
 *
 * Date: Tue Aug 09 2011 10:45:54 GMT+0200 (CEST)
 */

export default useFitText;
