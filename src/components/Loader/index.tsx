import type { LoaderParameters } from "./types";
import "./styles.scss";
import SingleBar from "./SingleBar";
import { LOADER_STRUCTURE } from "./constants";

export default function Loader({
    isVisible,
    overallAnimationDuration,
}: LoaderParameters) {
    return (
        isVisible && (
            <section
                title="progress bar"
                role="progressbar"
                className="progressbarContainer"
            >
                {LOADER_STRUCTURE.map((h, i, list) => (
                    <SingleBar
                        key={i}
                        height={h}
                        overallAnimationDurationMS={overallAnimationDuration}
                        animationDelayMS={Math.round(
                            ((overallAnimationDuration / list.length) * i) / 2,
                        )}
                    />
                ))}
            </section>
        )
    );
}
