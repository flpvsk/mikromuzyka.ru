import { makeBlogPost } from '~/layouts/BlogPostLayout';
import Details from '~/shared/Details';
import VideoYouTube from '~/shared/VideoYouTube';

export const meta = {
  title: (
    `Фузз, продолжение – ручка тембра и принцип работы ` +
    `электронных фильтров`
  ),
  heading: (
    `Фузз, продолжение – ручка тембра и принцип работы ` +
    `электронных фильтров`
  ),
  publishDate: '2021-06-12',
  author: 'Микро Музыка',
  image: '/static/blog/mimu4-title.png',
  description: (
    `Добавляю ручку тембра к фуззу. Рассказываю как работают ` +
    `простые однополюсовые фильтры низкий и высоких частот.`
  ),
};

export default makeBlogPost(meta);

Добавляю ручку тембра к фуззу. Рассказываю как работают
простые однополюсовые фильтры низкий и высоких частот.

<VideoYouTube id="a6HVf9kf3Gc" />

## Ссылки

* [VCV Rack](https://vcvrack.com)
* [Калькулятор фильтров](http://www.learningaboutelectronics.com/Articles/Low-pass-filter-calculator.php)
* [Анализ Big Muff (англ)](https://www.electrosmash.com/big-muff-pi-analysis)
* [bigmuffpage.com](http://www.bigmuffpage.com)
* [Где взять компоненты](/blog/2021-05-01-kak-nachat-delat-elektronnye-instrumenty-syntezatory-i-effekty/)

