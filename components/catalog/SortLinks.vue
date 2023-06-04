//@ts-nocheck
'use client';
import ChevronDownIcon from '@/components/Icons/ChevronDownIcon';
import { useRouter } from 'next/navigation';

function SortingLinksItem({ uri, searchParams: { sortby, sortdir }, sorttype }) {
  const router = useRouter();
  const active = sortby === sorttype || (!sortby && sorttype === 'popular');
  const dir = active ? (sortdir === 'asc' ? 'desc' : 'asc') : 'asc';
  const href = `${uri}?sortby=${sorttype}&sortdir=${dir}`;

  const labels = {
    popular: 'по популярности',
    price: 'по цене',
    rank: 'по рейтингу',
    reviews: 'по отзывам',
    video: 'по обзорам',
    name: 'по названию',
  };

  const handleClick = (href) => router.push(href);

  return (
    <div onClick={() => handleClick(href)} class={['flex gap-2 items-center cursor-pointer', active ? 'text-lightblue' : ''].join(' ')}>
      {labels[sorttype]}

      {active && (
        <>
          {sortdir === 'asc' && <ChevronDownIcon class="rotate-180" width="8" height="5" />}
          {sortdir === 'desc' && <ChevronDownIcon width="8" height="5" />}
        </>
      )}
    </div>
  );
}

function SortingLinks({ uri, searchParams }) {
  return (
    <>
      <div class="text-sm flex gap-3 mb-6">
        Сортировать
        <SortingLinksItem uri={uri} searchParams={searchParams} sorttype="popular" />
        <SortingLinksItem uri={uri} searchParams={searchParams} sorttype="price" />
        <SortingLinksItem uri={uri} searchParams={searchParams} sorttype="rank" />
        <SortingLinksItem uri={uri} searchParams={searchParams} sorttype="reviews" />
        <SortingLinksItem uri={uri} searchParams={searchParams} sorttype="video" />
        <SortingLinksItem uri={uri} searchParams={searchParams} sorttype="name" />
      </div>
    </>
  );
}

export default SortingLinks;
