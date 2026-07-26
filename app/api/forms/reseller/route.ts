import { NextResponse } from "next/server";
import { required, validEmail } from "@/lib/utils";

export async function POST(request: Request) {
  const data = await request.formData();
  if (data.get("website")) return NextResponse.json({ ok: true });

  const errors: Record<string, string> = {};
  // Business type and message are optional on the application form.
  const requiredFields = ["companyName", "contactPerson", "phone", "city", "category"];

  for (const field of requiredFields) {
    if (!required(data.get(field))) errors[field] = "This field is required.";
  }
  if (!validEmail(data.get("email"))) errors.email = "Enter a valid email address.";
  if (data.get("consent") !== "on") errors.consent = "Consent is required before submitting.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const payload = Object.fromEntries(data.entries());
  console.info("ARP reseller form submission", {
    receivedAt: new Date().toISOString(),
    payload,
  });

  return NextResponse.json({ ok: true });
}
