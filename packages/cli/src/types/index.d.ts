import { Interface } from 'readline';

export interface IPluginAPI {
  name: string;
  alias?: string;
  command: string;
  description?: string;
  prompts?: Array<object>;
  onRun: (api: object) => void;
}

export interface IConfig {
  command: string[];
  args?: object;
}

export interface IOpt {
  config: IConfig;
  plugins?: Array<IPluginAPI>;
}
