import "./styles.scss";
import FilterInitializer from "./FilterInitializer";
import GlassLogo from "./GlassLogo";
import BackgroundText from "./BackgroundText";

export default function GlassEffectContainer() {
    return (
        <section className="glassEffectContainer">
            <FilterInitializer />
            <BackgroundText />
            <GlassLogo />
        </section>
    );
}
