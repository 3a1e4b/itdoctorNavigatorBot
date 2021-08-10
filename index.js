// Подключение dotenv для скрытия токена
require('dotenv').config()
// Телеграф для создания бота
const {
  Telegraf,
  Markup
} = require('telegraf')
// Подключить текстовые константы
const CONST = require('./modules/const')
// Подключить текст для бесплатных курсов
const free_course = require('./modules/free_course')
// Подключить текст для платных курсов Udemy
const paid_course_u = require('./modules/paid_course_u')
// Подключить текст для платных курсов Stepik
const paid_course_s = require('./modules/paid_course_s')
// Передать токен
const bot = new Telegraf(process.env.BOT_TOKEN)

// Старт бота
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : "незнакомец"}`+CONST.START_MSG, Markup.keyboard([
  ["❓ Об авторе"], 
  ["💰 Поддержать"], 
  ["✍️ Обратная связь"]
]).resize()))

// Помощь
bot.help((ctx) => ctx.replyWithHTML(CONST.COMMANDS))

// Кнопка "Об авторе"
bot.hears('❓ Об авторе', async (ctx) => {
  try {
    await ctx.replyWithPhoto({
      source: 'img/portrait.jpg'
    }, {
      caption: CONST.AUTHOR,
      parse_mode: "HTML",
      reply_markup: JSON.stringify({"inline_keyboard": [
        [
          Markup.button.url('YouTube', 'https://www.youtube.com/c/ITDoctor/about'),
          Markup.button.url('Udemy', 'https://www.udemy.com/user/useinov-ismail-asanovich/'),
          Markup.button.url('GitHub', 'https://github.com/morphIsmail')
        ]
      ]})
    }, {
      disable_web_page_preview: true
    })
  } catch (e) {
    console.error(e)
  }
})
// Кнопка "Поддержать"
bot.hears('💰 Поддержать', async (ctx) => {
  try {
    await ctx.reply(CONST.DONATION, Markup.inlineKeyboard(
      [
        Markup.button.url('YooMoney', 'https://sobe.ru/na/itdoctor'),
        Markup.button.url('PayPal', 'https://paypal.me/itdoctorstudio')
      ]
    ))
  } catch (e) {
    console.error(e)
  }
})
// Кнопка "Обратная связь"
bot.hears('✍️ Обратная связь', async (ctx) => {
  try {
    await ctx.reply('🤔 Чтобы связаться с моим создателем, автором канала ITDoctor, перейди в группу канала нажав на кнопку ниже.', Markup.inlineKeyboard(
      [Markup.button.url('Написать письмо', 'https://t.me/itdoctorstudio')]))
  } catch (e) {
    console.error(e)
  }
})

/**
 * Функция для отправки сообщения при нажатии по кнопке или выполнении команды
 * @param {String} id Идентификатор кнопки для обработки
 * @param {String} src Путь к изображению, или false чтобы отправить только текст
 * @param {String} text Текстовое сообщение для отправки
 * @param {Boolean} preview Блокировать превью у ссылок или нет, true - блокировать, false - нет
 */
function send_msg_action(id, src, text, preview=true) {
  bot.action(id, async (ctx) => {
    try {
      await ctx.answerCbQuery()
      if (src !== false) {
        await ctx.replyWithPhoto({
          source: src
        }, {
          caption: text,
          parse_mode: "HTML",
        });
      } else {
        await ctx.replyWithHTML(text, {
          disable_web_page_preview: preview
        })
      }
    } catch (e) {
      console.error(e)
    }
  })
}

// Команда /free_course - Бесплатные курсы
bot.command('free_course', async (ctx) => {
  try {
    await ctx.replyWithHTML('<b>Бесплатные курсы на <a href="https://www.youtube.com/c/ITDoctor/playlists">YouTube</a></b>', Markup.inlineKeyboard([
      [Markup.button.callback('Редакторы кода', 'btn_category1')],
      [Markup.button.callback('Инструменты веб-разработчика', 'btn_category2')],
      [Markup.button.callback('Основы вёрстки HTML и CSS', 'btn_category3')],
      [Markup.button.callback('Frontend разработка JS и jQuery', 'btn_category4')],
      [Markup.button.callback('Фреймворки', 'btn_category5')],
      [Markup.button.callback('Вёрстка сайта с нуля', 'btn_category6')],
      [Markup.button.callback('Backend разработка PHP и MySQL', 'btn_category7')],
      [Markup.button.callback('Лайфхаки', 'btn_category8')],
      [Markup.button.callback('3D и Gamedev', 'btn_category9')]
    ]))
  } catch (e) {
    console.error(e)
  }
})

// Обработка кнопок из категории Редакторы кода
bot.action('btn_category1', async (ctx) => {
  try {
    await ctx.answerCbQuery()
    await ctx.replyWithHTML('<b>Редакторы кода</b>\n4 курса\n71 видео урок\n8 часов', Markup.inlineKeyboard([
      [
        Markup.button.callback('1. Обзоры', 'category1_btn1'),
        Markup.button.callback('2. VS Code', 'category1_btn2')
      ],
      [
        Markup.button.callback('3. Sublime Text 3', 'category1_btn3'),
        Markup.button.callback('4. Brackets', 'category1_btn4')
      ]
    ]))
  } catch (e) {
    console.error(e)
  }
})
send_msg_action('category1_btn1', 'img/free_course/c1_b1.jpg', free_course[0][0])
send_msg_action('category1_btn2', 'img/free_course/c1_b2.jpg', free_course[0][1])
send_msg_action('category1_btn3', 'img/free_course/c1_b3.jpg', free_course[0][2])
send_msg_action('category1_btn4', 'img/free_course/c1_b4.jpg', free_course[0][3])

// Обработка кнопок из категории Инструменты
bot.action('btn_category2', async (ctx) => {
  try {
    await ctx.answerCbQuery()
    await ctx.replyWithHTML('<b>Инструменты веб-разработчика</b>\n6 курсов\n75 видео уроков\n15 часов 50 минут', Markup.inlineKeyboard([
      [
        Markup.button.callback('1. Полезные сервисы', 'category2_btn1'),
        Markup.button.callback('2. Обзоры', 'category2_btn2')
      ],
      [
        Markup.button.callback('3. Open Server', 'category2_btn3'),
        Markup.button.callback('4. Photoshop', 'category2_btn4')
      ],
      [
        Markup.button.callback('5. Git & GitHub', 'category2_btn5'),
        Markup.button.callback('6. Сборщик Gulp 4', 'category2_btn6')
      ]
    ]))
  } catch (e) {
    console.error(e)
  }
})
send_msg_action('category2_btn1', 'img/free_course/c2_b1.jpg', free_course[1][0])
send_msg_action('category2_btn2', 'img/free_course/c2_b2.jpg', free_course[1][1])
send_msg_action('category2_btn3', 'img/free_course/c2_b3.jpg', free_course[1][2])
send_msg_action('category2_btn4', 'img/free_course/c2_b4.jpg', free_course[1][3])
send_msg_action('category2_btn5', 'img/free_course/c2_b5.jpg', free_course[1][4])
send_msg_action('category2_btn6', 'img/free_course/c2_b6.jpg', free_course[1][5])

// Обработка кнопок из категории Основы вёрстки HTML и CSS
bot.action('btn_category3', async (ctx) => {
  try {
    await ctx.answerCbQuery()
    await ctx.replyWithHTML('<b>Основы вёрстки HTML и CSS</b>\n5 курсов\n121 видео урок\n16 часов 30 минут', Markup.inlineKeyboard([
      [
        Markup.button.callback('1. HTML', 'category3_btn1'),
        Markup.button.callback('2. CSS', 'category3_btn2')
      ],
      [
        Markup.button.callback('3. Emmet', 'category3_btn3'),
        Markup.button.callback('4. Формы', 'category3_btn4')
      ],
      [
        Markup.button.callback('5. Препроцессоры SCSS, Less', 'category3_btn5')
      ]
    ]))
  } catch (e) {
    console.error(e)
  }
})
send_msg_action('category3_btn1', 'img/free_course/c3_b1.jpg', free_course[2][0])
send_msg_action('category3_btn2', 'img/free_course/c3_b2.jpg', free_course[2][1])
send_msg_action('category3_btn3', 'img/free_course/c3_b3.jpg', free_course[2][2])
send_msg_action('category3_btn4', 'img/free_course/c3_b4.jpg', free_course[2][3])
send_msg_action('category3_btn5', 'img/free_course/c3_b5.jpg', free_course[2][4])

// Обработка кнопок из категории Frontend разработка
bot.action('btn_category4', async (ctx) => {
  try {
    await ctx.answerCbQuery()
    await ctx.replyWithHTML('<b>Frontend разработка JS и jQuery</b>\n5 курсов\n127 видео уроков\n32 часа 25 минут', Markup.inlineKeyboard([
      [Markup.button.callback('1. Java Script для новичков 2021', 'category4_btn1')],
      [Markup.button.callback('2. Java Script базовый курс', 'category4_btn2')],
      [Markup.button.callback('3. Java Script продвинутый', 'category4_btn3')],
      [
        Markup.button.callback('4. jQuery', 'category4_btn4'),
        Markup.button.callback('5. Практика', 'category4_btn5')
      ]
    ]))
  } catch (e) {
    console.error(e)
  }
})
send_msg_action('category4_btn1', 'img/free_course/c4_b1.jpg', free_course[3][0])
send_msg_action('category4_btn2', 'img/free_course/c4_b2.jpg', free_course[3][1])
send_msg_action('category4_btn3', 'img/free_course/c4_b3.jpg', free_course[3][2])
send_msg_action('category4_btn4', 'img/free_course/c4_b4.jpg', free_course[3][3])
send_msg_action('category4_btn5', 'img/free_course/c4_b5.jpg', free_course[3][4])

// Обработка кнопок из категории Фреймворки
bot.action('btn_category5', async (ctx) => {
  try {
    await ctx.answerCbQuery()
    await ctx.replyWithHTML('<b>Фреймворки</b>\n2 курса\n23 видео урока\n6 часов 40 минут', Markup.inlineKeyboard([
      [
        Markup.button.callback('1. Bootstrap 4', 'category5_btn1'),
        Markup.button.callback('2. Bootstrap 5', 'category5_btn2')
      ],
    ]))
  } catch (e) {
    console.error(e)
  }
})
send_msg_action('category5_btn1', 'img/free_course/c5_b1.jpg', free_course[4][0])
send_msg_action('category5_btn2', 'img/free_course/c5_b2.jpg', free_course[4][1])

// Обработка кнопок из категории Вёрстка сайта с нуля
bot.action('btn_category6', async (ctx) => {
  try {
    await ctx.answerCbQuery()
    await ctx.replyWithHTML('<b>Вёрстка сайта с нуля</b>\n5 курсов\n63 видео урока\n27 часов', Markup.inlineKeyboard([
      [Markup.button.callback('1. Вёрстка из PSD, Flexbox + Less', 'category6_btn1')],
      [Markup.button.callback('2. Вёрстка из PSD, Bootstrap + BEM', 'category6_btn2')],
      [Markup.button.callback('3. Сайт на Wordpress, Bootstrap + SASS', 'category6_btn3')],
      [Markup.button.callback('4. Вёрстка из Marsy', 'category6_btn4')],
      [Markup.button.callback('5. Вёрстка из Figma', 'category6_btn5')],
    ]))
  } catch (e) {
    console.error(e)
  }
})
send_msg_action('category6_btn1', 'img/free_course/c6_b1.jpg', free_course[5][0])
send_msg_action('category6_btn2', 'img/free_course/c6_b2.jpg', free_course[5][1])
send_msg_action('category6_btn3', 'img/free_course/c6_b3.jpg', free_course[5][2])
send_msg_action('category6_btn4', 'img/free_course/c6_b4.jpg', free_course[5][3])
send_msg_action('category6_btn5', 'img/free_course/c6_b5.jpg', free_course[5][4])

// Обработка кнопок из категории Backend разработка
bot.action('btn_category7', async (ctx) => {
  try {
    await ctx.answerCbQuery()
    await ctx.replyWithHTML('<b>Backend разработка PHP и MySQL</b>\n8 курсов\n108 видео уроков\n31 час', Markup.inlineKeyboard([
      [
        Markup.button.callback('1. PHP', 'category7_btn1'),
        Markup.button.callback('2. БД MySQL', 'category7_btn2')
      ],
      [
        Markup.button.callback('3. Wordpress', 'category7_btn3'),
        Markup.button.callback('4. Python', 'category7_btn4')
      ],
      [Markup.button.callback('5. Одностраничный сайт на Wordpress', 'category7_btn5')],
      [Markup.button.callback('6. Многостраничный сайт на Wordpress', 'category7_btn6')],
      [Markup.button.callback('7. Алгоритмы и блок-схемы', 'category7_btn7')],
      [Markup.button.callback('8. Windows и Linux', 'category7_btn8')]
    ]))
  } catch (e) {
    console.error(e)
  }
})
send_msg_action('category7_btn1', 'img/free_course/c7_b1.jpg', free_course[6][0])
send_msg_action('category7_btn2', 'img/free_course/c7_b2.jpg', free_course[6][1])
send_msg_action('category7_btn3', 'img/free_course/c7_b3.jpg', free_course[6][2])
send_msg_action('category7_btn4', 'img/free_course/c7_b4.jpg', free_course[6][3])
send_msg_action('category7_btn5', 'img/free_course/c7_b5.jpg', free_course[6][4])
send_msg_action('category7_btn6', 'img/free_course/c7_b6.jpg', free_course[6][5])
send_msg_action('category7_btn7', 'img/free_course/c7_b7.jpg', free_course[6][6])
send_msg_action('category7_btn8', 'img/free_course/c7_b8.jpg', free_course[6][7])

// Обработка кнопок из категории Лайфхаки
send_msg_action('btn_category8', false, free_course[7][0])

// Обработка кнопок из категории 3D и Gamedev
bot.action('btn_category9', async (ctx) => {
  try {
    await ctx.answerCbQuery()
    await ctx.replyWithHTML('<b>3D и Gamedev</b>\n2 курса\n3 видео урока\n2 часа 16 минут', Markup.inlineKeyboard([
      Markup.button.callback('1. Blender', 'category9_btn1'),
      Markup.button.callback('2. Unity', 'category9_btn2'),
    ]))
  } catch (e) {
    console.error(e)
  }
})
send_msg_action('category9_btn1', 'img/free_course/c9_b1.jpg', free_course[8][0])
send_msg_action('category9_btn2', 'img/free_course/c9_b2.jpg', free_course[8][1])

// Команда /paid_course_u - Udemy курсы
bot.command('paid_course_u', async (ctx) => {
  try {
    await ctx.replyWithHTML(`<b>Платные курсы на Udemy</b>`, Markup.inlineKeyboard([
      [
        Markup.button.callback('HTML + CSS', 'btn_category_u1'),
        Markup.button.callback('Супер JavaScript', 'btn_category_u2')
      ],
      [
        Markup.button.callback('jQuery с нуля', 'btn_category_u3'),
        Markup.button.callback('Игра на Vue.js', 'btn_category_u4')
      ],
      [
        Markup.button.callback('Git + GitHub', 'btn_category_u5'),
        Markup.button.callback('Unity Bolt', 'btn_category_u6')
      ],
      [Markup.button.callback('Базы данных MySQL', 'btn_category_u7')],
      [Markup.button.callback('Язык программирования PHP', 'btn_category_u8')],
      [Markup.button.callback('Сайт на Wordpress', 'btn_category_u9')]
    ]))
  } catch (e) {
    console.error(e)
  }
})
send_msg_action('btn_category_u1', 'img/paid_course/u1.jpg', paid_course_u[0])
send_msg_action('btn_category_u2', 'img/paid_course/u2.jpg', paid_course_u[1])
send_msg_action('btn_category_u3', 'img/paid_course/u3.jpg', paid_course_u[2])
send_msg_action('btn_category_u4', 'img/paid_course/u4.jpg', paid_course_u[3])
send_msg_action('btn_category_u5', 'img/paid_course/u5.jpg', paid_course_u[4])
send_msg_action('btn_category_u6', 'img/paid_course/u6.jpg', paid_course_u[5])
send_msg_action('btn_category_u7', 'img/paid_course/u7.jpg', paid_course_u[6])
send_msg_action('btn_category_u8', 'img/paid_course/u8.jpg', paid_course_u[7])
send_msg_action('btn_category_u9', 'img/paid_course/u9.jpg', paid_course_u[8])

// Команда /paid_course_s - Stepik курсы
bot.command('paid_course_s', async (ctx) => {
  try {
    await ctx.replyWithHTML(`<b>Платные курсы на Stepik</b>`, Markup.inlineKeyboard([
      [Markup.button.callback('Игра на Vue.js', 'btn_category_s4')]
    ]))
  } catch (e) {
    console.error(e)
  }
})
send_msg_action('btn_category_s4', 'img/paid_course/u4.jpg', paid_course_s[3])

// Команда /crib_js_date - Шпаргалка по date JS
bot.command('crib_js_date', async (ctx) => {
  try {
    await ctx.reply('Шпаргалка по работе с датой и временем на языке JavaScript', Markup.inlineKeyboard(
      [
        Markup.button.url('Шпаргалка', 'https://t.me/itdoctorstudio/1699'),
        Markup.button.url('Урок', 'https://youtu.be/LBebvQI6raI')
      ]
    ))
  } catch (e) {
    console.error(e)
  }
})

// Команда /crib_python - Шпаргалка по Python
bot.command('crib_python', async (ctx) => {
  try {
    await ctx.reply('Шпаргалка по языку Python', Markup.inlineKeyboard(
      [
        Markup.button.url('Шпаргалка', 'https://t.me/itdoctorstudio/1700'),
        Markup.button.url('Урок', 'https://youtu.be/aC6_iSq6Ngo')
      ]
    ))
  } catch (e) {
    console.error(e)
  }
})

// Команда /learn_css_grid - Изучить CSS Grid
bot.command('learn_css_grid', async (ctx) => {
  try {
    await ctx.reply('Изучить CSS Grid', Markup.inlineKeyboard(
      [
        Markup.button.url('Справочник', 'https://morphismail.github.io/css-grid-manual/'),
        Markup.button.url('Урок', 'https://youtu.be/yfDwiukzuUQ'),
        Markup.button.url('Игра', 'http://cssgridgarden.com/#ru'),
      ]
    ))
  } catch (e) {
    console.error(e)
  }
})

// Команда /learn_css_flexbox - Изучить CSS Flexbox
bot.command('learn_css_flexbox', async (ctx) => {
  try {
    await ctx.reply('Изучить CSS Flexbox', Markup.inlineKeyboard(
      [
        Markup.button.url('Справочник', 'https://yoksel.github.io/flex-cheatsheet/'),
        Markup.button.url('Урок', 'https://youtu.be/NddTNohooIs')
      ]
    ))
  } catch (e) {
    console.error(e)
  }
})

// Команда /learn_emmet - Быстрая вёрстка Emmet
bot.command('learn_emmet', async (ctx) => {
  try {
    await ctx.reply('Emmet позволяет использовать простые сокращения, которые позволяют очень быстро писать код на HTML и CSS', Markup.inlineKeyboard(
      [
        Markup.button.url('Документация', 'https://t.me/itdoctorstudio/1735'),
        Markup.button.url('Уроки', 'https://www.youtube.com/playlist?list=PLuY6eeDuleIOYCKHrvn65GXvTRTnnGXyI')
      ]
    ))
  } catch (e) {
    console.error(e)
  }
})

// Команда /training_plan_2021 - План обучения в 2021
bot.command('training_plan_2021', async (ctx) => {
  try {
    await ctx.reply('Это план обучения созданию сайтов в 2021 году. Посмотрев видео урок вы узнаете, как можно на моем канале бесплатно научится создавать сайты с 0. Обязательной пользуйтесь схемой-навигатором, там все подробно расписано по пунктам', Markup.inlineKeyboard(
      [
        Markup.button.url('Схема PDF', 'https://t.me/itdoctorstudio/1879'),
        Markup.button.url('Схема SVG', 'https://t.me/itdoctorstudio/1736'),
        Markup.button.url('Урок', 'https://youtu.be/GnF56lwjMb4'),
      ]
    ))
  } catch (e) {
    console.error(e)
  }
})

// Команда /css_generators - CSS генераторы кода
bot.command('css_generators', async (ctx) => {
  try {
    await ctx.reply('Я написал 4 простых, но полезных генератора CSS кода, которые сам постоянно использую в своей работе и хочется всегда держать их под рукой для быстрого доступа. Данный онлайн сервис содержит в себе: Генератор тени блока, Генератор тени текста, Генератор скруглений и Генератор треугольников', Markup.inlineKeyboard(
      [
        Markup.button.url('Генераторы', 'https://morphismail.github.io/myInstruments/'),
        Markup.button.url('Урок', 'https://youtu.be/u337lCjVwmE')
      ]
    ))
  } catch (e) {
    console.error(e)
  }
})

// Команда /materials - Полезные материалы
bot.command('materials', async (ctx) => {
  try {
    await ctx.reply('В этом разделе собраны полезные материалы, которые могут пригодиться любому разработчику', Markup.inlineKeyboard(
      [
        [Markup.button.callback('Репозитироии GitHub', 'btn_category_m1')],
        [Markup.button.callback('Полезные сервисы', 'btn_category_m2')],
        [Markup.button.callback('Иконки', 'btn_category_m3')],
        [Markup.button.callback('3D Моделирование', 'btn_category_m4')],
        [Markup.button.callback('Книги', 'btn_category_m5')],
      ]
      ))
  } catch (e) {
    console.error(e)
  }
})
bot.action('btn_category_m1', async (ctx) => {
  try {
    await ctx.answerCbQuery()
    await ctx.reply('Мои репозитории на GitHub. Вы можете смотреть код который я пишу, а так же читать подробное описание под кодом в файле README и запускать код в некоторых проектах (ссылку вы найдете в разделе About или Environments)', Markup.inlineKeyboard(
      [
        [Markup.button.url('Возможности ссылок', 'https://github.com/morphIsmail/featuresWithLinks')],
        [Markup.button.url('Фикс даты у фото', 'https://github.com/morphIsmail/date-rename')],
        [Markup.button.url('Курс по PHP', 'https://github.com/morphIsmail/learn-php')],
        [Markup.button.url('Курс по Python', 'https://github.com/morphIsmail/learn-python')],
        [Markup.button.url('Дата и время на JS', 'https://github.com/morphIsmail/stringTimeJS')],
        [Markup.button.url('Калькулятор на JS', 'https://github.com/morphIsmail/calculatorJS')],
        [Markup.button.url('Фильмы на Node.js', 'https://github.com/morphIsmail/films_json')],
        [Markup.button.url('Сборка Gulp 4', 'https://github.com/morphIsmail/gulp_build_3')],
        [Markup.button.url('ДМБ таймер', 'https://github.com/morphIsmail/timer')],
      ]
    ))
  } catch (e) {
    console.error(e)
  }
})
bot.action('btn_category_m2', async (ctx) => {
  try {
    await ctx.answerCbQuery()
    await ctx.reply('Полезные сервисы для разработчиков с помощью которых можно упростить и ускорить выполнение многих задач', Markup.inlineKeyboard(
      [
        [Markup.button.url('2 месяца бесплатного хостинга', 'http://handyhost.ru/?ref=101062')],
        [Markup.button.url('Шрифты', 'https://fonts.google.com/')],
        [Markup.button.url('Код онлайн', 'https://codepen.io/')],
        [Markup.button.url('Генератор фона', 'http://bg.siteorigin.com/')],
        [Markup.button.url('Онлайн конвертер', 'https://image.online-convert.com/ru')],
        [Markup.button.url('Палитра цветов', 'https://www.materialpalette.com/')],
        [Markup.button.url('Сделать адаптивное видео', 'http://embedresponsively.com/')],
        [Markup.button.url('Генератор градиента', 'https://www.colorzilla.com/gradient-editor/')],
        [Markup.button.url('Генератор фона', 'http://www.heropatterns.com/')],
        [Markup.button.url('Создать диаграмму', 'https://app.diagrams.net/')],
        [Markup.button.url('Слайдер Swiper', 'https://swiperjs.com/')],
        [Markup.button.url('Слайдер Slick', 'http://kenwheeler.github.io/slick/')]
      ]
    ))
  } catch (e) {
    console.error(e)
  }
})
bot.action('btn_category_m3', async (ctx) => {
  try {
    await ctx.answerCbQuery()
    await ctx.reply('Тут собраны различные полезные сервисы на которых можно скачать иконки или иконочные шрифты для подключения на своем сайте', Markup.inlineKeyboard(
      [
        [Markup.button.url('Font Awesome', 'https://fontawesome.com/')],
        [Markup.button.url('Material Icons', 'https://materializecss.com/icons.html')],
        [Markup.button.url('Иконки Flaticon', 'https://www.flaticon.com/')],
        [Markup.button.url('Fontello', 'https://fontello.com/')],
        [Markup.button.url('Wordpress Dashicons', 'https://developer.wordpress.org/resource/dashicons/')],
        [Markup.button.url('Наборы иконок Icomoon', 'https://icomoon.io/')],
        [Markup.button.url('Bootstrap 5 Icons', 'https://icons.getbootstrap.com/')],
      ]
    ))
  } catch (e) {
    console.error(e)
  }
})
bot.action('btn_category_m4', async (ctx) => {
  try {
    await ctx.answerCbQuery()
    await ctx.reply('В этом разделе собраны полезные сайты, где можно найти модели, текстуры, PBR материалы и многое другое для 3D моделирования', Markup.inlineKeyboard(
      [
        [Markup.button.url('Модели для 3D печати', 'https://www.thingiverse.com/')],
        [Markup.button.url('Текстуры', 'https://www.textures.com/library')],
        [Markup.button.url('HDRI, текстуры, модели', 'https://polyhaven.com/')],
        [Markup.button.url('Чертежи', 'https://www.dimensions.com/')],
        [Markup.button.url('PBR материалы', 'https://ambientcg.com/list?sort=Popular')],
        [Markup.button.url('Чертежи автомобилей', 'http://www.3dcar.ru/blueprints/')],
      ]
    ))
  } catch (e) {
    console.error(e)
  }
})
bot.action('btn_category_m5', async (ctx) => {
  try {
    await ctx.answerCbQuery()
    await ctx.reply('Книги по различным языкам, библиотекам и фреймворкам. Тут собраны только лучшие книги большинство из которых я сам прочитал и могу гарантировать их качество. Так же много задач для программирования на любом языке и отдельно для практика на JavaScript', Markup.inlineKeyboard(
      [
        [Markup.button.url('Книги по HTML и CSS', 'https://t.me/itdoctorstudio/2133')],
        [Markup.button.url('Книги по JavaScript', 'https://t.me/itdoctorstudio/2134')],
        [Markup.button.url('Книги по PHP', 'https://t.me/itdoctorstudio/2135')],
        [Markup.button.url('Книги по Python', 'https://t.me/itdoctorstudio/2139')],
        [Markup.button.url('Задачи по программированию', 'https://t.me/itdoctorstudio/2140')],
        [Markup.button.url('Книга по Git', 'https://t.me/itdoctorstudio/2141')],
      ]
    ))
  } catch (e) {
    console.error(e)
  }
})

// Запустить бота
bot.launch()

// Для удобства в консоле
console.log("Бот запущен")

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))