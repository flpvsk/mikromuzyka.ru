import { makeBlogPost } from '~/layouts/BlogPostLayout';
import Details from '~/shared/Details';
import VideoYouTube from '~/shared/VideoYouTube';

export const meta = {
  title: (
    `Транзисторный фузз с нуля и введение в электронику ` +
    `музыкальных инструментов`
  ),
  heading: (
    `Транзисторный фузз с нуля и введение в электронику ` +
    `музыкальных инструментов`
  ),
  publishDate: '2021-05-31',
  author: 'Микро Музыка',
  image: '/static/blog/mimu3-title.png',
  description: (
    `Как связаны звук и электричество, как анализировать и ` +
    `создавать схемы, как работают самые распространённые ` +
    `компоненты.`
  ),
};

export default makeBlogPost(meta);

Как связаны звук и электричество, как анализировать и
создавать схемы, как работают самые распространённые
компоненты: резисторы, конденсаторы и транзисторы. Всё это
на примере фузз эффекта который я собираю "с нуля".

Видео получилось долгим, в нём много информации. Я старался
хотя бы в общих чертах описать каждый процесс, который
происходит в схеме.

<VideoYouTube id="pRzVncy_d8U" />

## Ссылки

* [Анализ Big Muff (англ)](https://www.electrosmash.com/big-muff-pi-analysis)
* [Анализ Fuzz Face (англ)](https://www.electrosmash.com/fuzz-face)
* [Другой анализ Fuzz Face (англ)](http://www.geofex.com/Article_Folders/fuzzface/fftech.htm)
* [Где взять компоненты](/blog/2021-05-01-kak-nachat-delat-elektronnye-instrumenty-syntezatory-i-effekty/)

