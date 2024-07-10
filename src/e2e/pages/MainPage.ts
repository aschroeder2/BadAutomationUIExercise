import { browser, by, element, ElementArrayFinder, ElementFinder, protractor, WebElement } from 'protractor';

export class MainPage {
    private url = 'http://www.shopgoodwill.com';
    private searchBox = element(by.id('txtGlobalSearch'));
    private searchButton = element(by.id('button-addon2'));
    private searchDropdown = element(by.css('.drop-sort'));


    public async loadPage() {
        browser.get(this.url);
    }

    public async searchFor(item: string) {
        await this.searchBox.click();
        await this.searchBox.sendKeys(item);
        await this.searchButton.click();
    }

    public async changeSortOrder(option: string) {
        await this.searchDropdown.click();
        await this.searchDropdown.sendKeys(option);
        await this.searchDropdown.sendKeys(protractor.Key.ENTER);
        const firstPrice = (await element.all(by.css('.feat-item_price')).first().getText()).replace('$', '').replace(',', '').trim();
        const lastPrice = (await element.all(by.css('.feat-item_price')).last().getText()).replace('$', '').replace(',', '').trim();
        return lastPrice < firstPrice;
    }
}
