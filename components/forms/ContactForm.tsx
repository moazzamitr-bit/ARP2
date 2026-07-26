"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { enquiryTypes } from "@/content/contact";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrors({});

    const form = event.currentTarget;
    const response = await fetch("/api/forms/contact", {
      method: "POST",
      body: new FormData(form),
    });
    const result = (await response.json()) as { ok: boolean; errors?: Record<string, string> };

    if (!response.ok || !result.ok) {
      setErrors(result.errors ?? { form: "Please review the form and try again." });
      setStatus("error");
      return;
    }

    form.reset();
    setStatus("success");
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" />
      <Field label="Full Name" name="fullName" required error={errors.fullName} />
      <Field label="Email" name="email" type="email" required error={errors.email} />
      <Field label="Phone" name="phone" type="tel" error={errors.phone} />
      <label className="field">
        <span>
          Enquiry Type <b aria-hidden="true">*</b>
        </span>
        <select name="enquiryType" defaultValue="" aria-describedby={errors.enquiryType ? "enquiryType-error" : undefined}>
          <option value="" disabled>
            Select enquiry type
          </option>
          {enquiryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.enquiryType ? (
          <small id="enquiryType-error" className="form-error">
            {errors.enquiryType}
          </small>
        ) : null}
      </label>
      <Field label="Subject" name="subject" required error={errors.subject} />
      <label className="field field-full">
        <span>
          Message <b aria-hidden="true">*</b>
        </span>
        <textarea name="message" rows={5} placeholder="How can we help?" />
        {errors.message ? <small className="form-error">{errors.message}</small> : null}
      </label>
      <label className="checkbox-label field-full">
        <input type="checkbox" name="consent" />
        <span>I consent to ARP Group contacting me about this enquiry.</span>
      </label>
      {errors.consent ? <p className="form-error field-full">{errors.consent}</p> : null}
      {errors.form ? <p className="form-error field-full">{errors.form}</p> : null}
      {status === "success" ? (
        <p className="form-success field-full" role="status">
          Thank you. Your enquiry has been received.
        </p>
      ) : null}
      <Button className="field-full" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Enquiry"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="field">
      <span>
        {label}
        {required ? <b aria-hidden="true"> *</b> : null}
      </span>
      <input name={name} type={type} placeholder={label} />
      {error ? <small className="form-error">{error}</small> : null}
    </label>
  );
}
