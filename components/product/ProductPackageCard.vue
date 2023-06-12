<template>
  <div class="card col-span-2 border shadow">
    <div class="flex justify-between mb-0 -mt-2 text-lightgray">
      <FavoritesIcon class="hoverable cursor-pointer" />
    </div>
    <div class="flex gap-16 justify-between">
      <div class="w-10 flex-1 flex flex-col">
        <img src="/img/products/2.jpg" width="195" height="165" alt="" loading="lazy" class="block mx-auto" />
        <div class="text-2xl ellipsis">Lga 700</div>
        <div class="text-sm font-light leading-4 mt-4">Intel Core i5 10400F, 2900 МГц, LGA 1200, Intel B560, 2x 8 Гб ...</div>
      </div>
      <div class="w-10 flex-1 flex flex-col">
        <img src="/img/products/3.jpg" width="207" height="155" alt="" loading="lazy" class="block mx-auto mb-[10px]" />
        <div class="text-2xl ellipsis">Монитор HP M27f Монитор HP M27f</div>
        <div class="text-sm font-light leading-4 mt-4">Монитор HP M27f FHD (2G3D3AS)</div>
      </div>
    </div>
    <div class="bg-[#E5A35B] leading-7 rounded rounded-l-none text-center w-44 text-sm font-semibold -ml-6 text-white mt-2">Стоимость комплекта</div>
    <div class="price-info !flex-row !gap-10">
      <div>
        <div class="w-10">
          <ValetIcon />
        </div>
        <div class="font-sm">1 200 Br</div>
      </div>

      <div class="flex-1 flex justify-between">
        <div class="w-10">
          <BankIcon />
        </div>
        <div class="text-2xl">1 600 Br</div>
        <div class="ml-auto flex gap-2.5">
          <button class="btn leading-[50px]"><CartIcon />В корзину</button>
        </div>
      </div>
    </div>
  </div>
</template>
