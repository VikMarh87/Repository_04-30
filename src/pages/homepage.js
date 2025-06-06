export class HomePage {
    constructor (page) {
        this.page = page;
        this.heartButton = page.locator('button:has(.counter:has-text("( 0 )"))').first();
        this.userImageButton = page.getByRole('banner').getByText('Victoria_M');
        this.globalFeedTab = page.getByRole('button', { name: 'Global Feed' });
        this.favouriteArticlesTab = page.getByRole('link', { name: 'Favorited Articles' });
        this.profileLink = page.getByRole('link', { name: ' Profile' });
    }
    async gotoGlobalFeedTab() {
        await this.globalFeedTab.click();
    }
    async likeFirstUnlikedArticle() {
        const heartButton = this.page.locator('button:has(.counter:has-text("( 0 )"))').first();
        const articleContainer = heartButton.locator('xpath=ancestor::*[contains(@class, "article-preview")]');
        const titleLocator = articleContainer.locator('h1');
        const title = await titleLocator.first().innerText();
        await heartButton.click();
        return title;
    }
    async isArticleInFavourites(title) {
        await this.userImageButton.click();
        await this.profileLink.click();
        await this.favouriteArticlesTab.click();
        await this.page.waitForTimeout(1000);
        const articleTitle = this.page.locator(`.article-preview h1:text-is("${title}")`);
        return await articleTitle.isVisible();
    }
    async removeArticleFromFavourites(title) {
        await this.userImageButton.click();
        await this.profileLink.click();
        await this.favouriteArticlesTab.click();
        //await this.page.waitForTimeout(1000);
        await this.page.waitForSelector('.article-preview h1', { timeout: 5000 });
        const articleContainer = this.page.locator('.article-preview', { hasText: title });
        if (await articleContainer.count() === 0) {
        console.warn(`Article with title "${title}" not found in favorites for removal`);
        return;
    }
        const heartButton = articleContainer.locator('button');
        await heartButton.click();
        await this.page.waitForTimeout(1000);
    }
} 