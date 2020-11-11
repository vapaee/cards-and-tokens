import { Injectable, Type } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CacheMap {
    [key: string]: any;
}
interface PromiseMap {
    [key: string]: {promise:Promise<any>, resolve:(any?)=>any, reject:(any?)=>any};
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    cache: CacheMap;
    request: PromiseMap;
    URL: string;

    constructor(private http: HttpClient) {
        this.cache = {};
        this.request = {};
        this.URL = "http://api.cardsandtokens.com/";
    }

    proccess_object (obj) {
        // convierto en Date todos los strings con formato de dates en Date
        // "2017-01-13 14:58:19" o  "2017-01-13"
        var exp = /^\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d|\d\d\d\d-\d\d-\d\d$/;
        var data_exp = /^(\d\d\d\d)-(\d\d)-(\d\d)$/
        var datetime_exp = /^(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)$/
        for (var prop in obj) {
            if (typeof obj[prop] == "object") {
                obj[prop] = this.proccess_object(obj[prop]);
            }
            if (typeof obj[prop] == "string" && exp.test(obj[prop])) {
                var date_matches = obj[prop].match(data_exp);
                if (date_matches) {
                    var date = new Date();
                    date.setFullYear(parseInt(date_matches[1]));
                    date.setMonth(parseInt(date_matches[2])-1);
                    date.setDate(parseInt(date_matches[3]));
                    obj[prop] = date;
                } else {
                    var datetime_matches = obj[prop].match(datetime_exp);
                    if (datetime_matches) {
                        var date = new Date();
                        date.setFullYear(parseInt(datetime_matches[1]));
                        date.setMonth(parseInt(datetime_matches[2])-1);
                        date.setDate(parseInt(datetime_matches[3]));
                        date.setHours(parseInt(datetime_matches[4]));
                        date.setMinutes(parseInt(datetime_matches[4]));
                        date.setSeconds(parseInt(datetime_matches[6]));
                        obj[prop] = date;
                    } else {
                        console.log(prop, obj[prop], new Date(obj[prop]) );
                        obj[prop] = new Date(obj[prop]);
                    }
                }
            }
        }
        return obj;
    }

    insert (table, item) {
        if (Array.isArray(item.deleted)) {
            for (var i in item.deleted) {
                var id = item.deleted[i];
                delete this.cache[table]["id-"+id];
            }
        } else {                
            this.cache[table] = this.cache[table] || {};
            if (item._deleted_) {
                console.error("CHECK THIS OUT", table, item);
                delete this.cache[table]["id-"+item.id];
            } else {
                item = this.proccess_object(item);
                this.cache[table]["id-"+item.id] = item;
            }
        }
    }

    encode_object (obj) {
        // console.log("Data.encode_object(", [obj],")");
        for (var prop in obj) {
            // console.log("- prop:", prop, "value:", typeof obj[prop], obj[prop]);
            if (!obj[prop] && typeof obj[prop] == "object") {
                console.warn("prop: " , prop , "is NULL");
                continue;
            }                
            if (typeof obj[prop] == "object" && typeof obj[prop].getDate == "function") {
                var v = obj[prop];
                var date = "";
                date += v.getFullYear() + "-" + (v.getMonth()+1<9?"0":"") + (v.getMonth()+1) + "-" + (v.getDate()<9?"0":"") + (v.getDate()) + " ";
                date += (v.getHours()<9?"0":"") + (v.getHours()) + "-" + (v.getMinutes()+1<9?"0":"") + (v.getMinutes()+1) + "-" + (v.getSeconds()<9?"0":"") + (v.getSeconds());
                console.log(prop, date);
                obj[prop] = date;
            }
            if (typeof obj[prop] == "object" && typeof obj[prop].getDate != "function") {
                obj[prop] = this.encode_object(obj[prop]);
            }
        }
        return obj;
    }    

    make_request (method, path, obj, omited_table) {
        // console.log("Data.make_request("+method+", "+path+", "+omited_table+")");
        if (this.request[path]) {
            // console.log("Data.make_request("+method+", "+path+", "+omited_table+") tengo promise !!!!!!!!!!!!!!!");
            
        } else {
            var res = null;
            var rej = null;
            var pro = new Promise((_res, _rej) => { res=_res; rej=_rej; });
            this.request[path] = { promise: pro, reject: rej, resolve: res }

            var url = this.URL + path;
            obj = this.encode_object(Object.assign({}, obj));

            var promise:Promise<any> = null;
            switch(method) {
                case "GET":
                    promise = this.http.get(url).toPromise();
                    break;
                case "POST":
                    promise = this.http.post(url, obj).toPromise();
                    break;
                case "PUT":
                    promise = this.http.put(url, obj).toPromise();
                    break;
                case "DELETE":
                    promise = this.http.delete(url).toPromise();
                    break;
                default:
                    console.error("ERROR: no sach method ", method);
            }

            promise.then((data) => {
                // console.debug("------------------>" , path, data);
                console.assert(typeof this.request[path].resolve == "function");
                
                var Data = this;
                var _proccess = function (_table, _data) {
                    var model = _data[table];
                    if (Array.isArray(model)) {
                        for (var i in model) {
                            Data.insert(_table, model[i]);
                        }
                    } else if (model==null) {
                        // console.log("path, _table, model", path, table, model);
                    } else {
                        Data.insert(_table, model);
                    }                        
                }

                if (omited_table) {
                    var __data = {}; __data[omited_table] = data;
                    _proccess(omited_table, __data);
                } else {
                    for (var table in data) {
                        _proccess(table, data);
                    }
                }
                this.request[path].resolve(data);
                delete this.request[path];
            }).catch((e) => {
                console.error(e);
                this.request[path].reject(e);
                delete this.request[path];
                 // ["defer:"+path].reject(e);
            });
        }
            
        return this.request[path].promise;
    }

    request_promise (method, path, obj?, omited_table?) {
        return new Promise<any>((resolve, reject) => {
            this.make_request(method, path, obj, omited_table).then(function (a) {
                // console.debug("se resolvio" , method, path, obj, "-->", a);
                resolve(a);
            }).catch(function(e) {
                console.error(e);
                reject({error: e, data: this});
            });
        });
    }

    use_cache_promise (method, path, table, id) {
        if (this.request[path]) {
            return this.request[path].promise;
        } else {
            return this.request_promise(method, path, null, table);
        }
    }

    getAll (table, params?) {
        var url = table;
        if (params) {
            url = this.addParamsToUrl(url, params);
        }
        return this.request_promise('GET', url);
    }
    
    reload (table, id, params) {
        var path = table+"/"+id;
        delete this["defer:"+path];
        delete this["promise:"+path];
        return this.getByPk(table, id, params);
    }

    addParamsToUrl(url, params) {
        var first = true;
        for (var i in params) {
            url += (first?"?":"&") + i + "=" +encodeURIComponent(JSON.stringify(params[i]));
            first = false;
        }
        return url;
    }

    getByPk (table, id, params?, use_cache?) {
        if (typeof id != "number") if (typeof parseInt(id) != "number") console.warn("WARNING: me pasaste un id que no es un número", table, id);
        var url = table+"/"+id;
        if (params) {
            url = this.addParamsToUrl(url, params);
        }
        if (use_cache) {
            switch (typeof use_cache) {
                case "boolean":
                    return this.use_cache_promise('GET', url, table, id);
                case "function":
                    return this.use_cache_promise('GET', url, table, id).then(function(obj) {
                        if (use_cache(obj)) {
                            return obj;
                        } else {
                            return this.request_promise('GET',url);
                        }
                    });
            }
        }
        return this.request_promise('GET',url,null,table);
    }

    select (table, conditions, params?) {
        // console.log("select()", [table, conditions, params]);
        var url = table;
        url += "?select="+encodeURIComponent(JSON.stringify(conditions));
        if (params) {
            for (var i in params) {
                url += "&" + i + "=" +encodeURIComponent(JSON.stringify(params[i]));
            }
        }
        return this.request_promise('GET',url);
    }

    create (table, obj) {
        return this.request_promise('POST',table, obj);
    }

    update (table:string, obj:any) {
        var path = table+"/"+obj.id;
        this["defer:"+path] = obj;
        return this.request_promise('PUT',path, obj);
    }
    
    delete (table:string, id:any) {
        if (typeof id == "object") {
            return this.request_promise('DELETE',table+"?select="+encodeURIComponent(JSON.stringify(id)));
        } else {
            var path = table+"/"+id;
            delete this["defer:"+path];
            return this.request_promise('DELETE',path);
        }
    }
    
    deleteAll (table) {
        return this.request_promise('DELETE',table+"?select="+encodeURIComponent(JSON.stringify(
            { id : {$gt: 0} }
        )));
    }




    // -----------------------------------------------------

    parseInt (_number) {
        if(!_number) return _number = 0;
        var number = parseInt(_number);
        if (typeof _number == "string" && _number[0] == "$") {
            var numeros = _number.replace(/\D/g, '');
            number = parseInt(numeros);
        }
        return number;
    }

    parseDate (date_in_tring_format) {
        var date = new Date();
        var parts = date_in_tring_format.split("-");
        date.setFullYear(parseInt(parts[0]));            
        date.setMonth(parseInt(parts[1])-1);            
        date.setDate(parseInt(parts[2]));            
        return date;
    }
}
