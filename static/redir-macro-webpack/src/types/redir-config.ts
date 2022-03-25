export interface MacroConfigUI {
  type: string,
  selectedContent: string,
  selectedSpace: string,
  link: string,
  options: string[],
  countdown: string,
}

export interface Config {
  type: "internal" | "external",
  visible: boolean,
  redirectable: boolean,
  countdown: number
  location: {
    title: string,
    link: string
  }
}