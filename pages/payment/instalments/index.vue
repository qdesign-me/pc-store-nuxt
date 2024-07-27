<template>
  <main class="text-sm text">
    <div class="box">
      <div class="container">
        <div class="breadcrumbs"><NuxtLink to="/" class="">Главная </NuxtLink> <NuxtLink to="/payment" class="">Оплата </NuxtLink> <span>Рассрочка</span></div>

        <div class="box box-scroll2 pt-10" id="installments">
          <h1>Оплата картами рассрочки</h1>
          <p class="mb-6 -mt-1">Принимаем к оплате карты рассрочки:</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <NuxtLink to="https://cherepaha.vtb.by/" target="_blank" class="card h-auto border md:pt-6 md:pb-8 md:px-10">
              <img src="/img/info/vtb-lg.png" loading="lazy" width="216" height="134" class="mb-4 w-full max-w-[300px] mx-auto" alt="" />
              <div class="text-lg font-medium">
                Карта рассрочки<br />
                «Черепаха» от ВТБ
              </div>
              <div class="border border-solid border-[#00B3D7] my-6 lg:-mx-4"></div>

              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-3">
                  <div class="w-[40px]"><CoinsIcon /></div>
                  Сумма от <strong>5 000 Br</strong>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-[40px]">
                    <CalcOutlinedIcon />
                  </div>
                  <div>Срок кредитования: <br /><strong> до 12 месяцев</strong></div>
                </div>
              </div>
            </NuxtLink>
            <NuxtLink to="https://belarusbank.by/ru/fizicheskim_licam/cards/international/32493" target="_blank" class="card h-auto border md:pt-6 md:pb-8 md:px-10">
              <img src="/img/info/magnit-lg.png" loading="lazy" width="216" height="134" class="mb-4 w-full max-w-[300px] mx-auto" alt="" />
              <div class="text-lg font-medium">Карта рассрочки<br />«Магнит» Беларусбанка</div>
              <div class="border border-solid border-[#00B3D7] my-6 lg:-mx-4"></div>

              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-3">
                  <div class="w-[40px]"><CoinsIcon /></div>
                  Сумма от <strong>20 000 Br</strong>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-[40px]">
                    <CalcOutlinedIcon />
                  </div>
                  <div>Срок кредитования: <br /><strong> от 3 до 12 месяцев</strong></div>
                </div>
              </div>
            </NuxtLink>
            <NuxtLink to="https://www.halva.by/" target="_blank" class="card h-auto border md:pt-6 md:pb-8 md:px-10">
              <img src="/img/info/halva-lg.png" loading="lazy" width="216" height="134" class="mb-4 w-full max-w-[300px] mx-auto" alt="" />
              <div class="text-lg font-medium">
                Карта рассрочки<br />
                «Халва» от МТБанк
              </div>
              <div class="border border-solid border-[#00B3D7] my-6 lg:-mx-4"></div>

              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-3">
                  <div class="w-[40px]"><CoinsIcon /></div>
                  Сумма от <strong>25 000 Br</strong>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-[40px]">
                    <CalcOutlinedIcon />
                  </div>
                  <div>Срок кредитования: <br /><strong> до 14 месяцев</strong></div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
definePageMeta({
  layout: 'default',
});

const meta = {
  title: 'Оплата картами рассрочки | Интернет-магазин Iven',
  description: 'Оплата картами рассрочки «Черепаха» от ВТБ, «Магнит» Беларусбанка, «Халва» от МТБанк.',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
});
</script>
