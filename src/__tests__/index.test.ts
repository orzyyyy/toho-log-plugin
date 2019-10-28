import Plugin from '../';

describe('index', () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  afterAll(() => {
    logSpy.mockRestore();
  });

  it('default options with constructor', () => {
    let plugin: any = new Plugin({});
    expect(plugin.options).toEqual({ dev: true, defaultWords: false, isPray: true });
    plugin = new Plugin({ defaultWords: true });
    expect(plugin.options).toEqual({ dev: true, defaultWords: true, isPray: true, path: '../word.json' });
  });
});
