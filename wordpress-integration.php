<?php
/**
 * Climate Action Pledge WordPress Integration
 * 
 * This file provides WordPress integration for the Climate Action Pledge microsite
 * Supports shortcodes, widgets, and Gutenberg blocks
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Climate Action Pledge Widget Class
 */
class Climate_Action_Pledge_Widget extends WP_Widget {
    
    public function __construct() {
        parent::__construct(
            'climate_action_pledge',
            'Climate Action Pledge',
            array('description' => 'Display the Climate Action Pledge form and wall')
        );
    }
    
    public function widget($args, $instance) {
        echo $args['before_widget'];
        
        if (!empty($instance['title'])) {
            echo $args['before_title'] . apply_filters('widget_title', $instance['title']) . $args['after_title'];
        }
        
        $height = !empty($instance['height']) ? $instance['height'] : '800px';
        $this->render_pledge_iframe($height);
        
        echo $args['after_widget'];
    }
    
    public function form($instance) {
        $title = !empty($instance['title']) ? $instance['title'] : 'Climate Action Pledge';
        $height = !empty($instance['height']) ? $instance['height'] : '800px';
        ?>
        <p>
            <label for="<?php echo $this->get_field_id('title'); ?>">Title:</label>
            <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" 
                   name="<?php echo $this->get_field_name('title'); ?>" type="text" 
                   value="<?php echo esc_attr($title); ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('height'); ?>">Height:</label>
            <input class="widefat" id="<?php echo $this->get_field_id('height'); ?>" 
                   name="<?php echo $this->get_field_name('height'); ?>" type="text" 
                   value="<?php echo esc_attr($height); ?>">
        </p>
        <?php
    }
    
    public function update($new_instance, $old_instance) {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? strip_tags($new_instance['title']) : '';
        $instance['height'] = (!empty($new_instance['height'])) ? strip_tags($new_instance['height']) : '800px';
        return $instance;
    }
    
    private function render_pledge_iframe($height = '800px') {
        $iframe_url = get_option('climate_pledge_url', 'https://your-climate-pledge-site.com');
        ?>
        <div class="climate-pledge-container" style="width: 100%; position: relative;">
            <iframe 
                src="<?php echo esc_url($iframe_url); ?>"
                style="width: 100%; height: <?php echo esc_attr($height); ?>; border: none; border-radius: 8px;"
                frameborder="0"
                allowfullscreen
                loading="lazy"
                title="Climate Action Pledge">
            </iframe>
        </div>
        <style>
            .climate-pledge-container iframe {
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            @media (max-width: 768px) {
                .climate-pledge-container iframe {
                    height: 600px !important;
                }
            }
        </style>
        <?php
    }
}

/**
 * Register the widget
 */
function register_climate_pledge_widget() {
    register_widget('Climate_Action_Pledge_Widget');
}
add_action('widgets_init', 'register_climate_pledge_widget');

/**
 * Shortcode for Climate Action Pledge
 */
function climate_pledge_shortcode($atts) {
    $atts = shortcode_atts(array(
        'height' => '800px',
        'responsive' => 'true'
    ), $atts);
    
    $iframe_url = get_option('climate_pledge_url', 'https://your-climate-pledge-site.com');
    $responsive_class = $atts['responsive'] === 'true' ? 'climate-pledge-responsive' : '';
    
    ob_start();
    ?>
    <div class="climate-pledge-shortcode <?php echo esc_attr($responsive_class); ?>">
        <iframe 
            src="<?php echo esc_url($iframe_url); ?>"
            style="width: 100%; height: <?php echo esc_attr($atts['height']); ?>; border: none; border-radius: 8px;"
            frameborder="0"
            allowfullscreen
            loading="lazy"
            title="Climate Action Pledge">
        </iframe>
    </div>
    <style>
        .climate-pledge-shortcode iframe {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .climate-pledge-responsive iframe {
            min-height: 600px;
        }
        @media (max-width: 768px) {
            .climate-pledge-responsive iframe {
                height: 600px !important;
            }
        }
    </style>
    <?php
    return ob_get_clean();
}
add_shortcode('climate_pledge_widget', 'climate_pledge_shortcode');

/**
 * Gutenberg Block Registration
 */
function register_climate_pledge_block() {
    if (!function_exists('register_block_type')) {
        return;
    }
    
    wp_register_script(
        'climate-pledge-block',
        plugins_url('climate-pledge-block.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor'),
        '1.0.0'
    );
    
    register_block_type('climate-pledge/widget', array(
        'editor_script' => 'climate-pledge-block',
        'render_callback' => 'render_climate_pledge_block'
    ));
}
add_action('init', 'register_climate_pledge_block');

/**
 * Render Gutenberg block
 */
function render_climate_pledge_block($attributes) {
    $height = isset($attributes['height']) ? $attributes['height'] : '800px';
    return climate_pledge_shortcode(array('height' => $height, 'responsive' => 'true'));
}

/**
 * Admin settings page
 */
function climate_pledge_admin_menu() {
    add_options_page(
        'Climate Action Pledge Settings',
        'Climate Pledge',
        'manage_options',
        'climate-pledge-settings',
        'climate_pledge_settings_page'
    );
}
add_action('admin_menu', 'climate_pledge_admin_menu');

function climate_pledge_settings_page() {
    if (isset($_POST['submit'])) {
        update_option('climate_pledge_url', sanitize_url($_POST['climate_pledge_url']));
        echo '<div class="notice notice-success"><p>Settings saved!</p></div>';
    }
    
    $current_url = get_option('climate_pledge_url', '');
    ?>
    <div class="wrap">
        <h1>Climate Action Pledge Settings</h1>
        <form method="post" action="">
            <table class="form-table">
                <tr>
                    <th scope="row">Pledge Site URL</th>
                    <td>
                        <input type="url" name="climate_pledge_url" value="<?php echo esc_attr($current_url); ?>" 
                               class="regular-text" placeholder="https://your-climate-pledge-site.com" />
                        <p class="description">Enter the URL where your Climate Action Pledge site is hosted.</p>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
        
        <h2>Usage Instructions</h2>
        <h3>Shortcode</h3>
        <p>Use this shortcode in posts or pages:</p>
        <code>[climate_pledge_widget height="800px" responsive="true"]</code>
        
        <h3>Widget</h3>
        <p>Go to Appearance → Widgets and add the "Climate Action Pledge" widget to any widget area.</p>
        
        <h3>Gutenberg Block</h3>
        <p>In the block editor, search for "Climate Action Pledge" and add the block to your content.</p>
    </div>
    <?php
}

/**
 * Enqueue responsive styles
 */
function climate_pledge_enqueue_styles() {
    wp_enqueue_style('climate-pledge-responsive', plugins_url('climate-pledge-responsive.css', __FILE__));
}
add_action('wp_enqueue_scripts', 'climate_pledge_enqueue_styles');