import { useEffect, useRef } from "react";

export function useOutsideClick(handler, isCapturingPhase, override = false) {
    const ref = useRef();

    useEffect(
        function () {
            function handleOutsideClick(e) {
                console.log();
                if (!ref.current || override) return;

                if (!ref.current.contains(e.target)) {
                    handler();
                }
            }

            document.addEventListener(
                "click",
                handleOutsideClick,
                isCapturingPhase
            );

            return () =>
                document.removeEventListener(
                    "click",
                    handleOutsideClick,
                    isCapturingPhase
                );
        },
        [handler, isCapturingPhase, override]
    );

    return ref;
}
