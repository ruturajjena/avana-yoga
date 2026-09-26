import { CoursePage } from '@/components/courses/CoursePage';
import { courses } from '@/data/courses';
import { buildMetadata } from '@/lib/seo';

const course = courses['200-hour-yoga-teacher-training'];

export const metadata = buildMetadata({ ...course.seo, path: course.href });

export default function Page() {
  return <CoursePage course={course} />;
}
