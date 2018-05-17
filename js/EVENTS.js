
/**
 * author：ZZH
 */
export class _Event{
    _listeners = {}  
    addEvent(type, fn) {
        if (typeof this._listeners[type] === "undefined") {
            this._listeners[type] = [];
        }
        if (typeof fn === "function") {
            this._listeners[type].push(fn);
        }    
        return this;
    }
    fireEvent(type,message){
        var arrayEvent = this._listeners[type];
        if (arrayEvent instanceof Array) {
            for (var i=0, length=arrayEvent.length; i<length; i+=1) {
                if (typeof arrayEvent[i] === "function") {
                    arrayEvent[i](message);    
                }
            }
        }    
        return this;
    }
    removeEvent(type, fn){
        var arrayEvent = this._listeners[type];
        if (typeof type === "string" && arrayEvent instanceof Array) {
            if (typeof fn === "function") {
                for (var i=0, length=arrayEvent.length; i<length; i+=1){
                    if (arrayEvent[i] === fn){
                        this._listeners[type].splice(i, 1);
                        break;
                    }
                }
            } else {
                delete this._listeners[type];
            }
        }
        return this;
    }
}

export class SomeEventManager extends _Event{
    type = "Event"
    constructor(type){
        super()
        this.type = type
    }
    addEvent(fn){
        return super.addEvent(this.type,fn)
    }
    fireEvent(message){
        return super.fireEvent(this.type,message)
    }
    removeEvent(fn){
        return super.removeEvent(this.type,fn)
    }
}