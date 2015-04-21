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
    PLAYER_BULLETS:[],
    EXPLOSIONS:[],
    SPARKS:[],
    HITS:[],
    BACKSKYS:[],
    BACKTILEMAPS:[]
};

//bullet speed
CL.BULLET_SPEED = {
    SHIP:900
};
// the counter of active enemies
CL.ACTIVE_ENEMIES = 0;

CL.LOGOY = 375;
CL.FLAREY = 445;
CL.SCALE = 1.5;
CL.WIDTH = screenWidth;
CL.HEIGHT = screenHeight;