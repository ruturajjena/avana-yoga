/**
 * Courses — extracted from avanayoga.com (crawl 2026-09-11):
 * /courses/, /200-hour-yoga-teacher-training/, /300-hour-yoga-teacher-training/,
 * /50-hour-yin-yttc/, /continuing-education/.
 * Obvious slips corrected and duplicated list items removed; every decision is logged in
 * docs/CONTENT-AUDIT.md §11. No facts added.
 */
import type { Film, Photo } from '@/lib/types';
import { photos } from './media';
import { site } from './site';
import type { BioVariant, TeacherSlug } from './teachers';
import { trainingTestimonials, type Testimonial } from './testimonials';

export type CourseSlug =
  | '200-hour-yoga-teacher-training'
  | '300-hour-yoga-teacher-training'
  | '50-hour-yin-yttc'
  | 'continuing-education';

export type CourseModule = { title: string; items: string[]; summary?: string };
/** frame 'full' shows the whole 16:9 film on desktop (for tall action such as headstands); default is a 21:9 band. */
export type CourseHeroMedia = { kind: 'film'; film: Film['id']; frame?: 'full' } | { kind: 'photo'; photo: Photo } | { kind: 'breath' };
export type FaqItem = { question: string; answer: string };
export type CourseDetail = { label: string; value: string; note?: string };
/** A dated session. `date` is the ISO day it starts, used to mark registration closed once it has passed. */
export type CourseSession = { label: string; date: string };

export type Course = {
  slug: CourseSlug;
  href: string;
  title: string;
  shortTitle: string;
  hero: { eyebrow: string; title: string[]; lines: string[]; media: CourseHeroMedia };
  facts: CourseDetail[];
  intro: { eyebrow: string; heading: string; paragraphs: string[]; image?: Photo };
  /** expandable: modules render as click-to-open areas (summary + key points) instead of the sticky index. */
  curriculum?: { eyebrow: string; heading: string; intro?: string; overview?: string[]; modules: CourseModule[]; expandable?: boolean };
  outcomes?: { heading: string; intro?: string; items: string[] };
  eligibility?: { heading: string; intro?: string; items: string[] };
  certification?: { heading: string; paragraphs: string[] }[];
  certificationImage?: Photo;
  teachers?: { eyebrow: string; heading: string; lineup: TeacherSlug[]; variants?: Partial<Record<TeacherSlug, BioVariant>> };
  enrolment: {
    eyebrow: string;
    heading: string;
    dates?: { heading: string; items: CourseSession[]; notes?: string[] };
    intakes?: { date: string; status: string; location: string }[];
    details?: CourseDetail[];
    fee?: { heading: string; lines: string[] };
    confirmation?: string;
    cta: { label: string; href: string };
  };
  testimonials?: { eyebrow: string; heading: string; intro?: string; items: Testimonial[] };
  faq?: { heading: string; items: FaqItem[] };
  gallery?: Photo[];
  /** Summary used by /courses/ and the homepage training index (copy from /courses/). */
  listing: { heading: string; paragraphs: string[]; meta: string; image: Photo };
  schema: { locations: string[]; startDate?: string; price?: number };
  seo: { title: string; description: string; image: string };
};

const ELIGIBILITY_DEMANDING =
  'Students should recognise that the course will be demanding throughout. Successful completion of the course will require significant effort, focus and dedication. In this respect, students should ensure that they are emotionally and physically fit for this undertaking and fully committed to the course.';
const ELIGIBILITY_PRACTICE = 'Students should have a personal yoga practice, an open mind and a willingness to learn.';
const ELIGIBILITY_UNSURE = 'If you are unsure of your eligibility to book onto the training, please contact us for advice.';
const ASSESSMENT_90 =
  'Written and practical assessments will have to be completed at the end of the course; in order to graduate students must attend a minimum of 90% of the course. Should a student miss more than this, they will be required to take catch-up classes as agreed with the tutor. These will incur an additional charge.';
const SMALL_GROUPS: FaqItem = {
  question: 'How many students in a group?',
  answer: 'Our groups are small, to ensure proper personal attention and guidance to all students the number of seats are limited each course.',
};

export const courses: Record<CourseSlug, Course> = {
  '200-hour-yoga-teacher-training': {
    slug: '200-hour-yoga-teacher-training',
    href: '/200-hour-yoga-teacher-training/',
    title: '200 Hour Yoga Teacher Training',
    shortTitle: '200 Hour YTT',
    hero: {
      eyebrow: 'Yoga Teacher Training · Rhyl, Wales, UK',
      title: ['200 Hour', 'Hatha & Vinyasa'],
      lines: ['Starts on 23rd January 2027 (10 weekends)', 'Saturdays & Sundays (12:00 to 6:00 PM)'],
      media: { kind: 'film', film: 'breath' },
    },
    facts: [
      { label: 'Duration', value: '200 hours · 10 weekends' },
      { label: 'Location', value: 'Rhyl, Wales, UK' },
      { label: 'Starts', value: '23 January 2027' },
      { label: 'Schedule', value: 'Sat & Sun, 12:00 to 6:00 PM' },
      { label: 'Course fee', value: '£1899 early bird' },
    ],
    intro: {
      eyebrow: 'The Training',
      heading: 'Full Accredited 200hr Hatha & Vinyasa Yoga Teacher Training',
      paragraphs: [
        'Embody and teach yoga with confidence, skill and secure foundation of knowledge. Inspirational and educational training that will enable you to find your individual voice as a teacher and establish a deep connection within yourself. Avana Yoga offers teacher training courses in the UK and India.',
      ],
      image: photos.studioCircle,
    },
    curriculum: {
      eyebrow: 'Curriculum',
      heading: 'Areas of study include:',
      intro: 'Select an area to see what it covers.',
      expandable: true,
      /*
       * Area names: live page. Descriptions: written at the client's request (2026-09) and drawn only from
       * published material — this page's Learning Outcomes and the About page's classical texts.
       * Draft for client review: no hours, named techniques or other specifics are claimed.
       */
      modules: [
        {
          title: 'Asana',
          summary: 'The physical practice at the heart of Hatha and Vinyasa yoga, studied both as a personal practice and as something you will learn to teach.',
          items: [
            'The principles of alignment and how to apply them',
            'Hatha postures and how Vinyasa links them with the breath',
            'The art of sequencing a safe, balanced class',
            'Sanskrit names of asana',
          ],
        },
        {
          title: 'Pranayama',
          summary: 'The yogic science of breath: how breathing practices steady the body and quiet the mind.',
          items: [
            'The role of the breath in classical yoga',
            'Foundational pranayama techniques for personal practice',
            'How to guide basic pranayama safely in a class',
          ],
        },
        {
          title: 'Philosophy',
          summary: 'The roots of yoga, explored through the classical texts that Avana Yoga’s curriculum is grounded in.',
          items: [
            'The origins and development of yoga',
            'The Yoga Sutras of Patanjali',
            'The Hatha Pradipika and the Bhagavad Gita',
            'Bringing yogic philosophy into practice, teaching and everyday life',
          ],
        },
        {
          title: 'Anatomy',
          summary: 'How the body moves in practice, alongside the subtle anatomy described by the yoga tradition.',
          items: [
            'Essential physical anatomy for yoga practice and teaching',
            'Understanding the body in asana for safer practice',
            'The chakras and subtle body anatomy',
          ],
        },
        {
          title: 'Meditation',
          summary: 'The inward practice that yoga prepares for: learning to sit, observe and settle the mind.',
          items: [
            'The place of meditation within classical yoga',
            'Basic meditation techniques for personal practice',
            'How to guide a simple meditation for students',
          ],
        },
        {
          title: 'Kriyas',
          summary: 'Traditional yogic practices used to prepare body, breath and mind for deeper practice.',
          items: ['The purpose of kriyas within the Hatha tradition', 'Practising kriyas as part of a daily routine', 'How kriyas support asana, pranayama and meditation'],
        },
        {
          title: 'Teaching methodology and teaching principles',
          summary: 'The skills that turn your own practice into confident, clear teaching.',
          items: [
            'Planning and teaching led classes with confidence',
            'Clear instruction and holding space for a group',
            'The art of observation',
            'Including basic meditation and pranayama in your classes',
          ],
        },
        {
          title: 'Adjustments and alignment',
          summary: 'Seeing what is happening in a student’s posture and knowing how to help.',
          items: [
            'The art of observation and adjustment in asana',
            'Applying the principles of alignment to different bodies',
            'Offering adjustments with care',
          ],
        },
      ],
    },
    outcomes: {
      heading: 'Learning Outcomes',
      intro: 'On completion of the training, students will',
      items: [
        'Know, and be able to apply, the Principles of Alignment',
        'Have learnt to apply the art of observation and adjustment in asana',
        'Understand and be able to apply the art of sequencing',
        'Be able to confidently teach led classes, including basic meditation and pranayama techniques',
        'Understand, and be able to explain, the roots and philosophy of yoga',
        'Be confident in using Sanskrit names of asana',
        'Understand, and be able to explain, the chakras and subtle body anatomy',
        'Adjustments and alignment',
      ],
    },
    eligibility: {
      heading: 'Eligibility + Pre-Requisites',
      items: [
        'This course will be delivered in English and therefore a good understanding of spoken and written English is required.',
        ELIGIBILITY_DEMANDING,
        ELIGIBILITY_PRACTICE,
        ELIGIBILITY_UNSURE,
      ],
    },
    certification: [
      { heading: 'Graduation', paragraphs: ['The certificate will be awarded on successful completion of the course.'] },
      {
        heading: 'Accredited',
        paragraphs: [
          'Avana Yoga is accredited by Yoga Alliance USA. On successful completion of the training, students will be able to register with Yoga Alliance as a 200-hour RYT (registered yoga teacher).',
          ASSESSMENT_90,
        ],
      },
    ],
    certificationImage: photos.graduationCertificate,
    teachers: {
      eyebrow: 'Our Team',
      heading: 'Our Teachers',
      lineup: ['madhav', 'prabhakar', 'helen', 'sudhir', 'leena', 'matt'],
      variants: { madhav: 'training' },
    },
    enrolment: {
      eyebrow: 'Enroll Now',
      heading: 'Dates',
      dates: {
        heading: 'Ten weekends',
        // Starts 23 January 2027 (see facts above); each weekend is dated so passed ones can be marked.
        items: [
          { label: 'January 23rd & 24th', date: '2027-01-23' },
          { label: 'January 30th & 31st', date: '2027-01-30' },
          { label: 'February 6th & 7th', date: '2027-02-06' },
          { label: 'February 13th & 14th', date: '2027-02-13' },
          { label: 'February 20th & 21st', date: '2027-02-20' },
          { label: 'February 27th & 28th', date: '2027-02-27' },
          { label: 'March 6th & 7th', date: '2027-03-06' },
          { label: 'March 13th & 14th', date: '2027-03-13' },
          { label: 'March 20th & 21st', date: '2027-03-20' },
          { label: 'March 27th & 28th', date: '2027-03-27' },
        ],
        notes: ['2 Live Philosophy sessions per week', '(Catch up with recordings if missed)'],
      },
      details: [
        { label: 'Days', value: 'Saturdays & Sundays' },
        { label: 'Time', value: '12:00 to 6:00 PM' },
      ],
      fee: {
        heading: 'Course Fee: £1899',
        lines: ['Course Fee: £1899 (Early Bird, ends on 30th Nov 2026)', 'Regular Price: £2099 (after 30th Nov 2026)', 'Payment plans available upon request.'],
      },
      confirmation: 'We’ll confirm your place by email within 1 to 2 business days.',
      cta: { label: 'Enroll Now', href: site.forms.teacherTraining },
    },
    testimonials: {
      eyebrow: 'Testimonials',
      heading: 'What Our Students Say',
      intro:
        'Hear directly from our graduates about their transformative journeys. Discover how our teacher training program has empowered them to grow, both on and off the mat.',
      items: trainingTestimonials,
    },
    faq: {
      heading: 'FAQ',
      items: [
        {
          question: 'What is a 200-hour yoga teacher training program?',
          answer:
            'A 200-hour yoga teacher training program is a comprehensive course designed to provide individuals with the knowledge, skills, and experience needed to become a certified yoga teacher. The course typically covers aspects such as anatomy and physiology, yoga philosophy, teaching techniques, and hands-on practice.',
        },
        {
          question: 'Is the course approved by Yoga Alliance?',
          answer:
            'Yes our 200 hour Hatha yoga teacher training is accredited with Yoga Alliance for 200 hour training. After completing the course you can register as a RYT 200 with Yoga Alliance.',
        },
        {
          question: 'What are the prerequisites for enrolling in a 200-hour yoga teacher training program?',
          answer:
            'There are typically no formal prerequisites for enrolling in a 200-hour yoga teacher training program, although a regular yoga practice is often recommended. Basic understanding of English language required.',
        },
        SMALL_GROUPS,
        {
          question: 'What support is available after completing the course?',
          answer: 'We offer ongoing support through mentorship, access to our alumni network, and invitations to workshops and advanced trainings.',
        },
        {
          question: 'Will I be able to teach yoga after completing the course?',
          answer: 'Yes! Upon successful completion, you’ll have the confidence and certification to teach yoga professionally in studios, online, or independently.',
        },
      ],
    },
    gallery: [photos.graduatesGroup, photos.graduationBlue, photos.celebration, photos.graduationSmile, photos.graduationFlower, photos.graduationLaughter],
    listing: {
      heading: '200 Hour Yoga Teacher Training',
      paragraphs: [
        'Hatha Yoga is a flexible combination of specific techniques that help develop every aspect of the individual: Physical, emotional, intellectual and spiritual. It is a scientific system that integrated the various branches of yoga and brings about a harmonious development of the individual.',
        'Regular practice of yoga helps achieve a body of optimum health and strength, senses under control, a mind well disciplined, clear and calm, an intellect as sharp as razor, a strong will, a heart full of unconditional love and compassion, an ego as pure as crystal, and a life filled with supreme peace and joy.',
      ],
      meta: 'Hatha & Vinyasa · Rhyl, Wales · Starts 23 January 2027',
      image: photos.graduationBlue,
    },
    schema: { locations: ['Rhyl, Wales, United Kingdom'], startDate: '2027-01-23', price: 1899 },
    seo: {
      title: '200-Hour Yoga Teacher Training',
      description:
        'Yoga Alliance accredited 200-Hour Teacher Training in Rhyl, Wales. Rooted in classical Hatha & Vinyasa tradition. Next intake: 23 January 2027.',
      image: '/media/og/training.jpg',
    },
  },

  '300-hour-yoga-teacher-training': {
    slug: '300-hour-yoga-teacher-training',
    href: '/300-hour-yoga-teacher-training/',
    title: '300 Hour Yoga Teacher Training',
    shortTitle: '300 Hour YTT',
    hero: {
      eyebrow: 'Advanced Yoga Teacher Training · Chester UK & India',
      title: ['300 Hour', 'YTTC'],
      lines: [],
      media: { kind: 'film', film: 'practice' },
    },
    facts: [
      { label: 'Level', value: '300 hours · Advanced' },
      { label: 'Locations', value: 'Chester UK · India' },
      { label: 'Dates', value: 'TBD' },
      { label: 'Status', value: 'Available' },
      { label: 'Accreditation', value: 'Yoga Alliance 300-hour RYT' },
    ],
    intro: {
      eyebrow: 'The Training',
      heading: 'You’ve completed your 200-hour training, it’s time to advance.',
      paragraphs: [
        'Undertaking a 300-hour training can be overwhelming. Whether you have concerns about your physical abilities or have forgotten material from your 200-hour course, Avana Yoga holds your hand every step of the way.',
        'It’s time to take your understanding to the next level. You don’t have to be an Avana Yoga graduate to do our advanced training. We warmly welcome all existing 200 hour certified yoga teachers to join us.',
      ],
      image: photos.workshopGathering,
    },
    curriculum: {
      eyebrow: 'Curriculum',
      heading: 'Core Modules',
      overview: [
        'Anatomy Module',
        'Fundamentals of Basic Asanas Module',
        'Advanced Asana Module',
        'Advanced Pranayam Module',
        'Philosophy Module',
        'Yin Yoga Module',
        'Mindfulness and Meditation Techniques Module',
        'Ashtanga Vinyasa Yoga and Sequencing Module',
      ],
      modules: [
        {
          title: 'Asana',
          items: [
            'Re-establish and deepen your understanding of the value of the basics',
            'Discover how to approach asanas that might be unfamiliar to you',
            'Evaluate the body in action and explore habitual movement patterns and establish new ones',
            'Understand why we all practice asana differently and that we shouldn’t all have the same alignment due to the unique formation of our individual bodies',
            'Learn the Avana Yoga Sequence',
            'Gain new inspiration and creativity in class sequencing',
            'Translate your newfound understanding of asana into inspirational teaching skill',
            'Explore ways to link postures together',
            'Develop the tools to allow your classes to be accessible to all',
            'Invigorate your home practice',
          ],
        },
        {
          title: 'Anatomy',
          items: [
            'Understand the individuality of the body',
            'Muscular contraction, productive tension and muscle activation',
            'Joints and hypermobility, should joints ever be locked and should the hypermobile work into their full range of motion?',
            'Myofascia, what are its function and purpose?',
            'Aesthetic vs functionality',
            'Elastic vs plastic',
            'Body Mechanics',
            'Tension vs compression',
          ],
        },
        { title: 'Pranayama', items: ['Daily practice of advanced Pranayama', 'Daily practice of Kriyas', 'Guided practice and use of the three bandhas'] },
        { title: 'Philosophy', items: ['Bhagavad Gita', 'Yoga Sutras of Patanjali', 'A deeper understanding of yogic philosophy concepts'] },
        {
          title: 'Vinyasa Yoga',
          items: [
            'Establish an understanding of what Vinyasa Yoga is, its concept and approach',
            'How to link postures',
            'When to practice and teach Vinyasa Yoga',
            'Teaching Vinyasa Yoga in a hot room',
            'Sequencing Workshop',
          ],
        },
        {
          title: 'Meditation',
          items: ['Classical meditation techniques', 'Chakra purification meditations', 'Vedic Meditation', 'Avana Meditation', 'Guided Meditation'],
        },
      ],
    },
    eligibility: {
      heading: 'Pre-Requisite',
      intro: 'Advanced yoga teacher training course is suitable for those who are:',
      items: [
        'A graduate of a 200-hour yoga teacher training course, from an RYS 200 registered yoga school',
        'Physically and mentally fit to follow intensive teacher training',
        'Not pregnant',
        'Ready to adapt to a Yogic lifestyle',
        'Serious yoga practitioner',
      ],
    },
    certification: [
      {
        heading: 'Accreditation',
        paragraphs: [
          'Avana Yoga is accredited by Yoga Alliance. On successful completion of the training, students will be able to register with Yoga Alliance as a 300-hour RYT (registered yoga teacher).',
        ],
      },
      { heading: 'Graduation', paragraphs: ['The certificate will be awarded on successful completion of the course.', ASSESSMENT_90] },
    ],
    certificationImage: photos.graduationHandover,
    enrolment: {
      eyebrow: 'Apply Now',
      heading: 'Dates & locations',
      intakes: [
        { date: 'TBD', status: 'Available', location: 'Chester UK' },
        { date: 'TBD', status: 'Available', location: 'India' },
      ],
      cta: { label: 'Apply Now', href: site.forms.teacherTraining },
    },
    faq: {
      heading: 'FAQ',
      items: [
        {
          question: 'What is a 300-hour yoga teacher training program?',
          answer:
            'A 300-hour yoga teacher training program is an advanced course designed for yoga teachers who have completed a 200-hour yoga teacher training program. The program builds on the foundational knowledge and skills acquired in the 200-hour program and provides in-depth training in specific areas of yoga, such as anatomy, philosophy, and teaching methodology.',
        },
        {
          question: 'Is a 300-hour yoga teacher training program recognized internationally?',
          answer:
            'Yes, a 300-hour yoga teacher training program is typically recognized internationally. Our 300 hour Hatha yoga teacher training is accredited with Yoga Alliance for 300 hour training.',
        },
        {
          question: 'Can I join the course if I have done my 200 hour training with a different school?',
          answer: 'Yes, we accept Yoga Alliance 200 hour TTC certificates from any school.',
        },
        {
          question: 'What are the prerequisites for enrolling in a 300-hour yoga teacher training program?',
          answer: 'The prerequisites for enrolling in a 300-hour yoga teacher training program typically include the completion of a 200-hour yoga teacher training program.',
        },
      ],
    },
    listing: {
      heading: '300 Hour Yoga Teacher Training',
      paragraphs: [
        'Undertaking a 300-hour training can be overwhelming. Whether you have concerns about your physical abilities or have forgotten material from your 200-hour course, Avana Yoga holds your hand every step of the way. Avana Yoga thinks it’s important to do non-repetitive training. After all, you’ve already completed a 200-hour training course, it’s time to take your understanding to the next level.',
        'You don’t have to be an Avana Yoga graduate to do our advanced training. We warmly welcome all existing 200 hour certified yoga teachers to join us. With an ever-growing number of 200-hour graduates, it’s important to make yourself shine. More and more employers are searching for yoga teachers who have advanced level qualifications. We all know that the learning never stops, it is a continual journey, but having your advanced training demonstrates you are a teacher with dedication.',
      ],
      meta: 'Advanced · Chester UK & India',
      image: photos.graduationHandover,
    },
    schema: { locations: ['Chester, United Kingdom', 'India'] },
    seo: {
      title: '300-Hour Yoga Teacher Training',
      description:
        'Yoga Alliance accredited 300-Hour Advanced Teacher Training with Avana Yoga. Deepen your practice in classical Hatha and Vinyasa tradition.',
      image: '/media/og/training.jpg',
    },
  },

  '50-hour-yin-yttc': {
    slug: '50-hour-yin-yttc',
    href: '/50-hour-yin-yttc/',
    title: '50 Hour Yin Yoga Teacher Training',
    shortTitle: '50 Hour Yin YTTC',
    hero: {
      eyebrow: 'Yin Yoga Teacher Training · Chester UK',
      title: ['50 Hour', 'Yin YTTC'],
      lines: ['50 hour, Yin Yoga Teacher Training, can be counted as Additional Education Hours for Yoga Alliance.'],
      media: { kind: 'photo', photo: photos.studentsSeated },
    },
    facts: [
      { label: 'Duration', value: '50 hours' },
      { label: 'Dates', value: 'September 2026' },
      { label: 'Time', value: '10:00 AM, 4:00 PM' },
      { label: 'Location', value: 'Chester UK' },
      { label: 'Course fee', value: '£549' },
    ],
    intro: {
      eyebrow: 'The Training',
      heading: 'Learn how to find quiet in the mind, stillness in the body and tranquility in the soul.',
      paragraphs: [
        'Experience the opportunity to delve deep into the Yinside, personify the profound practice and master the techniques to teach this form of yoga. Fascinating and educational training which upon completion will give you the skill and understanding to deepen your personal practice and guide others confidently in theirs.',
        'Yin Yoga is a quiet, calm practice of well-supported postures, seated, supine and on the stomach. Encouraging us to relinquish control, release stored tension and reflect inward. Each posture is held on average for 3 to 5 minutes but can be held for up to 20, stimulating the fascia, ligaments and joints, the deeper layers of the bodily tissue, subjecting this tissue to safe, moderate, therapeutic stress.',
        'These sustained postures offer us the opportunity to move into the spaces we create physically, physiologically, emotionally and spiritually. A passive yet intense, deep yet nourishing, slow yet challenging and incredibly meditative practice. Allowing each and every individual to come into the asana in a way that works for them. Yin Yoga is suitable for practitioners of all yoga styles and abilities and a perfect complement to a yang style practice and prepares you perfectly for meditation.',
      ],
    },
    curriculum: {
      eyebrow: 'Curriculum',
      heading: 'Components of a 50-hour Yin Teacher Training',
      intro: 'Areas of study include:',
      modules: [
        {
          title: 'The Practice',
          items: [
            'The main focus of this Yin Yoga Teacher Training is the understanding of the Asana practice',
            'Each day will comprise of two Asana Practices. 1 Teacher Lead and 1 Student Lead. Student Lead practice does allow the student to use notes and is for the purpose of ‘finding your voice’ and perfecting your observation skills as a teacher and finding comfort and confidence in giving direction in and out of the pose and being effective and intuitive with the use of props',
            'Two theory classes per day: one will cover teaching methodology and the other covering the history and the principal of yin, anatomy and meridians',
          ],
        },
        {
          title: '27 Yin Yoga Asana',
          items: [
            'Asana explained in full',
            'How to come in to the pose',
            'How to come out of the pose',
            'Use of Props while in the pose',
            'Target area/s',
            'Joints affected',
            'Benefits',
            'Variations and modifications',
          ],
        },
        {
          title: 'Anatomy',
          items: [
            'Individual anatomical formation, the interaction of bones, muscles, ligaments, joints and fascia',
            'Proportion and Orientation',
            'Tension versus Compression',
            'Connective tissue',
            'Fascia',
            'Meridians',
            'Limitations and the uniqueness of the human body. In Yin Yoga, we are aware of and respect the differences of the individual skeletal structure of every individual. Each pose will be adapted to the personal needs of the student and will look different for each of us',
          ],
        },
        {
          title: 'Teaching Methodology',
          items: [
            'Teaching methodology principles of assists',
            'Developing a functional approach to Yoga (Function & Aesthetic)',
            'Exploring the Taoist concept of Yin & Yang',
            'Motion analysis in the group, understanding the impact of individual bone structure (compression) in the Asana practice',
            'How to sequence effectively',
            'Introduction to Traditional Chinese Medicine and the Meridians of the body',
          ],
        },
      ],
    },
    outcomes: {
      heading: 'Learning Outcomes',
      items: [
        'Know, and be able to apply, the Principles of the Yin Practice',
        'Have learnt to apply the art of observation, adjustment and the effective use of props in asana',
        'Be confident in using the asana names, know their target areas and the joints they affect',
        'Understand and be able to apply the art of sequencing',
        'Understand, and be able to explain compression and tension and understand what limits our range of motion',
        'Know what meridians are and be aware of the 12 main meridian lines of the body and what asana stimulates them',
      ],
    },
    eligibility: {
      heading: 'Eligibility + Pre-Requisites',
      items: [
        'This course will be delivered in English and therefore a good understanding of spoken and written English is required.',
        ELIGIBILITY_DEMANDING,
        ELIGIBILITY_PRACTICE,
        ELIGIBILITY_UNSURE,
      ],
    },
    certification: [
      {
        heading: 'Graduation',
        paragraphs: [
          'Certificates will be awarded on successful completion of the course. Upon the completion of your Yin Yoga Teacher Training, you will have all the basic knowledge and skills required to teach a Yin Yoga class with confidence and the ability to give your students individual assists, modifications and variations where necessary.',
          'This course will also deepen your own Yin Yoga practice, giving you more awareness and respect to the limitations of your body. You will understand why two people will never experience the same yoga posture in the same way, and the same pose may look different on every person due to the individual bone structure.',
          ASSESSMENT_90,
        ],
      },
    ],
    certificationImage: photos.studentRest,
    teachers: { eyebrow: 'Our Team', heading: 'Meet Our Teachers', lineup: ['leena', 'madhav'], variants: { madhav: 'training' } },
    enrolment: {
      eyebrow: 'Course Details',
      heading: 'Join Our Upcoming Yin Training',
      dates: {
        heading: 'Course Dates 2026',
        items: [
          { label: '5th & 6th September', date: '2026-09-05' },
          { label: '12th & 13th September', date: '2026-09-12' },
          { label: '26th & 27th September', date: '2026-09-26' },
        ],
      },
      details: [
        { label: 'Course Time', value: '10:00 AM to 04:00 PM' },
        { label: 'Course Location', value: 'Chester UK' },
      ],
      fee: { heading: 'Course Fee', lines: ['£549 (Payment Plan Available)'] },
      cta: { label: 'Apply Now', href: site.forms.teacherTraining },
    },
    faq: {
      heading: 'Frequently Asked Questions (FAQ)',
      items: [
        {
          question: 'Who is this 50-Hour Yin Yoga Teacher Training Course suitable for?',
          answer:
            'Our 50-Hour Yin Yoga Teacher Training Course is perfect for yoga practitioners looking to deepen their understanding of Yin Yoga, and aspiring teachers who wish to gain the knowledge and skills to lead Yin Yoga classes confidently.',
        },
        {
          question: 'Do I need prior teaching experience to enroll in the course?',
          answer:
            'No prior teaching experience is required for this course. It is open to all levels, including beginners. However, a regular yoga practice and a genuine interest in Yin Yoga are recommended.',
        },
        {
          question: 'What will I learn during the 50-Hour Yin Yoga Teacher Training Course?',
          answer:
            'Throughout the course, you will delve into the principles and philosophy of Yin Yoga, learn about anatomy and its application to Yin poses, explore various sequencing techniques, understand the art of holding space for your students, and much more.',
        },
        {
          question: 'Is the course certified?',
          answer:
            'Yes, upon successful completion of the 50-Hour Yin Yoga Teacher Training Course, you will receive a certification that qualifies you to teach Yin Yoga classes professionally.',
        },
        {
          question: 'Will I be able to teach Yin Yoga after completing this course?',
          answer:
            'Yes, this comprehensive 50-hour training equips you with the necessary knowledge and teaching skills to confidently lead Yin Yoga classes for students of all levels.',
        },
        {
          question: 'Can I combine this Yin Yoga training with other yoga certifications?',
          answer:
            'Absolutely! This Yin Yoga Teacher Training can be an excellent complement to other yoga certifications you may have. It adds a unique dimension to your teaching repertoire and deepens your understanding of yoga as a whole.',
        },
        {
          question: 'What is the course fee for the 50-Hour Yin Yoga Teacher Training Course?',
          answer:
            'The course fee for our 50-Hour Yin Yoga Teacher Training Course is GBP 549. This fee covers all the training materials and your certification upon successful completion. Please note that accommodation and meals are not included in the course fee.',
        },
        {
          question: 'How do I register for the course?',
          answer:
            'To register for our 50-Hour Yin Yoga Teacher Training Course, please visit our website at https://avanayoga.com/50-hour-yin-yttc/ and follow the instructions provided. If you have any further questions or need assistance, feel free to contact our team at info@avanayoga.com',
        },
      ],
    },
    listing: {
      heading: '50 Hour Yin Yoga TTC',
      paragraphs: [
        'Yin Yoga is a quiet, calm practice of well-supported postures, seated, supine and on the stomach. Encouraging us to relinquish control, release stored tension and reflect inward. Each posture is held on average for 3 to 5 minutes but can be held for up to 20, stimulating the fascia, ligaments and joints, the deeper layers of the bodily tissue, subjecting this tissue to safe, moderate, therapeutic stress.',
        'A passive yet intense, deep yet nourishing, slow yet challenging and incredibly meditative practice. Yin Yoga is suitable for practitioners of all yoga styles and abilities and a perfect complement to a yang style practice and prepares you perfectly for meditation. Learn how to find quiet in the mind, stillness in the body and tranquility in the soul.',
      ],
      meta: 'Yin · Chester UK · September 2026',
      image: photos.studentsSeated,
    },
    schema: { locations: ['Chester, United Kingdom'], startDate: '2026-09-05', price: 549 },
    seo: {
      title: '50 Hour Yin Yoga Teacher Training',
      description:
        '50 hour Yin Yoga Teacher Training in Chester UK, counted as Additional Education Hours for Yoga Alliance: 27 Yin asana, anatomy, meridians and teaching methodology.',
      image: '/media/og/training.jpg',
    },
  },

  'continuing-education': {
    slug: 'continuing-education',
    href: '/continuing-education/',
    title: 'Continuing Education',
    shortTitle: 'Continuing Education (CPD)',
    hero: {
      eyebrow: 'Continuing Professional Development · Chester UK',
      title: ['Continuing', 'Education'],
      lines: ['Elevate Your Expertise with Continuing Professional Development (CPD)'],
      media: { kind: 'film', film: 'transformation' },
    },
    facts: [
      { label: 'Course', value: 'Certificate course' },
      { label: 'Format', value: 'Three weekends' },
      { label: 'Time', value: '12:00 to 5:00 PM, Sat & Sun' },
      { label: 'Location', value: 'Chester UK' },
      { label: 'Fee', value: '£89' },
    ],
    intro: {
      eyebrow: 'Namaste Yogis!',
      heading: 'Take your yoga practice & teaching to the next level!',
      paragraphs: [
        'Join our Continuing Education Certificate Course, specially designed for yoga teachers and practitioners seeking to deepen their practice and knowledge. This immersive experience is spread across three transformative weekends, each focused on unique and enriching topics.',
        'Advance your yoga teaching career with our CPD-certified course, designed to deepen your knowledge and refine your skills. These specialised training sessions focus on essential aspects of yoga, including advanced techniques, therapeutic applications, anatomy, philosophy, and innovative teaching methodologies. Stay at the forefront of the yoga profession while fulfilling CPD requirements.',
      ],
      image: photos.celebration,
    },
    curriculum: {
      eyebrow: 'Curriculum',
      heading: 'Course Outline',
      modules: [
        {
          title: 'Weekend 1: The Essence of Yoga (Philosophy, History and Pranayama)',
          items: [
            'Explore the roots of yoga: its history, philosophical foundations, and timeless teachings.',
            'Dive into the Yoga Sutras of Patanjali and the Vedic Philosophy to understand yoga’s spiritual essence.',
            'Discover the science and art of Pranayama: Learn breathing techniques to enhance energy flow and mental clarity.',
          ],
        },
        {
          title: 'Weekend 2: Journey Through the Chakras (Theory, Philosophy and Meditation)',
          items: [
            'Understand the chakra system: energy centers that influence your body, mind, and spirit.',
            'Explore the philosophical framework and practical applications of chakra theory.',
            'Experience chakra-specific meditations to awaken and balance your energy flow.',
          ],
        },
        {
          title: 'Weekend 3: Traditional Practices (Chakra-Based Yoga and Yoga Nidra)',
          items: [
            'Integrate chakra theory into your teaching with traditional yoga practices aligned with each energy center.',
            'Learn sequences, postures, and practices to harmonise the chakras.',
            'Conclude with the deeply restorative practice of Yoga Nidra: a guided relaxation to rejuvenate and realign.',
          ],
        },
      ],
    },
    teachers: {
      eyebrow: 'Our Team',
      heading: 'Meet Our Teachers',
      lineup: ['leena', 'madhav'],
      variants: { leena: 'brief', madhav: 'training' },
    },
    enrolment: {
      eyebrow: 'Course Details',
      heading: 'Join Our Upcoming Yoga Alliance Continuing Education Certificate Course',
      details: [
        { label: 'Dates', value: 'Coming Soon…' },
        { label: 'Time', value: '12:00 to 05:00 PM', note: '(Saturday & Sunday)' },
        { label: 'Location', value: 'Chester UK' },
        { label: 'Fee', value: '£89' },
      ],
      cta: { label: 'Reserve your Spot now', href: `mailto:${site.email}?subject=Continuing%20Education%20Certificate%20Course` },
    },
    listing: {
      heading: 'Continuing Professional Development (CPD)',
      paragraphs: [
        'Elevate Your Expertise with Continuing Professional Development (CPD)',
        'Advance your yoga teaching career with our CPD-certified course, designed to deepen your knowledge and refine your skills. These specialised training sessions focus on essential aspects of yoga, including advanced techniques, therapeutic applications, anatomy, philosophy, and innovative teaching methodologies. Stay at the forefront of the yoga profession while fulfilling CPD requirements. Perfect for yoga instructors committed to ongoing growth, this course ensures you deliver transformative experiences to your students and remain a leader in your field.',
      ],
      meta: 'CPD · Chester UK',
      image: photos.graduationLaughter,
    },
    schema: { locations: ['Chester, United Kingdom'], price: 89 },
    seo: {
      title: 'Continuing Education (CPD)',
      description:
        'Take your yoga practice & teaching to the next level with a Continuing Education Certificate Course for yoga teachers, across three weekends in Chester UK.',
      image: '/media/og/training.jpg',
    },
  },
};

/** The four trainings listed on /courses/ and in the Courses menu, in live order. */
export const courseList = [
  courses['200-hour-yoga-teacher-training'],
  courses['300-hour-yoga-teacher-training'],
  courses['50-hour-yin-yttc'],
  courses['continuing-education'],
];
