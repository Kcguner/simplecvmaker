import { forwardRef } from "react"
import type { ResumeData } from "@/app/page"
import { translations, type Language, type TranslationKey } from "@/lib/translations"

interface ResumePreviewProps {
  data: ResumeData
  language: Language
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data, language }, ref) => {
    // Translation helper
    const t = (key: TranslationKey) => translations[language][key]

    return (
      <div ref={ref} className="max-w-4xl mx-auto">
        {/* A4 Paper */}
        <div
          className="flex flex-col bg-slate-900 shadow-2xl rounded-lg overflow-hidden min-h-[297mm] w-full aspect-[1/1.414] print:shadow-none print:rounded-none print:bg-white"
          style={{
            maxWidth: "210mm",
            boxShadow: "0 25px 80px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.03)",
          }}
        >
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 px-10 py-8 print:bg-slate-900">
            <div className="flex items-start justify-between gap-6">
              {/* Name & Contact */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
                  {data.personalInfo.name || t("yourName")}
                </h1>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
                  {data.personalInfo.email && (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {data.personalInfo.email}
                    </span>
                  )}
                  {data.personalInfo.phone && (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {data.personalInfo.phone}
                    </span>
                  )}
                  {data.personalInfo.location && (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {data.personalInfo.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Profile Photo */}
              {data.personalInfo.photo && (
                <div className="shrink-0">
                  <img
                    src={data.personalInfo.photo}
                    alt="Profile"
                    className="w-32 h-32 rounded-xl object-cover border-2 border-white/20 shadow-xl"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-10 bg-white flex-1 rounded-b-lg">
            {/* Summary Section */}
            {data.personalInfo.summary && (
              <div className="mb-7">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="h-1 w-8 bg-blue-600 rounded print:bg-slate-900" />
                  {t("professionalSummary")}
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{data.personalInfo.summary}</p>
              </div>
            )}

            {/* Experience Section */}
            {data.experience.some((exp) => exp.title || exp.company) && (
              <div className="mb-7">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="h-1 w-8 bg-blue-600 rounded print:bg-slate-900" />
                  {t("workExperience")}
                </h2>
                <div className="space-y-5">
                  {data.experience.map(
                    (exp) =>
                      (exp.title || exp.company) && (
                        <div key={exp.id}>
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="text-base font-semibold text-slate-900">{exp.title || t("previewJobTitle")}</h3>
                            {exp.period && <span className="text-sm text-slate-600 font-medium">{exp.period}</span>}
                          </div>
                          {exp.company && <p className="text-sm text-blue-600 font-medium mb-2 print:text-slate-700">{exp.company}</p>}
                          {exp.description && <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>}
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

            {/* Education Section */}
            {data.education.some((edu) => edu.degree || edu.institution) && (
              <div className="mb-7">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="h-1 w-8 bg-blue-600 rounded print:bg-slate-900" />
                  {t("education")}
                </h2>
                <div className="space-y-4">
                  {data.education.map(
                    (edu) =>
                      (edu.degree || edu.institution) && (
                        <div key={edu.id}>
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-base font-semibold text-slate-900">{edu.degree || t("previewDegree")}</h3>
                            {edu.year && <span className="text-sm text-slate-600 font-medium">{edu.year}</span>}
                          </div>
                          {edu.institution && <p className="text-sm text-slate-700">{edu.institution}</p>}
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

            {/* Skills Section */}
            {data.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="h-1 w-8 bg-blue-600 rounded print:bg-slate-900" />
                  {t("skills")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-sm text-slate-700 bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium print:bg-white print:border-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)

ResumePreview.displayName = "ResumePreview"

export default ResumePreview
