import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  FaAndroid, FaApple, FaUtensils, FaBus, FaBookOpen, FaChevronDown,
  FaDownload, FaRocket, FaHeart, FaUsers, FaLightbulb, FaFire
} from 'react-icons/fa'

const translations = {
  en: {
    title: "UniGO",
    tagline: "Your Ultimate Campus Companion",
    description: "Transform your university experience with the most powerful student app ever created. Everything you need, beautifully designed.",
    downloadAndroid: "Download for Android",
    downloadiOS: "Download for iPhone",
    getApp: "Get the App",
    transportation: "Smart Transportation",
    rideSharing: "Ride Sharing (وصلني)",
    rideSharingDesc: "Connect with students, share rides, save money",
    busReminders: "Bus Alerts",
    busRemindersDesc: "Never miss your bus again",
    tripHistory: "Trip History",
    tripHistoryDesc: "Track all your journeys",
    foodCafeteria: "Food & Dining",
    preOrder: "Pre-Order Food",
    preOrderDesc: "Skip the lines, get your food fast",
    liveTracking: "Live Tracking",
    liveTrackingDesc: "See exactly when your order is ready",
    inAppChat: "Direct Chat",
    inAppChatDesc: "Message staff instantly",
    campusRestaurants: "Campus Dining",
    campusRestaurantsDesc: "Discover the best places to eat",
    studyAssistance: "Study & Learn",
    bookStore: "Book Exchange",
    bookStoreDesc: "Buy, sell, donate textbooks",
    bookRequests: "Book Requests",
    bookRequestsDesc: "Find any book you need",
    bookDonations: "Book Donations", 
    bookDonationsDesc: "Help fellow students succeed",
    examReminders: "Exam Alerts",
    examRemindersDesc: "Never miss an important exam",
    lostFound: "Lost & Found",
    lostFoundDesc: "Reunite with your belongings",
    socialCampus: "Campus Life",
    universityNews: "Campus News",
    universityNewsDesc: "Stay updated with everything happening",
    opportunities: "Opportunities",
    opportunitiesDesc: "Find jobs, internships, events",
    contacts: "Campus Directory",
    contactsDesc: "Connect with faculty and students",
    events: "Events",
    eventsDesc: "Discover and join amazing events",
    friendsSharing: "Connect & Share",
    friendsDesc: "Build your campus network and share everything seamlessly",
    profile: "Your Digital Identity",
    profileDesc: "Showcase yourself and track your achievements",
    achievements: "Unlock Rewards",
    achievementsDesc: "Earn badges for being an active community member",
    whyUniGO: "Why Students Love UniGO",
    whyDesc: "Join thousands of students who've transformed their campus experience",
    ctaTitle: "Ready to revolutionize your campus life?",
    ctaDesc: "Download UniGO now and discover what you've been missing.",
    comprehensiveFeatures: "Everything You Need",
    transportationSubtitle: "Smart rides, alerts, history",
    foodSubtitle: "Order, track, discover, chat",
    studySubtitle: "Books, exams, lost items", 
    socialSubtitle: "News, jobs, contacts, events",
    friendsSubtitle: "Network, share, achieve",
    addFriends: "Connect",
    smarter: "Smarter",
    smarterDesc: "One app for everything",
    cheaper: "Cheaper", 
    cheaperDesc: "Save money daily",
    faster: "Faster",
    fasterDesc: "Get things done instantly",
    moreConnected: "Connected",
    moreConnectedDesc: "Build lasting relationships",
    availableOn: "Available on",
    downloadNow: "Download Now",
    getStarted: "Get Started",
    joinThousands: "Join the movement",
    exploreFeatures: "Explore Features",
    swipeToDiscover: "Swipe to discover more",
    tapToDownload: "Tap to download"
  },
  ar: {
    title: "يوني جو",
    tagline: "رفيقك الجامعي المثالي",
    description: "حول تجربتك الجامعية مع أقوى تطبيق طلابي تم إنشاؤه. كل ما تحتاجه، مصمم بشكل جميل.",
    downloadAndroid: "تحميل للأندرويد",
    downloadiOS: "تحميل للآيفون",
    getApp: "احصل على التطبيق",
    transportation: "المواصلات الذكية",
    rideSharing: "مشاركة الرحلات (وصلني)",
    rideSharingDesc: "تواصل مع الطلاب، شارك الرحلات، وفر المال",
    busReminders: "تنبيهات الحافلة",
    busRemindersDesc: "لن تفوت حافلتك مرة أخرى",
    tripHistory: "تاريخ الرحلات",
    tripHistoryDesc: "تتبع جميع رحلاتك",
    foodCafeteria: "الطعام والمطاعم",
    preOrder: "طلب مسبق للطعام",
    preOrderDesc: "تخطى الطوابير، احصل على طعامك بسرعة",
    liveTracking: "التتبع المباشر",
    liveTrackingDesc: "شاهد بالضبط متى يكون طلبك جاهزاً",
    inAppChat: "دردشة مباشرة",
    inAppChatDesc: "راسل الموظفين فوراً",
    campusRestaurants: "مطاعم الحرم الجامعي",
    campusRestaurantsDesc: "اكتشف أفضل أماكن الطعام",
    studyAssistance: "الدراسة والتعلم",
    bookStore: "تبادل الكتب",
    bookStoreDesc: "اشتري، بع، تبرع بالكتب الدراسية",
    bookRequests: "طلبات الكتب",
    bookRequestsDesc: "اعثر على أي كتاب تحتاجه",
    bookDonations: "تبرعات الكتب",
    bookDonationsDesc: "ساعد زملاءك الطلاب على النجاح",
    examReminders: "تنبيهات الامتحانات",
    examRemindersDesc: "لن تفوت امتحاناً مهماً",
    lostFound: "المفقودات والموجودات",
    lostFoundDesc: "عد للقاء أغراضك",
    socialCampus: "الحياة الجامعية",
    universityNews: "أخبار الحرم الجامعي",
    universityNewsDesc: "ابق محدثاً بكل ما يحدث",
    opportunities: "الفرص",
    opportunitiesDesc: "اعثر على وظائف، تدريبات، أحداث",
    contacts: "دليل الحرم الجامعي",
    contactsDesc: "تواصل مع أعضاء هيئة التدريس والطلاب",
    events: "الأحداث",
    eventsDesc: "اكتشف وانضم لأحداث رائعة",
    friendsSharing: "التواصل والمشاركة",
    friendsDesc: "ابن شبكتك الجامعية وشارك كل شيء بسلاسة",
    profile: "هويتك الرقمية",
    profileDesc: "اعرض نفسك وتتبع إنجازاتك",
    achievements: "اكسب المكافآت",
    achievementsDesc: "احصل على شارات لكونك عضواً نشطاً في المجتمع",
    whyUniGO: "لماذا يحب الطلاب يوني جو",
    whyDesc: "انضم لآلاف الطلاب الذين حولوا تجربتهم الجامعية",
    ctaTitle: "هل أنت مستعد لثورة في حياتك الجامعية؟",
    ctaDesc: "حمل يوني جو الآن واكتشف ما كان ينقصك.",
    comprehensiveFeatures: "كل ما تحتاجه",
    transportationSubtitle: "رحلات ذكية، تنبيهات، تاريخ",
    foodSubtitle: "اطلب، تتبع، اكتشف، تحدث",
    studySubtitle: "كتب، امتحانات، أشياء مفقودة",
    socialSubtitle: "أخبار، وظائف، جهات اتصال، أحداث",
    friendsSubtitle: "تواصل، شارك، حقق",
    addFriends: "تواصل",
    smarter: "أذكى",
    smarterDesc: "تطبيق واحد لكل شيء",
    cheaper: "أرخص",
    cheaperDesc: "وفر المال يومياً",
    faster: "أسرع",
    fasterDesc: "أنجز الأمور فوراً",
    moreConnected: "متصل",
    moreConnectedDesc: "ابن علاقات دائمة",
    availableOn: "متوفر على",
    downloadNow: "حمل الآن",
    getStarted: "ابدأ",
    joinThousands: "انضم للحركة",
    exploreFeatures: "استكشف الميزات",
    swipeToDiscover: "اسحب لاكتشاف المزيد",
    tapToDownload: "اضغط للتحميل"
  }
}

export default function LandingPage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('ar')
  const t = translations[language]
  const isRTL = language === 'ar'
  
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 50])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])


  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-black ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* REVOLUTIONARY BACKGROUND */}
      <div className="fixed inset-0">
        {/* Dynamic Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/50 via-transparent to-orange-900/50"></div>
        </div>
        
        {/* Floating Orbs */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-pink-400 to-red-500 rounded-full blur-3xl opacity-20 animate-pulse"
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-3xl opacity-10"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* FLOATING LANGUAGE TOGGLE */}
      <motion.div 
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <motion.button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white/10 backdrop-blur-xl rounded-full p-3 border border-white/20 shadow-2xl"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              {language === 'en' ? '🇸🇦' : '🇺🇸'}
            </span>
          </div>
        </motion.button>
      </motion.div>

      {/* HERO SECTION - MOBILE PERFECTION */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        
        {/* APP ICON MOCKUP */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="mb-8"
        >
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center">
              <FaRocket className="text-white text-3xl" />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-xl opacity-50"></div>
          </div>
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className={`text-6xl md:text-8xl font-black text-center mb-4 ${isRTL ? 'font-arabic' : ''}`}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {t.title}
        </motion.h1>

        {/* TAGLINE */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-2xl md:text-3xl text-white/90 font-semibold text-center mb-6 max-w-4xl leading-relaxed"
        >
          {t.tagline}
        </motion.p>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg md:text-xl text-white/80 text-center mb-12 max-w-3xl leading-relaxed px-4"
        >
          {t.description}
        </motion.p>

        {/* DOWNLOAD BUTTONS - MOBILE OPTIMIZED */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col w-full max-w-md gap-4 mb-16"
        >
          {/* iOS Button */}
          <motion.a
            href="https://apps.apple.com/il/app/unigo-%D9%8A%D9%88%D9%86%D9%8A-%D8%AC%D9%88/id6749590629"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-6 shadow-2xl overflow-hidden"
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 rounded-xl p-3">
                  <FaApple className="text-white text-3xl" />
                </div>
                <div className="text-left">
                  <div className="text-white/80 text-sm font-medium">{t.availableOn}</div>
                  <div className="text-white text-xl font-bold">App Store</div>
                </div>
              </div>
              <FaDownload className="text-white/60 text-2xl" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </motion.a>

          {/* Android Button */}
          <motion.a
            href={import.meta.env.VITE_ANDROID_APK_URL || "https://drive.usercontent.google.com/download?id=184JICRsz820zwfE4g9iFvPeZStiHHFWr&export=download&authuser=0&confirm=t&uuid=dcd0327b-1ce7-4f35-8cc8-bfdf936de398&at=AN8xHoooLM9arcp9i6mlnmOPJP_Z%3A1757209421074"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-6 shadow-2xl overflow-hidden"
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 rounded-xl p-3">
                  <FaAndroid className="text-white text-3xl" />
                </div>
                <div className="text-left">
                  <div className="text-white/80 text-sm font-medium">{t.availableOn}</div>
                  <div className="text-white text-xl font-bold">Android APK</div>
                </div>
              </div>
              <FaDownload className="text-white/60 text-2xl" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </motion.a>
        </motion.div>

        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60"
          >
            <FaChevronDown className="text-2xl mb-2" />
            <p className="text-sm font-medium">{t.exploreFeatures}</p>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES SECTION - REVOLUTIONARY MOBILE CARDS */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6">
              {t.comprehensiveFeatures}
            </h2>
          </motion.div>

          {/* Feature Cards - Mobile Optimized */}
          <div className="space-y-8">
            
            {/* Transportation Card */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
            >
              <div className="flex items-start gap-6">
                <div className="bg-blue-500/20 rounded-2xl p-4 flex-shrink-0">
                  <FaBus className="text-blue-400 text-4xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{t.transportation}</h3>
                  <p className="text-white/70 mb-4">{t.transportationSubtitle}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                      {t.rideSharing}
                    </span>
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                      {t.busReminders}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Food Card */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-orange-900/40 to-red-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
            >
              <div className="flex items-start gap-6">
                <div className="bg-orange-500/20 rounded-2xl p-4 flex-shrink-0">
                  <FaUtensils className="text-orange-400 text-4xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{t.foodCafeteria}</h3>
                  <p className="text-white/70 mb-4">{t.foodSubtitle}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm font-medium">
                      {t.preOrder}
                    </span>
                    <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm font-medium">
                      {t.liveTracking}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Study Card */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
            >
              <div className="flex items-start gap-6">
                <div className="bg-green-500/20 rounded-2xl p-4 flex-shrink-0">
                  <FaBookOpen className="text-green-400 text-4xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{t.studyAssistance}</h3>
                  <p className="text-white/70 mb-4">{t.studySubtitle}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                      {t.bookStore}
                    </span>
                    <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                      {t.examReminders}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Card */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
            >
              <div className="flex items-start gap-6">
                <div className="bg-purple-500/20 rounded-2xl p-4 flex-shrink-0">
                  <FaUsers className="text-purple-400 text-4xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{t.socialCampus}</h3>
                  <p className="text-white/70 mb-4">{t.socialSubtitle}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                      {t.universityNews}
                    </span>
                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                      {t.events}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY UNIGO SECTION */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
          >
            <div className="mb-8">
              <FaFire className="text-6xl text-orange-400 mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-4">
                {t.whyUniGO}
              </h2>
              <p className="text-xl text-white/80 mb-8">
                {t.whyDesc}
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <FaLightbulb className="text-3xl text-yellow-400 mx-auto mb-2" />
                <h3 className="text-lg font-bold text-white mb-1">{t.smarter}</h3>
                <p className="text-white/60 text-sm">{t.smarterDesc}</p>
              </div>
              <div className="text-center">
                <FaRocket className="text-3xl text-blue-400 mx-auto mb-2" />
                <h3 className="text-lg font-bold text-white mb-1">{t.faster}</h3>
                <p className="text-white/60 text-sm">{t.fasterDesc}</p>
              </div>
              <div className="text-center">
                <FaHeart className="text-3xl text-red-400 mx-auto mb-2" />
                <h3 className="text-lg font-bold text-white mb-1">{t.cheaper}</h3>
                <p className="text-white/60 text-sm">{t.cheaperDesc}</p>
              </div>
              <div className="text-center">
                <FaUsers className="text-3xl text-green-400 mx-auto mb-2" />
                <h3 className="text-lg font-bold text-white mb-1">{t.moreConnected}</h3>
                <p className="text-white/60 text-sm">{t.moreConnectedDesc}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative z-10 py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6">
            {t.ctaTitle}
          </h2>
          <p className="text-xl text-white/80 mb-12">
            {t.ctaDesc}
          </p>
          
          {/* Final Download Buttons */}
          <div className="flex flex-col gap-4 max-w-md mx-auto">
            <motion.a
              href="https://apps.apple.com/il/app/unigo-%D9%8A%D9%88%D9%86%D9%8A-%D8%AC%D9%88/id6749590629"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 text-white font-bold text-lg shadow-2xl flex items-center justify-center gap-3"
            >
              <FaApple className="text-2xl" />
              {t.downloadiOS}
            </motion.a>
            
            <motion.a
              href={import.meta.env.VITE_ANDROID_APK_URL || "https://drive.usercontent.google.com/download?id=184JICRsz820zwfE4g9iFvPeZStiHHFWr&export=download&authuser=0&confirm=t&uuid=dcd0327b-1ce7-4f35-8cc8-bfdf936de398&at=AN8xHoooLM9arcp9i6mlnmOPJP_Z%3A1757209421074"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-4 text-white font-bold text-lg shadow-2xl flex items-center justify-center gap-3"
            >
              <FaAndroid className="text-2xl" />
              {t.downloadAndroid}
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}<!-- Auto-deploy test -->
