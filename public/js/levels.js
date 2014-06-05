var levels = [
	{
		level: 1,
		time: 120,
		cameraStart: {x:0, y:100, z:0},
		ringPositions:[
			{position:{x:300,y:110,z:0},rotation:{x:0,y:1.57,z:0}},
			{position:{x:400,y:120,z:0},rotation:{x:0,y:1.57,z:0}},
			{position:{x:500,y:140,z:0},rotation:{x:0,y:1.57,z:0}},
			{position:{x:600,y:120,z:0},rotation:{x:0,y:1.57,z:0}},
			{position:{x:700,y:100,z:0},rotation:{x:0,y:1.57,z:0}},
			{position:{x:770,y:80,z:50},rotation:{x:0,y:1,z:0}},
			{position:{x:830,y:80,z:150},rotation:{x:0,y:0,z:0},"final":true}
		]
	},
	{
		level: 2,
		time: 120,
		cameraStart: {x:0, y:100, z:0},
		ringPositions:[
			{position:{x:300,y:110,z:0},rotation:{x:0,y:1.57,z:0}},
			{position:{x:400,y:120,z:0},rotation:{x:0,y:1.57,z:0}},
			{position:{x:500,y:140,z:0},rotation:{x:0,y:1.57,z:0}},
			{position:{x:600,y:160,z:0},rotation:{x:0,y:1.57,z:0}},
			{position:{x:700,y:180,z:0},rotation:{x:0,y:1.57,z:0}},
			{position:{x:770,y:200,z:50},rotation:{x:0,y:1,z:0}},
			{position:{x:830,y:200,z:150},rotation:{x:0,y:0,z:0}},
			{position:{x:830,y:220,z:250},rotation:{x:0,y:0,z:0}},
			{position:{x:830,y:240,z:350},rotation:{x:0,y:0,z:0}},
			{position:{x:830,y:240,z:450},rotation:{x:0,y:0,z:0},"final":true}
		]
	},
	{	//vanaf hier zelfde als level 2
		level: 3,
		time: 120,
		cameraStart: {x:0, y:200, z:0},
		ringPositions:[
			{position:{ x: 	300,	y: 210, 	z:	0},		rotation:{ x:	0, y:	1.57, z:	0}},
			{position:{ x: 	500,	y: 230, 	z:	35},	rotation:{ x:	0, y:	1.27, z:	0}},
			{position:{ x: 	700,	y: 260, 	z:	80},	rotation:{ x:	0, y:	1.17, z:	0}, animated: true},
			{position:{ x: 	900,	y: 280, 	z:	160},	rotation:{ x:	0, y:	1.17, z:	0}},
			{position:{ x: 	1100,	y: 290, 	z:	250},	rotation:{ x:	0, y:	-1.62,z:	0}},
			{position:{ x: 	1400,	y: 320, 	z:	200},	rotation:{ x:	0, y:	2.17, z:	0}}, //5
			{position:{ x: 	1540,	y: 330, 	z:	100},	rotation:{ x:	0, y:	2.67, z:	0}, animated: false},
			{position:{ x: 	1590,	y: 330, 	z:	-50},	rotation:{ x:	0, y:	3.07, z:	0}}, //7
			{position:{ x: 	1500,	y: 340, 	z:	-150},	rotation:{ x:	0, y:	1.23, z:	0}},
			{position:{ x: 	1340,	y: 350, 	z:	-160},	rotation:{ x:	0, y:	-1.17,z:	0}},
			{position:{ x: 	1200,	y: 360, 	z:	-50},	rotation:{ x:	0, y:	2.37, z:	0}}, //10
			{position:{ x: 	1070,	y: 370, 	z:	80},	rotation:{ x:	0, y:	-0.6, z:	0}},
			{position:{ x: 	920,	y: 380, 	z:	280},	rotation:{ x:	0, y:	-1.0, z: 	0}	, animated: true},
			{position:{ x: 	800,	y: 390, 	z:	400},	rotation:{ x:	0, y:	-0.7, z:	0}},
			{position:{ x: 	700,	y: 390, 	z:	550},	rotation:{ x:	0, y:	-0.4, z:	0}},
			{position:{ x: 	650,	y: 400, 	z:	700},	rotation:{ x:	0, y:	0.00, z: 	0}	,"final":true}
		]
	},
	{
		level: 4,
		time: 120,
		cameraStart: {x:-250, y:200, z:0},
		ringPositions:[
			{position:{x: 	0,		y: 	210,	z:	0},		rotation:{ x:	0, y:	1.57, z:	0}},
			{position:{x: 	120,	y: 	220,	z:	50},	rotation:{ x:	0, y:	1.17, z:	0}},
			{position:{x: 	290,	y: 	240,	z:	100},	rotation:{ x:	0, y:	1.17, z:	0}, animated: true},
			{position:{x: 	500,	y: 	260,	z:	250},	rotation:{ x:	0, y:	1.37, z:	0}},
			{position:{x: 	800,	y: 	280,	z:	220},	rotation:{ x:	0, y:	1.97, z:	0}},
			{position:{x: 	960,	y: 	300,	z:	80},	rotation:{ x:	0, y:	2.87, z:	0}}, //5
			{position:{x: 	1000,	y: 	300,	z:	-200},	rotation:{ x:	0, y:	0.00, z:	0}},
			{position:{x:	800,	y: 	320,	z:	-360},	rotation:{ x:	0, y:	1.67, z:	0}},
			{position:{x:	540,	y: 	340,	z:	-320},	rotation:{ x:	0, y:	1.57, z:	0}, animated: true},
			{position:{x:	300,	y: 	340,	z:	-360},	rotation:{ x:	0, y:	1.17, z:	0}},
			{position:{x:	100,	y: 	340,	z:	-420},	rotation:{ x:	0, y:	1.57, z:	0}},//10
			{position:{x: 	-100,	y: 	340,	z:	-400},	rotation:{ x:	0, y:	2.07, z:	0}},
			{position:{x: 	-250,	y: 	340,	z:	-300},	rotation:{ x:	0, y:	2.57, z:	0}},
			{position:{x: 	-350,	y: 	340,	z:	-150},	rotation:{ x:	0, y:	0.13, z:	0}, animated: true},
			{position:{x: 	-300,	y: 	340,	z:	0},		rotation:{ x:	0, y:	0.40, z:	0}},
			{position:{x: 	-200,	y: 	340,	z:	200},	rotation:{ x:	0, y:	0.50, z:	0}},
			{position:{x: 	-50,	y: 	340,	z:	500},	rotation:{ x:	0, y:	0.77, z:	0}},
			{position:{x: 	100,	y: 	340,	z:	700},	rotation:{ x:	0, y:	0.27, z:	0},"final":true}
		]
	},
	{
		level: 5,
		time: 120,
		cameraStart: {x:-300, y:200, z:0},
		ringPositions:[
			{position:{x: 	0,		y: 	210,	z:	0},		rotation:{ x:	0, y:	1.57, z:	0}},
			{position:{x: 	300,	y: 	220,	z:	0},		rotation:{ x:	0, y:	1.57, z:	0}},
			{position:{x: 	700,	y: 	240,	z:	0},		rotation:{ x:	0, y:	1.57, z:	0}, animated: true},
			{position:{x: 	1100,	y: 	260,	z:	0},		rotation:{ x:	0, y:	1.57, z:	0}},
			{position:{x: 	1500,	y: 	280,	z:	0},		rotation:{ x:	0, y:	1.70, z:	0}},
			{position:{x: 	1700,	y: 	300,	z:	-100},	rotation:{ x:	0, y:	2.07, z:	0}, animated: true}, //5
			{position:{x: 	2000,	y: 	300,	z:	-260},	rotation:{ x:	0, y:	-0.7, z:	0}},
			{position:{x:	2200,	y: 	320,	z:	-500},	rotation:{ x:	0, y:	-0.1, z:	0}},
			{position:{x:	2050,	y: 	340,	z:	-700},	rotation:{ x:	0, y:	1.17, z:	0}, animated: true},
			{position:{x:	1810,	y: 	320,	z:	-840},	rotation:{ x:	0, y:	0.97, z:	0}},
			{position:{x:	1500,	y: 	300,	z:	-950},	rotation:{ x:	0, y:	1.27, z:	0}},//10
			{position:{x: 	1100,	y: 	280,	z:	-1000},	rotation:{ x:	0, y:	1.57, z:	0}, animated: true},
			{position:{x: 	800,	y: 	260,	z:	-1000},	rotation:{ x:	0, y:	1.57, z:	0}},
			{position:{x: 	450,	y: 	240,	z:	-1000},	rotation:{ x:	0, y:	1.57, z:	0}},
			{position:{x: 	100,	y: 	220,	z:	-1000},	rotation:{ x:	0, y:	1.57, z:	0},"final":true}
		]
	},
	{
		level: 6,
		time: 50,
		cameraStart: {x:-300, y:200, z:0},
		ringPositions:[
			{position:{x: 	0,		y: 	210,	z:	0},		rotation:{ x:	0, y:	0.97, z:	0}},
			{position:{x: 	250,	y: 	220,	z:	100},	rotation:{ x:	0, y:	1.57, z:	0}},
			{position:{x: 	500,	y: 	240,	z:	0},		rotation:{ x:	0, y:	2.07, z:	0}, animated: true},
			{position:{x: 	750,	y: 	260,	z:	-100},	rotation:{ x:	0, y:	1.57, z:	0}},
			{position:{x: 	1000,	y: 	280,	z:	0},		rotation:{ x:	0, y:	1.17, z:	0}},
			{position:{x: 	1250,	y: 	300,	z:	100},	rotation:{ x:	0, y:	1.57, z:	0}, animated: true}, //5
			{position:{x: 	1500,	y: 	300,	z:	0},		rotation:{ x:	0, y:	2.07, z:	0}},
			{position:{x:	1750,	y: 	320,	z:	-100},	rotation:{ x:	0, y:	1.57, z:	0}},
			{position:{x: 	2000,	y: 	340,	z:	0},		rotation:{ x:	0, y:	1.17, z:	0},"final":true}
		]
	},
	{
		level: 7,
		time: 120,
		cameraStart: {x:-300, y:200, z:0},
		ringPositions:[
			{position:{x: 	0,		y: 	200,	z:	0},		rotation:{ x:	0, y:	1.17, z:	0}},
			{position:{x: 	200,	y: 	250,	z:	100},	rotation:{ x:	0, y:	1.17, z:	0}},
			{position:{x: 	500,	y: 	300,	z:	200},	rotation:{ x:	0, y:	1.17, z:	0}, animated: false},
			{position:{x: 	800,	y: 	350,	z:	250},	rotation:{ x:	0, y:	1.57, z:	0}},
			{position:{x: 	1100,	y: 	400,	z:	150},	rotation:{ x:	0, y:	2.47, z:	0}},
			{position:{x: 	1150,	y: 	450,	z:	0},		rotation:{ x:	0, y:	0.10, z:	0}}, //5
			{position:{x: 	1100,	y: 	500,	z:	-150},	rotation:{ x:	0, y:	0.37, z:	0}},
			{position:{x:	950,	y: 	550,	z:	-300},	rotation:{ x:	0, y:	1.57, z:	0}},
			{position:{x:	700,	y: 	600,	z:	-200},	rotation:{ x:	0, y:	1.87, z:	0}, animated: false},
			{position:{x:	350,	y: 	650,	z:	-150},	rotation:{ x:	0, y:	1.77, z:	0}},
			{position:{x: 	100,	y: 	700,	z:	-100},	rotation:{ x:	0, y:	1.57, z:	0},"final":true}
		]
	},
	{
		level: 8,
		time: 120,
		cameraStart: {x:-300, y:200, z:0},
		ringPositions:[
			{position:{x: 0,	y: 200,	z:	0},		rotation:{ x:	0, y:	1.07, z:	0}},
			{position:{x: 200,	y: 250,	z:	200},	rotation:{ x:	0, y:	0.57, z:	0}},
			{position:{x: 400,	y: 300,	z:	400},	rotation:{ x:	0, y:	1.27, z:	0}, animated: true},
			{position:{x: 600,	y: 350,	z:	400},	rotation:{ x:	0, y:	2.17, z:	0}, animated: true, direction: "down"},
			{position:{x: 800,	y: 400,	z:	200},	rotation:{ x:	0, y:	2.37, z:	0}},
			{position:{x: 1000,	y: 450,	z:	0},		rotation:{ x:	0, y:	2.37, z:	0}}, //5
			{position:{x: 1200,	y: 500,	z:	-200},	rotation:{ x:	0, y:	2.37, z:	0}},
			{position:{x: 1400,	y: 550,	z:	-400},	rotation:{ x:	0, y:	1.87, z:	0}, animated: true},
			{position:{x: 1600,	y: 600,	z:	-400},	rotation:{ x:	0, y:	1.17, z:	0}, animated: true, direction: "down"},
			{position:{x: 1800,	y: 650,	z:	-200},	rotation:{ x:	0, y:	0.57, z:	0}},
			{position:{x: 1900,	y: 700,	z:	0},		rotation:{ x:	0, y:	0.00, z:	0}}, //10
			{position:{x: 1800,	y: 750,	z:	200},	rotation:{ x:	0, y:	2.37, z:	0}},
			{position:{x: 1600,	y: 800,	z:	400},	rotation:{ x:	0, y:	1.87, z:	0}, animated: true},
			{position:{x: 1400,	y: 850,	z:	400},	rotation:{ x:	0, y:	1.17, z:	0}, animated: true, direction: "down"},
			{position:{x: 1200,	y: 900,	z:	200},	rotation:{ x:	0, y:	0.57, z:	0}},
			{position:{x: 1000,	y: 950,	z:	0},		rotation:{ x:	0, y:	0.57, z:	0}}, //15
			{position:{x: 800,	y: 1000,z:	-200},	rotation:{ x:	0, y:	0.57, z:	0}},
			{position:{x: 600,	y: 1050,z:	-400},	rotation:{ x:	0, y:	1.57, z:	0}, animated: true},
			{position:{x: 400,	y: 1100,z:	-400},	rotation:{ x:	0, y:	1.57, z:	0}, animated: true, direction: "down"},
			{position:{x: 200,	y: 1150,z:	-200},	rotation:{ x:	0, y:	2.37, z:	0}},
			{position:{x: 100,	y: 1150,z:	-100},	rotation:{ x:	0, y:	2.57, z:	0},"final":true}
		]
	},
	{
		level: 9,
		time: 120,
		cameraStart: {x:-300, y:200, z:0},
		ringPositions:[
			{position:{x: 	0,		y: 	210,	z:	0},		rotation:{ x:	0, y:	0.97, z:	0}},
			{position:{x: 	200,	y: 	220,	z:	200},	rotation:{ x:	0, y:	0.97, z:	0}},
			{position:{x: 	400,	y: 	240,	z:	400},	rotation:{ x:	0, y:	0.77, z:	0}, animated: false},
			{position:{x: 	800,	y: 	260,	z:	700},	rotation:{ x:	0, y:	1.37, z:	0}},
			{position:{x: 	1300,	y: 	280,	z:	900},	rotation:{ x:	0, y:	1.27, z:	0}},
			{position:{x: 	1750,	y: 	300,	z:	1000},	rotation:{ x:	0, y:	2.07, z:	0}}, //5
			{position:{x: 	1900,	y: 	300,	z:	750},	rotation:{ x:	0, y:	0.10, z:	0}},
			{position:{x:	1850,	y: 	320,	z:	500},	rotation:{ x:	0, y:	2.97, z:	0}},
			{position:{x:	1950,	y: 	340,	z:	300},	rotation:{ x:	0, y:	2.37, z:	0}, animated: false},
			{position:{x:	2130,	y: 	340,	z:	100},	rotation:{ x:	0, y:	3.07, z:	0}},
			{position:{x:	2100,	y: 	340,	z:	-100},	rotation:{ x:	0, y:	0.17, z:	0}}, //10
			{position:{x: 	2050,	y: 	340,	z:	-400},	rotation:{ x:	0, y:	2.57, z:	0}},
			{position:{x: 	2200,	y: 	340,	z:	-600},	rotation:{ x:	0, y:	-0.17, z:	0}},
			{position:{x: 	2050,	y: 	340,	z:	-800},	rotation:{ x:	0, y:	1.30, z:	0}},
			{position:{x: 	1700,	y: 	340,	z:	-800},	rotation:{ x:	0, y:	1.80, z:	0}},
			{position:{x: 	1300,	y: 	340,	z:	-700},	rotation:{ x:	0, y:	1.87, z:	0}}, //15
			{position:{x: 	1000,	y: 	340,	z:	-600},	rotation:{ x:	0, y:	2.57, z:	0}},
			{position:{x: 	1010,	y: 	340,	z:	-400},	rotation:{ x:	0, y:	0.57, z:	0}},
			{position:{x: 	1200,	y: 	340,	z:	-200},	rotation:{ x:	0, y:	0.67, z:	0}},
			{position:{x: 	1300,	y: 	340,	z:	-100},	rotation:{ x:	0, y:	1.07, z:	0}},
			{position:{x: 	1500,	y: 	340,	z:	0},		rotation:{ x:	0, y:	1.27, z:	0},"final":true}
		]
	},
	{
		level: 10,
		time: 120,
		cameraStart: {x:-300, y:200, z:0},
		ringPositions:[
			{position:{x: 	0,		y: 	210,	z:	0},		rotation:{ x:	0, y:	1.97, z:	0}},
			{position:{x: 	100,	y: 	210,	z:	-100},	rotation:{ x:	0, y:	2.67, z:	0}},
			{position:{x: 	120,	y: 	210,	z:	-220},	rotation:{ x:	0, y:	3.47, z:	0}},
			{position:{x: 	0,		y: 	210,	z:	-300},	rotation:{ x:	0, y:	1.77, z:	0}, animated: false},
			{position:{x: 	-250,	y: 	210,	z:	-230},	rotation:{ x:	0, y:	2.47, z:	0}},
			{position:{x: 	-400,	y: 	220,	z:	0.00},	rotation:{ x:	0, y:	3.07, z:	0}}, //5
			{position:{x: 	-300,	y: 	240,	z:	400},	rotation:{ x:	0, y:	4.37, z:	0}},
			{position:{x: 	200,	y: 	260,	z:	500},	rotation:{ x:	0, y:	1.50, z:	0}},
			{position:{x:	700,	y: 	280,	z:	100},	rotation:{ x:	0, y:	2.87, z:	0}},
			{position:{x:	700,	y: 	300,	z:	-300},	rotation:{ x:	0, y:	3.77, z:	0}, animated: false},
			{position:{x:	200,	y: 	320,	z:	-700},	rotation:{ x:	0, y:	1.17, z:	0}}, //10
			{position:{x:	-100,	y: 	340,	z:	-800},	rotation:{ x:	0, y:	1.57, z:	0}},
			{position:{x: 	-500,	y: 	340,	z:	-700},	rotation:{ x:	0, y:	2.07, z:	0}},
			{position:{x: 	-750,	y: 	340,	z:	-420},	rotation:{ x:	0, y:	2.57, z:	0}},
			{position:{x: 	-900,	y: 	340,	z:	-100},	rotation:{ x:	0, y:	3.06, z:	0}},
			{position:{x: 	-900,	y: 	340,	z:	300},	rotation:{ x:	0, y:	-0.07, z:	0}}, //15
			{position:{x: 	-600,	y: 	340,	z:	700},	rotation:{ x:	0, y:	0.70, z:	0}},
			{position:{x: 	-200,	y: 	340,	z:	800},	rotation:{ x:	0, y:	1.30, z:	0}},
			{position:{x: 	600,	y: 	340,	z:	750},	rotation:{ x:	0, y:	1.57, z:	0}},
			{position:{x: 	1200,	y: 	340,	z:	500},	rotation:{ x:	0, y:	1.97, z:	0}},
			{position:{x: 	1400,	y: 	340,	z:	0.00},	rotation:{ x:	0, y:	2.37, z:	0}}, //20
			{position:{x: 	1300,	y: 	340,	z:	-500},	rotation:{ x:	0, y:	0.00, z:	0}}, //21
			{position:{x: 	1000,	y: 	340,	z:	-900},	rotation:{ x:	0, y:	0.77, z:	0},"final":true}
		]
	},
]