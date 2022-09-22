import { makeBlogPost } from '~/layouts/BlogPostLayout';
import Details from '~/shared/Details';
import VideoYouTube from '~/shared/VideoYouTube';

export const meta = {
  title: (
    `Самый простой осциллятор`
  ),
  heading: (
    `Самый простой осциллятор`
  ),
  publishDate: '2021-10-02',
  author: 'Микро Музыка',
  image: '/static/blog/mimu5-title.png',
  description: (
    `Начинаю погружение в синтез с простого осциллятора, ` +
    `который может работать как в аудио так и в ` +
    `CV диапазонах.`
  ),
};

export default makeBlogPost(meta);

Делаю простой осциллятор на основе Шмитт-Триггер-Инвертoра.
Рассказываю про то как устроены "серьёзные" модули
осцилляторов и для чего их используют.

<VideoYouTube id="aARaefvmTDk" />

## Ссылки

* [Видео про этот осциллятор от Casper Electronics](https://www.youtube.com/watch?v=FaoJaLmZaL4)
* [VCV Rack](https://vcvrack.com)
* [Калькулятор фильтров](http://www.learningaboutelectronics.com/Articles/Low-pass-filter-calculator.php)
* [Где взять компоненты](/blog/2021-05-01-kak-nachat-delat-elektronnye-instrumenty-syntezatory-i-effekty/)

