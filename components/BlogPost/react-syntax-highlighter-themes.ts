import { CSSProperties } from 'react'

export const dracula: { [key: string]: CSSProperties } = {
  'code[class*="language-"]': {
    color: '#000',
    background: 'none',
    // textShadow: '0 1px rgba(0, 0, 0, 0.3)',
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    textAlign: 'left',
    whiteSpace: 'pre',
    wordBreak: 'normal',
    wordWrap: 'normal',
    letterSpacing: '.05em',
    lineHeight: '1.5',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#000',
    background: '#e7e7e7',
    // textShadow: '0 1px rgba(0, 0, 0, 0.3)',
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '2',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    padding: '1em',
    margin: '.5em 0',
    overflow: 'auto',
    borderRadius: '0.3em',
  },
  ':not(pre) > code[class*="language-"]': {
    background: '#282a36',
    padding: '.1em',
    borderRadius: '.3em',
    whiteSpace: 'normal',
  },
  comment: {
    color: '#848dab',
    fontWeight: 'light',
  },
  prolog: {
    color: '#6272a4',
  },
  doctype: {
    color: '#6272a4',
  },
  cdata: {
    color: '#6272a4',
  },
  punctuation: {
    color: '#000',
  },
  '.namespace': {
    opacity: '.7',
  },
  property: {
    color: '#3d4dfc',
  },
  tag: {
    color: '#ff2ba5',
    fontWeight: 'bold',
  },
  constant: {
    color: '#b218f5',
    fontWeight: 'bold',
  },
  symbol: {
    color: '#fc3d80',
    fontWeight: 'bold',
  },
  deleted: {
    color: '#ff79c6',
  },
  boolean: {
    color: '#6539a3',
  },
  number: {
    color: '#000',
  },
  selector: {
    color: '#0cc92d',
    fontWeight: 'light',
  },
  'attr-name': {
    color: '#089e2e',
  },
  string: {
    color: '#000',
    fontWeight: 'bold',
  },
  char: {
    color: '#4230ff',
    fontWeight: 'bold',
  },
  builtin: {
    color: '#4f3efa',
  },
  inserted: {
    color: '#50fa7b',
  },
  operator: {
    color: '#000',
  },
  entity: {
    color: '#000',
    cursor: 'help',
  },
  url: {
    color: '#2547f5',
  },
  '.language-css .token.string': {
    color: '#000',
  },
  '.style .token.string': {
    color: '#000',
  },
  variable: {
    color: '#ad0cf7',
    fontWeight: 'bold',
  },
  atrule: {
    color: '#ee61fa',
  },
  'attr-value': {
    color: '#ee61fa',
  },
  function: {
    color: '#23a0fa',
    fontWeight: 'bold',
  },
  'class-name': {
    color: '#b8670b',
    fontWeight: 'bold',
  },
  class: {
    color: '#b8670b',
    fontWeight: 'bold',
  },
  keyword: {
    color: '#9634f7',
    fontWeight: 'bold',
  },
  regex: {
    color: '#ffb86c',
  },
  important: {
    color: '#c73e0c',
    fontWeight: 'bold',
  },
  bold: {},
  italic: {
    fontStyle: 'italic',
  },
}
