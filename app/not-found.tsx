import { LinkButton } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section>
      <div className="not-found">
        <p className="eyebrow">Page not found</p>
        <h1>We could not find that page.</h1>
        <p>Return to the ARP website and continue from the main navigation.</p>
        <LinkButton href="/">Go Home</LinkButton>
      </div>
    </Section>
  );
}
