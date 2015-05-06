var res = {
	//sprite
	Player_png : "res/images/player.png",
	Bullet_png : "res/images/bullet.png",
	textureOpaquePack_plist : 'res/images/textureOpaquePack.plist',
	textureOpaquePack_png : 'res/images/textureOpaquePack.png',
	playBtnUp_png : "res/images/playBtnUp.png",
	playBtnDown_png : "res/images/playBtnDown.png",
	menuBtnUp_png : "res/images/menuBtnUp.png",
	menuBtnDown_png : "res/images/menuBtnDown.png",
	retryBtnUp_png : "res/images/retryBtnUp.png",
	retryBtnDown_png : "res/images/retryBtnDown.png",
	creditsBtnUp_png : "res/images/creditsBtnUp.png",
	creditsBtnDown_png : "res/images/creditsBtnDown.png",
	gameTitle_png : "res/images/gameTitle.png",
	potion_png : "res/images/potion.png",
	bomb_png : "res/images/bomb.png",
	boom_png : "res/images/boom.png",

	//sound
	fear_mp3 : "res/music/Fear.mp3",
	dancing_mp3 : "res/music/Dancing Christmas in the 13th Month.mp3",
	stranger_aeons_mp3 : "res/music/Stranger Aeons.mp3",
	body_collid_mp3 : "res/music/body collid.mp3"
};

var g_resources = [
    ];
for (var i in res) {
    g_resources.push(res[i]);
}
