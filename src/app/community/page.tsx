import type { Metadata } from 'next';
import Community from '@/components/views/Community';

export const metadata: Metadata = {
  title: 'Community Update | vBiz Me Network',
  description:
    'Discover the vBiz Me community — verified entrepreneurs, executive coaches, and advisors sharing high-speed digital smart vCards.',
};

export default function CommunityPage() {
  return <Community />;
}
