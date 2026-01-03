export const translations = {
    en: {
        // Header
        tagline: "Simple Cv Maker",

        // Main Section
        buildYourResume: "Build Your Resume",
        buildDescription: "Fill in your information below and watch your resume come to life in real-time",

        // Personal Info
        personalInfo: "Personal Information",
        profilePhoto: "Profile Photo",
        upload: "Upload",
        fullName: "Full Name",
        fullNamePlaceholder: "John Doe",
        email: "Email",
        emailPlaceholder: "john@example.com",
        phone: "Phone",
        phonePlaceholder: "+1 (555) 000-0000",
        location: "Location",
        locationPlaceholder: "New York, NY",
        professionalSummary: "Professional Summary",
        summaryPlaceholder: "Brief description of your professional background...",

        // Experience
        workExperience: "Work Experience",
        experience: "Experience",
        jobTitle: "Job Title",
        jobTitlePlaceholder: "Senior Developer",
        company: "Company",
        companyPlaceholder: "Tech Corp",
        period: "Period",
        periodPlaceholder: "Jan 2020 - Present",
        description: "Description",
        descriptionPlaceholder: "Key responsibilities and achievements...",
        addExperience: "+ Add Experience",
        remove: "Remove",

        // Education
        education: "Education",
        degree: "Degree",
        degreePlaceholder: "Bachelor of Science in Computer Science",
        institution: "Institution",
        institutionPlaceholder: "University Name",
        year: "Year",
        yearPlaceholder: "2020",
        addEducation: "+ Add Education",

        // Skills
        skills: "Skills",
        addSkillPlaceholder: "Add a skill (e.g., JavaScript, React)",
        add: "Add",

        // Download
        downloadPDF: "Download as PDF",

        // Preview Section Headers
        yourName: "Your Name",
        previewJobTitle: "Job Title",
        previewDegree: "Degree",
    },
    tr: {
        // Header
        tagline: "Basit Cv Oluşturucu",

        // Main Section
        buildYourResume: "CV'nizi Oluşturun",
        buildDescription: "Bilgilerinizi aşağıya girin ve CV'nizin gerçek zamanlı olarak şekillenmesini izleyin",

        // Personal Info
        personalInfo: "Kişisel Bilgiler",
        profilePhoto: "Profil Fotoğrafı",
        upload: "Yükle",
        fullName: "Ad Soyad",
        fullNamePlaceholder: "Ahmet Yılmaz",
        email: "E-posta",
        emailPlaceholder: "ahmet@ornek.com",
        phone: "Telefon",
        phonePlaceholder: "+90 (555) 000-0000",
        location: "Konum",
        locationPlaceholder: "İstanbul, Türkiye",
        professionalSummary: "Profesyonel Özet",
        summaryPlaceholder: "Profesyonel geçmişinizin kısa bir açıklaması...",

        // Experience
        workExperience: "İş Deneyimi",
        experience: "Deneyim",
        jobTitle: "Pozisyon",
        jobTitlePlaceholder: "Kıdemli Yazılım Geliştirici",
        company: "Şirket",
        companyPlaceholder: "Teknoloji A.Ş.",
        period: "Dönem",
        periodPlaceholder: "Oca 2020 - Günümüz",
        description: "Açıklama",
        descriptionPlaceholder: "Temel sorumluluklar ve başarılar...",
        addExperience: "+ Deneyim Ekle",
        remove: "Kaldır",

        // Education
        education: "Eğitim",
        degree: "Derece",
        degreePlaceholder: "Bilgisayar Mühendisliği Lisans",
        institution: "Kurum",
        institutionPlaceholder: "Üniversite Adı",
        year: "Yıl",
        yearPlaceholder: "2020",
        addEducation: "+ Eğitim Ekle",

        // Skills
        skills: "Yetenekler",
        addSkillPlaceholder: "Yetenek ekle (örn: JavaScript, React)",
        add: "Ekle",

        // Download
        downloadPDF: "PDF Olarak İndir",

        // Preview Section Headers
        yourName: "Adınız Soyadınız",
        previewJobTitle: "Pozisyon",
        previewDegree: "Derece",
    }
} as const

export type Language = "tr" | "en"
export type TranslationKey = keyof typeof translations.en
