export default function SingleBar({
    height,
    animationDelayMS,
    overallAnimationDurationMS: overallAnimationDuration,
}: {
    height: number;
    animationDelayMS: number;
    overallAnimationDurationMS: number;
}) {
    return (
        <span
            className="singleBar"
            style={{
                height,
                animationDelay: `${animationDelayMS}ms`,
                animationDuration: `${overallAnimationDuration}ms`,
            }}
        />
    );
}
