import { addBug, loadBugs, resolveBug, getUnresolvedBugs } from '../bug';
import configureStore from '../configureStore';

import axios from 'axios';
import mockAdapter from 'axios-mock-adapter';
import entities from '../entities';

describe('bugsSlice', () => {
  let store;
  let fakeAxios;

  beforeEach(() => {
    store = configureStore();
    fakeAxios = new mockAdapter(axios);
  });
  const bugSlice = () => store.getState().entities.bugs;

  const createState = () => ({ entities: { bugs: { list: [] } } });

  describe('loading bugs', () => {
    describe('if the bug exist in the cache', () => {
      it('they should not be fetch from the server again', async () => {
        fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });
    describe('if the bug dont exist in the cache', () => {
      it('they should be fetch from the server and put in the store', async () => {
        fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(bugSlice().list).toHaveLength(1);
      });
      describe('loading indicator', () => {
        it('should be true while fetching bugs', () => {
          fakeAxios.onGet('/bugs').reply(() => {
            //before the server response
            expect(bugSlice().loading).toBe(true);

            return [200, [{ id: 1 }]];
          });

          store.dispatch(loadBugs());
        });
        it('should be false after the bugs are fetched', async () => {
          fakeAxios.onGet('/bugs').reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());

          expect(bugSlice().loading).toBe(false);
        });
        it('should be false if the server returns an error', async () => {
          fakeAxios.onGet('/bugs').reply(500);

          await store.dispatch(loadBugs());

          expect(bugSlice().loading).toBe(false);
        });
      });
    });
  });

  it('should add the bug to store if it save to server', async () => {
    const bug = { description: 'a' };
    const saveBug = { ...bug, id: 1 };
    fakeAxios.onPost('/bugs').reply(200, saveBug);

    await store.dispatch(addBug(bug));

    expect(bugSlice().list).toContainEqual(saveBug);
  });
  it("should mark the bug as resolvedif it 's saved to the server", async () => {
    fakeAxios.onPatch('/bugs/1').reply(200, { id: 1, resolved: true });
    fakeAxios.onPost('/bugs').reply(200, { id: 1 });

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugSlice().list[0].resolved).toBe(true);
  });
  it("should not mark the bug as resolvedif it 's not saved to the server", async () => {
    fakeAxios.onPatch('/bugs/1').reply(500, { id: 1, resolved: true });
    fakeAxios.onPost('/bugs').reply(200, { id: 1 });

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugSlice().list[0].resolved).not.toBe(true);
  });

  it('should not add the bug to store if it not save to server', async () => {
    const bug = { description: 'a' };
    fakeAxios.onPost('/bugs').reply(500);

    await store.dispatch(addBug(bug));

    expect(bugSlice().list).toHaveLength(0);
  });

  describe('selectors', () => {
    it('getUnresolvedBugs', () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2 },
        { id: 3 },
      ];
      const result = getUnresolvedBugs(state);
      expect(result).toHaveLength(2);
    });
  });
});
