export interface ActionDialog {
  title: string;
  body: string;
  actions: {
    action: string;
    type: string;
    required?: boolean;
    placeholder?: string;
    defaultValue?: any;
    minValue?: number;
    maxValue?: number
  }[]
}
