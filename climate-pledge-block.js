// Gutenberg Block for Climate Action Pledge
(function(blocks, element, editor) {
    var el = element.createElement;
    var InspectorControls = editor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.TextControl;
    var ToggleControl = wp.components.ToggleControl;

    blocks.registerBlockType('climate-pledge/widget', {
        title: 'Climate Action Pledge',
        icon: 'heart',
        category: 'widgets',
        description: 'Embed the Climate Action Pledge form and wall',
        
        attributes: {
            height: {
                type: 'string',
                default: '800px'
            },
            responsive: {
                type: 'boolean',
                default: true
            },
            url: {
                type: 'string',
                default: ''
            }
        },

        edit: function(props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            function onChangeHeight(newHeight) {
                setAttributes({ height: newHeight });
            }

            function onChangeResponsive(newResponsive) {
                setAttributes({ responsive: newResponsive });
            }

            function onChangeUrl(newUrl) {
                setAttributes({ url: newUrl });
            }

            return [
                el(InspectorControls, { key: 'inspector' },
                    el(PanelBody, { title: 'Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Height',
                            value: attributes.height,
                            onChange: onChangeHeight,
                            help: 'Set the height of the widget (e.g., 800px, 100vh)'
                        }),
                        el(ToggleControl, {
                            label: 'Responsive',
                            checked: attributes.responsive,
                            onChange: onChangeResponsive,
                            help: 'Enable responsive behavior for mobile devices'
                        }),
                        el(TextControl, {
                            label: 'Custom URL (optional)',
                            value: attributes.url,
                            onChange: onChangeUrl,
                            help: 'Override the default pledge site URL'
                        })
                    )
                ),
                el('div', { 
                    key: 'preview',
                    className: 'climate-pledge-block-preview',
                    style: {
                        border: '2px dashed #10b981',
                        borderRadius: '8px',
                        padding: '40px',
                        textAlign: 'center',
                        backgroundColor: '#f0fdf4',
                        minHeight: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                },
                    el('div', {
                        style: {
                            fontSize: '48px',
                            marginBottom: '16px'
                        }
                    }, '🌱'),
                    el('h3', {
                        style: {
                            color: '#10b981',
                            marginBottom: '8px',
                            fontSize: '24px'
                        }
                    }, 'Climate Action Pledge'),
                    el('p', {
                        style: {
                            color: '#6b7280',
                            margin: '0',
                            fontSize: '16px'
                        }
                    }, 'Height: ' + attributes.height + ' | Responsive: ' + (attributes.responsive ? 'Yes' : 'No'))
                )
            ];
        },

        save: function(props) {
            // Return null since this is a dynamic block
            return null;
        }
    });
})(
    window.wp.blocks,
    window.wp.element,
    window.wp.editor
);