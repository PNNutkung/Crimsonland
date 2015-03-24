/****************************************************************************
 Cocos2d-html5 show case : Moon Warriors

 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 @Authors:
 Programmer: Shengxiang Chen (陈升想), Dingping Lv (吕定平), Ricardo Quesada
 Effects animation: Hao Wu (吴昊)
 Quality Assurance: Sean Lin (林顺)
 ****************************************************************************/

var CL = CL || {};

//game state
CL.GAME_STATE = {
    HOME:0,
    PLAY:1,
    OVER:2
};

//keys
CL.KEYS = [];

//level
CL.LEVEL = {
    STAGE1:1,
    STAGE2:2,
    STAGE3:3
};

//life
CL.LIFE = 4;

//score
CL.SCORE = 0;

//sound
CL.SOUND = true;

//enemy move type
CL.ENEMY_MOVE_TYPE = {
    ATTACK:0,
    VERTICAL:1,
    HORIZONTAL:2,
    OVERLAP:3
};

//delta x
CL.DELTA_X = -100;

//offset x
CL.OFFSET_X = -24;

//rot
CL.ROT = -5.625;

//bullet type
CL.BULLET_TYPE = {
    PLAYER:1,
    ENEMY:2
};

//weapon type
CL.WEAPON_TYPE = {
    ONE:1
};

//unit tag
CL.UNIT_TAG = {
    ENMEY_BULLET:900,
    PLAYER_BULLET:901,
    ENEMY:1000,
    PLAYER:1000
};

//attack mode
CL.ENEMY_ATTACK_MODE = {
    NORMAL:1,
    TSUIHIKIDAN:2
};

//life up sorce
CL.LIFEUP_SORCE = [50000, 100000, 150000, 200000, 250000, 300000];

//container
CL.CONTAINER = {
    ENEMIES:[],
    ENEMY_BULLETS:[],
    PLAYER_BULLETS:[],
    EXPLOSIONS:[],
    SPARKS:[],
    HITS:[],
    BACKSKYS:[],
    BACKTILEMAPS:[]
};

//bullet speed
CL.BULLET_SPEED = {
    ENEMY:-200,
    SHIP:900
};
// the counter of active enemies
CL.ACTIVE_ENEMIES = 0;

CL.LOGOY = 375;
CL.FLAREY = 445;
CL.SCALE = 1.5;
CL.WIDTH = 480;
CL.HEIGHT = 720;