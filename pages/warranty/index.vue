<template>
  <main class="text-sm text !mb-0">
    <div class="box xl:mb-[80px]">
      <div class="container">
        <div class="breadcrumbs"><NuxtLink to="/" class="">Главная </NuxtLink><span>Гарантия</span></div>

        <div class="flex flex-col xl:flex-row justify-between gap-10 items-start">
          <div class="flex-1 text-wrap">
            <h1>Гарантия</h1>
            <p>
              Гарантийный отдел занимается вопросами обмена, возврата и гарантийного обслуживания товаров, приобретённых в компании ООО «Компьютеры Айвен». Квалифицированные
              сотрудники и полностью оборудованные рабочие места обеспечивают оперативное тестирование и выявление неисправностей.
            </p>
            <button class="btn" @click="handleClick">Обратиться по гарантии</button>
          </div>
          <div class="bg-[#FF8484]/10 rounded flex-1 text-wrap py-10 px-5 xl:px-10 xl:-mt-10">
            <div class="h2 text-[#F54D4D]">Обратите внимание!</div>

            <p>Гарантия и возврат товара осуществляется только при предъявлении гарантийного талона.</p>

            <p>
              После получения заказа претензии в связи с наличием внешних дефектов товара, количеством, комплектности и товарному виду не принимаются. Срок гарантии для каждой
              товарной позиции указан в гарантийных обязательствах.
            </p>
            <div class="mt-6 underline text-xs">
              <CompanyLinks link="warranty" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box lg:mb-[80px]">
      <div class="container">
        <div class="flex flex-col xl:flex-row justify-between gap-10 items-start">
          <div class="flex-1 text-wrap">
            <div class="h2">Гарантия и ответственность</div>

            <p>
              Положение <NuxtLink to="/public-offer" class="underline underline-offset-2">Договора публичной оферты</NuxtLink> на приобретение товаров через интернет-магазин
              компании ООО «Компьютеры Айвен».
            </p>

            <p>
              5.1. Продавец не несет ответственности за ущерб, причиненный Покупателю или Получателю вследствие ненадлежащего использования последними Товара, приобретенного в
              интернет-магазине Продавца.
            </p>

            <p>5.2. Продавец не несет ответственности за содержание и функционирование других сайтов Интернета.</p>

            <p>
              5.3. Продавец вправе переуступать либо каким-либо иным способом передавать свои права и обязанности, вытекающие из его отношений с Покупателем или Покупателем,
              третьим лицам.
            </p>

            <p>
              5.4. Продавец не несет ответственности за последствия, связанные с действиями Покупателя или Получателя в случае использования Товара, приобретенного у Продавца, в
              предпринимательских целях.
            </p>

            <p>
              5.5. Продавец не отвечает за убытки Покупателя или Получателя, возникшие в результате:<br />
              - предоставления недостоверной информации при согласовании Заказа, в т.ч. неправильного указания идентификационных сведений;<br />
              - неправомерных действий третьих лиц.
            </p>

            <p>5.6. Покупатель или Получатель несет полную ответственность за достоверность идентификационных сведений, указанных им при Заказе Товара в интернет-магазине.</p>

            <p>
              5.7. Стороны освобождаются от ответственности за полное или частичное неисполнение своих обязательств, если такое неисполнение явилось следствием действия
              обстоятельств непреодолимой силы, возникших после вступления в силу настоящего договора и/или в результате событий чрезвычайного характера, которые Стороны не могли
              предвидеть и предотвратить разумными мерами.
            </p>

            <p>
              5.8. В иных случаях, не предусмотренных пунктом 5.7 настоящего договора, за неисполнение или ненадлежащее исполнение своих обязательств, Стороны несут ответственность
              в соответствии с действующим законодательством Республики Беларусь.
            </p>

            <p>5.9. В случае необоснованного отказа от приобретения товара, Покупатель обязан возместить расходы Продавца, связанные с доставкой Товара Покупателю.</p>
          </div>

          <div class="bg-[#E5A35B]/10 rounded flex-1 text-wrap py-10 px-5 xl:px-10">
            <h2 class="text-[#E5A35B]">Технически сложные товары бытового назначения</h2>
            <p>Из постановления Совета Министров Республики Беларусь от 14 июня 2002 г. № 778 «О мерах по реализации Закона Республики Беларусь «О защите прав потребителей».</p>

            <p>
              Технически сложные товары бытового назначения входят в перечень непродовольственных товаров надлежащего качества, не подлежащих обмену и возврату. К ним относятся:
              электрические бытовые машины и приборы, электрические нагревательные приборы, электроинструменты, электрические контрольно-измерительные приборы, телерадиотовары,
              электромузыкальные инструменты, фотоаппараты и фотокамеры цифровые, киноаппаратура любительская, телекоммуникационное оборудование бытового назначения, обладающее
              двумя и более функциями и имеющее сенсорный экран или элементы программного управления, часы, компьютеры персональные, планшеты, ноутбуки, печатающие устройства,
              мониторы (дисплеи), сканеры, игровые приставки с элементами программного управления, прочие устройства ввода и вывода, копировально-множительные машины, газонокосилки
              (триммеры) с электрическим или бензиновым приводом, бензопилы, швейные машины, машины и аппараты вязальные, машины раскройные, для шитья меха, обметочные и
              стачивающе-обметочные, бытовая газовая аппаратура и иные товары с питанием от сети переменного тока, на которые установлены гарантийные сроки и в техническом паспорте
              (заменяющем его документе) которых имеется отметка о дате продажи.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="box-lg">
      <div class="container">
        <div class="flex flex-col xl:flex-row justify-between gap-10 items-start">
          <div class="flex-1 text-wrap">
            <div class="h2">Гарантия и возврат</div>
            <p>
              Согласно постановлению Совета Министров Республики Беларусь от 14 июня 2002 г. № 778 «О мерах по реализации Закона Республики Беларусь «О защите прав потребителей»
              технически сложные товары бытового назначения надлежащего качества обмену и возврату не подлежат.
            </p>
          </div>
          <div class="bg-[#FF8484]/10 rounded flex-1 text-wrap py-10 px-5 xl:px-10">
            <div class="h2 text-[#F54D4D]">Дорогие покупатели!</div>
            <p>
              <a href="tel:+375173904295" title="+375 17 390 42 95 Отдел торговли и услуг администрации Центрального района г.Минска" class="underline underline-offset-2"
                >Контакт специалиста для связи по вопросам обращения покупателей о нарушении их прав</a
              >.
            </p>
            <p>
              В случае крайней необходимости возврата товаров надлежащего качества обращайтесь в наш гарантийный отдел. Мы готовы рассмотреть каждый случай в индивидуальном
              порядке.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="py-10 bg-[#00B3D7]/10 box-scroll2" ref="target" id="warranty">
      <div class="container">
        <div class="grid xl:grid-cols-2 gap-10">
          <div class="text-wrap">
            <div class="in">
              <div class="h2">Заявка на гарантийное обслуживание</div>

              <Form :model="model" :onFinish="onFinish" action="#" class="flex flex-col gap-6">
                <div class="pl-6 relative">
                  <div class="num">1.</div>
                  <FormItem name="name" :rules="[{ required: true }]">
                    <input name="name" v-model="model.name" type="text" class="input" placeholder="Укажите Ваше Имя" />
                  </FormItem>
                </div>
                <div class="pl-6 relative">
                  <div class="num">2.</div>
                  <FormItem name="surname" :rules="[{ required: true }]">
                    <input name="surname" v-model="model.surname" type="text" class="input" placeholder="Укажите Вашу Фамилию" />
                  </FormItem>
                </div>
                <div class="pl-6 relative">
                  <div class="num">3.</div>
                  <div class="relative">
                    <input type="file" class="opacity-0 absolute inset-0 z-" />
                    <div class="flex gap-4 cursor-pointer relative items-center" items-center>
                      <UploadIcon />
                      <template v-if="model.file">
                        {{ model.file }}
                        <RemoveButton
                          @click="
                            model.file = null;
                            model.fileData = null;
                          "
                        />
                      </template>
                      <template v-else>
                        <input type="file" class="absolute inset-0 opacity-0" @change="handleFileChange" accept="image/*" />
                        <div class="underline underline-offset-4 mt-1">Загрузите фото гарантийного талона</div>
                      </template>
                    </div>
                  </div>
                </div>
                <div class="pl-6 relative">
                  <div class="num">4.</div>
                  <FormItem name="message" :rules="[{ required: true }]">
                    <textarea name="message" v-model="model.message" rows="5" placeholder="Опишите неисправность" class="input"></textarea>
                  </FormItem>
                </div>

                <div class="pl-6 relative">
                  <button class="btn !mt-0" type="submit" :disabled="!model.fileData">Отправить заявку</button>
                </div>
              </Form>
            </div>
          </div>

          <div class="flex items-center justify-center">
            <img class="box-stick-img" src="/img/about/4.png" alt="i-ven.by" width="595" height="480" />
          </div>
        </div>
      </div>
    </div>
    <Map />
  </main>
</template>
<script setup>
const { show: showThanks } = useThanks();
const target = ref(null);
const file = ref(null);
definePageMeta({
  layout: 'default',
});

const meta = {
  title: 'Гарантия и возврат | Интернет-магазин Iven',
  description: 'Гарантийное обслуживание, обмен и возврат товаров, приобретённых в интернет-магазине Iven.',
};

useSeoMeta({
  title: () => meta.title,
  ogTitle: () => meta.title,
  description: () => meta.description,
  ogDescription: () => meta.description,
});

const handleClick = () => {
  target.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
const handleFileChange = (event) => {
  const fileData = event.target.files[0];
  model.value.file = fileData.name;
  const reader = new FileReader();
  reader.onload = (e) => {
    model.value.fileData = e.target.result;
  };
  reader.readAsDataURL(fileData);
};

const DEFAULT_DATA = {
  action: 'warranty',
  subject: 'Заявка на гарантийное обслуживание',
  name: '',
  file: '',
  surname: '',
  message: '',
  fileData: '',
};

const model = useState(() => clone(DEFAULT_DATA));

const onFinish = async (event) => {
  const body = clone(model.value);
  useFetch('/api/email', {
    method: 'POST',
    body,
  });
  Object.assign(model.value, clone(DEFAULT_DATA));
  showThanks();
};
</script>

<style scoped>
.num {
  @apply text-sm text-[#00B3D7] font-medium absolute left-0 top-2;
}
</style>
