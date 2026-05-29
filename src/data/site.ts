import {
  Baby,
  BookOpenCheck,
  Brain,
  Brush,
  Building2,
  CalendarCheck,
  CheckCircle2,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  Home,
  Landmark,
  Mail,
  MapPin,
  Music2,
  Palette,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  UsersRound
} from "lucide-react";

export const siteInfo = {
  name: "Arpanam Kids School",
  shortName: "Arpanam",
  tagline: "A nurturing preschool where confident little learners begin beautifully.",
  admissionYear: "2026-2027",
  phone: "+91 98765 43210",
  email: "admissions@arpanamkids.school",
  address: "Arpanam Kids School Campus, Main Road, India",
  socials: ["Instagram", "Facebook", "YouTube"]
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Activities", href: "/activities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact Us", href: "/contact" }
];

export const imageLibrary = {
  hero:
    "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?auto=format&fit=crop&w=1200&q=85",
  building:
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85",
  classroom:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=85",
  children:
    "https://images.unsplash.com/photo-1544776193-32d404ae608a?auto=format&fit=crop&w=1200&q=85",
  art:
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85",
  music:
    "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1200&q=85",
  sports:
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85",
  playground:
    "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=85",
  science:
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85",
  celebration:
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=85"
};

export const whyChooseUs = [
  {
    title: "Child-Centric Learning",
    description: "Personal attention, joyful discovery, and age-appropriate milestones for every child.",
    icon: HandHeart,
    className: "from-sky-100 to-blue-50 text-primary"
  },
  {
    title: "Safe Environment",
    description: "Secure spaces, caring supervision, and calm routines that help children feel at home.",
    icon: ShieldCheck,
    className: "from-green-100 to-emerald-50 text-green-700"
  },
  {
    title: "Experienced Teachers",
    description: "Warm educators who balance affection, structure, creativity, and foundational skills.",
    icon: UsersRound,
    className: "from-purple-100 to-violet-50 text-purple-700"
  },
  {
    title: "Creative Activities",
    description: "Daily arts, movement, music, stories, and sensory work for curious young minds.",
    icon: Palette,
    className: "from-pink-100 to-rose-50 text-pink-700"
  },
  {
    title: "Modern Classrooms",
    description: "Bright classrooms designed for learning, play, collaboration, and confidence.",
    icon: Building2,
    className: "from-amber-100 to-yellow-50 text-amber-700"
  }
];

export const programs = [
  {
    title: "Jr. KG.",
    age: "4+ Years",
    description:
      "A gentle bridge into structured learning through phonics readiness, numbers, stories, creativity, and social skills.",
    image: imageLibrary.children,
    color: "from-sky-500 to-blue-700",
    icon: Baby,
    bullets: ["Language readiness", "Number sense", "Fine motor practice", "Rhymes and stories"]
  },
  {
    title: "Sr. KG.",
    age: "5+ Years",
    description:
      "School-readiness with confident communication, early literacy, math foundations, projects, and independence.",
    image: imageLibrary.classroom,
    color: "from-amber-400 to-orange-600",
    icon: GraduationCap,
    bullets: ["Reading readiness", "Writing fluency", "Math foundations", "Confidence building"]
  },
  {
    title: "Balvatika",
    age: "Foundational Years",
    description:
      "A joyful foundational program inspired by activity-based learning, values, curiosity, and whole-child growth.",
    image: imageLibrary.playground,
    color: "from-green-400 to-emerald-600",
    icon: BookOpenCheck,
    bullets: ["Play-based discovery", "Values education", "Creative expression", "Physical development"]
  }
];

export const activities = [
  {
    title: "Dance",
    description: "Movement, rhythm, stage confidence, and expressive body coordination.",
    icon: Sparkles,
    image: imageLibrary.celebration,
    color: "bg-pink-100 text-pink-700"
  },
  {
    title: "Music",
    description: "Rhymes, rhythm patterns, instruments, listening skills, and joyful performance.",
    icon: Music2,
    image: imageLibrary.music,
    color: "bg-purple-100 text-purple-700"
  },
  {
    title: "Art & Craft",
    description: "Creative hands-on projects that build imagination, patience, and fine motor strength.",
    icon: Brush,
    image: imageLibrary.art,
    color: "bg-amber-100 text-amber-700"
  },
  {
    title: "Sports",
    description: "Outdoor games, balance, teamwork, coordination, and energetic healthy habits.",
    icon: Trophy,
    image: imageLibrary.sports,
    color: "bg-green-100 text-green-700"
  },
  {
    title: "STEM Learning",
    description: "Simple experiments, building, sorting, patterns, questions, and problem-solving play.",
    icon: Brain,
    image: imageLibrary.science,
    color: "bg-sky-100 text-sky-700"
  }
];

export const galleryItems = [
  {
    title: "Morning Circle",
    category: "Classroom",
    src: imageLibrary.classroom,
    height: "md:row-span-2"
  },
  {
    title: "Creative Hands",
    category: "Activities",
    src: imageLibrary.art,
    height: ""
  },
  {
    title: "Music Day",
    category: "Activities",
    src: imageLibrary.music,
    height: ""
  },
  {
    title: "Annual Celebration",
    category: "Celebrations",
    src: imageLibrary.celebration,
    height: "md:row-span-2"
  },
  {
    title: "Learning Together",
    category: "Classroom",
    src: imageLibrary.children,
    height: ""
  },
  {
    title: "Outdoor Play",
    category: "Events",
    src: imageLibrary.playground,
    height: ""
  },
  {
    title: "Little Scientists",
    category: "Activities",
    src: imageLibrary.science,
    height: ""
  },
  {
    title: "Campus Moments",
    category: "Events",
    src: imageLibrary.building,
    height: ""
  }
];

export const galleryAlbums = [
  {
    title: "Classroom Moments",
    category: "Classroom",
    description: "Learning corners, circle time, writing practice, and everyday discovery.",
    cover: imageLibrary.classroom,
    accent: "#38BDF8",
    images: [
      { title: "Morning Circle", src: imageLibrary.classroom },
      { title: "Learning Together", src: imageLibrary.children },
      { title: "Bright School Readiness", src: imageLibrary.hero },
      { title: "Campus Learning Spaces", src: imageLibrary.building }
    ]
  },
  {
    title: "Creative Activities",
    category: "Activities",
    description: "Art, craft, music, STEM play, rhythm, and hands-on exploration.",
    cover: imageLibrary.art,
    accent: "#EC4899",
    images: [
      { title: "Creative Hands", src: imageLibrary.art },
      { title: "Music Day", src: imageLibrary.music },
      { title: "Little Scientists", src: imageLibrary.science },
      { title: "Learning Together", src: imageLibrary.children }
    ]
  },
  {
    title: "Celebrations & Events",
    category: "Celebrations",
    description: "Special days, performances, festive memories, and confident stage moments.",
    cover: imageLibrary.celebration,
    accent: "#F59E0B",
    images: [
      { title: "Annual Celebration", src: imageLibrary.celebration },
      { title: "Dance & Expression", src: imageLibrary.sports },
      { title: "Music Performance", src: imageLibrary.music },
      { title: "Creative Celebration", src: imageLibrary.art }
    ]
  },
  {
    title: "Campus & Outdoor Play",
    category: "Campus",
    description: "Campus views, outdoor movement, play zones, and safe exploration.",
    cover: imageLibrary.playground,
    accent: "#22C55E",
    images: [
      { title: "Outdoor Play", src: imageLibrary.playground },
      { title: "Campus Moments", src: imageLibrary.building },
      { title: "Safe Learning Campus", src: imageLibrary.classroom },
      { title: "Active Play", src: imageLibrary.sports }
    ]
  }
];

export const testimonials = [
  {
    name: "Priya Sharma",
    role: "Parent of Sr. KG. student",
    quote:
      "Arpanam has given our child confidence, discipline, and a real love for learning. The teachers are warm and wonderfully attentive.",
    initials: "PS"
  },
  {
    name: "Rahul Mehta",
    role: "Parent of Jr. KG. student",
    quote:
      "The school feels safe, bright, and personal. We see a happy child coming home with new words, songs, and stories every day.",
    initials: "RM"
  },
  {
    name: "Anjali Patel",
    role: "Parent of Balvatika student",
    quote:
      "The balance of play, values, and early academics is excellent. Admissions and communication were smooth from day one.",
    initials: "AP"
  }
];

export const facilities = [
  {
    title: "Smart Classrooms",
    description: "Bright, well-organized rooms with learning corners and engaging teaching resources.",
    image: imageLibrary.classroom,
    icon: Landmark
  },
  {
    title: "Safe Campus",
    description: "Thoughtfully supervised spaces with child-friendly routines and secure movement.",
    image: imageLibrary.building,
    icon: ShieldCheck
  },
  {
    title: "Activity Zones",
    description: "Dedicated areas for art, music, stories, sensory play, and collaborative projects.",
    image: imageLibrary.art,
    icon: Palette
  },
  {
    title: "Playground",
    description: "Outdoor play that supports balance, strength, imagination, and social confidence.",
    image: imageLibrary.playground,
    icon: Home
  }
];

export const values = [
  { title: "Care", description: "A warm school culture where each child is noticed and encouraged.", icon: HeartHandshake },
  { title: "Curiosity", description: "Questions, exploration, stories, and hands-on discovery every day.", icon: Sparkles },
  { title: "Confidence", description: "Small wins, stage moments, routines, and independence-building.", icon: Star },
  { title: "Safety", description: "Clear systems, gentle guidance, and spaces designed for young children.", icon: ShieldCheck }
];

export const admissionSteps = [
  {
    title: "Enquiry",
    description: "Connect with the admissions desk and share your child's details.",
    icon: Phone
  },
  {
    title: "School Visit",
    description: "Tour classrooms, activity zones, safety systems, and learning spaces.",
    icon: MapPin
  },
  {
    title: "Interaction",
    description: "A warm child-friendly interaction helps us understand readiness and comfort.",
    icon: UsersRound
  },
  {
    title: "Confirmation",
    description: "Submit documents, complete the formalities, and receive your welcome kit.",
    icon: CalendarCheck
  }
];

export const documents = [
  "Birth certificate copy",
  "Two passport-size photographs",
  "Parent/guardian ID proof",
  "Address proof",
  "Previous school record, if applicable"
];

export const faqs = [
  {
    question: "Which programs are open for admission?",
    answer: "Admissions are open for Jr. KG., Sr. KG., and Balvatika for the 2026-2027 academic year."
  },
  {
    question: "Can we visit the campus before applying?",
    answer: "Yes. Families can book a visit to see classrooms, activity areas, safety systems, and meet the admissions team."
  },
  {
    question: "How do we submit an enquiry?",
    answer: "Families can submit an enquiry on the website or call the admissions desk for the fastest confirmation."
  },
  {
    question: "What is the learning approach?",
    answer: "The approach blends play-based discovery, structured readiness, creative expression, values, and social-emotional growth."
  }
];

export const contactCards = [
  { title: "Admissions Desk", value: siteInfo.phone, icon: Phone },
  { title: "Email", value: siteInfo.email, icon: Mail },
  { title: "Campus", value: siteInfo.address, icon: MapPin },
  { title: "Visit Hours", value: "Mon - Sat, 9:00 AM - 3:00 PM", icon: CalendarCheck }
];

export const eligibility = [
  { program: "Jr. KG.", age: "4+ years", focus: "Readiness, social confidence, language and numbers" },
  { program: "Sr. KG.", age: "5+ years", focus: "Primary school readiness, writing, reading and math foundations" },
  { program: "Balvatika", age: "Foundational stage", focus: "Play-based discovery, values, creativity and motor skills" }
];

export const stats = [
  { value: "3", label: "Focused programs" },
  { value: "5+", label: "Activity pathways" },
  { value: "100%", label: "Child-first spaces" },
  { value: "2026", label: "Admissions open" }
];

export const checks = CheckCircle2;
