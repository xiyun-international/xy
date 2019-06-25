import { Interface } from 'readline';

export interface IPluginAPI {
  name: string;
  alias?: string;
  command: string;
  description?: string;
  prompts?: Array<object>;
  onRun: (api: object) => void;
}

export interface IOpt {
  plugins?: Array<IPluginAPI>;
}
