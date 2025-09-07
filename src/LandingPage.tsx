import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { 
  FaAndroid, FaApple, FaUtensils, FaBus, FaBookOpen, FaCalendarCheck, FaRoute,
  FaPhone, FaBell, FaSearch, FaComments, FaNewspaper, FaBriefcase,
  FaAddressBook, FaUserFriends, FaIdCard, FaTrophy, FaChevronDown, FaArrowDown
} from 'react-icons/fa'

type Star = {
  x: number
  y: number
  radius: number
  opacity: number
  twinkle: number
}

function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    // Create stars - optimized for mobile
    if (starsRef.current.length === 0) {
      const isMobile = window.innerWidth < 768
      const starCount = isMobile ? 150 : 300
      
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * (isMobile ? 2 : 3) + 0.8,
          opacity: Math.random() * 0.8 + 0.3,
          twinkle: Math.random() * (isMobile ? 0.02 : 0.03) + 0.01,
        })
      }
    }

    const draw = () => {
      // Clear canvas instead of adding overlay
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      starsRef.current.forEach(star => {
        star.opacity += star.twinkle * (Math.random() > 0.5 ? 1 : -1)
        if (star.opacity > 1) star.opacity = 1
        if (star.opacity < 0.5) star.opacity = 0.5

        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()

        // Add stronger glow
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 4)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.6})`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = gradient
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('resize', resize)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
}

function CosmicEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.max(1, window.devicePixelRatio || 1)

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }
    resize()

    type Rocket = { x: number; y: number; vx: number; vy: number; trail: {x: number, y: number}[]; life: number }
    type Galaxy = { x: number; y: number; radius: number; rotation: number; opacity: number }
    type Meteor = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }

    const rockets: Rocket[] = []
    const galaxies: Galaxy[] = []
    const meteors: Meteor[] = []

    // Initialize galaxies - optimized for mobile
    const isMobile = window.innerWidth < 768
    const galaxyCount = isMobile ? 2 : 3
    
    for (let i = 0; i < galaxyCount; i++) {
      galaxies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: (isMobile ? 60 : 80) + Math.random() * (isMobile ? 80 : 120),
        rotation: 0,
        opacity: (isMobile ? 0.4 : 0.6) + Math.random() * 0.3
      })
    }

    const spawnRocket = () => {
      rockets.push({
        x: canvas.width * 0.1,
        y: canvas.height * (0.3 + Math.random() * 0.4),
        vx: (2 + Math.random() * 3) * dpr,
        vy: (-0.5 + Math.random() * 1) * dpr,
        trail: [],
        life: 0
      })
    }

    const spawnMeteor = () => {
      meteors.push({
        x: canvas.width * (0.7 + Math.random() * 0.3),
        y: canvas.height * (Math.random() * 0.3),
        vx: (-2 - Math.random() * 3) * dpr,
        vy: (1 + Math.random() * 2) * dpr,
        life: 0,
        maxLife: 150 + Math.random() * 100,
        size: 1 + Math.random() * 2
      })
    }

    let rocketTimer = 0
    let meteorTimer = 0

    const loop = () => {
      // Clear with minimal fade for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw galaxies
      galaxies.forEach(galaxy => {
        galaxy.rotation += 0.001
        ctx.save()
        ctx.translate(galaxy.x, galaxy.y)
        ctx.rotate(galaxy.rotation)
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, galaxy.radius)
        grad.addColorStop(0, `rgba(255,255,255,${galaxy.opacity})`)
        grad.addColorStop(0.3, `rgba(255,255,255,${galaxy.opacity * 0.6})`)
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = grad
        ctx.fillRect(-galaxy.radius, -galaxy.radius, galaxy.radius * 2, galaxy.radius * 2)
        ctx.restore()
      })

      // Spawn rockets - optimized for mobile
      rocketTimer++
      const rocketInterval = isMobile ? 200 : 80
      if (rocketTimer > rocketInterval) {
        spawnRocket()
        rocketTimer = 0
      }

      // Spawn meteors - optimized for mobile
      meteorTimer++
      const meteorInterval = isMobile ? 150 : 60
      if (meteorTimer > meteorInterval) {
        spawnMeteor()
        meteorTimer = 0
      }

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]
        r.trail.push({ x: r.x, y: r.y })
        if (r.trail.length > 20) r.trail.shift()
        
        r.x += r.vx
        r.y += r.vy
        r.life++

        // Draw rocket trail
        for (let j = 0; j < r.trail.length; j++) {
          const alpha = j / r.trail.length * 0.6
          ctx.fillStyle = `rgba(255,255,255,${alpha})`
          ctx.beginPath()
          ctx.arc(r.trail[j].x, r.trail[j].y, (j / r.trail.length) * 3 * dpr, 0, Math.PI * 2)
          ctx.fill()
        }

        // Draw rocket
        ctx.fillStyle = 'rgba(255,255,255,0.9)'
        ctx.beginPath()
        ctx.arc(r.x, r.y, 3 * dpr, 0, Math.PI * 2)
        ctx.fill()

        if (r.x > canvas.width + 50 || r.life > 300) rockets.splice(i, 1)
      }

      // Update meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]
        m.x += m.vx
        m.y += m.vy
        m.life++
        
        const alpha = Math.max(0, 1 - m.life / m.maxLife)
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 15, m.y - m.vy * 15)
        grad.addColorStop(0, `rgba(255,255,255,${0.9 * alpha})`)
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        
        ctx.strokeStyle = grad
        ctx.lineWidth = m.size * dpr
        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(m.x - m.vx * 8, m.y - m.vy * 8)
        ctx.stroke()

        if (m.life >= m.maxLife) meteors.splice(i, 1)
      }

      raf.current = requestAnimationFrame(loop)
    }

    raf.current = requestAnimationFrame(loop)
    window.addEventListener('resize', resize)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
}

const translations = {
  en: {
    title: "UniGO",
    tagline: "Your All-In-One Campus Life App",
    description: "UniGO is the ultimate student companion, designed to make your university life smarter, faster, and easier. From getting to class on time to ordering your favorite meal, finding study help, or staying connected with campus events—UniGO brings it all together in one smart app.",
    downloadAndroid: "GET ANDROID",
    downloadiOS: "GET iOS",
    // Transportation Features
    transportation: "TRANSPORTATION MADE SIMPLE",
    rideSharing: "RIDE SHARING (وصلني)",
    rideSharingDesc: "Create or join rides with fellow students, set gender preferences, chat in group trips, and rate drivers after each journey.",
    busReminders: "BUS REMINDERS",
    busRemindersDesc: "Get notified before your bus departs, set custom trip alarms, and share bus schedules with friends.",
    tripHistory: "TRIP HISTORY",
    tripHistoryDesc: "View all trips you've joined or created, with easy access to driver ratings.",
    // Food Features
    foodCafeteria: "FOOD & CAFETERIA ORDERS",
    preOrder: "PRE-ORDER FROM CAMPUS CAFETERIAS",
    preOrderDesc: "Choose your cafeteria, browse the menu, customize your order, and confirm with secure phone verification.",
    liveTracking: "LIVE ORDER TRACKING",
    liveTrackingDesc: "See how many people are ahead of you and get notified when your food is ready.",
    inAppChat: "IN-APP CHAT",
    inAppChatDesc: "Message cafeteria staff directly for updates or changes.",
    campusRestaurants: "CAMPUS RESTAURANTS",
    campusRestaurantsDesc: "Discover nearby restaurants, view menus, photos, and ratings, and leave reviews with images. Use filters to find exactly what you crave.",
    // Study Features
    studyAssistance: "STUDY & ASSISTANCE",
    bookStore: "BOOK STORE",
    bookStoreDesc: "Browse and buy books directly from UniGO's student marketplace.",
    bookRequests: "BOOK REQUESTS",
    bookRequestsDesc: "Request books that aren't listed yet.",
    bookDonations: "BOOK DONATIONS", 
    bookDonationsDesc: "Donate books, list them with details, and arrange pickups through in-app chat.",
    examReminders: "EXAM REMINDERS",
    examRemindersDesc: "Add exam dates and receive notifications (daily or custom), share exam schedules with friends.",
    lostFound: "LOST & FOUND",
    lostFoundDesc: "Post or search for lost items, contact owners, and share listings.",
    // Social Features
    socialCampus: "SOCIAL & CAMPUS LIFE",
    universityNews: "UNIVERSITY NEWS",
    universityNewsDesc: "Stay updated with announcements from admins or student councils.",
    opportunities: "OPPORTUNITIES BOARD",
    opportunitiesDesc: "Discover jobs, internships, courses, and training programs.",
    contacts: "CONTACTS DIRECTORY",
    contactsDesc: "Access important university contacts, faculty details, and student council numbers.",
    events: "EVENTS",
    eventsDesc: "Register for campus events, share them, or suggest your own.",
    // Friends & Profile
    friendsSharing: "FRIENDS & SHARING",
    friendsDesc: "Add friends to your UniGO network. Share anything in the app—rides, cafeteria menus, restaurant recommendations, events, books, lost & found items, and more.",
    profile: "YOUR PROFILE, YOUR ACHIEVEMENTS",
    profileDesc: "Create your personalized profile with avatar, full name, college, major, and year. Link your social accounts like Instagram or WhatsApp. Track stats: friends, donations, ratings, event participation, and more.",
    achievements: "ACHIEVEMENT BADGES",
    achievementsDesc: "Unlock Achievement Badges (Bronze, Silver, Gold, Diamond) for activities like donating books, driving rides, joining events, or discovering restaurants.",
    whyUniGO: "WHY UniGO?",
    whyDesc: "Because your campus life should be: Smarter (One app for everything), Cheaper (Save time and money), Faster (Access everything with just a few taps), More Connected (Friends, sharing, and campus life together).",
    ctaTitle: "UniGO – Everything you need for university life, right at your fingertips.",
    ctaDesc: "Download now and experience a new way to live campus life.",
    comprehensiveFeatures: "COMPREHENSIVE FEATURES",
    transportationSubtitle: "وصلني - Smart ride sharing, bus reminders & trip history",
    foodSubtitle: "Pre-order, live tracking, chat & campus restaurants",
    studySubtitle: "Books, exams, lost & found - your academic companion", 
    socialSubtitle: "News, opportunities, events & campus connections",
    friendsSubtitle: "Connect, share everything & track your achievements",
    addFriends: "ADD FRIENDS",
    smarter: "SMARTER",
    smarterDesc: "One app for everything you need",
    cheaper: "CHEAPER", 
    cheaperDesc: "Save time and money with shared rides",
    faster: "FASTER",
    fasterDesc: "Access everything with just a few taps",
    moreConnected: "MORE CONNECTED",
    moreConnectedDesc: "Friends, sharing, and campus life together"
  },
  ar: {
    title: "يوني جو",
    tagline: "تطبيقك الشامل للحياة الجامعية",
    description: "يوني جو هو الرفيق الأمثل للطلاب، مصمم لجعل حياتك الجامعية أكثر ذكاءً وسرعة وسهولة. من الوصول للصف في الوقت المحدد إلى طلب وجبتك المفضلة، أو العثور على المساعدة الدراسية، أو البقاء على اطلاع بأحداث الحرم الجامعي—يوني جو يجمع كل ذلك في تطبيق ذكي واحد.",
    downloadAndroid: "تحميل أندرويد",
    downloadiOS: "تحميل آيفون",
    transportation: "المواصلات أصبحت بسيطة",
    rideSharing: "مشاركة الرحلات (وصلني)",
    rideSharingDesc: "إنشاء أو الانضمام للرحلات مع زملاء الطلاب، تحديد تفضيلات الجنس، الدردشة في الرحلات الجماعية، وتقييم السائقين بعد كل رحلة.",
    busReminders: "تذكيرات الحافلة",
    busRemindersDesc: "احصل على إشعارات قبل مغادرة حافلتك، اضبط منبهات مخصصة للرحلات، وشارك جداول الحافلات مع الأصدقاء.",
    tripHistory: "تاريخ الرحلات",
    tripHistoryDesc: "عرض جميع الرحلات التي انضممت إليها أو أنشأتها، مع سهولة الوصول لتقييمات السائقين.",
    foodCafeteria: "طلبات الطعام والكافتيريا",
    preOrder: "الطلب المسبق من كافتيريات الحرم الجامعي",
    preOrderDesc: "اختر كافتيريتك، تصفح القائمة، خصص طلبك، وأكد بالتحقق الآمن من الهاتف.",
    liveTracking: "تتبع الطلب المباشر",
    liveTrackingDesc: "شاهد كم شخص أمامك واحصل على إشعار عندما يصبح طعامك جاهزاً.",
    inAppChat: "الدردشة داخل التطبيق",
    inAppChatDesc: "راسل موظفي الكافتيريا مباشرة للحصول على التحديثات أو التغييرات.",
    campusRestaurants: "مطاعم الحرم الجامعي",
    campusRestaurantsDesc: "اكتشف المطاعم القريبة، عرض القوائم والصور والتقييمات، واترك مراجعات بالصور. استخدم الفلاتر للعثور على ما تشتهيه بالضبط.",
    studyAssistance: "الدراسة والمساعدة",
    bookStore: "متجر الكتب",
    bookStoreDesc: "تصفح وشراء الكتب مباشرة من سوق طلاب يوني جو.",
    bookRequests: "طلبات الكتب",
    bookRequestsDesc: "اطلب الكتب التي لم يتم إدراجها بعد.",
    bookDonations: "تبرعات الكتب",
    bookDonationsDesc: "تبرع بالكتب، أدرجها بالتفاصيل، ورتب الاستلام من خلال الدردشة داخل التطبيق.",
    examReminders: "تذكيرات الامتحانات",
    examRemindersDesc: "أضف مواعيد الامتحانات واحصل على إشعارات (يومية أو مخصصة)، شارك جداول الامتحانات مع الأصدقاء.",
    lostFound: "المفقودات والموجودات",
    lostFoundDesc: "انشر أو ابحث عن الأشياء المفقودة، تواصل مع الأصحاب، وشارك القوائم.",
    socialCampus: "الحياة الاجتماعية والجامعية",
    universityNews: "أخبار الجامعة",
    universityNewsDesc: "ابق محدثاً بالإعلانات من الإدارة أو مجالس الطلاب.",
    opportunities: "لوحة الفرص",
    opportunitiesDesc: "اكتشف الوظائف والتدريبات والدورات وبرامج التدريب.",
    contacts: "دليل جهات الاتصال",
    contactsDesc: "الوصول لجهات الاتصال المهمة بالجامعة وتفاصيل أعضاء هيئة التدريس ومجلس الطلاب.",
    events: "الأحداث",
    eventsDesc: "التسجيل في أحداث الحرم الجامعي ومشاركتها أو اقتراح أحداثك الخاصة.",
    friendsSharing: "الأصدقاء والمشاركة",
    friendsDesc: "أضف أصدقاء لشبكة يوني جو الخاصة بك. شارك أي شيء في التطبيق—الرحلات وقوائم الكافتيريا وتوصيات المطاعم والأحداث والكتب والمفقودات والموجودات وأكثر.",
    profile: "ملفك الشخصي، إنجازاتك",
    profileDesc: "أنشئ ملفك الشخصي المخصص مع الصورة الرمزية والاسم الكامل والكلية والتخصص والسنة. اربط حساباتك الاجتماعية مثل إنستغرام أو واتساب. تتبع الإحصائيات: الأصدقاء والتبرعات والتقييمات ومشاركة الأحداث وأكثر.",
    achievements: "شارات الإنجاز",
    achievementsDesc: "اكسب شارات الإنجاز (برونزية وفضية وذهبية وماسية) للأنشطة مثل التبرع بالكتب وقيادة الرحلات والانضمام للأحداث أو اكتشاف المطاعم.",
    whyUniGO: "لماذا يوني جو؟",
    whyDesc: "لأن حياتك الجامعية يجب أن تكون: أذكى (تطبيق واحد لكل شيء)، أرخص (وفر الوقت والمال)، أسرع (الوصول لكل شيء بنقرات قليلة)، أكثر اتصالاً (الأصدقاء والمشاركة والحياة الجامعية معاً).",
    ctaTitle: "يوني جو – كل ما تحتاجه للحياة الجامعية، في متناول يدك.",
    ctaDesc: "حمل الآن واختبر طريقة جديدة لعيش الحياة الجامعية.",
    comprehensiveFeatures: "المميزات الشاملة",
    transportationSubtitle: "وصلني - مشاركة ذكية للرحلات، تذكيرات الحافلات وتاريخ الرحلات",
    foodSubtitle: "طلب مسبق، تتبع مباشر، دردشة ومطاعم الحرم الجامعي",
    studySubtitle: "كتب، امتحانات، مفقودات وموجودات - رفيقك الأكاديمي",
    socialSubtitle: "أخبار، فرص، أحداث وروابط الحرم الجامعي",
    friendsSubtitle: "تواصل، شارك كل شيء وتتبع إنجازاتك",
    addFriends: "إضافة أصدقاء",
    smarter: "أذكى",
    smarterDesc: "تطبيق واحد لكل ما تحتاجه",
    cheaper: "أرخص",
    cheaperDesc: "وفر الوقت والمال مع الرحلات المشتركة",
    faster: "أسرع",
    fasterDesc: "الوصول لكل شيء بنقرات قليلة",
    moreConnected: "أكثر اتصالاً",
    moreConnectedDesc: "الأصدقاء والمشاركة والحياة الجامعية معاً"
  }
}

export default function LandingPage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('ar')
  const t = translations[language]
  const isRTL = language === 'ar'
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const [isMobile, setIsMobile] = useState(false)
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })
  const [deviceType, setDeviceType] = useState<'phone' | 'tablet' | 'desktop'>('desktop')


  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const mobile = width < 768 || /Mobi|Android/i.test(navigator.userAgent)
      
      setIsMobile(mobile)
      setScreenSize({ width, height })
      
      if (width < 640) setDeviceType('phone')
      else if (width < 1024) setDeviceType('tablet')
      else setDeviceType('desktop')
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    window.addEventListener('orientationchange', checkDevice)
    return () => {
      window.removeEventListener('resize', checkDevice)
      window.removeEventListener('orientationchange', checkDevice)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
    }
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, isMobile])

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-black ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <CosmicBackground />
      <CosmicEffects />
      
      
      {/* Device-specific visual indicators */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="fixed bottom-4 left-4 z-40 text-xs text-white/40"
        >
          {deviceType} • {screenSize.width}×{screenSize.height}
        </motion.div>
      )}
      
      {/* EPIC MEGA LANGUAGE TOGGLE */}
      <motion.div 
        className="fixed top-4 right-4 sm:top-8 sm:right-8 z-50"
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          whileHover={{ scale: 1.15, y: -6 }}
          whileTap={{ scale: 0.95 }}
          className="relative group ultimate-glass rounded-3xl px-8 py-6 sm:px-12 sm:py-8 text-lg sm:text-xl font-black text-white transition-all duration-500 epic-pulse overflow-hidden border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5"
        >
          {/* Epic animated background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"
            animate={{ 
              background: [
                'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                'linear-gradient(45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.25), rgba(255,255,255,0.15))'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Glowing border effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/30 via-white/50 to-white/30 opacity-0 group-hover:opacity-100 blur-sm"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0, 0.6, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Content */}
          <div className="relative flex items-center gap-4">
            <motion.span
              animate={{ 
                rotate: language === 'en' ? [0, 180, 360] : [360, 180, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-3xl sm:text-4xl"
            >
              {language === 'en' ? '🇸🇦' : '🇺🇸'}
            </motion.span>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold">
                {language === 'en' ? 'عربي' : 'English'}
              </span>
              <span className="text-xs sm:text-sm text-white/70 font-medium">
                {language === 'en' ? 'تبديل' : 'Switch'}
              </span>
            </div>
          </div>
          
          {/* Epic floating particles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/50 rounded-full"
              style={{
                top: `${20 + i * 15}%`,
                right: `${10 + i * 10}%`
              }}
              animate={{ 
                y: [-5, 5, -5],
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{ 
                duration: 2 + i * 0.3, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
          
          {/* Central glow effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl bg-white/20 blur-xl opacity-0 group-hover:opacity-100"
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0, 0.3, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.button>
      </motion.div>

      {/* Hero Section */}
      <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 sm:px-6 text-center overflow-hidden">
        <div className={`relative w-full ${language === 'ar' ? 'max-w-[90vw]' : 'max-w-[98vw]'} flex items-center justify-center hero-container mind-blowing-container`}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`text-gradient unigo-title crystal-clear select-none font-black leading-[0.85] tracking-tighter max-w-full ${language === 'ar' ? 'arabic-text-fix' : ''}`}
            style={{
              fontSize: 'clamp(4rem, 15vw, 20rem)',
              lineHeight: '0.85',
              wordBreak: 'keep-all',
              whiteSpace: language === 'ar' ? 'normal' : 'nowrap',
              margin: '0 auto',
              textAlign: 'center',
              background: 'none',
              backdropFilter: 'none',
              boxShadow: 'none',
              border: 'none',
              filter: 'none',
              textShadow: 'none',
              maxWidth: language === 'ar' ? '90vw' : '100%',
              overflowWrap: language === 'ar' ? 'break-word' : 'normal'
            }}
          >
            {t.title}
          </motion.h1>
          
          {/* Pure glow effects - no backgrounds */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="absolute inset-0 -z-10"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)',
              filter: 'blur(60px)'
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="absolute inset-0 -z-20"
            style={{
              background: 'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 80%)',
              filter: 'blur(120px)'
            }}
          />
          
          {/* Floating particles around the title - optimized for mobile */}
          {!isMobile && (
            <>
              <motion.div
                animate={{ 
                  y: [-8, 8, -8],
                  x: [-3, 3, -3],
                  rotate: [0, 180]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-2 h-2 bg-white/50 rounded-full"
              />
              <motion.div
                animate={{ 
                  y: [6, -6, 6],
                  x: [3, -3, 3],
                  rotate: [180, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 w-1.5 h-1.5 bg-white/40 rounded-full"
              />
            </>
          )}
          
          {/* Mobile optimized single particle */}
          {isMobile && (
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-1.5 h-1.5 bg-white/40 rounded-full"
            />
          )}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-6 text-lg font-semibold text-white/90 sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed"
        >
          {t.tagline}
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-8 text-base font-medium text-white/80 sm:text-lg md:text-xl max-w-5xl mx-auto leading-relaxed"
        >
          {t.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-24 sm:mt-32 w-full"
        >
          {/* OUT-OF-THE-WORLD DOWNLOAD CARDS SECTION */}
          <div className="relative w-full max-w-7xl mx-auto px-4">
            
            {/* Epic Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0 items-center">
              
              {/* APPLE CARD - LEFT SIDE */}
              <motion.div
                initial={{ opacity: 0, x: -100, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative group perspective-1000"
              >
                {/* Apple Card Container */}
                <div className="relative transform-gpu transition-all duration-700 group-hover:scale-105 group-hover:-rotate-y-2">
                  
                  {/* Card Background with Epic Effects */}
                  <div className="relative ultimate-glass rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 overflow-hidden">
                    
                    {/* Epic Background Animation */}
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      animate={{
                        background: [
                          'conic-gradient(from 0deg at 20% 50%, rgba(255,255,255,0.1) 0deg, transparent 120deg, rgba(255,255,255,0.1) 240deg, transparent 360deg)',
                          'conic-gradient(from 120deg at 80% 50%, rgba(255,255,255,0.1) 0deg, transparent 120deg, rgba(255,255,255,0.1) 240deg, transparent 360deg)',
                          'conic-gradient(from 240deg at 20% 50%, rgba(255,255,255,0.1) 0deg, transparent 120deg, rgba(255,255,255,0.1) 240deg, transparent 360deg)'
                        ]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Card Header */}
                    <div className="relative z-10 text-center mb-8">
                      <motion.div
                        whileHover={{ scale: 1.1, rotateZ: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="inline-block mb-4"
                      >
                        <div className="relative">
                          <FaApple 
                            className="h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40 mx-auto"
                            style={{
                              color: '#ffffff',
                              fill: '#ffffff',
                              filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.6)) drop-shadow(0 0 60px rgba(255,255,255,0.3))'
                            }}
                          />
                          
                          {/* Icon Glow Ring */}
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            animate={{
                              boxShadow: [
                                '0 0 0 0px rgba(255,255,255,0.4)',
                                '0 0 0 20px rgba(255,255,255,0.1)',
                                '0 0 0 40px rgba(255,255,255,0)',
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                      </motion.div>
                      
                      <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                        iOS APP
                      </h3>
                      <p className="text-white/70 text-sm sm:text-base">
                        Available on App Store
                      </p>
                    </div>
                    
                    {/* Download Button */}
                    <motion.a
            href="https://apps.apple.com/il/app/unigo-%D9%8A%D9%88%D9%86%D9%8A-%D8%AC%D9%88/id6749590629"
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative block w-full ultimate-glass rounded-2xl px-8 py-6 text-center font-black text-lg sm:text-xl text-white border border-white/30 bg-gradient-to-r from-white/15 to-white/10 hover:from-white/25 hover:to-white/20 transition-all duration-500 overflow-hidden"
                    >
                      {/* Button Background Animation */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          background: [
                            'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
                            'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.2) 100%)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      
                      <span className="relative z-10">{t.downloadiOS}</span>
                    </motion.a>
                    
                    {/* Card Corner Accents */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-white/30 rounded-tl-lg" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-white/30 rounded-tr-lg" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-white/30 rounded-bl-lg" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-white/30 rounded-br-lg" />
                  </div>
                  
                  {/* Card Shadow */}
                  <div className="absolute inset-0 rounded-3xl bg-white/5 blur-xl -z-10 group-hover:bg-white/10 transition-all duration-700" />
                </div>
              </motion.div>
              
              {/* EPIC CENTRAL WALL DIVIDER */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex justify-center items-center py-16 lg:py-0"
              >
                
                {/* Mobile Horizontal Wall */}
                <div className="block lg:hidden w-full">
                  <div className="relative h-1 w-full bg-gradient-to-r from-transparent via-white/60 to-transparent">
                    <div className="absolute inset-0 h-8 -translate-y-3.5 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm" />
                    
                    {/* Central Diamond */}
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/80 rotate-45 shadow-lg"
                    />
                    
                    {/* Side Accents */}
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute top-1/2 left-1/4 -translate-y-1/2 w-2 h-2 bg-white/60 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="absolute top-1/2 right-1/4 -translate-y-1/2 w-2 h-2 bg-white/60 rounded-full"
                    />
                  </div>
                </div>
                
                {/* Desktop Vertical Wall */}
                <div className="hidden lg:block relative h-96 w-1">
                  
                  {/* Main Wall Structure */}
                  <div className="relative h-full w-full bg-gradient-to-b from-transparent via-white/60 to-transparent">
                    <div className="absolute inset-0 w-8 -translate-x-3.5 bg-gradient-to-b from-transparent via-white/20 to-transparent blur-sm" />
                    
                    {/* Epic Wall Segments */}
                    <motion.div
                      animate={{ 
                        height: ['60%', '80%', '60%'],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 bg-white/80 rounded-full"
                    />
                    
                    {/* Floating Wall Elements */}
                    <motion.div
                      animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-1/4 -left-2 w-4 h-4 bg-white/70 rotate-45 shadow-lg"
                    />
                    
                    <motion.div
                      animate={{ y: [15, -15, 15], rotate: [360, 180, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                      className="absolute bottom-1/4 -right-2 w-3 h-3 bg-white/60 rotate-45 shadow-lg"
                    />
                    
                    {/* Wall Light Beams */}
                    <motion.div
                      animate={{ 
                        scaleX: [1, 1.5, 1],
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-1/3 -left-8 w-16 h-px bg-white/50"
                    />
                    
                    <motion.div
                      animate={{ 
                        scaleX: [1, 1.8, 1],
                        opacity: [0.4, 1, 0.4]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="absolute top-1/2 -right-10 w-20 h-px bg-white/70"
                    />
                    
                    <motion.div
                      animate={{ 
                        scaleX: [1, 1.3, 1],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute bottom-1/3 -left-6 w-12 h-px bg-white/40"
                    />
                  </div>
                  
                  {/* Epic Energy Field */}
                  <motion.div
                    className="absolute inset-0 w-32 -translate-x-1/2"
                    animate={{
                      background: [
                        'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
                        'radial-gradient(ellipse 100% 120% at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 70%)',
                        'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)'
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
              
              {/* ANDROID CARD - RIGHT SIDE */}
              <motion.div
                initial={{ opacity: 0, x: 100, rotateY: 15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative group perspective-1000"
              >
                {/* Android Card Container */}
                <div className="relative transform-gpu transition-all duration-700 group-hover:scale-105 group-hover:rotate-y-2">
                  
                  {/* Card Background with Epic Effects */}
                  <div className="relative ultimate-glass rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 overflow-hidden">
                    
                    {/* Epic Background Animation */}
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      animate={{
                        background: [
                          'conic-gradient(from 180deg at 80% 50%, rgba(255,255,255,0.1) 0deg, transparent 120deg, rgba(255,255,255,0.1) 240deg, transparent 360deg)',
                          'conic-gradient(from 300deg at 20% 50%, rgba(255,255,255,0.1) 0deg, transparent 120deg, rgba(255,255,255,0.1) 240deg, transparent 360deg)',
                          'conic-gradient(from 60deg at 80% 50%, rgba(255,255,255,0.1) 0deg, transparent 120deg, rgba(255,255,255,0.1) 240deg, transparent 360deg)'
                        ]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 1 }}
                    />
                    
                    {/* Card Header */}
                    <div className="relative z-10 text-center mb-8">
                      <motion.div
                        whileHover={{ scale: 1.1, rotateZ: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="inline-block mb-4"
                      >
                        <div className="relative">
                          <FaAndroid 
                            className="h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40 mx-auto"
                            style={{
                              color: '#ffffff',
                              fill: '#ffffff',
                              filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.6)) drop-shadow(0 0 60px rgba(255,255,255,0.3))'
                            }}
                          />
                          
                          {/* Icon Glow Ring */}
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            animate={{
                              boxShadow: [
                                '0 0 0 0px rgba(255,255,255,0.4)',
                                '0 0 0 20px rgba(255,255,255,0.1)',
                                '0 0 0 40px rgba(255,255,255,0)',
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          />
                        </div>
                      </motion.div>
                      
                      <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                        ANDROID APP
                      </h3>
                      <p className="text-white/70 text-sm sm:text-base">
                        Direct APK Download
                      </p>
                    </div>
                    
                    {/* Download Button */}
                    <motion.a
                      href={import.meta.env.VITE_ANDROID_APK_URL || "/UniGO.apk"}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative block w-full ultimate-glass rounded-2xl px-8 py-6 text-center font-black text-lg sm:text-xl text-white border border-white/30 bg-gradient-to-r from-white/15 to-white/10 hover:from-white/25 hover:to-white/20 transition-all duration-500 overflow-hidden"
                    >
                      {/* Button Background Animation */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          background: [
                            'linear-gradient(-45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
                            'linear-gradient(-45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.2) 100%)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      />
                      
                      <span className="relative z-10">{t.downloadAndroid}</span>
                    </motion.a>
                    
                    {/* Card Corner Accents */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-white/30 rounded-tl-lg" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-white/30 rounded-tr-lg" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-white/30 rounded-bl-lg" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-white/30 rounded-br-lg" />
                  </div>
                  
                  {/* Card Shadow */}
                  <div className="absolute inset-0 rounded-3xl bg-white/5 blur-xl -z-10 group-hover:bg-white/10 transition-all duration-700" />
                </div>
              </motion.div>
              
            </div>
          </div>
        </motion.div>
        
        {/* EPIC SCROLL DOWN INDICATOR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-col items-center mt-16 mb-8"
        >
          {/* Scroll Text */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-white/70 text-sm sm:text-base font-medium mb-4 tracking-wide"
          >
            SCROLL FOR MORE
          </motion.p>
          
          {/* Epic Scroll Down Icons */}
          <div className="flex flex-col items-center space-y-2">
            <motion.div
              animate={{ 
                y: [0, 8, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <FaChevronDown className="text-white h-4 w-4 sm:h-5 sm:w-5" />
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, 8, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.3
              }}
            >
              <FaChevronDown className="text-white h-4 w-4 sm:h-5 sm:w-5" />
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, 8, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.6
              }}
            >
              <FaArrowDown className="text-white h-6 w-6 sm:h-8 sm:w-8 mt-2" />
            </motion.div>
          </div>
          
          {/* Glow effect behind scroll indicator */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute w-24 h-24 bg-white/10 rounded-full blur-xl -z-10"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 w-full py-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-4xl font-black text-gradient mega-glow sm:text-5xl md:text-6xl"
        >
          {t.comprehensiveFeatures}
        </motion.h2>        
        
        {/* Transportation Section */}
        <FeatureSection 
          title={t.transportation} 
          subtitle={t.transportationSubtitle}
          delay={0}
        >
          <FeatureBox title={t.rideSharing} subtitle={t.rideSharingDesc} delay={0.1}>
            <FaRoute className="h-5 w-5" />
          </FeatureBox>
          <FeatureBox title={t.busReminders} subtitle={t.busRemindersDesc} delay={0.2}>
            <FaBus className="h-5 w-5" />
          </FeatureBox>
          <FeatureBox title={t.tripHistory} subtitle={t.tripHistoryDesc} delay={0.3}>
            <FaComments className="h-5 w-5" />
          </FeatureBox>
        </FeatureSection>

        {/* Food & Cafeteria Section */}
        <FeatureSection 
          title={t.foodCafeteria} 
          subtitle={t.foodSubtitle}
          delay={0.1}
        >
          <FeatureBox title={t.preOrder} subtitle={t.preOrderDesc} delay={0.4}>
            <FaPhone className="h-5 w-5" />
          </FeatureBox>
          <FeatureBox title={t.liveTracking} subtitle={t.liveTrackingDesc} delay={0.5}>
            <FaBell className="h-5 w-5" />
          </FeatureBox>
          <FeatureBox title={t.inAppChat} subtitle={t.inAppChatDesc} delay={0.6}>
            <FaComments className="h-5 w-5" />
          </FeatureBox>
          <FeatureBox title={t.campusRestaurants} subtitle={t.campusRestaurantsDesc} delay={0.7}>
            <FaUtensils className="h-5 w-5" />
          </FeatureBox>
        </FeatureSection>

        {/* Study & Assistance Section */}
        <FeatureSection 
          title={t.studyAssistance} 
          subtitle={t.studySubtitle}
          delay={0.2}
        >
          <FeatureBox title={t.bookStore} subtitle={t.bookStoreDesc} delay={0.8}>
            <FaBookOpen className="h-5 w-5" />
          </FeatureBox>
          <FeatureBox title={t.bookRequests} subtitle={t.bookRequestsDesc} delay={0.9}>
            <FaSearch className="h-5 w-5" />
          </FeatureBox>
          <FeatureBox title={t.bookDonations} subtitle={t.bookDonationsDesc} delay={1.0}>
            <FaTrophy className="h-5 w-5" />
          </FeatureBox>
          <FeatureBox title={t.examReminders} subtitle={t.examRemindersDesc} delay={1.1}>
            <FaCalendarCheck className="h-5 w-5" />
          </FeatureBox>
          <FeatureBox title={t.lostFound} subtitle={t.lostFoundDesc} delay={1.2}>
            <FaSearch className="h-5 w-5" />
          </FeatureBox>
        </FeatureSection>

        {/* Social & Campus Section */}
        <FeatureSection 
          title={t.socialCampus} 
          subtitle={t.socialSubtitle}
          delay={0.3}
        >
          <FeatureBox title={t.universityNews} subtitle={t.universityNewsDesc} delay={1.3}>
            <FaNewspaper className="h-5 w-5" />
          </FeatureBox>
          <FeatureBox title={t.opportunities} subtitle={t.opportunitiesDesc} delay={1.4}>
            <FaBriefcase className="h-5 w-5" />
          </FeatureBox>
          <FeatureBox title={t.contacts} subtitle={t.contactsDesc} delay={1.5}>
            <FaAddressBook className="h-5 w-5" />
          </FeatureBox>
          <FeatureBox title={t.events} subtitle={t.eventsDesc} delay={1.6}>
            <FaCalendarCheck className="h-5 w-5" />
          </FeatureBox>
        </FeatureSection>

        {/* Friends & Profile Section */}
        <FeatureSection 
          title={t.friendsSharing} 
          subtitle={t.friendsSubtitle}
          delay={0.4}
        >
          <FeatureBox title={t.addFriends} subtitle={t.friendsDesc} delay={1.7}>
            <FaUserFriends className="h-5 w-5" />
          </FeatureBox>
          <FeatureBox title={t.profile} subtitle={t.profileDesc} delay={1.8}>
            <FaIdCard className="h-5 w-5" />
          </FeatureBox>
          <FeatureBox title={t.achievements} subtitle={t.achievementsDesc} delay={1.9}>
            <FaTrophy className="h-5 w-5" />
          </FeatureBox>
        </FeatureSection>

        {/* Why UniGO Section */}
        <FeatureSection 
          title={t.whyUniGO} 
          subtitle={t.whyDesc}
          delay={0.5}
        >
          <FeatureBox title={t.smarter} subtitle={t.smarterDesc} delay={2.0}>
            <FaIdCard className="h-5 w-5" />
          </FeatureBox>
          <FeatureBox title={t.cheaper} subtitle={t.cheaperDesc} delay={2.1}>
            <FaBriefcase className="h-5 w-5" />
          </FeatureBox>
          <FeatureBox title={t.faster} subtitle={t.fasterDesc} delay={2.2}>
            <FaBell className="h-5 w-5" />
          </FeatureBox>
          <FeatureBox title={t.moreConnected} subtitle={t.moreConnectedDesc} delay={2.3}>
            <FaUserFriends className="h-5 w-5" />
          </FeatureBox>
        </FeatureSection>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 w-full py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass relative mx-auto max-w-6xl rounded-3xl p-12 text-center mega-glow"
        >
          <h2 className="text-gradient mb-6 text-3xl font-black sm:text-4xl md:text-5xl lg:text-6xl">
            {t.ctaTitle}
          </h2>
          <p className="mb-12 text-lg text-white/80 sm:text-xl lg:text-2xl max-w-4xl mx-auto">
            {t.ctaDesc}
          </p>
          
          {/* EPIC CTA DOWNLOAD SECTION */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl mx-auto gap-8 sm:gap-0">
            {/* Android Section */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center group"
            >
              <div className="relative mb-6">
                <div className="glass rounded-xl p-6 sm:p-8 mega-glow hover:scale-110 transition-all duration-500">
                  <FaAndroid 
                    className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28" 
                    style={{
                      color: '#ffffff',
                      fill: '#ffffff',
                      filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.4))'
                    }}
                  />
        </div>
                {/* Orbiting particle */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1 -right-1 w-2 h-2 bg-white/60 rounded-full"
            />
          </div>
      
    <motion.a
              href={import.meta.env.VITE_ANDROID_APK_URL || "/UniGO.apk"} 
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="glass px-6 py-3 rounded-lg text-white font-bold text-base hover:mega-glow transition-all duration-300 shadow-2xl"
              >
                {t.downloadAndroid}
    </motion.a>
            </motion.div>

            {/* CENTRAL EPIC DIVIDER */}
      <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative flex-1 flex justify-center items-center"
            >
              {/* Mobile horizontal divider */}
              <div className="relative sm:hidden w-32 h-1">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />
                <div className="absolute inset-0 h-2 -translate-y-0.5 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm" />
                
                {/* Mobile diamond */}
                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/70 rotate-45"
                />
        </div>
        
              {/* Desktop vertical divider */}
              <div className="relative hidden sm:block h-48 sm:h-56 lg:h-64">
                <div className="w-px h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-50" />
                <div className="absolute inset-0 w-3 -translate-x-1 h-full bg-gradient-to-b from-transparent via-white/20 to-transparent blur-sm" />
                
                {/* Animated central diamond */}
            <motion.div
                  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-1/2 -left-1.5 w-3 h-3 bg-white/70 rotate-45 shadow-lg"
                />
                
                {/* Pulsing accent lines */}
            <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/3 -left-2 w-5 h-px bg-white/40"
                />
            <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="absolute top-2/3 -left-2 w-5 h-px bg-white/40"
                />
              </div>
      </motion.div>
      
            {/* Apple Section */}
        <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center group"
            >
              <div className="relative mb-6">
                <div className="glass rounded-xl p-6 sm:p-8 mega-glow hover:scale-110 transition-all duration-500">
                  <FaApple 
                    className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28" 
                    style={{
                      color: '#ffffff',
                      fill: '#ffffff',
                      filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.4))'
                    }}
                  />
                </div>
                {/* Orbiting particle */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1 -left-1 w-2 h-2 bg-white/60 rounded-full"
                />
              </div>
              
              <motion.a
              href="https://apps.apple.com/il/app/unigo-%D9%8A%D9%88%D9%86%D9%8A-%D8%AC%D9%88/id6749590629" 
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="glass px-6 py-3 rounded-lg text-white font-bold text-base hover:mega-glow transition-all duration-300 shadow-2xl"
              >
                {t.downloadiOS}
              </motion.a>
        </motion.div>
        </div>
        </motion.div>
      </section>
      </div>
  )
}


function FeatureSection({ title, subtitle, delay, children }: {
  title: string
  subtitle: string
  delay: number
  children: React.ReactNode
}) {
  return (
      <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className="mx-auto mb-16 max-w-7xl px-4"
    >
      <div className="mb-8 text-center">
        <h3 className="text-gradient mb-2 text-2xl font-black sm:text-3xl md:text-4xl glow">
          {title}
        </h3>
        <p className="text-lg text-white/70 sm:text-xl">
          {subtitle}
        </p>
        </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {children}
      </div>
    </motion.div>
  )
}

function FeatureBox({ title, subtitle, delay, children }: {
  title: string
  subtitle: string
  delay: number
  children: React.ReactNode
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        delay: isMobile ? delay * 0.3 : delay, 
        duration: isMobile ? 0.4 : 0.6, 
        ease: "easeOut" 
      }}
      whileHover={isMobile ? {} : { y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="glass group relative cursor-pointer rounded-xl p-4 text-center transition-transform duration-200 hover:glow will-change-transform"
      style={{ 
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        perspective: 1000
      }}
    >
      <div className="mb-3 flex justify-center text-white will-change-transform">{children}</div>
      <h3 className="mb-1 text-sm font-bold text-white leading-tight">{title}</h3>
      <p className="text-xs text-white/70 leading-relaxed">{subtitle}</p>
      
      {!isMobile && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-white/2 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      )}
    </motion.div>
  )
}