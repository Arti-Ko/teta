"use client";

import { useActionState } from "react";
import { submitContact } from "../actions/contact";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, null);

  if (state?.status === "success") {
    return (
      <div className="cf-success">
        <div className="cf-success-icon">✓</div>
        <p className="cf-success-text">Сообщение отправлено. Отвечу в течение 24 часов.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="contact-form">
      <div className="cf-row">
        <input
          name="name"
          type="text"
          placeholder="Ваше имя"
          required
          className="cf-input"
          autoComplete="name"
        />
        <input
          name="contact"
          type="text"
          placeholder="Email или @telegram"
          required
          className="cf-input"
          autoComplete="email"
        />
      </div>
      <textarea
        name="message"
        placeholder="Расскажите о проекте или запросе..."
        required
        rows={4}
        className="cf-input cf-textarea"
      />
      {state?.status === "error" && state.error && (
        <p className="cf-error">{state.error}</p>
      )}
      <button type="submit" className="btn btn-primary cf-submit" disabled={pending}>
        {pending ? "Отправляю..." : "Отправить →"}
      </button>
    </form>
  );
}
