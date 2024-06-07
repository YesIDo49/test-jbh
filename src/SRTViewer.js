import React, { useEffect } from "react";

const parseSRT = (srt) => {
    const subtitles = [];

    srt.split(/\n\n|\r\n\r\n/).forEach((block) => {
        const [index, time, ...textLines] = block.split(/\n|\r\n/);
        const lyric = textLines.join(" ");
        subtitles.push(lyric);
    });

    return subtitles;
};

const parseSRT2 = (srt) => {
    const timeIntervals = [];

    srt.split(/\n\n|\r\n\r\n/).forEach((block) => {
        const [index, time] = block.split(/\n|\r\n/);
        const [, end] = time.split(" --> ").map(parseSRTTime);
        timeIntervals.push(end);
    });

    return timeIntervals;
};

const parseSRTTime = (time) => {
    const [seconds, milliseconds] = time.split(",").map(parseFloat);
    return seconds * 1000 + milliseconds;
};

const SRTViewer = ({ filePath, onLyricsParsed, onTimeParsed }) => {
    useEffect(() => {
        fetch(filePath)
            .then((response) => response.text())
            .then((text) => {
                const parsedSubtitles = parseSRT(text);
                onLyricsParsed(parsedSubtitles);
                const parsedTimeIntervals = parseSRT2(text);
                onTimeParsed(parsedTimeIntervals);
            })
            .catch((error) => console.error("Error fetching the SRT file:", error));
    }, [filePath, onLyricsParsed, onTimeParsed]);

    return null;
};

export default SRTViewer;
