import React, { useEffect, useState } from 'react';
import srtParser2 from "srt-parser-2";

const GetSrt = () => {
    let srt = `
    1
    00:00:11,544 --> 00:00:12,682
    Hello
    `;

    let parser = new srtParser2();
    let srt_array = parser.fromSrt(srt);
    console.log(srt_array);

// turn array back to SRT string.
    let srt_string = parser.toSrt(srt_array);
    console.log(srt_string);

    return null
};

export default GetSrt;
