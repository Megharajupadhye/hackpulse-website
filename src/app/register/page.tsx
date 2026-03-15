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
  utrNumber: string;
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
  utrNumber: '',
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string) {
  return /^\d{10}$/.test(phone);
}

function validateUtrNumber(utr: string) {
  const trimmed = utr.trim();
  if (!trimmed) return false;
  if (trimmed.length < 10 || trimmed.length > 22) return false;
  if (!/^[A-Z0-9]+$/.test(trimmed)) return false;
  return true;
}

const NAME_ALLOWED = /^[A-Za-z ]+$/;
function validateName(name: string) {
  const v = name.trim();
  if (!v) return false;
  return NAME_ALLOWED.test(v);
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
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

  const onUtrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const filtered = raw.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 22);
    setField('utrNumber', filtered);
    if (raw !== filtered) {
      setErrors((prev) => ({
        ...prev,
        utrNumber: 'UTR must contain only uppercase letters and numbers (10–22 characters).',
      }));
    } else if (filtered && validateUtrNumber(filtered)) {
      setErrors((prev) => ({ ...prev, utrNumber: undefined }));
    }
  };

  const onUtrBlur = () => {
    const value = form.utrNumber.trim();
    if (!value) {
      setErrors((prev) => ({ ...prev, utrNumber: 'UTR Number is required.' }));
      return;
    }
    if (!validateUtrNumber(value)) {
      setErrors((prev) => ({
        ...prev,
        utrNumber: 'UTR must contain only uppercase letters and numbers (10–22 characters).',
      }));
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

    if (!form.utrNumber.trim()) next.utrNumber = 'UTR Number is required.';
    else if (!validateUtrNumber(form.utrNumber)) {
      next.utrNumber = 'UTR must contain only uppercase letters and numbers (10–22 characters).';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || submitting) return;
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
          utrNumber: form.utrNumber,
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
      !!form.domain &&
      validateUtrNumber(form.utrNumber)
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
    form.utrNumber,
  ]);

  const canSubmit = allRequiredValid && !submitting;

  const inputClass = (hasError?: boolean) =>
    [
      'w-full px-4 py-3 rounded-xl bg-black/40 border text-white placeholder-white/40 outline-none transition-all',
      'border-dark-gray/70 focus:border-red focus:ring-1 focus:ring-red/40 focus:shadow-[0_0_24px_rgba(255,0,0,0.14)]',
      hasError ? 'border-red shadow-[0_0_0_1px_rgba(255,0,0,0.35)]' : '',
    ].join(' ');

  const sectionTitleClass =
    'font-heading font-bold text-lg sm:text-xl lg:text-2xl text-white border-l-2 border-red pl-3 sm:pl-4';

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 w-full max-w-full overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto w-full"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key="closed"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl bg-dark-gray/70 border border-dark-gray/60 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.4)] text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full border-2 border-red shadow-[0_0_24px_rgba(255,0,0,0.22)] flex items-center justify-center bg-black/70">
                <span className="text-2xl" aria-hidden="true">
                  🚨
                </span>
              </div>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Registration Closed
            </h1>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Thank you for the overwhelming response to HackPulse 2026.
              <br />
              We have successfully reached the maximum limit of 20 participating teams.
            </p>

            <p className="text-white/80 text-sm sm:text-base mb-4">
              Registrations are now officially closed.
            </p>

            <p className="text-white/60 text-xs sm:text-sm mb-6">
              For queries, please contact the HackPulse organizing team.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-black text-white border-2 border-red hover:shadow-[0_0_30px_rgba(255,0,0,0.18)] transition-shadow"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
