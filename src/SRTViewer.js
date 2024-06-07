// SRTViewer.js
import React, { useState, useEffect } from "react";

const parseSRT = (srt) => {
    const subtitles = [];
    const timeIntervals = [];

    srt.split(/\n\n|\r\n\r\n/).forEach((block) => {
        const [index, time, ...textLines] = block.split(/\n|\r\n/);
        const [start, end] = time.split(" --> ").map(parseSRTTime); // Parse les temps
        const lyric = textLines.join(" ");

        // Ajoute les paroles et les timeIntervals
        subtitles.push(lyric);
    });

    return subtitles;
};

const parseSRT2 = (srt) => {
    const subtitles = [];
    const timeIntervals = [];

    srt.split(/\n\n|\r\n\r\n/).forEach((block) => {
        const [index, time, ...textLines] = block.split(/\n|\r\n/);
        const [start, end] = time.split(" --> ").map(parseSRTTime); // Parse les temps
        const lyric = textLines.join(" ");

        // Ajoute les paroles et les timeIntervals
        timeIntervals.push(end);
    });

    return timeIntervals;
};
const parseSRTTime = (time) => {
    const parts = time.split(",");
    const seconds = parseFloat(parts[0]);
    const milliseconds = parseFloat(parts[1]);
    return seconds * 1000 + milliseconds;
};
const SRTViewer = ({ filePath, onLyricsParsed, onTimeParsed }) => {
    const [subtitles, setSubtitles] = useState([]);
    const [timeIntervals, setTimeIntervals] = useState([]);
    console.log(subtitles);
    useEffect(() => {
        fetch(filePath)
            .then((response) => response.text())
            .then((text) => {
                const parsedSubtitles = parseSRT(text);
                setSubtitles(parsedSubtitles);
                onLyricsParsed(parsedSubtitles);
                const parsedTimeIntervals = parseSRT2(text);
                setTimeIntervals(parsedTimeIntervals);
                onTimeParsed(parsedTimeIntervals);
            })
            .catch((error) => console.error("Error fetching the SRT file:", error));
    }, [filePath, onLyricsParsed, onTimeParsed]);

    return null;
};

export default SRTViewer;
