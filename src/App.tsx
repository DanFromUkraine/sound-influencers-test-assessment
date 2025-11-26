import Loader from "./components/Loader";

export default function App() {
    return (
        <main>
            <Loader overallAnimationDuration={1_000} isVisible={true} />
        </main>
    );
}
