import GlassEffect from "./components/GlassEffect";
import Loader from "./components/Loader";
import "./app.scss";

export default function App() {
    return (
        <main>
            <Loader overallAnimationDuration={1_500} isVisible={true} />
            <GlassEffect />
        </main>
    );
}
