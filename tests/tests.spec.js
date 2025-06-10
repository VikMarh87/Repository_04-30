import { expect } from '@playwright/test';
import { test } from '../src/helpers/fixtures/index';
import { UserBuilder } from '../src/helpers/builders/index';
import dotenv from 'dotenv';
dotenv.config();
import { ArticleBuilder } from '../src/helpers/builders/index';

test.describe.parallel('General tests', () => {
  test('1. User registration', async ({ regPageWithUser }) => {
    const { app, randomUser } = regPageWithUser;
    await expect(app.yourFeedPage.profileNameField).toContainText(randomUser.username);
  });

  test('2. Login with valid credentials', async ({ loginWithUser }) => {
    const { app, registeredUser } = loginWithUser;
    await app.loginPage.login(registeredUser);
    await expect(app.yourFeedPage.profileNameField).toContainText(registeredUser.username);
  });

  test('3. Error message when logging in with an invalid password', async ({ errorWhenLogin }) => {
    const { app, incorrectUser } = errorWhenLogin;
    await app.loginPage.incorrectLogin(incorrectUser);
    await expect(app.loginPage.errorText).toBeVisible();
  });

  test('4. Logged in User can add a comment to an article', async ({ addArticleComment }) => {
    const { app, comment } = addArticleComment;
    const lastComment = await app.articleReviewPage.getLastComment();
    await expect(lastComment).toHaveText(comment);
  });
});

test.describe.serial('Profile and favourites tests', () => {
  test('5. Logged in User can update profile data in Settings', async ({ updateSettings }) => {
    const { app, registeredUser } = updateSettings;
    await expect(app.settingsPage.updatedUsernameText).toBeVisible();
  });

  test('6. Logged in User can create a new article', async ({ createArticle }) => {
    const { app, registeredUser, article } = createArticle;
    await expect(app.articleReviewPage.getTitleLocator(article.title)).toHaveText(article.title);
    await expect(app.articleReviewPage.getBodyLocator(article.body)).toHaveText(article.body);
    await expect(app.articleReviewPage.getTagLocator(article.tag)).toContainText(article.tag);
  });

  test('7. Logged in User can add an article to favourites and then open it from the profile', async ({ markArticleAsFavourite }) => {
    const { app, likedTitle } = markArticleAsFavourite;
    const isInFavourites = await app.homePage.isArticleInFavourites(likedTitle);
    await expect(isInFavourites).toBeTruthy();
  });
});