import { browser } from 'protractor';
import { MainPage } from './pages/MainPage';

describe('test', () => {
  const mainpage = new MainPage();

  beforeEach(async () => {
    await browser.waitForAngularEnabled(false);
  });

  it('should navigate to main page', async () => {
    await mainpage.loadPage();
    const title = await browser.getTitle();
    expect(title).toContain('shopgoodwill.com');
  });

  it('should search for item', async () => {
    await mainpage.searchFor('sony');
  });

  it('should change sort order', async () => {
    expect(await mainpage.changeSortOrder('Sort by price: highest first')).toBe(true);
  });

});
