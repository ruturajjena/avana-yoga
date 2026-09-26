/**
 * Teacher profiles, extracted verbatim from avanayoga.com.
 *
 * bio       → the most complete, current biography (About page where available)
 * variants  → the wording published on specific pages (kept so each page shows the text it shows today)
 * Obvious spelling slips were corrected; no facts were added or removed.
 */

export type TeacherSlug = 'madhav' | 'prabhakar' | 'dr-pragyan' | 'helen' | 'sudhir' | 'leena' | 'matt';
export type BioVariant = 'training' | 'host' | 'profile' | 'brief';

export type Teacher = {
  slug: TeacherSlug;
  name: string;
  fullName: string;
  discipline: string;
  portrait: { src: string; alt: string };
  highlights: string[];
  bio: string[];
  certifications?: string[];
  variants?: Partial<Record<BioVariant, string[]>>;
};

export const teachers: Record<TeacherSlug, Teacher> = {
  madhav: {
    slug: 'madhav',
    name: 'Madhav',
    fullName: 'Yogi Madhav',
    discipline: 'Traditional Yoga · Philosophy · Meditation',
    portrait: { src: '/media/teachers/madhav.jpg', alt: 'Portrait of Yogi Madhav' },
    highlights: [
      'Bachelor’s degree in Philosophy, Sanskrit and Hindi',
      'Master’s degree in Yoga and Meditation',
      'Teaching internationally since 2012',
      'Winner of the Himalaya Yoga Olympiad, 2008',
    ],
    bio: [
      'Yogi Madhav is a devoted student and teacher of traditional Yoga, rooted in the living wisdom of India’s ancient philosophical traditions. Raised in a traditional Indian family, he was introduced to the authentic teachings of Yoga from an early age, a connection that has shaped his entire life’s path.',
      'He holds a Bachelor’s degree in Philosophy, Sanskrit, and Hindi, and a Master’s degree in Yoga and Meditation. His studies span the Vedas, classical Indian philosophy, Yoga Therapy, Ayurveda, and Naturopathy, forming a holistic foundation that informs every aspect of his teaching.',
      'Since 2012, Yogi Madhav has been teaching internationally across yoga schools, universities, institutes, and NGOs, guiding students through 200-hour and 300-hour Yoga Teacher Training programs. Over the years, he has built a strong and supportive global community of practitioners who continue to grow under his guidance.',
      'His teaching style is defined by simplicity, clarity, and depth. He offers precise, grounded instruction while preserving the integrity of the tradition, helping students move beyond the physical postures and into a direct experience of what Yoga truly is.',
      'Yogi Madhav continues to share these teachings worldwide through workshops, retreats, and teacher trainings, welcoming students at every stage of their journey.',
    ],
    variants: {
      training: [
        'From a traditional Indian family, learning Yoga from an early age. Yogi Madhav is a very experienced Yoga teacher.',
        'He completed his graduation in Philosophy, Sanskrit and Hindi & holds a Master Degree in Yoga & Meditation. He has also studied the Vedas, varying philosophies, Yoga Therapy, Naturopathy and Pranic Healing.',
        'Yogi Madhav has taught in yoga schools, yoga ashrams, colleges, universities, institutes and NGO’s throughout India. Teaching 1000’s of international students 200 and 300 hour courses since 2012. Establishing a solid student community worldwide.',
        'Yogi Madhav travels and teaches yoga in different countries. He is the winner of Himalaya Yoga Olympiad in 2008.',
        'Madhav shares the practice of Yoga in a traditional, simple, calm manner, with precise and clear direction. Bringing depth and understanding of the true teachings of Yoga.',
      ],
      host: [
        'Madhav is a yoga teacher and certified science of living coach based in the UK. Madhav has been teaching yoga, leading yoga teacher training courses and retreats around the world for over a decade. He has over 500 hours professional training and is a yoga alliance certified yoga teacher and holds master degree in yoga and meditation. Madhav is originally from India, but he moved to the UK and living with his family. It is both Madhav’s passion and privilege to share his wisdom and methods to empower people of their inherent capacity to experience ecstasy and bring their deepest desires to life.',
        'Madhav’s goal in life is to help people to develop themselves spiritually, mentally and physically through discipline and awareness. Serving people to realise the importance of classical yoga. Furthermore he would like to share the experience of traditional yoga and Vedic philosophy.',
        'Yogi Madhav wants to inspire students through the practice of yoga to connect with their own personal wisdom, healing abilities and expansive potential.',
      ],
      profile: [
        'Yogi Madhav is a yoga teacher and meditation guide with over 20 years of experience. He was born into a traditional Indian family and began practicing yoga at a young age. He has a Master’s Degree in Yoga and Meditation and has also studied the Vedas, varying philosophies, Yoga Therapy, Naturopathy, and Pranic Healing.',
        'Yogi Madhav has taught yoga in yoga schools, yoga ashrams, colleges, universities, institutes, and NGOs. He has also taught yoga to thousands of international students through his 200- and 300-hour yoga teacher training programs. He is the winner of the Himalaya Yoga Olympiad in 2008.',
        'Yogi Madhav shares the practice of yoga in a traditional, simple, and calm manner. He is known for his precise and clear instruction, and for his ability to bring depth and understanding to the true teachings of yoga. He is passionate about helping people find their inner peace and well-being through yoga and meditation.',
        'If you are looking for a yoga teacher who can help you to reach your full potential, Yogi Madhav is the perfect choice. He is a knowledgeable, experienced, and compassionate teacher who is dedicated to helping his students achieve their goals.',
      ],
    },
  },

  prabhakar: {
    slug: 'prabhakar',
    name: 'Prabhakar',
    fullName: 'Prabhakar Rana',
    discipline: 'Hatha & Ashtanga · Philosophy & Meditation',
    portrait: { src: '/media/teachers/prabhakar.jpg', alt: 'Portrait of Prabhakar Rana' },
    highlights: [
      '1000+ hours of professional yoga teacher training',
      'More than 16 years of teaching yoga',
      'Depth of experience in Hatha and Ashtanga style yoga',
      'Has taught philosophy and meditation at yoga centres across India',
    ],
    bio: [
      'From a young age Prabhakar was drawn to a spiritual way of living. He loved yoga and practiced many different styles. It wasn’t until he began doing Hatha yoga that he wanted to immerse himself in a training to deepen his own personal practice.',
      'As a yoga teacher he brings to his students a depth of experience in hatha and ashtanga style yoga. He soon realized that the yoga mat was a place to find a sense of contentment, self awareness and mind body connection.',
      'He has 1000+ hours of professional yoga teacher training behind him, backed up with an experience of more than 16 years of teaching yoga. He tries to offer his students the opportunity to take the yogic path at their own pace. He has been associated with several yoga centres all over India, teaching philosophy and meditation.',
    ],
  },

  'dr-pragyan': {
    slug: 'dr-pragyan',
    name: 'Dr Pragyan',
    fullName: 'Dr Pragyan Tripathi',
    discipline: 'Ayurveda & Panchkarma',
    portrait: { src: '/media/teachers/dr-pragyan.jpg', alt: 'Portrait of Dr Pragyan Tripathi' },
    highlights: [
      'Ayurveda and Panchkarma trainer',
      'Strong background in herbal medicine',
      'Expert in pulse reading (nadi)',
      'Detoxification and Ayurvedic medicine',
    ],
    bio: [
      'Dr Pragyan Tripathi is a renowned Ayurveda and Panchkarma trainer. He is a sensitive and seasoned doctor with a strong background in herbal medicine. He is very active in promoting Ayurvedic principles and remedies. He provides highly individualized and dedicated patient care. He has strong ability to recommend healthy regimens for patients lifestyle.',
      'Dr Pragyan has immense knowledge of detoxification and Ayurvedic medicine. He is an expert in pulse reading (nadi). He also specializes in treatment for enhanced immunity, stress management, obesity, hair and beauty care, spine and joint care etc.',
      'He develops individual treatment plans, provides therapies to alleviate chronic and acute illness. He provides Ayurvedic medicines and herbal supplements to patients.',
    ],
  },

  helen: {
    slug: 'helen',
    name: 'Helen',
    fullName: 'Helen',
    discipline: 'Vinyasa Flow · Yin · Yoga Nidra',
    portrait: { src: '/media/teachers/helen.jpg', alt: 'Portrait of Helen' },
    highlights: [
      'Practising yoga since 2011',
      '200hr teacher training, Bali (2015)',
      '300hr training, India (2017)',
      'Opened B-Yoga Studio (2019); took on Hotpod Yoga Chester (2025)',
    ],
    bio: [
      'Helen has been practising yoga since 2011, when she first discovered it in Melbourne and quickly realised how powerful it was in helping her manage anxiety and heal a long-term back injury. Inspired by this experience, she went on to complete her 200hr teacher training in Bali in 2015, followed by her 300hr training in India in 2017.',
      'Her teaching style is informative and inclusive, and she is passionate about creating a space where everyone feels welcome and supported in their practice.',
      'Helen specialises in Vinyasa Flow, Yin and Yoga Nidra. She opened her first studio, B-Yoga Studio, in 2019, and in 2025 took on Hotpod Yoga Chester, where she continues to build a warm, community-focused environment for people to connect through yoga.',
    ],
  },

  sudhir: {
    slug: 'sudhir',
    name: 'Sudhir',
    fullName: 'Sudhir Rishi',
    discipline: 'Advaita Vedanta · Ashtanga · Meditation',
    portrait: { src: '/media/teachers/sudhir.jpg', alt: 'Portrait of Sudhir Rishi' },
    highlights: [
      'Director of Teacher Trainings, Sthira Yoga',
      'Over 30 years in yoga, meditation, philosophy and Ayurveda',
      'Has led 150+ 200-hour and 40 300-hour teacher trainings',
      'ERYT-500 · over 40,000 hours of teaching',
    ],
    bio: [
      'Sudhir Rishi is the Director of Teacher Trainings at Sthira Yoga, with over 30 years of experience in yoga, meditation, philosophy, and Ayurveda. A former monk who spent eight years in deep spiritual practice, he has led more than 150 (200-hour) and 40 (300-hour) Yoga Teacher Training programs across Asia and Europe, along with numerous retreats and workshops. He is an ERYT-500 with over 40,000 hours of teaching experience.',
      'With a background in engineering and corporate leadership, Sudhir left his career at 27 to pursue a spiritual path, studying in Rishikesh and the Himalayas. His teachings are rooted in Advaita Vedanta and enriched by diverse traditions including Ashtanga Yoga, Vipassana, and Vedantic inquiry.',
      'Based near Sri Ramana Maharshi Ashram in South India, Sudhir shares yoga as a lived philosophy, simple, practical, and deeply transformative, guiding students toward clarity, self-understanding, and inner freedom.',
    ],
  },

  leena: {
    slug: 'leena',
    name: 'Leena',
    fullName: 'Leena',
    discipline: 'Yoga & Meditation · Art Psychotherapy',
    portrait: { src: '/media/teachers/leena.jpg', alt: 'Portrait of Leena' },
    highlights: [
      'Independent Yoga Network 200 Teacher',
      '100-hour Meditation Teacher Training, Rishikesh',
      '100-hour Yin Yoga Teacher Training',
      'HCPC-registered Art Psychotherapist',
    ],
    bio: [
      'Raised in a yoga-practicing family, Leena’s yoga journey began as a child, chanting Om and Om Sri Sai Ram at age 6, and practicing with her granddad (Bapujee) and the community in the local Mandir. Her holistic upbringing included asanas, meditation, acupressure, and pranayama, reinforcing her belief that yoga reaches beyond physical poses, touching our hearts.',
      'Trained by remarkable teachers worldwide, Leena’s teaching comes from the heart, honoring each individual’s unique essence (Svarupa) as they shine on their path. For her, yoga and meditation are inseparable, and this reflection echoes in her practice.',
      'Beyond yoga, Leena is a qualified Health Care Professional Council-registered Art Psychotherapist. Her Masters’ journey in Sheffield coincided with her evolution as a dedicated yoga teacher.',
    ],
    certifications: [
      'Independent Yoga Network 200 Teacher',
      '100-hour Ashtanga Vinyasa in India',
      '100-hour Yin Yoga Teacher Training',
      '100-hour Meditation Teacher Training, Rishikesh India',
      'Sound Healing Teacher Training, Haritha Yogashala Rishikesh',
      'Soma Prana Vinyasa: The Art Of Regeneration (35YTT)',
      'Embodying Love: Sensual Health for Women',
      'Children Yoga & Mindfulness (50 Hours YTT + CPD 8 to 12 year-olds Yoga)',
      'Dr Yoga: Yoga Anatomy',
      'Numerous workshops and courses',
    ],
    variants: {
      brief: [
        'Leena’s yoga journey began in childhood, practicing with her grandfather and community, and embracing yoga’s holistic essence beyond asanas, into meditation, pranayama, and self-discovery. Trained by world-renowned teachers, she integrates heart-centered teaching that honors each student’s unique path. For Leena, yoga and meditation are inseparable practices, reflected deeply in her teaching style.',
        'Leena holds various certifications, including a 200-hour Independent Yoga Network, 100-hour Ashtanga Vinyasa, 100-hour Yin Yoga & Meditation, Sound Healing & Soma Prana Vinyasa, and Children’s Yoga & Yoga Anatomy.',
        'As an HCPC-registered Art Psychotherapist, Leena weaves creativity and mindfulness into her practice, offering a truly holistic approach to well-being.',
      ],
    },
  },

  matt: {
    slug: 'matt',
    name: 'Matt',
    fullName: 'Matt',
    discipline: 'Ashtanga Vinyasa · TCM Acupuncture',
    portrait: { src: '/media/teachers/matt.jpg', alt: 'Portrait of Matt' },
    highlights: [
      'Practising since 2001; teaching Ashtanga Vinyasa since 2011',
      '200hr RYT in Ashtanga primary sequence, Rishikesh',
      '40 hr adjustments with Manju Jois; 40 hr with David Swenson',
      'BSc (Hons) TCM Acupuncture, Wrexham Glyndwr University',
    ],
    bio: [
      'Matt began practicing yoga in 2001 as a way to heal from a back injury. He explored Hatha yoga before progressing to Hot Vinyasa and Bikram, recognising yoga’s power not only for rehabilitation but also for preventing injuries and improving mental well-being. In 2008, after feeling his practice had plateaued, Matt found a deep connection with Ashtanga Vinyasa and was inspired to share the practice with others. In 2011, he began teaching Ashtanga Vinyasa classes. He completed his 200hr RYT certification in Ashtanga primary sequence in Rishikesh, India. He has also done 40 hr of adjustments with Manju Jois and 40 hr adjustments with David Swenson.',
      'In addition to his yoga practice, Matt holds a BSc (Hons) in Traditional Chinese Medicine (TCM) Acupuncture from Wrexham Glyndwr University. He is trained in acupuncture, moxibustion, cupping, tui na massage, musculoskeletal intervention, nutrition, and anatomy & physiology. Matt specialises in treating musculoskeletal conditions, stress, anxiety, depression, and mood imbalances. He also offers support for headaches, fertility issues, smoking cessation, and various other disorders.',
      'Matt’s approach combines the wisdom of Eastern and Western medicine, ensuring that his treatments are both relevant and accessible. He integrates evidence-based practices to help his students and patients find balance, alleviate symptoms, and achieve greater well-being.',
    ],
  },
};

/** Teacher line-ups as published on each live page (one teacher removed at the client's request, 2026-09). */
export const teacherLineups = {
  about: ['madhav', 'prabhakar', 'dr-pragyan'],
  ttc200: ['madhav', 'prabhakar', 'helen', 'sudhir', 'leena', 'matt'],
  yin50: ['leena', 'madhav'],
  continuingEducation: ['leena', 'madhav'],
  /** Everyone who appears anywhere on the live site, for the homepage index. */
  all: ['madhav', 'prabhakar', 'dr-pragyan', 'helen', 'sudhir', 'leena', 'matt'],
} satisfies Record<string, TeacherSlug[]>;

export const getTeachers = (slugs: readonly TeacherSlug[]) => slugs.map((s) => teachers[s]);
