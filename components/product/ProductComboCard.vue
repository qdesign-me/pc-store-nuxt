<template>
  <div class="card card-combo col-span-2 border shadow">
    <div class="flex justify-between mb-0 -mt-2 text-lightgray">
      <FavoritesIcon class="hoverable cursor-pointer" />
      <CompareIcon class="hoverable cursor-pointer" />
    </div>
    <img src="/img/products/combo.jpg" alt="" loading="lazy" width="486" height="152" class="mb-6 block" />
    <div class="text-2xl">Lga 700</div>
    <div class="text-sm font-light leading-4 mt-4 mr-32">Ноутбук MSI Modern 14 C5M-010 XRU, 14”, IPS, AMD Ryzen 5 5625U, 6-ядерный, 16ГБ DDR4</div>
    <div class="price-info">
      <div>
        <div class="w-10">
          <BankIcon class="text-[#E5A35B]" />
        </div>
        <div class="text-2xl whitespace-nowrap">1 600 Br</div>
        <div class="ml-auto flex gap-2.5 flex-wrap justify-end">
          <button class="btn is-plain">Конфигуратор</button>
          <button class="btn"><CartIcon />В корзину</button>
        </div>
      </div>
    </div>
    <div class="info">
      <OkIcon />
      <PercentIcon />
    </div>

    <div class="tags mt-2">
      <div class="bg-[#F54D4D]">В рассрочку</div>
    </div>
  </div>
</template>
