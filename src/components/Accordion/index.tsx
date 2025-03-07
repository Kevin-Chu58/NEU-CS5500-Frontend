import { Container } from "@mui/material";
import React, { CSSProperties, Dispatch, JSX, SetStateAction, useEffect, useState } from "react";

type AccordionProps = {
    identifier: string,
    variant?: "default" | "reverse" | undefined,
    isExpanded: boolean,
    setIsExpanded: Dispatch<SetStateAction<boolean>>,
    sx: CSSProperties,
    children: JSX.Element | JSX.Element[],
};

const Accordion = ({
    identifier,
    variant,
    isExpanded,
    setIsExpanded,
    sx,
    children,
}: AccordionProps) => {
    const [height, setHeight] = useState(0);
    const [summaryHeight, setSummaryHeight] = useState(0);
    const [detailsHeight, setDetailsHeight] = useState(0);
    const [hasAnimation, setHasAnimation] = useState(false);
    const [id] = useState(identifier);
    const [variantType, setVariantType] = useState("default");
    const [style] = useState(sx);

    const getVariant = () => {
        switch (variant) {
            case "default":
            case "reverse":
                setVariantType(variant);
        }
    };

    // setup expand behavior
    useEffect(() => {
        if (!hasAnimation) {
            // setup variant that affects expand style
            getVariant();

            const accordion = document.getElementById(id) as HTMLElement;
            const summary = accordion.getElementsByClassName(
                "accordion-summary"
            )[0] as HTMLElement;
            const details = accordion.getElementsByClassName(
                "accordion-details"
            )[0] as HTMLElement;
            setExpandBehavior(summary, details);

            // document.body.addEventListener("mouseup", (e) =>
            //     handleCloseAccordionDetails(e, accordion)
            // );
        }
    });

    // update accordion height
    useEffect(() => {
        isExpanded
            ? setHeight(summaryHeight + detailsHeight)
            : setHeight(summaryHeight);
    }, [isExpanded, summaryHeight, detailsHeight]);

    useEffect(() => {
        setHasAnimation(true);
    }, [isExpanded])

    // set isExpanded to false when click outside the filter component
    // const handleCloseAccordionDetails = (
    //     event: MouseEvent,
    //     accordion: HTMLElement
    // ) => {
    //     if (!accordion?.contains(event.target as HTMLElement))
    //         setIsExpanded(false);
    // };

    const setExpandBehavior = (summary: HTMLElement, details: HTMLElement) => {
        setSummaryHeight(summary?.clientHeight ?? 0);
        setDetailsHeight(details?.clientHeight ?? 0);

        const summaryRef = summary?.getElementsByClassName(
            "ref"
        )[0] as HTMLElement;
        if (summaryRef) {
            summaryRef.style.cursor = "pointer";

            summaryRef.onclick = () => {
                setIsExpanded(b => !b);
            };
        }

        const detailsRef = details?.getElementsByClassName(
            "ref"
        )[0] as HTMLElement;
        if (detailsRef) {
            detailsRef.style.cursor = "pointer";

            detailsRef.onclick = () => {
                setIsExpanded(false);
            };
        }
    };

    const defaultStyle = {
        overflowY: "hidden",
        height: height,
        marginBottom: `${summaryHeight - height}px`,
        transition: hasAnimation ? style.transition : "",
    };

    const reverseStyle = {
        overflowY: "visible",
        height: height,
        marginBottom: `${summaryHeight - height}px`,
        transition: hasAnimation ? style.transition : "",

        ".accordion-summary": {
            marginTop: isExpanded ? "0" : `-${summaryHeight}px`,
            transition: hasAnimation ? style.transition : "",
        },
    };

    const getStyle = () => {
        switch (variantType) {
            case "default":
                return defaultStyle;
            case "reverse":
                return reverseStyle;
        }
    };

    return (
        <Container id={id} maxWidth="lg" className="accordion" sx={getStyle()}>
            {children}
        </Container>
    );
};

export default Accordion;
