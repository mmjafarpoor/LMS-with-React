import {CircularProgressbar , buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgressBar = ({progress}) => {
    return (
        <div style={{ width: 150, height: 150 }}>
            <CircularProgressbar value={progress} text={`${progress}%`}
                strokeWidth={8}
                styles={buildStyles({
                    pathColor: "var(--button-bg)",
                    trailColor: "var(--progress-bar-trail)",
                    textColor: "var(--button-bg)",
                    strokeLinecap: "round",
                    textSize: "21px",
                    pathTransitionDuration: 1.5,
                    filter: "drop-shadow(0 0 10px rgba(79,140,255,.45))",
                })}
            />
        </div>
    );
}

export default CircularProgressBar