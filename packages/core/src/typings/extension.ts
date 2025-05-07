import { NodeSpec, Node as PMNode, Schema } from 'prosemirror-model'
import { MarkViewConstructor, NodeViewConstructor } from 'prosemirror-view'
import { Plugin } from 'prosemirror-state'
import type { MarkSpec } from 'prosemirror-model'
import type { SvelteComponent } from 'svelte'

import type { Editor } from '../Editor'
import type { Cmd } from './pm'

export interface ExtensionData {
  commands: { [name: string]: (...args: any[]) => Cmd }
  marks: { [name: string]: MarkSpec }
  markViews: { [name: string]: MarkViewConstructor }
  nodes: { [name: string]: NodeSpec }
  nodeViews: { [name: string]: NodeViewConstructor }
  sortedKeymaps: { [key: string]: { cmd: Cmd; priority: number }[] }
  svelteNodes: { [name: string]: SveltePMNode<any> }
}

export interface Initialized extends ExtensionData {
  plugins: Plugin[]
  schema: Schema
}

export interface NodeProps<T> {
  node: PMNode | undefined
  attrs: T
  contentDOM: (node: HTMLElement) => void
}

export interface NodeAttrs {
  [attr: string]: any
}

export interface SveltePMMark {
  schema?: MarkSpec
  markView?: MarkViewConstructor
}

export interface SveltePMNode<T extends NodeAttrs | undefined> {
  attrs?: T
  selectors?: string[]
  schema?: NodeSpec
  toJSON?: (node: Record<string, any>) => any
  fromJSON?: (node: Record<string, any>) => any
  attrExtractor?: (dom: HTMLElement | string, attr: string) => { [attr: string]: any } | undefined
  nodeView?: (editor: Editor) => NodeViewConstructor
  component?: typeof SvelteComponent<NodeProps<T>>
}

export interface Extension {
  name: string
  opts?: any
  commands?: { [name: string]: (...args: any[]) => Cmd }
  keymaps?: { [key: string]: Cmd | { cmd: Cmd; priority: number }[] }
  store?: Record<string, any>
  marks?: {
    [name: string]: SveltePMMark
  }
  nodes?: {
    [name: string]: SveltePMNode<any>
  }
  init?: (editor: Editor) => void
  plugins?: (editor: Editor, schema: Schema) => Plugin[]
  destroy?: () => void
}

export type ExtObject = { [key in keyof Extensions]: Extensions[key] }
// This interface is augmented by all the other extensions in order to generate type-safe access to their
// data from ExtensionProvider
export interface Extensions {}
export interface EditorCommands {}
export interface Nodes {}
export interface Marks {}
