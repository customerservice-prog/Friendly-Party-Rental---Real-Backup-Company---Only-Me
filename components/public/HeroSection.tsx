import Link from 'next/link'
import Image from 'next/image'
import ComicBookBackground from '@/components/public/ComicBookBackground'

const HERO_BADGES = {
  clean: 'https://friendlypartyrentalsyracuse.com/media/design_assets/friendly-party-rental/hero_badge_clean_event_ready.png',
  book: 'https://friendlypartyrentalsyracuse.com/media/design_assets/friendly-party-rental/hero_badge_click_here.png',
  safety: 'https://friendlypartyrentalsyracuse.com/media/design_assets/friendly-party-rental/hero_badge_safety_first.png',
}

export default function HeroSection() {
  return (
    <ComicBookBackground className="py-8 md:py-12">
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 px-4">
        <Image
          src={HERO_BADGES.clean}
          alt="Clean and Event-Ready Equipment"
          width={200}
          height={200}
          className="w-[160px] md:w-[200px] h-auto"
        />
        <Link href="/order-by-date">
          <Image
            src={HERO_BADGES.book}
            alt="Click Here to Book"
            width={200}
            height={200}
            className="w-[160px] md:w-[200px] h-auto hover:scale-105 transition-transform"
          />
        </Link>
        <Image
          src={HERO_BADGES.safety}
          alt="Safety First"
          width={200}
          height={200}
          className="w-[160px] md:w-[200px] h-auto"
        />
      </div>
    </ComicBookBackground>
  )
}
