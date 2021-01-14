import { Server, Model, belongsTo, hasMany, Factory, Response } from 'miragejs'

import {login,signup} from './routes/user'
import {create,updateDiary,getDiaries,addEntry,getEntries,updateEntry} from './routes/diary'


export const handleErrors = (error: any, message= "An Error Occured") => {
    return new Response(400, undefined ,{
        data:{
            message,
            isError: true
        }
    })
};

export const setupServer = (env?: string): Server =>{
    return new Server({
        environment: env ?? 'development',

        models:{
            entry: Model.extend({
                diary: belongsTo()
            }),
            diary: Model.extend({
                entry: hasMany(),
                user: belongsTo(),
            }),
            user: Model.extend({
                diary: hasMany()
            })
        },

        factories:{
            user: Factory.extend({
                username: "test",
                password: '1234',
                email: 'test@email.com',
            }),
        },


        seeds: (server) : any => {
            server.create('user');
        },

        routes() : void {
            this.urlPrefix = 'https://diaries.app'

            this.get('/diaries/entries/:id', getEntries);
            this.get('/diaries/:id', getDiaries);

            this.post('/auth/login', login);
            this.post('auth/signup', signup);

            this.post('/diaries/' ,create);
            this.post('/diaries/entry/:id', addEntry);

            this.post('/diaries/entry/:id', updateEntry);
            this.post('/diaries/:id', updateDiary);
        }
    })
}