import { browser, by, element, ElementArrayFinder, ElementFinder, protractor, WebElement } from 'protractor';

export class MainPage {
    private url = 'http://www.shopgoodwill.com';
    private searchBox = element(by.id('search-text-header'));
    private searchButton = element(by.className('btn btn-default'));
    private searchDropdown = element(by.css('#orderby'));
    private approveCookiesButton = element(by.className('cc-btn cc-dismiss'));


    public async loadPage() {
        browser.get(this.url);
        await this.approveCookiesButton.click();
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
        const firstPrice = (await element.all(by.css('.product-price .price')).first().getText()).replace('$', '').replace(',', '');
        const lastPrice = (await element.all(by.css('.product-price .price')).last().getText()).replace('$', '').replace(',', '');
        return lastPrice < firstPrice;
    }

}
