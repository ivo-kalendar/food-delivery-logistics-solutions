const bcrypt = require('bcryptjs');
const validator = require('validator');
const korisnici = require('../server').db().collection('korisnici');
const { ObjectId } = require('mongodb');

let Korisnik = function (data) {
    this.data = data;
    this.errors = [];
};

Korisnik.prototype.cleanUp = function () {
    if (typeof this.data.ime != 'string') {
        this.data.ime = '';
    }
    if (typeof this.data.password != 'string') {
        this.data.password = '';
    }

    this.data = { ime: this.data.ime, password: this.data.password };
};

Korisnik.prototype.extraData = function () {
    this.data.date = new Date();
    this.data.position = 'unknown';
    this.data.adminApproved = false;
    this.data.poslednaPromena = new Date();
};

Korisnik.prototype.validate = function () {
    return new Promise(async (resolve, reject) => {
        if (this.data.ime == '') {
            this.errors.push('Мора да внесете Корисничко име.');
        }
        if (this.data.ime.length > 0 && this.data.ime.length < 4) {
            this.errors.push('Корисничкото име мора да содржи барем 4 букви.');
        }
        if (this.data.ime.length > 15) {
            this.errors.push(
                'Корисничкото име не смее да надмине повеќе од 15 букви.'
            );
        }
        if (this.data.ime != '' && !validator.isAlphanumeric(this.data.ime)) {
            this.errors.push(
                'Корисничкото име мора да содржи само букви и бројки.'
            );
        }
        if (this.data.password == '') {
            this.errors.push('Мора да внесете лозинка.');
        }
        if (this.data.password.length > 0 && this.data.password.length < 4) {
            this.errors.push('Лозинката мора да содржи барем 4 букви.');
        }
        if (this.data.password.length > 15) {
            this.errors.push(
                'Лозинката не смее да надмине повеќе од 15 букви.'
            );
        }

        resolve();
    });
};

Korisnik.prototype.dbValidate = function () {
    return new Promise(async (resolve, reject) => {
        if (
            this.data.ime.length > 2 &&
            this.data.ime.length < 15 &&
            validator.isAlphanumeric(this.data.ime)
        ) {
            let imeExists = await korisnici.findOne({ ime: this.data.ime });
            if (imeExists) {
                this.errors.push('Тоа корисничко име е веќе искористено.');
            }
        }

        resolve();
    });
};

Korisnik.prototype.passwordHash = async function () {
    const salt = await bcrypt.genSalt(10);
    this.data.password = await bcrypt.hash(this.data.password, salt);
};

Korisnik.prototype.registerUser = function () {
    return new Promise(async (resolve, reject) => {
        this.cleanUp();
        this.extraData();
        this.validate();
        await this.dbValidate();
        await this.passwordHash();

        if (!this.errors.length) {
            await korisnici.insertOne(this.data);

            resolve();
        } else {
            reject(this.errors);
        }
    });
};

Korisnik.prototype.authenticate = function () {
    return new Promise(async (resolve, reject) => {
        this.cleanUp();
        this.validate();

        if (!this.errors.length) {
            try {
                let authUser = await korisnici
                    .find({ ime: this.data.ime })
                    .toArray();

                let isMatch;

                if (!!authUser && !!authUser.length) {
                    isMatch = await bcrypt.compare(
                        this.data.password,
                        authUser[0].password
                    );
                } else {
                    this.errors.push('Тоа корисничко име не постои.');
                    return reject(this.errors);
                }

                if (!isMatch) {
                    this.errors.push('Погрешна Лозинка, Обидете се Повторно.');
                    reject(this.errors);
                } else {
                    this.data = authUser[0];
                }
            } catch (error) {
                this.errors.push('Тоа корисничко име не постои.');
                reject(this.errors);
            }

            resolve();
        } else {
            reject(this.errors);
        }
    });
};

Korisnik.getAll = async () => {
    const options = { projection: { password: 0 } };
    return await korisnici
        .find({}, options)
        .sort({ poslednaPromena: -1, date: -1 })
        .toArray();
};

Korisnik.edit = async (req) => {
    let filter = { _id: ObjectId(req.params.id) };
    let exists = await korisnici.findOne(filter);

    if (exists) {
        let { password } = exists;
        if (password && password.length > 15) req.body.password = password;

        if ((!password || password.length < 15) && req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        req.body.date = new Date(req.body.date);
        req.body.poslednaPromena = new Date();

        await korisnici.replaceOne(filter, req.body);
    }
};

Korisnik.delete = async (id) => {
    await korisnici.deleteOne({ _id: ObjectId(id) });
};

module.exports = Korisnik;
