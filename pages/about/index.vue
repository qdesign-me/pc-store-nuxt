<template>
  <main class="text-sm text">
    <div class="box-lg">
      <div class="container">
        <div class="breadcrumbs"><NuxtLink to="/" class="">Главная </NuxtLink><span>О компании</span></div>

        <div class="flex flex-col xl:flex-row justify-between gap-10">
          <div class="flex-1 text-wrap">
            <h1>О компании</h1>
            <p>
              Компания ООО «Компьютеры Айвен» успешно работает на рынке компьютеров, компьютерных комплектующих и электроники с 1998 года. За это время мы зарекомендовали себя как
              надежный поставщик высококачественной техники в Беларуси. Наша команда профессионалов стремится удовлетворить потребности клиентов в области информационных
              технологий.
            </p>
            <p>Мы бесплатно предоставляем услуги по подбору компьютерной техники для дома и офиса, а также консультируем по оборудованию серверов и рабочих станций.</p>

            <p>На этой странице вы узнаете о преимуществах сотрудничества с нашей компанией и уникальных возможностях, которые мы предоставляем нашим клиентам.</p>
          </div>
          <div class="bg-blue/10 rounded flex-1 text-wrap py-10 px-5 xl:px-10 xl:-mt-10">
            <div class="h2">Реквизиты компании</div>

            <div class="text-xs leading-[1.5]">
              <p class="mb-8">
                ООО «Компьютеры Айвен»<br />
                220035, г. Минск, ул. Репина, 4, пом.475-2<br />
                УНП 192776859<br />
                р/с BY59ALFA30122A02330010270000 в ЗАО "Альфа-Банк", код ALFABY2X г. Минск, ул. Сурганова, 43-47<br />
                тел. <a href="tel:+375173783627">+375-17-378-36-27</a>
              </p>

              <div class="flex flex-col gap-3 underline"><CompanyLinks /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="container">
        <div class="grid grid-cols-4 md:grid-cols-5 gap-6 xl:gap-y-12">
          <div class="col-span-4 md:col-span-2 row-span-2 xl:-mt-6">
            <div class="h2">Наши производители</div>
            <p>
              ООО «Компьютеры Айвен» предлагает широкий ассортимент компьютерных комплектующих, включая процессоры, материнские платы, видеокарты, оперативную память, жесткие диски
              и многое другое. Мы тщательно выбираем поставщиков и предлагаем только проверенные бренды, чтобы обеспечить нашим клиентам надежность и высокое качество продукции.
            </p>
          </div>

          <NuxtLink
            class="flex justify-center items-center"
            :to="`/brend/${item}`"
            v-for="item in [
              'sonic',
              'palit',
              'bequiet',
              'seagate',
              'asus',
              'kingston',
              'gigabyte',
              'msi',
              'lenovo',
              'deepcool',
              'intel',
              'aerocool',
              'zalman',
              'amd',
              'samsung',
              'logitech',
            ]"
            :key="item"
          >
            <img :src="`/img/logos/${item}.png`" alt="" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="bg-blue py-10 xl:py-24 text-white">
      <div class="container">
        <div class="h2">Преимущества IVEN</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 xl:gap-y-12 xl:mt-20">
          <div
            v-for="(item, index) in [
              'Улучшенная логистика и техническое оснащение компании',
              'Новые импортеры наших товаров',
              'Трепетное отношение к каждому клиенту',
              'Собственное производство компьютеров со всеми документами!',
              'Собственный сервисный центр',
              'Гибкий подход к ценам и скидкам',
              'Качественная и надёжная техника с гарантией',
              'Огромный ассортимент комплектующих и периферии',
              'Высокий уровень обслуживания',
              'Любые конфигурации компьютеров, серверов - для нас не проблема!',
            ]"
            :key="item"
            class="relative flex gap-6 items-center xl:items-start"
          >
            <div class="w-12 h-12 shrink-0"><img :src="`/img/about/advantages/${index + 1}.svg`" alt="" /></div>
            <div>{{ item }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-10 box-stick">
      <div class="container">
        <div class="grid xl:grid-cols-2 items-start gap-10">
          <div class="text-wrap box-stick-wrap">
            <div class="in">
              <div class="h2">Для специалистов</div>
              <p>
                Мы предлагаем широкий выбор готовых компьютеров различных конфигураций. Наши специалисты готовы помочь вам подобрать оптимальное решение, учитывая ваши требования и
                бюджет. Мы гарантируем, что каждый компьютер, который вы приобретете у нас, будет отличаться высокой производительностью и надежностью.
              </p>

              <p>
                Мы постоянно расширяем ассортимент предлагаемой продукции, следуя за тенденциями рынка. Мы гордимся нашей репутацией и стремимся удовлетворить потребности самых
                требовательных клиентов.
              </p>
              <NuxtLink to="/catalog" class="btn">Посмотреть ассортимент</NuxtLink>
            </div>
          </div>

          <div>
            <img class="box-stick-img" src="/img/about/1.png" alt="" width="613" height="385" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[#E5A35B]/10 py-10 box-stick">
      <div class="container">
        <div class="grid xl:grid-cols-2 items-start gap-10">
          <div class="text-wrap box-stick-wrap">
            <div class="in">
              <div class="h2">Компьютеры для дома и офиса</div>
              <p>
                Наша компания уделяет особое внимание обслуживанию клиентов. Мы стремимся предоставить максимально удобные условия покупки и оперативно отвечаем на любые вопросы.
              </p>

              <p>Мы всегда готовы помочь вам с выбором, консультацией по установке и настройке, а также предоставить гарантийное обслуживание в случае необходимости.</p>

              <NuxtLink to="/catalog" class="btn">Перейти в каталог</NuxtLink>
            </div>
          </div>
          <div>
            <img class="box-stick-img xl:-mb-28" src="/img/about/2.png" alt="" width="648" height="578" />
          </div>
        </div>
      </div>
    </div>
    <div class="py-10">
      <div class="container">
        <div class="text-wrap">
          <div class="h2">Гарантийное обслуживание</div>
          <p>
            Когда вы обращаетесь к нам, вы можете быть уверены, что получите не только качественные товары, но и высокий уровень сервиса. Мы ценим каждого клиента и стремимся
            установить с ним долгосрочные и взаимовыгодные партнерские отношения.
          </p>
        </div>

        <div class="mt-10 xl:mt-20">
          <div v-for="item in ['Программа лояльности', 'Профессиональные сотрудники', 'Ускоренный обмен либо возврат комплектующих']"></div>
        </div>

        <div class="flex flex-wrap gap-y-6 gap-x-20">
          <div
            class="flex items-center gap-6 max-w-[380px] text-[20px] underline"
            v-for="(item, index) in ['Программа лояльности', 'Профессиональные сотрудники', 'Ускоренный обмен либо возврат комплектующих']"
          >
            <img :src="`/img/about/service/${index + 1}.svg`" alt="" />
            <div class="mt-2">{{ item }}</div>
          </div>
        </div>

        <NuxtLink class="btn mt-10 lg:mt-20" to="/warranty#warranty">Обратиться по гарантии</NuxtLink>
      </div>
    </div>

    <div class="py-10 box-stick">
      <div class="container">
        <div class="grid xl:grid-cols-2 items-start gap-10">
          <div class="text-wrap box-stick-wrap">
            <div class="in">
              <div class="h2">Справочная служба</div>
              <p>
                Если у вас возникли вопросы или вам требуется консультация, не стесняйтесь обращаться к нам. Наша компетентная команда с удовольствием поможет вам в выборе и
                ответит на все ваши вопросы.
              </p>
            </div>
          </div>
          <div>
            <img class="box-stick-img" src="/img/about/3.png" width="457" height="454" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="container">
        <div class="h2">Способы оплаты</div>

        <div class="flex gap-2 card-logos">
          <img src="/img/info/vtb.png" loading="lazy" width="64" height="40" alt="" />
          <img src="/img/info/halva.png" loading="lazy" width="64" height="40" alt="" />
          <img src="/img/info/magnit.png" loading="lazy" width="64" height="40" alt="" /><img src="/img/info/erip.png" loading="lazy" width="125" height="40" alt="" />
        </div>

        <p class="my-6">
          Наличный расчет и расчет банковской картой при получении.<br />
          Возможно оформление кредита в банках-партнёрах:
        </p>

        <div class="flex flex-wrap gap-2 payment-logos">
          <img src="/img/info/belarusb-logo.png" loading="lazy" width="175" height="25" alt="" />
          <img src="/img/info/vtb-logo.png" loading="lazy" width="70" height="25" alt="" />
        </div>

        <NuxtLink to="/payment#credit"
          ><button class="btn mt-20"><CalcIcon /> Калькулятор рассрочки</button></NuxtLink
        >
      </div>
    </div>
  </main>
</template>
<script setup>
definePageMeta({
  layout: 'default',
});

const meta = {
  title: 'О компании | Интернет-магазин Iven',
  description: 'Iven успешно работает в сфере компьютеров и комплектующих для ПК с 1998 года. Доставка по Беларуси.',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
});
</script>
