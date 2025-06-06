export class ArticleCreationPage {
    constructor (page) {
        this.page = page;
        this.publishArticleButton = page.getByRole('button', { name: 'Publish Article' });
        this.articleLink = page.getByRole('link', { name: 'New Article' }); //link to open article creation page
        this.articleBody = page.getByRole('textbox', { name: 'Write your article (in' });
        this.articleDescription = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.articleTag = page.getByRole('textbox', { name: 'Enter tags' });
        this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
    }
    async gotoArticleCreationPage() {
        await this.articleLink.click();
    }
    async articleCreation(article) {
        const { body, description, tag, title } = article;
        await this.articleTitle.fill(title);
        await this.articleDescription.fill(description);
        await this.articleBody.fill(body);
        await this.articleTag.fill(tag);
        await this.publishArticleButton.click();  
        }
}