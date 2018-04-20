import { StoreAppHttpPage } from './app.po';

describe('store-app-http App', () => {
  let page: StoreAppHttpPage;

  beforeEach(() => {
    page = new StoreAppHttpPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
