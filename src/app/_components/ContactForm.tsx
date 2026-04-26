"use client";

import { useState } from "react";

type State = { status: "idle" | "pending" | "success" | "error"; error?: string };

export default function ContactForm() {
  const [state, setState] = useState<State>({ status: "idle" });

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ status: "pending" });

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      contact: (form.elements.namedItem("contact") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.status === "success") {
        setState({ status: "success" });
      } else {
        setState({ status: "error", error: json.error ?? "Что-то пошло не так" });
      }
    } catch {
      setState({ status: "error", error: "Нет соединения. Напишите напрямую на email." });
    }
  }

  if (state.status === "success") {
    return (
      <div className="cf-success">
        <div className="cf-success-icon">✓</div>
        <p className="cf-success-text">Сообщение отправлено. Отвечу в течение 24 часов.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="cf-row">
        <input
          name="name"
          type="text"
          placeholder="Ваше имя"
          required
          className="cf-input"
          autoComplete="name"
          disabled={state.status === "pending"}
        />
        <input
          name="contact"
          type="text"
          placeholder="Email или @telegram"
          required
          className="cf-input"
          autoComplete="email"
          disabled={state.status === "pending"}
        />
      </div>
      <textarea
        name="message"
        placeholder="Расскажите о проекте или запросе..."
        required
        rows={4}
        className="cf-input cf-textarea"
        disabled={state.status === "pending"}
      />
      {state.status === "error" && state.error && (
        <p className="cf-error">{state.error}</p>
      )}
      <button
        type="submit"
        className="btn btn-primary cf-submit"
        disabled={state.status === "pending"}
      >
        {state.status === "pending" ? "Отправляю..." : "Отправить →"}
      </button>
    </form>
  );
}
