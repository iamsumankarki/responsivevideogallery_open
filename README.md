# Responsive Video Gallery

With semantic HTML, CSS Grid and vanilla JavaScript, create a responsive video gallery with videos from YouTube and Vimeo.

Each `<article>` has a `<figure>` with an `<img>` and a `<button>`. The `<iframe>` doesn't load in the grid. On click, a `<dialog>` element loads the video.

The `<img src>` is a YouTube (or Vimeo) thumbnail link. The following are examples of urls with ids, and how to find the `<img src>`.

```html
<!-- YouTube urls with video id -->
https://www.youtube.com/watch?v=szRgEyiX6Sk https://youtu.be/szRgEyiX6Sk

<!-- YouTube thumbnail src -->
https://img.youtube.com/vi/szRgEyiX6Sk/mqdefault.jpg

<!-- Vimeo url with video id -->
https://vimeo.com/7533229

<!--
The Vimeo thumbnail src is embedded in the page source code.
Right click on the Vimeo page and 'View Page Source'.
Search for an og:image meta tag to find the thumbnail.
-->
<meta property="og:image:secure_url" content="https://i.vimeocdn.com/video/632046499-3b7d2a63050fe87a8f3be5f58e4d913a36b3b2c84f9c19c67b055e98e6e4f05b-d?f=webp®ion=us" />

<!-- Vimeo thumbnail url -->
https://i.vimeocdn.com/video/632046499-3b7d2a63050fe87a8f3be5f58e4d913a36b3b2c84f9c19c67b055e98e6e4f05b-d?f=webp®ion=us
```
