export default class Api {
    constructor(options) {
        this._options = options;
        this._cardsEndpoint = `${this._options.baseUrl}/cards`;
        this._userEndpoint = `${this._options.baseUrl}/users/me`;
        this._authorization = this._options.headers.authorization;
        this._contentType = this._options.headers['Content-Type'];
    }

    getInitialCards() {
        return fetch(this._cardsEndpoint, {
            headers: {
                authorization: this._authorization,
            }
        })
            .then(
                res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(res.status)
                }).catch(err => {
                    console.log(`От сервера вернулась ошибка ${err}`)
                });
    }

    getUser() {
        return fetch(this._userEndpoint, {
            headers: {
                authorization: this._authorization,
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status)
        })
        .catch(err => {
            console.log(`От сервера вернулась ошибка ${err}`)
        });
    }

    patchUser(userData) {
        return fetch(this._userEndpoint, {
            method: 'PATCH',
            headers: {
                authorization: this._authorization,
                'Content-Type': this._contentType
            },
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status)
        })
        .catch(err => {
            console.log(`От сервера вернулась ошибка ${err}`)
        });
    }

    postNewCard(cardData) {
        return fetch(this._cardsEndpoint, {
            method: 'POST',
            headers: {
                authorization: this._authorization,
                'Content-Type': this._contentType
            },
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status)
        })
        .catch(err => {
            console.log(`От сервера вернулась ошибка ${err}`)
        });
    }
}