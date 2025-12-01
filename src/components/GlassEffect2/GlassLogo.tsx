import svgLogo from "./logo.svg";

export default function GlassLogo() {
    return (
        <section className="glassLogo">
            <div className="blurPlate" />
            <div className="mainLogoContent">
                <img src={svgLogo} alt="logo" />
                <span>SoundInfluencers</span>
            </div>
        </section>
    );
}
