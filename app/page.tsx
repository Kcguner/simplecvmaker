"use client"

import { useState, useRef, ChangeEvent, useEffect } from "react"
import { useReactToPrint } from "react-to-print"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FileText, Download, Camera, Upload, Sparkles, User, Briefcase, GraduationCap, Lightbulb, Mail, Phone, MapPin, Globe, Sun, Moon, Menu } from "lucide-react"
import ResumePreview from "@/components/resume-preview"
import { translations, type Language, type TranslationKey } from "@/lib/translations"

export interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    summary: string
    photo: string
  }
  experience: Array<{
    id: string
    title: string
    company: string
    period: string
    description: string
  }>
  education: Array<{
    id: string
    degree: string
    institution: string
    year: string
  }>
  skills: string[]
}

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
      photo: "",
    },
    experience: [
      {
        id: "1",
        title: "",
        company: "",
        period: "",
        description: "",
      },
    ],
    education: [
      {
        id: "1",
        degree: "",
        institution: "",
        year: "",
      },
    ],
    skills: [],
  })

  const [skillInput, setSkillInput] = useState("")
  const [language, setLanguage] = useState<"tr" | "en">("en")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Translation helper
  const t = (key: TranslationKey) => translations[language][key]

  const componentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: resumeData.personalInfo.name ? `${resumeData.personalInfo.name} - Resume` : "Resume",
  })

  if (!mounted) return null

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updatePersonalInfo("photo", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    updatePersonalInfo("photo", "")
  }

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          title: "",
          company: "",
          period: "",
          description: "",
        },
      ],
    }))
  }

  const updateExperience = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now().toString(),
          degree: "",
          institution: "",
          year: "",
        },
      ],
    }))
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const addSkill = () => {
    if (skillInput.trim()) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput("")
    }
  }

  const removeSkill = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const handleDownloadPDF = () => {
    reactToPrintFn()
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-sky-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 transition-colors duration-300">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-sky-500 p-2.5 rounded-xl shadow-lg shadow-blue-500/25">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-[Poppins] text-2xl font-extrabold text-blue-700 dark:text-blue-500 tracking-tight leading-none">
                ResumeBuilder
              </span>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-0.5">{t("tagline")}</p>
            </div>
          </div>

          {/* Right: Actions */}
          <div>
            {/* Desktop View */}
            <div className="hidden md:flex items-center gap-6">
              {/* Language Toggle */}
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setLanguage("tr")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${language === "tr"
                    ? "bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 shadow-md"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    }`}
                >
                  TR
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${language === "en"
                    ? "bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 shadow-md"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    }`}
                >
                  EN
                </button>
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${theme === "light"
                    ? "bg-white dark:bg-slate-950 text-amber-500 shadow-md"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    }`}
                  title={language === "tr" ? "Gündüz Modu" : "Light Mode"}
                >
                  <Sun className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${theme === "dark"
                    ? "bg-white dark:bg-slate-950 text-blue-400 shadow-md"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    }`}
                  title={language === "tr" ? "Gece Modu" : "Dark Mode"}
                >
                  <Moon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Mobile View: Hamburger Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-500 dark:text-slate-400">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 p-6">
                  <SheetHeader className="mb-8">
                    <SheetTitle className="text-left font-[Poppins] text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                      {t("tagline")}
                    </SheetTitle>
                  </SheetHeader>
                  <div className="space-y-8">
                    {/* Data Language Selection */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        {language === "tr" ? "Dil / Language" : "Language / Dil"}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setLanguage("tr")}
                          className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all font-bold text-sm ${language === "tr"
                            ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25"
                            : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-blue-400"
                            }`}
                        >
                          TÜRKÇE
                        </button>
                        <button
                          onClick={() => setLanguage("en")}
                          className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all font-bold text-sm ${language === "en"
                            ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25"
                            : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-blue-400"
                            }`}
                        >
                          ENGLISH
                        </button>
                      </div>
                    </div>

                    {/* Theme Selection */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                        <Sparkles className="h-4 w-4" />
                        {language === "tr" ? "Görünüm" : "Appearance"}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setTheme("light")}
                          className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all ${theme === "light"
                            ? "bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/25"
                            : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-amber-400"
                            }`}
                        >
                          <Sun className="h-6 w-6" fill={theme === "light" ? "currentColor" : "none"} />
                          <span className="text-sm font-bold">{language === "tr" ? "Aydınlık" : "Light"}</span>
                        </button>
                        <button
                          onClick={() => setTheme("dark")}
                          className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all ${theme === "dark"
                            ? "bg-blue-900 text-white border-blue-900 shadow-lg shadow-blue-900/25"
                            : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-blue-400"
                            }`}
                        >
                          <Moon className="h-6 w-6" fill={theme === "dark" ? "currentColor" : "none"} />
                          <span className="text-sm font-bold">{language === "tr" ? "Karanlık" : "Dark"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Split Screen Layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 overflow-y-auto p-6 lg:p-10 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  {t("buildYourResume")}
                </h2>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t("buildDescription")}
              </p>
            </div>
            <Accordion
              type="multiple"
              defaultValue={["personal", "experience", "education", "skills"]}
              className="space-y-4"
            >
              {/* Personal Info Section */}
              <AccordionItem value="personal" className="border-0 rounded-2xl bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-black/40 overflow-hidden transition-all duration-300">
                <AccordionTrigger className="text-base font-semibold px-6 py-5 hover:no-underline hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="dark:text-slate-100">{t("personalInfo")}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6 pt-2">
                    {/* Photo Upload */}
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <Label className="text-sm font-medium mb-2 block dark:text-slate-300">{t("profilePhoto")}</Label>
                        <div className="relative group">
                          {resumeData.personalInfo.photo ? (
                            <div className="relative">
                              <img
                                src={resumeData.personalInfo.photo}
                                alt="Profile"
                                className="w-24 h-24 rounded-2xl object-cover border-2 border-blue-100 dark:border-blue-900 shadow-lg"
                              />
                              <button
                                onClick={removePhoto}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold transition-colors shadow-md"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 flex flex-col items-center justify-center cursor-pointer transition-all group-hover:shadow-lg">
                              <Camera className="h-6 w-6 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors" />
                              <span className="text-xs text-slate-400 dark:text-slate-500 group-hover:text-blue-500 mt-1">{t("upload")}</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="name" className="text-sm font-medium dark:text-slate-300">
                          {t("fullName")}
                        </Label>
                        <Input
                          id="name"
                          placeholder={t("fullNamePlaceholder")}
                          value={resumeData.personalInfo.name}
                          onChange={(e) => updatePersonalInfo("name", e.target.value)}
                          className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-blue-400 focus:ring-blue-400/20"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-sm font-medium dark:text-slate-300">
                          {t("email")}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t("emailPlaceholder")}
                          value={resumeData.personalInfo.email}
                          onChange={(e) => updatePersonalInfo("email", e.target.value)}
                          className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium dark:text-slate-300">
                          {t("phone")}
                        </Label>
                        <Input
                          id="phone"
                          placeholder={t("phonePlaceholder")}
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                          className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-sm font-medium dark:text-slate-300">
                        {t("location")}
                      </Label>
                      <Input
                        id="location"
                        placeholder={t("locationPlaceholder")}
                        value={resumeData.personalInfo.location}
                        onChange={(e) => updatePersonalInfo("location", e.target.value)}
                        className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="summary" className="text-sm font-medium dark:text-slate-300">
                        {t("professionalSummary")}
                      </Label>
                      <Textarea
                        id="summary"
                        placeholder={t("summaryPlaceholder")}
                        rows={4}
                        value={resumeData.personalInfo.summary}
                        onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                        className="mt-1.5 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Experience Section */}
              <AccordionItem value="experience" className="border-0 rounded-2xl bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-black/40 overflow-hidden transition-all duration-300">
                <AccordionTrigger className="text-base font-semibold px-6 py-5 hover:no-underline hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                      <Briefcase className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="dark:text-slate-100">{t("workExperience")}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4 pt-2">
                    {resumeData.experience.map((exp, index) => (
                      <div key={exp.id} className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/50 dark:border-slate-700 rounded-xl p-5 transition-colors">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-sm text-slate-500 dark:text-slate-400">{t("experience")} {index + 1}</h4>
                            {resumeData.experience.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeExperience(exp.id)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 h-8"
                              >
                                {t("remove")}
                              </Button>
                            )}
                          </div>
                          <div>
                            <Label htmlFor={`title-${exp.id}`} className="text-sm font-medium dark:text-slate-300">
                              {t("jobTitle")}
                            </Label>
                            <Input
                              id={`title-${exp.id}`}
                              placeholder={t("jobTitlePlaceholder")}
                              value={exp.title}
                              onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                              className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`company-${exp.id}`} className="text-sm font-medium dark:text-slate-300">
                                {t("company")}
                              </Label>
                              <Input
                                id={`company-${exp.id}`}
                                placeholder={t("companyPlaceholder")}
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`period-${exp.id}`} className="text-sm font-medium dark:text-slate-300">
                                {t("period")}
                              </Label>
                              <Input
                                id={`period-${exp.id}`}
                                placeholder={t("periodPlaceholder")}
                                value={exp.period}
                                onChange={(e) => updateExperience(exp.id, "period", e.target.value)}
                                className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor={`description-${exp.id}`} className="text-sm font-medium dark:text-slate-300">
                              {t("description")}
                            </Label>
                            <Textarea
                              id={`description-${exp.id}`}
                              placeholder={t("descriptionPlaceholder")}
                              rows={3}
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                              className="mt-1.5 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button onClick={addExperience} variant="outline" className="w-full rounded-xl border-dashed border-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-300 dark:hover:border-emerald-700 hover:text-emerald-600 dark:hover:text-emerald-400 dark:border-slate-700 dark:text-slate-400 transition-all">
                      {t("addExperience")}
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Education Section */}
              <AccordionItem value="education" className="border-0 rounded-2xl bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-black/40 overflow-hidden transition-all duration-300">
                <AccordionTrigger className="text-base font-semibold px-6 py-5 hover:no-underline hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                      <GraduationCap className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <span className="dark:text-slate-100">{t("education")}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-4 pt-2">
                    {resumeData.education.map((edu, index) => (
                      <div key={edu.id} className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800 dark:to-slate-900 border border-slate-200/50 dark:border-slate-700 rounded-xl p-5 transition-colors">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-sm text-slate-500 dark:text-slate-400">{t("education")} {index + 1}</h4>
                            {resumeData.education.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeEducation(edu.id)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 h-8"
                              >
                                {t("remove")}
                              </Button>
                            )}
                          </div>
                          <div>
                            <Label htmlFor={`degree-${edu.id}`} className="text-sm font-medium dark:text-slate-300">
                              {t("degree")}
                            </Label>
                            <Input
                              id={`degree-${edu.id}`}
                              placeholder={t("degreePlaceholder")}
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                              className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`institution-${edu.id}`} className="text-sm font-medium dark:text-slate-300">
                                {t("institution")}
                              </Label>
                              <Input
                                id={`institution-${edu.id}`}
                                placeholder={t("institutionPlaceholder")}
                                value={edu.institution}
                                onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                                className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`year-${edu.id}`} className="text-sm font-medium dark:text-slate-300">
                                {t("year")}
                              </Label>
                              <Input
                                id={`year-${edu.id}`}
                                placeholder={t("yearPlaceholder")}
                                value={edu.year}
                                onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                                className="mt-1.5 h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button onClick={addEducation} variant="outline" className="w-full rounded-xl border-dashed border-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:border-amber-300 dark:hover:border-amber-700 hover:text-amber-600 dark:hover:text-amber-400 dark:border-slate-700 dark:text-slate-400 transition-all">
                      {t("addEducation")}
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Skills Section */}
              <AccordionItem value="skills" className="border-0 rounded-2xl bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-black/40 overflow-hidden transition-all duration-300">
                <AccordionTrigger className="text-base font-semibold px-6 py-5 hover:no-underline hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                      <Lightbulb className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="dark:text-slate-100">{t("skills")}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-5 pt-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder={t("addSkillPlaceholder")}
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addSkill()
                          }
                        }}
                        className="h-11 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      />
                      <Button onClick={addSkill} className="h-11 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 cursor-pointer">
                        {t("add")}
                      </Button>
                    </div>
                    {resumeData.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/30 dark:to-sky-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all hover:shadow-md hover:scale-[1.02]"
                          >
                            {skill}
                            <button
                              onClick={() => removeSkill(index)}
                              className="hover:text-red-500 transition-colors ml-1"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Right Side: Preview */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-6 lg:p-10 overflow-y-auto transition-colors duration-300">
          <div className="max-w-4xl mx-auto">
            <ResumePreview ref={componentRef} data={resumeData} language={language} />

            {/* Download Button - Directly Below Resume */}
            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleDownloadPDF}
                className="w-full max-w-md gap-3 px-12 py-5 text-xl font-bold shadow-2xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer rounded-2xl"
              >
                <Download className="h-7 w-7" />
                {t("downloadPDF")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
