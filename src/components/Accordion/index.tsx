import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";

const Accordion = ({ children }) => {
    const [height, setHeight] = useState(0);
    const [summaryHeight, setSummaryHeight] = useState(0);
    const [detailsHeight, setDetailsHeight] = useState(0);
    const [isHidden, setIsHidden] = useState(true);
    const [hasAnimation, setHasAnimation] = useState(false);

    useEffect(() => {
        const summary = document.getElementsByClassName(
            "accordion-summary"
        )[0] as HTMLElement;
        const details = document.getElementsByClassName(
            "accordion-details"
        )[0] as HTMLElement;
        setBehavior(summary, details);
    });

    useEffect(() => {
        isHidden
            ? setHeight(summaryHeight)
            : setHeight(summaryHeight + detailsHeight);
    });

    const setBehavior = (summary: HTMLElement, details: HTMLElement) => {
        const summaryStyle = summary.style;
        summaryStyle.cursor = "pointer";

        setSummaryHeight(summary.clientHeight);
        setDetailsHeight(details.clientHeight);

        const summaryChild = summary.children[0] as HTMLElement;
        // console.log(summaryChild);
        summaryChild.onclick = () => {
            setHasAnimation(true);
            setIsHidden((hidden) => !hidden);
        };
    };

    return (
        <Container
            maxWidth="lg"
            className="accordion"
            sx={{
                overflowY: "hidden",
                height: height,
                marginBottom: `${summaryHeight - height}px`,
                transition: hasAnimation ? "all .3s ease-in" : "",
            }}
        >
            {children}
        </Container>
    );
};

export default Accordion;
