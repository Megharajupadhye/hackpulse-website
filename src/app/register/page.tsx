'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const DOMAINS = [
  { value: 'AI & Machine Learning', label: 'AI & Machine Learning' },
  { value: 'Cloud Computing', label: 'Cloud Computing' },
] as const;

const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/D7W6ncYZuih5AZF1pcjTIh?mode=gi_t';

type FormState = {
  participant1Name: string;
  participant1Phone: string;
  participant1Email: string;
  participant1Leader: boolean;
  participant2Name: string;
  participant2Phone: string;
  participant2Email: string;
  collegeName: string;
  domain: '' | (typeof DOMAINS)[number]['value'];
  screenshotUrl: string;
};

const initial: FormState = {
  participant1Name: '',
  participant1Phone: '',
  participant1Email: '',
  participant1Leader: true,
  participant2Name: '',
  participant2Phone: '',
  participant2Email: '',
  collegeName: '',
  domain: '',
  screenshotUrl: '',
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string) {
  return /^\d{10}$/.test(phone);
}

const ACCEPTED_FORMATS = '.jpg,.jpeg,.png';

const NAME_ALLOWED = /^[A-Za-z ]+$/;
function validateName(name: string) {
  const v = name.trim();
  if (!v) return false;
  return NAME_ALLOWED.test(v);
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onTextChange =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setField(key, value as never);
    };

  const onNameChange =
    (key: 'participant1Name' | 'participant2Name' | 'collegeName') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setField(key, value);
      if (value.trim() && !NAME_ALLOWED.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [key]: 'Name cannot contain numbers or special characters.',
        }));
      }
    };

  const onPhoneChange =
    (key: 'participant1Phone' | 'participant2Phone') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const digits = raw.replace(/\D/g, '').slice(0, 10);
      setField(key, digits);
      if (/\D/.test(raw)) {
        setErrors((prev) => ({
          ...prev,
          [key]: 'Phone number must contain only 10 digits.',
        }));
      }
    };

  const onEmailBlur =
    (key: 'participant1Email' | 'participant2Email') => () => {
      const value = form[key].trim();
      if (!value) {
        setErrors((prev) => ({ ...prev, [key]: 'Email is required.' }));
        return;
      }
      if (!validateEmail(value)) {
        setErrors((prev) => ({ ...prev, [key]: 'Enter a valid email address.' }));
      }
    };

  const onPhoneBlur = (key: 'participant1Phone' | 'participant2Phone') => () => {
    const value = form[key];
    if (!value) {
      setErrors((prev) => ({ ...prev, [key]: 'Phone number is required.' }));
      return;
    }
    if (!validatePhone(value)) {
      setErrors((prev) => ({
        ...prev,
        [key]: 'Phone number must contain only 10 digits.',
      }));
    }
  };

  const onNameBlur =
    (key: 'participant1Name' | 'participant2Name' | 'collegeName') => () => {
      const value = form[key].trim();
      if (!value) {
        setErrors((prev) => ({ ...prev, [key]: 'This field is required.' }));
        return;
      }
      if (!validateName(value)) {
        setErrors((prev) => ({
          ...prev,
          [key]: 'Name cannot contain numbers or special characters.',
        }));
      }
    };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['jpg', 'jpeg', 'png'].includes(ext || '')) {
      setErrors((prev) => ({ ...prev, screenshotUrl: 'Only jpg, jpeg, png allowed' }));
      return;
    }
    setErrors((prev) => ({ ...prev, screenshotUrl: undefined }));
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setForm((prev) => ({ ...prev, screenshotUrl: data.url }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, screenshotUrl: (err as Error).message }));
    } finally {
      setUploading(false);
    }
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.participant1Name.trim()) next.participant1Name = 'This field is required.';
    else if (!validateName(form.participant1Name)) next.participant1Name = 'Name cannot contain numbers or special characters.';

    if (!form.participant1Phone.trim()) next.participant1Phone = 'Phone number is required.';
    else if (!validatePhone(form.participant1Phone)) next.participant1Phone = 'Phone number must contain only 10 digits.';

    if (!form.participant1Email.trim()) next.participant1Email = 'Email is required.';
    else if (!validateEmail(form.participant1Email)) next.participant1Email = 'Enter a valid email address.';

    if (!form.participant2Name.trim()) next.participant2Name = 'This field is required.';
    else if (!validateName(form.participant2Name)) next.participant2Name = 'Name cannot contain numbers or special characters.';

    if (!form.participant2Phone.trim()) next.participant2Phone = 'Phone number is required.';
    else if (!validatePhone(form.participant2Phone)) next.participant2Phone = 'Phone number must contain only 10 digits.';

    if (!form.participant2Email.trim()) next.participant2Email = 'Email is required.';
    else if (!validateEmail(form.participant2Email)) next.participant2Email = 'Enter a valid email address.';

    if (!form.collegeName.trim()) next.collegeName = 'This field is required.';
    else if (!validateName(form.collegeName)) next.collegeName = 'Name cannot contain numbers or special characters.';

    if (!form.domain) next.domain = 'Domain selection is required.';

    if (!form.screenshotUrl) next.screenshotUrl = 'Upload Payment Screenshot is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || submitting || uploading || !form.screenshotUrl) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamHeadName: form.participant1Name,
          teamHeadPhone: form.participant1Phone,
          teamHeadEmail: form.participant1Email,
          p2Name: form.participant2Name,
          p2Phone: form.participant2Phone,
          p2Email: form.participant2Email,
          collegeName: form.collegeName,
          domain: form.domain,
          screenshotUrl: form.screenshotUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      setSubmitted(true);
    } catch (err) {
      setErrors((prev) => ({ ...prev, participant1Name: (err as Error).message }));
    } finally {
      setSubmitting(false);
    }
  };

  const allRequiredValid = useMemo(() => {
    return (
      validateName(form.participant1Name) &&
      validatePhone(form.participant1Phone) &&
      validateEmail(form.participant1Email) &&
      validateName(form.participant2Name) &&
      validatePhone(form.participant2Phone) &&
      validateEmail(form.participant2Email) &&
      validateName(form.collegeName) &&
      !!form.domain
    );
  }, [
    form.collegeName,
    form.domain,
    form.participant1Email,
    form.participant1Name,
    form.participant1Phone,
    form.participant2Email,
    form.participant2Name,
    form.participant2Phone,
  ]);

  const canSubmit = allRequiredValid && !!form.screenshotUrl && !uploading && !submitting;

  const inputClass = (hasError?: boolean) =>
    [
      'w-full px-4 py-3 rounded-xl bg-black/40 border text-white placeholder-white/40 outline-none transition-all',
      'border-dark-gray/70 focus:border-red focus:ring-1 focus:ring-red/40 focus:shadow-[0_0_24px_rgba(255,0,0,0.14)]',
      hasError ? 'border-red shadow-[0_0_0_1px_rgba(255,0,0,0.35)]' : '',
    ].join(' ');

  const sectionTitleClass =
    'font-heading font-bold text-xl text-white border-l-2 border-red pl-4';

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl bg-dark-gray/70 border border-dark-gray/60 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)]"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full border-2 border-red shadow-[0_0_24px_rgba(255,0,0,0.22)] flex items-center justify-center">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              </div>
              <h1 className="font-heading text-3xl font-bold text-white text-center mb-2">
                Registration Successful
              </h1>
              <p className="text-white/70 text-center mb-8">
                Your team has been submitted. Join the official WhatsApp group for updates.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={WHATSAPP_GROUP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-black text-white border-2 border-red shadow-[0_0_20px_rgba(255,0,0,0.16)] hover:shadow-[0_0_30px_rgba(255,0,0,0.26)] transition-shadow"
                >
                  <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M16 3C9.1 3 3.5 8.4 3.5 15.1c0 2.6.9 5.1 2.4 7.1L4.6 28.8l6.9-1.2c1.4.7 3 .9 4.6.9 6.9 0 12.5-5.4 12.5-12.1S22.9 3 16 3Z"
                      stroke="#ffffff"
                      strokeWidth="2"
                      opacity="0.9"
                    />
                    <path
                      d="M22.4 18.7c-.3-.1-1.9-.9-2.2-1-.3-.1-.6-.1-.8.2-.2.3-.9 1-1.1 1.2-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.5-1.5-.9-.8-1.6-1.7-1.8-2-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.6.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.8-1.9-1.1-2.6-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.5.1-.7.4-.2.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.1.1-1.3-.1-.2-.3-.2-.6-.3Z"
                      fill="#ffffff"
                      opacity="0.9"
                    />
                  </svg>
                  <span className="font-heading font-bold">Join WhatsApp Group</span>
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-black text-white border-2 border-red hover:shadow-[0_0_30px_rgba(255,0,0,0.18)] transition-shadow"
                >
                  Back to Home
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="font-heading text-3xl font-bold text-white mb-2">
                Registration
              </h1>
              <p className="text-white/70 mb-8">
                Fill all details and upload the payment screenshot to submit.
              </p>

              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-dark-gray/70 border border-dark-gray/60 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)] space-y-8"
              >
                <section className="space-y-5">
                  <h2 className={sectionTitleClass}>Team Details</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-white/80 mb-1">Participant 1 Name</label>
                      <input
                        type="text"
                        value={form.participant1Name}
                        onChange={onNameChange('participant1Name')}
                        onBlur={onNameBlur('participant1Name')}
                        className={inputClass(!!errors.participant1Name)}
                        placeholder="Full name"
                        autoComplete="name"
                      />
                      {errors.participant1Name && (
                        <p className="mt-2 text-sm text-white/90">{errors.participant1Name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-white/80 mb-1">Participant 1 Phone Number</label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        value={form.participant1Phone}
                        onChange={onPhoneChange('participant1Phone')}
                        onBlur={onPhoneBlur('participant1Phone')}
                        className={inputClass(!!errors.participant1Phone)}
                        placeholder="10-digit number"
                        autoComplete="tel"
                      />
                      {errors.participant1Phone && (
                        <p className="mt-2 text-sm text-white/90">{errors.participant1Phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-white/80 mb-1">Participant 1 Email</label>
                      <input
                        type="email"
                        value={form.participant1Email}
                        onChange={onTextChange('participant1Email')}
                        onBlur={onEmailBlur('participant1Email')}
                        className={inputClass(!!errors.participant1Email)}
                        placeholder="name@email.com"
                        autoComplete="email"
                      />
                      {errors.participant1Email && (
                        <p className="mt-2 text-sm text-white/90">{errors.participant1Email}</p>
                      )}
                    </div>

                    <div>
                      <label className="inline-flex items-center gap-3 text-white/85 select-none">
                        <input
                          type="checkbox"
                          checked={form.participant1Leader}
                          onChange={(e) => setField('participant1Leader', e.target.checked)}
                          className="w-5 h-5 accent-red"
                        />
                        Mark as Team Leader
                      </label>
                    </div>
                  </div>

                  <div className="h-px bg-dark-gray/70" />

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-white/80 mb-1">Participant 2 Name</label>
                      <input
                        type="text"
                        value={form.participant2Name}
                        onChange={onNameChange('participant2Name')}
                        onBlur={onNameBlur('participant2Name')}
                        className={inputClass(!!errors.participant2Name)}
                        placeholder="Full name"
                        autoComplete="name"
                      />
                      {errors.participant2Name && (
                        <p className="mt-2 text-sm text-white/90">{errors.participant2Name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-white/80 mb-1">Participant 2 Phone Number</label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        value={form.participant2Phone}
                        onChange={onPhoneChange('participant2Phone')}
                        onBlur={onPhoneBlur('participant2Phone')}
                        className={inputClass(!!errors.participant2Phone)}
                        placeholder="10-digit number"
                        autoComplete="tel"
                      />
                      {errors.participant2Phone && (
                        <p className="mt-2 text-sm text-white/90">{errors.participant2Phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-white/80 mb-1">Participant 2 Email</label>
                      <input
                        type="email"
                        value={form.participant2Email}
                        onChange={onTextChange('participant2Email')}
                        onBlur={onEmailBlur('participant2Email')}
                        className={inputClass(!!errors.participant2Email)}
                        placeholder="name@email.com"
                        autoComplete="email"
                      />
                      {errors.participant2Email && (
                        <p className="mt-2 text-sm text-white/90">{errors.participant2Email}</p>
                      )}
                    </div>
                  </div>
                </section>

                <section className="space-y-5">
                  <h2 className={sectionTitleClass}>College & Domain</h2>

                  <div>
                    <label className="block text-sm text-white/80 mb-1">College Name</label>
                    <input
                      type="text"
                      value={form.collegeName}
                      onChange={onNameChange('collegeName')}
                      onBlur={onNameBlur('collegeName')}
                      className={inputClass(!!errors.collegeName)}
                      placeholder="Bharatesh College of Computer Applications"
                    />
                    {errors.collegeName && (
                      <p className="mt-2 text-sm text-white/90">{errors.collegeName}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-white/80 mb-3">Domain Selection</p>
                    <div className="space-y-3">
                      {DOMAINS.map((d) => {
                        const checked = form.domain === d.value;
                        return (
                          <label
                            key={d.value}
                            className={[
                              'flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-all',
                              checked
                                ? 'border-red shadow-[0_0_24px_rgba(255,0,0,0.12)] bg-black/35'
                                : 'border-dark-gray/70 bg-black/25 hover:border-red/70',
                            ].join(' ')}
                          >
                            <input
                              type="radio"
                              name="domain"
                              value={d.value}
                              checked={checked}
                              onChange={() => setField('domain', d.value)}
                              className="w-4 h-4 accent-red"
                            />
                            <span className="text-white font-medium">{d.label}</span>
                          </label>
                        );
                      })}
                    </div>
                    {errors.domain && <p className="mt-2 text-sm text-white/90">{errors.domain}</p>}
                  </div>
                </section>

                <motion.section
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-5"
                >
                  <h2 className={sectionTitleClass}>Registration Payment</h2>

                  <div className="rounded-2xl border-2 border-red bg-white p-5 sm:p-6 shadow-[0_0_28px_rgba(255,0,0,0.18)]">
                    <div className="text-center space-y-2">
                      <p className="text-sm font-semibold text-black">
                        College Name: <span className="font-bold">{form.collegeName.trim() || '—'}</span>
                      </p>
                      <p className="text-sm font-semibold text-black">
                        Selected Domain: <span className="font-bold">{form.domain || '—'}</span>
                      </p>
                    </div>

                    <div className="mt-5 flex flex-col items-center">
                      <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-2xl border border-red/70 shadow-[0_0_18px_rgba(255,0,0,0.18)] overflow-hidden bg-white p-2 flex items-center justify-center">
                        <img
                          src="/images/payment.jpeg"
                          alt="UPI Payment QR Code"
                          className="max-w-full max-h-full object-contain w-full h-full"
                        />
                      </div>
                      <p className="mt-3 text-black font-semibold">
                        Scan and pay ₹500 per team.
                      </p>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-semibold text-black mb-2 text-center">
                        Upload Payment Screenshot (Required)
                      </label>
                      <p className="text-xs text-black/70 text-center mb-3">Accepted formats: jpg, jpeg, png</p>

                      <div className="flex flex-col items-center gap-2">
                        <input
                          type="file"
                          accept={ACCEPTED_FORMATS}
                          onChange={handleFile}
                          disabled={uploading}
                          className="w-full max-w-md text-black/80 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-red file:bg-white file:text-black file:font-semibold file:hover:shadow-[0_0_18px_rgba(255,0,0,0.18)]"
                        />

                        {uploading && (
                          <p className="text-sm text-black/70">Uploading…</p>
                        )}
                        {form.screenshotUrl && !uploading && (
                          <p className="text-sm text-black/80 font-semibold">Screenshot uploaded.</p>
                        )}
                        {errors.screenshotUrl && (
                          <p className="text-sm text-black/80 font-semibold">{errors.screenshotUrl}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.section>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={[
                    'w-full py-4 rounded-xl bg-black text-white border-2 border-red font-heading font-bold text-lg transition-all',
                    'shadow-[0_0_20px_rgba(255,0,0,0.14)] hover:shadow-[0_0_30px_rgba(255,0,0,0.22)]',
                    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none',
                  ].join(' ')}
                >
                  {submitting ? 'Submitting…' : 'Submit Registration'}
                </button>
              </form>

              <p className="mt-6 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-black text-white border-2 border-red hover:shadow-[0_0_28px_rgba(255,0,0,0.18)] transition-shadow"
                >
                  Back to Home
                </Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
