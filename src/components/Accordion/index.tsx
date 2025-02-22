import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";

const Accordion = ({ identifier, variant, sx, children }) => {
    const [height, setHeight] = useState(0);
    const [summaryHeight, setSummaryHeight] = useState(0);
    const [detailsHeight, setDetailsHeight] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
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
    }

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

            document.body.addEventListener("mouseup", (e) =>
                handleCloseAccordionDetails(e, accordion)
            );
        }
    });

    // update accordion height
    useEffect(() => {
        isExpanded
            ? setHeight(summaryHeight + detailsHeight)
            : setHeight(summaryHeight);
    });

    const handleOnClickSummaryRef = () => {
        if (!hasAnimation) setHasAnimation(true);
        setIsExpanded((b) => !b);
    };

    const handleCloseAccordionDetails = (
        event: MouseEvent,
        accordion: HTMLElement
    ) => {
        if (!accordion?.contains(event.target as HTMLElement))
            setIsExpanded(false);
    };

    const setExpandBehavior = (summary: HTMLElement, details: HTMLElement) => {

        setSummaryHeight(summary.clientHeight);
        setDetailsHeight(details.clientHeight);

        const summaryRef = summary.getElementsByClassName("ref")[0] as HTMLElement;
        summaryRef.style.cursor = "pointer";

        summaryRef.onclick = () => {
            handleOnClickSummaryRef();
        };

        const detailsRef = details.getElementsByClassName("ref")[0] as HTMLElement;
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
        }
    };

    const getStyle = () => {
        switch(variantType) {
            case "default":
                return defaultStyle;
            case "reverse":
                return reverseStyle;
        }
    }

    return (
        <Container
            id={id}
            maxWidth="lg"
            className="accordion"
            sx={getStyle()}
        >
            {children}
        </Container>
    );
};

export default Accordion;
