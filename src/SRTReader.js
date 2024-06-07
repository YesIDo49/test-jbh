import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as SubtitlesParser from 'subtitles-parser';

const SRTReader = ({ srtFilePath, onSubtitlesParsed }) => {
    useEffect(() => {
        const fetchSRT = async () => {
            try {
                const response = await axios.get(srtFilePath);
                const srtContent = response.data;
                console.log('SRT Content:', srtContent);
                parseSRT(srtContent);
            } catch (error) {
                console.error('Error fetching the SRT file:', error);
            }
        };

        fetchSRT();
    }, [srtFilePath]);

    const parseSRT = (srtContent) => {
        try {
            const parsedSubtitles = SubtitlesParser.fromSrt(srtContent, true);
            console.log('Parsed Subtitles:', parsedSubtitles);

            if (!parsedSubtitles || !Array.isArray(parsedSubtitles)) {
                throw new Error('Invalid subtitles format');
            }
            const formattedSubtitles = parsedSubtitles.map((subtitle) => {
                console.log('Parsing subtitle:', subtitle);

                const startSeconds = convertToSeconds(subtitle.startTime);
                const endSeconds = convertToSeconds(subtitle.endTime);

                console.log('Converted times:', { startSeconds, endSeconds });

                return {
                    id: subtitle.id.toString(),
                    startTime: subtitle.startTime,
                    startSeconds: startSeconds,
                    endTime: subtitle.endTime,
                    endSeconds: endSeconds,
                    text: subtitle.text,
                    interval: subtitle.endTime - subtitle.startTime,
                };
            });

            console.log('Formatted Subtitles:', formattedSubtitles);

            onSubtitlesParsed(formattedSubtitles);
        } catch (error) {
            console.error('Error parsing subtitles:', error);
        }
    };

    const convertToSeconds = (time) => {
        try {
            console.log('Converting time:', time);

            // if (typeof time !== 'string') {
            //     throw new Error('Time is not a string');
            // }
            //
            // const [hours, minutes, seconds] = time.split(':');
            // if (!seconds) {
            //     throw new Error('Seconds part is missing');
            // }
            //
            // const [wholeSeconds, milliseconds] = seconds.split(',');
            //
            // if (!wholeSeconds || !milliseconds) {
            //     throw new Error('Invalid seconds format');
            // }
            //
            // const totalSeconds = (
            //     parseInt(hours, 10) * 3600 +
            //     parseInt(minutes, 10) * 60 +
            //     parseInt(wholeSeconds, 10) +
            //     parseInt(milliseconds, 10) / 1000
            // );

            // console.log('Total seconds:', totalSeconds);
            return time;
        } catch (error) {
            console.error('Error converting time to seconds:', { time, error });
            return 0;
        }
    };

    return (
        <div>
            <p>Loading subtitles...</p>
        </div>
    );
};

SRTReader.propTypes = {
    srtFilePath: PropTypes.string.isRequired,
    onSubtitlesParsed: PropTypes.func.isRequired,
};

export default SRTReader;
