import { useEffect, useRef, useState } from 'react'

const SENSITIVITY = 1.5
function useTypewriter(
  text: string,
  speed = 38,
  startDelay = 600,
) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let intervalId: number | undefined

    const timeoutId = window.setTimeout(() => {
      let index = 0

      intervalId = window.setInterval(() => {
        index += 1

        setDisplayed(text.slice(0, index))

        if (index >= text.length) {
          window.clearInterval(intervalId)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      window.clearTimeout(timeoutId)

      if (intervalId !== undefined) {
        window.clearInterval(intervalId)
      }
    }
  }, [text, speed, startDelay])

  return { displayed, done }
}

function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [menuOpen, setMenuOpen] = useState(false)
    const typewriterText =
  "We design, build and experiment. Ideas become digital experiences here."

  const { displayed, done } = useTypewriter(typewriterText)
    const [showActions, setShowActions] = useState(false)

  const targetTimeRef = useRef(0)
  const isSeekingRef = useRef(false)
  const pendingSeekRef = useRef(false)
  const prevXRef = useRef<number | null>(null)

  const handleCopyEmail = async () => {
  try {
    await navigator.clipboard.writeText('hello@anudeepstudio.co')
  } catch (error) {
    console.error('Failed to copy email:', error)
  }
}

  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    const handleMouseMove = (event: MouseEvent) => {
      const currentX = event.clientX

      // First mouse position: just remember it.
      if (prevXRef.current === null) {
        prevXRef.current = currentX
        return
      }

      const delta = currentX - prevXRef.current
      prevXRef.current = currentX

      // Ignore tiny movements.
      if (delta === 0) return

      // Video duration may not be available yet.
      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        return
      }

      const timeOffset =
        (delta / window.innerWidth) * SENSITIVITY * video.duration

      const baseTime = Number.isFinite(targetTimeRef.current)
        ? targetTimeRef.current
        : video.currentTime

      const targetTime = Math.max(
        0,
        Math.min(video.duration, baseTime + timeOffset),
      )

      targetTimeRef.current = targetTime

      // If the browser is already seeking,
      // don't start another seek immediately.
      // Just remember that a newer target exists.
      if (isSeekingRef.current) {
        pendingSeekRef.current = true
        return
      }

      isSeekingRef.current = true
      video.currentTime = targetTime
    }

    const handleSeeked = () => {
      isSeekingRef.current = false

      // If the mouse moved while the video was seeking,
      // perform the latest requested seek.
      if (pendingSeekRef.current) {
        pendingSeekRef.current = false

        if (
          Number.isFinite(video.duration) &&
          video.duration > 0
        ) {
          const nextTime = Math.max(
            0,
            Math.min(video.duration, targetTimeRef.current),
          )

          isSeekingRef.current = true
          video.currentTime = nextTime
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    video.addEventListener('seeked', handleSeeked)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      video.removeEventListener('seeked', handleSeeked)
    }
  }, [])

    useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowActions(true)
    }, 400)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
            {/* Navbar */}
      <nav className="fixed inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        
        {/* Logo */}
<div className="flex items-center gap-3">

  {/* SA Logo */}
  <div className="flex h-16 w-16 items-center justify-center sm:h-16 sm:w-16">
    <img
      src="/logo.png"
      alt="S&A Studio"
      className="h-full w-full object-contain mix-blend-screen transition-transform duration-300 hover:scale-105"
    />
  </div>

  {/* Brand Name */}
  <div className="flex flex-col leading-none">
    <span
      className="text-[24px] font-medium tracking-tight text-white sm:text-[27px]"
      style={{ fontFamily: 'var(--font-heading)' }}
    >
      S&A
    </span>

    <span className="mt-1 text-[8px] tracking-[0.28em] text-white/60 sm:text-[9px]">
      STUDIO
    </span>
  </div>

</div>

        {/* Desktop Navigation */}
   {/* Desktop Navigation */}
<div className="hidden items-center gap-2 md:flex">

  <a
    href="#labs"
    className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-[18px] text-white backdrop-blur-xl transition-all duration-300 hover:border-white/60 hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
  >
    Labs
  </a>

  <a
    href="#studio"
    className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-[18px] text-white backdrop-blur-xl transition-all duration-300 hover:border-white/60 hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
  >
    Studio
  </a>

  <a
    href="#openings"
    className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-[18px] text-white backdrop-blur-xl transition-all duration-300 hover:border-white/60 hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
  >
    Openings
  </a>

  <a
    href="#shop"
    className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-[18px] text-white backdrop-blur-xl transition-all duration-300 hover:border-white/60 hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
  >
    Shop
  </a>

</div>

        {/* Desktop CTA */}
        <a
  href="#contact"
  className="hidden rounded-full border border-white/40 bg-white/10 px-6 py-3 text-[18px] font-medium text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-black hover:border-white md:block"
>
  Get in touch →
</a>

        {/* Mobile Hamburger */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex flex-col gap-[5px] md:hidden"
        >
          <span
            className={`h-[2px] w-6 bg-white transition-transform duration-300 ${
              menuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />

          <span
            className={`h-[2px] w-6 bg-white transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />

          <span
            className={`h-[2px] w-6 bg-white transition-transform duration-300 ${
              menuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>
            {/* Mobile Navigation Overlay */}
<div
  className={`fixed inset-0 z-[9] flex flex-col items-center justify-center px-8
    bg-black/50 backdrop-blur-xl transition-all duration-500
    ${
      menuOpen
        ? 'pointer-events-auto opacity-100'
        : 'pointer-events-none opacity-0'
    }`}
>
  {/* Navigation Pills */}
  <div className="flex w-full max-w-md flex-col items-center gap-4 pt-24">

    {/* Labs */}
    <a
      href="#labs"
      onClick={() => setMenuOpen(false)}
      className="w-full rounded-full border border-white/30 bg-white/10 px-8 py-5
        text-center text-[28px] font-medium text-white backdrop-blur-xl
        transition-all duration-300 hover:bg-white/20 hover:border-white/60
        hover:scale-[1.02]"
    >
      Labs
    </a>

    {/* Studio */}
    <a
      href="#studio"
      onClick={() => setMenuOpen(false)}
      className="w-full rounded-full border border-white/30 bg-white/10 px-8 py-5
        text-center text-[28px] font-medium text-white backdrop-blur-xl
        transition-all duration-300 hover:bg-white/20 hover:border-white/60
        hover:scale-[1.02]"
    >
      Studio
    </a>

    {/* Openings */}
    <a
      href="#openings"
      onClick={() => setMenuOpen(false)}
      className="w-full rounded-full border border-white/30 bg-white/10 px-8 py-5
        text-center text-[28px] font-medium text-white backdrop-blur-xl
        transition-all duration-300 hover:bg-white/20 hover:border-white/60
        hover:scale-[1.02]"
    >
      Openings
    </a>

    {/* Shop */}
    <a
      href="#shop"
      onClick={() => setMenuOpen(false)}
      className="w-full rounded-full border border-white/30 bg-white/10 px-8 py-5
        text-center text-[28px] font-medium text-white backdrop-blur-xl
        transition-all duration-300 hover:bg-white/20 hover:border-white/60
        hover:scale-[1.02]"
    >
      Shop
    </a>

    {/* Get in touch */}
    <a
      href="mailto:hello@anudeepstudio.co"
      onClick={() => setMenuOpen(false)}
      className="mt-4 w-full rounded-full border border-white/50 bg-white/15
        px-8 py-5 text-center text-[28px] font-medium text-white
        underline underline-offset-4 backdrop-blur-xl
        transition-all duration-300 hover:bg-white/25
        hover:border-white hover:scale-[1.02]"
    >
      Get in touch
    </a>

  </div>
</div>
      {/* Background Video */}
      <video
        ref={videoRef}
        className="fixed inset-0 z-0 h-full w-full object-cover"
        style={{ objectPosition: '70% center' }}
        muted
        playsInline
        preload="auto"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4"
          type="video/mp4"
        />
      </video>

            {/* Hero Section */}
      <section className="relative z-[1] flex h-screen items-end justify-end overflow-hidden px-5 pb-12 sm:px-8 md:items-center md:justify-center md:pb-0">
        <div className="relative z-10 max-w-xl mr-auto ml-[8vw] mb-[12vh]">

          {/* Blurred A.R.I.A. Introduction */}
          

          {/* Typewriter Text */}
                    {/* Typewriter Text */}
          <p
            className="mb-5 text-white sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
              fontWeight: 400,
              minHeight: '54px',
            }}
          >
            {displayed}

            {!done && (
              <span
                className="ml-[2px] inline-block h-[1.1em] w-[2px] align-middle"
                style={{
                  backgroundColor: '#fff',
                  animation: 'blink 1s step-end infinite',
                }}
              />
            )}
          </p>
          {/* Action Pills */}
<div
  className={`flex flex-wrap gap-3 mt-4 transition-all duration-700 ${
    showActions
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-4'
  }`}
>
  <button 
  onClick={() =>
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth',
    })
  }
  className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[18px] sm:text-[18px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200">
   
    Start a project →
  </button>

  <button
  onClick={() =>
    document.getElementById('studio')?.scrollIntoView({
      behavior: 'smooth',
    })
  }
  className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full px-8 py-4 text-[18px] transition-all duration-300 hover:scale-105 hover:bg-black hover:text-white"
>
  Work with us →
</button>

  <button
  onClick={() =>
    document.getElementById('openings')?.scrollIntoView({
      behavior: 'smooth',
    })
  }
  className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full px-8 py-4 text-[18px] transition-all duration-300 hover:scale-105 hover:bg-black hover:text-white"
>
  Join the team →
</button>

  <button
  onClick={() =>
    document.getElementById('studio')?.scrollIntoView({
      behavior: 'smooth',
    })
  }
  className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full px-8 py-4 text-[18px] transition-all duration-300 hover:scale-105 hover:bg-black hover:text-white"
>
  Explore S&A Studio →
</button>

  <button
  onClick={handleCopyEmail}
  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 rounded-full border border-white bg-transparent text-white transition-all duration-300 hover:scale-105 hover:bg-black hover:text-white">
  <span>
    Reach us:{' '}
    <span className="underline underline-offset-1">
      hello@anudeepstudio.co
    </span>
  </span>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="13" height="13" x="9" y="9" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
</button>
</div>

        </div>
      </section>

{/* ===== MAINFRAME SECTIONS ===== */}

{/* Labs Section */}
<section
  id="labs"
  className="relative min-h-screen px-6 py-24 sm:px-10 md:px-16 flex items-center overflow-hidden"
>
  {/* Background */}
  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

  <div className="relative z-10 w-full max-w-6xl mx-auto">

    {/* Section Header */}
    <div className="mb-12">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/60">
        01 / Labs
      </p>

      <h2 className="text-5xl sm:text-6xl md:text-8xl font-medium text-white">
        We experiment.
      </h2>

      <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/70">
        A space for bold ideas, artificial intelligence, creative technology,
        automation and experiments that turn interesting problems into
        working prototypes.
      </p>
    </div>

    {/* Lab Cards */}
    <div className="grid gap-5 md:grid-cols-3">

      {/* AI Systems */}
      <a
        href="#studio"
        className="group rounded-3xl border border-white/20 bg-white/10 p-7 backdrop-blur-xl transition-all duration-500 hover:bg-white/20 hover:-translate-y-2 hover:border-white/40"
      >
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white">
          ✦
        </div>

        <h3 className="text-2xl text-white">
          AI Systems
        </h3>

        <p className="mt-3 text-white/60">
          Intelligent interfaces, AI agents and automation systems designed
          to solve practical problems.
        </p>

        <div className="mt-8 text-sm text-white/50 transition-all duration-300 group-hover:text-white">
          Explore → 
        </div>
      </a>

      {/* Experiments */}
      <a
        href="#studio"
        className="group rounded-3xl border border-white/20 bg-white/10 p-7 backdrop-blur-xl transition-all duration-500 hover:bg-white/20 hover:-translate-y-2 hover:border-white/40"
      >
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white">
          ◇
        </div>

        <h3 className="text-2xl text-white">
          Experiments
        </h3>

        <p className="mt-3 text-white/60">
          Rapid prototypes exploring new interactions, ideas and emerging
          technologies.
        </p>

        <div className="mt-8 text-sm text-white/50 transition-all duration-300 group-hover:text-white">
          Explore →
        </div>
      </a>

      {/* Future Tech */}
      <a
        href="#openings"
        className="group rounded-3xl border border-white/20 bg-white/10 p-7 backdrop-blur-xl transition-all duration-500 hover:bg-white/20 hover:-translate-y-2 hover:border-white/40"
      >
        <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white">
          ○
        </div>

        <h3 className="text-2xl text-white">
          Future Tech
        </h3>

        <p className="mt-3 text-white/60">
          Exploring what comes next across AI, software, automation and
          connected experiences.
        </p>

        <div className="mt-8 text-sm text-white/50 transition-all duration-300 group-hover:text-white">
          Explore →
        </div>
      </a>

    </div>

    {/* Labs CTA */}
    <div className="mt-10">
      <a
        href="#studio"
        className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-lg text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-black"
      >
        Explore the Lab →
      </a>
    </div>

  </div>
</section>

{/* Studio Section */}
{/* Studio Section */}
<section
  id="studio"
  className="relative min-h-screen px-6 py-24 sm:px-10 md:px-16 flex items-center overflow-hidden"
>
  {/* Background */}
  <div className="absolute inset-0 bg-black/30 backdrop-blur-[3px]" />

  <div className="relative z-10 w-full max-w-6xl mx-auto">

    {/* Section Label */}
    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/60">
      02 / Studio
    </p>

    {/* Main Content */}
    <div className="grid gap-12 md:grid-cols-2 md:items-end">

      {/* Left */}
      <div>
        <h2 className="text-5xl sm:text-6xl md:text-8xl font-medium text-white">
          We create.
        </h2>

        <p className="mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-white/70">
          From websites and interfaces to intelligent digital products,
          the Studio turns ideas into experiences that feel simple,
          distinctive and alive.
        </p>

        <a
          href="#openings"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-lg text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-black hover:-translate-y-1"
        >
          Explore our work →
        </a>
      </div>

      {/* Right */}
      <div className="grid gap-4">

        <a
          href="#openings"
          className="group rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl transition-all duration-500 hover:bg-white/20 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-2xl text-white">
              Web Experiences
            </h3>

            <span className="text-white/50 transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </div>

          <p className="mt-3 text-white/60">
            Modern websites, responsive interfaces and digital experiences
            built for the web.
          </p>
        </a>

        <a
          href="#openings"
          className="group rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl transition-all duration-500 hover:bg-white/20 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-2xl text-white">
              AI Products
            </h3>

            <span className="text-white/50 transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </div>

          <p className="mt-3 text-white/60">
            AI-powered tools, intelligent agents and automation systems
            designed around real problems.
          </p>
        </a>

        <a
          href="#openings"
          className="group rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl transition-all duration-500 hover:bg-white/20 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-2xl text-white">
              Interactive Interfaces
            </h3>

            <span className="text-white/50 transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </div>

          <p className="mt-3 text-white/60">
            Thoughtful interactions, animations and interfaces that make
            digital products feel alive.
          </p>
        </a>

        <a
          href="#openings"
          className="group rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl transition-all duration-500 hover:bg-white/20 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-2xl text-white">
              Digital Experiences
            </h3>

            <span className="text-white/50 transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </div>

          <p className="mt-3 text-white/60">
            Creative digital experiences combining design, technology and
            storytelling.
          </p>
        </a>

      </div>
    </div>

    {/* Studio CTA */}
    <div className="mt-12 flex flex-wrap gap-4">

      <a
        href="#openings"
        className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-black"
      >
        Start a project →
      </a>

      <a
        href="mailto:hello@anudeepstudio.co"
        className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-black"
      >
        Talk to us →
      </a>

    </div>

  </div>
</section>

{/* Openings Section */}
{/* Openings Section */}
<section
  id="openings"
  className="relative min-h-screen px-6 py-24 sm:px-10 md:px-16 flex items-center overflow-hidden"
>
  {/* Background */}
  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

  <div className="relative z-10 w-full max-w-6xl mx-auto">

    {/* Header */}
    <div className="mb-14">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/60">
        03 / Openings
      </p>

      <h2 className="text-5xl sm:text-6xl md:text-8xl font-medium text-white">
        Come build.
      </h2>

      <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/70">
        We're looking for curious people who enjoy solving meaningful
        problems, experimenting with technology and building products
        that people genuinely love to use.
      </p>
    </div>

    {/* Open Positions */}
    <div className="grid gap-5">

      {/* Position 1 */}
      <div className="group rounded-3xl border border-white/20 bg-white/10 p-6 sm:p-8 backdrop-blur-xl transition-all duration-500 hover:bg-white/20 hover:-translate-y-1">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-3 flex items-center gap-3 text-sm text-white/50">
              <span>Engineering</span>
              <span>•</span>
              <span>Full Time</span>
            </div>

            <h3 className="text-3xl text-white">
              Frontend Developer
            </h3>

            <p className="mt-3 max-w-2xl text-white/60">
              Build beautiful responsive interfaces using modern frontend
              technologies and collaborate on creative digital products.
            </p>
          </div>

          <a
            href="mailto:hello@anudeepstudio.co?subject=Application - Frontend Developer"
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-black"
          >
            Apply →
          </a>

        </div>
      </div>

      {/* Position 2 */}
      <div className="group rounded-3xl border border-white/20 bg-white/10 p-6 sm:p-8 backdrop-blur-xl transition-all duration-500 hover:bg-white/20 hover:-translate-y-1">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-3 flex items-center gap-3 text-sm text-white/50">
              <span>Artificial Intelligence</span>
              <span>•</span>
              <span>Full Time</span>
            </div>

            <h3 className="text-3xl text-white">
              AI Engineer
            </h3>

            <p className="mt-3 max-w-2xl text-white/60">
              Design intelligent agents, automation workflows and practical
              AI systems that solve real-world problems.
            </p>
          </div>

          <a
            href="mailto:hello@anudeepstudio.co?subject=Application - AI Engineer"
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-black"
          >
            Apply →
          </a>

        </div>
      </div>

      {/* Position 3 */}
      <div className="group rounded-3xl border border-white/20 bg-white/10 p-6 sm:p-8 backdrop-blur-xl transition-all duration-500 hover:bg-white/20 hover:-translate-y-1">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-3 flex items-center gap-3 text-sm text-white/50">
              <span>Design</span>
              <span>•</span>
              <span>Internship</span>
            </div>

            <h3 className="text-3xl text-white">
              Product Designer
            </h3>

            <p className="mt-3 max-w-2xl text-white/60">
              Create thoughtful user experiences, modern interfaces and
              visual systems that bring ambitious ideas to life.
            </p>
          </div>

          <a
            href="mailto:hello@anudeepstudio.co?subject=Application - Product Designer"
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-black"
          >
            Apply →
          </a>

        </div>
      </div>

    </div>

    {/* Bottom CTA */}
    <div className="mt-12 rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>
          <h3 className="text-2xl text-white">
            Don't see your role?
          </h3>

          <p className="mt-2 text-white/60">
            We're always excited to meet talented people with great ideas.
          </p>
        </div>

        <a
          href="mailto:hello@anudeepstudio.co?subject=Open Application"
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-medium text-black transition-all duration-300 hover:scale-105"
        >
          Send your profile →
        </a>

      </div>
    </div>

  </div>
</section>

{/* Shop Section */}                                              
<section
  id="shop"
  className="relative min-h-screen px-6 py-24 sm:px-10 md:px-16 flex items-center overflow-hidden"
>
  {/* Background */}
  <div className="absolute inset-0 bg-black/30 backdrop-blur-[3px]" />

  <div className="relative z-10 w-full max-w-6xl mx-auto">

    {/* Header */}
    <div className="mb-14">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/60">
        04 / Shop
      </p>

      <h2 className="text-5xl sm:text-6xl md:text-7xl font-medium text-white">
        Things we make.
      </h2>

      <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/70">
        Digital products, creative tools and experimental objects built by
        the S&A Studio team. Explore what we're making and get in touch if
        something catches your eye.
      </p>
    </div>

    {/* Product Cards */}
    <div className="grid gap-5 md:grid-cols-3">

      {/* Product 1 */}
      <a
        href="mailto:hello@anudeepstudio.co?subject=AI%20Systems%20Enquiry"
        className="group rounded-3xl border border-white/20 bg-white/10 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/40 hover:bg-white/20"
      >
        <div className="mb-10 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white">
            ✦
          </div>

          <span className="text-sm text-white/40">
            Digital
          </span>
        </div>

        <h3 className="text-3xl text-white">
          AI Systems
        </h3>

        <p className="mt-4 text-white/60">
          A collection of practical AI tools and workflows designed to make
          creative and everyday work faster.
        </p>

        <div className="mt-8 flex items-center justify-between text-sm">
          <span className="text-white/50">
            Enquire
          </span>

          <span className="text-white/50 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-white">
            →
          </span>
        </div>
      </a>

      {/* Product 2 */}
      <a
        href="mailto:hello@anudeepstudio.co?subject=Website%20Experience%20Enquiry"
        className="group rounded-3xl border border-white/20 bg-white/10 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/40 hover:bg-white/20"
      >
        <div className="mb-10 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white">
            ◇
          </div>

          <span className="text-sm text-white/40">
            Experience
          </span>
        </div>

        <h3 className="text-3xl text-white">
          Web Experiences
        </h3>

        <p className="mt-4 text-white/60">
          Carefully designed website foundations for creators, startups and
          ambitious digital projects.
        </p>

        <div className="mt-8 flex items-center justify-between text-sm">
          <span className="text-white/50">
            Enquire
          </span>

          <span className="text-white/50 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-white">
            →
          </span>
        </div>
      </a>

      {/* Product 3 */}
      <a
        href="mailto:hello@anudeepstudio.co?subject=Creative%20Tools%20Enquiry"
        className="ggroup rounded-[2rem] border border-white/20 bg-white/10 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/40 hover:bg-white/20"
      >
        <div className="mb-10 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white">
            ○
          </div>

          <span className="text-sm text-white/40">
            Tools
          </span>
        </div>

        <h3 className="text-3xl text-white">
          Creative Tools
        </h3>

        <p className="mt-4 text-white/60">
          Experimental tools and small digital utilities created to explore
          new ideas and better ways of working.
        </p>

        <div className="mt-8 flex items-center justify-between text-sm">
          <span className="text-white/50">
            Enquire
          </span>

          <span className="text-white/50 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-white">
            →
          </span>
        </div>
      </a>

    </div>

    {/* Shop CTA */}
    <div className="mt-12 flex flex-wrap gap-4">

      <a
        href="mailto:hello@anudeepstudio.co?subject=S%A%20Studio%20Shop%20Enquiry"
        className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-lg font-medium text-black transition-all duration-300 hover:scale-105"
      >
        Ask about a product →
      </a>

      <a
        href="#contact"
        className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-lg text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-black"
      >
        Contact S&A Studio →
      </a>

    </div>

  </div>
</section>

{/* Contact Section */}
<section
  id="contact"
  className="relative min-h-screen px-6 py-24 sm:px-10 md:px-16 flex items-center overflow-hidden"
>
  {/* Background */}
  <div className="absolute inset-0 bg-black/30 backdrop-blur-[3px]" />

  <div className="relative z-10 w-full max-w-6xl mx-auto">

    {/* Header */}
    <div className="mb-14">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/60">
        05 / Contact
      </p>

      <h2 className="text-5xl sm:text-6xl md:text-7xl font-medium text-white">
        Let's make something.
      </h2>

      <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/70">
        Have an idea, a project or simply something interesting you'd like
        to discuss? Tell us what you're thinking. We'd love to hear from you.
      </p>
    </div>

    {/* Contact Cards */}
    <div className="grid gap-5 md:grid-cols-2">

      {/* Email */}
      <a
        href="mailto:hello@anudeepstudio.co?subject=Project%20Enquiry"
        className="group rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/40 hover:bg-white/20"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/40">
              Email
            </p>

            <h3 className="mt-4 text-2xl sm:text-3xl text-white">
              hello@anudeepstudio.co
            </h3>

            <p className="mt-3 text-white/60">
              Tell us about your idea, project or collaboration.
            </p>
          </div>

          <span className="text-xl text-white/40 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-white">
            →
          </span>
        </div>
      </a>

      {/* Start a Project */}
      <a
        href="mailto:hello@anudeepstudio.co?subject=Start%20a%20Project"
        className="group rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/40 hover:bg-white/20"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/40">
              New project
            </p>

            <h3 className="mt-4 text-2xl sm:text-3xl text-white">
              Start a project
            </h3>

            <p className="mt-3 text-white/60">
              Let's turn an ambitious idea into something real.
            </p>
          </div>

          <span className="text-xl text-white/40 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-white">
            →
          </span>
        </div>
      </a>

    </div>

    {/* Main CTA */}
    <div className="mt-10">
      <a
        href="mailto:hello@anudeepstudio.co?subject=Hello%20S%26A%20Studio"
        className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-medium text-black transition-all duration-300 hover:scale-105"
      >
        Say hello →
      </a>
    </div>

    {/* Footer */}
<div className="mt-24 border-t border-white/10 pt-6 text-center text-sm text-white/50">
  <p>
    © 2026 Anupama Roy. All Rights Reserved.
  </p>
</div>

  </div>
</section>

</main>
  )
}

export default App