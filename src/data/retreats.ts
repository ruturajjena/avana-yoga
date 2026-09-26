/**
 * Retreats — extracted from avanayoga.com/austria-retreat/ and /goa-retreat/ (crawl 2026-09-11).
 * Photography is the retreat photography published on those pages; each photo is placed once.
 * Obvious typos corrected (e.g. "Oraganic", "amazin", "vegetarien", "Roohrmoos-Schaldming", "Medition"); facts unchanged.
 * The live /yoga-retreats/ page is an older copy of the Austria page with conflicting figures — not reproduced
 * (see docs/CONTENT-AUDIT.md §5.1).
 */
import type { Film, Photo } from '@/lib/types';
import { site } from './site';
import type { BioVariant, TeacherSlug } from './teachers';

const photo = (src: string, alt: string, width: number, height: number, position?: string): Photo => ({ src, alt, width, height, position });

const A = '/media/retreats/austria';
export const austriaPhotos = {
  rooftopYogaDachstein: photo(`${A}/rooftop-yoga-dachstein.jpg`, 'Group yoga practice on a rooftop terrace facing the Dachstein mountains', 1600, 884, '50% 60%'),
  rooftopTreePose: photo(`${A}/rooftop-tree-pose.jpg`, 'Retreat guests balancing in tree pose on the rooftop terrace with the Alps behind', 1600, 1200),
  lakeTreePose: photo(`${A}/lake-tree-pose.jpg`, 'A man balancing in tree pose on a rock in a clear alpine lake', 1024, 768),
  alpineStreamRest: photo(`${A}/alpine-stream-rest.jpg`, 'Guests resting on rocks beside a clear alpine stream', 1024, 768),
  hikerValley: photo(`${A}/hiker-valley.jpg`, 'A hiker with a backpack looking out over a green alpine valley', 1024, 768),
  waterfallBridge: photo(`${A}/waterfall-bridge.jpg`, 'Three hikers on a suspension bridge in front of a waterfall', 1500, 2000),
  meadowSavasana: photo(`${A}/meadow-savasana.jpg`, 'Guests lying in relaxation on an alpine meadow beside a lake', 1600, 1200),
  meadowWarrior: photo(`${A}/meadow-warrior.jpg`, 'A woman in warrior pose on a grassy ridge above an alpine lake', 1024, 1024),
  meadowGroupPractice: photo(`${A}/meadow-group-practice.jpg`, 'Group yoga practice on a meadow surrounded by forested mountains', 1024, 768),
  hikingStream: photo(`${A}/hiking-stream.jpg`, 'Hikers walking a rocky trail beside a mountain stream', 1024, 768),
  fountainLake: photo(`${A}/fountain-lake.jpg`, 'A carved wooden fountain overlooking an alpine lake and mountains', 1024, 942),
  groupMeadow: photo(`${A}/group-meadow.jpg`, 'The retreat group together on a mountain meadow', 1600, 1200),
  rooftopOverhead: photo(`${A}/rooftop-overhead.jpg`, 'Overhead view of yoga mats laid out on the hotel rooftop deck', 1600, 909),
  hotelBergkristall: photo(`${A}/hotel-bergkristall.jpg`, 'Biohotel Bergkristall in front of the Dachstein mountains', 885, 885),
  relaxRoomView: photo(`${A}/relax-room-view.jpg`, 'Relaxation room with loungers and a panoramic window onto the mountains', 1024, 683),
  yogaStudio: photo(`${A}/yoga-studio.jpg`, 'Timber yoga studio with floor-to-ceiling windows onto the mountains', 1024, 683),
  roomModern: photo(`${A}/room-modern.jpg`, 'Bright hotel room with timber furniture', 1600, 1067),
  roomDouble: photo(`${A}/room-double.jpg`, 'Double room with wooden furnishings and balcony doors', 1024, 739),
  breakfastPorridge: photo(`${A}/breakfast-porridge.jpg`, 'Porridge with blueberries served on a wooden table', 1536, 1024),
  breakfastGranola: photo(`${A}/breakfast-granola.jpg`, 'Jars of granola, nuts and seeds at breakfast', 1024, 690),
  breakfastBowls: photo(`${A}/breakfast-bowls.jpg`, 'Breakfast bowls of fruit and granola', 1024, 683),
  balconyView: photo(`${A}/balcony-view.jpg`, 'A timber balcony looking out to the mountains', 1024, 683),
  studioPractice: photo(`${A}/studio-practice.jpg`, 'A student resting in child’s pose in the mountain-view studio', 1024, 683),
  rooftopDancerPose: photo(`${A}/rooftop-dancer-pose.jpg`, 'Two women in dancer pose on the rooftop terrace', 1024, 683),
  groupLakeside: photo(`${A}/group-lakeside.jpg`, 'The retreat group with hiking gear beside an alpine lake', 1024, 768),
};

const G = '/media/retreats/goa';
export const goaPhotos = {
  sunsetBeachMeditation: photo(`${G}/sunset-beach-meditation.jpg`, 'Five people meditating on a beach in Goa as the sun sets over the sea', 1600, 1066, '50% 70%'),
  poolsideYoga: photo(`${G}/poolside-yoga.jpg`, 'A woman in downward-facing dog beside a pool framed by banana palms', 1600, 1068),
  ayurvedaMassage: photo(`${G}/ayurveda-massage.jpg`, 'An Ayurvedic oil massage', 1600, 1067),
  loneBeach: photo(`${G}/lone-beach.jpg`, 'A lone figure at the water’s edge on a wide Goan beach', 1600, 1068),
  fishingBoat: photo(`${G}/fishing-boat.jpg`, 'A traditional wooden fishing boat resting on the sand', 1600, 1066),
  palmsSea: photo(`${G}/palms-sea.jpg`, 'Coconut palms giving way to the sea along the Goan coast', 1600, 1066),
  beachHandstand: photo(`${G}/beach-handstand.jpg`, 'A yogi practising an arm balance on the beach', 1600, 1066),
  beachJetty: photo(`${G}/beach-jetty.jpg`, 'A wooden footbridge leading towards beach huts', 1600, 1066),
  mistyMeditation: photo(`${G}/misty-meditation.jpg`, 'A woman meditating on a hilltop above morning mist', 1600, 1066),
  sunsetMeditationSolo: photo(`${G}/sunset-meditation-solo.jpg`, 'A man meditating on a hillside at sunset', 1600, 1066),
  coastalViewPair: photo(`${G}/coastal-view-pair.jpg`, 'Two women sitting on rocks overlooking the beach', 1600, 1066),
  beachMeditationGroup: photo(`${G}/beach-meditation-group.jpg`, 'Three women meditating cross-legged on the sand', 1600, 1200),
  ayurvedaHerbs: photo(`${G}/ayurveda-herbs.jpg`, 'Dried Ayurvedic herbs and flowers with a wooden mortar and pestle', 768, 789),
  yogaShala: photo(`${G}/yoga-shala.jpg`, 'An open-sided yoga shala looking out to palms and the sea', 1600, 1067),
  beachBreakfast: photo(`${G}/beach-breakfast.jpg`, 'Fresh fruit and a smoothie on a table by the beach', 1600, 1066),
  pastelWaves: photo(`${G}/pastel-waves.jpg`, 'Waves washing onto the sand under a pastel sky', 1080, 1080),
  riverMouth: photo(`${G}/river-mouth.jpg`, 'A river meeting the sea beside a sandbank', 1080, 1080),
  sunsetSea: photo(`${G}/sunset-sea.jpg`, 'The sun setting over the sea', 1080, 1080),
};

export type RetreatSlug = 'austria-retreat' | 'goa-retreat';

export type RetreatPackage = { name: string; price: string; unit: string; basis: string; availability: string };
export type RetreatInclusion = { title: string; text: string[]; image?: Photo };

export type Retreat = {
  slug: RetreatSlug;
  href: string;
  mood: 'alpine' | 'coastal';
  destination: string;
  region: string;
  title: string;
  status: string;
  duration: string;
  fromPrice: string;
  summary: string;
  welcome: { eyebrow: string; heading: string; text: string };
  pillars: { title: string; text: string; image: Photo }[];
  story: { where: string[]; what: string[]; feel: string[] };
  included: RetreatInclusion[];
  /** Getting there. `included` marks travel that is part of the package (Goa airport transfers). */
  travel: RetreatInclusion & { included: boolean; facts: { label: string; value: string }[] };
  booking: {
    heading: string;
    intro: string;
    terms: string[];
    packages: RetreatPackage[];
    href: string;
    reserveLabel: string;
    packageLabel: string;
  };
  host: { heading: string; teacher: TeacherSlug; variant: BioVariant };
  closing: { heading: string; text: string[]; question: string; cta: string };
  /** heroFilm: scroll-controlled hero film; `hero` stays the still used on cards, share images and fallbacks. */
  media: { hero: Photo; heroFilm?: Film['id']; welcome: Photo; where: Photo[]; what: Photo[]; feel: Photo; gallery: Photo[] };
  seo: { title: string; description: string; image: string };
};

export const retreats: Record<RetreatSlug, Retreat> = {
  'austria-retreat': {
    slug: 'austria-retreat',
    href: '/austria-retreat/',
    mood: 'alpine',
    destination: 'Austria',
    region: 'Schladming · Austrian Alps',
    title: 'Yoga & Hiking Retreat in the Austrian Alps',
    status: 'Date: TBD',
    duration: '5 days · 4 nights',
    fromPrice: '£799',
    summary: 'In the middle of the exciting nature of the Alps, we practice yoga outdoors.',
    welcome: {
      eyebrow: 'Welcome In',
      heading: 'Inspiring and Relaxing Yoga Holidays',
      text: 'In the middle of the exciting nature of the Alps, we practice yoga outdoors. Deeply relaxed and at ease with yourself. Organic food and an amazing Dachstein view from your room and yoga studio.',
    },
    pillars: [
      {
        title: 'Yoga',
        text: 'Unwind and reconnect with your body through daily yoga practice in the breathtaking mountains of Austria.',
        image: austriaPhotos.rooftopTreePose,
      },
      {
        title: 'Hiking',
        text: 'Embark on a journey of self-discovery and exploration with daily hikes through Austria’s stunning landscapes.',
        image: austriaPhotos.groupMeadow,
      },
      {
        title: 'Meditation',
        text: 'Find inner peace and clarity through daily meditation sessions, surrounded by the natural beauty of Austrian Alps.',
        image: austriaPhotos.alpineStreamRest,
      },
    ],
    story: {
      where: [
        'Overlooking the beautiful Alps of Austria, nestled in the natural landscape, awaits your home away from home.',
        'Peaceful nature, blended with history, culture, and traditional Austrian Hospitality, promises the perfect backdrop for your retreat experience.',
        'Upon arrival, you’ll be warmly welcomed and whisked away to your charming new lodgings, where you’ll feel the demands of daily life instantly melt away.',
      ],
      what: [
        'You’ll open each day with amazing mountain views as you learn to reconnect with your body and mind, moving through guided meditations and yoga practice.',
        'You’ll balance time for relaxation with the opportunity to embrace adventure as you hike the mountains during the daytime. Our evening vegan/vegetarian nutritious meals with a humble, fun, and friendly community. Immersive conversations contrast with carefree laughter to create a warm sense of shared belonging. Your day ends with time for sharing reflections, expressing gratitude and blissful evening Yin/relaxation session.',
      ],
      feel: [
        'Your bespoke experience presents the ultimate opportunity for connection. Within yourself, within nature, and within your welcoming community.',
        'Experiencing a profound sense of self-connection and universal interconnectedness, you’ll be taken on a journey of healing and personal growth.',
        'It’s like pressing a reset button.',
        'You’ll walk away with clarity, fresh motivation, and lifelong memories, while finally feeling ready to fulfill your potential.',
      ],
    },
    included: [
      {
        title: 'Accommodation',
        text: ['5 days and 4 nights accommodation in a peacefully located bio hotel, carefully selected to deliver maximum comfort, convenience and relaxation.'],
        image: austriaPhotos.roomModern,
      },
      {
        title: 'Meals Included',
        text: [
          'Delicious, nutritious and wholesome food, designed to leave you feeling both energised and satisfied. Vegan/Vegetarian meals, you will be provided morning smoothie, brunch, fruits & nuts during the day and 3 course delicious dinner.',
        ],
        image: austriaPhotos.breakfastPorridge,
      },
      {
        title: 'Daily Yoga',
        text: ['One or two daily yoga sessions with Madhav, suited to all levels and abilities. You’ll be guided through a variety of styles leaving you feeling both energised and relaxed.'],
        image: austriaPhotos.yogaStudio,
      },
      {
        title: 'Morning Meditations',
        text: ['Begin your day with intention, as you’re peacefully led through a guided meditation to invite feelings of calm, clarity and gratitude.'],
        image: austriaPhotos.studioPractice,
      },
      {
        title: 'Daily Activities',
        text: [
          'A carefully curated itinerary, created to maximise the opportunity for both adventure and relaxation. Activities include Hiking and exploring the beautiful mountains. Free rental of hiking backpack and hiking poles. Schladming-Dachstein Sommercard, The FREE ticket for over 100 experiences.',
        ],
        image: austriaPhotos.waterfallBridge,
      },
    ],
    travel: {
      title: 'How To Reach',
      text: [
        'We will be staying in beautiful Rohrmoos-Schladming. Breathtaking location and unique atmosphere make our Biohotel Bergkristall your home away from home.',
        'The nearest train station is Schladming and nearest airport is Salzburg. Our location is easy to access, we will provide you more information regarding local transport and taxis.',
      ],
      image: austriaPhotos.hotelBergkristall,
      included: false,
      facts: [
        { label: 'Stay', value: 'Biohotel Bergkristall, Rohrmoos-Schladming' },
        { label: 'Nearest train station', value: 'Schladming' },
        { label: 'Nearest airport', value: 'Salzburg' },
        { label: 'Check-in · Check-out', value: '2:00 PM · 10:00 AM' },
      ],
    },
    booking: {
      heading: 'Begin your Journey…',
      intro: 'Select your perfect retreat package:',
      terms: ['£299 deposit required upon booking', 'Full balance due 60 days before', 'Check-In 2:00 PM', 'Check-Out 10:00 AM'],
      packages: [
        { name: 'Shared double room', price: '£799', unit: 'Price per person', basis: 'Price based on 2 people sharing a double room', availability: 'Only 4 spots available' },
        { name: 'Private room', price: '£999', unit: 'Price per person', basis: 'Price based on own private room', availability: 'Only 2 spots available' },
      ],
      href: site.forms.retreatBooking,
      reserveLabel: 'Reserve my spot!',
      packageLabel: 'Get it!',
    },
    host: { heading: 'Meet Your Host', teacher: 'madhav', variant: 'host' },
    closing: {
      heading: 'Ready for transformation?',
      text: [
        'Your journey begins here. Spaces are limited. If you’d like to join please secure your slot now. I can’t wait to share this beautiful, unforgettable experience together.',
      ],
      question: 'If you have any questions, simply email',
      cta: 'Secure my Slot',
    },
    media: {
      hero: austriaPhotos.rooftopYogaDachstein,
      heroFilm: 'austria',
      welcome: austriaPhotos.lakeTreePose,
      where: [austriaPhotos.balconyView, austriaPhotos.relaxRoomView],
      what: [austriaPhotos.meadowGroupPractice, austriaPhotos.hikingStream],
      feel: austriaPhotos.meadowSavasana,
      gallery: [
        austriaPhotos.rooftopOverhead,
        austriaPhotos.meadowWarrior,
        austriaPhotos.groupLakeside,
        austriaPhotos.fountainLake,
        austriaPhotos.hikerValley,
        austriaPhotos.rooftopDancerPose,
        austriaPhotos.breakfastGranola,
        austriaPhotos.roomDouble,
        austriaPhotos.breakfastBowls,
      ],
    },
    seo: {
      title: 'Yoga & Hiking Retreat in the Austrian Alps',
      description:
        'Come to our yoga retreat in the Austrian Alps and discover the true meaning of peace, relaxation and well-being: daily yoga, hiking and meditation in Schladming.',
      image: '/media/og/austria.jpg',
    },
  },

  'goa-retreat': {
    slug: 'goa-retreat',
    href: '/goa-retreat/',
    mood: 'coastal',
    destination: 'Goa',
    region: 'North Goa · India',
    title: 'Yoga & Ayurveda Wellness Retreat in Goa, India',
    status: 'Coming Soon…',
    duration: '7 or 10 days',
    fromPrice: '£899',
    summary: 'Escape to Goa for a transformative Yoga & Wellness Retreat.',
    welcome: {
      eyebrow: 'Welcome In',
      heading: 'Serenity by the Sea: A Yoga & Ayurveda Wellness Escape',
      text: 'Escape to Goa for a transformative Yoga & Wellness Retreat. Experience daily beachfront yoga, nourishing cuisine, and rejuvenation in paradise. Book now for a harmonious journey of mind, body, and spirit!',
    },
    pillars: [
      {
        title: 'Yoga Bliss',
        text: 'Experience pure bliss through daily yoga sessions amidst the serene beauty of Goa’s shores. Find inner peace with each breath and stretch, as you harmonise mind and body in this idyllic coastal setting.',
        image: goaPhotos.poolsideYoga,
      },
      {
        title: 'Ayurveda Wellness',
        text: 'Embark on a journey of holistic well-being with the healing traditions of Ayurveda. Rejuvenate your body, mind, and spirit as ancient wisdom meets coastal serenity, offering you a transformative experience.',
        image: goaPhotos.ayurvedaMassage,
      },
      {
        title: 'Sea of Serenity',
        text: 'Indulge in the tranquil beauty of the sea as its gentle waves create a serene backdrop for your retreat. Let the coastal serenity wash over you, soothing your soul and providing a perfect environment for relaxation and rejuvenation.',
        image: goaPhotos.loneBeach,
      },
    ],
    story: {
      where: [
        'Your journey to well-being begins in the heart of Goa, where lush palm trees sway in the breeze and the rhythmic waves of the Arabian Sea provide a soothing soundtrack.',
        'Our retreat takes place in a serene coastal haven, where you’ll find yourself surrounded by nature’s beauty and the perfect environment for relaxation and rejuvenation. Come and experience the harmonious blend of yoga, wellness, and the coastal charm of Goa in this idyllic setting.',
      ],
      what: [
        'During your stay at our retreat, you’ll embark on a transformative journey of self-discovery and well-being. Immerse yourself in daily yoga sessions, guided by experienced instructors, to rejuvenate your body and calm your mind.',
        'Dive into wellness workshops and activities designed to nourish your spirit and promote inner balance. Plus, embrace the healing power of the sea with beachfront relaxation and Vitamin Sea activities, ensuring a holistic experience that leaves you refreshed, recharged, and renewed.',
      ],
      feel: [
        'At our retreat, you’ll experience an overwhelming sense of tranquility and inner harmony. As you embrace daily yoga and wellness practices in the serene ambiance of Goa, you’ll find your stresses melting away, replaced by a profound sense of peace.',
        'The soothing coastal vibes will leave you feeling rejuvenated, and the connections you make with fellow participants will warm your heart. Ultimately, you’ll depart with a deep sense of well-being, ready to carry the serenity of your retreat with you into your daily life.',
      ],
    },
    included: [
      {
        title: 'Accommodation',
        text: ['Accommodation in a peacefully located retreat in North Goa, standard aircon room carefully selected to deliver maximum comfort, convenience and relaxation.'],
      },
      {
        title: 'Meals Included',
        text: [
          'Delicious, nutritious and wholesome food, designed to leave you feeling both energised and satisfied. Vegan/Vegetarian meals, you will be provided breakfast, lunch and dinner, fruits & herbal tea during the day.',
        ],
        image: goaPhotos.beachBreakfast,
      },
      {
        title: 'Daily Yoga',
        text: ['Two daily yoga sessions, suited to all levels and abilities. You’ll be guided through a variety of styles leaving you feeling both energised and relaxed.'],
      },
      {
        title: 'Morning Meditation',
        text: ['Begin your day with intention, as you’re peacefully led through a guided meditation to invite feelings of calm, clarity and gratitude.'],
        image: goaPhotos.mistyMeditation,
      },
      {
        title: 'Ayurveda Massage',
        text: [
          'Each day of your retreat promises a harmonious blend of rejuvenation and cultural enrichment. Start your mornings with invigorating yoga and Meditation sessions set against the backdrop of Goa’s natural beauty. Afternoons are dedicated to indulging in Ayurveda massages, allowing you to relax and rejuvenate your body. In the evenings, immerse yourself in vibrant cultural activities, exploring the rich heritage and traditions of Goa. Every day, you’ll find yourself immersed in a perfect blend of self-care, serenity, and cultural discovery.',
        ],
        image: goaPhotos.ayurvedaHerbs,
      },
    ],
    travel: {
      title: 'Airport Pickup & drop off',
      text: [
        'Our retreat is easily accessible from Goa’s major transportation hubs. Arriving by air, you can fly into Goa Airport, which is well-connected to major cities in India and international destinations. From there, a short scenic drive will bring you to our coastal haven. We can arrange for convenient airport transfers. Your journey to well-being begins the moment you arrive in this tropical paradise.',
      ],
      image: goaPhotos.coastalViewPair,
      included: true,
      facts: [
        { label: 'Region', value: 'North Goa, India' },
        { label: 'Arrive', value: 'Goa Airport' },
        { label: 'Transfers', value: 'Airport pickup & drop off' },
        { label: 'Check-in · Check-out', value: '12:00 PM · 10:00 AM' },
      ],
    },
    booking: {
      heading: 'Begin your Journey…',
      intro: 'Select your perfect retreat package:',
      terms: [
        '£299 deposit required upon booking (nonrefundable)',
        'Full balance due 60 days before',
        'Single occupancy available with a supplement of £199 (7 days retreat), £299 (10 days retreat)',
        'Check-In 12:00 PM',
        'Check-Out 10:00 AM',
      ],
      packages: [
        { name: '7 Days Retreat', price: '£899', unit: 'Price per person', basis: 'Price based on 2 people sharing a double room', availability: 'Only 8 spots available' },
        { name: '10 Days Retreat', price: '£1199', unit: 'Price per person', basis: 'Price based on 2 people sharing a double room', availability: 'Only 8 spots available' },
      ],
      href: site.forms.retreatBooking,
      reserveLabel: 'Reserve my spot!',
      packageLabel: 'Get it!',
    },
    host: { heading: 'Meet Your Host', teacher: 'madhav', variant: 'host' },
    closing: {
      heading: 'Ready for transformation?',
      text: [
        'Absolutely! Our retreat is designed to be a transformative experience, where you can embark on a journey of self-discovery, relaxation, and holistic well-being. If you’re ready to rejuvenate your mind, body, and spirit in the beautiful surroundings of Goa, then you’re ready for the transformation that awaits you at our retreat. Come join us for an unforgettable experience!',
        'Spaces are limited. If you’d like to join please secure your slot now. I can’t wait to share this beautiful, unforgettable experience together.',
      ],
      question: 'If you have any questions, simply email',
      cta: 'Secure my Slot',
    },
    media: {
      hero: goaPhotos.sunsetBeachMeditation,
      heroFilm: 'goa',
      welcome: goaPhotos.beachMeditationGroup,
      where: [goaPhotos.palmsSea, goaPhotos.beachJetty],
      what: [goaPhotos.yogaShala, goaPhotos.beachHandstand],
      feel: goaPhotos.sunsetMeditationSolo,
      gallery: [goaPhotos.pastelWaves, goaPhotos.fishingBoat, goaPhotos.riverMouth, goaPhotos.sunsetSea],
    },
    seo: {
      title: 'Yoga & Ayurveda Wellness Retreat in Goa, India',
      description:
        'Serenity by the sea: a Yoga & Ayurveda wellness retreat in North Goa, India with daily yoga, morning meditation, Ayurveda massage and vegan/vegetarian meals.',
      image: '/media/og/goa.jpg',
    },
  },
};

export const retreatList = [retreats['austria-retreat'], retreats['goa-retreat']];
