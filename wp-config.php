<?php
define( 'WP_CACHE', true );
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'u465815020_4IAy5' );

/** Database username */
define( 'DB_USER', 'u465815020_Lc4tk' );

/** Database password */
define( 'DB_PASSWORD', 'ilZbyz9cRR' );

/** Database hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'bT4JmeA+8Db0Jv[94x8z)9oh^IY#uOIrXA1g9:%CUw=8pBpbR/`!M`Pp_(QpX| $' );
define( 'SECURE_AUTH_KEY',   '.b>),!WAs:x/Gk!1Z:hs(O_Nb8`ba;tz1+N{2[sC@UmyHl G2(l08:B}vM#5QYyK' );
define( 'LOGGED_IN_KEY',     ' )UIhW %r]d*=@v{e4b/fV.]$Zm^8j`3A-n1ZY;=<,yBfV*f+Af}5#~Z#:kTIeT$' );
define( 'NONCE_KEY',         'At)NYq+G54.wBDqo4SaT7oALEpGdj[uJ|H0p?E-]gs9V<X]tSzm5<.o;Lt0O#5hi' );
define( 'AUTH_SALT',         'lx.crJ^OUWxj-%Y&{=cdTmVYRDEiB_9n5Wkzb%RL}D;)a1acEJPuuoUv.;J?X&!2' );
define( 'SECURE_AUTH_SALT',  'U:{Jl9eV/h`bUhpnLu>`S,+kyE{T]]Q$p4R=Uqwkvb7Ip|5O@+BU^cG-*j/U!=wH' );
define( 'LOGGED_IN_SALT',    '|_d+9;4<w` &6_<}*+}&{:KSwy6h[?qkBGK|d7kl`,fHYG{K@N<tNuE|Y{C5dE%:' );
define( 'NONCE_SALT',        '!VqD*/0zML,f3_@XmIl%v=)VO _m1./(&ZeiB; &2H^IZ[CrHS_M)Q9np@J?(r_x' );
define( 'WP_CACHE_KEY_SALT', '9-H0ue[F-YEWbH.n,Uj,@pQtl=A%a[&V+W17>*H;7m/9S$cM;b_?X2e<*Prs*dlL' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );


/* Add any custom values between this line and the "stop editing" line. */



define( 'FS_METHOD', 'direct' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
