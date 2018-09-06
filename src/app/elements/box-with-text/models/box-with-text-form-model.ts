import {FormFieldsModel} from '../../models/form-fields';

export const BoxWithTextFormModel: Array<FormFieldsModel> = [
  new FormFieldsModel('text', 'text', 'Text'),
  new FormFieldsModel('color', 'text', 'Text Color'),
  new FormFieldsModel('border', 'text', 'Border Color'),
  new FormFieldsModel('border-radius', 'number', 'Border Radius'),
  new FormFieldsModel('backgroundColor', 'text', 'Background Color'),
  new FormFieldsModel('height', 'number', 'Height'),
  new FormFieldsModel('width', 'number', 'Width'),
];
