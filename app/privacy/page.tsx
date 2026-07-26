import { Section } from "@/components/ui/Section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Privacy Policy", "Privacy policy placeholder for ARP client approval.", "/privacy");

export default function PrivacyPage() {
  return (
    <Section>
      <div className="article-body">
        <p className="eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <p>This placeholder page is ready for ARP&apos;s approved privacy policy content.</p>
      </div>
    </Section>
  );
}
