
export class Post{
    constructor(userId,postId,title,body) {
        this._userId=userId;
        this._postId=postId;
        this._title=title;
        this._body=body;
    }
    get userId() {
        return this._userId;
    }
    get postId() {
        return this._postId;
    }
    get title() {
        return this._title;
    }
    get body() {
        return this._body;
    }

}

export default Post;
