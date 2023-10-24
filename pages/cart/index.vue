<template>
  <main class="container mt-[50px] sm:mt-[110px]" v-if="mode === 'thankyou'">
    <div class="flex justify-center align-center flex-col text-center">
      <h2>Ваш заказ принят!</h2>
      <p class="text-sm max-w-[375px] mx-auto">Менеджер свяжется с Вами в ближайшее время для подтверждения заказа по указанным контактам.</p>
    </div>
  </main>
  <main class="container" v-else>
    <div class="breadcrumbs"><NuxtLink to="/">Главная </NuxtLink><span>Корзина</span></div>
    <div class="flex justify-between gap-6 items-start">
      <h1>Корзина</h1>
      <div v-if="hasItems" class="text-blue flex gap-6 text-sm underline underline-offset-4">
        <button class="items-center gap-2 hidden md:flex" @click="onPrint"><PrinterIcon />Распечатать список</button>
        <button class="flex items-center gap-2" @click="clear"><DeleteIcon /><span class="hidden sm:block">Очистить список</span></button>
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
      <div class="grid grid-cols-1 lg:grid-cols-4 relative items-start gap-6">
        <div class="lg:col-span-3 order-area">
          <ProductList :data="data?.data" class="mb-10">
            <template #controls="row">
              <Add2Favorites :productID="row.item.productID" />
              <Add2Compare :productID="row.item.productID" />
              <RemoveButton @click="onRemove(row.item.productID)" />
            </template>
            <template #price="row">
              <Add2Cart :productID="row.item.productID" @qty="(qty) => onQty(row.item.productID, qty)" />
            </template>
          </ProductList>
          <div>
            <h2>Данные получателя</h2>

            <div>
              <div class="ir">
                <div class="flex input-group">
                  <button class="text-center flex-1 w-10 text-xs leading-[38px] btn" :class="{ 'is-plain': who === 'business' }" @click.prevent="who = 'person'">
                    Частное лицо
                  </button>
                  <button class="text-center flex-1 w-10 text-xs leading-[38px] btn" :class="{ 'is-plain': who === 'person' }" @click.prevent="who = 'business'">
                    Юридическое лицо
                  </button>
                </div>
              </div>
              <Form :model="person" :onFinish="onFinish" :class="who === 'person' ? 'block' : 'hidden'">
                <div class="grid grid-cols-6 gap-2">
                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="name" :rules="[{ required: true }]">
                      <input name="name" type="text" class="input" placeholder="Укажите ваше имя и фамилию" v-model="person.name" />
                    </FormItem>
                  </div>

                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="phone" :rules="[{ required: true }]">
                      <input name="phone" type="tel" class="input" placeholder="+375 (__) ___-__-__" v-model="person.phone" v-maska data-maska="+375 (##) ###-##-##" />
                    </FormItem>
                  </div>

                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="email" :rules="[{ email: true }]">
                      <input name="email" type="email" class="input" placeholder="Укажите ваш E-mail" v-model="person.email" />
                    </FormItem>
                  </div>

                  <div class="col-span-6 mt-8">
                    <h2>Способ получения</h2>
                  </div>

                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0">
                        <input name="delivery" type="radio" v-model="person.delivery" value="Самовывоз" />
                      </label>
                      <div class="text-black font-medium">Самовывоз</div>
                      <div>Бесплатно</div>
                    </div>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0">
                        <input name="delivery" type="radio" v-model="person.delivery" value="Доставка в пределах МКАД" />
                      </label>
                      <div class="text-black font-medium">Доставка в пределах МКАД</div>
                      <div>Бесплатно при стоимости товара от <span class="whitespace-nowrap">220 Br</span></div>
                      <div>При стоимости товара до <span class="whitespace-nowrap">220 Br</span>, стоимость доставки — <span class="whitespace-nowrap">6 Br</span></div>
                    </div>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0">
                        <input name="delivery" type="radio" v-model="person.delivery" value="Доставка в регионы РБ" />
                      </label>
                      <div class="text-black font-medium">Доставка в регионы РБ</div>
                      <div>Стоимость доставки — от 12 Br</div>
                    </div>
                  </div>
                  <template v-if="person.delivery !== 'Самовывоз'">
                    <div class="col-span-6 text-sm text-black mt-4">
                      Сроки доставки уточнит менеджер при подтверждении заказа.

                      <h2 class="mt-8">Адрес получателя</h2>
                    </div>

                    <div class="col-span-6 lg:col-span-2">
                      <FormItem name="city" :rules="[{ required: true }]">
                        <input name="city" type="text" class="input" placeholder="Город" v-model="person.city" />
                      </FormItem>
                    </div>

                    <div class="col-span-6 lg:col-span-2">
                      <FormItem name="street" :rules="[{ required: true }]">
                        <input name="street" type="text" class="input" placeholder="Улица" v-model="person.street" />
                      </FormItem>
                    </div>

                    <div class="col-span-6 lg:col-span-2">
                      <FormItem name="building" :rules="[{ required: true }]">
                        <input name="building" type="text" class="input" placeholder="Номер дома" v-model="person.building" />
                      </FormItem>
                    </div>
                    <div class="col-span-6 lg:col-span-2">
                      <FormItem>
                        <input name="block" type="text" class="input" placeholder="Корпус" v-model="person.block" />
                      </FormItem>
                    </div>
                    <div class="col-span-6 lg:col-span-2">
                      <FormItem name="apt" :rules="[{ required: true }]">
                        <input name="apt" type="text" class="input" placeholder="Квартира" v-model="person.apt" />
                      </FormItem>
                    </div>
                    <div class="col-span-6 lg:col-span-2">
                      <FormItem>
                        <input name="zip" type="text" class="input" placeholder="Почтовый индекс" v-model="person.zip" />
                      </FormItem>
                    </div>
                  </template>
                  <div class="col-span-6 mt-14 sm:mt-16">
                    <h2>Способ оплаты</h2>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0"> <input type="radio" name="payment" v-model="person.payment" value="Наличными" /> </label>
                      <div class="text-black font-medium">Наличными</div>
                      <div>В пункте самовывоза или курьеру при получении</div>
                    </div>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0"> <input type="radio" name="payment" v-model="person.payment" value="Оплата банковской картой" /> </label>
                      <div class="text-black font-medium">Оплата банковской картой</div>
                      <div>В пункте самовывоза или курьеру при получении</div>
                    </div>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0"> <input type="radio" name="payment" v-model="person.payment" value="Оплата через ЕРИП" /> </label>
                      <div class="text-black font-medium">Оплата через ЕРИП</div>
                      <div>Менеджер сообщит реквизиты оплаты после подтверждения заказа</div>
                      <img src="/img/info/erip.png" loading="lazy" width="125" height="40" alt="" />
                    </div>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0"> <input type="radio" name="payment" v-model="person.payment" value="Рассрочка" /> </label>
                      <div class="text-black font-medium">Рассрочка</div>
                      <div>Оплата картой рассрочки в пункте самовывоза или курьеру при получении</div>
                      <div class="flex gap-2 card-logos">
                        <img src="/img/info/vtb.png" loading="lazy" width="64" height="40" alt="ВТБ" class="h-[30px] w-auto" />
                        <img src="/img/info/halva.png" loading="lazy" width="64" height="40" alt="Халва" class="h-[30px] w-auto" />
                        <img src="/img/info/magnit.png" loading="lazy" width="64" height="40" alt="Магнит" class="h-[30px] w-auto" />
                      </div>
                    </div>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0">
                        <input type="radio" v-model="person.payment" name="payment" value="Оплата в кредит" />
                      </label>
                      <div class="text-black font-medium">Оплата в кредит</div>
                      <div>Банки-партнёры:</div>
                      <div class="flex flex-wrap gap-2 payment-logos">
                        <img src="/img/info/belarusb-logo.png" loading="lazy" width="175" height="25" alt="Беларусбанк" />
                        <img src="/img/info/vtb-logo.png" loading="lazy" width="70" height="25" alt="ВТБ" />
                      </div>
                    </div>
                  </div>
                  <div class="col-span-6 lg:col-span-2"></div>
                  <div class="col-span-6 mt-14 sm:mt-16">
                    <h2>Дополнительная информация</h2>
                  </div>
                  <div class="col-span-6">
                    <FormItem>
                      <textarea placeholder="Комментарий к заказу" name="comment" v-model="person.comment" cols="30" rows="8" class="input"></textarea>
                    </FormItem>
                  </div>
                </div>
                <button type="submit" class="btn hidden lg:inline-block">Оформить заказ</button>
              </Form>

              <Form :model="ur" :onFinish="onFinish" :class="who === 'business' ? 'block' : 'hidden'">
                <div class="grid grid-cols-6 gap-2">
                  <div class="col-span-6">
                    <FormItem name="name" :rules="[{ required: true }]">
                      <input name="name" type="text" class="input" placeholder="Укажите наименование организации" v-model="ur.name" />
                    </FormItem>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="unp" :rules="[{ required: true }]">
                      <input name="unp" type="text" class="input" placeholder="УНП" v-model="ur.unp" />
                    </FormItem>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="account" :rules="[{ required: true }]">
                      <input name="account" type="text" class="input" placeholder="Р/с" v-model="ur.account" />
                    </FormItem>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="bankaddress" :rules="[{ required: true }]">
                      <input name="bankaddress" type="text" class="input" placeholder="Адрес банка" v-model="ur.bankaddress" />
                    </FormItem>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="bankbic" :rules="[{ required: true }]">
                      <input name="bankbic" type="text" class="input" placeholder="БИК банка" v-model="ur.bankbic" />
                    </FormItem>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="reason" :rules="[{ required: true }]">
                      <input name="reason" type="text" class="input" placeholder="На каком основании заключает договор от имени организации" v-model="ur.reason" />
                    </FormItem>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="fio" :rules="[{ required: true }]">
                      <input name="fio" type="text" class="input" placeholder="ФИО того, в чьем лице действует организация" v-model="ur.fio" />
                    </FormItem>
                  </div>

                  <div class="col-span-6 lg:col-span-3">
                    <FormItem name="phone" :rules="[{ required: true }]">
                      <input name="phone" type="tel" placeholder="+375 (__) ___-__-__" class="input" v-model="ur.phone" v-maska data-maska="+375 (##) ###-##-##" />
                    </FormItem>
                  </div>
                  <div class="col-span-6 lg:col-span-3">
                    <FormItem name="email" :rules="[{ email: true }]">
                      <input name="email" type="email" class="input" placeholder="Контактный  E-mail" v-model="ur.email" />
                    </FormItem>
                  </div>

                  <div class="col-span-6 mt-8">
                    <h2>Способ получения</h2>
                  </div>

                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0">
                        <input name="delivery" type="radio" v-model="ur.delivery" value="Самовывоз" />
                      </label>
                      <div class="text-black font-medium">Самовывоз</div>
                      <div>Бесплатно</div>
                    </div>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0">
                        <input name="delivery" type="radio" v-model="ur.delivery" value="Доставка в пределах МКАД" />
                      </label>
                      <div class="text-black font-medium">Доставка в пределах МКАД</div>
                      <div>Бесплатно при стоимости товара от <span class="whitespace-nowrap">220 Br</span></div>
                      <div>При стоимости товара до <span class="whitespace-nowrap">220 Br</span>, стоимость доставки — <span class="whitespace-nowrap">6 Br</span></div>
                    </div>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0">
                        <input name="delivery" type="radio" v-model="ur.delivery" value="Доставка в регионы РБ" />
                      </label>
                      <div class="text-black font-medium">Доставка в регионы РБ</div>
                      <div>Стоимость доставки — от 12 Br</div>
                    </div>
                  </div>
                  <template v-if="ur.delivery !== 'Самовывоз'">
                    <div class="col-span-6 text-sm text-black mt-4">
                      Сроки доставки уточнит менеджер при подтверждении заказа.

                      <h2 class="mt-8">Адрес получателя</h2>
                    </div>

                    <div class="col-span-6 lg:col-span-2">
                      <FormItem name="city" :rules="[{ required: true }]">
                        <input name="city" type="text" class="input" placeholder="Город" v-model="ur.city" />
                      </FormItem>
                    </div>

                    <div class="col-span-6 lg:col-span-2">
                      <FormItem name="street" :rules="[{ required: true }]">
                        <input name="street" type="text" class="input" placeholder="Улица" v-model="ur.street" />
                      </FormItem>
                    </div>

                    <div class="col-span-6 lg:col-span-2">
                      <FormItem name="building" :rules="[{ required: true }]">
                        <input name="building" type="text" class="input" placeholder="Номер дома" v-model="ur.building" />
                      </FormItem>
                    </div>
                    <div class="col-span-6 lg:col-span-2">
                      <FormItem>
                        <input name="block" type="text" class="input" placeholder="Корпус" v-model="ur.block" />
                      </FormItem>
                    </div>
                    <div class="col-span-6 lg:col-span-2">
                      <FormItem name="apt" :rules="[{ required: true }]">
                        <input name="apt" type="text" class="input" placeholder="Квартира" v-model="ur.apt" />
                      </FormItem>
                    </div>
                    <div class="col-span-6 lg:col-span-2">
                      <FormItem>
                        <input name="zip" type="text" class="input" placeholder="Почтовый индекс" v-model="ur.zip" />
                      </FormItem>
                    </div>
                  </template>

                  <div class="col-span-6 mt-14 sm:mt-16">
                    <h2>Дополнительная информация</h2>
                  </div>
                  <div class="col-span-6">
                    <FormItem>
                      <textarea placeholder="Комментарий к заказу" name="comment" v-model="ur.comment" cols="30" rows="8" class="input"></textarea>
                    </FormItem>
                  </div>
                </div>
                <button type="submit" class="btn lg:inline-block">Оформить заказ</button>
              </Form>
            </div>
          </div>
        </div>
        <div class="cart-summary">
          <div class="text-[24px] font-semibold text-black mb-4">Детали заказа:</div>

          <div class="flex justify-between gap-4">
            <div>Всего товаров:</div>
            <div>{{ summary.qty }}</div>
          </div>
          <div class="flex justify-between gap-4">
            <div>Сумма заказа:</div>
            <div>{{ price(summary.price) }}</div>
          </div>
          <div class="flex justify-between gap-4">
            <div>Способ получения:</div>
            <div>{{ summary.delivery }}</div>
          </div>
          <div class="flex justify-between gap-4">
            <div>Стоимость доставки:</div>
            <div>{{ price(summary.deliveryPrice) }}</div>
          </div>

          <div class="border-t-2 border-[#E5A35B]"></div>

          <div class="text-[18px] font-semibold text-black flex justify-between gap-4">
            <div>Итого к оплате:</div>
            <div>{{ price(summary.total) }}</div>
          </div>

          <button class="btn w-full sm:max-w-[200px] sm:mx-auto" @click="onOrder">Оформить заказ</button>

          <div class="text-[12px] font-light text-center">
            Нажимая на кнопку «‎Оформить заказ», Вы соглашаетесь с
            <NuxtLink to="/privacy-and-terms" class="underline underline-offset-4">обработкой персональных данных</NuxtLink> и
            <NuxtLink to="/public-offer" class="underline underline-offset-4">Договором публичной оферты</NuxtLink>.
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
const router = useRouter();
const who = ref('person');
const mode = ref('cart');
const person = useState(() => ({
  delivery: 'Самовывоз',
  payment: 'Наличными',
}));

const ur = useState(() => ({
  delivery: 'Самовывоз',
  payment: 'Банковский перевод',
}));

const { add: add2favorites } = useFavorites();
const { items, hasItems, remove, clear } = useCart();

const { data } = await useFetch('/api/products/cart', {
  method: 'POST',
  body: {
    sortby: 'popular',
    sortdir: 'desc',
    items: items,
  },
});

const onPrint = () => router.push('/print/cart');

const onFinish = async (info) => {
  const cart = data.value;
  const total = summary.value;

  await $fetch('/api/orders/new', {
    method: 'POST',
    body: {
      info,
      cart,
      total,
    },
  });
  mode.value = 'thankyou';
  clear();
  person.value = {
    delivery: 'Самовывоз',
    payment: 'Наличными',
  };

  ur.value = {
    delivery: 'Самовывоз',
    payment: 'Банковский перевод',
  };
};

const onRemove = (id) => {
  add2favorites(id);
  remove(id);
};

const onQty = (productID, qty) => {
  if (qty === 0) onRemove(productID);
};

const onOrder = () => {
  const form = document.querySelector(`.order-area form.block button[type="submit"]`);
  form.click();
};

const summary = computed(() => {
  const price = data.value.total?.price;
  const delivery = person.value.delivery;
  let deliveryPrice = 0;
  if (delivery === 'Доставка в пределах МКАД') {
    if (price < 220) deliveryPrice = 6;
  }
  if (delivery === 'Доставка в регионы РБ') {
    deliveryPrice = 12;
  }
  const total = price + deliveryPrice;
  return {
    qty: data.value.total?.qty,
    price,
    delivery,
    deliveryPrice,
    total,
  };
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
