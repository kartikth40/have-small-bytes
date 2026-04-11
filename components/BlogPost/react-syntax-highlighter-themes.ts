import { CSSProperties } from 'react'

export const dracula_light: { [key: string]: CSSProperties } = {
  'code[class*="language-"]': {
    color: '#000',
    background: 'none',
    // textShadow: '0 1px rgba(0, 0, 0, 0.3)',
    fontFamily:
      "var(--font-source-code-pro) ,Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    textAlign: 'left',
    whiteSpace: 'pre',
    wordBreak: 'normal',
    wordWrap: 'normal',
    letterSpacing: '.05em',
    lineHeight: '2',
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
    background: '#efefef',
    border: '1px solid #d0d0d0',
    // textShadow: '0 1px rgba(0, 0, 0, 0.3)',
    fontFamily:
      "var(--font-source-code-pro) ,Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
    overflow: 'auto',
  },
  ':not(pre) > code[class*="language-"]': {
    fontFamily:
      "var(--font-source-code-pro) ,Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
    color: '#fc0599',
    fontWeight: 'normal',
  },
  constant: {
    color: '#b218f5',
    fontWeight: 'normal',
  },
  symbol: {
    color: '#ff0f63',
    fontWeight: 'normal',
  },
  deleted: {
    color: '#ff79c6',
  },
  boolean: {
    color: '#7519f7',
  },
  number: {
    color: '#000',
  },
  selector: {
    color: '#4aaaff',
    fontWeight: 'light',
  },
  'attr-name': {
    color: '#4aaaff',
  },
  string: {
    color: '#000',
    fontWeight: 'normal',
  },
  char: {
    color: '#7c70fa',
    fontWeight: 'normal',
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
    fontWeight: 'normal',
  },
  atrule: {
    color: '#eb05ff',
  },
  'attr-value': {
    color: '#eb05ff',
  },
  function: {
    color: '#027eeb',
    fontWeight: 'normal',
  },
  'class-name': {
    color: '#88c914',
    fontWeight: 'normal',
  },
  class: {
    color: '#88c914',
    fontWeight: 'normal',
  },
  keyword: {
    color: '#8100ff',
    fontWeight: 'normal',
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

export const dracula_dark: { [key: string]: CSSProperties } = {
  'code[class*="language-"]': {
    color: '#abb2bf',
    background: 'none',
    fontFamily:
      "var(--font-source-code-pro) ,Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    textAlign: 'left',
    whiteSpace: 'pre',
    wordBreak: 'normal',
    wordWrap: 'normal',
    letterSpacing: '.05em',
    lineHeight: '2',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#abb2bf',
    background: '#1e2127',
    border: '1px solid #2e3138',
    fontFamily:
      "var(--font-source-code-pro) ,Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
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
    overflow: 'auto',
  },
  ':not(pre) > code[class*="language-"]': {
    fontFamily:
      "var(--font-source-code-pro) ,Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    background: '#1e2127',
    padding: '.1em',
    borderRadius: '.3em',
    whiteSpace: 'normal',
  },
  comment: {
    color: '#5c6370',
    fontStyle: 'italic',
  },
  prolog: { color: '#5c6370' },
  doctype: { color: '#5c6370' },
  cdata: { color: '#5c6370' },
  punctuation: { color: '#abb2bf' },
  '.namespace': { opacity: '.7' },
  property: { color: '#e06c75' },
  tag: { color: '#e06c75' },
  constant: { color: '#d19a66' },
  symbol: { color: '#d19a66' },
  deleted: { color: '#e06c75' },
  boolean: { color: '#d19a66' },
  number: { color: '#d19a66' },
  selector: { color: '#98c379' },
  'attr-name': { color: '#d19a66' },
  string: { color: '#98c379' },
  char: { color: '#98c379' },
  builtin: { color: '#56b6c2' },
  inserted: { color: '#98c379' },
  operator: { color: '#56b6c2' },
  entity: { color: '#e5c07b', cursor: 'help' },
  url: { color: '#56b6c2' },
  '.language-css .token.string': { color: '#98c379' },
  '.style .token.string': { color: '#98c379' },
  variable: { color: '#e06c75' },
  atrule: { color: '#c678dd' },
  'attr-value': { color: '#98c379' },
  function: { color: '#61afef' },
  'class-name': { color: '#e5c07b' },
  class: { color: '#e5c07b' },
  keyword: { color: '#c678dd' },
  regex: { color: '#d19a66' },
  important: { color: '#e06c75', fontWeight: 'bold' },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
}
