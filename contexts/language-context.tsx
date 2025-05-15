"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define available languages
export type Language = "en" | "es" | "fr"

// Define the context type
type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

// Define props for the provider
interface LanguageProviderProps {
  children: ReactNode
}

// Create translations object
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.reviews": "Reviews",
    "nav.map": "Map",
    "nav.about": "About",
    "nav.login": "Log In",
    "nav.signup": "Sign Up",
    "nav.search": "Search by cuisine",
    "nav.spots": "Spots",

    // Hero
    "hero.title": "Taste the Soul of Trinidad & Tobago",
    "hero.description":
      "Find authentic local favourites, hidden gems and most delicious street food across Trinidad and Tobago.",
    "hero.write_review": "Write a Review",
    "hero.explore_reviews": "Explore Reviews",
    "hero.join": "Join 5,000+ food lovers sharing authentic experiences",
    "hero.featured": "Featured Review",
    "hero.find_spot": "Find a Spot",
    "hero.submit_spot": "Submit a Spot",

    // Trending Reviews
    "trending.title": "Trending Reviews",
    "trending.subtitle": "See what's hot in the street food scene right now",
    "trending.sort": "Sort by:",
    "trending.most_rated": "Most Rated",
    "trending.highest_rated": "Highest Rated",
    "trending.newest": "Newest",
    "trending.oldest": "Oldest",
    "trending.view_all": "View All Reviews",
    "trending.days_ago": "days ago",
    "trending.weeks_ago": "weeks ago",
    "trending.months_ago": "months ago",

    // Map Section
    "map.title": "Discover Hidden Food Spots",
    "map.subtitle":
      "Explore our interactive map to find underrated local vendors and hidden culinary gems across Trinidad and Tobago",
    "map.popular": "Popular Locations",
    "map.reviews": "reviews",

    // Community Section
    "community.title": "Join Our Foodie Community",
    "community.subtitle":
      "Connect with fellow food enthusiasts, share your culinary adventures, and discover hidden gems across Trinidad and Tobago.",
    "community.share.title": "Share Your Experiences",
    "community.share.description":
      "Write detailed reviews of your favorite street food spots and help others discover amazing local cuisine.",
    "community.showcase.title": "Showcase Your Finds",
    "community.showcase.description":
      "Upload photos of mouthwatering dishes and create a visual feast for the community.",
    "community.discover.title": "Discover New Places",
    "community.discover.description":
      "Explore our interactive map to find hidden culinary gems across Trinidad and Tobago.",
    "community.connect.title": "Connect With Foodies",
    "community.connect.description":
      "Follow other food enthusiasts, engage in discussions, and build your foodie network.",

    // Footer
    "footer.description": "Connecting food lovers with the best street food experiences across Trinidad and Tobago.",
    "footer.quick_links": "Quick Links",
    "footer.about_us": "About Us",
    "footer.popular_spots": "Popular Spots",
    "footer.write_review": "Write a Review",
    "footer.contact_us": "Contact Us",
    "footer.connect": "Connect With Us",
    "footer.social_description": "Follow us on social media for the latest updates on Trinidad's food scene.",
    "footer.rights": "All rights reserved.",

    // Language Selector
    "language.select": "Select Language",
    "language.en": "English",
    "language.es": "Spanish",
    "language.fr": "French",

    "about.title": "About Streetstyle",
    "about.subtitle": "Connecting food lovers with the best street food experiences across Trinidad and Tobago",
    "about.our_story.title": "Our Story",
    "about.our_story.p1":
      "Streetstyle began in 2020 when a group of passionate food enthusiasts from Trinidad and Tobago came together with a shared vision: to celebrate and promote the rich culinary heritage of our beautiful islands.",
    "about.our_story.p2":
      "What started as a small blog documenting our favorite street food spots quickly grew into a vibrant community of food lovers, chefs, and local vendors all united by our love for authentic Trinbagonian cuisine.",
    "about.our_story.p3":
      "Today, Streetstyle is the premier platform for discovering, reviewing, and sharing the best food experiences across Trinidad and Tobago, from the bustling streets of Port of Spain to the serene beaches of Tobago.",
    "about.our_mission.title": "Our Mission",
    "about.our_mission.description":
      "At Streetstyle, we're on a mission to celebrate and preserve the rich culinary heritage of Trinidad and Tobago by connecting food lovers with authentic local experiences.",
    "about.our_mission.connect.title": "Connect",
    "about.our_mission.connect.description":
      "Building bridges between food enthusiasts and local vendors to create a thriving community.",
    "about.our_mission.promote.title": "Promote",
    "about.our_mission.promote.description":
      "Showcasing the diverse flavors and culinary traditions that make our islands unique.",
    "about.our_mission.support.title": "Support",
    "about.our_mission.support.description":
      "Helping small food businesses thrive by increasing their visibility and connecting them with customers.",

    "team.title": "Meet the Team",
    "team.subtitle":
      "The passionate individuals behind Streetstyle who are dedicated to showcasing the best of Trinidad and Tobago's food scene.",
    "team.roles.founder": "Founder & CEO",
    "team.roles.culinary_director": "Culinary Director",
    "team.roles.community_manager": "Community Manager",
    "team.roles.tech_lead": "Tech Lead",
    "team.bios.maria":
      "Maria founded Streetstyle with a vision to celebrate Trinidad and Tobago's vibrant street food culture. With a background in hospitality and a passion for local cuisine, she leads our team in discovering and promoting authentic food experiences.",
    "team.bios.anil":
      "A trained chef with over 15 years of experience, Anil brings his culinary expertise to Streetstyle. He oversees our food quality standards and works closely with vendors to highlight traditional cooking techniques and recipes.",
    "team.bios.cheryl":
      "Cheryl manages our growing community of food enthusiasts. With her background in event planning and social media management, she creates engaging experiences that bring our community together both online and offline.",
    "team.bios.jerome":
      "Jerome leads our technology initiatives, ensuring that Streetstyle provides a seamless experience across all platforms. His innovative approach has helped us develop features that make discovering and sharing food experiences easier than ever.",

    "reviews.title": "Food Reviews",
    "reviews.subtitle": "Discover authentic experiences from our community of food lovers",
    "reviews.search_placeholder": "Search for restaurants, dishes, or locations",
    "reviews.search_button": "Search",
    "reviews.tabs.all": "All Reviews",
    "reviews.tabs.top_rated": "Top Rated",
    "reviews.tabs.recent": "Recent",
    "reviews.filter_by_cuisine": "Filter by Cuisine",
    "reviews.sort_by": "Sort by",
    "reviews.filters.newest": "Newest",
    "reviews.filters.highest_rated": "Highest Rated",
    "reviews.filters.most_liked": "Most Liked",
    "reviews.filters.most_commented": "Most Commented",
    "reviews.results": "Results",
    "reviews.read_more": "Read More",
    "reviews.no_results": "No reviews found matching your criteria",
    "reviews.previous": "Previous",
    "reviews.next": "Next",
    "reviews.cuisines.all": "All Cuisines",
    "reviews.cuisines.trinidadian": "Trinidadian",
    "reviews.cuisines.tobagonian": "Tobagonian",
    "reviews.cuisines.indian": "Indian",
    "reviews.cuisines.chinese": "Chinese",
    "reviews.cuisines.creole": "Creole",
    "reviews.cuisines.bbq": "BBQ",
    "reviews.cuisines.seafood": "Seafood",
    "reviews.cuisines.street_food": "Street Food",

    "vendors.title": "Trending Vendors",
    "vendors.subtitle": "Discover hidden and underrated local food spots",
    "vendors.filter": "Filter:",
    "vendors.explore_all": "Explore All Spots",
  },
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.reviews": "Reseñas",
    "nav.map": "Mapa",
    "nav.about": "Acerca de",
    "nav.login": "Iniciar Sesión",
    "nav.signup": "Registrarse",
    "nav.search": "Buscar por cocina",

    // Hero
    "hero.title": "Saborea el Alma de Trinidad y Tobago",
    "hero.description":
      "Encuentra favoritos locales auténticos, joyas escondidas y la comida callejera más deliciosa de Trinidad y Tobago.",
    "hero.write_review": "Escribir una Reseña",
    "hero.explore_reviews": "Explorar Reseñas",
    "hero.join": "Únete a más de 5,000 amantes de la comida compartiendo experiencias auténticas",
    "hero.featured": "Reseña Destacada",

    // Trending Reviews
    "trending.title": "Reseñas Tendencia",
    "trending.subtitle": "Mira lo que está de moda en la escena de comida callejera ahora mismo",
    "trending.sort": "Ordenar por:",
    "trending.most_rated": "Más Calificados",
    "trending.highest_rated": "Mejor Calificados",
    "trending.newest": "Más Recientes",
    "trending.oldest": "Más Antiguos",
    "trending.view_all": "Ver Todas las Reseñas",
    "trending.days_ago": "días atrás",
    "trending.weeks_ago": "semanas atrás",
    "trending.months_ago": "meses atrás",

    // Map Section
    "map.title": "Mapa de Lugares de Comida",
    "map.subtitle": "Descubre los mejores lugares de comida callejera en Trinidad y Tobago",
    "map.popular": "Ubicaciones Populares",
    "map.reviews": "reseñas",

    // Community Section
    "community.title": "Únete a Nuestra Comunidad Gastronómica",
    "community.subtitle":
      "Conéctate con otros entusiastas de la comida, comparte tus aventuras culinarias y descubre joyas escondidas en Trinidad y Tobago.",
    "community.share.title": "Comparte Tus Experiencias",
    "community.share.description":
      "Escribe reseñas detalladas de tus lugares favoritos de comida callejera y ayuda a otros a descubrir la increíble cocina local.",
    "community.showcase.title": "Muestra Tus Descubrimientos",
    "community.showcase.description": "Sube fotos de platos apetitosos y crea un festín visual para la comunidad.",
    "community.discover.title": "Descubre Nuevos Lugares",
    "community.discover.description":
      "Explora nuestro mapa interactivo para encontrar joyas culinarias escondidas en Trinidad y Tobago.",
    "community.connect.title": "Conéctate Con Foodies",
    "community.connect.description":
      "Sigue a otros entusiastas de la comida, participa en discusiones y construye tu red gastronómica.",

    // Footer
    "footer.description":
      "Conectando a los amantes de la comida con las mejores experiencias de comida callejera en Trinidad y Tobago.",
    "footer.quick_links": "Enlaces Rápidos",
    "footer.about_us": "Sobre Nosotros",
    "footer.popular_spots": "Lugares Populares",
    "footer.write_review": "Escribir una Reseña",
    "footer.contact_us": "Contáctanos",
    "footer.connect": "Conéctate Con Nosotros",
    "footer.social_description":
      "Síguenos en las redes sociales para las últimas actualizaciones sobre la escena gastronómica de Trinidad.",
    "footer.rights": "Todos los derechos reservados.",

    // Language Selector
    "language.select": "Seleccionar Idioma",
    "language.en": "Inglés",
    "language.es": "Español",
    "language.fr": "Francés",

    "about.title": "Sobre Streetstyle",
    "about.subtitle":
      "Conectando a los amantes de la comida con las mejores experiencias de comida callejera en Trinidad y Tobago",
    "about.our_story.title": "Nuestra Historia",
    "about.our_story.p1":
      "Streetstyle comenzó en 2020 cuando un grupo de entusiastas apasionados de la comida de Trinidad y Tobago se unieron con una visión compartida: celebrar y promover el rico patrimonio culinario de nuestras hermosas islas.",
    "about.our_story.p2":
      "Lo que comenzó como un pequeño blog documentando nuestros lugares favoritos de comida callejera rápidamente se convirtió en una vibrante comunidad de amantes de la comida, chefs y vendedores locales, todos unidos por nuestro amor por la auténtica cocina de Trinidad y Tobago.",
    "about.our_story.p3":
      "Hoy, Streetstyle es la plataforma principal para descubrir, reseñar y compartir las mejores experiencias gastronómicas en Trinidad y Tobago, desde las bulliciosas calles de Port of Spain hasta las serenas playas de Tobago.",
    "about.our_mission.title": "Nuestra Misión",
    "about.our_mission.description":
      "En Streetstyle, nuestra misión es celebrar y preservar el rico patrimonio culinario de Trinidad y Tobago conectando a los amantes de la comida con experiencias locales auténticas.",
    "about.our_mission.connect.title": "Conectar",
    "about.our_mission.connect.description":
      "Construir puentes entre entusiastas de la comida y vendedores locales para crear una comunidad próspera.",
    "about.our_mission.promote.title": "Promover",
    "about.our_mission.promote.description":
      "Mostrar los diversos sabores y tradiciones culinarias que hacen únicas a nuestras islas.",
    "about.our_mission.support.title": "Apoyar",
    "about.our_mission.support.description":
      "Ayudar a los pequeños negocios de comida a prosperar aumentando su visibilidad y conectándolos con los clientes.",

    "team.title": "Conoce al Equipo",
    "team.subtitle":
      "Las personas apasionadas detrás de Streetstyle que se dedican a mostrar lo mejor de la escena gastronómica de Trinidad y Tobago.",
    "team.roles.founder": "Fundadora y CEO",
    "team.roles.culinary_director": "Director Culinario",
    "team.roles.community_manager": "Gerente de Comunidad",
    "team.roles.tech_lead": "Líder Técnico",
    "team.bios.maria":
      "Maria fundó Streetstyle con la visión de celebrar la vibrante cultura de comida callejera de Trinidad y Tobago. Con experiencia en hostelería y pasión por la cocina local, lidera nuestro equipo en el descubrimiento y promoción de experiencias gastronómicas auténticas.",
    "team.bios.anil":
      "Chef capacitado con más de 15 años de experiencia, Anil aporta su experiencia culinaria a Streetstyle. Supervisa nuestros estándares de calidad alimentaria y trabaja estrechamente con los vendedores para destacar técnicas y recetas de cocina tradicionales.",
    "team.bios.cheryl":
      "Cheryl gestiona nuestra creciente comunidad de entusiastas de la comida. Con su experiencia en planificación de eventos y gestión de redes sociales, crea experiencias atractivas que unen a nuestra comunidad tanto en línea como fuera de línea.",
    "team.bios.jerome":
      "Jerome lidera nuestras iniciativas tecnológicas, asegurando que Streetstyle proporcione una experiencia fluida en todas las plataformas. Su enfoque innovador nos ha ayudado a desarrollar características que facilitan más que nunca el descubrimiento y compartir experiencias gastronómicas.",

    "reviews.title": "Reseñas de Comida",
    "reviews.subtitle": "Descubre experiencias auténticas de nuestra comunidad de amantes de la comida",
    "reviews.search_placeholder": "Buscar restaurantes, platos o ubicaciones",
    "reviews.search_button": "Buscar",
    "reviews.tabs.all": "Todas las Reseñas",
    "reviews.tabs.top_rated": "Mejor Valoradas",
    "reviews.tabs.recent": "Recientes",
    "reviews.filter_by_cuisine": "Filtrar por Cocina",
    "reviews.sort_by": "Ordenar por",
    "reviews.filters.newest": "Más Recientes",
    "reviews.filters.highest_rated": "Mejor Valoradas",
    "reviews.filters.most_liked": "Más Gustadas",
    "reviews.filters.most_commented": "Más Comentadas",
    "reviews.results": "Resultados",
    "reviews.read_more": "Leer Más",
    "reviews.no_results": "No se encontraron reseñas que coincidan con tus criterios",
    "reviews.previous": "Anterior",
    "reviews.next": "Siguiente",
    "reviews.cuisines.all": "Todas las Cocinas",
    "reviews.cuisines.trinidadian": "Trinitense",
    "reviews.cuisines.tobagonian": "Tobagoniana",
    "reviews.cuisines.indian": "India",
    "reviews.cuisines.chinese": "China",
    "reviews.cuisines.creole": "Criolla",
    "reviews.cuisines.bbq": "Barbacoa",
    "reviews.cuisines.seafood": "Mariscos",
    "reviews.cuisines.street_food": "Comida Callejera",
  },
  fr: {
    // Navbar
    "nav.home": "Accueil",
    "nav.reviews": "Avis",
    "nav.map": "Carte",
    "nav.about": "À Propos",
    "nav.login": "Connexion",
    "nav.signup": "S'inscrire",
    "nav.search": "Rechercher par cuisine",

    // Hero
    "hero.title": "Goûtez l'Âme de Trinité-et-Tobago",
    "hero.description":
      "Découvrez des favoris locaux authentiques, des joyaux cachés et la street food la plus délicieuse de Trinité-et-Tobago.",
    "hero.write_review": "Écrire un Avis",
    "hero.explore_reviews": "Explorer les Avis",
    "hero.join": "Rejoignez plus de 5 000 amateurs de nourriture partageant des expériences authentiques",
    "hero.featured": "Avis en Vedette",

    // Trending Reviews
    "trending.title": "Avis Tendance",
    "trending.subtitle": "Découvrez ce qui est populaire dans la scène de street food en ce moment",
    "trending.sort": "Trier par :",
    "trending.most_rated": "Plus Notés",
    "trending.highest_rated": "Mieux Notés",
    "trending.newest": "Plus Récents",
    "trending.oldest": "Plus Anciens",
    "trending.view_all": "Voir Tous les Avis",
    "trending.days_ago": "jours",
    "trending.weeks_ago": "semaines",
    "trending.months_ago": "mois",

    // Map Section
    "map.title": "Carte des Points de Restauration",
    "map.subtitle": "Découvrez les meilleurs endroits de street food à Trinité-et-Tobago",
    "map.popular": "Lieux Populaires",
    "map.reviews": "avis",

    // Community Section
    "community.title": "Rejoignez Notre Communauté Gastronomique",
    "community.subtitle":
      "Connectez-vous avec d'autres passionnés de cuisine, partagez vos aventures culinaires et découvrez des joyaux cachés à Trinité-et-Tobago.",
    "community.share.title": "Partagez Vos Expériences",
    "community.share.description":
      "Rédigez des avis détaillés sur vos spots de street food préférés et aidez les autres à découvrir la cuisine locale incroyable.",
    "community.showcase.title": "Présentez Vos Trouvailles",
    "community.showcase.description":
      "Téléchargez des photos de plats appétissants et créez un festin visuel pour la communauté.",
    "community.discover.title": "Découvrez de Nouveaux Endroits",
    "community.discover.description":
      "Explorez notre carte interactive pour trouver des joyaux culinaires cachés à Trinité-et-Tobago.",
    "community.connect.title": "Connectez-vous Avec des Gourmets",
    "community.connect.description":
      "Suivez d'autres passionnés de cuisine, participez aux discussions et construisez votre réseau gastronomique.",

    // Footer
    "footer.description":
      "Connecter les amateurs de cuisine aux meilleures expériences de street food à Trinité-et-Tobago.",
    "footer.quick_links": "Liens Rapides",
    "footer.about_us": "À Propos de Nous",
    "footer.popular_spots": "Endroits Populaires",
    "footer.write_review": "Écrire un Avis",
    "footer.contact_us": "Contactez-Nous",
    "footer.connect": "Connectez-Vous Avec Nous",
    "footer.social_description":
      "Suivez-nous sur les réseaux sociaux pour les dernières mises à jour sur la scène culinaire de Trinité.",
    "footer.rights": "Tous droits réservés.",

    // Language Selector
    "language.select": "Sélectionner la Langue",
    "language.en": "Anglais",
    "language.es": "Espagnol",

    "language.fr": "Français",

    "about.title": "À Propos de Streetstyle",
    "about.subtitle": "Connecter les amateurs de cuisine aux meilleures expériences de street food à Trinité-et-Tobago",
    "about.our_story.title": "Notre Histoire",
    "about.our_story.p1":
      "Streetstyle a débuté en 2020 lorsqu'un groupe de passionnés de cuisine de Trinité-et-Tobago s'est réuni avec une vision commune : célébrer et promouvoir le riche patrimoine culinaire de nos belles îles.",
    "about.our_story.p2":
      "Ce qui a commencé comme un petit blog documentant nos spots de street food préférés s'est rapidement transformé en une communauté dynamique d'amateurs de cuisine, de chefs et de vendeurs locaux, tous unis par notre amour pour la cuisine authentique de Trinité-et-Tobago.",
    "about.our_story.p3":
      "Aujourd'hui, Streetstyle est la plateforme principale pour découvrir, évaluer et partager les meilleures expériences culinaires à travers Trinité-et-Tobago, des rues animées de Port of Spain aux plages sereines de Tobago.",
    "about.our_mission.title": "Notre Mission",
    "about.our_mission.description":
      "Chez Streetstyle, notre mission est de célébrer et de préserver le riche patrimoine culinaire de Trinité-et-Tobago en connectant les amateurs de cuisine à des expériences locales authentiques.",
    "about.our_mission.connect.title": "Connecter",
    "about.our_mission.connect.description":
      "Construire des ponts entre les passionnés de cuisine et les vendeurs locaux pour créer une communauté florissante.",
    "about.our_mission.promote.title": "Promouvoir",
    "about.our_mission.promote.description":
      "Mettre en valeur les saveurs diverses et les traditions culinaires qui rendent nos îles uniques.",
    "about.our_mission.support.title": "Soutenir",
    "about.our_mission.support.description":
      "Aider les petites entreprises alimentaires à prospérer en augmentant leur visibilité et en les connectant avec des clients.",

    "team.title": "Rencontrez l'Équipe",
    "team.subtitle":
      "Les personnes passionnées derrière Streetstyle qui se consacrent à mettre en valeur le meilleur de la scène culinaire de Trinité-et-Tobago.",
    "team.roles.founder": "Fondatrice et PDG",
    "team.roles.culinary_director": "Directeur Culinair",
    "team.roles.community_manager": "Responsable de la Communauté",
    "team.roles.tech_lead": "Responsable Technique",
    "team.bios.maria":
      "Maria a fondé Streetstyle avec la vision de célébrer la culture vibrante de la street food de Trinité-et-Tobago. Avec une expérience dans l'hôtellerie et une passion pour la cuisine locale, elle dirige notre équipe dans la découverte et la promotion d'expériences culinaires authentiques.",
    "team.bios.anil":
      "Chef formé avec plus de 15 ans d'expérience, Anil apporte son expertise culinaire à Streetstyle. Il supervise nos normes de qualité alimentaire et travaille étroitement avec les vendeurs pour mettre en valeur les techniques et recettes de cuisine traditionnelles.",
    "team.bios.cheryl":
      "Cheryl gère notre communauté croissante d'amateurs de cuisine. Avec son expérience en planification d'événements et en gestion des médias sociaux, elle crée des expériences engageantes qui rassemblent notre communauté à la fois en ligne et hors ligne.",
    "team.bios.jerome":
      "Jerome dirige nos initiatives technologiques, s'assurant que Streetstyle offre une expérience fluide sur toutes les plateformes. Son approche innovante nous a aidés à développer des fonctionnalités qui facilitent plus que jamais la découverte et le partage d'expériences culinaires.",

    "reviews.title": "Avis Culinaires",
    "reviews.subtitle": "Découvrez des expériences authentiques de notre communauté d'amateurs de cuisine",
    "reviews.search_placeholder": "Rechercher des restaurants, des plats ou des lieux",
    "reviews.search_button": "Rechercher",
    "reviews.tabs.all": "Tous les Avis",
    "reviews.tabs.top_rated": "Mieux Notés",
    "reviews.tabs.recent": "Récents",
    "reviews.filter_by_cuisine": "Filtrer par Cuisine",
    "reviews.sort_by": "Trier par",
    "reviews.filters.newest": "Plus Récents",
    "reviews.filters.highest_rated": "Mieux Notés",
    "reviews.filters.most_liked": "Plus Aimés",
    "reviews.filters.most_commented": "Plus Commentés",
    "reviews.results": "Résultats",
    "reviews.read_more": "Lire Plus",
    "reviews.no_results": "Aucun avis trouvé correspondant à vos critères",
    "reviews.previous": "Précédent",
    "reviews.next": "Suivant",
    "reviews.cuisines.all": "Toutes les Cuisines",
    "reviews.cuisines.trinidadian": "Trinidadienne",
    "reviews.cuisines.tobagonian": "Tobagonienne",
    "reviews.cuisines.indian": "Indienne",
    "reviews.cuisines.chinese": "Chinoise",
    "reviews.cuisines.creole": "Créole",
    "reviews.cuisines.bbq": "Barbecue",
    "reviews.cuisines.seafood": "Fruits de Mer",
    "reviews.cuisines.street_food": "Street Food",
  },
}

// Create the provider component
export function LanguageProvider({ children }: LanguageProviderProps) {
  // Initialize with browser language or default to English
  const [language, setLanguageState] = useState<Language>("en")

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "es", "fr"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0] as Language
      if (["en", "es", "fr"].includes(browserLang)) {
        setLanguageState(browserLang)
      }
    }
  }, [])

  // Function to set language and save to localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
