<template>
  <main class="container">
    <div class="breadcrumbs"><NuxtLink to="/">Главная </NuxtLink><span>Корзина</span></div>
    <div class="flex justify-between gap-6 items-start">
      <h1>Корзина</h1>
      <div v-if="total" class="text-blue flex gap-6 text-sm underline underline-offset-4">
        <button class="items-center gap-2 hidden md:flex" @click="onPrint"><PrinterIcon />Распечатать список</button>
        <button class="flex items-center gap-2" @click="handleClear"><DeleteIcon /><span class="hidden sm:block">Очистить список</span></button>
      </div>
    </div>

    <div v-if="!total" class="flex flex-col items-center justify-center">
      <CartIcon width="100" height="105" class="text-blue mb-6" />
      <div class="mb-2">В корзине пока ничего нет</div>
      <div class="opacity-50">Нажмите <CartIcon class="inline -mt-1" width="19" height="19" /> для добавления в корзину</div>
      <NuxtLink to="/catalog" class="btn is-large mt-10 xl:mb-20 min-w-[300px]">Перейти в каталог</NuxtLink>
    </div>
    <div v-else>
      <div class="text-[#E5A35B] text-sm font-medium mb-10">В корзине {{ pluralize(summary.qty, ['товар', 'товара', 'товаров']) }}</div>
      <div class="grid grid-cols-1 lg:grid-cols-4 relative items-start gap-6">
        <div class="lg:col-span-3 order-area">
          <ProductList :data="summary.data" class="mb-10">
            <template #controls="row">
              <Add2Favorites :productID="row.item.productID" />
              <Add2Compare :productID="row.item.productID" />
              <RemoveButton @click="onRemove(row.item.productID)" />
            </template>
            <template #price="row"> <Add2CartSimple :items="items" :add="add" :productID="row.item.productID" @qty="(qty) => onQty(row.item.productID, qty)" /> </template>
          </ProductList>
          <div>
            <h2>Данные получателя</h2>

            <div>
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
              <Form :model="model.person" :onFinish="onFinish" :class="model.who === 'person' ? 'block' : 'hidden'">
                <div class="grid grid-cols-6 gap-2">
                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="name">
                      <input name="name" type="text" class="input" placeholder="Укажите ваше имя и фамилию" v-model="model.person.name" />
                    </FormItem>
                  </div>

                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="phone" :rules="[{ required: true }]">
                      <input name="phone" type="tel" class="input" placeholder="+375 (__) ___-__-__" v-model="model.person.phone" v-maska data-maska="+375 (##) ###-##-##" />
                    </FormItem>
                  </div>

                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="email" :rules="[{ email: true }]">
                      <input name="email" type="email" class="input" placeholder="Укажите ваш E-mail" v-model="model.person.email" />
                    </FormItem>
                  </div>

                  <div class="col-span-6 mt-8">
                    <h2>Способ получения</h2>
                  </div>

                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0">
                        <input name="delivery" type="radio" v-model="model.person.delivery" value="Самовывоз" />
                      </label>
                      <div class="text-black font-medium">Самовывоз</div>
                      <div>Бесплатно</div>
                    </div>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0">
                        <input name="delivery" type="radio" v-model="model.person.delivery" value="Доставка в пределах МКАД" />
                      </label>
                      <div class="text-black font-medium">Доставка в пределах МКАД</div>
                      <div>Бесплатно при стоимости товара от <span class="whitespace-nowrap">300 Br</span></div>
                      <div>При стоимости товара до <span class="whitespace-nowrap">300 Br</span>, стоимость доставки — <span class="whitespace-nowrap">6 Br</span></div>
                    </div>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0">
                        <input name="delivery" type="radio" v-model="model.person.delivery" value="Доставка по Беларуси" />
                      </label>
                      <div class="text-black font-medium">Доставка по Беларуси</div>
                      <div>Стоимость доставки — от 12 Br</div>
                    </div>
                  </div>
                  <template v-if="model.person.delivery !== 'Самовывоз'">
                    <div class="col-span-6 text-sm text-black mt-4">
                      Сроки доставки уточнит менеджер при подтверждении заказа.

                      <h2 class="mt-8">Адрес получателя</h2>
                    </div>

                    <div class="col-span-6 lg:col-span-2">
                      <FormItem name="city" :rules="[{ required: true }]">
                        <input name="city" type="text" class="input" placeholder="Город" v-model="model.person.city" />
                      </FormItem>
                    </div>

                    <div class="col-span-6 lg:col-span-2">
                      <FormItem name="street" :rules="[{ required: true }]">
                        <input name="street" type="text" class="input" placeholder="Улица" v-model="model.person.street" />
                      </FormItem>
                    </div>

                    <div class="col-span-6 lg:col-span-2">
                      <FormItem name="building" :rules="[{ required: true }]">
                        <input name="building" type="text" class="input" placeholder="Номер дома" v-model="model.person.building" />
                      </FormItem>
                    </div>
                    <div class="col-span-6 lg:col-span-2">
                      <FormItem>
                        <input name="block" type="text" class="input" placeholder="Корпус" v-model="model.person.block" />
                      </FormItem>
                    </div>
                    <div class="col-span-6 lg:col-span-2">
                      <FormItem name="apt" :rules="[{ required: true }]">
                        <input name="apt" type="text" class="input" placeholder="Квартира" v-model="model.person.apt" />
                      </FormItem>
                    </div>
                    <div class="col-span-6 lg:col-span-2">
                      <FormItem>
                        <input name="zip" type="text" class="input" placeholder="Почтовый индекс" v-model="model.person.zip" />
                      </FormItem>
                    </div>
                  </template>
                  <div class="col-span-6 mt-14 sm:mt-16">
                    <h2>Способ оплаты</h2>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0"> <input type="radio" name="payment" v-model="model.person.payment" value="Наличными" /> </label>
                      <div class="text-black font-medium">Наличными</div>
                      <div>В пункте самовывоза или курьеру при получении</div>
                    </div>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0"> <input type="radio" name="payment" v-model="model.person.payment" value="Оплата банковской картой" /> </label>
                      <div class="text-black font-medium">Оплата банковской картой</div>
                      <div>В пункте самовывоза или курьеру при получении</div>
                    </div>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0"> <input type="radio" name="payment" v-model="model.person.payment" value="Оплата через ЕРИП" /> </label>
                      <div class="text-black font-medium">Оплата через ЕРИП</div>
                      <div>Менеджер сообщит реквизиты оплаты после подтверждения заказа</div>
                      <img src="/img/info/erip.png" loading="lazy" width="125" height="40" alt="" />
                    </div>
                  </div>
                  <div class="col-span-6 lg:col-span-2" v-if="summary.total > 500">
                    <div class="radio-card">
                      <label class="absolute inset-0"> <input type="radio" name="payment" v-model="model.person.payment" value="Рассрочка" /> </label>
                      <div class="text-black font-medium">Рассрочка</div>
                      <div>Оплата картой рассрочки в пункте самовывоза или курьеру при получении</div>
                      <div class="flex gap-2 card-logos">
                        <img src="/img/info/vtb.png" loading="lazy" width="64" height="40" alt="ВТБ" class="h-[30px] w-auto" />
                        <img src="/img/info/halva.png" loading="lazy" width="64" height="40" alt="Халва" class="h-[30px] w-auto" />
                        <img src="/img/info/magnit.png" loading="lazy" width="64" height="40" alt="Магнит" class="h-[30px] w-auto" />
                      </div>
                    </div>
                  </div>
                  <div class="col-span-6 lg:col-span-2" v-if="summary.total > 500">
                    <div class="radio-card">
                      <label class="absolute inset-0">
                        <input type="radio" v-model="model.person.payment" name="payment" value="Оплата в кредит" />
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
                  <div class="col-span-6 mt-14 sm:mt-16" v-if="model.who === 'person' && model.person.payment === 'Рассрочка'">
                    <h2>Варианты покупки в рассрочку</h2>
                    <p class="note max-w-[300px] mb-5">Оплата картой рассрочки в пункте самовывоза или курьеру при получении</p>

                    <div class="flex flex-col gap-1">
                      <div class="text-[12px] border-t hidden sm:flex w-full">
                        <div class="text-left font-normal py-3 px-2 flex-1">Предложение</div>
                        <div class="text-center font-normal w-[200px] py-3 px-2 hidden sm:block">Первый платёж</div>
                        <div class="text-center font-normal w-[300px] py-3 px-2">Ежемесячный платёж</div>
                        <div class="w-[20px]"></div>
                      </div>
                      <div
                        v-for="card in cards"
                        :key="card.title"
                        class="border border-solid flex sm:items-center cursor-pointer rounded-[5px] text-sm"
                        :class="selectedC.card.title === card.title ? 'border-[#00B3D7]' : ''"
                        @click="
                          selectedC = {
                            card,
                          }
                        "
                      >
                        <div class="py-1 px-2 items-center hidden sm:flex gap-2 flex-1">
                          <img :src="card.img" />
                          <div class="hidden sm:block">В рассрочку картой «{{ card.title }}»</div>
                        </div>
                        <div class="py-1 px-2 hidden sm:block text-center w-[200px]">0 бел.руб.</div>
                        <div class="py-1 px-2 sm:text-center flex-1 sm:max-w-[300px]">
                          <div class="flex sm:hidden flex-col gap-1">
                            <div><img :src="card.img" /></div>
                            <div>В рассрочку картой «{{ card.title }}»</div>
                            <div>Первый платёж 0 бел.руб.</div>
                          </div>
                          <div class="text-[12px]">≈ {{ calcFullPricePeriod(summary.totalRaw, card.percent, card.period) }} руб x {{ card.period }} мес</div>
                          <div class="text-[12px]">итоговая сумма = {{ calcFullPrice(summary.totalRaw, card.percent) }} бел.руб.</div>
                        </div>
                        <div class="py-1 w-[20px]">
                          <input type="radio" :checked="card.title === selectedC.card.title" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-6 mt-14 sm:mt-16" v-if="model.who === 'person' && model.person.payment === 'Оплата в кредит'">
                    <h2>Варианты покупки в кредит</h2>
                    <p class="note mb-5">
                      Оплата покупки через партнёрский банк:<br />
                      оформляете заказ и ждёте звонок от менеджера банка-партнёра.
                    </p>

                    <div class="flex flex-col gap-1">
                      <div class="text-[12px] border-t hidden sm:flex w-full">
                        <div class="text-left font-normal flex-1 py-3 px-2">Предложение</div>
                        <div class="text-center font-normal w-[200px] py-3 px-2">Кредит</div>
                        <div class="text-center font-normal w-[300px] py-3 px-2">Ежемесячный платёж</div>
                        <div class="w-[20px]"></div>
                      </div>
                      <template v-for="(bank, index) in banks" :key="index">
                        <div
                          v-for="variant in bank.variants"
                          :key="variant.title"
                          class="border border-solid flex sm:items-center cursor-pointer rounded-[5px] text-sm"
                          :class="selectedB.bank.title === bank.title && selectedB.variant.title === variant.title ? 'border-[#00B3D7]' : ''"
                          @click="
                            selectedB = {
                              bank,
                              variant,
                            }
                          "
                        >
                          <div class="py-1 px-2 hidden sm:flex items-center gap-2 flex-1">
                            <img :src="bank.img" class="h-5" />
                          </div>
                          <div class="py-1 px-2 sm:text-center w-[200px] hidden sm:block">{{ variant.title }}</div>
                          <div class="py-1 px-2 sm:text-center flex-1 w-[300px]">
                            <div class="flex sm:hidden flex-col gap-1">
                              <div><img :src="bank.img" class="" /></div>
                              <div>{{ variant.title }}</div>
                            </div>
                            <div class="text-[12px]">≈ {{ calcFullPricePeriod(summary.totalRaw, variant.percent, variant.period) }} руб x {{ variant.period }} мес</div>
                            <div class="text-[12px]">итоговая сумма = {{ calcFullPrice(summary.totalRaw, variant.percent) }} бел.руб.</div>
                          </div>
                          <div class="py-1 px-2">
                            <input type="radio" :checked="selectedB.bank.title === bank.title && selectedB.variant.title === variant.title" />
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="col-span-6 mt-14 sm:mt-16">
                    <h2>Дополнительная информация</h2>
                  </div>
                  <div class="col-span-6">
                    <FormItem>
                      <textarea placeholder="Комментарий к заказу" name="comment" v-model="model.person.comment" cols="30" rows="8" class="input"></textarea>
                    </FormItem>
                  </div>
                </div>
                <button type="submit" class="hidden" :disabled="disabled">Оформить заказ</button>
              </Form>

              <Form :model="model.ur" :onFinish="onFinish" :class="model.who === 'business' ? 'block' : 'hidden'">
                <div class="grid grid-cols-6 gap-2">
                  <div class="col-span-6">
                    <FormItem name="name" :rules="[{ required: true }]">
                      <input name="name" type="text" class="input" placeholder="Укажите наименование организации" v-model="model.ur.name" />
                    </FormItem>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="unp" :rules="[{ required: true }]">
                      <input name="unp" type="text" class="input" placeholder="УНП" v-model="model.ur.unp" />
                    </FormItem>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="account" :rules="[{ required: true }]">
                      <input name="account" type="text" class="input" placeholder="Р/с" v-model="model.ur.account" />
                    </FormItem>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="bankaddress" :rules="[{ required: true }]">
                      <input name="bankaddress" type="text" class="input" placeholder="Адрес банка" v-model="model.ur.bankaddress" />
                    </FormItem>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="bankbic" :rules="[{ required: true }]">
                      <input name="bankbic" type="text" class="input" placeholder="БИК банка" v-model="model.ur.bankbic" />
                    </FormItem>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="reason" :rules="[{ required: true }]">
                      <input name="reason" type="text" class="input" placeholder="На каком основании заключает договор от имени организации" v-model="model.ur.reason" />
                    </FormItem>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <FormItem name="fio" :rules="[{ required: true }]">
                      <input name="fio" type="text" class="input" placeholder="ФИО того, в чьем лице действует организация" v-model="model.ur.fio" />
                    </FormItem>
                  </div>

                  <div class="col-span-6 lg:col-span-3">
                    <FormItem name="phone" :rules="[{ required: true }]">
                      <input name="phone" type="tel" placeholder="+375 (__) ___-__-__" class="input" v-model="model.ur.phone" v-maska data-maska="+375 (##) ###-##-##" />
                    </FormItem>
                  </div>
                  <div class="col-span-6 lg:col-span-3">
                    <FormItem name="email" :rules="[{ email: true }]">
                      <input name="email" type="email" class="input" placeholder="Контактный  E-mail" v-model="model.ur.email" />
                    </FormItem>
                  </div>

                  <div class="col-span-6 mt-8">
                    <h2>Способ получения</h2>
                  </div>

                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0">
                        <input name="delivery" type="radio" v-model="model.ur.delivery" value="Самовывоз" />
                      </label>
                      <div class="text-black font-medium">Самовывоз</div>
                      <div>Бесплатно</div>
                    </div>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0">
                        <input name="delivery" type="radio" v-model="model.ur.delivery" value="Доставка в пределах МКАД" />
                      </label>
                      <div class="text-black font-medium">Доставка в пределах МКАД</div>
                      <div>Бесплатно при стоимости товара от <span class="whitespace-nowrap">300 Br</span></div>
                      <div>При стоимости товара до <span class="whitespace-nowrap">300 Br</span>, стоимость доставки — <span class="whitespace-nowrap">6 Br</span></div>
                    </div>
                  </div>
                  <div class="col-span-6 lg:col-span-2">
                    <div class="radio-card">
                      <label class="absolute inset-0">
                        <input name="delivery" type="radio" v-model="model.ur.delivery" value="Доставка по Беларуси" />
                      </label>
                      <div class="text-black font-medium">Доставка по Беларуси</div>
                      <div>Стоимость доставки — от 12 Br</div>
                    </div>
                  </div>
                  <template v-if="model.ur.delivery !== 'Самовывоз'">
                    <div class="col-span-6 text-sm text-black mt-4">
                      Сроки доставки уточнит менеджер при подтверждении заказа.

                      <h2 class="mt-8">Адрес получателя</h2>
                    </div>

                    <div class="col-span-6 lg:col-span-2">
                      <FormItem name="city" :rules="[{ required: true }]">
                        <input name="city" type="text" class="input" placeholder="Город" v-model="model.ur.city" />
                      </FormItem>
                    </div>

                    <div class="col-span-6 lg:col-span-2">
                      <FormItem name="street" :rules="[{ required: true }]">
                        <input name="street" type="text" class="input" placeholder="Улица" v-model="model.ur.street" />
                      </FormItem>
                    </div>

                    <div class="col-span-6 lg:col-span-2">
                      <FormItem name="building" :rules="[{ required: true }]">
                        <input name="building" type="text" class="input" placeholder="Номер дома" v-model="model.ur.building" />
                      </FormItem>
                    </div>
                    <div class="col-span-6 lg:col-span-2">
                      <FormItem>
                        <input name="block" type="text" class="input" placeholder="Корпус" v-model="model.ur.block" />
                      </FormItem>
                    </div>
                    <div class="col-span-6 lg:col-span-2">
                      <FormItem name="apt" :rules="[{ required: true }]">
                        <input name="apt" type="text" class="input" placeholder="Квартира" v-model="model.ur.apt" />
                      </FormItem>
                    </div>
                    <div class="col-span-6 lg:col-span-2">
                      <FormItem>
                        <input name="zip" type="text" class="input" placeholder="Почтовый индекс" v-model="model.ur.zip" />
                      </FormItem>
                    </div>
                  </template>

                  <div class="col-span-6 mt-14 sm:mt-16">
                    <h2>Дополнительная информация</h2>
                  </div>
                  <div class="col-span-6">
                    <FormItem>
                      <textarea placeholder="Комментарий к заказу" name="comment" v-model="model.ur.comment" cols="30" rows="8" class="input"></textarea>
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
            <div>{{ price(summary?.total) }}</div>
          </div>

          <button class="btn w-full sm:max-w-[200px] sm:mx-auto" @click="onOrder" :disabled="disabled">Оформить заказ</button>

          <div class="text-[12px] font-light text-center">
            Нажимая на кнопку «Оформить заказ», Вы соглашаетесь с
            <NuxtLink to="/privacy-and-terms" class="underline underline-offset-4">обработкой персональных данных</NuxtLink> и
            <NuxtLink to="/public-offer" class="underline underline-offset-4">Договором публичной оферты</NuxtLink>.
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
const selectedC = ref({ card: cards[0] });
const selectedB = ref({ bank: banks[0], variant: banks[0].variants[0] });
import { cards, banks, calcFullPrice, calcFullPricePeriod } from '@/constants/credit';
const disabled = ref(false);
import { useLocalStorage } from '@vueuse/core';
const router = useRouter();
const model = useLocalStorage('checkout', {
  who: 'person',
  person: {
    delivery: 'Самовывоз',
    payment: 'Наличными',
  },
  ur: { delivery: 'Самовывоз', payment: 'Банковский перевод' },
});

const { add: add2favorites } = useFavorites();
const { items, add, total, remove, clear, itemshash } = useCart();
const { data } = await useAsyncData(
  'cart',
  () => {
    return $fetch('/api/products/cart', {
      method: 'POST',
      body: {
        sortby: 'popular',
        sortdir: 'desc',
        items: items.value,
        trigger: 'cart',
      },
    });
  },
  {
    watch: [itemshash],
  }
);

const onPrint = () => router.push('/print/cart');

const onFinish = async (info) => {
  disabled.value = true;
  info.paymentDetails = '';

  if (info.payment === 'Рассрочка') info.paymentDetails = `${selectedC.value.card.title} на ${selectedC.value.card.period} мес.`;
  if (info.payment === 'Оплата в кредит') info.paymentDetails = `${selectedB.value.bank.title} ${selectedB.value.variant.title}`;

  const payload = {
    method: 'POST',
    body: {
      info,
      cart: {
        total: {
          qty: summary.value.qty,
          price: summary.value.title,
        },
        data: summary.value.data,
      },
      total: {
        qty: summary.value.qty,
        price: summary.value.price,
        delivery: summary.value.delivery,
        deliveryPrice: summary.value.deliveryPrice,
        total: summary.value.total,
      },
    },
  };

  const res = await $fetch('/api/orders/new', payload);

  router.push(`/thankyou?orderID=${res.orderID}`);
  clear();
  disabled.value = false;
};

const onRemove = (id) => {
  add2favorites(id);
  setTimeout(() => remove(id), 10);
};
const onQty = (productID, qty) => {
  if (qty === 0) onRemove(productID);
};

const onOrder = () => {
  const form = document.querySelector(`.order-area form.block button[type="submit"]`);
  form.click();
};

const fixPrice = (value) => {
  return String(value).replace('.', ',') + ' Br';
};

const summary = computed(() => {
  let price = data.value.total?.price;

  const delivery = model.value.who === 'person' ? model.value.person.delivery : model.value.ur.delivery;
  let deliveryPrice = 0;
  if (delivery === 'Доставка в пределах МКАД') {
    if (price < 300) deliveryPrice = 6;
  }
  if (delivery === 'Доставка по Беларуси') {
    deliveryPrice = 12;
  }
  let newData = data.value.data;
  let total = price + deliveryPrice;
  let totalRaw = price + deliveryPrice;
  if (model.value.who === 'person' && ['Оплата в кредит', 'Рассрочка'].includes(model.value.person.payment)) {
    const percent = model.value.person.payment === 'Оплата в кредит' ? selectedB.value.variant.percent : selectedC.value.card.percent;
    price = 0;
    total = 0;
    totalRaw = 0;
    newData = newData.map((item) => {
      const itemPrice = calcFullPrice(item.Price, percent);
      const itemTotal = calcFullPrice(item.itemTotal, percent);
      price += +itemTotal;
      total += +itemTotal;
      totalRaw += +item.itemTotal;
      return {
        ...item,
        Price: itemPrice,
        itemTotal,
      };
    });
    if (deliveryPrice) {
      total += deliveryPrice;
      totalRaw += deliveryPrice;
    }
  }
  return {
    data: newData,
    qty: data.value.total?.qty,
    price,
    delivery,
    deliveryPrice,
    total,
    totalRaw,
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

const handleClear = () => {
  clear();
};
</script>
