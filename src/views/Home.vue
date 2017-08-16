<template>
  <div class="page">
    <section class="branding">
      <h1 class="site-logo">
        <img src="../images/dd.png" alt="" width="120">
        <span>DevDocs Desktop</span>
      </h1>
      <div class="downloads">
        <no-ssr>
          <a class="button" :href="downloadURL">
            Download for {{ os }} (v{{ version }})
          </a>
        </no-ssr>
        <a href="https://github.com/egoist/devdocs-desktop/releases/latest" class="button button-github">
          <svg id="i-github" viewBox="0 0 64 64" width="32" height="32">
            <path stroke-width="0" fill="currentColor" d="M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z" />
          </svg>
          &nbsp;&nbsp;More
        </a>
      </div>
    </section>

    <section class="preview">
      <h2>Features</h2>
      <ul class="preview-tabs">
        <li
          v-for="(preview, index) in previews"
          :key="index"
          class="preview-tab"
          :class="{selected: index === currentPreview}"
          @click="selectPreview(index)">
          {{ preview.title }}
        </li>
      </ul>
      <div class="preview-sources">
        <div class="preview-source" v-for="(preview, index) in previews" :key="index" v-show="index === currentPreview">
          <img v-if="preview.src" :src="preview.src" alt="" :style="preview.style">
          <div class="preview-subtitle">
            /* {{ preview.subtitle }} */
          </div>
        </div>
      </div>
    </section>
    <footer class="credits">
      The app is built on top of <strong>DevDocs.io</strong> with <strong>Electron</strong> by <a href="https://github.com/egoist">EGOIST</a>.
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
import NoSSR from 'vue-no-ssr'
import { getOS } from '../utils'

export default {
  head() {
    return {
      title: 'DevDocs Desktop',
      meta: [{
        name: 'description',
        content: 'Unofficial dekstop app for DevDocs.io'
      }]
    }
  },
  data() {
    return {
      os: getOS(),
      version: '0.6.6',
      previews: [{
        title: 'Searchable',
        subtitle: 'Find relevant docs with ease',
        src: require('../previews/search.png')
      }, {
        title: 'In-page Search',
        subtitle: 'Like how you can do in browser',
        src: require('../previews/in-page-search.png')
      }, {
        title: 'Dark Mode',
        subtitle: 'Take care of your eyes',
        src: require('../previews/dark-mode.png')
      }, {
        title: 'Adjust Text Size',
        subtitle: 'Make the text as big/small as you want',
        src: require('../previews/text-size.png'),
        style: {
          margin: '30px 0'
        }
      }, {
        title: 'Custom JS/CSS',
        subtitle: 'Inject JS/CSS scripts into the app',
        src: require('../previews/custom-js-css.png'),
        style: {
          margin: '30px 0'
        }
      }, {
        title: 'Tabs',
        subtitle: 'Coming soon...'
      }],
      currentPreview: 0
    }
  },
  computed: {
    downloadURL() {
      const prefix = `https://github.com/egoist/devdocs-desktop/releases/download/v${this.version}/`
      return this.os === 'macOS' ?
        `${prefix}DevDocs-${this.version}.dmg` :
        this.os === 'Windows' ?
        `${prefix}DevDocs-Setup-${this.version}.exe` :
        `${prefix}DevDocs-${this.version}-x86_64.AppImage`
    }
  },
  created() {
    this.fetchVersion()
  },
  methods: {
    selectPreview(index) {
      this.currentPreview = index
    },
    fetchVersion() {
      return axios.get('https://api.github.com/repos/egoist/devdocs-desktop/releases/latest').then(res => {
        this.version = res.data.tag_name.slice(1)
      }).catch(err => {
        console.error(err)
      })
    }
  },
  components: {
    'no-ssr': NoSSR
  }
}
</script>

<style lang="stylus" scoped>
  .branding
    padding: 60px 0
    background: #f9f9f9

  .site-logo
    display: flex
    height: 100px
    align-items: center
    justify-content: center
    font-weight: 400
    font-size: 2.2rem
    flex-direction: column
    span
      margin-left: 10px

  .downloads
    margin-top: 80px
    display: flex
    align-items: center
    justify-content: center

  .button-github
    margin-left: 10px
    display: flex
    align-items: center
    svg
      width: 20px
      height: @width

  .preview
    text-align: center
    padding: 40px 0
    h2
      font-weight: 300
      font-size: 2rem
      color: #333
    .preview-tabs
      list-style: none
      padding: 20px 0
      margin: 0
      display: flex
      align-items: center
      justify-content: center
      .preview-tab
        cursor: pointer
        padding: 10px 20px
        color: #777
        font-size: 1rem
        user-select: none
        &:not(.selected):hover
          color: #333
        &.selected
          background: #f0f0f0
    .preview-source
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      img
        max-width: 60%
    .preview-subtitle
      color: #bd10e0
      font-size: 1.2rem

  footer.credits
    padding: 60px 10px
    margin-top: 20px
    text-align: center
    font-size: 1.2rem
    border-top: 1px solid #e2e2e2
    a
      color: black

@media screen and (max-width: 768px)
  .preview-tabs
    flex-direction: column
</style>
