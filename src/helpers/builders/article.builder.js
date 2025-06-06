import { faker } from '@faker-js/faker';

export class ArticleBuilder {
    addBody() {
        this.body = faker.lorem.sentence() ;
        return this;
    }
    addDescription() {
    this.description = faker.lorem.sentence();
    return this;
    }
    addTag() {
        this.tag = faker.book.genre();
        return this;
    }
    addTitle() {
        this.title = faker.music.album();
        return this;
    }
    generate() {
        return{
            body: this.body,
            description: this.description,
            tag: this.tag,
            title: this.title
        };
    }
}