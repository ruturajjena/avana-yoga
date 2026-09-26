/**
 * Supplied photography (assets/Images → public/media/images). See docs/ASSET-MAP.md for placement.
 * Real Avana Yoga teacher-training and teacher photography. Alt text describes only what is visible;
 * people are named only where they match a published teacher portrait.
 */
import type { Photo } from '@/lib/types';

const I = '/media/images';
const photo = (file: string, alt: string, width: number, height: number, position?: string): Photo => ({
  src: `${I}/${file}`,
  alt,
  width,
  height,
  position,
});

export const photos = {
  madhavForestWide: photo(
    'madhav-meditation-forest-wide.jpg',
    'Yogi Madhav seated cross-legged in meditation on a stone ledge beneath a forest canopy',
    2400,
    1856,
    '50% 40%',
  ),
  madhavForestClose: photo(
    'madhav-meditation-forest-close.jpg',
    'Yogi Madhav in seated meditation, hands resting on his knees, framed by forest',
    2400,
    2000,
    '50% 32%',
  ),
  teachersNamaste: photo(
    'ttc-teachers-namaste.jpg',
    'Yogi Madhav greets the circle with folded hands, seated beside a teacher in a green sari',
    1066,
    1600,
    '50% 60%',
  ),
  circleLaughter: photo('ttc-circle-laughter.jpg', 'Teachers sharing laughter with the group in the teacher training studio', 1066, 1600, '62% 50%'),
  studentsSeated: photo('ttc-students-seated.jpg', 'Trainees sitting cross-legged in quiet meditation on the studio floor', 1600, 1066, '55% 50%'),
  studentsListening: photo('ttc-students-listening.jpg', 'Three trainees seated on the studio floor, listening', 1600, 1066),
  satsangCircle: photo(
    'ttc-satsang-circle.jpg',
    'Teachers and trainees seated together in a circle beneath woven wall hangings',
    1600,
    1066,
  ),
  graduationCertificate: photo('ttc-graduation-01.jpg', 'A graduate receives his teacher training certificate from Yogi Madhav', 1600, 1066),
  graduationEmbrace: photo('ttc-graduation-embrace.jpg', 'Yogi Madhav rests a hand on a graduate’s shoulder during the closing ceremony', 1600, 1066),
  tilakBlessing: photo('ttc-tilak-blessing.jpg', 'A teacher smiles as she marks a trainee’s forehead with tilak', 1600, 1066, '42% 40%'),
  graduationHandover: photo('ttc-graduation-02.jpg', 'Yogi Madhav hands a certificate to a graduate while the teachers applaud', 1600, 1066),
  studentJoy: photo('ttc-student-joy.jpg', 'A trainee laughs with joy, hands clasped, during the closing circle', 1600, 1066, '78% 40%'),
  graduationSmile: photo('ttc-graduation-03.jpg', 'A graduate smiles with her certificate between two teachers', 1600, 1066),
  graduationBlue: photo('ttc-graduation-04.jpg', 'A graduate holds up her certificate beside Yogi Madhav as the teachers applaud', 1600, 1066),
  graduationFlower: photo('ttc-graduation-05.jpg', 'A graduate holds her certificate and a flower beside Yogi Madhav', 1600, 1066),
  communityCircle: photo('ttc-community-circle.jpg', 'The training group seated in a wide circle on the studio floor', 1600, 1066, '50% 40%'),
  celebration: photo('ttc-celebration.jpg', 'Trainees applauding around a brass plate of lit diyas', 1600, 1066, '45% 50%'),
  graduatesGroup: photo('ttc-graduates-group.jpg', 'The teacher training graduates and their teachers gathered with certificates', 1600, 1066, '50% 45%'),
  graduatesJoy: photo('ttc-graduates-joy.jpg', 'Graduates cheering with arms raised and certificates in hand', 1600, 1066, '50% 45%'),
  graduationLaughter: photo('ttc-graduation-06.jpg', 'A graduate laughs with Yogi Madhav, certificate in hand', 1600, 1066, '40% 50%'),
  workshopGathering: photo('ttc-workshop-gathering.jpg', 'Trainees kneeling together on the studio floor during a workshop', 1600, 1066),
  studentRest: photo('ttc-student-rest.jpg', 'A trainee lying on the studio floor, smiling, among the group', 1600, 1066, '40% 60%'),
  studioCircle: photo('ttc-studio-circle.jpg', 'Yogi Madhav and a teacher lead trainees in seated meditation', 1600, 1066, '35% 55%'),
} satisfies Record<string, Photo>;

export const books = {
  stillness: {
    src: '/media/books/stillness-in-a-restless-world.jpg',
    alt: 'Cover of Stillness in a Restless World by Yogi Madhav',
  },
  unbrokenThread: {
    src: '/media/books/the-unbroken-thread.jpg',
    alt: 'Cover of The Unbroken Thread by Yogi Madhav',
  },
};
