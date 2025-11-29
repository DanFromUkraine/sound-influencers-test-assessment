import GlassEffect from "./components/GlassEffect";
import Loader from "./components/Loader";

export default function App() {
    return (
        <main>
            <Loader overallAnimationDuration={1_000} isVisible={true} />
            <GlassEffect />
        </main>
    );
}
