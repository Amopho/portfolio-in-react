import { Branch, Button, Check, contactHref } from "./LandingUI";
export default function Contact() {
  return (
    <div className="container contact-content">
      <Branch className="branch-left" />
      <Branch className="branch-right" />
      <p className="eyebrow">JETZT STARTEN</p>
      <h2>
        Du möchtest herausfinden, wie ich dich
        <br className="desktop-break" /> und deinen Hund am besten unterstützen
        kann?
      </h2>
      <p>Dann melde dich für eine unverbindliche Beratung an.</p>
      <Button href={contactHref} primary calendar />
      <div className="contact-assurances">
        {["Unverbindlich", "Persönlich", "Individuell"].map((text) => (
          <span key={text}>
            <Check />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
