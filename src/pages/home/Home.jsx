// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import {
  ArrowRight,
  BarChart3,
  Users,
  Building2,
  Lock,
  Target,
  ClipboardCheck,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  FileText,
  GraduationCap,
  Layers3,
  Landmark,
  CircleHelp,
} from 'lucide-react';
import Logo from '/pms_logo.jpg';

const GREEN = '#0B5C35';
const GREEN_DARK = '#084528';

const HomePage = () => {
  const { isAuthenticated, profile } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDashboardRedirect = () => {
    navigate(isAuthenticated ? '/dashboard' : '/login');
  };

  const roleLabel =
    profile?.pms_role === 'officer'
      ? 'Staff'
      : profile?.pms_role
        ? profile.pms_role.replace(/_/g, ' ')
        : 'Portal';

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navigationLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About PMS', href: '#about' },
    { label: 'How It Works', href: '#workflow' },
    { label: 'Features', href: '#features' },
    { label: 'Support', href: '#support' },
  ];

  const capabilities = [
    {
      icon: Target,
      title: 'Clear Performance Objectives',
      description:
        'Establish clear expectations and align individual responsibilities with departmental and organisational priorities.',
      number: '01',
    },
    {
      icon: BarChart3,
      title: 'Performance Monitoring',
      description:
        'Track assigned deliverables, monitor progress against targets, and support evidence-based performance reviews.',
      number: '02',
    },
    {
      icon: Users,
      title: 'Structured Reviews',
      description:
        'Support staff and supervisors through a coordinated performance review process with defined responsibilities.',
      number: '03',
    },
    {
      icon: TrendingUp,
      title: 'Continuous Improvement',
      description:
        'Use performance insights, feedback, and development opportunities to strengthen individual and organisational results.',
      number: '04',
    },
    {
      icon: Building2,
      title: 'MDA-Level Coordination',
      description:
        'Provide a common digital framework for coordinating performance activities across ministries, departments, and agencies.',
      number: '05',
    },
    {
      icon: ShieldCheck,
      title: 'Accountability and Oversight',
      description:
        'Support appropriate oversight through documented activities, review workflows, and authorised access to information.',
      number: '06',
    },
  ];

  const workflowSteps = [
    {
      icon: ClipboardCheck,
      title: 'Plan',
      description:
        'Set performance objectives, agree on expected deliverables, and establish measurable targets.',
    },
    {
      icon: TrendingUp,
      title: 'Track',
      description:
        'Monitor progress, update task status, and document evidence of work completed.',
    },
    {
      icon: FileText,
      title: 'Review',
      description:
        'Assess achievements against agreed expectations and participate in structured reviews.',
    },
    {
      icon: GraduationCap,
      title: 'Develop',
      description:
        'Identify improvement areas, provide feedback, and support professional development.',
    },
  ];

  const principles = [
    {
      icon: ShieldCheck,
      title: 'Integrity',
      description:
        'Encouraging accurate records, responsible information handling, and professional conduct.',
    },
    {
      icon: CheckCircle2,
      title: 'Fairness',
      description:
        'Promoting clear expectations and consistent assessment against agreed performance criteria.',
    },
    {
      icon: Layers3,
      title: 'Alignment',
      description:
        'Connecting individual responsibilities with departmental and wider public service priorities.',
    },
    {
      icon: BarChart3,
      title: 'Results',
      description:
        'Keeping attention on measurable outcomes, service delivery, and continuous improvement.',
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-semibold text-slate-800 antialiased">
      {/* Main navigation */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm shadow-slate-900/[0.02] backdrop-blur-md"
      >
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          <a
            href="#home"
            onClick={closeMobileMenu}
            className="flex min-w-0 items-center gap-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            aria-label="Abia State PMS home"
          >
            <img
              src={Logo}
              alt="Abia State PMS"
              className="h-11 w-auto max-w-[145px] object-contain sm:h-12"
            />
          </a>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 lg:flex xl:gap-8"
          >
            {navigationLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-semibold text-slate-600 transition-colors hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleDashboardRedirect}
              className="min-h-10 hidden lg:inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B5C35] px-3.5 py-2.5 text-xs font-bold text-white shadow-sm transition duration-200 hover:bg-[#084528] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 active:scale-[0.98] sm:px-5 sm:text-sm"
            >
              {isAuthenticated ? 'Dashboard' : 'Sign In'}
              <ArrowRight size={15} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 lg:hidden"
            >
              {mobileMenuOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-slate-100 bg-white px-5 py-3 shadow-lg lg:hidden"
          >
            {navigationLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="flex items-center justify-between border-b border-slate-100 py-3.5 text-sm font-semibold text-slate-700 last:border-0 hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                {item.label}
                <ChevronRight size={16} aria-hidden="true" />
              </a>
            ))}
          </motion.nav>
        )}
      </motion.header>

      <main>
        {/* Hero section */}
        <section
          id="home"
          className="relative isolate scroll-mt-24 overflow-hidden bg-gradient-to-br from-white via-emerald-50/50 to-slate-100"
        >
          {/* Decorative background elements */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 -z-10 h-[420px] w-[420px] rounded-full bg-emerald-200/25 blur-3xl sm:h-[560px] sm:w-[560px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[380px] w-[380px] rounded-full bg-amber-100/35 blur-3xl"
          />

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8">
            {/* Hero copy */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative z-10 max-w-2xl"
            >
              <h1 className="max-w-2xl text-4xl font-semibold leading-[1.12] tracking-[-0.045em] text-slate-800 sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.25rem]">
                Driving Better Performance in
                <span className="mt-2 block text-[#0B5C35]">
                  Abia State Public Service.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                A digital platform designed to support clear performance
                objectives, track progress, strengthen accountability, and
                promote continuous improvement across Abia State's public
                service.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={handleDashboardRedirect}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0B5C35] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-950/15 transition duration-200 hover:-translate-y-0.5 hover:bg-[#084528] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 active:translate-y-0"
                >
                  {isAuthenticated ? 'Go to Dashboard' : 'Access Portal'}
                  <ArrowRight size={17} aria-hidden="true" />
                </button>

                <a
                  href="#about"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white/90 px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-white hover:text-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                >
                  Discover the System
                  <ChevronRight size={17} aria-hidden="true" />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck
                    size={16}
                    className="text-emerald-800"
                    aria-hidden="true"
                  />
                  Authorised access
                </span>
                <span className="inline-flex items-center gap-2">
                  <Target
                    size={16}
                    className="text-emerald-800"
                    aria-hidden="true"
                  />
                  Results-oriented
                </span>
                <span className="inline-flex items-center gap-2">
                  <Users
                    size={16}
                    className="text-emerald-800"
                    aria-hidden="true"
                  />
                  People-focused
                </span>
              </div>
            </motion.div>

            {/* Hero visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="relative mx-auto w-full max-w-xl lg:max-w-none"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2rem] bg-emerald-900/[0.04] blur-xl"
              />

              <div className="relative overflow-hidden rounded-2xl border border-white bg-white p-3 shadow-2xl shadow-slate-900/10 sm:rounded-3xl sm:p-5">
                <div className="relative flex min-h-[330px] flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-[#084528] via-[#0B5C35] to-[#14734A] p-6 text-white sm:min-h-[390px] sm:rounded-2xl sm:p-8">
                  {/* Subtle watermark */}
                  <img
                    src="/abia.png"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-14 top-10 w-[290px] select-none object-contain opacity-[0.10] sm:-right-10 sm:w-[370px]"
                  />

                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-100 sm:text-xs">
                        ABIA STATE GOVERNMENT
                      </span>
                      <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                        Performance
                        <br />
                        in Focus.
                      </h2>
                      <p className="mt-3 max-w-xs text-xs leading-6 text-emerald-50/90 sm:text-sm">
                        Clear goals. Measurable progress. Better public
                        service outcomes.
                      </p>
                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm sm:h-14 sm:w-14">
                      <Landmark size={26} aria-hidden="true" />
                    </div>
                  </div>

                  <div className="relative z-10 mt-10 space-y-3">
                    <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
                          <Target size={20} aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold">
                            Define objectives
                          </p>
                          <p className="mt-1 text-xs leading-5 text-emerald-50/80">
                            Establish clear expectations and deliverables.
                          </p>
                        </div>
                        <CheckCircle2
                          size={19}
                          className="shrink-0 text-emerald-200"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
                          <BarChart3 size={20} aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold">
                            Monitor performance
                          </p>
                          <p className="mt-1 text-xs leading-5 text-emerald-50/80">
                            Review progress and measure results.
                          </p>
                        </div>
                        <CheckCircle2
                          size={19}
                          className="shrink-0 text-emerald-200"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
                          <TrendingUp size={20} aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold">
                            Improve outcomes
                          </p>
                          <p className="mt-1 text-xs leading-5 text-emerald-50/80">
                            Use feedback to support better service delivery.
                          </p>
                        </div>
                        <CheckCircle2
                          size={19}
                          className="shrink-0 text-emerald-200"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Purpose and value proposition */}
        <section
          id="about"
          className="scroll-mt-24 border-b border-slate-100 bg-white px-5 py-16 sm:py-20 lg:px-8 lg:py-24"
        >
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl">
                Making performance management more
                <span className="text-[#0B5C35]"> purposeful.</span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                Effective public service depends on clear responsibilities,
                consistent performance reviews, and a shared commitment to
                delivering results.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                The Abia State Performance Management System provides a
                digital environment to support these processes and help
                authorised personnel manage performance activities in a more
                coordinated and transparent way.
              </p>

              <a
                href="#workflow"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 transition hover:gap-3 hover:text-emerald-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                Understand the process
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 transition duration-200 hover:border-emerald-200 hover:bg-emerald-50/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm ring-1 ring-slate-200/70">
                  <Target size={23} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-base font-extrabold text-slate-900">
                  Clear expectations
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Help personnel understand their responsibilities, targets,
                  and expected deliverables.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 transition duration-200 hover:border-emerald-200 hover:bg-emerald-50/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm ring-1 ring-slate-200/70">
                  <BarChart3 size={23} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-base font-extrabold text-slate-900">
                  Measurable progress
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Support monitoring and assessment against agreed objectives
                  and performance indicators.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 transition duration-200 hover:border-emerald-200 hover:bg-emerald-50/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm ring-1 ring-slate-200/70">
                  <Users size={23} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-base font-extrabold text-slate-900">
                  Constructive feedback
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Encourage meaningful conversations about performance,
                  strengths, and areas for improvement.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 transition duration-200 hover:border-emerald-200 hover:bg-emerald-50/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm ring-1 ring-slate-200/70">
                  <TrendingUp size={23} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-base font-extrabold text-slate-900">
                  Better service delivery
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Focus on continuous improvement and outcomes that support
                  organisational objectives.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Capabilities */}
        <section
          id="features"
          className="scroll-mt-24 bg-slate-50 px-5 py-16 sm:py-20 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
            >
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Built around better performance
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Practical capabilities to support planning, monitoring,
                reviews, and accountability across the public service.
              </p>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-900/[0.05] sm:p-7"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#0B5C35] transition-colors group-hover:bg-[#0B5C35] group-hover:text-white">
                        <Icon size={23} aria-hidden="true" />
                      </div>
                      <span className="text-xs font-bold tracking-[0.12em] text-slate-300">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="mt-6 text-base font-extrabold text-slate-900 sm:text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>

                    <div
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-1 w-0 bg-[#0B5C35] transition-all duration-300 group-hover:w-full"
                    />
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section
          id="workflow"
          className="scroll-mt-24 overflow-hidden bg-white px-5 py-16 sm:py-20 lg:px-8 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                From objectives to outcomes
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                A structured approach that connects planning, ongoing
                monitoring, formal reviews, and professional development.
              </p>
            </motion.div>

            <div className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
              <div
                aria-hidden="true"
                className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-emerald-100 lg:block"
              />

              {workflowSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.article 
                    key={step.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.15 }}
                    className="relative text-center"
                  >
                    <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-800 shadow-md shadow-emerald-900/[0.05]">
                      <Icon size={25} aria-hidden="true" />
                    </div>

                    <span className="mt-5 inline-block text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-800">
                      Step 0{index + 1}
                    </span>

                    <h3 className="mt-2 text-lg font-extrabold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Governance principles */}
        <section className="relative overflow-hidden bg-[#084528] px-5 py-16 text-white sm:py-20 lg:px-8 lg:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/[0.08]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/[0.08]"
          />

          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  A culture of responsibility and results.
                </h2>

                <p className="mt-5 text-sm leading-7 text-emerald-50/80 sm:text-base sm:leading-8">
                  Performance management works best when expectations are
                  understood, assessments are consistent, and improvement
                  remains a shared responsibility.
                </p>

                <button
                  type="button"
                  onClick={handleDashboardRedirect}
                  className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#084528] transition hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#084528]"
                >
                  {isAuthenticated ? 'Open Dashboard' : 'Access the Portal'}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                {principles.map((principle) => {
                  const Icon = principle.icon;

                  return (
                    <article
                      key={principle.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition duration-200 hover:border-white/20 hover:bg-white/[0.09] sm:p-6"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-emerald-200">
                        <Icon size={22} aria-hidden="true" />
                      </div>

                      <h3 className="mt-4 text-base font-bold">
                        {principle.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-emerald-50/75">
                        {principle.description}
                      </p>
                    </article>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Secure access call to action */}
        <section className="bg-slate-50 px-5 py-16 sm:py-20 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/[0.04] sm:rounded-3xl"
          >
            <div className="grid lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="p-7 sm:p-10 lg:p-12">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                  <Lock size={23} aria-hidden="true" />
                </div>

                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                  Your performance workspace awaits.
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                  Sign in with your authorised credentials to access your
                  assigned objectives, performance activities, reviews, and
                  other features available to your role.
                </p>

                <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-500">
                  <ShieldCheck
                    size={16}
                    className="mt-0.5 shrink-0 text-emerald-800"
                    aria-hidden="true"
                  />
                  <p>
                    Access to the PMS is subject to your account permissions
                    and assigned responsibilities.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 bg-slate-50 p-7 sm:p-10 lg:h-full lg:border-l lg:border-t-0 lg:p-8">
                <button
                  type="button"
                  onClick={handleDashboardRedirect}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0B5C35] px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#084528] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                >
                  {isAuthenticated ? 'Go to Dashboard' : 'Sign In Securely'}
                  <ArrowRight size={17} aria-hidden="true" />
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                  Need assistance accessing your account?
                </p>

                <a
                  href="#support"
                  className="mt-1 inline-flex w-full items-center justify-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                >
                  View support information
                  <ChevronRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="support"
        className="scroll-mt-24 border-t border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:gap-12">
            <div>
              <a
                href="#home"
                className="inline-flex rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                aria-label="Return to homepage"
              >
                <img
                  src={Logo}
                  alt="Abia State PMS"
                  className="h-12 w-auto max-w-[170px] object-contain"
                />
              </a>

              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
                Supporting structured performance management and continuous
                improvement across the Abia State public service.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-900">
                Explore
              </h3>

              <ul className="mt-4 space-y-3">
                {navigationLinks.slice(1, 4).map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm text-slate-600 transition hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-900">
                Portal access
              </h3>

              <ul className="mt-4 space-y-3">
                <li>
                  <button
                    type="button"
                    onClick={handleDashboardRedirect}
                    className="text-left text-sm text-slate-600 transition hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                  >
                    {isAuthenticated ? 'My Dashboard' : 'Staff Sign In'}
                  </button>
                </li>
                <li>
                  <a
                    href="#support"
                    className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                  >
                    <CircleHelp size={15} aria-hidden="true" />
                    Support information
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-3 border-t border-slate-100 pt-6 text-xs leading-5 text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Abia State Government. All rights
              reserved.
            </p>
            <p className="max-w-lg sm:text-right">
              Official PMS access is intended for authorised users. Handle
              performance information responsibly.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;