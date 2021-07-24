import { IndexController } from '../IndexController';
import { mockReq, mockRes } from 'sinon-express-mock'

describe('IndexController', () => {
  describe('index', () => {
    test('index show', async () => {
      const controller = new IndexController;

      const req = mockReq({});

      const res = await controller.index(req);
      expect(res?.a).toBe(1);
    })
  })
})
