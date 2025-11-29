import svgLogo from "./logo.svg";

export default function GlassLogo() {
    return (
        <section className="glassLogo">
            <img src={svgLogo} alt="logo" />
            <span>SoundInfluencers</span>
        </section>
    );
}
