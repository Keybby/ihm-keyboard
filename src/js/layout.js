var BEHAVIOUR = {
    Classic: 0,
    Combo: 1,
    Sticky: 2, //TODO
}

class Layout{
    constructor(behaviour, keycode){
        this.behaviour = behaviour;
        this.keycode = keycode;
    }
}