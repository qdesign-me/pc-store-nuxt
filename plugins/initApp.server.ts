import { useAppStore } from '~/stores/app';

export default defineNuxtPlugin({
  name: 'app-init',
  enforce: 'pre',
  hooks: {
    async 'app:created'() {
      const nuxtApp = useNuxtApp();
      const store = useAppStore(nuxtApp.$pinia);
      const hostname = process.env.NUXT_PUBLIC_HOSTNAME;
      //const initData = await fetch(`${hostname}/api/config`).then((res) => res.json());
      const initData = {
        config: {
          address: 'ул.Тимирязева 4, ст. метро «Молодежная»',
          address2: 'ул.Репина 4, пом. 475, ст. метро «Молодежная»',
          email: 'info@i-ven.by',
          'footer.line1':
            'Общество с Ограниченной Ответственностью «Компьютеры Айвен» <br>\nУНП 192776859<br>\nОАО «ТехноБанк» р/с: BY98TECN30121817600000000010<br>\n220002, Минск, ул. Кропоткина 44<br>   \nкод TECNBY22',
          'footer.line2': 'тел. +375(17) 227-71-90',
          'footer.line3':
            ' Регистрационный номер в Торговом реестре № 411997ООО от 11.04.2018 г.               <br /> Вся информация на сайте – собственность интернет-магазина iven.by. Все права защищены. Публикация информации с сайта без разрешения правообладателя запрещена.',
          'home.categories': '498,28,365,1020,364',
          mainphone: '5418080',
          map: '!1m18!1m12!1m3!1d2350.088093548532!2d27.523181877471885!3d53.912410472458944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcee206b815cd%3A0x5dded03f1579aebf!2sIVEN%20Computers!5e0!3m2!1sen!2sby!4v1688303665101!5m2!1sen!2sby',
          phones: '+375172277190 +375295418080 +375255418080 +375445418080',
          'service.phone': '+375173783627',
          slider:
            '[{"img":"/img/promo/prod.jpg","mobi":"/img/promo/prod.jpg","uri":"/noutbuki-i-aksessuary/gotovie-komputeri","title":"<h2>СОБСТВЕННОЕ<br />ПРОИЗВОДСТВО<br />КОМПЬЮТЕРОВ</h2><p>Гарантия 24 месяца<br />Бесплатная сборка и настройка<br />Оперативная доставка</p>"},{"img":"/img/promo/prod2.jpg","mobi":"/img/promo/prod2.jpg","uri":"/catalog","title":"<h2>РАБОТАЕМ<br/>С ЮРЛИЦАМИ</h2><p>Все цены на сайте<br/>указаны с учётом НДС</p>"}]',
          social: 'https://vk.com/club218783813 https://www.instagram.com/ivencomputers/',
          timetable: 'Понедельник - пятница, 10:00-19:00',
        },
      };
      store.config = initData.config;
    },
  },
});
