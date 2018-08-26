<?php
 
namespace Vapaee\Services;
 
use Gitter\Client as BaseClient;
use Symfony\Component\HttpFoundation\Response;
     
class DatabaseService {
    
    // MySQL ----------------------------------
    public $connection = null;
    public $STEP = 50;
    public function __construct() {}
    public $database = null;
    public $DATA = null;
    public $app = null;
    public $password = null;
    public $cancel = null;
    public $listeners = array();
    public $ID_REF = "int(32)";
     
    private function aux_create_id($table) {
        return md5($table . time() . rand());
    }
 
    private function aux_disconnect() {
        if ($this->connection) {
            mysqli_close($this->connection);
            $this->connection = null;
        }
    }
     
    private function aux_connect() {
        // $this->aux_disconnect();
        if ($this->connection) return;
        $this->connection = mysqli_connect("localhost", "root", $this->password, $this->database) or die(mysql_error());
        if (!$this->connection) {
            throw new Exception('Couldn\'t connect to MYSQL');
        }            
    }
     
    public function getTable() {
        $arr = explode("/", $this->app["request"]->getPathInfo(), 3);
        $api = $arr[1];
        $type = substr($api, 0, -1); // le quito la s
        return $api;
    }
     
    public function complete($obj, $op, $table) {
        // trace("complete($table)", $obj);
        if (sizeof($obj) == 0) return $obj;
         
        if (isset($obj[0])) {
            $result = array();
            foreach ($obj as $realobj) {
                $temp = $this->complete($realobj, $op, $table);
                array_push($result, $temp);
            }
            return $result;
        }
        
        // trace('isset($op["mapping"])', isset($op["mapping"]));        
        
        if (isset($op["mapping"])) {
            unset($op["mapping"]);
            foreach ($obj as $key => $realobj) {
                $temp = $this->complete($realobj, $op, $table);
                $obj[$key] = $temp;
            }            
            return $obj;
        }
        
        $current_class = $table;
        $current = $obj;
        
        $attribs = $this->get_table_attribs($table);
        // trace("----- antes  ", $attribs  );
        // trace("tiene _super? ", $current);
        while (isset($current["_super"])) {
            $attributes = $this->get_table_attribs($current_class);
            $super_class = $attributes["_extends"];
            $obj[$super_class."_id"] = $current["_super"]["id"];
            
            $current = $current["_super"];
            // trace("complete($table) next current:", $current);
            foreach ($current as $attr => $val) {
                if ($attr == "id") continue;
                $obj[$attr] = $val;
            }

            if (array_key_exists("_extends", $attributes)) {
                $super_attribs = $this->get_table_attribs($attributes["_extends"]);
                foreach ($super_attribs as $attr => $val) {
                    if ($attr == "id") continue;
                    $attribs[$attr] = $val;
                    // trace("attribs  $attr ", $attribs  );
                }                
            }
        }
        unset($obj["_super"]);
        // trace("quedo asi: ", $obj);        
        
        
        
        // trace("----- luego  ", $attribs  );
        foreach ($attribs as $att_name => $spec) {
            if ($this->isNotASpec($att_name)) continue;
            $type = $spec["type"];
            
            foreach ($this->DATA["model"] as $class_name => $model) {
                
                if ($type == $class_name) {
                    
                    // acá estoy frente a un atributo del objeto que es una referencia a otro objeto cuyo current_value es {id:1} 
                    // trace('$att_name', $att_name, '$obj', $obj);
                    $current_value = $obj[$att_name];
                    if (!is_array($current_value) && $current_value != null) {
                        // trace("OJO, estas asumiendo que el valor es un objeto {id:1} y no es asi ni es null:",  $current_value);
                        $current_value = array("id" => intval($current_value));
                    }
                    if ($current_value != null) {
                        // trace("----------> ", $this->app["request"]->query->get('complete'));                                 
                        $ref_id = $current_value;
                        if (is_array($current_value) && isset($current_value["id"])) {
                            $ref_id = $current_value["id"];
                        }
// trace("complete($table) $att_name:", $ref_id);

                        $_details = $this->app["request"]->query->get('details');
                        $_op = array("secure" => true, "no-detail" => !$_details);
                        if ($this->app["request"]->query->get('complete') || $this->app["request"]->query->get($att_name)) {
                            if ($this->app["request"]->query->get('deep')) {
                                $current_value = $this->API_get_id($type, $ref_id, array("secure" => true));
                            } else {

trace('$this->getByPk($type, $ref_id, $_op);', $type, $ref_id, $_op);

                                $current_value = $this->getByPk($type, $ref_id, $_op);
                            }
                        }
                    }
                    $obj[$att_name] = $current_value;
                }
            }
        }
         
        return $obj;
    }
     
    public function API_get_id($api, $id, $op = array()) {
        // trace("API_get_id($api, $id)");
        if (is_numeric($id)) {
            $result = $this->getByPk($api, $id, array("secure" => true));
            if (!$result) return null;
            // trace("getByPk($api, $id) result: ", $result);
            $result = $this->complete($result, $op, $api);
            $result = $this->trigger("get:$api/id", $result, $op, $api);
        } else {
            // trace("API_get_id($api, $id) is not numeric");
            // este caso es para cuando en vez de un id me pasan un comodin. Ej: "current", "lastest", etc
            $result = $this->trigger("get:$api/$id", null, $op, $api);
        }
        return $result;
    }
    
    public function condition_data() {
        // trace("condition_data()");
        $_model = array();
        foreach ($this->DATA["model"] as $table => $table_spec) {
            $newcols = array();
            $newcols["id"] = array( "type" => "pk" );
            foreach ($table_spec as $col => $spec) {
                $newcols[$col] = $spec;
            }
            $_model[$table] = $newcols;
            $_model[$table]["_subclasses"] = false;
        }        
        
        foreach ($this->DATA["model"] as $table => $table_spec) {
            
            if (isset($table_spec["_extends"])) {
                $super_name = $table_spec["_extends"];
                
                if (!isset($_model[$super_name])) {
                    trace("ERROR: table $table _extends $super_name but is not present in model object");
                    return;
                }
                
                $_model[$table]["_super"] = array( "type" => "cache" );
                $_model[$super_name]["_sub_table"] = array( "type" => "varchar(40)" );
                $_model[$super_name]["_subclasses"] = true;
            }
            
            // aaaaaaaaaaaa
            /*
             + no hay que agregar columnas -> eso borrarlo
             + hay que crear una propiedad que sirva de caché y contenga siempre lo que contendría la entrada en la supertabla
               así evitamos hacer una doble consulta cuando se pidan $table
             + el superclass tiene que tener dos propiedades: sub_id, sub_table que apuntan al objeto de tipo subclass
               así cuando se pida el superrclass/super_id facilmente pueda buscar en la sub_table por en sub_id
             - actualizar el caché _$super_name no va a ser facil. Si un modelo C extiende un model B que a su vez extiende uno A 
               si modifico A o B debería afectar el caché de C
             + la función completar debría fijarse si el model extiende algo y por tanto tiene un _$super_name de tipo caché.
               si es así debería pegar ese cache en el objeto de manera que sean propiedades propias y no parte de un arbol json
               $objeto[$_super_attrname] = $objeto["_$super_name"][$_super_attrname]
            */
            
            
            // $this->DATA["model"][$table] = $newcols;
             
            foreach($table_spec as $attr_name => $attr_spec) {
                foreach ($this->DATA["model"] as $class => $_spec) {
                    if ($attr_name == "_extends") continue;
                    if ($attr_spec["type"] == $class) {
                        $_model[$table][$attr_name]["ref"] = true;
                    }
                }
            }
        }
        
        $this->DATA["model"] = $_model;
    }
     
    
    // -------------------
    public function http_post($table, $object, $op = array()) {
        global $config; $namespace = $config['namespace'];
        trace("$namespace.http_post($table, object)", $object);
        $this->aux_connect(); // requisito del format_json
        $op["skip_db"] = true;

        $result = $this->format_json($table, $object, $op);

        $result = $this->trigger("before-post:$table", $result, $op, $table);
        if ($this->cancel) return $this->cancel;

        $attribs = $this->DATA["model"][$table];
        if ($attribs["_subclasses"] && !is_array($attribs["_subclasses"])) {
            // no hayq eque hacer nada
        }
        
        if (array_key_exists("_extends", $attribs)) {
            $supperclass = $attribs["_extends"];
            $object["_sub_table"] = $table;
            
            $sup_result = $this->http_post($supperclass, $object, $op);
            trace($table, '$sup_result ----> ', $sup_result);
            // persistimos el estado del padre como el json _super
            if (isset($sup_result[$supperclass])) {
                trace("ERROR: !!!! PORQUE SE DA ESTE CASO??? QUIERO SACAR ESTE IF A LA MIERDA !!! ($supperclass)");
                trace('$sup_result', $sup_result);
            } else {
                $result["_super"] = $sup_result;
            }
            $result["id"] = $sup_result["id"];
            unset($result["_super"]["_sub_table"]);
            // $result = $this->update($table, $result["id"], $_super, $op);
        }

        $result = $this->create($table, $result, array("useid" => true));
        trace($table, '$result after create', $result);
        $result = $this->trigger("post:$table", $result, $op, $table);           
        trace($table, '$result after trigger', $result);


        if (isset($op["unbox"])) {
            return $result;
        } else {
            return array("$table" => $result);
        }
    }
    
    public function http_get($table, $select, $op = array()) {
        global $config; $namespace = $config['namespace'];
        
        if (is_string($select)) {
            $select = json_decode($select, true);
        }        
        trace("$namespace.http_get($table)", $select, $op); // $table = "token", $select == {"owner":"1"}
                
        $sql = $this->conditions($table, $select, "", array("alert" => true));
        
        $subclases = $this->getSubClases($table); // $subclases flase
        if (is_string($sql)) {
            // trace('la consulta utiliza SOLO atributos de esta tabla ', $table);
            // la consulta utiliza SÓLO atributos de esta tabla $table
        
            if ($select) {
                $find = $select;
                $result = $this->select($table, $find, $op);                      
            } else {
                $result = $this->getAll($table, $op);
            }
            $result = $this->complete($result, $op, $table);
            $result = $this->trigger("get:$table", $result, $op, $table);
            
            if (sizeof($subclases) == 0) {
                // no tiene subclases, es una clase concreta
                if (isset($op["unbox"])) {
                    return $result;
                } else {
                    return array("$table" => $result);
                }            
            } else {
                // return $result;
                $new_result = array();
                foreach ($subclases as $subclass) {
                    $new_result[$subclass] = array();
                }
                
                foreach ($result as $entry) {
                    $_table = $entry["_sub_table"];
                    $_id = $entry["id"];
                    $op["unbox"] = true;
                    $_entry = $this->http_get_id($_table, $_id, $op);
                    
                    if (isset($op["mapping"])) {
                        $new_result[$_table][$op["mapping"]."-".$_entry[$op["mapping"]]] = $_entry;
                    } else {
                        array_push($new_result[$_table], $_entry);
                    }
                }
                
                return $new_result;
            }
        } else {
            // la consulta utiliza algunos atributos que no son de esta tabla            
            // trace('la consulta utiliza algunos atributos que no son de esta tabla ', $table, $sql);
            $attribs = $this->get_table_attribs($table);
            
            if(!isset($attribs["_extends"])) {
                return array("error" => "condition select imposible for this table", "condition" => $select, "table" => $table);
            }
            
            $superclass = $attribs["_extends"];
            $result = $this->http_get($superclass, $select, $op);
            if (isset($result["error"])) {
                trace("ERROR: http_get($table)", $result);
                return $result;
            }            
            if (isset($op["unbox"])) {
                if (isset($result["$table"])) {
                    return $result["$table"];
                } else {
                    trace('$result', $result);
                    return $result;
                }
            } else {
                return array("$table" => $result["$table"]);
            }
        }
        

    }
    
    public function http_get_id($table, $id) {
        global $config; $namespace = $config['namespace'];
        trace("$namespace.http_get_id($table, $id)");
        $op = array("secure" => true);
        
        $subclases = $this->getSubClases($table);
        // parte recursiva
        if (sizeof($subclases) > 0) {
            // tiene subclases: ej publisher
            $result = $this->getByPk($table, $id, $op);
            if (!$result) return null;            
            
            $result = $this->http_get_id($result["_sub_table"], $result["id"]);
            
            $result = $this->complete($result, $op, $table);
            $result = $this->trigger("get:$table/id", $result, $op, $table);            
            return $result;
        }        
        
        if (is_numeric($id)) {
            $result = $this->getByPk($table, $id, $op);
            // trace('$result = $this->getByPk($table, $id, $op);', $result);
            if (!$result) return null;
            // trace("getByPk($table, $id) result: ", $result);
            $result = $this->complete($result, $op, $table);
            $result = $this->trigger("get:$table/id", $result, $op, $table);
        } else {
            // trace("API_get_id($table, $id) is not numeric");
            // este caso es para cuando en vez de un id me pasan un comodin. Ej: current, lastest, etc
            $result = $this->trigger("get:$table/$id", null, $op, $api);
        }
        return $result;        
    }
    
    public function _http_put_down($updates, $changes, $op = array()) {
        global $config; $namespace = $config['namespace'];
        // trace("$namespace._http_put_down() ----->", $updates);
        $result = null;
        foreach ($updates as $target) {
            $table = $target["table"];
            $result = $this->trigger("before-put:$table", $changes, $op, $table);
            if ($this->cancel) return $this->cancel;
            $result = $this->update($table, $target["id"], $result, $op);
            unset($result["_sub_table"]);
            $result = $this->trigger("put:$table", $result, $op, $table);
            $changes["_super"] = $result;
        }
        
        return $result;
    }
    
    public function http_put($table, $id, $changes, $op = array()) {
        global $config; $namespace = $config['namespace'];
        trace("$namespace.http_put($table, $id)", $changes);
        
        $local_cache = array();

        // Primero averiguio que instancias de superclases habíra que actualizar
        $_model = $this->DATA["model"];
        $updates = array();
        $_id = $id;
        $_table = $table;
        $stop = false;
        while(!$stop) {
            array_push($updates, array(
                "id" => $_id,
                "table" => $_table
            ));
                        
            $data = $this->getByPk($_table, $_id, $op);
            $local_cache[$_table] = array();
            $local_cache[$_table][$_id] = $data;
            
            if (array_key_exists("_super", $data)) {
                $super_id = $data["_super"]["id"];
                $_id = $super_id;
                $_table = $_model[$_table]["_extends"];
            } else {
                $stop = true;
            }
        }
        $updates = array_reverse($updates);
        
        // Ahora me fijo si hay subclases que haya que actualizar su caché _super
        $_id = $id;
        $_table = $table;
        $stop = false;
        while(!$stop) {
            if (array_key_exists("_sub_table", $_model[$_table])) {
                if (array_key_exists($table, $local_cache) && array_key_exists($_id, $local_cache[$_table])) {
                    $data = $local_cache[$_table][$_id];
                } else {
                    $data = $this->getByPk($_table, $_id, $op);
                }
                $_id = $data["id"];
                $_table = $data["_sub_table"];
                array_push($updates, array(
                    "id" => $_id,
                    "table" => $_table
                ));
            } else {
                $stop = true;
            }
        }
        
        unset($changes["id"]);
        $result = $this->_http_put_down($updates, $changes, $op);
        
        return array("$table" => $result);
    }
        
    public function http_delete_id($table, $id, $op = array()) {
        global $config; $namespace = $config['namespace'];
        trace("$namespace.http_delete_id($table, $id)");
        $attribs = $this->get_table_attribs($table);
        $this->aux_connect();
        
        $table = mysqli_real_escape_string($this->connection, $table);
        $sql = "DELETE FROM $table WHERE id=" . $this->prepare_for_sql($id, $attribs["id"]) . ";";
 
        if (!$this->connection->query($sql)) {
            error_log("ERROR: $sql");
            return new Response('{"error":"Error excecuting sql: ' . $sql . '"}', 500);
        }
        
        return array("deleted" => $id);
    }
    
    public function http_delete($table, $select, $op = array()) {
        global $config; $namespace = $config['namespace'];
        trace("$namespace.http_delete($table, select)", $select);
        if ($select) {
            if (is_string($select)) {
                $find = json_decode($select);
            } else {
                $find = $select;
            }
            $op["trigger"] = true;
            $result = $this->app["db"]->delete($table, $find, $op);
        } else {
            error("missing select query");
        }
        return $result;
    }
    
    
    // -------------------
    
    public function cancelOperation($return_object) {
        $this->cancel = $return_str;
    }
    
    public function getSuperclases($class) {
        $_model = $this->DATA["model"];
        $list = array();
        array_push($list, $class);
        $keep = true;
        $current_class = $class;
        while ($keep) {
            $current = $_model[$current_class];
            // trace("getSuperclases($class) -> current_class", $current_class, "(",array_key_exists("_extends", $current),") current", $current);
            if (array_key_exists("_extends", $current)) {
                $current_class = $current["_extends"];
                array_push($list, $current_class);
                $current = $_model[$current_class];
            } else {
                $keep = false;
            }
        }
        // trace("getSuperclases($class) -> ", $list);
        return $list;
    }
    
    public function getSubClases($superclass, $includeSuperClases = false) {
        $_model = $this->DATA["model"];
        // if (array_key_exists($superclass, $this->DATA["model"])) return array(); // no es una clase abstracta
        
        $list = array();
        foreach ($_model as $table => $attribs) {
            if (array_key_exists("_extends", $attribs)) {
                if ($attribs["_extends"] == $superclass) {
                    if (!$attribs["_subclasses"]) {
                        array_push($list, $table); // extienden directamente de $superclass
                    } else {
                        $subclases = $this->getSubClases($table);
                        if ($includeSuperClases) {
                            array_push($list, $subclases);
                        }
                        foreach ($subclases as $_table) {
                            array_push($list, $_table);
                        }                        
                    }
                }
            }
        }
        // trace("getSubClases($superclass)", $list);
        return $list;
    }
    
    public function isNotASpec($name) {
        if ($name == "_extends") return true;
        if ($name == "_subclasses") return true;
        return false;
    }
        
    public function restAPI($database, $password, $data, $app) {
        $this->database = $database;
        $this->password = $password;
        $this->DATA = $data;
        $this->app = $app;
        $self = $this;
         
         
        if (!isset($this->DATA["model"])) {
            trace("ERROR: data must have a model ");
            return;
        }
         
        $this->condition_data();
        //trace("restAPI($database) --> " ,$data);
         
         
        foreach ($this->DATA["model"] as $table => $attribs) {
            // $api = $table . "s";
            $api = $table;
             
            foreach ($attribs as $name => $spec) {
                if ($this->isNotASpec($name)) continue;
                $this->DATA["model"][$table][$name]["name"] = $name;                
                $this->DATA["model"][$table][$name]["table"] = $table;
            }

            $app->get("/$api", function() use ($app, $self) {
                if ($_SERVER['REQUEST_METHOD'] !== 'GET') return '{"error":"REQUEST_METHOD must be GET}';
                
                $table = explode("/", $app["request"]->getPathInfo())[1];
                $select = $app["request"]->query->get('select');
                $details = $app["request"]->query->get('details');
                $op = array("secure" => true, "no-detail" => !$details);
                
                $this->trigger("get", $table, $select, $op);
                return json_encode($self->http_get($table, $select, $op));
            });
 
            $app->get("/$api/{id}", function($id) use ($app, $self) {
                if ($_SERVER['REQUEST_METHOD'] !== 'GET') return '{"error":"REQUEST_METHOD must be GET}';
                $table = explode("/", $app["request"]->getPathInfo())[1];
                $this->trigger("get_id", $table, $id, $table);
                return json_encode($self->http_get_id($table, $id));
            });
 
            $app->post("/$api", function() use ($app, $self) {
                if ($_SERVER['REQUEST_METHOD'] !== 'POST') return '{"error":"REQUEST_METHOD must be POST}';
                $table = explode("/", $app["request"]->getPathInfo())[1];
                $object = json_decode($app["request"]->getContent(), true);
                $op = array("skip_db" => true, "secure" => true);
                $this->trigger("post", $table, $object, $op);
                return json_encode($self->http_post($table, $object, $op));
            });
 
            $app->put("/$api/{id}", function($id) use ($app, $self) {
                if ($_SERVER['REQUEST_METHOD'] !== 'PUT') return '{"error":"REQUEST_METHOD must be PUT}';
                $table = explode("/", $app["request"]->getPathInfo())[1];
                $changes = json_decode($app["request"]->getContent(), true);
                $self->aux_connect();
                $op = array("skip_db" => true, "secure" => true);
                $changes["id"] = $id;
                $this->trigger("put", $table, $changes, $op);
                return json_encode($self->http_put($table, $id, $changes, $op));
            });            
             
            $app->delete("/$api/{id}", function($id) use ($app, $self) {
                if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') return '{"error":"REQUEST_METHOD must be DELETE}';
                $table = explode("/", $app["request"]->getPathInfo())[1];
                $this->trigger("delete_id", $table, $id, $table);
                return json_encode($self->http_delete_id($table, $id));
            });
             
            $app->delete("/$api", function() use ($app, $self) {
                if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') return '{"error":"REQUEST_METHOD must be DELETE}';
                $table = explode("/", $app["request"]->getPathInfo())[1];
                $select = $app["request"]->query->get('select');
                $this->trigger("delete", $table, $select, $table);
                return json_encode($self->http_delete($table, $select));
            });
        }
        
        
        
        /*
        acá tengo que iterar sobre las superclases y crear un REST API
        el handler debería recaudar info de cuales son las tablas que heredan de la super clas y
        ejecutar en cada una d eellas la operación deseada.
        */
        
         
        if (isset($this->DATA["calculated"])) {            
            foreach ($this->DATA["calculated"] as $table => $func) {
                $app["db"]->on("get:$table/id", function ($e, $op, $app, $table) {
                    $func = $this->DATA["calculated"][$table];
                    return $func($e, $e["id"], $op, $app);
                });
                $app["db"]->on("get:$table", function ($ess, $op, $app, $table) {
                    $func = $this->DATA["calculated"][$table];
                    foreach($ess as $key => $e) {
                        $ess[$key] = $func($ess[$key], $e["id"], $op, $app);
                    }
                    return $ess;
                });
            }
        }
         
        return ;
    }    
 
    public function on($name, $callback) {
        if (!isset($this->listeners[$name])) {
            $this->listeners[$name] = array();
        }
        array_push($this->listeners[$name], $callback);
    }
     
    public function trigger($name, $e, $op, $api) {
        $temp = $e;
        if (!isset($this->listeners[$name])) {
            return $e;
        }
        foreach($this->listeners[$name] as $callback) {
            $aux = $callback($temp, $op, $this->app, $api);
            if (isset($aux)) $temp = $aux;
        }
        return $temp;
    }
     
    public function getAll($table, $op) {
        // trace("getAll($table)");
        $attribs = $this->get_table_attribs($table);
         
        $this->aux_connect();
        $dbtable = $this->get_db_name($table);
        $sql = "Select * from $dbtable where true;";
        $query = $this->connection->query($sql);
         
        $result = array ( $table => array()  );
        while($row = $query->fetch_assoc()) {
            $obj = array();
            foreach ($attribs as $name => $spec) {
                if ($this->isNotASpec($name)) continue;
                $obj = $this->prepare_for_json($obj, $name, $row, $spec, $op);
            }
            if (isset($op["mapping"])) {
                $attr = $op["mapping"];
                $key = "$attr-" . $obj[$attr];
                $result[$table][$key] = $obj;
            } else {
                array_push($result[$table], $obj);
            }
        }
         
        if (array_key_exists("json", $op) && $op["json"]) {
            return json_encode($result);
        }
        return $result[$table];
    }
        
    public function format_json($table, $target, $op = array()) {
        // trace("format_json($table)");
        $attribs = $this->get_table_attribs($table);
        $obj = $target;
        foreach ($attribs as $name => $spec) {
            if ($this->isNotASpec($name)) continue;
            $obj = $this->prepare_for_json($obj, $name, $target, $spec, $op);
        }
        return $obj;
    }
     
    public function getByPk($table, $id, $op = array()) {
        // trace("getByPk($table, $id)");                    
        $attribs = $this->get_table_attribs($table);
         
        $this->aux_connect();
        $dbtable = $this->get_db_name($table);
        $sql = "Select * from $dbtable where id=" . $this->prepare_for_sql($id, $attribs["id"]) . ";";    
         
        $query = $this->connection->query($sql);
         
        if (!$query) trace("ERROR: $sql");
         
        $result = array ($table=>null);
        if($row = $query->fetch_assoc()) {
            
            $obj = $this->format_json($table, $row, $op);
            /*
            $obj = array();
            foreach ($attribs as $name => $spec) {
                $obj = $this->prepare_for_json($obj, $name, $row, $spec, $op);
            }
            */
            $result = array( $table => $obj );
        }
         
        /*if (array_key_exists("json", $op) && $op["json"]) {
            return json_encode($result);
        }*/
         
        return $result[$table];
    }
     
    public function resolve_condition($attr, $cond, $attribs, $options = array()) {
        // trace("resolve_condition($attr) <-", $cond);
        if (isset($options["alert"])) {
            return "";
        }
        $dbattr = $this->get_db_name($attr);
        $sql = "";        
        if (is_object($cond) || is_array($cond)) {
            $cond = (array)$cond;
            // trace("YES");
            // {"$gt":"2016-10-09 16:36:51"}
            if (array_key_exists('$ne', $cond)) {
                $sql .= "$dbattr!=";
                $cond = $cond['$ne'];
                $sql .= $this->prepare_for_sql($cond, $attribs[$attr]);
            } else if (array_key_exists('$gt', $cond)) {
                $sql .= "$dbattr>";
                $cond = $cond['$gt'];
                $sql .= $this->prepare_for_sql($cond, $attribs[$attr]);
            } else if (array_key_exists('$gte', $cond)) {
                $sql .= "$dbattr>=";
                $cond = $cond['$gte'];
                $sql .= $this->prepare_for_sql($cond, $attribs[$attr]);
            } else if (array_key_exists('$lt', $cond)) {
                $sql .= "$dbattr<";
                $cond = $cond['$lt'];
                $sql .= $this->prepare_for_sql($cond, $attribs[$attr]);
            } else if (array_key_exists('$lte', $cond)) {
                $sql .= "$dbattr<=";
                $cond = $cond['$lte'];
                $sql .= $this->prepare_for_sql($cond, $attribs[$attr]);
            } else if (array_key_exists('$or', $cond) || array_key_exists('$and', $cond)) {
                if (array_key_exists('$or', $cond)) {
                    $values = (array) $cond['$or'];
                    $op = "OR";
                } else {
                    $values = (array) $cond['$and'];
                    $op = "AND";
                }
                $sql .= "(";
                $first = true;
                foreach($values as $val) {
                    if (!$first) $sql .= " $op ";
                    $sql .= $this->resolve_condition($attr, $val, $attribs, $options);
                    $first = false;
                }
                $sql .= ")";
            } else {
                // $sql .= "$dbattr=" . $this->prepare_for_sql($cond, $attribs[$attr]);                
                trace("ERROR: caso no implementado", $cond);
            }
        } else {
//trace("prepare_for_sql()", $attr, $cond, $attribs[$attr]);
             
            $sql .= "$dbattr=" . $this->prepare_for_sql($cond, $attribs[$attr]);
        }        
 
// trace("resolve_condition() -> '$sql'");
        return $sql;        
    }
     
    public function conditions($table, $conditions, $op = "AND", $options = array()) {
        // trace("conditions($table, $op) <-", $conditions, $options);
        $attribs = $this->get_table_attribs($table);
        $first = true;
        $sql = "";
        if (isset($conditions)) {
            foreach($conditions as $attr => $cond) {
                if (!$first) $sql .= " $op ";
    // trace('is_array($cond)', is_array($cond), $attr, $cond);
                if (is_array($cond) && ($attr == '$or' || $attr == '$and')) {
                    $values = (array) $cond;
                    if ($attr = '$or') {
                        $_op = "OR";
                    } else {
                        $_op = "AND";
                    }
    // trace('op:', $attr, "cond:", $cond);
                    $sql .= "(" . $this->conditions($table, (array) $values, $_op) . ")";
                } else if (is_numeric($attr)) {
    // trace('index', $attr, "cond:", $cond);
                    if (is_array($cond)) {
                        if (array_key_exists('$or', $cond) || array_key_exists('$and', $cond)) {
                            if (array_key_exists('$or', $cond)) {
                                $values = (array) $cond['$or'];
                                $_op = "OR";
                            } else {
                                $values = (array) $cond['$and'];
                                $_op = "AND";
                            }
                            $sql .= "(" . $this->conditions($table, (array) $values, $_op) . ")";
                        } else {
                            foreach($cond as $_attr => $_cond){
                                $sql .= $this->resolve_condition($_attr, $_cond, $attribs, $options);
                                break;
                            }
                        }
                    } else if (is_object($cond)) {
                        if (property_exists($cond, '$or') || property_exists($cond, '$and')) {
                            if (property_exists($cond, '$or')) {
                                $values = (array) $cond->$or;
                                $_op = "OR";
                            } else {
                                $values = (array) $cond->$and;
                                $_op = "AND";
                            }
                            $sql .= "(" . $this->conditions($table, (array) $values, $_op) . ")";
                        } else {
                            foreach($cond as $_attr => $_cond){
                             trace("---->", $_attr, $_cond);
                                $sql .= $this->resolve_condition($_attr, $_cond, $attribs, $options);
                                break;
                            }
                        }
                    }

                } else {
                    if (!array_key_exists($attr, $attribs)) {
                        // trace("--> property '$attr' on table '$table' not declared. Condition: ", $conditions);
                        if (isset($options["alert"])) {
                            return null;
                        } else {
                            trace("ERROR: property '$attr' on table '$table' not declared. Condition: ", $conditions);
                        }
                    }
    // trace(" '$sql' ---->", $attr, $cond);
                    $sql .= $this->resolve_condition($attr, $cond, $attribs, $options);
                }
                $first = false;
            }
        } else {
             $sql = "TRUE";
        }
        if (sizeof($conditions) == 0) $sql = "TRUE";
        // trace("conditions() -> '$sql'");
        return $sql;
    }
     
    public function get_table_attribs($table) {        
        if (array_key_exists("$table", $this->DATA["model"])) {
            // trace("get_table_attribs($table)", $this->DATA);
            return $this->DATA["model"][$table];
        } else {
            trace("ERROR: table '$table' not declared");
            return array();
        }
    }
     
    public function select($table, $conditions, $options = array()) {
        // trace("select($table)", $conditions);
         
        $op = $options ? $options : array();        
        $attribs = $this->get_table_attribs($table);
         
        $this->aux_connect();
        $dbtable = $this->get_db_name($table);
        $sql = "Select * from $dbtable where ";
        $sql .= $this->conditions($table, $conditions);
        if (array_key_exists("order", $op)) {
            $sql .=" ORDER BY " . $op["order"]["by"];
            if (array_key_exists("wey", $op["order"])) {
                $sql .=" " . $op["order"]["wey"];
            }
        }
         
        $sql .= ";";
        // trace($sql); 
        $query = $this->connection->query($sql);        
        $result = array ( $table => array()  );
         
         
        if (!$query) {
            trace("ERROR: sql: $sql");
        } else {
            while($row = $query->fetch_assoc()) {
                $obj = array();
                foreach ($attribs as $name => $spec) {
                    if ($this->isNotASpec($name)) continue;
                    $obj = $this->prepare_for_json($obj, $name, $row, $spec, $op);
                }
                if (isset($op["mapping"])) {
                    $attr = $op["mapping"];
                    $key = "$attr-" . $obj[$attr];
                    // trace("select attr: $attr");
                    // trace("select key: $key");

                    $result[$table][$key] = $obj;
                    // trace('$result', $result);      
                    
                } else {
                    array_push($result[$table], $obj);
                }
            }
        }
        // if ($query) trace($sql, sizeof($row));        
        // if ($query) trace($sql, $result);    
         
        if (array_key_exists("debug", $op) && $op["debug"]) {
            trace($sql . ": " . sizeof($result[$table])); 
        } else {
            // trace("no hay debug", $op); 
        }    
         
        if (array_key_exists("json", $op) && $op["json"]) {
            return json_encode($result);
        }
        return $result[$table];
    }    
 
    public function prepare_for_json($obj, $name, $row, $spec, $op = array()) {
 
        if (!$this->connection) {
            $this->aux_connect();
        }
        if (is_string($spec)) trace('ERROR: $spec is a string', $obj, $name, $spec, $row);
        if (array_key_exists("calculated", $spec) && $spec["calculated"]) return $obj;
 
        $dbname = $this->get_db_name($name);
        $table = $spec["table"];
        if (!array_key_exists($dbname, $row)) {
            if (!isset($op["skip_db"])) {
                trace("ERROR: la propiedad '$name' declarada en el modelo '$table' no existe en la base de datos. Hay q resetear la base.");
            }
            return $obj;
        }
        $value = $row[$dbname];
        $type = $spec["type"];
// trace("prepare_for_json $name ($type)", $value);
        if (!json_encode($value) && $value != 0 && $value != false) {
            error_log("ERROR: El valor '$value' para el atributo '".$spec["name"]. "' no puede convertirse en json");            
        }
         
        if (strpos($type, 'json') !== false || strpos($type, 'cache') !== false) {
            if (!is_string($value)) {
                return $obj;
            }
            if ($value == "") {
                $value = null;
            } else if ($value == "0") {
                $value = 0;
            } else {
                $aux = json_decode($value, true);
                if (!$aux) {
                    if ($value == "[]" || $value == "{}") {
                        $value = array();
                    } else {
                        trace("ERROR: la propiedad '$name' declarada como $type tiene error de sintaxis.", $value);
                        return $obj;
                    }
                } else {
                    $value = $aux;
                }
            }
        }
         
        if (strpos($type, 'pk') !== false) {
            $value = intval($value);
        }
         
        if (strpos($type, 'id') !== false) {
            $value = intval($value);
        }
         
        if (strpos($type, 'int') !== false) {
            $value = intval($value);
        }
         
        if (strpos($type, 'float') !== false) {
            $value = floatval($value);
        }
         
        if (strpos($type, 'double') !== false) {
            $value = doubleval($value);
        }
         
        if (strpos($type, 'boolean') !== false) {
            if ($value) {
                $value = true;
            } else {
                $value = false;
            }
        }
         
        if (isset($spec["ref"])) {
            if (is_object($value)) {
                trace("ERROR: caso no implementado ", $value->id);
            }
            
            if (is_array($value) && isset($value["id"])) {
                $value = $value["id"];
            } else {
                $value = intval($value);
            }
            
            if ($value > 0) {
                $value = array("id" => $value);
            } else {
                $value = null;
            }
        }
 
        if (array_key_exists("secure", $op) && $op["secure"]) {
            if (!array_key_exists("private", $spec) || !$spec["private"]) {
                // me estan pidiendo datos para exportar afuera (json) así que tomo en cuenta que dato es privado
                $obj[$name] = $value;
            }
        } else {
            // me estan pidiendo datos internamente así que devuelvo todo
            $obj[$name] = $value;
        }
         
         
        if (array_key_exists("no-detail", $op) && $op["no-detail"]) {
            // trace("no-detail: $name");
            // me estan pidiendo omitir los atributos que están marcados como detail
            if (array_key_exists("detail", $spec) && $spec["detail"]) {
                unset($obj[$name]);
            }            
        }
 
        return $obj;
    }
     
    public function prepare_for_sql($value, $spec) {
        if (!$this->connection) {
            $this->aux_connect();
        }
        
        if (is_string($value)) {
            $value = mysqli_real_escape_string($this->connection, $value);
        }
        
        $use_quote = false;    
        $name = $spec["name"];
// trace("prepare_for_sql()", $value, $spec);
 
        if (strpos($spec["type"], 'varchar') !== false ||
           strpos($spec["type"], 'string') !== false ||
           strpos($spec["type"], 'text') !== false ||
           strpos($spec["type"], 'json') !== false ||
           strpos($spec["type"], 'cache') !== false) {
            $use_quote = true;
        }
         
        if (strpos($spec["type"], 'date') !== false ||
           strpos($spec["type"], 'time') !== false) {
            $use_quote = true;
            if (is_string($value)) {
                if ($value == "CURRENT_TIMESTAMP") {
                    $use_quote = false;
                } else {
                    $d = \DateTime::createFromFormat('Y-m-d', $value);
                    if ($d) {
                        $value = $d->format('Y-m-d');
                    }
                }
            } else {
                trace("ESTO NUNCA FUE TESTEADO. FUNCIONA?");
                $value = $value->format('Y-m-d');
                trace("...SI, AL PARECER FUNCIONA");
            }
        }
         
        if (isset($spec["ref"])) {
// trace("prepare_for_sql($name) es user datatype: ", $value);            
            if (is_array($value) && isset($value["id"])) {
                $value = $value["id"];
            } else if (is_object($value) && property_exists($value, "id")) {
                $value = $value->id;
            } else if (is_numeric($value) && $value > 0) {
                // value is ok
            } else {
// trace("prepare_for_sql($name) --> 0");
// trace("prepare_for_sql($name) is_string(value): ", is_string($value));            
// trace("prepare_for_sql($name) is_object(value): ", is_object($value));            
// trace("prepare_for_sql($name) is_array(value): ", is_array($value));            
// trace("prepare_for_sql($name) is_numeric(value): ", is_numeric($value));            
                $value = 0;
            }
        }
         
        $str = "";
        // if ($use_quote) $str .="\"";
        if ($use_quote) $str .="'";
        if (is_object($value) || is_array($value)) {
            if (strpos($spec["type"], 'json') !== false || strpos($spec["type"], 'cache') !== false) {
                $value = json_encode($value);
            } else {
                trace("prepare_for_sql() El siguiente no es una string ni un numero: ", $value );
                trace("spec", $spec);
            }
        }
        $aux = $this->connection->real_escape_string($value);
        if ("$aux" == "" && !$use_quote) {
            if (strpos($spec["type"], 'boolean') !== false) {
                if (!$value) { $aux = 0; } else { $aux = 1; }
                $str .= $aux;
            } else if (isset($spec["ref"])) {
                $str .= "null";
            } else {
                // trace("prepare_for_sql() El siguiente valor no lleva comillas y sin embargo evalua '': ", $value, $spec);
            }
        } else {
            $str .= $aux;
        }
         
        // if ($use_quote) $str .="\"";
        if ($use_quote) $str .="'";
        return $str;
    }
     
    public function create($table, $item, $options = array()) {
        global $config; $namespace = $config['namespace'];
        trace("$namespace.create($table, item, options)", $item, $options);
        $op = $options ? $options : array();        
        $attribs = $this->get_table_attribs($table);
        $this->aux_connect();
         
        $body = $item;
        if (is_string($item)) {
            $body = json_decode($item, true);
        }
        // INSERT INTO log (quien,que,descripcion) VALUES (,2,\\"este es nuevo\\",\\"creado desde la web\\");
        $dbtable = $this->get_db_name($table);
        $sql = "INSERT INTO $dbtable (";
        $first = true;
        foreach ($body as $key => $value) {
            if (array_key_exists($key, $attribs)) {
                if (array_key_exists("calculated", $attribs[$key]) && $attribs[$key]["calculated"]) continue;
                if ($key == "id" && !$options["useid"]) continue;
                if (!$first) $sql .= ",";
                $dbkey = $this->get_db_name($key);
                $sql .= $dbkey;
                $first = false;
            }            
        }        
        $sql .= ") VALUES (";
        $first = true;
        foreach ($body as $key => $value) {
            if (array_key_exists($key, $attribs)) {
                if (array_key_exists("calculated", $attribs[$key]) && $attribs[$key]["calculated"]) continue;
                if ($key == "id" && !$options["useid"]) continue;
                if (!$first) $sql .= ",";
                
                // trace($key, is_string($value), $value);
                
                $sql .= $this->prepare_for_sql($value, $attribs[$key]);
                $first = false;
                /*
                if (!array_key_exists("calculated", $attribs[$key]) || !$attribs[$key]["calculated"]) {
                    if (!$first) $sql .= ",";
                    $sql .= $this->prepare_for_sql($value, $attribs[$key]);
                    $first = false;
                }
                */
            }
        }        
        $sql .= ");";
                
        if (array_key_exists("debug", $options)) {
            trace($sql);
        }
 
        if (!$this->connection->query($sql)) {
            trace("ERROR: $sql");
            return new Response('{"error":"Error excecuting sql: ' . $sql . '"}', 500);
        } else {
            $id = mysqli_insert_id($this->connection);
        }
        // trace("id:", $id);
        // return $this->getByPk($table, $id, $op);
        return $this->API_get_id($table, $id);
    }
     
    public function update($table, $id, $updates, $options = array()) {
 // trace("update($table, $id, updates, json)", $updates);
        $op = $options ? $options : array();    
        $attribs = $this->get_table_attribs($table);
         
        $this->aux_connect();
        $body = $updates;
        if (is_string($body)) {
            $body = json_decode($updates, true);
        }
         
        $first = true;
        $dbtable = $this->get_db_name($table);
        $sql = "UPDATE $dbtable SET ";
        $cancel = true; // Esto es para evitar el "UPDATE publisher SET  WHERE id=1" cuando no hay nada que cambiar
        foreach ($body as $key => $value) {
            if (array_key_exists($key, $attribs)) {
                if (!array_key_exists("calculated", $attribs[$key]) || !$attribs[$key]["calculated"]) {
                    if (!$first) $sql .= ", ";
                    $dbkey = $this->get_db_name($key);
                    $sql .= "$dbkey=" . $this->prepare_for_sql($value, $attribs[$key]);            
                    $first = false;
                    $cancel = false; // hay al menos una propiedad que va a cambiar así que no cancelamos
                }
            }            
        }
        if (array_key_exists("condition", $op)) {
            $sql .= " WHERE " . $this->conditions($table, $op["condition"]);
        } else {
            $sql .= " WHERE id=" . $this->prepare_for_sql($id, $attribs["id"]) . ";";            
        }
         
        // trace($sql);
        
        if (!$cancel) {
            if (!$this->connection->query($sql)) {
                error_log("ERROR: $sql");
                return new Response('{"error":"Error excecuting sql: ' . $sql . '"}', 500);
            }
        }
         
        if (array_key_exists("condition", $op)) {
            // trace("WARNING: en un update con condiciones no se esta devolviendo lo mismo que un GET con las mismas condiciones. FALTA IMPLEMENTAR");
            return $this->select($table, $op["condition"], $op);            
        } else {
            // return $this->getByPk($table, $id, $op);
            return $this->API_get_id($table, $id);
        }
    }
     
    public function deleteByPk($table, $id, $options = array()) {
        trace("deleteByPk($table, $id) DEPRECATED !!!!");
        trace("deleteByPk($table, $id) DEPRECATED !!!!");
        trace("deleteByPk($table, $id) DEPRECATED !!!!");
        return $this->http_delete_id($table, $id, $options);
    }    
     
    public function delete($table, $conditions, $op = array()) {
        $result = $this->select($table, $conditions, array());
        /*if (sizeof($result) == 0){
            return error("No existe en la tabla $table una tupla que cumpla con esas condiciones: " . json_encode($conditions));
        }*/
        $ids = array();
        $count = 0;
        foreach ($result as $key => $value) {
            array_push($ids, $value["id"]);
            if (is_array($op) && array_key_exists("trigger", $op) && $op["trigger"]) {
                $this->trigger("delete:$table/id", $value, $op, $table);            
            }
            $this->http_delete_id($table, $value["id"]);
            $count += 1;
        }
        $resoult = array(
            "deleted" => $ids
        );
        if (is_array($op) && array_key_exists("json", $op) && $op["json"]) {
            return json_encode($resoult);
        }
         
        return $resoult;
    }
     
    // ------------------------------------------------
     
    public function get_model() {
        if (!isset($this->DATA["model"])) {
            $msg = "ERROR: data doesn't have a model";
            trace($msg);
            return $msg;
        }
        return $this->DATA["model"];
    }

    public function reset() {
        $tables = $this->app["db"]->list_tables();
        if (!is_array($tables)) return $tables;
        
        foreach ($tables as $table) {
            $result = $this->app["db"]->drop_table($table);
            if (!is_array($result)) return $result;
        }
        
        $model = $this->app["db"]->get_model();
        
        foreach ($model as $table => $attribs) {
            $result = $this->app["db"]->create_table($table);
            if (!is_array($result)) return $result;
        }
        
        if (isset($this->DATA["populate"])) {
            if (isset($this->DATA["populate"]["init"])) {
                $func = $this->DATA["populate"]["init"];
                $func($this->app);
            }
        }
    
        return $this->app["db"]->list_tables();     
    }
     
    public function list_tables() {
        $this->aux_connect();
         
        $sql = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' and TABLE_SCHEMA = '$this->database';";
        $query = $this->connection->query($sql);
         
        $result = array (  );
        while($row = $query->fetch_assoc()) {
            array_push($result, $row["TABLE_NAME"]);
        }
         
        return $result;
    }    
 
    public function table_cols($table) {
         
    }
     
    public function drop_table($table) {
        $this->aux_connect();
        $dbtable = $this->get_db_name($table);
        $sql = "DROP TABLE $dbtable;";
        if (!$this->connection->query($sql)) {
            error_log("ERROR: $sql");
            return new Response('{"error":"Error excecuting sql: ' . $sql . '"}', 500);
        }
         
        return array("dropped"=>"$table");
    }
     
     
    public function empty_table($table) {
        $this->aux_connect();
        $dbtable = $this->get_db_name($table);
        $sql = "TRUNCATE TABLE $dbtable;";
        if (!$this->connection->query($sql)) {
            error_log("ERROR: $sql");
            return new Response('{"error":"Error excecuting sql: ' . $sql . '"}', 500);
        }
         
        return array("empty"=>"$table");
    }
     
    public function get_db_type($type) {
        switch ($type) {
            case "pk":
            case "id":
                return $this->ID_REF;
            case "cache":
            case "json":
                return "text";
            default:
                 
                foreach ($this->DATA["model"] as $name => $model) {
                    if ($type == $name) {
                        return $this->ID_REF;
                    }
                }
                 
                return $type;
        }
    }
     
    public function get_db_name($attr) {
        switch ($attr) {
            case "values": return "_values";
            case "match":  return "_match";
            case "group":  return "_group";
            case "select":  return "_select";
            case "count":  return "_count";
            case "order":  return "_order";
            case "index":  return "_index";
        }
        return $attr;
    }
     
    public function get_default_value($spec) {
        $name = $spec["name"];
        if (strpos($spec["type"], 'varchar') !== false ||
           strpos($spec["type"], 'string') !== false) {
            // trace("get_default_value", $spec, "--> ''");
            return "''";
        }
         
        if (strpos($spec["type"], 'date') !== false ||
           strpos($spec["type"], 'time') !== false) {
            // trace("get_default_value", $spec, "--> 'CURRENT_TIMESTAMP'");
            return "CURRENT_TIMESTAMP";
        }
         
        if (strpos($spec["type"], 'json') !== false ||
           strpos($spec["type"], 'text') !== false ||
           strpos($spec["type"], 'cache') !== false) {
            // trace("get_default_value", $spec, "--> NULL");
            return 'NULL';
        }
         
        if (strpos($spec["type"], 'boolean') !== false) {
            // trace("get_default_value", $spec, "--> 'false'");
            return 'false';
        }
         
        // trace("get_default_value", $spec, "--> 0");
        return 0;
    }
     
    public function create_table($table, $cols = null, $index = null) {
        trace("create_table", $table);
        $this->aux_connect();
        if ($cols == null) {
            if (isset($this->DATA["model"]) && isset($this->DATA["model"][$table])) {
                $cols = $this->DATA["model"][$table];
            } else {
                return new Response('{"error":"table: ' . $table . ' not specified in model.php data structure"}', 500);
            }
        }
        $dbtable = $this->get_db_name($table);
        $sql = "CREATE TABLE $dbtable (";
        $first = true;
        $id = null;
         
        // return $cols;
        foreach ($cols as $col => $spec) {
            if ($this->isNotASpec($col)) continue;
            if (isset($spec["calculated"])) continue;
            if (!$first) $sql .=",";
            $first = false;
            $spec = (array) $spec;
        
             
            $type = $this->get_db_type($spec["type"]);
            $col = $this->get_db_name($col);
            $default = "";
            if (isset($spec["default"])) {
                $default = "DEFAULT " . $spec["default"];
            } else {
                $default = "DEFAULT " . $this->get_default_value($spec);
            }
            if ($spec["type"] == "pk") $id = $col;
            $sql .="$col $type $default"; // NOT NULL
        }
        $sql .=") ENGINE=InnoDB DEFAULT CHARSET=latin1;";
         
        if (!$this->connection->query($sql)) {
            error_log("ERROR: $sql"); return new Response('{"error":"Error excecuting sql: ' . $sql . '"}', 500);
        }
         
        $sql = "ALTER TABLE $dbtable ADD PRIMARY KEY ($id);";
        if (!$this->connection->query($sql)) {
            error_log("ERROR: $sql"); return new Response('{"error":"Error excecuting sql: ' . $sql . '"}', 500);
        }
         
        $sql = "ALTER TABLE $dbtable MODIFY $id int(11) NOT NULL AUTO_INCREMENT;";
        if (!$this->connection->query($sql)) {
            error_log("ERROR: $sql"); return new Response('{"error":"Error excecuting sql: ' . $sql . '"}', 500);
        }
         
        return array("created"=>"$table");
    }    
     
}