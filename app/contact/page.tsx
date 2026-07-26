import { redirect } from "next/navigation";

/**
 * The partner application (see /wholesale) replaced the old contact page.
 * Kept as a redirect so existing inbound links, nav entries and bookmarks
 * continue to resolve instead of 404ing.
 */
export default function ContactPage() {
  redirect("/wholesale");
}
