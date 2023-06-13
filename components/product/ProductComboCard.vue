<template>
  <div class="card col-span-2 border shadow">
    <div class="flex justify-between mb-0 -mt-2 text-lightgray">
      <FavoritesIcon class="hoverable cursor-pointer" />
      <CompareIcon class="hoverable cursor-pointer" />
    </div>
    <img src="/img/products/combo.jpg" alt="" loading="lazy" width="486" height="152" class="mb-6 block" />
    <div class="text-2xl">Lga 700</div>
    <div class="text-sm font-light leading-4 mt-4 mr-32">Ноутбук MSI Modern 14 C5M-010 XRU, 14”, IPS, AMD Ryzen 5 5625U, 6-ядерный, 16ГБ DDR4</div>
    <div class="price-info">
      <div class="-mb-4">
        <div class="w-10">
          <ValetIcon />
        </div>
        <div class="font-sm">1 200 Br</div>
      </div>

      <div>
        <div class="w-10">
          <BankIcon />
        </div>
        <div class="text-2xl">1 600 Br</div>
        <div class="ml-auto flex gap-2.5 flex-wrap">
          <button class="btn leading-[50px] is-plain"><ConfiguratorIcon /> В конфигуратор</button>
          <button class="btn leading-[50px]"><CartIcon />В корзину</button>
        </div>
      </div>
    </div>
    <div class="info">
      <OkIcon />
      <PercentIcon />
    </div>

    <div class="tags">
      <div class="bg-[#F54D4D]">В рассрочку</div>
    </div>
  </div>
</template>
