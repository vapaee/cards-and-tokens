'use strict';

angular.module('vapaee.services')

.service('Data', [
    "$http",
    "$q",
    function ($http, $q) {
        var URL = null;
        var Data = this;
        var $scope = null;
        
        Data.init = function (url, scope) {
            URL = url;
            $scope = scope;
            $scope.data = angular.extend(Data, $scope.data);
            Data.cache = {};
        }
        
        Data.encode_object = function (obj) {
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
                    obj[prop] = Data.encode_object(obj[prop]);
                }
            }
            return obj;
        }
        
        Data.proccess_object = function (obj) {
            // convierto en Date todos los strings con formato de dates en Date
            // "2017-01-13 14:58:19" o  "2017-01-13"
            var exp = /^\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d|\d\d\d\d-\d\d-\d\d$/;
            var data_exp = /^(\d\d\d\d)-(\d\d)-(\d\d)$/
            var datetime_exp = /^(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)$/
            for (var prop in obj) {
                if (typeof obj[prop] == "object") {
                    obj[prop] = Data.proccess_object(obj[prop]);
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
        
        Data.insert = function (table, item) {
            if (Array.isArray(item.deleted)) {
                for (var i in item.deleted) {
                    var id = item.deleted[i];
                    delete Data.cache[table]["id-"+id];
                }
            } else {                
                Data.cache[table] = Data.cache[table] || {};
                if (item._deleted_) {
                    console.error("CHECK THIS OUT", table, item);
                    delete Data.cache[table]["id-"+item.id];
                } else {
                    item = Data.proccess_object(item);
                    // aaaaaaaaaaaaaa acá hay que asumir que Data.cache[table]["id-"+item.id] es una promise y resolverla con el item
                    Data.cache[table]["id-"+item.id] = item;
                }
            }
        }
        
        var make_request = function (method, path, obj, omited_table) {
            
            if (Data["promise:"+path]) {
                // console.log("Data.make_request("+method+", "+path+", "+omited_table+") tengo promise");
            } else {
                Data["defer:"+path] = $q.defer();
                Data["promise:"+path] = Data["defer:"+path].promise;
                // console.log("Data.make_request("+method+", "+path+", "+omited_table+") creo una nueva promise y realizo el request");

                var url = URL + path;
                obj = Data.encode_object(angular.extend({}, obj));
                $http({
                    method: method,
                    url: url,
                    data: obj
                }).then(function(e) {
                    // console.debug("volvio" , path, e.data);
                    console.assert(typeof Data["defer:"+path].resolve == "function", typeof Data["defer:"+path].resolve, Data["defer:"+path]);
                    Data["defer:"+path].resolve(e.data);
                    
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
                        var __data = {}; __data[omited_table] = e.data;
                        _proccess(omited_table, __data);
                    } else {
                        for (var table in e.data) {
                            _proccess(table, e.data);
                        }
                    }
                    
                }).catch(function(e) {
                    console.error(e);
                    Data["defer:"+path].reject(e);
                }).finally(function (){
                    setTimeout(function(){
                        delete Data["defer:"+path];
                        delete Data["promise:"+path];
                    }, 0);                    
                });

            }
                
            return Data["promise:"+path];
        }
        
        var request_promise = function (method, path, obj, omited_table) {
            return $q(function (resolve, reject) {
                make_request(method, path, obj, omited_table).then(function (a) {
                    // console.debug("se resolvio" , method, path, obj, "-->", a);
                    resolve(a);
                }).catch(function(e) {
                    console.error(e);
                    reject({error: e, data: Data});
                });
                if (method == 'GET' && Data["defer:"+path]) {
                    // resolve(Data["defer:"+path]);
                }
            });
        }
        
        var use_cache_promise = function (method, path, table, id) {
            if (Data["promise:"+path]) {
                return Data["promise:"+path];
            } else {
                return request_promise(method, path,null,table);
            }
            /*
            if (Data.cache[table] && Data.cache[table]["id-"+id]) {
                return $q.resolve(Data.cache[table]["id-"+id]);
            } else {
                return request_promise(method, url,null,true);
            }
            */
        }
        
        Data.getAll = function (table) {
            return request_promise('GET',table);
        }
        
        Data.reload = function (table, id, params) {
            var path = table+"/"+id;
            delete Data["defer:"+path];
            delete Data["promise:"+path];
            return Data.getByPk(table, id, params);
        }
    
        Data.getByPk = function (table, id, params, use_cache) {
            if (typeof id != "number") if (typeof parseInt(id) != "number") console.warn("WARNING: me pasaste un id que no es un número", table, id);
            var url = table+"/"+id;
            if (params) {
                var first = true;
                for (var i in params) {
                    url += (first?"?":"&") + i + "=" +encodeURIComponent(JSON.stringify(params[i]));
                    first = false;
                }
            }
            if (use_cache) {
                switch (typeof use_cache) {
                    case "boolean":
                        return use_cache_promise('GET', url, table, id);
                    case "function":
                        return use_cache_promise('GET', url, table, id).then(function(obj){
                            if (use_cache(obj)) {
                                return obj;
                            } else {
                                return request_promise('GET',url);
                            }
                        });
                }
            }
            return request_promise('GET',url,null,table);
        }
    
        Data.select = function (table, conditions, params) {
            // console.log("Data.select()", [table, conditions, params]);
            var url = table;
            url += "?select="+encodeURIComponent(JSON.stringify(conditions));
            if (params) {
                for (var i in params) {
                    url += "&" + i + "=" +encodeURIComponent(JSON.stringify(params[i]));
                }
            }
            return request_promise('GET',url);
        }
    
        Data.create = function (table, obj) {
            return request_promise('POST',table, obj);
        }
    
        Data.update = function (table, obj) {
            var path = table+"/"+obj.id;
            Data["defer:"+path] = obj;
            return request_promise('PUT',path, obj);
        }
        
        Data.delete = function (table, id) {
            if (typeof id == "object") {
                return request_promise('DELETE',table+"?select="+encodeURIComponent(JSON.stringify(id)));
            } else {
                var path = table+"/"+id;
                delete Data["defer:"+path];
                return request_promise('DELETE',path);
            }
        }
        
        Data.deleteAll = function (table) {
            return request_promise('DELETE',table+"?select="+encodeURIComponent(JSON.stringify(
                { id : {$gt: 0} }
            )));
        }
        
        
    
        // ----------------------
        // Dado un input element te dice la posición del caret.
        // Si paśas una posición, setea el caret en esa posición
        Data.caret = function (input, pos) {
            console.assert(input, "ERROR: Data.caret() no input passed", arguments);
            if (arguments.length == 2) {
                if (input.createTextRange) {
                    var range = input.createTextRange();
                    range.move('character', pos);
                    range.select();
                } else {
                    if (input.setSelectionRange) {
                        input.focus();
                        input.setSelectionRange(pos, pos);
                    } else
                        input.focus();
                }                
            } else {
                if (document.selection && document.selection.createRange) {
                    var range = document.selection.createRange();
                    var bookmark = range.getBookmark();
                    var caret_pos = bookmark.charCodeAt(2) - 2;
                } else {
                    // Firefox Caret Position (TextArea)
                    if (input.setSelectionRange)
                        var caret_pos = input.selectionStart;
                }
                return caret_pos;
            }
        }

        // ----------------------
        Data.parseInt = function (_number){
            if(!_number) return _number = 0;
            var number = parseInt(_number);
            if (typeof _number == "string" && _number[0] == "$") {
                var numeros = _number.replace(/\D/g, '');
                number = parseInt(numeros);
            }
            return number;
        }
        
        Data.parseDate = function (date_in_tring_format){
            var date = new Date();
            var parts = date_in_tring_format.split("-");
            date.setFullYear(parseInt(parts[0]));            
            date.setMonth(parseInt(parts[1])-1);            
            date.setDate(parseInt(parts[2]));            
            return date;
        }
        
        // ----------------------
        Data.toYear = function (date) {
            if (!date && date != 0) return "";
            if (typeof date.toJSON == "function") return date.toJSON().split("-")[0];
            if (typeof date.split == "function" && date.indexOf("-") != -1) return date.split("-")[0];
            return date;
        }

        Data.toMonth = function (date) {
            if (!date && date != 0) return "";
            if (typeof date.toJSON == "function") return date.toJSON().split("-")[1];
            if (typeof date.split == "function" && date.indexOf("-") != -1) return date.split("-")[1];
            return date;
        }

        Data.toDay = function (date) {
            if (!date && date != 0) return "";
            if (typeof date.toJSON == "function") return date.toJSON().split("-")[2];
            if (typeof date.split == "function" && date.indexOf("-") != -1) return date.split("-")[2].substr(0,2);
            return date;
        }

        Data.toMonthStr = function (date, offset) {
            if (!date && date != 0) return "";
            offset = offset || 0;
            var month = parseInt(Data.toMonth(date));
            var meses = ["", "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];            
            return meses[month+offset];
        }
/*
        Data.toDateStr = function (date) {
            if (typeof date != "string") return date;
        }*/

        Data.toLowerCase = function (input) {
            return input.toLowerCase();
        }
        
        Data.toNamespace = function (input, separator) {
            return Data.toLowerCase(Data.toWords(input)).split(" ").join(separator ? separator : "_");
        }
        
        Data.toCapitalize = function (input, all) {
            var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
            return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
        }
        
        Data.toWords = function (input) {
            var reg = /([_.,\+-]|\/)/g;
            return (!!input) ? input.replace(reg, ' ').replace(/\s\s+/g, ' ') : '';
        }
        
        Data.toTruncate = function (input, all) {
            var number = parseFloat(input);
            return Math.floor(1000 * number) / 1000;
        }
        
        Data.toPercent = function (input) {
            var number = parseFloat(input);
            if (isNaN(number)) return "0%";
            return Math.floor(100 * number) +  "%";            
        }
        
        Data.toYesNo = function (input) {
            if (input) return "si";
            return "no";
        }
        
        Data.toMoney = function (_number) {
            var prefix = "";
            if(!_number) return _number = prefix + "0";
            var number = parseInt(_number);
            if (typeof _number == "string") {
                var numeros = _number.replace(/\D/g, '');
                number = parseInt(numeros);
            }
            if (isNaN(number)) return prefix + "0";
            
            var str = prefix;
            var negativo = (number < 0);
            if (negativo) {
                number = -1 * number;
                str +="-";
            }
            var M=0, m=0, c=0;
            if (number >= 1000000) {
                M = Math.floor(number/1000000);
                str += M + ":";
            }
            if (number >= 1000) {
                m = Math.floor(number/1000);
                if (M>0) {
                    m = "" + m;
                    m = m.substr(m.length-3);
                }
                str += m + ".";
            }
            if (str==prefix) {
                c = number;
            } else {
                c = "" + number;
                c = c.substr(c.length-3);
            }
            str += c;
            return str;
        }

        Data.toUSD = function (_number) {
            var prefix = "$";
            if(!_number) return _number = prefix + "0,00";
            var number = parseFloat(_number);
            if (isNaN(number)) return prefix + "0";
            
            var str = prefix;
            var negativo = (number < 0);
            if (negativo) {
                number = -1 * number;
                str +="-";
            }
            var M=0, m=0, c=0;
            if (number >= 1000000) {
                M = Math.floor(number/1000000);
                str += M + ":";
            }
            if (number >= 1000) {
                m = Math.floor(number/1000);
                if (M>0) {
                    m = "" + m;
                    m = m.substr(m.length-3);
                }
                str += m + ".";
            }
            c = ("" + number).split(".").join(",");
            if (c.indexOf(",") == -1) {
                c+= ",00";
            } else {
                c = c.substr(0, Math.min(c.indexOf(",")+3, c.length));
            }
            if (number >= 1000) {
                c = c.substr(c.length-6); 
            }
            str += c;
            return str;
        }

        Data.toCrypto = function (_number, _digits) {
            // console.log("Data.toCrypto("+_number+","+_digits+")", typeof _number);
            var str = "";
            var _number_str = _number;
            if (!_number) {
                _number_str = "0";
            }
            if (typeof _number == "number") {
                _number_str = str + _number;
            }
            if (_number_str.indexOf(".") == -1) {
                var str = _number_str + ".";
                for (var i = 0; i<_digits; i++) str +="0";
            } else {
                var str = _number_str;
                var index = _number_str.indexOf(".");
                var current_digits = _number_str.length - index - 1;
                
                if (current_digits > _digits) {
                    // console.log("Recortamos", index, _digits, current_digits, _digits-current_digits);
                    str = _number_str.substr(0, index + _digits + 1);
                } else {
                    // console.log("Rellenamos", _digits, current_digits, _digits-current_digits);
                    for (var i = 0; i<_digits-current_digits; i++) str +="0";
                }

                
            }
            return str;
        }
        
        Data.toArray = function (obj) {
            var array = [];
            for (var i in obj) {
                array.push(obj[i]);
            }
            return array;
        }
    }])


    .directive('minValue', ["Data", function(Data) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, elm, attr, ctrl) {
                if (!ctrl) return;                    
                var minvalue = scope.$eval(attr.minValue) || 0;
                attr.$observe('minvalue', function(value) {
                    minvalue = Data.parseInt(value);
                    ctrl.$setViewValue(ctrl.$viewValue);
                });
                var validator = function (value) {
                    var viewValue = Data.parseInt(value);                    
                    ctrl.$setValidity('minValue', ctrl.$isEmpty(viewValue) || viewValue >= minvalue);
                    return value;
                };

                ctrl.$parsers.push(validator);
                ctrl.$formatters.push(validator);
            }
        };
    }])

    .directive('maxValue', ["Data", function(Data) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, elm, attr, ctrl) {
                if (!ctrl) return;                    
                var maxvalue = scope.$eval(attr.maxValue) || 0;
                attr.$observe('maxValue', function(value) {
                    maxvalue = Data.parseInt(value);
                    ctrl.$setViewValue(ctrl.$viewValue);
                });
                var validator = function (value) {
                    var viewValue = Data.parseInt(value);                    
                    ctrl.$setValidity('maxValue', ctrl.$isEmpty(viewValue) || viewValue <= maxvalue);
                    return value;
                };

                ctrl.$parsers.push(validator);
                ctrl.$formatters.push(validator);
            }
        };
    }])

    .filter('year', ["Data", function(Data) {
        return function(input) {
            return Data.toYear(input);
        }
    }])

    .filter('url_filename', ["Data", function(Data) {
        return function(input) {
            if (!input) return input;
            var filename = input;
            if (filename.indexOf("/") != -1) {
                filename = filename.substr(filename.lastIndexOf("/")+1);
            }            
            if (filename.indexOf("#") != -1) {
                filename = filename.substr(0, filename.indexOf("#"));
            }            
            if (filename.indexOf("?") != -1) {
                filename = filename.substr(0, filename.indexOf("?"));
            }            
            return filename;
        }
    }])

    .filter('month_str', ["Data", function(Data) {
        return function(input, offset) {
            return Data.toMonthStr(input, offset);
        }
    }])

    .filter('words', ["Data", function(Data) {
        return function(input) {
            return Data.toWords(input);
        }
    }])

    .filter('capitalize', ["Data", function(Data) {
        return function(input, all) {
            return Data.toCapitalize(input, all);
        }
    }])

    .filter('truncate', ["Data", function(Data) {
        return function(input, all) {
            return Data.toTruncate(input, all);
        }
    }])

    .filter('yes_no', ["Data", function(Data) {
        return function(input, all) {
            return Data.toYesNo(input);
        }
    }])

    .filter('percent', ["Data", function(Data) {
        return function(input, all) {
            return Data.toPercent(input);
        }
    }])

    .filter('money', ["Data", function(Data) {
        return function(input) {
            return Data.toMoney(input);            
        }
    }])

    .filter('usd', ["Data", function(Data) {
        return function(input, digits) {
            return Data.toUSD(input, digits);            
        }
    }])

    .filter('crypto', ["Data", function(Data) {
        return function(input, digits) {
            return Data.toCrypto(input, digits);            
        }
    }])

    .filter('array', ["Data", function(Data) {
        return function(input) {
            return Data.toArray(input);            
        }
    }])
;

