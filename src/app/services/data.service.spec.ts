import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import {ElementSpecs} from '../elements/models/element-specs';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
    service = TestBed.get(DataService);
  });

  function createData() {
    const data = [];
    for (let i = 0; i < Math.random() * 100 + 10; i++) {
      data.push(new ElementSpecs());
      data[i].type = Math.random().toString();
    }
    return data;
  }

  describe('update data', () => {
    it('should emit an event with the new data', inject([DataService], (service: DataService) => {
      spyOn(service.canvasData, 'emit').and.returnValue(true);
      const data = createData();
      service.updateCanvasData(data);
      expect(service.canvasData.emit).toHaveBeenCalledWith(data);
    }));

    it('should cache the data', () => {
      const data = createData();
      service.updateCanvasData(data);
      spyOn(service.canvasData, 'emit').and.returnValue(true);
      service.getCanvasData(true);
      expect(service.canvasData.emit).toHaveBeenCalledWith(data);
    });
  });

  describe('get data', () => {
    let data: Array<ElementSpecs>;
    beforeEach(() => {
      data = createData();
      service.updateCanvasData(data);
    });

    it ('should emit new data', () => {
      let newData = [];
      service.updateCanvasData(data);
      spyOn(service.canvasData, 'emit').and.callFake(someData => newData = someData);
      service.getCanvasData();
      expect(service.canvasData.emit).toHaveBeenCalledWith(newData);
    });

    it('should emit the cached data if param is true', () => {
      let cachedData = [];
      service.updateCanvasData(data);
      spyOn(service.canvasData, 'emit').and.callFake(someData => cachedData = someData);
      service.getCanvasData(true);
      expect(service.canvasData.emit).toHaveBeenCalledWith(data);
    });
  });
});
