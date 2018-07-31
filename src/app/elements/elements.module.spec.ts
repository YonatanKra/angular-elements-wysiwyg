import { ElementsModule } from './elements.module';

xdescribe('ElementsModule', () => {
  let elementsModule: ElementsModule;

  beforeEach(() => {
    elementsModule = new ElementsModule();
  });

  it('should create an instance', () => {
    expect(elementsModule).toBeTruthy();
  });
});
