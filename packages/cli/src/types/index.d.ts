export interface IPluginAPI {
  name: string;
  alias?: string;
  command: string;
  description?: string;
  prompts?: Array<object>;
  onRun: (api: object) => void;
}

export interface IConfig {
  cmd: string[];
  plugins?: Array<IPluginAPI>;
}

export interface IArgs {
  command: string;
  args: string[] | [];
}
