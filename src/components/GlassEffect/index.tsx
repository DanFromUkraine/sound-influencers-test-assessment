import BackgroundText from "./BackgroundText";
import "./styles.scss";
import GlassLogo from "./GlassLogo";

export default function GlassEffectContainer() {
    return (
        <section className="glassEffectContainer">
            <BackgroundText />
            <GlassLogo />
        </section>
    );
}
