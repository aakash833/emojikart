"use client";

import React, { useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Server error");
      }

      // Show big-screen message regardless of actual mail delivery.
      setShowOverlay(true);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-muted-foreground"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            required
            value={form.name}
            onChange={onChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-muted-foreground"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            required
            value={form.email}
            onChange={onChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-muted-foreground"
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="What's this about?"
            required
            value={form.subject}
            onChange={onChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-muted-foreground"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message here..."
            rows={6}
            required
            value={form.message}
            onChange={onChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black cursor-pointer text-white px-4 py-3 rounded"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {error && <p className="text-sm text-destructive">{error}</p>}
      </form>

      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-10 max-w-3xl mx-4 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">
              Your request has been sent to us.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              We'll connect with you shortly.
            </p>
            <div className="mt-8">
              <button
                onClick={() => {
                  setForm({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                  });
                  setShowOverlay(false);
                }}
                className="px-6 py-2 bg-primary text-black cursor-pointer rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
