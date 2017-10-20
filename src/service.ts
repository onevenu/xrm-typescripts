/// <reference path="../typings/xrm/xrm.d.ts" />
class Service {
    constructor() {

    }
    static Retrieve(name: string, id: string, columns: string): Object {

        let _url: string;
        let _result: any;

        _url = Xrm.Page.context.getClientUrl() + "/api/data/v8.2/" + name + "(" + id + ")";
        _url = columns != "" ? _url + "?$select=" + columns : _url;

        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", _url, false);
        xhr.setRequestHeader("OData-MaxVersion", "4.0");
        xhr.setRequestHeader("OData-Version", "4.0");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                xhr.onreadystatechange = null;
                if (this.status === 200) {
                    _result = JSON.parse(this.response);
                } else {
                    console.log("Error in Service Retrieve" + this.statusText);
                }
            }
        };
        xhr.send();
        return _result;
    }

    static RetrieveMultiple(name: string, columns: string, filters: string): Object {

        let _url: string;
        let _result: any;

        _url = Xrm.Page.context.getClientUrl() + "/api/data/v8.2/" + name;

        if (columns != "") {
            _url = _url + "?$select=" + columns;
            if (filters != "")
                _url = _url + "&$filter=" + filters;
        } else {
            if (filters != "")
                _url = _url + "?$filter=" + filters;
        }

        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", _url, false);
        xhr.setRequestHeader("OData-MaxVersion", "4.0");
        xhr.setRequestHeader("OData-Version", "4.0");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhr.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                xhr.onreadystatechange = null;
                if (this.status === 200) {
                    _result = JSON.parse(this.response).value;
                } else {
                    console.log("Error in Service Retrieve Multiple" + this.statusText);
                }
            }
        };
        xhr.send();
        return _result;
    }
}