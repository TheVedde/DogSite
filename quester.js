const Quester = {
    _requestObject: new XMLHttpRequest(),

    get: (uri, cb) => {
        Quester._requestObject.onload = cb;
        Quester._requestObject.open("GET", uri, true);

        Quester._requestObject.send();
    }
};