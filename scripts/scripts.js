class FetchData {
    getResourse = async url => {
        const res = await fetch(url);


        if(!res.ok){
            throw new error('ошибка:' + res.status) 
        }


        return res.json();
    }

    getPost = async () => await this.getResourse('db/database.json');
    
}

 const obj = new FetchData()
 
 
 obj.getPost().then((data) => {
    console.log(data)
 });

class Twitter{
    constructor({listElem}){
        const fetchData = new FetchData()
        this.tweets = new Posts();
        this.elements = {
            listElem: document.querySelector(listElem)
        }

        fetchData.getPost()
            .then(data =>{
                 data.forEach(this.tweets.addPost)
                 this.showAllPost()
                 });
        
    }

    renderPosts(tweets){
        this.elements.listElem.textContent = '';

        tweets.forEach(({ id, username, nickname, pubDate, text, img, likes, getDate }) => {
            this.elements.listElem.insertAdjacentHTML('beforeend', `	
            <li>
            <article class="tweet">
                <div class="row">
                    <img class="avatar" src="images/${nickname}.jpg" alt="Аватар пользователя ${username}">
                    <div class="tweet__wrapper">
                        <header class="tweet__header">
                            <h3 class="tweet-author">${username}
                                <span class="tweet-author__add tweet-author__nickname">@${nickname}</span>
                                <time class="tweet-author__add tweet__date">${getDate()}</time>
                            </h3>
                            <button class="tweet__delete-button chest-icon" data-id="${id}"></button>
                        </header>
                        <div class="tweet-post">
                            <p class="tweet-post__text">${text}</p>
                            ${img ?
                                `<figure class="tweet-post__image">
                                <img src="${img}" alt="${nickname}">
                            </figure>`:
                        ''}
                        </div>
                    </div>
                </div>
                <footer>
                    <button class="tweet__like">
                        ${likes}
                    </button>
                </footer>
            </article>
        </li>`)
        })
    }

    showUserPost(){
        
    }

    showLikesPost(){

    }

    openModal(){

    }

    showAllPost(){
        this.renderPosts(this.tweets.posts)
    }

}

class Posts{
    constructor({posts = []} = {}) {
        this.posts = posts;
       
    }

    addPost = (tweets) => {
        this.posts.push(new Post (tweets));
    }

    deletePost(id){

    }
    
    likePost(id){

    }
};


class Post{
    constructor({ id, username, nickname, pubDate, text, img, likes = 0}){
        this.id = id || this.generateID();
        this.username = username;
        this.nickname = nickname;
        this.pubDate = pubDate ? new Date(pubDate) : new Date();
        this.text = text;
        this.img = img;
        this.likes = likes;
        this.liked = false;

    };


    changeLike() {
        this.liked = !this.liked;
        if(this.liked){
            this.likes++;
        }else {
            this.likes--;
        };
    };

    generateID(){
        return Math.random().toString(32).substring(2,9) + (+new Date).toString(32);

    }


    getDate = () => {

        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minutes: '2-digit',

        };

        return this.pubDate.toLocaleString('ru-RU', options)
    }

};

const twitter = new Twitter({
    listElem: '.tweet-list'

})

