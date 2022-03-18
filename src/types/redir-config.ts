export interface MacroConfigUI {
  type: string,
  selectedContent: string,
  selectedSpace: string,
  link: string,
  options: string[],
  countdown: string,
}

export interface InternalLocation {
  selectedSpace: string,
  selectedContent: string
}

export interface ExternalLocation {
  link: string
}

export interface Config<T = InternalLocation> {
  type: "internal" | "external",
  visible: boolean,
  redirectable: boolean,
  countdown: number
  properties: T
}