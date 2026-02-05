"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LoginModal } from "@/components/auth/login-modal"
import Link from "next/link"
import {
  Zap,
  Brain,
  Phone,
  ArrowRight,
  Play,
  Globe,
  Search,
  Target,
  Clock,
  BarChart3,
  MessageSquare,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Lock,
  Star,
  TrendingUp,
  Users,
  Menu,
  X,
} from "lucide-react"
import { RecruitmentQuestionnaire } from "@/components/recruitment-questionnaire"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Skip session restoration on homepage so users can see it without being logged in
    sessionStorage.setItem('skipAuthRestore', 'true')
  }, [])

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  useEffect(() => {
    const scrollTo = searchParams?.get('scroll')
    if (scrollTo) {
      const timer = setTimeout(() => {
        const element = document.getElementById(scrollTo)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
        // Remove the scroll parameter from URL after scrolling
        window.history.replaceState({}, '', '/')
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (user) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold">
                  <span className="text-slate-800">Hire</span>
                  <span className="sr-text-gradient">GenAI</span>
                </h1>
              </div>
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                <Link
                  href="/demo-en"
                  className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Product
                </Link>
                <Link
                  href="/pricing"
                  className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/roi"
                  className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  ROI
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Company
                </Link>
              </nav>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => setShowLoginModal(true)}
                className="text-gray-700 hover:text-emerald-600 font-medium"
              >
                Login
              </Button>
              <Link href="/signup">
                <Button className="sr-button-primary">Get started</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              <Link
                href="/demo-en"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-emerald-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Product
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-emerald-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/roi"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-emerald-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                ROI
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-emerald-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                Company
              </Link>
              <div className="pt-4 pb-3 border-t border-gray-100">
                <div className="px-3 space-y-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowLoginModal(true)
                      setMobileMenuOpen(false)
                    }}
                    className="w-full justify-start text-gray-700 hover:text-emerald-600 hover:bg-gray-50 font-medium transition-colors"
                  >
                    Login
                  </Button>
                  <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full sr-button-primary">Get started</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Announcement Banner */}
      <div className="bg-emerald-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 text-emerald-800">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">HireGenAI Launches All-New AI-Powered Recruitment Suite</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="sr-hero-bg py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
                AI-Recruiter: Your <span className="sr-text-gradient">24/7 Screening Partner</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Automate the most time-consuming parts of your recruitment funnel. Focus on the top 60% of qualified candidates while AI handles the rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="sr-button-dark"
                  asChild
                >
                  <Link href="/roi">
                    Explore the Benefits
                  </Link>
                </Button>
                <Button className="sr-button-secondary" asChild>
                  <Link href="/demo-en">
                    <Play className="w-4 h-4 mr-2" />
                    Try Demo
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <video
                  src="https://storage.googleapis.com/ai_recruiter_bucket_prod/assets/videos/olivia_character_no_audio.mp4"
                  className="w-full rounded-2xl shadow-2xl object-cover h-[360px] sm:h-[440px] md:h-[450px] lg:h-[500px]"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Recruitment Questionnaire Section */}
      <section id="assessment">
        <RecruitmentQuestionnaire />
      </section>

      {/* Features Section */}
      <section id="product" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
              Everything you need for <span className="sr-text-gradient">modern recruitment</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive AI-powered platform handles every aspect of your hiring process, from job posting to
              final decision-making.
            </p>
          </div>

          {/* Features Grid - 2x2 Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Intelligent CV Parsing */}
            <Card className="sr-card p-8 text-center transition-all duration-300 hover:shadow-emerald-500/50 hover:shadow-xl hover:-translate-y-2">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-transform duration-300 hover:rotate-12">
                  <Search className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Intelligent CV Parsing</h3>
                <p className="text-slate-600 leading-relaxed">
                  Instantly scans and scores all incoming CVs against your job description. Identifies key skills, experience, and qualifications with over 95% accuracy.
                </p>
              </CardContent>
            </Card>

            {/* AI-Powered Initial Interview */}
            <Card className="sr-card p-8 text-center transition-all duration-300 hover:shadow-emerald-500/50 hover:shadow-xl hover:-translate-y-2">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-transform duration-300 hover:rotate-12">
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">AI-Powered Initial Interview</h3>
                <p className="text-slate-600 leading-relaxed">
                  Engages qualified candidates in natural, conversational video interviews. Asks role-specific questions and analyzes responses for content, communication skills, and cultural fit.
                </p>
              </CardContent>
            </Card>

            {/* Data-Driven Shortlisting */}
            <Card className="sr-card p-8 text-center transition-all duration-300 hover:shadow-emerald-500/50 hover:shadow-xl hover:-translate-y-2">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-transform duration-300 hover:rotate-12">
                  <Phone className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Data-Driven Shortlisting</h3>
                <p className="text-slate-600 leading-relaxed">
                  Provides a ranked shortlist of the top 60% of candidates who are genuinely qualified and interested. Delivers detailed reports and video clips for efficient review.
                </p>
              </CardContent>
            </Card>

            {/* Advanced Analytics */}
            <Card className="sr-card p-8 text-center transition-all duration-300 hover:shadow-emerald-500/50 hover:shadow-xl hover:-translate-y-2">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-transform duration-300 hover:rotate-12">
                  <BarChart3 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Advanced Analytics</h3>
                <p className="text-slate-600 leading-relaxed">
                  Real-time insights into your hiring pipeline with predictive analytics and performance metrics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sr-gradient text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to revolutionize your hiring?</h2>
          <p className="text-xl mb-8 text-emerald-100">
            Join thousands of companies already using AI to hire better, faster, and smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push('/pricing')}
              className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-full"
            >
              View pricing
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-emerald-600 font-semibold px-8 py-4 text-lg rounded-full bg-transparent"
              onClick={() => router.push('/demo-en')}
            >
              Try demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            {/* Left Section - Brand Block */}
            <div className="md:col-span-3">
              <h3 className="text-2xl font-bold mb-2">
                <span className="text-white">Hire</span>
                <span className="text-emerald-400">GenAI</span>
              </h3>
              <p className="text-sm text-slate-400 mb-4">By SKYGENAI</p>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                HireGenAI pre-screens and interviews candidates, helping you shortlist talent 20x faster and more efficiently.
              </p>
              <p className="text-slate-400 mb-6 text-sm font-medium">
                Email: <a href="mailto:support@hire-genai.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">support@hire-genai.com</a>
              </p>
              {/* Social Icons */}
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/hire-genai" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Product Section */}
            <div className="md:col-span-2">
              <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">Product</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>
                  <Link href="/demo-en" className="hover:text-emerald-400 transition-colors">
                    Try the Demo
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-emerald-400 transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Section */}
            <div className="md:col-span-2">
              <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">Company</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>
                  <Link href="/about" className="hover:text-emerald-400 transition-colors">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div className="md:col-span-2">
              <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">Legal</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>
                  <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Section - Badges Block */}
            <div className="md:col-span-3">
              <div className="space-y-4">
                {/* Trustpilot Badge */}
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <p className="text-xs text-slate-400 mb-2 font-semibold">Trustpilot</p>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-white">TrustScore 4.5</p>
                </div>

                {/* GDPR Compliant Badge */}
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <p className="text-sm font-semibold text-white">GDPR COMPLIANT</p>
                  </div>
                  <p className="text-xs text-slate-400">Your data is secure and compliant</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2024 HireGenAI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  )
}
