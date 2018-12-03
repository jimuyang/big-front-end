(function main() {
    'use strict';


    //*******************************************************************************************************/
    /**
     * @const
     */
    let DEFAULT_WIDTH = 600;
    let FPS = 60;

    let IS_HIDPI = window.devicePixelRatio > 1;
    let IS_IOS = /iPad|iPhone|iPod/.test(window.navigator.platform);
    let IS_MOBILE = IS_IOS || /Android/.test(window.navigator.userAgent);

    let IS_TOUCH_ENABLED = 'ontouchstart' in window;


    //*******************************************************************************************************/
    function Runner(outerContainer, opt_config) {
        // singleton
        if (Runner._instance) {
            return Runner._instance;
        }
        Runner._instance = this;

        this.outerContainerEl = document.querySelector(outerContainer);

        // config
        this.config = opt_config || Runner.CONFIG;

        this.loadResources();

        new HorizonLine(this.canvas, this.spriteDef.HORIZON);
    }
    window['Runner'] = Runner;

    /**
     * 默认维度
     */
    Runner.DEFAULT_DIMENSIONS = {
        WIDTH: DEFAULT_WIDTH,
        HEIGHT: 150
    }

    /**
     * 默认CONFIG
     */
    Runner.CONFIG = {
        ACCELERATION: 0.001,
        BG_CLOUD_SPEED: 0.2,
        BOTTOM_PAD: 10,
        CLEAR_TIME: 3000,
        CLOUD_FREQUENCY: 0.5,
        GAMEOVER_CLEAR_TIME: 750,
        GAP_COEFFICIENT: 0.6,
        GRAVITY: 0.6,
        INITIAL_JUMP_VELOCITY: 12,
        INVERT_FADE_DURATION: 12000,
        INVERT_DISTANCE: 700,
        MAX_BLINK_COUNT: 3,
        MAX_CLOUDS: 6,
        MAX_OBSTACLE_LENGTH: 3,
        MAX_OBSTACLE_DUPLICATION: 2,
        MAX_SPEED: 13,
        MIN_JUMP_HEIGHT: 35,
        MOBILE_SPEED_COEFFICIENT: 1.2,
        RESOURCE_TEMPLATE_ID: 'audio-resources',
        SPEED: 6,
        SPEED_DROP_COEFFICIENT: 3,
        // 监听的键盘key
        KEYCODES: {
            JUMP: { '38': 1, '32': 1 },  // Up, spacebar
            DUCK: { '40': 1 },  // Down
            RESTART: { '13': 1 }  // Enter
        }
    }

    /**
     * 资源加载
     */
    Runner.RESOURCES = {
        LDPI: {
            SPRITE_IMAGE: 'image-1x',
            SPRITE_DEF: {
                CACTUS_LARGE: { x: 332, y: 2 },
                CACTUS_SMALL: { x: 228, y: 2 },
                CLOUD: { x: 86, y: 2 },
                HORIZON: { x: 2, y: 54 },
                MOON: { x: 484, y: 2 },
                PTERODACTYL: { x: 134, y: 2 },
                RESTART: { x: 2, y: 2 },
                TEXT_SPRITE: { x: 655, y: 2 },
                TREX: { x: 848, y: 2 },
                STAR: { x: 645, y: 2 }
            }
        },
        HDPI: {
            SPRITE_IMAGE: 'image-2x',
            SPRITE_DEF: {
                CACTUS_LARGE: { x: 652, y: 2 },
                CACTUS_SMALL: { x: 446, y: 2 },
                CLOUD: { x: 166, y: 2 },
                HORIZON: { x: 2, y: 104 },
                MOON: { x: 954, y: 2 },
                PTERODACTYL: { x: 260, y: 2 },
                RESTART: { x: 2, y: 2 },
                TEXT_SPRITE: { x: 1294, y: 2 },
                TREX: { x: 1678, y: 2 },
                STAR: { x: 1276, y: 2 }
            }
        },
        SOUNDS: {
            TEMPLATE_ID: 'audio-resources',
            BUTTON_PRESS: 'offline-sound-press',
            HIT: 'offline-sound-hit',
            SCORE: 'offline-sound-reached'
        },
    }

    Runner.CLASSES = {
        RESOURCES: '#resources',
        CANVAS: '',
        CONTAINER: 'runner-container',
        CRASHED: 'crashed',
        ICON: 'icon-offline',
        INVERTED: 'inverted',
        SNACKBAR: 'snackbar',
        SNACKBAR_SHOW: 'snackbar-show',
        TOUCH_CONTROLLER: 'controller'
    }

    Runner.prototype = {
        /**
         * 先加载资源文件
         */
        loadResources: function () {
            if (IS_HIDPI) {
                // 这里定义在Runner上是因为资源文件是公用的
                Runner.spriteImage = document.getElementById(Runner.RESOURCES.HDPI.SPRITE_IMAGE);
                // 然而对雪碧图的分割定义却是每个runner自己维护的（可能修改的）
                this.spriteDef = Runner.RESOURCES.HDPI.SPRITE_DEF;
            } else {
                // 这里定义在Runner上是因为资源文件是公用的
                Runner.spriteImage = document.getElementById(Runner.RESOURCES.LDPI.SPRITE_IMAGE);
                // 然而对雪碧图的分割定义却是每个runner自己维护的（可能修改的）
                this.spriteDef = Runner.RESOURCES.LDPI.SPRITE_DEF;
            }

            // 判断图片资源是否加载完成
            if (Runner.spriteImage.complete) {
                // 图片加载完成后
                this.init();
            } else {
                // 如果没有加载完成，采用事件listener的方式异步回调
                // 这里也等于 image.onload();
                Runner.spriteImage.addEventListener('load', this.init.bind(this));
            }
        },

        /**
         * game init
         */
        init: function () {
            // Hide the resource 
            document.querySelector(Runner.CLASSES.RESOURCES).style.visibility = 'hidden';

            this.dimensions = Runner.DEFAULT_DIMENSIONS;

            // create container
            this.containerEl = document.createElement('div');
            this.containerEl.className = Runner.CLASSES.CONTAINER;

            // create canvas
            this.canvas = createCanvas(this.containerEl, this.dimensions.WIDTH, this.dimensions.HEIGHT);
            this.canvasContext = this.canvas.getContext('2d');
            this.canvasContext.fillStyle = 'red';
            this.canvasContext.fill();

            this.outerContainerEl.appendChild(this.containerEl);
        }
    }

    /**
     * 游戏主canvas创建
     * 
     * @param {HTMLElement} container 
     * @param {number} width 
     * @param {numebr} height 
     * @param {string} opt_classname 
     */
    function createCanvas(container, width, height, opt_classname) {
        let canvas = document.createElement('canvas');
        canvas.className = Runner.CLASSES.CANVAS;
        if (opt_classname) {
            canvas.className += (' ' + opt_classname);
        }
        canvas.width = width;
        canvas.height = height;
        container.appendChild(canvas);
        return canvas;
    }












    //*******************************************************************************************************/

    /***
     * 地平线
     */
    function HorizonLine(canvas, spriteDef) {
        this.spriteDef = spriteDef;
        this.canvas = canvas;
        this.canvasContext = canvas.getContext('2d');

        this.sourceDimensions = {};
        this.dimensions = HorizonLine.DEFAULT_DIMENSIONS;
        this.setSourceDimensions();
        this.draw();
    }

    /**
     * 地平线的维度
     */
    HorizonLine.DEFAULT_DIMENSIONS = {
        WIDTH: 600,
        HEIGHT: 12,
        YPOS: 127 // canvas坐标
    }

    /**
     * prototype
     */
    HorizonLine.prototype = {
        /**
         * set source dimensions 设置源图的宽高
         */
        setSourceDimensions: function () {
            for (let dimension in HorizonLine.DEFAULT_DIMENSIONS) {
                // 高DPI下源图的宽高为2倍
                if (IS_HIDPI) {
                    if (dimension != 'YPOS') {
                        this.sourceDimensions[dimension]
                            = HorizonLine.DEFAULT_DIMENSIONS[dimension] * 2;
                    }
                } else {
                    this.sourceDimensions[dimension]
                        = HorizonLine.DEFAULT_DIMENSIONS[dimension];
                }
                // copy to this.dimensions
                // this.dimensions[dimension] = HorizonLine.DEFAULT_DIMENSIONS[dimension];
            }
            // 个人觉得放在这里解释不通
            // this.xPos = [0, this.dimensions.WIDTH];
            // this.yPos = this.dimensions.YPOS;
        },

        /**
         * 画出地平线 
         * 
         * 实现循环: line1和line2不停向左，当line1完全退出canvas时，回到初始状态
         * 
         *          |----------------|
         * |----------------|----------------
         *   line1  |        line2   |
         *          |----------------|
         *              canvas
         * 
         * 初始状态：
         *          |----------------|
         *          |----------------|----------------
         *          |       line1    |     line2
         *          |----------------|
         *              canvas 
         */
        draw: function () {
            console.log('draw horizon line...');
            // 使用 void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            // 简单说明：image:图像源，s*:定义原图像的slice，d*:定义canvas中的绘制位置和大小 详见：https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage

            this.canvasContext.drawImage(Runner.spriteImage, 
                this.spriteDef.x, this.spriteDef.y,
                this.sourceDimensions.WIDTH, this.sourceDimensions.HEIGHT,
                0, 0,
                this.dimensions.WIDTH, this.dimensions.HEIGHT);
            // this.canvasContext.drawImage(Runner.spriteImage, 0, 0);
            
        }

    }

})();

function onDocumentLoaded() {
    console.log('Document Loaded');
    new Runner('#main-content');
}
document.addEventListener('DOMContentLoaded', onDocumentLoaded);