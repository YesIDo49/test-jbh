import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentLine, setSong } from "./songSlice";
import SRTViewer from "./SRTViewer";

const App = () => {
  const dispatch = useDispatch();
  const { currentLine, song } = useSelector((state) => state.song);
  const [subtitles, setSubtitles] = useState([]);
  const [timeIntervals, setTimeIntervals] = useState([]);

  const handleLyricsParsed = (parsedSubtitles) => {
    setSubtitles(parsedSubtitles);
  };

  const handleTimeParsed = (parsedTimeIntervals) => {
    setTimeIntervals(parsedTimeIntervals);
  };

  // console.log(su)
  const lyrics = [
    {
      title: "Twinkle, Twinkle, Little Star",
      lyrics: [
        "Twinkle, twinkle, little star,",
        "How I wonder what you are.",
        "Up above the world so high,",
        "Like a diamond in the sky.",
      ],
      timeIntervals: [1, 2.5, 5, 2]
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(lyrics[0].timeIntervals[currentLine]);
      dispatch(setCurrentLine(currentLine + 1));
    }, lyrics[0].timeIntervals[currentLine] * 1000);
    if (currentLine === lyrics[0].lyrics.length - 1){
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [currentLine, dispatch]);

  const handleChange = (event) => {
    dispatch(setSong(event.target.value));
  };

  return (
      <div>
        <h1>Singing App in Redux Toolkit</h1>
        <select onChange={handleChange}>
          <option value="">Select a song</option>
          {lyrics.map((lyric) => (
              <option key={lyric.title} value={lyric.title}>
                {lyric.title}
              </option>
          ))}
        </select>
        <SRTViewer filePath={"./files/SabrinaCarpenter-Espresso.srt"} onLyricsParsed={onLyricsParsed(subtitles)}/>
        {song && (
            <div>
              <h2>{song}</h2>
              <p>
                {lyrics
                    .find((lyric) => lyric.title === song)
                    .lyrics.map((line, index) => (
                        <span
                            key={line}
                            style={{
                              backgroundColor: index === currentLine ? "yellow" : "white",
                            }}
                        >
                  {line}
                </span>
                    ))}
              </p>
            </div>
        )}
      </div>
  );
};

export default App;