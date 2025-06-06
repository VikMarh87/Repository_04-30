export class ArticleReviewPage {
    constructor (page) {
        this.page = page;
        this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
        this.commentField = page.getByRole('textbox', { name: 'Write a comment...' });
        this.comments = page.locator('.card-text');
        this.articleTitleLocator = page.locator('h1');
    }
    async openArticleTitle(title) {
        const articleTitle = this.page.locator(`.article-preview h1:text-is("${title}")`);
        await articleTitle.click();
    }
    async addArticleComment(comment, title) {
        await this.openArticleTitle(title);
        await this.page.waitForTimeout(500);
        await this.commentField.waitFor({ state: 'visible' })
        await this.commentField.fill(comment);
        await this.postCommentButton.click();     
        return comment;
    }

    async getLastComment() {
        return this.comments.last();
    }
    getTitleLocator(title) {
        return this.page.locator('h1', { hasText: title });
    }
    getBodyLocator(body) {
        return this.page.locator('p', { hasText: body });
    }
    getTagLocator(tag) {
        return this.page.locator('.tag-list .tag-pill', { hasText: tag });
    }
}
