
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen overflow-x-hidden bg-white font-sans text-slate-800 antialiased">
      

      {/* Main navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm shadow-slate-900/[0.02] backdrop-blur-md">
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
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#0B5C35] px-3.5 py-2.5 text-xs font-bold text-white shadow-sm transition duration-200 hover:bg-[#084528] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 active:scale-[0.98] sm:px-5 sm:text-sm"
            >
              {isAuthenticated ? 'Dashboard' : 'Sign In'}
              <ArrowRight size={15} aria-hidden="true" />
            </button>

            {isAuthenticated && (
              <span className="hidden text-xs font-medium capitalize text-slate-500 xl:block">
                {roleLabel}
              </span>
            )}

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
          <nav
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
          </nav>
        )}
      </header>

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

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:py-12">
            {/* Hero copy */}
            <div className="relative z-10 max-w-2xl">
              <h1 className="max-w-2xl text-4xl font-black leading-[1.12] tracking-[-0.045em] text-slate-950 sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-[4.25rem]">
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
                  {isAuthenticated ? 'Go to Dashboard' : 'Access the PMS Portal'}
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
            </div>

            {/* Hero visual */}
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
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

              <div className="absolute -bottom-5 -left-2 hidden items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:flex lg:-left-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                  <ShieldCheck size={21} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    Responsible oversight
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    Structured performance processes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Purpose and value proposition */}
        <section
          id="about"
          className="scroll-mt-24 border-b border-slate-100 bg-white px-5 py-16 sm:py-20 lg:px-8 lg:py-24"
        >
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
                About the platform
              </span>

              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
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
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section
          id="features"
          className="scroll-mt-24 bg-slate-50 px-5 py-16 sm:py-20 lg:px-8 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-900 sm:text-xs">
                <Layers3 size={14} aria-hidden="true" />
                A coordinated digital framework
              </span>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Built around better performance
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Practical capabilities to support planning, monitoring,
                reviews, and accountability across the public service.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.number}
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
                  </article>
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
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
                The performance cycle
              </span>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                From objectives to outcomes
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                A structured approach that connects planning, ongoing
                monitoring, formal reviews, and professional development.
              </p>
            </div>

            <div className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
              <div
                aria-hidden="true"
                className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-emerald-100 lg:block"
              />

              {workflowSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article key={step.title} className="relative text-center">
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
                  </article>
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
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
                  Guiding principles
                </span>

                <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
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
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
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
              </div>
            </div>
          </div>
        </section>

        {/* Secure access call to action */}
        <section className="bg-slate-50 px-5 py-16 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/[0.04] sm:rounded-3xl">
            <div className="grid lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="p-7 sm:p-10 lg:p-12">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                  <Lock size={23} aria-hidden="true" />
                </div>

                <h2 className="mt-5 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
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
          </div>
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











// // src/pages/Home.jsx
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../../store/authStore';
// import { 
//   BarChart3, 
//   Users, 
//   ArrowRight, 
//   Building2, 
//   Lock 
// } from 'lucide-react';
// import Logo from '/pms_logo.jpg';

// const HomePage = () => {
//   const { isAuthenticated, profile } = useAuthStore();
//   const navigate = useNavigate();

//   const handleDashboardRedirect = () => {
//     if (!isAuthenticated) {
//       navigate('/login');
//     } else {
//       navigate('/dashboard');
//     }
//   };

//   const roleLabel = profile?.pms_role === 'officer' ? 'STAFF' : profile?.pms_role;

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
//       {/* Top Navbar */}
//       <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
//         <div className="max-w-8xl mx-auto px-6 h-20 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <img src={Logo} alt="Abia State PMS Logo" className="h-12" />
//           </div>

//           <div className="flex items-center gap-4">
//             {isAuthenticated ? (
//               <button
//                 onClick={handleDashboardRedirect}
//                 className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B5C35] hover:bg-[#09482b] text-white rounded-md font-bold text-xs sm:text-sm transition-all shadow-sm"
//               >
//                 Dashboard ({roleLabel || 'Portal'})
//                 <ArrowRight size={16} />
//               </button>
//             ) : (
//               <Link
//                 to="/login"
//                 className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B5C35] hover:bg-[#09482b] text-white rounded-md font-bold text-xs sm:text-sm transition-all shadow-sm"
//               >
//                 Sign In
//                 <ArrowRight size={16} />
//               </Link>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Hero Section with Watermark Background */}
//       <main className="flex-1">
//         {/* Hero Section with Watermark Background */}
//         <section className="relative bg-gradient-to-b from-white via-emerald-50/20 to-slate-100 md:py-20 px-6 border-b border-slate-200 overflow-hidden">
          
//           {/* Hero Watermark Logo (Straight & Upright) */}
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1000] select-none overflow-hidden">
//             <img 
//               src="/abia.png" 
//               alt="Abia State Watermark" 
//               className="w-[450px] md:w-[650px] lg:w-[800px] opacity-[0.12] object-contain"
//             />
//           </div>

//           {/* Hero Content */}
//           <div className="max-w-5xl mx-auto mb-8 md:mb-0 text-center space-y-6 relative z-10">
//             <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
//               Driving Accountability And <br />
//               <span className="text-[#0B5C35]">Excellence in Governance</span>
//             </h1>

//             <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
//               The centralized digital performance ecosystem for Abia State civil servants, department heads, and executive leadership to log assigned deliverables, monitor weighted scorecards, and audit compliance.
//             </p>

//             <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
//               <button
//                 onClick={handleDashboardRedirect}
//                 className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0B5C35] hover:bg-[#09482b] text-white rounded-md font-bold text-xs sm:text-sm transition-all shadow-md active:scale-[0.98]"
//               >
//                 Access Portal
//                 <ArrowRight size={18} />
//               </button>
//               <a
//                 href="#features"
//                 className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-md font-bold text-xs sm:text-sm transition-all shadow-sm"
//               >
//                 Explore System Modules
//               </a>
//             </div>
//           </div>
//         </section>

//         {/* Quick Stats / Highlights Bar */}
//         <section className="bg-white border-b border-slate-200 py-8 px-6">
//           <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
//             <div className="space-y-1">
//               <h3 className="text-2xl md:text-3xl font-black text-[#0B5C35]">100%</h3>
//               <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Digital Task Tracking</p>
//             </div>
//             <div className="space-y-1">
//               <h3 className="text-2xl md:text-3xl font-black text-slate-900">Multi-Tier</h3>
//               <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">HOD & Staff Workflows</p>
//             </div>
//             <div className="space-y-1">
//               <h3 className="text-2xl md:text-3xl font-black text-[#0B5C35]">Weighted</h3>
//               <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Performance Grading</p>
//             </div>
//             <div className="space-y-1">
//               <h3 className="text-2xl md:text-3xl font-black text-slate-900">Secure</h3>
//               <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">State MDA Compliance</p>
//             </div>
//           </div>
//         </section>

//         {/* Core Capabilities Section */}
//         <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
//           <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
//             <h2 className="text-2xl md:text-3xl font-black text-slate-900">System Capabilities</h2>
//             <p className="text-xs sm:text-sm text-slate-500 font-medium">Streamlining workflow evaluation across all MDAs</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-emerald-600/50 ease-in-out duration-500 transition-colors">
//               <div className="w-12 h-12 bg-emerald-50 text-[#0B5C35] rounded-md flex items-center justify-center font-bold">
//                 <BarChart3 size={24} />
//               </div>
//               <h3 className="text-base font-bold text-slate-900">Real-Time Scorecards</h3>
//               <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
//                 Track task submissions, efficiency ratios, quality indexes, and six-month performance trends dynamically via Recharts analytics.
//               </p>
//             </div>

//             <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-emerald-600/50 ease-in-out duration-500 transition-colors">
//               <div className="w-12 h-12 bg-emerald-50 text-[#0B5C35] rounded-md flex items-center justify-center font-bold">
//                 <Users size={24} />
//               </div>
//               <h3 className="text-base font-bold text-slate-900">Role-Based Clearance</h3>
//               <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
//                 Tailored interfaces designed explicitly for Staff officers, Department Heads (HOD), and executive administrative supervisors.
//               </p>
//             </div>

//             <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-emerald-600/50 ease-in-out duration-500 transition-colors">
//               <div className="w-12 h-12 bg-emerald-50 text-[#0B5C35] rounded-md flex items-center justify-center font-bold">
//                 <Building2 size={24} />
//               </div>
//               <h3 className="text-base font-bold text-slate-900">Statewide Compliance</h3>
//               <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
//                 Monitor MDA directory rosters, identify task bottlenecks, and maintain strict adherence to civil service administrative guidelines.
//               </p>
//             </div>
//           </div>
//         </section>

//        {/* Governance & Administrative Standards */}
//         <section className="bg-slate-100/70 border-y border-slate-200 py-20 px-6">
//           <div className="max-w-7xl mx-auto space-y-12">
//             <div className="text-center max-w-xl mx-auto space-y-2">
//               <h2 className="text-2xl md:text-3xl font-black text-slate-900">Administrative Standards</h2>
//               <p className="text-xs sm:text-sm text-slate-500 font-medium">Core pillars guiding state service delivery</p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
//                 <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0B5C35] flex items-center justify-center font-bold text-xs">01</div>
//                 <h4 className="text-sm font-bold text-slate-900">Data Integrity</h4>
//                 <p className="text-xs text-slate-500 leading-relaxed">Eliminating bureaucratic bottlenecks with verified digital records and strict audit trails.</p>
//               </div>

//               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
//                 <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0B5C35] flex items-center justify-center font-bold text-xs">02</div>
//                 <h4 className="text-sm font-bold text-slate-900">Transparent KPIs</h4>
//                 <p className="text-xs text-slate-500 leading-relaxed">Equitable evaluation metrics ensuring every civil servant's contribution is visible and measured.</p>
//               </div>

//               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
//                 <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0B5C35] flex items-center justify-center font-bold text-xs">03</div>
//                 <h4 className="text-sm font-bold text-slate-900">Inter-MDA Synergy</h4>
//                 <p className="text-xs text-slate-500 leading-relaxed">Bridging ministries and departments onto a unified digital framework for seamless collaboration.</p>
//               </div>

//               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
//                 <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0B5C35] flex items-center justify-center font-bold text-xs">04</div>
//                 <h4 className="text-sm font-bold text-slate-900">Executive Oversight</h4>
//                 <p className="text-xs text-slate-500 leading-relaxed">Real-time analytical dashboards providing leadership with actionable intelligence.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Security & Authentication Banner */}
//         <section className="py-20 px-6 max-w-5xl mx-auto text-center space-y-6">
//           <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 text-[#0B5C35] mb-2">
//             <Lock size={24} />
//           </div>
//           <h2 className="text-2xl md:text-3xl font-black text-slate-900">Secure Authorized Access</h2>
//           <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
//             This portal is restricted to accredited Abia State Civil Service personnel. Sign in with your official credentials to access your designated workspace.
//           </p>
//           <div>
//             <button
//               onClick={handleDashboardRedirect}
//               className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0B5C35] hover:bg-[#09482b] text-white rounded-md font-bold text-xs sm:text-sm transition-all shadow-md"
//             >
//               Sign In to Portal
//               <ArrowRight size={16} />
//             </button>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-white border-t border-slate-200 py-8 px-6 text-center text-xs text-slate-500">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
//           <p>© 2026 Abia State Government. All rights reserved.</p>
//           <div className="flex items-center gap-6">
//             <span className="hover:text-slate-800 transition-colors cursor-pointer">Privacy Policy</span>
//             <span className="hover:text-slate-800 transition-colors cursor-pointer">Terms of Service</span>
//             <span className="hover:text-slate-800 transition-colors cursor-pointer">Support Desk</span>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;