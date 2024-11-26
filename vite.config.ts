import { defineConfig } from 'vite'

const jsToBottomNoModule = () => {
  return {
    name: "no-attribute",
    transformIndexHtml(html) {
      html = html.replace(`type="module" crossorigin`, "")
      const match = html.match(/<script[^>]*>(.*?)<\/script[^>]*>/)
      if (match) {
        const scriptTag = match[0]
        html = html.replace(scriptTag, "")
        html = html.replace("<!-- # INSERT SCRIPT HERE -->", scriptTag)
      }
      return html;
    }
  }
}

export default defineConfig({
  plugins: [jsToBottomNoModule()],
  build: {
    rollupOptions: {
      input: {
        home: '/index.html',
        game: '/game.html',
        level: '/level.html',
        score: '/score.html'
      }
    }
  }
})