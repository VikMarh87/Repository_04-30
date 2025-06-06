import { MainPage, HomePage, LoginPage, RegisterPage, YourFeedPage, SettingsPage, ArticleCreationPage, ArticleReviewPage} from './index';

export class App {
    constructor (page) {
        this.page = page;
        this.mainPage = new MainPage(page);
        this.homePage = new HomePage(page);
        this.registerPage = new RegisterPage(page);
        this.yourFeedPage = new YourFeedPage(page);
        this.loginPage = new LoginPage(page);
        this.settingsPage = new SettingsPage(page);
        this.articleCreationPage = new ArticleCreationPage(page);
        this.articleReviewPage = new ArticleReviewPage(page);

}
}