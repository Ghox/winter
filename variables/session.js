/**
 * Created by rd-hc on 12/04/16.
 */

function defaultSession (store){
    this.secret = 'keyboard cat',
    this.cookie= {},
    this.resave = false,
    this.saveUninitialized=false, // Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
    this.rolling=false, //Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown.
    this.store= store,
    this.ttl= 24 * 60 * 60// = 1 day.
}



module.exports ={
    defaultSession: defaultSession
};