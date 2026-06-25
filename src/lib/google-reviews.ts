import {
  Award,
  Briefcase,
  Building,
  Car,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

export type GoogleReview = {
  rater: string;
  role: string;
  comp: string;
  quote: string;
  val: string;
  initial: string;
  icon: LucideIcon;
  color: string;
  timeAgo: string;
};

const ICONS: LucideIcon[] = [Sparkles, TrendingUp, Building, Car, Award, Briefcase];
const COLORS = [
  'from-brand-gold via-amber-400 to-orange-500',
  'from-amber-400 via-brand-gold to-yellow-500',
  'from-orange-500 via-brand-gold to-amber-500',
  'from-yellow-400 via-amber-500 to-brand-gold',
  'from-brand-gold via-orange-400 to-yellow-500',
  'from-amber-500 via-brand-gold to-orange-500',
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function entry(
  index: number,
  rater: string,
  role: string,
  comp: string,
  quote: string,
  timeAgo: string,
): GoogleReview {
  return {
    rater,
    role,
    comp,
    quote,
    val: 'Google Review',
    initial: initials(rater),
    icon: ICONS[index % ICONS.length],
    color: COLORS[index % COLORS.length],
    timeAgo,
  };
}

/** Verified Google reviews — Social Proof & Impact carousel (About page). */
export const GOOGLE_REVIEWS: GoogleReview[] = [
  entry(
    0,
    'Lisa Hamlett-Williams',
    'vBiz Me Client',
    'Google Review',
    'I cannot say enough great things about Michaelangelo, founder and CEO of Vbizme! How often do you get to work with the top person of a company from start to finish? In this case I did and the experience was AMAZING. He was incredibly attentive and patiently walked me through every single step of creating my virtual business card. He made sure that he knew, that he knew I was satisfied in what we were creating. He thinks 10 steps ahead, and is so passionate about what he does, that it\'s contagious. Both he and his wife made themselves readily available well into the night and we all collaborated and finished the entire project in one day! His attentiveness, patience and creative vision throughout the entire process really sets him apart—he truly went above and beyond, and while he may have many other projects that he\'s working on, I felt like mine was the only one. He was very kind, personable, professional, and a pleasure to work with. The final product came out absolutely wonderful, and I\'m beyond happy with the results. I highly, highly recommend!',
    '4 months ago',
  ),
  entry(
    1,
    'Brenda Davila',
    'vBiz Me Client',
    'Google Review',
    'I had such a great experience using VBiz to create my virtual business card. The process itself was simple and intuitive, but what truly stood out was the level of support I received. Michelangelo and Dagmary were incredibly helpful, patient, and took additional time to make sure I had all the tools I needed. Michelangelo went above and beyond after sending me several video options, he took the time to really listen when I shared that the original style didn\'t quite align with my personality. He then provided alternative options that felt softer, more feminine, and much more me. That level of care and personalization made all the difference. I truly felt supported throughout the entire process, and I love how professional and aligned my virtual business card turned out. Highly recommend VBiz for anyone who values both quality and genuine support.',
    '4 months ago',
  ),
  entry(
    2,
    'Punisher5616',
    'Business Owner',
    'Google Review',
    'I really don\'t know where to start. Mike came to my shop with his dog and a dream of making me the coolest E Business card ever!! Once I saw the potential and what he could do and all the things he did for me plus he rebranded my company\'s logo and has had the most excellent customer service, enthusiasm, and hardest work ethic I\'ve ever seen besides myself, I just can\'t say anything other than positive and the most amazing experience! This guy knows his stuff, he has the tools, capability, knowledge, and experience to make anything happen that you don\'t even think it\'s possible! I highly suggest using his services because you will not be let down! I am extremely happy with all the service that I received, and I will always do business with him in the future! I can\'t stop showing people my E business card because it\'s so cool!',
    '7 months ago',
  ),
  entry(
    3,
    'Barry DeHart',
    'vBiz Me Client',
    'Google Review',
    'Michael did an outstanding job on my vBizMe digital business card. He\'s an absolute pleasure to work with — fun, creative, exciting, and truly innovative. Michael took my ideas and turned them into something better than I imagined. His attention to detail and creativity really set him apart. On top of that, his pricing is very fair for the quality of work he delivers. If you\'re looking for someone who actually cares about your brand and makes the process enjoyable, I highly recommend Michael. You won\'t be disappointed!',
    '4 months ago',
  ),
  entry(
    4,
    'Nina Vazquez',
    'Founder',
    'Balanced Glow Life',
    'Amazing experience with VBi Me! From start to finish, he truly listened to my vision and brought it to life in a way that felt perfectly aligned with my brand, Balanced Glow Life. My eCard came out beautiful, polished, and professional, capturing exactly what I had envisioned. What stood out the most was the incredible teamwork between Michaelangelo and Dagmary: the collaboration, care, and passion they bring truly shine through. I absolutely loved working with them and highly recommend VBiz Me to anyone looking to elevate their brand with intention and excellence.',
    '4 months ago',
  ),
  entry(
    5,
    'You vs you Transform',
    'Business Owner',
    'Google Review',
    'There are 2 parts to this review. And you need to read this! First I will give a concise review of my experience with Michelangelo and Vbizme. Second I will add the context to which my review is based on. I want to start by saying thank you to Michelangelo for being persistent in his urgency to present Vizme to me to drive my business. I kept blowing him off because he was in my initial opinion pestering me it felt like. Honestly, I didn\'t know what I didn\'t know. When I finally met with him. From the first moment that Michelangelo demonstrated Vizme cards, I was sold before he even did a demonstration. Just by the idea of it. I could tell right away this was the wave of the future because I know in my experience lot of times people forced their paper business cards on me and I take it just to be polite and never look at it. With the v-bisme card I managed to expand my networking and grow business by 11% because if people so happen to remember their interaction with you they can reference the Vbizme card that was directly installed into their contacts and get a tremendous amount of information from that card so they don\'t have to remember what you said and it\'s almost like when they click on it they\'re getting your presentation all over again when they need it the most. That\'s when they become receptive and that\'s when you get return on investment from Vizme. It plants seeds that eventually grow to become fruitful. This form of outreach and networking is not an option is mandatory. And every time I have an idea or want to make an alteration he\'s been right there to apply it to my page and even reaches out to me when he has ideas that he think will enhance the impact for my business. Bottom line, his guy actually gives a shit. Thank you Michelangelo you have a great product here!',
    '5 months ago',
  ),
  entry(
    6,
    'Jevon Thomas',
    'Business Owner',
    'Google Review',
    'Michael was easy and fun to work with. He took and continues to take the time to learn about me, my business and what makes my situation unique. I really appreciate that and wholeheartedly endorse him.',
    '6 months ago',
  ),
  entry(
    7,
    'James Quinn',
    'Multi-Business Owner',
    '40+ Years in Business',
    'What an amazing card! I\'ve been in business for over 40 years and never been so excited or impressed by a business card. I own multiple businesses and offer multiple services … I am able to include every one of them and share their links with individuals I meet and through numerous social media platforms….this is an all in one dynamic card! Amazing!!!',
    '7 months ago',
  ),
  entry(
    8,
    'Matheno Bey',
    'Owner',
    'Hall of Fame Construction Group',
    'If you don\'t have the VBizMe Virtual business card you\'re really missing out. My name is Mat owner of Hall of Fame Construction Group And we use our virtual business card for more than just a card. We send it to every single client prior to our visit.',
    '9 months ago',
  ),
  entry(
    9,
    'Yma Orne Campbell',
    'vBiz Me Client',
    'Google Review',
    'vBiz Me has definitely achieved my expectations. My clientele have grown and my sales have increased. The flow of contact with inquiries have been more than I could have imagined. vBiz Me is an excellent resource for anyone interested in displaying talent and showcasing their expertise and skills in an easy affordable platform! Thank you vBiz Me! I am a very happy customer!! If there were more stars to give, you would have them because you earned it!!!',
    '9 months ago',
  ),
  entry(
    10,
    'Abdul Aziz',
    'Founder',
    'Google Review',
    'VBizMe helped me launch and grow my business faster than I ever imagined. From business setup to branding and marketing, their all-in-one support saved me time, money, and stress. Their team understands what startups need — and delivers real results. Thanks to VBizMe, I now have a strong online presence, more leads, and a clear path to scale. If you\'re serious about growing your business, VBizMe is the partner you need. Highly recommended!',
    '10 months ago',
  ),
  entry(
    11,
    'Yma Campbell',
    'vBiz Me Client',
    'Google Review',
    'I\'m definitely satisfied with my services and as a result, my business has flourished! My clientele has grown and my sales have increased beyond what I could imagine.',
    '9 months ago',
  ),
  entry(
    12,
    'Ken P',
    'Business Owner',
    'Google Review',
    'Mike is a great guy make up everything for my business. Always calls makes sure I\'m happy calls with updates on everything best of the best',
    '7 months ago',
  ),
  entry(
    13,
    'Clinton Weston',
    'vBiz Me Client',
    'Google Review',
    'Excellent product and very professional customer services.',
    '4 months ago',
  ),
  entry(
    14,
    'Chago Vargas',
    'Local Guide',
    'Google Review',
    'Love this product, saves money on getting business cards and convenience.',
    '9 months ago',
  ),
  entry(
    15,
    'Richard Kincaid',
    'vBiz Me Client',
    'Google Review',
    'Works Great for me !',
    '8 months ago',
  ),
  entry(
    16,
    'KeysToDreamsByJessica',
    'vBiz Me Client',
    'Google Review',
    'Excellent service from start to finish! Michaelangelo, the CEO, was professional, knowledgeable, and went above and beyond to ensure everything was handled smoothly. I truly appreciated the great communication, attention to detail, and outstanding customer service when he created my V Bizme virtual card. Highly recommend! Go get your virtual cards today!!!!',
    '1 week ago',
  ),
];
