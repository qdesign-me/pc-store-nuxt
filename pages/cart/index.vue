<template>
  <main class="container">
    <div class="breadcrumbs"><NuxtLink to="/">Главная </NuxtLink><span>Корзина</span></div>
    <div class="flex justify-between gap-6 items-start">
      <h1>Корзина</h1>
      <div v-if="hasItems" class="text-blue flex gap-6 text-sm underline underline-offset-4">
        <button class="flex items-center gap-2"><PrinterIcon />Распечатать список</button>
        <button class="flex items-center gap-2" @click="clear"><DeleteIcon />Очистить список</button>
      </div>
    </div>

    <div v-if="!hasItems" class="flex flex-col items-center justify-center">
      <CartIcon width="100" height="105" class="text-blue mb-6" />
      <div class="mb-2">В корзине пока ничего нет</div>
      <div class="opacity-50">Нажмите <CartIcon class="inline -mt-1" width="19" height="19" /> для добавления в корзину</div>
      <NuxtLink to="/catalog" class="btn is-large mt-10 xl:mb-20 min-w-[300px]">Перейти в каталог</NuxtLink>
    </div>
    <div v-else>
      <div class="text-[#E5A35B] text-sm font-medium mb-10">В корзине {{ pluralize(data?.data?.length, ['товар', 'товара', 'товаров']) }}</div>
      <div class="grid grid-cols-4 relative items-start gap-6">
        <div class="col-span-3">
          <ProductList :data="data.data">
            <template #controls="row">
              <Add2Favorites productID="row.item.productID" />
              <Add2Compare :productID="row.item.productID" />
              <RemoveButton @click="remove(row.item.productID)" />
            </template>
            <template #price="row">
              <Add2Cart :productID="row.item.productID" />
            </template>
          </ProductList>
        </div>
        <div class="sticky top-[100px] bg-[#E5A35B]/10 px-6 py-4 flex flex-col gap-4 text-sm">
          <div class="text-[24px] font-semibold text-black mb-4">Детали заказа:</div>
          <div class="flex justify-between gap-4">
            <div>Всего товаров:</div>
            <div>4</div>
          </div>
          <div class="flex justify-between gap-4">
            <div>Сумма заказа:</div>
            <div>4</div>
          </div>
          <div class="flex justify-between gap-4">
            <div>Способ получения:</div>
            <div>4</div>
          </div>
          <div class="flex justify-between gap-4">
            <div>Стоимость доставки:</div>
            <div>4</div>
          </div>

          {{ summary }}

          <div class="border-t-2 border-[#E5A35B]"></div>

          <div class="text-[18px] font-semibold text-black flex justify-between gap-4">
            <div>Итого к оплате:</div>
            <div>6400 Br</div>
          </div>

          <div class="mx-auto"><button class="btn min-w-[200px]">Оформить заказ</button></div>

          <div class="text-[12px] font-light text-center">
            Нажимая на кнопку «‎Оформить заказ», Вы соглашаетесь с
            <NuxtLink to="/privacy-and-terms" class="underline underline-offset-4">обработкой персональных данных</NuxtLink> и
            <NuxtLink to="/public-offer" class="underline underline-offset-4">Договором публичной оферты</NuxtLink>.
          </div>
        </div>
      </div>
    </div>
    <div>
      <h2>Данные получателя</h2>

      <Form :model="model">
        <div class="grid grid-cols-10 gap-4">
          <div class="col-span-6">
            <div class="grid grid-cols-6 gap-2">
              <div class="col-span-4">
                <div class="ir">
                  <div class="flex input-group">
                    <button class="text-center flex-1 w-10 text-xs leading-[38px] btn" :class="{ 'is-plain': model.who === 'business' }" @click.prevent="model.who = 'person'">
                      Частное лицо
                    </button>
                    <button class="text-center flex-1 w-10 text-xs leading-[38px] btn" :class="{ 'is-plain': model.who === 'person' }" @click.prevent="model.who = 'business'">
                      Юридическое лицо
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-span-2"></div>
              <template v-if="model.who === 'person'">
                <div class="col-span-4">
                  <FormItem name="name" :rules="[{ required: true }]">
                    <input type="text" class="input" placeholder="Укажите ваше имя и фамилию" v-model="model.name" />
                  </FormItem>
                </div>
                <div class="col-span-2"></div>
                <div class="col-span-2">
                  <FormItem name="phone" :rules="[{ required: true }]">
                    <input type="tel" class="input" placeholder="" v-model="model.phone" />
                  </FormItem>
                </div>
                <div class="col-span-4"></div>
                <div class="col-span-2">
                  <FormItem name="email" :rules="[{ email: true }]">
                    <input type="email" novalidate class="input" placeholder="Укажите ваш E-mail" v-model="model.email" />
                  </FormItem>
                </div>
                <div class="col-span-4"></div>

                <div class="col-span-6 mt-8">
                  <h2>Способ получения</h2>
                </div>

                <div class="col-span-2">
                  <div class="radio-card">
                    <label class="absolute inset-0">
                      <input type="radio" v-model="model.delivery" value="Самовывоз" />
                    </label>
                    <div class="text-black font-medium">Самовывоз</div>
                    <div>Бесплатно</div>
                  </div>
                </div>
                <div class="col-span-2">
                  <div class="radio-card">
                    <label class="absolute inset-0">
                      <input type="radio" v-model="model.delivery" value="Доставка в пределах МКАД" />
                    </label>
                    <div class="text-black font-medium">Доставка в пределах МКАД</div>
                    <div>Бесплатно при стоимости товара от 220 Br</div>
                    <div>При стоимости товара до 220 Br,стоимость доставки — 6 Br</div>
                  </div>
                </div>
                <div class="col-span-2">
                  <div class="radio-card">
                    <label class="absolute inset-0">
                      <input type="radio" v-model="model.delivery" value="Доставка в регионы РБ" />
                    </label>
                    <div class="text-black font-medium">Доставка в регионы РБ</div>
                    <div>Стоимость доставки — от 12 Br</div>
                  </div>
                </div>
                <template v-if="model.delivery !== 'Самовывоз'">
                  <div class="col-span-6 text-sm text-black mt-4">
                    Сроки доставки уточнит менеджер при подтверждении заказа.

                    <h2 class="mt-16">Адрес получателя</h2>
                  </div>
                  <div class="col-span-2">
                    <FormItem>
                      <input type="text" class="input" placeholder="Почтовый индекс" v-model="model.zip" />
                    </FormItem>
                  </div>
                  <div class="col-span-4"></div>
                  <div class="col-span-2">
                    <FormItem name="city" :rules="[{ required: true }]">
                      <input type="text" class="input" placeholder="Город" v-model="model.city" />
                    </FormItem>
                  </div>

                  <div class="col-span-2">
                    <FormItem name="street" :rules="[{ required: true }]">
                      <input type="text" class="input" placeholder="Улица" v-model="model.street" />
                    </FormItem>
                  </div>
                  <div class="col-span-2"></div>
                  <div>
                    <FormItem name="building" :rules="[{ required: true }]">
                      <input type="text" class="input" placeholder="Номер дома" v-model="model.building" />
                    </FormItem>
                  </div>
                  <div>
                    <FormItem>
                      <input type="text" class="input" placeholder="Корпус" v-model="model.block" />
                    </FormItem>
                  </div>
                  <div>
                    <FormItem name="apt" :rules="[{ required: true }]">
                      <input type="text" class="input" placeholder="Квартира" v-model="model.apt" />
                    </FormItem>
                  </div>
                </template>
                <div class="col-span-6 mt-6">
                  <h2>Способ оплаты</h2>
                </div>
                <div class="col-span-2">
                  <div class="radio-card">
                    <label class="absolute inset-0"> <input type="radio" id="Наличными" v-model="model.payment" value="Наличными" /> </label>
                    <div class="text-black font-medium">Наличными</div>
                    <div>В пункте самовывоза или курьеру при получении</div>
                  </div>
                </div>
                <div class="col-span-2">
                  <div class="radio-card">
                    <label class="absolute inset-0"> <input type="radio" id="Оплата банковской картой" v-model="model.payment" value="Оплата банковской картой" /> </label>
                    <div class="text-black font-medium">Оплата банковской картой</div>
                    <div>В пункте самовывоза или курьеру при получении</div>
                    <input type="radio" />
                  </div>
                </div>
                <div class="col-span-2">
                  <div class="radio-card">
                    <label class="absolute inset-0"> <input type="radio" v-model="model.payment" value="Оплата через ЕРИП" /> </label>
                    <div class="text-black font-medium">Оплата через ЕРИП</div>
                    <div>Менеджер сообщит реквизиты оплаты после подтверждения заказа</div>
                    <input type="radio" />
                    <img src="/img/info/erip.png" loading="lazy" width="125" height="40" alt="" />
                  </div>
                </div>
                <div class="col-span-2">
                  <div class="radio-card">
                    <label class="absolute inset-0"> <input type="radio" v-model="model.payment" value="Рассрочка" /> </label>
                    <div class="text-black font-medium">Рассрочка</div>
                    <div>Оплата картой рассрочки в пункте самовывоза или курьеру при получении</div>
                    <input type="radio" />
                    <div class="flex gap-2 card-logos">
                      <img src="/img/info/vtb.png" loading="lazy" width="64" height="40" alt="" class="h-[30px] w-auto" />
                      <img src="/img/info/halva.png" loading="lazy" width="64" height="40" alt="" class="h-[30px] w-auto" />
                      <img src="/img/info/magnit.png" loading="lazy" width="64" height="40" alt="" class="h-[30px] w-auto" />
                    </div>
                  </div>
                </div>
                <div class="col-span-2">
                  <div class="radio-card">
                    <label class="absolute inset-0">
                      <input type="radio" v-model="model.payment" value="Оплата в кредит" />
                    </label>
                    <div class="text-black font-medium">Оплата в кредит</div>
                    <div>Банки-партнёры:</div>
                    <input type="radio" />
                    <div class="flex flex-wrap gap-2 payment-logos">
                      <img src="/img/info/belarusb-logo.png" loading="lazy" width="175" height="25" alt="" />
                      <img src="/img/info/vtb-logo.png" loading="lazy" width="70" height="25" alt="" />
                    </div>
                  </div>
                </div>
                <div class="col-span-2"></div>
                <div class="col-span-6">
                  <h2 class="mt-20">Дополнительная информация</h2>
                </div>
                <div class="col-span-6">
                  <FormItem>
                    <textarea placeholder="Комментарий к заказу" id="" cols="30" rows="8" class="input"></textarea>
                  </FormItem>
                </div>
              </template>
              <template v-if="model.who === 'business'">
                <div class="col-span-4">
                  <FormItem name="company" :rules="[{ required: true }]">
                    <input type="text" class="input" placeholder="Укажите наименование организации" v-model="model.company" />
                  </FormItem>
                </div>
                <div class="col-span-2"></div>
                <div class="col-span-2">
                  <FormItem name="unp" :rules="[{ required: true }]">
                    <input type="text" class="input" placeholder="УНП" v-model="model.unp" />
                  </FormItem>
                </div>
                <div class="col-span-4"></div>

                <div class="col-span-2">
                  <FormItem name="account" :rules="[{ required: true }]">
                    <input type="text" class="input" placeholder="Р/с" v-model="model.account" />
                  </FormItem>
                </div>
                <div class="col-span-4"></div>
                <div class="col-span-2">
                  <FormItem name="bankaddress" :rules="[{ required: true }]">
                    <input type="text" class="input" placeholder="Адрес банка" v-model="model.bankaddress" />
                  </FormItem>
                </div>
                <div class="col-span-4"></div>
                <div class="col-span-2">
                  <FormItem name="bankbic" :rules="[{ required: true }]">
                    <input type="text" class="input" placeholder="БИК банка" v-model="model.bankbic" />
                  </FormItem>
                </div>
                <div class="col-span-4"></div>
                <div class="col-span-4">
                  <FormItem name="reason" :rules="[{ required: true }]">
                    <input type="text" class="input" placeholder="На каком основании заключает договор от имени организации" v-model="model.reason" />
                  </FormItem>
                </div>
                <div class="col-span-2"></div>
                <div class="col-span-4">
                  <FormItem name="fio" :rules="[{ required: true }]">
                    <input type="text" class="input" placeholder="ФИО того, в чьем лице действует организация" v-model="model.fio" />
                  </FormItem>
                </div>
                <div class="col-span-2"></div>

                <div class="col-span-2">
                  <FormItem name="urphone" :rules="[{ required: true }]">
                    <input type="tel" novalidate class="input" placeholder="+ 375 ( _ _ )  _ _ _  _ _  _ _ " v-model="model.urphone" />
                  </FormItem>
                </div>
                <div class="col-span-4"></div>
                <div class="col-span-2">
                  <FormItem name="uremail" :rules="[{ email: true }]">
                    <input type="email" novalidate class="input" placeholder="Контактный  E-mail" v-model="model.uremail" />
                  </FormItem>
                </div>
                <div class="col-span-4"></div>
              </template>
            </div>
          </div>
        </div>
        <button type="submit" class="btn">Оформить заказ</button>
      </Form>
    </div>
  </main>
</template>
<script setup>
const model = useState(() => ({
  who: 'person',
  delivery: 'Самовывоз',
  payment: 'Наличными',
}));
const { items, hasItems, remove, clear } = useCart();

const products = computed(() => Object.keys(items.value));

const { data } = await useFetch('/api/products', {
  method: 'POST',
  body: {
    sortby: 'popular',
    sortdir: 'desc',
    where: {
      'productID:in': products,
    },
  },
});

const summary = computed(() => {
  const total = {
    price: 0,
    items: 0,
  };
  console.log(items.value);
  data.value.data.forEach((item) => {
    console.log(item);
  });

  return total;
});

definePageMeta({
  layout: 'default',
});

const meta = {
  title: 'Корзина | Интернет-магазин Iven',
  description: 'Корзина товаров.',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
  robots: 'noindex',
});
</script>
