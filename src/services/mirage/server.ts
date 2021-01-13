import { Server, Model, belongsTo, hasMany, Factory, Response } from 'miragejs'

export const handleErrors = (error: any, message: "An Error Occured") => {
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
    })
}