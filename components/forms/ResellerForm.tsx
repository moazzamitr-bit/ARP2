"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { businessTypes, cities, dialCodes, partnerCategories } from "@/content/contact";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ResellerForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrors({});
    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/forms/reseller", {
      method: "POST",
      body: formData,
    });
    const result = (await response.json()) as {
      ok: boolean;
      errors?: Record<string, string>;
    };

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

      <Field
        label="Company Name"
        name="companyName"
        placeholder="Enter company name"
        required
        error={errors.companyName}
      />
      <Field
        label="Contact Person"
        name="contactPerson"
        placeholder="Enter full name"
        required
        error={errors.contactPerson}
      />
      <Field
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter email address"
        required
        error={errors.email}
      />

      <label className="field">
        <span>
          Phone Number
          <b aria-hidden="true"> *</b>
        </span>
        <span className="phone-field">
          <select name="dialCode" aria-label="Country dial code" defaultValue={dialCodes[0]}>
            {dialCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <input
            name="phone"
            type="tel"
            placeholder="Enter phone number"
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
        </span>
        {errors.phone ? (
          <small id="phone-error" className="form-error">
            {errors.phone}
          </small>
        ) : null}
      </label>

      <Select
        label="City"
        name="city"
        placeholder="Select city"
        options={cities}
        required
        error={errors.city}
      />
      <Select
        label="Category"
        name="category"
        placeholder="Select category"
        options={partnerCategories}
        required
        error={errors.category}
      />
      <Select
        label="Business Type"
        name="businessType"
        placeholder="Select business type"
        options={businessTypes}
        optional
        error={errors.businessType}
      />

      <label className="field">
        <span>
          Message <i>(Optional)</i>
        </span>
        <textarea name="message" rows={3} placeholder="Tell us more about your business" />
      </label>

      <label className="checkbox-label field-full">
        <input
          type="checkbox"
          name="consent"
          aria-describedby={errors.consent ? "reseller-consent-error" : undefined}
        />
        <span>
          I confirm that the information provided is accurate and I agree to be contacted by ARP Group.
        </span>
      </label>
      {errors.consent ? (
        <p id="reseller-consent-error" className="form-error field-full">
          {errors.consent}
        </p>
      ) : null}
      {errors.form ? <p className="form-error field-full">{errors.form}</p> : null}
      {status === "success" ? (
        <p className="form-success field-full" role="status">
          Thank you. Your application has been received.
        </p>
      ) : null}

      <Button className="field-full apply-submit" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Submit Application"}
      </Button>
      <p className="form-note field-full">
        Our team will review your application and respond within 2 business days.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  error?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <label className="field">
      <span>
        {label}
        {required ? <b aria-hidden="true"> *</b> : null}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <small id={errorId} className="form-error">
          {error}
        </small>
      ) : null}
    </label>
  );
}

function Select({
  label,
  name,
  placeholder,
  options,
  required = false,
  optional = false,
  error,
}: {
  label: string;
  name: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  optional?: boolean;
  error?: string;
}) {
  const errorId = `${name}-error`;
  return (
    <label className="field">
      <span>
        {label}
        {required ? <b aria-hidden="true"> *</b> : null}
        {optional ? <i> (Optional)</i> : null}
      </span>
      <select name={name} aria-describedby={error ? errorId : undefined} defaultValue="">
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? (
        <small id={errorId} className="form-error">
          {error}
        </small>
      ) : null}
    </label>
  );
}
