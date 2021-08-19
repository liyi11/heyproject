import Quill from 'quill'

// 自定义a链接
var Link = Quill.import('formats/link')
export class FileBlot extends Link {
  // 继承Link Blot
  static create(value) {
    let node
    if (value && !value.href) {
      // 适应原本的Link Blot
      node = super.create(value)
    } else {
      // 自定义Link Blot
      node = super.create(value.href)
      node.innerText = value.innerText
      node.href = value.href
      node.id = value.id
      node.setAttribute('title', value.innerText)
      node.setAttribute('data-value', value.dataValue)
    }
    return node
  }
}
FileBlot.blotName = 'link'
FileBlot.tagName = 'A'

// 自定义video标签
const BlockEmbed = Quill.import('blots/block/embed')
const ATTRIBUTES = ['height', 'width']
export class Video extends BlockEmbed {
  static create(value) {
    const node = super.create(value)
    // 添加video标签所需的属性
    node.setAttribute('controls', 'controls')
    node.setAttribute('type', 'video/mp4')
    node.setAttribute('src', this.sanitize(value))
    node.setAttribute('class', 'ql-video custom-video')
    return node
  }
  static formats(domNode) {
    return ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute)
      }
      return formats
    }, {})
  }
  static sanitize(url) {
    return Link.sanitize(url) // eslint-disable-line import/no-named-as-default-member
  }
  static value(domNode) {
    return domNode.getAttribute('src')
  }
  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name)
      }
    } else {
      super.format(name, value)
    }
  }
  html() {
    const { video } = this.value()
    return `<a href="${video}">${video}</a>`
  }
}
Video.blotName = 'video' // Video.className = 'ql-video'
Video.tagName = 'video' // 用video标签替换iframe

// 自定义音频标签
export class AudioBlot extends BlockEmbed {
  static create(value) {
    const node = super.create()
    node.setAttribute('controls', true) // 设置audio的controls，否则他将不会显示
    node.setAttribute('controlsList', 'nodownload') // 设置audio的下载功能为不能下载 // node.setAttribute('id', 'voice') //设置一个id
    node.setAttribute('src', value.url) // 设置audio的src属性
    // node.setAttribute('preload', 'none')
    node.setAttribute('class', 'ql-audio custom-audio')
    return node
  }
  static sanitize(url) {
    return Link.sanitize(url)
  }
  static value(node) {
    return {
      url: node.getAttribute('src'),
      controls: node.getAttribute('controls'),
      preload: node.getAttribute('preload')
    }
  }
}
AudioBlot.blotName = 'customAudio'
AudioBlot.tagName = 'audio'
