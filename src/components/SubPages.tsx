import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, MapPin, Clock, Phone, Mail } from 'lucide-react';
import { PROJECTS, ProjectItem, SITE_CONFIG, buildWhatsAppUrl } from '../data/siteData';
import { ArrowCircleButton, CasaImage, SectionLabel } from './ui/CasaPrimitives';

export const ProjectsPage: React.FC<{
  onSelectProject: (slug: string) => void;
  onBackHome: () => void;
}> = ({ onSelectProject, onBackHome }) => {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Modular Kitchen', 'Wardrobes', 'Interior Woodwork', 'Renovation'];

  const filteredProjects =
    filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="flex w-full flex-col items-center bg-[#101010] px-6 pt-36 pb-24 max-[809px]:px-4 max-[809px]:pt-28 max-[809px]:pb-16">
      <div className="flex w-full max-w-[1280px] flex-col gap-16">
        {/* Page Heading */}
        <div className="flex flex-col gap-6 border-b border-[#e1e0cc]/15 pb-12">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex w-fit cursor-pointer items-center gap-2 text-[13px] text-[#e1e0cc]/70 transition-colors hover:text-[#e1e0cc]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to home</span>
          </button>

          <SectionLabel>SELECTED PROJECTS*</SectionLabel>
          <h1 className="casa-h2 max-w-[18ch]">
            Bespoke modular kitchens and residential woodwork across Karachi.
          </h1>

          {/* Interactive Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {categories.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`min-h-[40px] cursor-pointer rounded-full border px-4 py-2 text-[13px] transition-all duration-200 whitespace-nowrap shrink-0 ${
                    active
                      ? 'border-[#e1e0cc] bg-[#e1e0cc] text-[#101010]'
                      : 'border-[#e1e0cc]/20 bg-transparent text-[#e1e0cc]/80 hover:border-[#e1e0cc]/50 hover:text-[#e1e0cc]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Two-Image Editorial Project Grid matching Casa Interior /projects */}
        <div className="flex flex-col gap-24 max-[809px]:gap-16">
          {filteredProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-8 border-b border-[#e1e0cc]/15 pb-16 last:border-b-0"
            >
              {/* Two-image editorial grid */}
              <div className="grid grid-cols-12 gap-6 max-[809px]:grid-cols-1 max-[809px]:gap-4">
                <button
                  type="button"
                  onClick={() => onSelectProject(project.slug)}
                  className="group col-span-8 cursor-pointer overflow-hidden rounded-[24px] bg-[#101010] aspect-[16/10] max-[809px]:col-span-1"
                >
                  <CasaImage
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => onSelectProject(project.slug)}
                  className="group col-span-4 cursor-pointer overflow-hidden rounded-[24px] bg-[#101010] aspect-[4/5] max-[809px]:col-span-1 max-[809px]:aspect-[16/10]"
                >
                  <CasaImage
                    src={project.secondaryImage}
                    alt={`${project.title} craft detail`}
                    className="h-full w-full"
                    imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </button>
              </div>

              {/* Project Metadata & Link */}
              <div className="flex flex-row items-end justify-between gap-8 max-[1199px]:flex-col max-[1199px]:items-start">
                <div className="flex flex-col gap-4">
                  <h2 className="casa-h3 text-[#e1e0cc]">{project.title}</h2>
                  <div className="grid grid-cols-3 gap-10 max-[809px]:grid-cols-1 max-[809px]:gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="casa-label text-[#e1e0cc]/50">CATEGORY</span>
                      <span className="casa-body text-[#e1e0cc]">{project.category}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="casa-label text-[#e1e0cc]/50">SCOPE</span>
                      <span className="casa-body text-[#e1e0cc]/85">
                        {project.scope.slice(0, 3).join(' · ')}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="casa-label text-[#e1e0cc]/50">LOCATION</span>
                      <span className="casa-body text-[#e1e0cc]">
                        {project.location} · <span className="tabular-nums">{project.year}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <ArrowCircleButton
                  label={project.ctaLabel}
                  onClick={() => onSelectProject(project.slug)}
                  variant="light"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProjectDetailPage: React.FC<{
  slug: string;
  onSelectProject: (slug: string) => void;
  onBackToProjects: () => void;
}> = ({ slug, onSelectProject, onBackToProjects }) => {
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project: ProjectItem = currentIndex >= 0 ? PROJECTS[currentIndex] : PROJECTS[0];
  const nextProject: ProjectItem = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <div className="flex w-full flex-col items-center bg-[#101010] px-6 pt-36 pb-24 max-[809px]:px-4 max-[809px]:pt-28 max-[809px]:pb-16">
      <div className="flex w-full max-w-[1280px] flex-col gap-20">
        {/* Back Nav */}
        <button
          type="button"
          onClick={onBackToProjects}
          className="inline-flex w-fit cursor-pointer items-center gap-2 text-[13px] text-[#e1e0cc]/70 transition-colors hover:text-[#e1e0cc]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All projects</span>
        </button>

        {/* Main Split Layout: Sticky Info (Left) + Architectural Gallery (Right) */}
        <div className="flex flex-row items-start gap-16 max-[1199px]:flex-col max-[1199px]:gap-12">
          {/* Left Sticky Project Specifications */}
          <div className="w-[38%] min-[1200px]:sticky min-[1200px]:top-28 max-[1199px]:w-full">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <SectionLabel>{project.category.toUpperCase()}*</SectionLabel>
                <h1 className="casa-h2">{project.title}</h1>
              </div>

              <div className="flex flex-col gap-6 border-t border-[#e1e0cc]/15 pt-6">
                <div className="flex flex-col gap-1.5">
                  <span className="casa-label text-[#e1e0cc]/50">DESCRIPTION</span>
                  <p className="casa-body text-[#e1e0cc]/85">{project.description}</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="casa-label text-[#e1e0cc]/50">FOCUS</span>
                  <p className="casa-body text-[#e1e0cc]">{project.scope.join(' · ')}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <span className="casa-label text-[#e1e0cc]/50">LOCATION</span>
                    <p className="casa-body text-[#e1e0cc]">{project.location}</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="casa-label text-[#e1e0cc]/50">YEAR</span>
                    <p className="casa-body tabular-nums text-[#e1e0cc]">{project.year}</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="casa-label text-[#e1e0cc]/50">DIMENSIONS</span>
                    <p className="casa-body text-[#e1e0cc]">{project.dimensions}</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="casa-label text-[#e1e0cc]/50">TIMELINE</span>
                    <p className="casa-body text-[#e1e0cc]">{project.duration}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="casa-label text-[#e1e0cc]/50">MATERIALS</span>
                  <ul className="flex flex-col gap-1.5 text-[14px] text-[#e1e0cc]/80">
                    {project.materials.map((m) => (
                      <li key={m}>· {m}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <ArrowCircleButton
                  label="Request a similar layout"
                  href={buildWhatsAppUrl(
                    `Hello Orchid Kitchen and Interior, I would like an estimate for a project similar to "${project.title}" (${project.location}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                />
              </div>
            </div>
          </div>

          {/* Right Full-Bleed Architectural Visuals */}
          <div className="flex flex-1 flex-col gap-6 max-[1199px]:w-full">
            <div className="overflow-hidden rounded-[24px] bg-[#101010] aspect-[4/3]">
              <CasaImage src={project.image} alt={project.title} className="h-full w-full" />
            </div>
            <div className="overflow-hidden rounded-[24px] bg-[#101010] aspect-[4/3]">
              <CasaImage
                src={project.secondaryImage}
                alt={`${project.title} material finish`}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>

        {/* Next Project Banner matching Casa Interior Detail Footer */}
        <button
          type="button"
          onClick={() => onSelectProject(nextProject.slug)}
          className="group relative flex min-h-[280px] w-full cursor-pointer items-end justify-between overflow-hidden rounded-[32px] border border-[#e1e0cc]/15 bg-[#101010] p-10 text-left max-[809px]:p-6"
        >
          <div className="absolute inset-0 z-0 opacity-45">
            <CasaImage
              src={nextProject.image}
              alt={nextProject.title}
              className="h-full w-full"
              imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(16,16,16,0.92) 0%, rgba(16,16,16,0.55) 100%)',
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col gap-2">
            <span className="casa-label text-[#b7a586]">NEXT PROJECT</span>
            <h2 className="casa-h2 text-[#e1e0cc]">{nextProject.title}</h2>
          </div>

          <span className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#e1e0cc]/35 bg-[#e1e0cc]/10 text-[#e1e0cc] transition-all duration-300 group-hover:bg-[#e1e0cc] group-hover:text-[#101010]">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </button>
      </div>
    </div>
  );
};

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  location?: string;
  message?: string;
}

export const ContactPage: React.FC<{
  preselectedService?: string;
  onBackHome: () => void;
}> = ({ preselectedService, onBackHome }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState(
    preselectedService ? `Interested in: ${preselectedService}. ` : ''
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const validateClient = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!firstName.trim()) nextErrors.firstName = 'First name is required.';
    if (!lastName.trim()) nextErrors.lastName = 'Last name is required.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (phone.trim() && !/^[+\d\s()-]{7,20}$/.test(phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }
    if (!location.trim()) nextErrors.location = 'Project location in Karachi is required.';
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = 'Please share a brief description (at least 10 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          location,
          budget,
          message,
          serviceInterest: preselectedService,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.fields) setErrors(data.fields);
        setSubmitError(data.error || 'Could not submit inquiry. Please check your entries.');
      } else {
        setSubmittedRef(data.inquiry?.id || 'CONFIRMED');
      }
    } catch {
      setSubmitError(
        'Network error while submitting your inquiry. Please reach us directly on WhatsApp or phone.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center bg-[#101010] px-6 pt-36 pb-24 max-[809px]:px-4 max-[809px]:pt-28 max-[809px]:pb-16">
      <div className="flex w-full max-w-[1280px] flex-col gap-12">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex w-fit cursor-pointer items-center gap-2 text-[13px] text-[#e1e0cc]/70 transition-colors hover:text-[#e1e0cc]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to home</span>
        </button>

        <div className="grid grid-cols-12 gap-8 max-[1199px]:grid-cols-1">
          {/* Left Inquiry Form Panel */}
          <div className="col-span-7 rounded-[32px] border border-[#e1e0cc]/15 bg-[#101010] p-10 max-[809px]:col-span-1 max-[809px]:rounded-[24px] max-[809px]:p-6">
            <div className="flex flex-col gap-4 pb-8">
              <SectionLabel>INQUIRIES*</SectionLabel>
              <h1 className="casa-h2">Let’s create something.</h1>
              <p className="casa-body text-[#e1e0cc]/80">
                Every meaningful kitchen and home begins with a conversation. Tell us about your
                space in Karachi and book an on-site measurement or online estimate.
              </p>
            </div>

            {submittedRef ? (
              <div
                role="status"
                className="flex flex-col gap-5 rounded-[24px] border border-[#e1e0cc]/25 bg-[#1a130e] p-8"
              >
                <div className="flex items-center gap-3 text-[#b7a586]">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="casa-label">INQUIRY RECORDED · REF {submittedRef}</span>
                </div>
                <h2 className="casa-h3 text-[#e1e0cc]">
                  Thank you, {firstName}. Your inquiry has been received.
                </h2>
                <p className="casa-body text-[#e1e0cc]/80">
                  Our Sharafabad studio team will review your requirements for {location} and
                  respond within one working day. For immediate scheduling, message us directly on
                  WhatsApp.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <ArrowCircleButton
                    label="Continue on WhatsApp"
                    href={buildWhatsAppUrl(
                      `Hello Orchid Kitchen and Interior, I just submitted inquiry ${submittedRef} for ${location}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="light"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRef(null);
                      setFirstName('');
                      setLastName('');
                      setEmail('');
                      setPhone('');
                      setLocation('');
                      setBudget('');
                      setMessage('');
                    }}
                    className="cursor-pointer text-[14px] text-[#e1e0cc]/75 underline underline-offset-4 hover:text-[#e1e0cc]"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                {/* Name Row */}
                <div className="grid grid-cols-2 gap-4 max-[809px]:grid-cols-1">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="casa-label text-[#e1e0cc]/70">
                      FIRST NAME *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Ayesha"
                      className="min-h-[46px] rounded-[12px] border border-[#e1e0cc]/20 bg-[#000000]/50 px-4 text-[15px] text-[#e1e0cc] placeholder:text-[#e1e0cc]/35 focus:border-[#e1e0cc] focus:outline-none"
                    />
                    {errors.firstName && (
                      <span className="text-[12px] text-[#f2b8b5]">{errors.firstName}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className="casa-label text-[#e1e0cc]/70">
                      LAST NAME *
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Siddiqui"
                      className="min-h-[46px] rounded-[12px] border border-[#e1e0cc]/20 bg-[#000000]/50 px-4 text-[15px] text-[#e1e0cc] placeholder:text-[#e1e0cc]/35 focus:border-[#e1e0cc] focus:outline-none"
                    />
                    {errors.lastName && (
                      <span className="text-[12px] text-[#f2b8b5]">{errors.lastName}</span>
                    )}
                  </div>
                </div>

                {/* Contact Row */}
                <div className="grid grid-cols-2 gap-4 max-[809px]:grid-cols-1">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="casa-label text-[#e1e0cc]/70">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="min-h-[46px] rounded-[12px] border border-[#e1e0cc]/20 bg-[#000000]/50 px-4 text-[15px] text-[#e1e0cc] placeholder:text-[#e1e0cc]/35 focus:border-[#e1e0cc] focus:outline-none"
                    />
                    {errors.email && (
                      <span className="text-[12px] text-[#f2b8b5]">{errors.email}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="casa-label text-[#e1e0cc]/70">
                      PHONE NUMBER (OPTIONAL)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 0000000"
                      className="min-h-[46px] rounded-[12px] border border-[#e1e0cc]/20 bg-[#000000]/50 px-4 text-[15px] text-[#e1e0cc] placeholder:text-[#e1e0cc]/35 focus:border-[#e1e0cc] focus:outline-none"
                    />
                    {errors.phone && (
                      <span className="text-[12px] text-[#f2b8b5]">{errors.phone}</span>
                    )}
                  </div>
                </div>

                {/* Project Details Row */}
                <div className="grid grid-cols-2 gap-4 max-[809px]:grid-cols-1">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="location" className="casa-label text-[#e1e0cc]/70">
                      PROJECT LOCATION *
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Sharafabad, DHA, PECHS"
                      className="min-h-[46px] rounded-[12px] border border-[#e1e0cc]/20 bg-[#000000]/50 px-4 text-[15px] text-[#e1e0cc] placeholder:text-[#e1e0cc]/35 focus:border-[#e1e0cc] focus:outline-none"
                    />
                    {errors.location && (
                      <span className="text-[12px] text-[#f2b8b5]">{errors.location}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="budget" className="casa-label text-[#e1e0cc]/70">
                      ESTIMATED BUDGET (OPTIONAL)
                    </label>
                    <input
                      id="budget"
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g. PKR 1.2M – 2.5M"
                      className="min-h-[46px] rounded-[12px] border border-[#e1e0cc]/20 bg-[#000000]/50 px-4 text-[15px] text-[#e1e0cc] placeholder:text-[#e1e0cc]/35 focus:border-[#e1e0cc] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="casa-label text-[#e1e0cc]/70">
                    TELL US ABOUT YOUR PROJECT *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Kitchen dimensions, wardrobe needs, finish preferences, or desired timeline..."
                    className="rounded-[12px] border border-[#e1e0cc]/20 bg-[#000000]/50 p-4 text-[15px] text-[#e1e0cc] placeholder:text-[#e1e0cc]/35 focus:border-[#e1e0cc] focus:outline-none"
                  />
                  {errors.message && (
                    <span className="text-[12px] text-[#f2b8b5]">{errors.message}</span>
                  )}
                </div>

                {submitError && (
                  <p role="alert" className="text-[13px] text-[#f2b8b5]">
                    {submitError}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex min-h-[48px] cursor-pointer items-center gap-2.5 rounded-full bg-[#e1e0cc] px-7 py-3 text-[15px] font-medium text-[#101010] transition-colors duration-200 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span>{submitting ? 'Submitting inquiry...' : 'Send inquiry'}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>

                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-[14px] text-[#e1e0cc]/80 underline decoration-[#e1e0cc]/30 underline-offset-4 hover:text-[#e1e0cc]"
                  >
                    <span>Prefer WhatsApp? Chat directly</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right Studio Details Panel */}
          <div className="col-span-5 flex flex-col justify-between gap-8 rounded-[32px] bg-[#450204] p-10 text-[#e1e0cc] max-[1199px]:col-span-1 max-[809px]:rounded-[24px] max-[809px]:p-6">
            <div className="flex flex-col gap-6">
              <span className="casa-label text-[#e1e0cc]/75">{SITE_CONFIG.brandShort}</span>
              <h2 className="casa-h3 text-[#e1e0cc]">
                Spaces built with purpose, precision, and enduring finishes.
              </h2>

              <div className="overflow-hidden rounded-[20px] aspect-[16/10] bg-[#101010]">
                <CasaImage
                  src={SITE_CONFIG.hero.image}
                  alt="Orchid Kitchen and Interior showroom craftsmanship"
                  className="h-full w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-[#e1e0cc]/20 pt-6 text-[14px]">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#b7a586]" />
                <span>{SITE_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#b7a586]" />
                <span>{SITE_CONFIG.contact.timings}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#b7a586]" />
                <div className="flex flex-col gap-1 tabular-nums">
                  <a href={SITE_CONFIG.contact.primaryPhoneHref} className="hover:underline">
                    {SITE_CONFIG.contact.primaryPhone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#b7a586]" />
                <a href={SITE_CONFIG.contact.emailHref} className="hover:underline break-all">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
