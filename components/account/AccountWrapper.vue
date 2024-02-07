<template>
  <div class="container mt-8">
    <div class="flex gap-8">
      <div class="w-[296px] rounded-[5px]" style="background: rgba(0, 179, 215, 0.14)">
        <div class="pt-[30px] pb-[10px]">
          <div class="rounded-full bg-[#00B3D7] text-white w-[80px] h-[80px] mx-auto flex items-center justify-center text-[40px] font-medium">N</div>
        </div>
        <div class="text-sm font-medium text-center mb-5">
          <div class="text-[#000]">Имя пользователя</div>
          <div class="text-[#7C7C7C]">gmail@gmail.com</div>
        </div>
        <ul class="account-menu">
          <li>
            <NuxtLink to="/account/orders"><OrdersIcon />Мои заказы</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/account/saved"> <FavoritesIcon /> Сохранённые товары</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/account/pcconfig"><PCConfigIcon /> Конфигурации ПК</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/account/reviews"><ReviewsIcon />Мои отзывы</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/account/contacts"><UserIcon />Мои контакты</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/account/org"><BuildingIcon />Реквизиты организации</NuxtLink>
          </li>
        </ul>
        <div class="text-center">
          <button class="mx-auto my-[50px] inline-block text-sm text-[#00B3D7] font-medium">Выход</button>
        </div>
      </div>
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>
