import { makeAutoObservable,  runInAction } from "mobx";

export default class WordStore {

    words = [];
    isLoaded = false;
    error = '';

    constructor() {
        makeAutoObservable(this);
    }

    loadData = () => {
        fetch('https://cors-everywhere.herokuapp.com/http://itgirlschool.justmakeit.ru/api/words')
            .then((result) => {
                if (result.ok) {
                    return result.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then((words) => {
                runInAction(() => {
                    this.words = words;
                    this.isLoaded = true;
                });
            }).catch(error => {
                this.isLoaded = true;
                this.error = error;
            });
    }

    add = (newWord) => {
        fetch('https://cors-everywhere.herokuapp.com/http://itgirlschool.justmakeit.ru/api/words/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newWord)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(() => this.loadData())
            .catch(error => {
                this.error = error;
            });
    }


    remove = (id) => {
        fetch(`https://cors-everywhere.herokuapp.com/http://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(() => this.loadData())
            .catch(error => {
                this.isLoaded = true;
                this.error = error;
            });
    }

    update = (id, data) => {
        fetch(`https://cors-everywhere.herokuapp.com/http://itgirlschool.justmakeit.ru/api/words/${id}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(() => this.loadData())
            .catch(error => {
                this.error = error;
            });
    }

    saerchTearm = '';

    search = (value) => {
        this.saerchTearm = value;
    }
    
    isValid = (element) => (element.length > 0) ? true : false;

    count = 0;
    learnedWords = 0;

    increment = () => {
        this.count = this.count < this.words.length ? this.count + 1 : 0;
        this.learnedWords = this.learnedWords < this.words.length  ? this.learnedWords + 1 : this.words.length;
    }

    decrement = () => {
        this.count = this.count > 0 ? this.count - 1 : this.words.length - 1;
    }
}