<?php
namespace user\classes;

use \C;

class Route{
        public function run(){

            global $_config;

            require libfile('function/user');
            require libfile('function/mail');
            require libfile('function/profile');

            $dzz = C::app();

            $modarray = array('activate', 'clearcookies', 'getpasswd','', 'lostpasswd','seccode','register','ajax', 'regverify', 'switchstatus','profile','password','avatar','space','sso','qqlogin');

            $mod = !in_array($dzz->var['mod'], $modarray) && (!preg_match('/^\w+$/', $dzz->var['mod'])) ? $_config['default_mod'] : $dzz->var['mod'];

            $_GET['mod'] = $mod;
        }
}