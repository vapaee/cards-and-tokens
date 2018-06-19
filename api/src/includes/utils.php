<?php


function _trace_arg($arg) {
    if (is_array($arg) && sizeof($arg) == 0) return "[]";
    if ($arg === null) return "null";
    if ($arg === false) return "false";
    if ($arg === 0) return "0";
    
    return json_encode($arg);
}

function trace($arg1, $arg2 = null, $arg3 = null, $arg4 = null, $arg5 = null, $arg6 = null, $arg7 = null, $arg8 = null) {
    
    if ($arg8 != null) {
        error_log( _trace_arg($arg1) . ", " . _trace_arg($arg2) . ", " . _trace_arg($arg3) . ", " . _trace_arg($arg4) . ", " . _trace_arg($arg5) . ", " . _trace_arg($arg6) . ", " . _trace_arg($arg7) . ", " . _trace_arg($arg8) );
        return;
    }    
    
    if ($arg7 != null) {
        error_log( _trace_arg($arg1) . ", " . _trace_arg($arg2) . ", " . _trace_arg($arg3) . ", " . _trace_arg($arg4) . ", " . _trace_arg($arg5) . ", " . _trace_arg($arg6) . ", " . _trace_arg($arg7) );
        return;
    }
    
    if ($arg6 != null) {
        error_log( _trace_arg($arg1) . ", " . _trace_arg($arg2) . ", " . _trace_arg($arg3) . ", " . _trace_arg($arg4) . ", " . _trace_arg($arg5) . ", " . _trace_arg($arg6) );
        return;
    }
    
    if ($arg5 != null) {
        error_log( _trace_arg($arg1) . ", " . _trace_arg($arg2) . ", " . _trace_arg($arg3) . ", " . _trace_arg($arg4) . ", " . _trace_arg($arg5) );
        return;
    }
    
    if ($arg4 != null) {
        error_log( _trace_arg($arg1) . ", " . _trace_arg($arg2) . ", " . _trace_arg($arg3) . ", " . _trace_arg($arg4) );
        return;
    }
    
    if ($arg3 != null) {
        error_log( _trace_arg($arg1) . ", " . _trace_arg($arg2) . ", " . _trace_arg($arg3) );
        return;
    }
    
    if ($arg2 != null) {
        error_log( _trace_arg($arg1) . ", " . _trace_arg($arg2) );
        return;
    }
    
    error_log( _trace_arg($arg1) );    
}

function startsWith($haystack, $needle) {
     $length = strlen($needle);
     return (substr($haystack, 0, $length) === $needle);
}

function endsWith($haystack, $needle) {
    $length = strlen($needle);
    if ($length == 0) {
        return true;
    }

    return (substr($haystack, -$length) === $needle);
}

function strContains($string, $search_for) { return strpos($string, $search_for) !== false; }
// ------------------------------------------------------------


if (!isset($_SESSION)) {
    session_start();
}
if (!isset($_SESSION)) {
    trace("ERROR: no se pudo iniciar sesion");
} else {
    $_SESSION['valid'] = 'valid';
    if($_SESSION['valid'] != 'valid') {
       trace('ERROR: no funciona el seteo de valores en $_SESSION');
    }
    unset($_SESSION['valid']);
}

