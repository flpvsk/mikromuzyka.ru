import { makeWorkItem } from '../layouts/WorkItem';

export default makeWorkItem({
  id: 'Polychops',
  title: 'Polychops / Software for musicians',
  logo: '/static/logo-polychops.svg',
  links: [
    {
      svgName: 'play',
      text: 'Watch demo',
      href: 'https://youtu.be/meLO5KtHv0U'
    },
    {
      svgName: 'link',
      text: 'polychops.com',
      href: 'https://polychops.com'
    }
  ],
});

Polychops is a fun practice tool for musicians.

It's a personal passion of mine. It started off with an idea for a
polyrhythmic metronome and evolved into a drum machine and a looper that
work in your web browser.

I'm still working on the app in my free time, doing research, ideation
and implementation.

Polychops launched in September 2018.
