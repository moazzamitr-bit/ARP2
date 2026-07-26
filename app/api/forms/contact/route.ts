import { NextResponse } from "next/server";
import { required, validEmail } from "@/lib/utils";

export async function POST(request: Request) {
  const data = await request.formData();
  if (data.get("website")) return NextResponse.json({ ok: true });

  const isNewsletterOnly = required(data.get("email")) && !data.get("fullName") && !data.get("message");
  const errors: Record<string, string> = {};

  if (isNewsletterOnly) {
    if (!validEmail(data.get("email"))) errors.email = "Enter a valid email address.";
    if (data.get("consent") !== "on") errors.consent = "Consent is required before subscribing.";
  } else {
    for (const field of ["fullName", "enquiryType", "subject", "message"]) {
      if (!required(data.get(field))) errors[field] = "This field is required.";
    }
    if (!validEmail(data.get("email"))) errors.email = "Enter a valid email address.";
    if (data.get("consent") !== "on") errors.consent = "Consent is required before submitting.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  console.info("ARP contact form submission", {
    receivedAt: new Date().toISOString(),
    payload: Object.fromEntries(data.entries()),
  });

  return NextResponse.json({ ok: true });
}
