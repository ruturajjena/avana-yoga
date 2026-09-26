import { ChapterRail } from '@/components/home/ChapterRail';
import { FinalCall } from '@/components/home/FinalCall';
import { HomeHero } from '@/components/home/HomeHero';
import { OfferTrack } from '@/components/home/OfferTrack';
import { Philosophy } from '@/components/home/Philosophy';
import { Presence } from '@/components/home/Presence';
import { RetreatsStack } from '@/components/home/RetreatsStack';
import { TrainingIndex } from '@/components/home/TrainingIndex';
import { TransformationFilm } from '@/components/home/TransformationFilm';
import { Voices } from '@/components/home/Voices';
import { WhyAvana } from '@/components/home/WhyAvana';
import { JsonLd } from '@/components/seo/JsonLd';
import { courseList } from '@/data/courses';
import { home } from '@/data/home';
import { buildMetadata, itemListSchema } from '@/lib/seo';

export const metadata = buildMetadata({
  title: home.seo.title,
  description: home.seo.description,
  path: '/',
  absoluteTitle: true,
});

/**
 * Ancient wisdom → philosophy → offering → transformation → teaching → retreats → community.
 * The film chapters and the teacher line-up were removed at the client's request; teachers live on /about/.
 * Film chapters (pinned, scrubbed) alternate with still, readable sections.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Philosophy />
      <Presence />
      <OfferTrack />
      <WhyAvana />
      <TransformationFilm />
      <TrainingIndex />
      <Voices />
      <RetreatsStack />
      <FinalCall />
      <ChapterRail />
      <JsonLd data={itemListSchema('Avana Yoga teacher trainings', courseList.map((course) => ({ name: course.title, path: course.href })))} />
    </>
  );
}
