
'use strict';
const $=s=>document.querySelector(s),clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),rnd=(a,b)=>a+Math.random()*(b-a),copy=x=>JSON.parse(JSON.stringify(x)),uid=()=>Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,9);
const BASE_FISH=[{"id":"neon","name":"Неон","shape":"neon","color":"#39dbe8","accent":"#ed4859","size":23,"speed":57,"temperament":"peaceful","zone":"middle","school":true,"description":"Мирная стайная рыбка · средний слой","image":"assets/fish/neon.webp","spriteWidth":2.8},{"id":"guppy","name":"Гуппи","shape":"guppy","color":"#d8a958","accent":"#f57846","size":28,"speed":43,"temperament":"peaceful","zone":"top","school":false,"description":"Мирная · яркий веерный хвост","image":"assets/fish/guppy.webp","spriteWidth":2.8,"colorVariants":[{"id":"classic","name":"Оранжевый","color":"#d8a958","accent":"#f57846"},{"id":"red","name":"Красный","color":"#d93642","accent":"#92222a","image":"assets/fish/guppy-red.webp"},{"id":"blue","name":"Синий","color":"#458cde","accent":"#2249a3","image":"assets/fish/guppy-blue.webp"},{"id":"yellow","name":"Жёлтый","color":"#efcb4a","accent":"#d79926","image":"assets/fish/guppy-yellow.webp"}]},{"id":"angel","name":"Скалярия","shape":"angel","color":"#e1d6b0","accent":"#414b49","size":43,"speed":27,"temperament":"peaceful","zone":"middle","school":false,"description":"Спокойная · плавные движения","image":"assets/fish/angel.webp","spriteWidth":2.4},{"id":"gold","name":"Золотая рыбка","shape":"gold","color":"#f6ad40","accent":"#e66025","size":42,"speed":31,"temperament":"peaceful","zone":"bottom","school":false,"description":"Мирная · держится ближе ко дну","image":"assets/fish/gold.webp","spriteWidth":2.8},{"id":"cichlid","name":"Цихлида","shape":"cichlid","color":"#73b6c6","accent":"#1e485f","size":46,"speed":49,"temperament":"predator","zone":"middle","school":false,"description":"Хищная · охраняет свою территорию","image":"assets/fish/cichlid.webp","spriteWidth":2.8}];
const BASE_DECOR=[{"id":"val","name":"Валлиснерия","shape":"ribbon","color":"#488e59","accent":"#9cca6f","width":120,"height":220,"description":"Высокие ленты · растение","image":"assets/decor/val.webp"},{"id":"fern","name":"Водный папоротник","shape":"fern","color":"#427e50","accent":"#8bc27b","width":130,"height":155,"description":"Пышная листва · растение","image":"assets/decor/fern.webp"},{"id":"anubias","name":"Анубиас","shape":"leaves","color":"#376948","accent":"#88b96c","width":145,"height":120,"description":"Широкие листья · растение","image":"assets/decor/anubias.webp"},{"id":"moss","name":"Мох на камне","shape":"moss","color":"#557f48","accent":"#a2b95a","width":125,"height":62,"description":"Мягкий зелёный ковёр","image":"assets/decor/moss.webp"},{"id":"wood","name":"Коряга","shape":"wood","color":"#795c3e","accent":"#b1956a","width":220,"height":155,"description":"Ветвистое дерево · укрытие","image":"assets/decor/wood.webp"},{"id":"rocks","name":"Речные камни","shape":"rocks","color":"#6f8079","accent":"#aeb6a1","width":175,"height":100,"description":"Группа гладких валунов","image":"assets/decor/rocks.webp"},{"id":"cave","name":"Каменный грот","shape":"cave","color":"#607776","accent":"#9da798","width":190,"height":135,"description":"Тёмная пещера · укрытие","image":"assets/decor/cave.webp"},{"id":"ruins","name":"Древние руины","shape":"ruins","color":"#98a58b","accent":"#cbd0ac","width":190,"height":170,"description":"Арка и колонны · архитектура","image":"assets/decor/ruins.webp"},{"id":"coral","name":"Розовый коралл","shape":"coral","color":"#d47e7d","accent":"#f1b7a1","width":135,"height":125,"description":"Ветвистый акцент · декорация","image":"assets/decor/coral.webp"},{"id":"shell","name":"Жемчужная ракушка","shape":"shell","color":"#d8bc96","accent":"#f8e7c6","width":100,"height":65,"description":"Светлый акцент · декорация","image":"assets/decor/shell.webp"}];
const BACKGROUNDS=[{"id":"lagoon","name":"Светлая река","description":"Бирюзовая вода · солнечные блики","top":"#397f85","mid":"#11525b","bottom":"#092b35","sand":"#b9b28b","glow":"#cff8c0","image":"assets/backgrounds/lagoon.webp"},{"id":"river","name":"Тропические заросли","description":"Зелёная вода · густые растения","top":"#537f61","mid":"#284f45","bottom":"#132f32","sand":"#918974","glow":"#e1eab0","image":"assets/backgrounds/river.webp"},{"id":"moon","name":"Каменистое озеро","description":"Голубая вода · каменные склоны","top":"#254864","mid":"#122e4e","bottom":"#091b32","sand":"#69798a","glow":"#b8d5ff","image":"assets/backgrounds/moon.webp"},{"id":"roots","name":"Затопленные коряги","description":"Тёплый свет · затопленные корни","top":"#8c966b","mid":"#3a695a","bottom":"#213e39","sand":"#baaa77","glow":"#f6e4b3","image":"assets/backgrounds/roots.webp"}];

const DEMO_PACKS=[{"format":"quiet-water-content-pack","version":1,"name":"Форель по фотографии","fish":[{"id":"spotted_trout","name":"Форель","shape":"cichlid","color":"#9a9374","accent":"#b5a475","size":58,"speed":58,"temperament":"predator","zone":"middle","school":false,"description":"Хищная · одиночная · быстрые рывки · пятнистая окраска","image":"assets/fish/spotted_trout.webp","profile":{"id":"aquarium.fish.spotted-trout","version":"1.0.1","name":"Форель","category":"predator","fantasy":false,"description":"Пятнистая форель с красными и тёмными точками, золотистыми плавниками и быстрыми охотничьими рывками.","sizeAndGrowth":{"spawnLengthCm":18,"maxLengthCm":36,"spawnAgeDays":120,"spawnStage":"juvenile","growthCmPerSimulationDay":0.08,"adultLengthCm":28,"growthRequiresComfortAbove":60},"nutrition":{"type":"predator","preferredFood":["insect","worm","protein-pellet","small-fish"],"portionSatietyPoints":20,"feedIntervalMinutes":8,"maxPreyLengthRatio":0.22,"satietyDecayPerMinute":1.8},"temperament":{"aggression":0.45,"curiosity":0.65,"fearfulness":0.35,"sociability":0.25,"territoriality":0.6},"movement":{"cruiseSpeed":0.65,"burstSpeed":2.4,"acceleration":1.8,"turnRateDegreesPerSecond":100,"endurance":0.75,"style":"cruise-with-short-bursts","burstMaxSeconds":2.2,"energyRecoveryPerSecond":1.5},"habitat":{"preferredWaterLayers":["middle","bottom"],"preferredDepthPlanes":["back","middle"],"allowedDepthPlanes":["back","middle","front"],"minOpenSpaceBodyLengths":6,"openWaterPreference":0.7},"lifestyle":{"activityCycle":"day-and-dusk","socialMode":"solitary","restMinutesPerSimulationHour":12},"schooling":{"enabled":false,"preferredGroupSize":1,"spacingBodyLengths":2,"leaderFollowing":0.05},"territory":{"radiusBodyLengths":2.5,"preferredPlace":"near-rock-shelter","defensePersistence":0.55},"compatibility":{"preferredNeighborTags":["similar-size","nonaggressive","same-environment"],"avoidNeighborTags":["small-fish","fin-nipper","highly-aggressive"],"foodCompetitorTags":["predator","protein-feeder"],"canBePreyWhenPredatorMaxPreyLengthRatioAllows":true,"warning":"Мелкие рыбки могут стать добычей. Сытость не гарантирует совместимость."},"behavior":{"type":"predator","defaultAction":"swim","hunting":{"enabled":true,"style":"pursuit","detectionRadiusBodyLengths":5,"stealth":0.25,"attemptCooldownSeconds":35,"chaseMaxSeconds":4,"restAfterChaseSeconds":12,"hungerThresholdSatiety":45,"peacefulMode":"chase-only","naturalMode":"consume-eligible-prey"},"defense":{"threatDetectionRadiusBodyLengths":4,"reactionDelaySeconds":0.25,"response":"flee-then-hide","hidePreference":0.6,"schoolPreference":0.05,"fightPreference":0.2}},"environmentPreferences":{"temperatureProfile":"cool","lightLevel":0.45,"currentStrength":0.7,"waterClarity":0.9,"plantDensity":0.35,"substrateTags":["gravel","river-pebbles"],"shelterTags":["rock","driftwood"]},"decorationInteraction":{"minShelterEntranceLengthRatio":0.35,"minShelterInternalLengthRatio":1.2,"favoriteTags":["river-rock","driftwood","arch"],"restingPlace":"sheltered-low-current-zone","exploreNewObjects":0.7,"avoidSolidObstacles":true,"useSheltersDuringChase":true},"userInteraction":{"initialTrust":25,"glassTouchInterest":0.35,"learnFeedingSchedule":true,"frontGlassApproach":0.45},"reproduction":{"enabledInPrototype":false,"sexAssignment":"random","maturityStage":"adult","pairing":"temporary","method":"eggs-in-gravel","parentalCare":false,"offspringCount":null,"note":"Нерест требует поддержки движком и отдельного баланса."},"individuality":{"traitVariation":0.1,"sizeVariation":0.08,"favoriteRoute":"between-open-water-and-rock-shelter","habit":"returns-to-favorite-shelter","uniqueAction":"inspect-current"},"initialState":{"satiety":75,"energy":90,"health":100,"stress":10,"comfort":80,"trust":25,"reproductionReadiness":0,"currentAction":"swim","currentTarget":null},"geometry":{"coordinateSpace":"normalized-texture","bodyPolygon":[[0.11,0.47],[0.28,0.4],[0.48,0.27],[0.73,0.28],[0.88,0.37],[0.97,0.46],[0.985,0.55],[0.95,0.64],[0.82,0.76],[0.49,0.77],[0.3,0.71],[0.19,0.65],[0.1,0.7]],"mouth":{"center":[0.971,0.521],"radius":0.014},"tailPivot":[0.15,0.59],"collisionShape":"body-polygon","mirrorGeometryWithSprite":true}},"spriteWidth":2.8}],"decor":[],"notes":["Импорт добавляет вид в каталог. После загрузки нажмите «Форель», чтобы поселить её в воде.","Aquarium_Test.html с поддержкой image показывает фотографию. Первая версия HTML показывает встроенную форму cichlid.","Численные характеристики — игровые настройки. Текущий прототип использует размер, скорость, характер, слой воды и стайность; расширенный профиль сохранён для развития движка."]},{"format":"quiet-water-content-pack","version":1,"name":"Щука — крупный хищник в траве","fish":[{"id":"pike_grass_ambush","name":"Щука","shape":"cichlid","color":"#526747","accent":"#b7b88a","size":70,"speed":42,"temperament":"predator","zone":"bottom","school":false,"description":"Крупная · прячется в траве · охота на территории с голода 80 · выход на охоту с 90","image":"assets/fish/pike_grass_ambush.webp","behavior":{"type":"ambush","aggression":0.98,"hideInPlants":true},"profile":{"id":"pike_grass_ambush","version":"1.1.0","sizeClass":"large","socialMode":"solitary","temperament":{"aggression":0.98,"territoriality":0.95,"fearfulness":0.12,"curiosity":0.4,"sociability":0.05},"nutrition":{"type":"predator","preferredFood":["small-fish","protein-food"],"preySizeRatioPrototype":0.9},"habitat":{"preferredWaterLayers":["bottom","middle"],"preferredPlantShapes":["ribbon","fern","leaves"],"preferredSpace":"dense-plants-near-open-water"},"hunting":{"type":"ambush","returnToShelterAfterChase":true,"fastBurst":true,"hungerThreshold":80,"leaveTerritoryHungerThreshold":90,"consumePrey":true},"compatibility":{"risk":"high","warning":"В естественном режиме при голоде от 80 щука может съесть меньшую рыбу на своей территории; с 90 выходит за её пределы на охоту."},"initialState":{"satiety":70,"energy":90,"health":100,"stress":10,"comfort":85,"trust":10},"graphics":{"type":"transparent-png","facing":"right","animation":"procedural-single-sprite"},"parameterNote":"Это настройки игровой симуляции, а не рекомендации для живой щуки.","sizeAndGrowth":{"spawnLengthCm":23,"spawnLengthMinCm":20,"spawnLengthMaxCm":26,"maxLengthCm":45}},"spriteWidth":2.8}],"decor":[],"notes":["Импортируйте в обновлённый Aquarium_Test_v2.html. Нажмите «Щука» в каталоге, чтобы поселить её.","Новые щуки появляются со случайной длиной от 20 до 26 см; максимальная длина — 45 см.","Голод 80–89: охота и поедание добычи на своей территории. Голод от 90: выход за территорию на охоту.","Поедание рыбы работает в естественном режиме. В спокойном режиме добыча не погибает.","Поставьте валлиснерию, папоротник или анубиас для засады в траве.","Картинка встроена в файл; доступ к интернету не нужен."]},{"format":"quiet-water-content-pack","version":1,"name":"Пресноводная красно-белая креветка","fish":[{"id":"red_white_freshwater_shrimp","name":"Красно-белая креветка","shape":"guppy","color":"#d82c32","accent":"#fff4ef","size":24,"speed":18,"temperament":"peaceful","zone":"bottom","school":false,"description":"Пресноводная · мирная · держится у дна · исследует растения и укрытия","image":"assets/fish/red_white_freshwater_shrimp.webp","profile":{"id":"red_white_freshwater_shrimp","version":"1.0.0","classification":{"animalType":"shrimp","waterType":"freshwater","fantasy":false},"appearance":{"pattern":"red-white-bands","antennae":true,"legs":true,"glow":0},"sizeAndGrowth":{"spawnLengthCm":2.4,"maxLengthCm":3.2,"adultLengthCm":2.4,"spawnAgeDays":120,"spawnStage":"adult","growthCmPerSimulationDay":0.002,"growthRequiresComfortAbove":65,"growthRequiresSatietyAbove":40},"temperament":{"aggression":0.01,"curiosity":0.65,"fearfulness":0.85,"sociability":0.55,"territoriality":0.02},"movement":{"burstSpeed":1.8,"acceleration":1.2,"style":"slow-bottom-exploration"},"nutrition":{"type":"omnivore","preferredFood":["plant","sinking-food","algae"],"portionSatietyPoints":12},"hunting":{"enabled":false,"consumePrey":false},"habitat":{"preferredWaterLayers":["bottom"],"preferredPlantShapes":["moss","leaves","fern","ribbon"],"preferredSpace":"plants-and-shelters"},"lifestyle":{"activityCycle":"day","socialMode":"loose-group"},"schooling":{"enabled":false,"preferredGroupSize":5},"environmentPreferences":{"temperatureC":24,"lightLevel":0.35,"currentStrength":0.15,"waterClarity":0.9},"decorationInteraction":{"favoriteTags":["moss","plants","driftwood"],"hideWhenThreatened":true},"compatibility":{"preferredNeighbors":["small-peaceful-fish","shrimp"],"riskFromPredators":"high","warning":"Мелкая креветка может стать добычей хищников в естественном режиме."},"reproduction":{"enabledInPrototype":false,"note":"Размножение креветок в этом наборе отключено."},"initialState":{"satiety":80,"energy":95,"health":100,"stress":8,"comfort":90,"trust":20,"reproductionReadiness":0},"parameterNote":"Числа задают игровые характеристики и не заменяют рекомендации по содержанию настоящих креветок."},"spriteWidth":2.8}],"decor":[],"notes":["Импортируйте в Aquarium_Test_v2.html через загрузку JSON. Креветка появится в каталоге «Рыбки». Нажмите на неё для заселения.","Изображение с прозрачным фоном встроено в файл. Работа офлайн.","Используются доступные движку действия: исследование дна и оформления, кормление, отдых в укрытии и бегство от угрозы. Отдельная физика ходьбы лапками по грунту не включена.","Общий темп времени, роста и голода берётся из настроек аквариума."]},{"format":"quiet-water-content-pack","version":1,"name":"Петушок — три окраса","fish":[{"id":"betta_splendens","name":"Петушок","shape":"guppy","color":"#3345cc","accent":"#8586ed","size":32,"speed":26,"temperament":"predator","zone":"top","school":false,"description":"Одиночный · охраняет территорию · три окраса · белковый корм","image":"assets/fish/betta-blue.webp","behavior":{"type":"territorial","aggression":0.85},"colorVariants":[{"id":"blue","name":"Синий","color":"#3345cc","accent":"#8586ed"},{"id":"red","name":"Красный","color":"#cf202e","accent":"#8d1624","image":"assets/fish/betta-red.webp"},{"id":"red_blue","name":"Красно-синий","color":"#286bba","accent":"#971f35","image":"assets/fish/betta-red_blue.webp"}],"profile":{"id":"aquarium.fish.betta-splendens","version":"1.0.0","scientificName":"Betta splendens","classification":{"animalType":"fish","waterType":"freshwater","fantasy":false},"appearance":{"renderedSex":"male","finType":"long-fin-superdelta","pattern":"solid-or-bicolor"},"sizeAndGrowth":{"spawnLengthCm":5,"spawnLengthMinCm":4.5,"spawnLengthMaxCm":5.5,"maxLengthCm":6.5,"adultLengthCm":4.5,"spawnAgeDays":180,"spawnStage":"adult","growthCmPerSimulationDay":0.004,"growthRequiresComfortAbove":65,"growthRequiresSatietyAbove":45},"temperament":{"aggression":0.85,"territoriality":0.9,"fearfulness":0.35,"curiosity":0.65,"sociability":0.08},"movement":{"style":"slow-territory-patrol","cruiseSpeed":0.48,"burstSpeed":1.65,"burstMaxSeconds":1.2,"acceleration":1.1,"turnRateDegreesPerSecond":80,"energyRecoveryPerSecond":0.9},"habitat":{"preferredWaterLayers":["top"],"preferredDepthPlanes":["middle","back"],"allowedDepthPlanes":["back","middle","front"],"openWaterPreference":0.3,"preferredPlantShapes":["leaves","fern","ribbon"]},"lifestyle":{"activityCycle":"day","socialMode":"solitary"},"schooling":{"enabled":false,"preferredGroupSize":1},"territory":{"enabled":true,"radiusBodyLengths":2,"preferredPlace":"near-tall-plants","defensePersistence":0.7},"nutrition":{"type":"carnivore","preferredFood":["protein-food","protein-pellet","insect","worm"],"portionSatietyPoints":18,"maxPreyLengthRatio":0.14},"hunting":{"enabled":false,"consumePrey":false,"hungerThreshold":90,"leaveTerritoryHungerThreshold":90,"naturalMode":"chase-only","peacefulMode":"chase-only","attemptCooldownSeconds":20,"chaseMaxSeconds":1.5,"restAfterChaseSeconds":10},"environmentPreferences":{"temperatureC":25,"temperatureRangeC":[24,26],"lightLevel":0.4,"currentStrength":0.15,"waterClarity":0.9,"plantDensity":0.65},"decorationInteraction":{"favoriteTags":["plants","large-leaves","shelter"],"hideWhenThreatened":true,"restingPlace":"leaves-near-surface","avoidSolidObstacles":true},"compatibility":{"avoidNeighborTags":["other-male-betta","fin-nipper","large-predator"],"warning":"Территориальный вид. В прототипе прогоняет нарушителей участка. Длинные плавники требуют спокойных соседей."},"userInteraction":{"initialTrust":30,"learnFeedingSchedule":true,"glassTouchInterest":0.45},"reproduction":{"enabledInPrototype":false,"method":"bubble-nest","parentalCare":"male","note":"Гнездо из пузырьков и уход за икрой ещё не поддерживаются движком; размножение в этом наборе отключено."},"initialState":{"satiety":80,"energy":90,"health":100,"stress":8,"comfort":85,"trust":30,"reproductionReadiness":0},"sources":[{"url":"https://kb.rspca.org.au/categories/companion-animals/fish/how-should-i-care-for-my-siamese-fighting-fish","supports":"Территориальность, растения, верхний слой, слабое течение, температура и питание."},{"url":"https://fishbase.org/summary/Betta-splendens","supports":"Вид и максимальная длина 6,5 см."},{"url":"https://ask.ifas.ufl.edu/publication/FA212","supports":"Окрасы, длинные плавники и размножение в пузырьковом гнезде."}],"parameterNote":"Численные коэффициенты и ограничения охоты — настройки симуляции. Общие скорость времени, рост ×8 и темп голода наследуются от аквариума."},"spriteWidth":2.8}],"decor":[],"notes":["Загрузите JSON в Aquarium_Test_v2.html: Меню → Наборы и сохранения → Загрузить JSON.","После импорта: Меню → Рыбки → Петушок → выберите синий, красный или красно-синий окрас → Поселить рыбку.","Все окрасы относятся к одному виду. Выбор сохраняется у каждой рыбки, при экспорте и повторном импорте аквариума.","Изображения по вашим референсам встроены с прозрачным фоном. Интернет для их отображения не нужен.","Начальный размер 4,5–5,5 см, максимум 6,5 см. Охрана территории работает в обоих режимах; поедание соседей отключено.","Подходят белковый корм и тонущие гранулы. Рыбка держится в верхнем слое и отдыхает среди растений.","Изображения показывают длинноплавничного самца; текущий движок назначает пол случайно. Размножение и пузырьковое гнездо в этом наборе отключены."]}];
const LAMPS=[{id:'day',name:'Дневная',color:'#d7f6e1',brightness:85,radius:.72,angle:0,softness:65,filter:15},{id:'warm',name:'Тёплая',color:'#ffd49a',brightness:80,radius:.70,angle:-8,softness:75,filter:35},{id:'cool',name:'Холодная',color:'#a8e4ff',brightness:80,radius:.70,angle:8,softness:65,filter:35},{id:'moon',name:'Лунная',color:'#789de6',brightness:35,radius:.82,angle:0,softness:85,filter:50},{id:'plants',name:'Для растений',color:'#f5a4de',brightness:70,radius:.65,angle:0,softness:60,filter:40},{id:'rgb',name:'RGB',color:'#acb4ff',brightness:75,radius:.70,angle:0,softness:70,filter:45},{id:'spot',name:'Прожектор',color:'#ffedb8',brightness:95,radius:.28,angle:-18,softness:30,filter:20}];
const ACTIONS={swim:'Свободно плавает',school:'Плавает со стаей',feed:'Ищет корм',eat:'Ест',rest:'Отдыхает',hover:'Зависает в воде',hide:'Прячется от опасности',flee:'Убегает',alert:'Насторожилась',ambush:'Ждёт в засаде',stalk:'Подкрадывается',attack:'Делает рывок',chase:'Преследует',return:'Возвращается в укрытие',recover:'Восстанавливается после рывка',territory:'Защищает территорию',patrol:'Патрулирует участок',home:'Возвращается на территорию',search:'Ищет добычу за пределами участка',explore:'Исследует оформление',bottom:'Исследует дно',shade:'Ищет тень',glass:'Изучает стекло',pair:'Ищет пару',spawn:'Появились мальки'};
const statDefs=[['hunger','Голод',true],['energy','Энергия'],['health','Здоровье'],['stress','Стресс',true],['safety','Безопасность'],['curiosity','Любопытство'],['schoolNeed','Потребность в стае',true],['readiness','Готовность к размножению'],['comfort','Комфорт'],['trust','Доверие']];
const PACKAGED_IMAGES=new Set(["assets/backgrounds/lagoon.webp", "assets/backgrounds/moon.webp", "assets/backgrounds/river.webp", "assets/backgrounds/roots.webp", "assets/decor/anubias.webp", "assets/decor/cave.webp", "assets/decor/coral.webp", "assets/decor/fern.webp", "assets/decor/moss.webp", "assets/decor/rocks.webp", "assets/decor/ruins.webp", "assets/decor/shell.webp", "assets/decor/val.webp", "assets/decor/wood.webp", "assets/fish/angel.webp", "assets/fish/betta-blue.webp", "assets/fish/betta-red.webp", "assets/fish/betta-red_blue.webp", "assets/fish/cichlid.webp", "assets/fish/gold.webp", "assets/fish/guppy-blue.webp", "assets/fish/guppy-red.webp", "assets/fish/guppy-yellow.webp", "assets/fish/guppy.webp", "assets/fish/neon.webp", "assets/fish/pike_grass_ambush.webp", "assets/fish/red_white_freshwater_shrimp.webp", "assets/fish/spotted_trout.webp"]);
function initialFishTypes(){return copy([...BASE_FISH,...DEMO_PACKS.flatMap(pack=>pack.fish)])}
let fishTypes=initialFishTypes(),decorTypes=copy(BASE_DECOR),state,paused=false,page='menu',selected=null,edit=null,territoryEdit=null,drag=null,pointers=new Map(),gesture=null,particles=[],bubbles=[],ripples=[],simTime=0,animTime=0,last=0,lastFeed=-100,activeLamp=0,undoStack=[],redoStack=[],conditions=false,search='',category='all',onlyFavorites=false,onlySuitable=false,storageOK=true,loaded=false,riskCallback=null;
// Model time is calendar seconds. Only body growth runs eight times faster.
const LIFE_HOUR=3600, LIFE_DAY=86400, GROWTH_MULTIPLIER=8;
const HUNGER_FULL_HOURS=36, HUNGER_PER_HOUR=100/HUNGER_FULL_HOURS;
let worldAt=Date.now(),offlineEnabled=true,lifeSuspended=true,absenceReport=null,catchingUp=false,catchupReport=null;
const canvas=$('#tank'),rootCtx=canvas.getContext('2d');let ctx=rootCtx;let W=1100,H=700,dpr=1;
const dist=(a,b)=>Math.hypot(a.x-b.x,(a.y-b.y)*H/W),FISH_LIMIT=50,DECOR_LIMIT=40;
// Display preferences stay on this device and are independent of imported scenes.
const DISPLAY_MODES={eco:{name:'Экономичный',fps:20,scale:.85,maxPixels:600000,plantHz:2,poses:4,blur:false},balanced:{name:'Сбалансированный',fps:30,scale:1,maxPixels:1000000,plantHz:4,poses:6,blur:true},quality:{name:'Плавный',fps:40,scale:1.35,maxPixels:1800000,plantHz:6,poses:8,blur:true}};
let displayMode='eco';try{const saved=localStorage.getItem('quiet-water-display-v1');if(saved in DISPLAY_MODES)displayMode=saved}catch(e){}
const displaySettings=()=>DISPLAY_MODES[displayMode];
let renderRevision=0,dirtySave=true,frameTimer=0,frameRequest=0,stillRequest=0,autoSaveTimer=0,uiElapsed=0,frameDue=0;
const renderCache={background:null,shadows:null,decor:[],illumination:null,glow:null,rays:null,tint:null};
let fishBitmaps=new WeakMap(),senseCache=new WeakMap();
const schoolRoutes=new Map();
const profileCache=new WeakMap();
let fishIndex=null,decorIndex=null,indexFish=null,indexDecor=null;
function F(id){if(indexFish!==fishTypes){indexFish=fishTypes;fishIndex=new Map(fishTypes.map(f=>[f.id,f]))}return fishIndex.get(id)}
function D(id){if(indexDecor!==decorTypes){indexDecor=decorTypes;decorIndex=new Map(decorTypes.map(d=>[d.id,d]))}return decorIndex.get(id)}
function params(f){let p=profileCache.get(f);if(!p){p=computeParams(f);profileCache.set(f,p)}return p}
function invalidateRender(){renderRevision++;renderCache.background=null;renderCache.shadows=null;renderCache.decor=[];renderCache.illumination=null;renderCache.glow=null;renderCache.rays=null;renderCache.tint=null;senseCache=new WeakMap()}
function surface(){const c=document.createElement('canvas');c.width=canvas.width;c.height=canvas.height;const cctx=c.getContext('2d');cctx.setTransform(dpr,0,0,dpr,0,0);return {canvas:c,ctx:cctx}}
function paintSurface(fn){const layer=surface(),old=ctx;try{ctx=layer.ctx;fn()}finally{ctx=old}return layer.canvas}
function composite(c){ctx.drawImage(c,0,0,W,H)}
function backgroundLayer(){const key=state.bg+'|'+renderRevision+'|'+renderCache.lightKey;if(!renderCache.background||renderCache.background.key!==key){const b=BACKGROUNDS.find(b=>b.id===state.bg);renderCache.background={key,canvas:paintSurface(()=>{bgArt(ctx,b,W,H,0);ctx.save();ctx.globalCompositeOperation='source-over';composite(renderCache.rays);ctx.restore()})}}return renderCache.background.canvas}
function decorativeKey(){return state.decor.map(a=>[a.id,a.type,a.x,a.y,a.size,a.depth,a.angle,a.flip,a.order].join(',')).join(';')}
function sceneLayers(){const bucket=Math.floor(animTime*displaySettings().plantHz),composition=decorativeKey(),key=renderRevision+'|'+bucket+'|'+composition+'|'+(edit?.id??'')+'|'+(edit?.item.depth??'');if(renderCache.decorKey!==key||renderCache.decor.length!==3){renderCache.decorKey=key;
 for(let depth=0;depth<3;depth++){const list=state.decor.filter(a=>a.depth===depth&&a.id!==edit?.id).sort((a,b)=>a.order-b.order);renderCache.decor[depth]=paintSurface(()=>{for(const a of list)drawDecoration(a,edit&&a.depth!==edit.item.depth?.35:depth===0?.79:1)})}}
 const shadowKey=renderRevision+'|'+composition+'|'+state.lamps.map(l=>[l.enabled,l.x,l.angle,l.brightness,l.softness].join(',')).join(';');if(!renderCache.shadows||renderCache.shadows.key!==shadowKey)renderCache.shadows={key:shadowKey,canvas:paintSurface(drawShadows)}
}
function lampWidth(l){return Math.min(70,W*.16)*(l.size??100)/100}
function lampBeam(l,y){return {center:l.x+Math.tan(l.angle*Math.PI/180)*(y+.025)*H/W,radius:lampWidth(l)*.45/W+l.radius*Math.max(0,y)*.65}}
function lampLight(l,x,y){if(!l.enabled||l.brightness<=0)return 0;const b=lampBeam(l,y);return Math.exp(-(((x-b.center)/b.radius)**2)*1.7)*l.brightness/100*.85*(1-clamp(y,0,1)*.18)}
function lampGlow(l){
 const top=-H*.025,bottom=H*1.05,a=lampBeam(l,top/H),b=lampBeam(l,bottom/H),g=ctx.createLinearGradient(l.x*W,top,b.center*W,bottom);
 g.addColorStop(0,l.color+'c9');g.addColorStop(.25,l.color+'99');g.addColorStop(.7,l.color+'45');g.addColorStop(1,l.color+'18');
 ctx.save();ctx.globalCompositeOperation='screen';ctx.fillStyle=g;
 // Soft cone edges need no live blur, including in the economical display mode.
 const strips=28;
 for(let i=0;i<strips;i++){const u=-1.5+i*3/strips,v=u+3/strips;ctx.globalAlpha=l.brightness/100*(.20+l.filter/100*.35)*Math.exp(-(((u+v)/2)**2)*1.7);ctx.beginPath();ctx.moveTo((a.center+a.radius*u)*W,top);ctx.lineTo((a.center+a.radius*v)*W,top);ctx.lineTo((b.center+b.radius*v)*W,bottom);ctx.lineTo((b.center+b.radius*u)*W,bottom);ctx.closePath();ctx.fill()}
 ctx.restore();
}
function lampRays(l){
 const visibility=(l.rayVisibility??55)/100;
 if(l.raysVisible===false||visibility<=0||!l.enabled||l.brightness<=0)return;
 const top=-H*.025,bottom=H*1.05,axis=lampBeam(l,bottom/H).center*W,aperture=lampWidth(l)*.42,spread=l.radius*W*.62+aperture,scale=Math.max(.65,W/900)*Math.sqrt((l.size??100)/100);
 const lanes=[-.85,-.53,-.18,.09,.43,.78],power=l.brightness/100*visibility*(.7+(1-state.environment.clarity)*.65);
 ctx.save();ctx.globalCompositeOperation='source-over';
 for(let i=0;i<lanes.length;i++){
  const u=lanes[i],x0=l.x*W+u*aperture,x1=axis+u*spread,width=(7+l.radius*13)*(i%2?.8:1)*scale,g=ctx.createLinearGradient(x0,top,x1,bottom);
  g.addColorStop(0,l.color+'00');g.addColorStop(.04,l.color+'60');g.addColorStop(.20,l.color+'a8');g.addColorStop(.65,l.color+'60');g.addColorStop(1,l.color+'00');ctx.fillStyle=g;
  const w0=(1.4+i%3*.35)*scale,strips=24;
  for(let j=0;j<strips;j++){const a=-1.8+j*3.6/strips,b=a+3.6/strips;ctx.globalAlpha=clamp(power*1.45*Math.exp(-(((a+b)/2)**2)*2.2),0,1);ctx.beginPath();ctx.moveTo(x0+a*w0,top);ctx.lineTo(x0+b*w0,top);ctx.lineTo(x1+b*width,bottom);ctx.lineTo(x1+a*width,bottom);ctx.closePath();ctx.fill()}
 }
 ctx.restore();
}
function lightingLayers(){
 const key=renderRevision+'|'+state.night+'|'+state.environment.clarity+'|'+state.filterColor+'|'+state.filterStrength+'|'+state.lamps.map(l=>[l.enabled,l.id,l.color,l.brightness,l.radius,l.angle,l.x,l.size,l.filter,l.raysVisible,l.rayVisibility].join(',')).join(';');
 if(renderCache.lightKey===key&&renderCache.illumination&&renderCache.glow&&renderCache.rays&&renderCache.tint)return;
 renderCache.lightKey=key;
 renderCache.illumination=paintSurface(()=>{
  const mask=document.createElement('canvas');mask.width=Math.min(96,Math.max(32,Math.ceil(W/16)));mask.height=Math.min(96,Math.max(24,Math.ceil(H/16)));const mc=mask.getContext('2d'),pixels=mc.createImageData(mask.width,mask.height),ambient=state.night?.06:.14;
  const lamps=state.lamps.filter(l=>l.enabled&&l.brightness>0).map(l=>({lamp:l,rgb:[1,3,5].map(i=>parseInt(l.color.slice(i,i+2),16)/255)})),tone=v=>Math.round(255*(.20+.80*Math.pow(clamp(v,0,1),.72)));
  for(let y=0;y<mask.height;y++)for(let x=0;x<mask.width;x++){const n=(y*mask.width+x)*4,u=(x+.5)/mask.width,v=(y+.5)/mask.height;let r=ambient,g=ambient,b=ambient;for(const source of lamps){const power=lampLight(source.lamp,u,v);r+=power*(.12+.88*source.rgb[0]);g+=power*(.12+.88*source.rgb[1]);b+=power*(.12+.88*source.rgb[2])}pixels.data[n]=tone(r);pixels.data[n+1]=tone(g);pixels.data[n+2]=tone(b);pixels.data[n+3]=255}
  mc.putImageData(pixels,0,0);ctx.imageSmoothingEnabled=true;ctx.drawImage(mask,0,0,W,H);
 });
 renderCache.glow=paintSurface(()=>{for(const l of state.lamps)if(l.enabled&&l.brightness>0)lampGlow(l)});
 renderCache.rays=paintSurface(()=>{for(const l of state.lamps)lampRays(l)});
 renderCache.tint=paintSurface(()=>{if(state.filterStrength){ctx.save();ctx.globalAlpha=state.filterStrength/100*.42;ctx.fillStyle=state.filterColor;ctx.fillRect(0,0,W,H);ctx.restore()}const v=ctx.createRadialGradient(W*.5,H*.4,H*.08,W*.5,H*.4,Math.max(W,H)*.8);v.addColorStop(0,'#061c2800');v.addColorStop(1,'#061c2850');ctx.fillStyle=v;ctx.fillRect(0,0,W,H)});
}
function drawLampBodies(){for(const l of state.lamps)if(l.body){const width=lampWidth(l),scale=(l.size??100)/100,x=l.x*W,pad=5*scale;ctx.fillStyle='#102b35';ctx.fillRect(x-width/2,0,width,10*scale);ctx.fillStyle=l.enabled&&l.brightness>0?l.color:'#30444a';ctx.fillRect(x-width/2+pad,9*scale,width-pad*2,3*scale)}}
function fishBitmap(f,pose){const img=fishImage(f),ready=!!(img?.complete&&img.naturalWidth),settings=displaySettings();let entry=fishBitmaps.get(f);if(!entry||entry.ready!==ready||entry.mode!==displayMode){entry={ready,mode:displayMode,poses:[]};fishBitmaps.set(f,entry)}if(entry.poses[pose])return entry.poses[pose];const width=f.size*4,height=Math.max(width,ready?f.size*((f.spriteWidth||3)*img.naturalHeight/img.naturalWidth+.3):width),res=Math.min(1.25,(displayMode==='eco'?192:displayMode==='quality'?512:320)/Math.max(width,height)),c=document.createElement('canvas');c.width=Math.ceil(width*res);c.height=Math.ceil(height*res);const cc=c.getContext('2d');cc.translate(c.width/2,c.height/2);cc.scale(res,res);fishArt(cc,f,0,0,1,1,pose/settings.poses*Math.PI*2/7);const dark=document.createElement('canvas');dark.width=c.width;dark.height=c.height;const dc=dark.getContext('2d');dc.drawImage(c,0,0);dc.globalCompositeOperation='source-atop';dc.fillStyle='rgba(0,8,15,.58)';dc.fillRect(0,0,c.width,c.height);return entry.poses[pose]={canvas:c,dark,width,height}}
function drawFish(a){const f=fishAppearance(a),shade=shadowAt(a.x,a.y,a.z),pose=Math.floor((animTime+a.phase)*displaySettings().poses)%displaySettings().poses,b=fishBitmap(f,pose),scale=fishScale(a)*a.growthScale,w=b.width*scale,h=b.height*scale,opacity=.79+a.z*.10;ctx.save();ctx.translate(a.x*W,a.y*H);ctx.scale(a.dir,1);ctx.rotate(a.pitch||0);ctx.globalAlpha=opacity;ctx.drawImage(b.canvas,-w*.5,-h*.5,w,h);if(shade>.05){ctx.globalAlpha=opacity*clamp(shade/.45,0,.65);ctx.drawImage(b.dark,-w*.5,-h*.5,w,h)}ctx.restore();if(selected?.kind==='fish'&&selected.id===a.id&&$('#sheet').open){ctx.save();ctx.strokeStyle='#dcffee77';ctx.setLineDash([3,6]);ctx.beginPath();ctx.arc(a.x*W,a.y*H,visualSize(a)*fishScale(a)*1.7,0,7);ctx.stroke();ctx.restore()}}
function sampleSenses(a){const f=F(a.type),p=params(f);let e=senseCache.get(a);if(e&&simTime<e.next)return e;const nearThreat=state.fish.some(b=>isThreat(b,a)&&dist(a,b)<.2&&!occluded(b,a)),friends=state.fish.filter(b=>b.type===a.type&&b.id!==a.id&&dist(a,b)<.16).length,shade=shadowAt(a.x,a.y,a.z),comfortLight=100-Math.abs(lightAt(a.x,a.y)-shade-p.light)*70,temperature=p.temperature,comfortWater=100-Math.abs(state.environment.temperature-temperature)*3-(1-state.environment.clarity)*25;e={next:simTime+.6+(a.phase/6.28)*.2,nearThreat,friends,shade,comfortLight,comfortWater};senseCache.set(a,e);return e}
function draw(){if(!state||document.hidden||lifeSuspended)return;lightingLayers();composite(backgroundLayer());sceneLayers();composite(renderCache.shadows.canvas);for(let depth=0;depth<3;depth++){for(const a of state.fish)if(Math.round(a.z)===depth)drawFish(a);composite(renderCache.decor[depth])}
 if(edit)drawDecoration(edit.item,.58);for(const f of particles)ellipse(ctx,f.x*W,f.y*H,2.1,1.5,f.kind==='protein'?'#e9ad8e':f.kind==='sinking'?'#d5c984':'#e8cc93');const count=displayMode==='eco'?12:bubbles.length;for(let i=0;i<count;i++){const b=bubbles[i];if(!b)continue;ctx.beginPath();ctx.arc(b.x*W,b.y*H,b.r*unit(),0,7);ctx.strokeStyle='#e2fffd40';ctx.stroke();ellipse(ctx,b.x*W-b.r*.25,b.y*H-b.r*.3,b.r*.18,b.r*.10,'#e0ffff60')}for(const r of ripples){ctx.save();ctx.globalAlpha=r.life/2*.5;ctx.strokeStyle='#d4f5e8';ctx.beginPath();ctx.ellipse(r.x*W,r.y*H,(2-r.life)*45,(2-r.life)*22,0,0,7);ctx.stroke();ctx.restore()}
 ctx.save();ctx.globalCompositeOperation='multiply';composite(renderCache.illumination);ctx.globalCompositeOperation='screen';composite(renderCache.glow);ctx.restore();composite(renderCache.tint);drawLampBodies();drawTerritories();if(conditions)drawConditions();if(edit){const a=edit.item,d=D(a.type),s=decorScale(a),valid=placement(a);ctx.save();ctx.translate(a.x*W,a.y*H);ctx.rotate(a.angle*Math.PI/180);ctx.strokeStyle=valid.kind==='bad'?'#ffaaa0':valid.kind==='warn'?'#ffd299':'#baffd5';ctx.setLineDash([5,7]);ctx.strokeRect(-d.width*s*.55,-d.height*s,d.width*s*1.1,d.height*s);ctx.restore()}}
function resize(){const r=canvas.getBoundingClientRect();
 // WebView can briefly report a zero-sized surface during loading or a lifecycle transition.
 // Keep the last usable dimensions: H / W and W / H are part of the movement model.
 if(!Number.isFinite(r.width)||!Number.isFinite(r.height)||r.width<=0||r.height<=0)return;
 W=r.width;H=r.height;const p=displaySettings();dpr=Math.max(.1,Math.min(devicePixelRatio||1,p.scale,Math.sqrt(p.maxPixels/Math.max(W*H,1))));const w=Math.max(1,Math.round(W*dpr)),h=Math.max(1,Math.round(H*dpr));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;ctx.setTransform(dpr,0,0,dpr,0,0);invalidateRender()}requestRender()}
function requestRender(){if(document.hidden||lifeSuspended)return;if(!paused&&frameTimer+frameRequest>0)return;if(stillRequest)return;stillRequest=requestAnimationFrame(()=>{stillRequest=0;if(!document.hidden&&!lifeSuspended)draw()})}
function stopAnimation(){if(frameTimer)clearTimeout(frameTimer);if(frameRequest)cancelAnimationFrame(frameRequest);if(stillRequest)cancelAnimationFrame(stillRequest);if(autoSaveTimer)clearTimeout(autoSaveTimer);if(changed.timer)clearTimeout(changed.timer);changed.timer=0;frameTimer=frameRequest=stillRequest=autoSaveTimer=0;last=frameDue=0}
function scheduleFrame(delay=0){if(document.hidden||lifeSuspended||paused||frameTimer||frameRequest)return;frameTimer=setTimeout(()=>{frameTimer=0;if(document.hidden||lifeSuspended||paused)return;frameRequest=requestAnimationFrame(animate)},Math.max(0,delay))}
function scheduleSaving(){if(document.hidden||lifeSuspended||paused||autoSaveTimer)return;autoSaveTimer=setTimeout(()=>{autoSaveTimer=0;if(!document.hidden&&!lifeSuspended&&dirtySave)persist(true);scheduleSaving()},15000)}
function startAnimation(){if(document.hidden||lifeSuspended||paused||frameTimer||frameRequest)return;last=frameDue=0;scheduleFrame();scheduleSaving()}
function animate(ts){frameRequest=0;if(document.hidden||lifeSuspended||paused){last=frameDue=0;return}if(frameDue&&ts+.01<frameDue){scheduleFrame(frameDue-performance.now()-2);return}const dt=last?clamp((ts-last)/1000,0,.2):1/displaySettings().fps;last=ts;frameDue=ts+1000/displaySettings().fps;animTime+=dt;advanceVisible(Date.now());draw();uiElapsed+=dt;if(uiElapsed>.5){uiElapsed=0;if(page==='stats'&&$('#sheet').open)refreshStats()}scheduleFrame(frameDue-performance.now()-2)}
function setDisplayMode(mode){if(!(mode in DISPLAY_MODES))return;stopAnimation();persist();displayMode=mode;fishBitmaps=new WeakMap();invalidateRender();try{localStorage.setItem('quiet-water-display-v1',mode)}catch(e){}resize();if(!paused)startAnimation();toast(DISPLAY_MODES[mode].name+' режим включён')}

function toast(s){$('#toast').textContent=s;$('#toast').classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('show'),3500)}
function huntingRules(f){
 const profile=f.profile||{},nutrition=profile.nutrition||{};
 const h={...(f.behavior||{}),...(f.behavior?.hunting||{}),...(profile.hunting||{}),...(profile.behavior?.hunting||{})};
 const thresholds=[
  [h.hungerThreshold,false],[h.eatAtHunger,false],[h.consumeHungerThreshold,false],
  [nutrition.hungerThreshold,false],[nutrition.eatAtHunger,false],
  [nutrition.predationHungerThreshold,false],[h.hungerThresholdSatiety,true]
 ];
 let hungerThreshold=90,customThreshold=false;
 for(const [value,isSatiety] of thresholds){
  if(value===undefined)continue;
  if(!validNum(value,0,100))throw Error('Порог охоты должен быть числом от 0 до 100');
  hungerThreshold=isSatiety?100-value:value;customThreshold=true;break;
 }
 const leaveTerritoryHungerThreshold=h.leaveTerritoryHungerThreshold??hungerThreshold;
 if(!validNum(leaveTerritoryHungerThreshold,hungerThreshold,100))throw Error('Порог выхода на охоту должен быть от порога охоты до 100');
 const noDeath=['chase-only','chase-without-death','no-consumption'];
 return {hungerThreshold,leaveTerritoryHungerThreshold,eatHunger:hungerThreshold,customThreshold,huntingEnabled:h.enabled!==false,
  consumeAllowed:h.consumePrey!==false&&!noDeath.includes(h.naturalMode)&&!noDeath.includes(h.simulationMode)};
}
const WATER_LAYERS={top:[.17,.39],middle:[.33,.61],bottom:[.62,.80]};
const SWIM_DEFAULTS={
 neon:{band:[.34,.58],cruise:.82,openWater:.88,roam:.30,vertical:.045},
 guppy:{band:[.18,.40],cruise:.78,openWater:.70,roam:.22,vertical:.065},
 angel:{band:[.37,.65],cruise:.68,openWater:.55,roam:.20,vertical:.045},
 gold:{band:[.43,.78],cruise:.80,openWater:.65,roam:.25,vertical:.075},
 cichlid:{band:[.44,.75],cruise:.76,openWater:.45,roam:.18,vertical:.060}
};
function swimProfile(f){
 const profile=f.profile||{},h=profile.habitat||{},m=profile.movement||{},base=SWIM_DEFAULTS[f.id]||{},
 benthic=profile.classification?.animalType==='shrimp'||/crawl|walking|bottom-exploration/.test(m.style||''),
 layers=Array.isArray(h.preferredWaterLayers)?[...new Set(h.preferredWaterLayers.filter(v=>Object.hasOwn(WATER_LAYERS,v)))]:[];
 const bands=layers.length?layers.map(v=>benthic&&v==='bottom'?[.72,.81]:WATER_LAYERS[v]):[benthic?[.72,.81]:base.band||WATER_LAYERS[f.zone]||WATER_LAYERS.middle];
 const planes={back:0,middle:1,front:2},parsePlanes=v=>Array.isArray(v)?[...new Set(v.filter(x=>Object.hasOwn(planes,x)).map(x=>planes[x]))]:[];
 let allowed=parsePlanes(h.allowedDepthPlanes);if(!allowed.length)allowed=[0,1,2];
 let preferred=parsePlanes(h.preferredDepthPlanes).filter(z=>allowed.includes(z));if(!preferred.length)preferred=allowed.includes(1)?[1]:allowed;
 return {bands,band:[Math.min(...bands.map(b=>b[0])),Math.max(...bands.map(b=>b[1]))],allowedDepths:allowed,preferredDepths:preferred,
  school:profile.schooling?.enabled??f.school,benthic,
  cruise:m.cruiseSpeed??base.cruise??(benthic?.48:.78),openWater:h.openWaterPreference??base.openWater??(benthic?.15:.65),
  roam:base.roam??(benthic?.085:.25),vertical:base.vertical??(benthic?.025:.065),
  turnRate:m.turnRateDegreesPerSecond??100,recovery:m.energyRecoveryPerSecond??.65,
  schoolSpacing:profile.schooling?.spacingBodyLengths??1.4};
}
function rawParams(f){
 const p=f.profile||{},t=p.temperament||{},m=p.movement||{},n=p.nutrition||{},
 h={...(f.behavior?.hunting||{}),...(p.hunting||{}),...(p.behavior?.hunting||{})},
 sz=p.sizeAndGrowth||{},env=p.environmentPreferences||{},r=p.reproduction||{};
 const defaults={neon:[3.5,.05,.85],guppy:[4.5,.10,.75],angel:[12,.50,.45],gold:[16,.06,.70],cichlid:[20,.72,.35]}[f.id]||[f.size*.35,.5,.5];
 // All built-in and legacy species use the 36-hour calendar baseline. New packs may specify an explicit calendar rate.
 return {
  predator:f.temperament==='predator',...huntingRules(f),...swimProfile(f),
  aggression:t.aggression??f.behavior?.aggression??defaults[1],curiosity:t.curiosity??defaults[2],
  fear:t.fearfulness??(f.school?.8:.35),territory:t.territoriality??(f.id==='angel'?.65:f.temperament==='predator'?.7:.1),
  preyRatio:n.maxPreyLengthRatio??n.preySizeRatioPrototype??.5,
  metabolism:n.satietyDecayPerHour??HUNGER_PER_HOUR,portion:n.portionSatietyPoints??20,preyPortion:n.preySatietyPoints??35,
  length:sz.spawnLengthCm??defaults[0],maxLength:sz.maxLengthCm??defaults[0]*1.25,
  spawnMin:sz.spawnLengthMinCm,spawnMax:sz.spawnLengthMaxCm,
  adultLength:sz.adultLengthCm??defaults[0]*.9,growth:sz.growthCmPerSimulationDay??.03,
  growthComfort:sz.growthRequiresComfortAbove??60,growthSatiety:sz.growthRequiresSatietyAbove??35,
  age:sz.spawnAgeDays??rnd(110,240),
  burst:m.burstSpeed??(f.behavior?.type==='ambush'?3.6:2.3),turn:m.acceleration??1.8,
  ambush:f.behavior?.type==='ambush'||h.style==='ambush'||h.type==='ambush',
  cooldown:h.attemptCooldownSeconds??(f.behavior?.type==='ambush'?12:24),chase:h.chaseMaxSeconds??3,
  detection:h.detectionRadiusBodyLengths??6,searchDuration:h.searchMaxSeconds??120,
  memorySeconds:h.preyMemorySeconds??3,restAfterChase:h.restAfterChaseSeconds??8,burstDuration:m.burstMaxSeconds??h.chaseMaxSeconds??3,
  light:env.lightLevel??.6,temperature:env.temperatureC??(env.temperatureProfile==='cool'?18:24),
  activity:p.lifestyle?.activityCycle??'day',schoolSize:p.schooling?.preferredGroupSize??5,
  food:n.preferredFood??(f.temperament==='predator'?['protein-food']:['flakes','plant']),
  reproduce:f.id==='guppy'||r.enabledInPrototype===true,reproductionDays:r.gestationDays??r.spawnIntervalDays??28,
  preferredPlants:p.habitat?.preferredPlantShapes??['ribbon','fern','leaves'],
  territoryEnabled:p.territory?.enabled,
  territoryRadius:p.territory?.radius,
  territoryBodyLengths:p.territory?.radiusBodyLengths??(f.behavior?.type==='ambush'?3.5:f.id==='cichlid'?3:2.5)
 };
}
function computeParams(f){
 const p=rawParams(f),defaults={aggression:.4,curiosity:.5,fear:.5,territory:.3,preyRatio:.5,metabolism:HUNGER_PER_HOUR,
 portion:20,preyPortion:35,length:10,maxLength:15,adultLength:10,growth:.03,growthComfort:60,growthSatiety:35,
 age:160,burst:2.4,turn:1.8,cooldown:24,chase:3,light:.6,temperature:24,schoolSize:5,reproductionDays:28};
 for(const [k,v] of Object.entries(defaults))if(typeof p[k]!=='number'||!Number.isFinite(p[k]))p[k]=v;
 for(const k of ['aggression','curiosity','fear','territory','light'])p[k]=clamp(p[k],0,1);
 p.preyRatio=clamp(p.preyRatio,.05,.95);p.metabolism=clamp(p.metabolism,.1,30);
 p.portion=clamp(p.portion,0,100);p.preyPortion=clamp(p.preyPortion,1,100);
 p.length=clamp(p.length,.5,100);p.maxLength=clamp(p.maxLength,p.length,150);
 if(p.spawnMin!==undefined||p.spawnMax!==undefined){
  if(!validNum(p.spawnMin,.5,p.maxLength)||!validNum(p.spawnMax,p.spawnMin,p.maxLength))throw Error('Начальный размер: задайте минимум и максимум от 0,5 см до максимального размера');
 }
 p.adultLength=clamp(p.adultLength,.1,p.maxLength);p.burst=clamp(p.burst,1,5);p.turn=clamp(p.turn,.5,4);
 p.cooldown=clamp(p.cooldown,3,120);p.chase=clamp(p.chase,1,8);p.growth=clamp(p.growth,0,2);
 p.growthComfort=clamp(p.growthComfort,0,100);p.growthSatiety=clamp(p.growthSatiety,0,100);
 p.temperature=clamp(p.temperature,4,36);p.reproductionDays=clamp(p.reproductionDays,1,365);
 if(!Array.isArray(p.preferredPlants))p.preferredPlants=['ribbon','fern','leaves'];
 for(const [key,lo,hi,fallback] of [['cruise',.15,1.8,.78],['openWater',0,1,.65],['turnRate',25,240,100],['recovery',.1,3,.65],['schoolSpacing',.7,4,1.4]])p[key]=validNum(p[key],lo,hi)?p[key]:fallback;
 for(const [key,lo,hi,fallback] of [['detection',2,12,6],['searchDuration',30,300,120],['memorySeconds',.5,8,3],['restAfterChase',1,30,8],['burstDuration',.3,8,3]])p[key]=validNum(p[key],lo,hi)?p[key]:fallback;
 p.school=p.school===true;
 p.territoryEnabled=p.territoryEnabled===undefined?p.territory>.4||f.behavior?.type==='territorial':p.territoryEnabled===true;
 p.territoryBodyLengths=validNum(p.territoryBodyLengths,.5,8)?p.territoryBodyLengths:2.5;
 p.territoryRadius=validNum(p.territoryRadius,.03,.4)?p.territoryRadius:null;
 return p;
}
function fishInstance(type,x=rnd(.15,.85),y=null,registry=fishTypes){const f=registry.find(t=>t.id===type),p=params(f),init=f.profile?.initialState||{},variation=rnd(.92,1.08),spawnLength=p.spawnMin===undefined?p.length*variation:rnd(p.spawnMin,p.spawnMax),spawnDepth=p.preferredDepths[Math.floor(rnd(0,p.preferredDepths.length))];y=y??rnd(...p.bands[0]);return {id:uid(),type,colorVariant:colorVariantId(f,null),name:f.name+' '+(state?.fish.filter(a=>a.type===type).length+1||1),x,y,vx:0,vy:0,dir:rnd(0,1)<.5?-1:1,z:spawnDepth,depth:spawnDepth,zTarget:spawnDepth,phase:rnd(0,6.28),targetX:rnd(.1,.9),targetY:y,timer:rnd(1,5),decision:0,action:'swim',goal:'Свободная вода',actionTime:0,cooldown:4,resting:false,fearUntil:0,hideUntil:0,hideCooldown:0,pitch:0,routeX:x,routeY:y,routeClock:0,prey:null,pursuit:null,pursuitTime:0,fearFrom:null,shelter:null,homeX:x,homeY:y,territory:createTerritory(f,x,y,spawnDepth),returnToTerritory:false,huntTrip:null,huntRestUntil:0,sex:rnd(0,1)<.5?'female':'male',age:p.age,length:spawnLength,growthScale:spawnLength/p.length,baby:false,stage:f.profile?.sizeAndGrowth?.spawnStage??'adult',traits:{aggression:clamp(p.aggression*rnd(.92,1.08),0,1),curiosity:clamp(p.curiosity*rnd(.92,1.08),0,1),fear:clamp(p.fear*rnd(.92,1.08),0,1)},stats:{satiety:init.satiety??rnd(65,85),energy:init.energy??rnd(80,98),health:init.health??100,stress:init.stress??rnd(5,15),safety:90,curiosity:p.curiosity*100,schoolNeed:0,readiness:init.reproductionReadiness??0,comfort:init.comfort??85,trust:init.trust??25},memory:{meals:0,scares:0,lastMeal:-1,lastBirth:-LIFE_DAY*365,lastScare:-1000},events:[]}}
function lampInstance(id='day',x=.6){return {...copy(LAMPS.find(l=>l.id===id)),uid:uid(),x,size:100,body:false,enabled:true,raysVisible:true,rayVisibility:55}}
function defaultState(){const s={bg:'lagoon',night:false,lightCycle:'auto',timeOfDay:localDaySeconds(),lightsOn:8,lightsOff:20,mode:'calm',speed:1,filterColor:'#99c7d1',filterStrength:0,lamps:[lampInstance()],environment:{temperature:24,current:.25,clarity:.90},breeding:false,favorites:[],fish:[],decor:[]};s.fish=[fishInstance('neon',.29,.43),fishInstance('neon',.36,.48),fishInstance('neon',.32,.38),fishInstance('guppy',.67,.29),fishInstance('guppy',.75,.37),fishInstance('angel',.52,.5),fishInstance('gold',.7,.67)];s.fish.forEach((f,i)=>{f.name=F(f.type).name+' '+(i+1);f.z=f.zTarget=f.depth=i%3});s.decor=[['val',.12,.81,0,1.25],['val',.88,.82,0,1.35],['ruins',.58,.82,0,1],['wood',.32,.89,1,1.08],['fern',.84,.88,1,1.05],['rocks',.65,.93,2,.85],['anubias',.12,.95,2,.9],['moss',.38,.97,2,.8]].map((a,i)=>({id:uid(),type:a[0],x:a[1],y:a[2],depth:a[3],size:a[4],flip:i%2?1:-1,angle:0,order:i,locked:false}));syncLightCycle(s);return s}
function serialize(){return {format:'quiet-water-aquarium',version:2,customFish:fishTypes.filter(x=>!BASE_FISH.some(b=>b.id===x.id)),customDecor:decorTypes.filter(x=>!BASE_DECOR.some(b=>b.id===x.id)),scene:state,life:{version:2,clockModel:'calendar',growthMultiplier:GROWTH_MULTIPLIER,updatedAt:worldAt,offline:offlineEnabled,paused,report:absenceReport,food:particles.map(t=>({...t})),lastFeed}}}
function persist(force=false){if(!force&&(edit||territoryEdit||!dirtySave))return;
 let saved=false;
 try{
  const checkpoint=JSON.stringify(serialize());let localSaved=false;
  try{localStorage.setItem('quiet-water-v2',checkpoint);localSaved=true}catch(e){}
  // Android's AtomicFile checkpoint must still be written if browser storage is full or disabled.
  if(typeof window.AquariumAndroid?.saveCheckpoint==='function'){
   try{saved=window.AquariumAndroid.saveCheckpoint(checkpoint)===true}catch(e){}
  }else saved=localSaved;
 }catch(e){}
 storageOK=saved;dirtySave=!saved;
 if(saved)persist.warned=false;
 else if(!persist.warned){toast('Автосохранение недоступно. Сохраните аквариум в JSON.');persist.warned=true}
}

function localDaySeconds(){const now=new Date();return now.getHours()*3600+now.getMinutes()*60+now.getSeconds()}
function clockLabel(){const t=state.timeOfDay;return String(Math.floor(t/3600)).padStart(2,'0')+':'+String(Math.floor(t%3600/60)).padStart(2,'0')}
function syncLightCycle(scene=state){
 if(!scene||scene.lightCycle!=='auto')return;
 const hour=scene.timeOfDay/LIFE_HOUR,on=scene.lightsOn,off=scene.lightsOff;
 const day=on<off?hour>=on&&hour<off:hour>=on||hour<off;
 const night=!day;
 if(scene.night!==night){scene.night=night;if(scene===state)invalidateRender()}
}
function advanceClock(dt){simTime+=dt;state.clock=simTime;state.timeOfDay=(state.timeOfDay+dt)%LIFE_DAY;syncLightCycle()}
function nextLightBoundary(){
 if(state.lightCycle!=='auto')return Infinity;
 return Math.min(...[state.lightsOn,state.lightsOff].map(hour=>{
  const delta=(hour*LIFE_HOUR-state.timeOfDay+LIFE_DAY)%LIFE_DAY;
  return delta<.001?LIFE_DAY:delta;
 }));
}
// Hidden/closed pages have no running timer. Checkpoint the model time and catch up once.
function lifeEvent(text){if(catchupReport&&catchupReport.events.length<12)catchupReport.events.push(text.slice(0,140))}
function awayDuration(seconds){const minutes=Math.floor(seconds/60),hours=Math.floor(minutes/60),days=Math.floor(hours/24);return days?days+' д. '+hours%24+' ч.':hours?hours+' ч. '+minutes%60+' мин.':minutes?minutes+' мин.':Math.floor(seconds)+' сек.'}
function restoreLife(value,resume){const now=Date.now(),l=value&&[1,2].includes(value.version)?value:{};worldAt=resume&&validNum(l.updatedAt,946684800000,8640000000000000)?Math.min(l.updatedAt,now):now;offlineEnabled=l.offline!==false;paused=l.paused===true;absenceReport=null;last=frameDue=0;
 if(resume&&l.report&&typeof l.report==='object'){const r=l.report,keys=['seconds','speed','born','hunted','grown','hungry','rested','population'];if(keys.every(k=>validNum(r[k],0,1e12))&&validNum(r.from,946684800000,8640000000000000)&&validNum(r.to,r.from,8640000000000000))absenceReport={from:r.from,to:r.to,...Object.fromEntries(keys.map(k=>[k,r[k]])),events:Array.isArray(r.events)?r.events.filter(t=>validText(t,140)).slice(0,12):[]}}
 particles=Array.isArray(l.food)?l.food.slice(0,128).filter(t=>t&&['flakes','protein','sinking'].includes(t.kind)&&validNum(t.x,0,1)&&validNum(t.y,0,1)&&validNum(t.life,0,32)&&validNum(t.seed,0,6.3)).map(t=>({x:t.x,y:t.y,life:t.life,kind:t.kind,seed:t.seed})):[];lastFeed=validNum(l.lastFeed,-100,simTime)?l.lastFeed:-100;
}
function advanceVisible(now){if(lifeSuspended)return;const seconds=Math.max(0,(now-worldAt)/1000);if(!paused&&seconds>0){if(seconds>2)catchUpLife(now,false,true);else{const dt=seconds*state.speed,n=Math.max(1,Math.ceil(dt/.05));for(let i=0;i<n;i++)simulate(dt/n)}}worldAt=now}
function offlineEnergy(a,dt){const s=a.stats,p=params(F(a.type));let resting=a.resting||['rest','hover','ambush','recover','hide'].includes(a.action),left=dt;
 if(!activePeriod(p)||s.health<35||p.ambush&&a.action==='ambush'){s.energy=clamp(s.energy+dt*p.recovery,0,100);catchupReport?.restIds.add(a.id);return}
 // Skip full activity/rest cycles while keeping the same thresholds as visible swimming.
 const cycle=(78-24)/.045+(78-24)/p.recovery;
 for(let i=0;i<4&&left>0;i++){const duration=resting?Math.max(0,(78-s.energy)/p.recovery):Math.max(0,(s.energy-24)/.045),used=Math.min(left,duration);s.energy=clamp(s.energy+used*(resting?p.recovery:-.045),0,100);left-=used;if(resting&&used>0)catchupReport?.restIds.add(a.id);if(left<=0)break;resting=!resting;if(left>=cycle){left%=cycle;catchupReport?.restIds.add(a.id)}}
 a.resting=resting;
 if(resting)restFish(a);else if(['rest','hover','recover'].includes(a.action)){record(a,'swim','После отдыха');a.timer=0}
}
function offlinePosition(a,dt){const f=F(a.type),dx=a.targetX-a.x,dy=a.targetY-a.y,d=Math.hypot(dx,dy*H/W),fraction=Math.min(1,f.speed*.00085*(a.mult??.8)*(a.baby?.65:1)*(state.night?.55:1)*dt/(d||1)),nx=clamp(a.x+dx*fraction,.055,.945),ny=clamp(a.y+dy*fraction,.14,.81);let clear=true;
 for(let i=1;i<=4;i++)if(blocks(a.x+(nx-a.x)*i/4,a.y+(ny-a.y)*i/4,a.z)&&!blocks(a.x,a.y,a.z)){clear=false;break}
 if(clear){if(Math.abs(nx-a.x)>.001)a.dir=nx>a.x?1:-1;a.x=nx;a.y=ny}else a.timer=0;a.z=clamp(a.z+(a.zTarget-a.z)*(1-Math.exp(-dt*.22)),0,2);a.depth=Math.round(a.z);a.vx=a.vy=0;
}
function offlineHunt(a,dt){
 const p=params(F(a.type)),s=a.stats;
 if(!canHunt(a)||!p.consumeAllowed||state.mode!=='natural'||a.cooldown>0||
    (!activePeriod(p)&&s.satiety>8)||
    (s.energy<=40&&dt<1500)||s.health<35||s.stress>=65||
    (dt<1500&&['rest','hover','hide','flee'].includes(a.action)))return;
 // A defensive or recreational chase cannot turn into a meal midway through that chase.
 if(a.prey&&a.pursuit!=='hunt')return;
 const prey=nearest(state.fish.filter(b=>canConsumePrey(a,b)&&dist(a,b)<.5&&!occluded(a,b)),a);
 if(!prey)return;
 const cover=nearestShelter(prey)?.5:1,chance=(1-Math.exp(-dt/(p.cooldown*12)))*.65*cover;
 if(Math.random()>=chance)return;
 consumePrey(a,prey);
}
function nextLifeStep(left,budget){
 if(budget<=1)return left;
 let step=Math.min(left/budget,nextLightBoundary());
 for(const a of state.fish){
  const p=params(F(a.type)),s=a.stats,rate=p.metabolism/LIFE_HOUR;
  for(const threshold of [100-p.hungerThreshold,100-p.leaveTerritoryHungerThreshold,35,8])
   if(s.satiety>threshold+.001)step=Math.min(step,(s.satiety-threshold)/rate+.001);
  if(state.breeding&&p.reproduce&&a.stage==='adult'&&s.satiety>60&&s.comfort>65&&s.stress<30)
   for(const threshold of [80,95])if(s.readiness<threshold-.001)
    step=Math.min(step,(threshold-s.readiness)/(100/(p.reproductionDays*LIFE_DAY))+.001);
  if(canHunt(a)&&p.consumeAllowed&&state.mode==='natural'&&s.health>=35&&state.fish.some(b=>eligible(a,b)))
   step=Math.min(step,600);
 }
 return Math.max(.001,Math.min(left,step));
}
function offlineStep(dt){advanceClock(dt);senseCache=new WeakMap();for(const a of state.fish.slice()){if(!state.fish.includes(a))continue;choose(a);offlinePosition(a,dt);updateStats(a,dt,true);offlineHunt(a,dt);reproduce(a,true)}dirtySave=true}
function catchUpLife(now,announce=true,enabled=offlineEnabled){const from=worldAt,seconds=Math.max(0,(now-from)/1000);worldAt=now;if(!seconds||paused||!enabled){dirtySave=true;return}
 const initial=new Map(state.fish.map(a=>[a.id,{length:a.length,stage:a.stage}])),r={from,to:now,seconds,speed:state.speed,born:0,hunted:0,grown:0,hungry:0,rested:0,population:0,events:[],restIds:new Set()};let left=seconds*state.speed;catchingUp=true;catchupReport=r;
 try{
  // Food already in the water keeps its remaining lifetime, including after a reload.
  const foodTime=particles.length?Math.min(left,32):left<=2?left:0,n=Math.ceil(foodTime/.2);for(let i=0;i<n;i++)simulate(foodTime/n);left-=foodTime;
  const steps=Math.min(256,Math.ceil(left/60));for(let i=0;i<steps&&left>0;i++){const dt=nextLifeStep(left,steps-i);offlineStep(dt);left=Math.max(0,left-dt)}
  particles=particles.filter(t=>t.life>0&&t.y<.84);ripples=[];for(const a of state.fish){if(a.prey||a.huntTrip)endPursuit(a);a.prey=null;a.pursuit=null;a.pursuitTime=0;a.decision=0;const old=initial.get(a.id);if(old&&(a.length>old.length+.00001||a.stage!==old.stage)){r.grown++;if(a.stage!==old.stage)lifeEvent(a.name+' перешла на следующую стадию роста')}if(a.stats.satiety<35)r.hungry++}r.rested=r.restIds.size;r.population=state.fish.length;delete r.restIds;
  if(seconds>=60){absenceReport=r;if(announce)toast('Пока вас не было: '+awayDuration(seconds)+(r.born?' · мальков: '+r.born:'')+(r.hungry?' · голодных рыбок: '+r.hungry:'')+'. Итоги — в меню.')}
 }finally{catchingUp=false;catchupReport=null;dirtySave=true;invalidateRender()}
}
function suspendWorld(){if(!lifeSuspended){advanceVisible(Date.now());lifeSuspended=true}stopAnimation();persist(true)}
function resumeWorld(){if(document.hidden)return;if(lifeSuspended){catchUpLife(Date.now());lifeSuspended=false;persist(true)}resize();if($('#sheet').open)renderPage();if(!paused)startAnimation();else requestRender()}
function toggleLifePause(){const now=Date.now();advanceVisible(now);paused=!paused;worldAt=now;dirtySave=true;stopAnimation();persist(true);if(paused)requestRender();else startAnimation();renderPage()}
function absenceHTML(){const r=absenceReport;if(!r)return '<p class="muted">Здесь появится итог, когда вы вернётесь в аквариум после отсутствия от одной минуты.</p>';return `<p>Прошло <b>${awayDuration(r.seconds)}</b> при скорости ×${r.speed}.</p><div class="banner">Рыбок после возвращения: ${r.population}. Проголодались: ${r.hungry}. Подросли: ${r.grown}. Отдохнули: ${r.rested}.</div><p>Появилось мальков: ${r.born}. Поймано рыбок: ${r.hunted}.</p>${r.events.length?'<ul>'+r.events.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul>':''}<p class="muted small">Пропущенное время пересчитывается при возвращении. Итог сохраняется; повторное открытие не повторяет события.</p>`}

function changed(){dirtySave=true;if(catchingUp)return;invalidateRender();requestRender();clearTimeout(changed.timer);changed.timer=setTimeout(persist,900)}
function record(a,action,goal){if(a.action!==action){a.events.unshift({time:simTime,text:ACTIONS[action]||action});a.events=a.events.slice(0,5);a.actionTime=0}a.action=action;a.goal=goal||'Свободная вода'}
function visualSize(a){return F(a.type).size*a.growthScale}
function checkRisk(type){const f=F(type),p=params(f);return state.fish.some(a=>{const q=params(F(a.type));return p.predator&&a.length<p.length*p.preyRatio||q.predator&&p.length<a.length*q.preyRatio})}
function confirmRisk(text,fn){riskCallback=fn;$('#riskText').textContent=text;$('#risk').showModal()}
function addFish(type,confirmed=false,colorVariant=null){
 const f=F(type);if(!f)return toast('Вид рыбки не найден');
 if(state.fish.length>=FISH_LIMIT)return toast('В аквариуме уже 50 рыбок');
 if(colorVariants(f).length>1&&colorVariant===null)return chooseFishColor(type);
 const selectedColor=colorVariantId(f,colorVariant);
 if(state.mode==='natural'&&checkRisk(type)&&!confirmed)return confirmRisk('В естественном режиме '+f.name+' и её соседи могут охотиться друг на друга. Подтверждаете заселение?',()=>addFish(type,true,selectedColor));
 const instance=fishInstance(type);instance.colorVariant=selectedColor;state.fish.push(instance);changed();
 const variant=colorVariants(f).find(v=>v.id===selectedColor);toast(f.name+(variant?' · '+variant.name.toLowerCase():'')+' поселилась в аквариуме');
 if(page==='fish-choice')openPage('fish');else if(page==='fish')renderPage();
}
function ellipse(c,x,y,rx,ry,col){c.fillStyle=col;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill()}
function path(c,points,fill,stroke,width=1){c.beginPath();c.moveTo(...points[0]);points.slice(1).forEach(p=>c.lineTo(...p));c.closePath();if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke()}}
function curve(c,pts,color,width){c.beginPath();c.moveTo(pts[0],pts[1]);c.bezierCurveTo(...pts.slice(2));c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.stroke()}
const appearanceCache=new WeakMap();
let fishChoice=null;
function colorVariants(f){return Array.isArray(f.colorVariants)?f.colorVariants:[]}
function colorVariantId(f,id){const options=colorVariants(f);return options.some(v=>v.id===id)?id:options[0]?.id??null}
function appearanceFor(f,id){
 const variant=colorVariants(f).find(v=>v.id===colorVariantId(f,id));
 if(!variant)return f;
 let options=appearanceCache.get(f);if(!options){options=new Map();appearanceCache.set(f,options)}
 if(!options.has(variant.id))options.set(variant.id,{...f,...variant,id:f.id+'__'+variant.id,name:f.name,image:variant.image??f.image});
 return options.get(variant.id);
}
function fishAppearance(a){return appearanceFor(F(a.type),a.colorVariant)}
function chooseFishColor(type){
 const f=F(type);if(!f)return;
 fishChoice={type,colorVariant:colorVariantId(f,null)};openPage('fish-choice');
}
function colorOptionsHTML(f,current){
 return `<div class="color-options" role="group" aria-label="Окрас рыбки">${colorVariants(f).map(v=>`<button class="color-option" data-color-variant="${esc(v.id)}" aria-pressed="${colorVariantId(f,current)===v.id}" aria-label="${esc(v.name)}"><canvas data-color-preview="${esc(v.id)}" aria-hidden="true"></canvas><span><i class="swatch" style="background:${v.color??f.color}" aria-hidden="true"></i>${esc(v.name)}</span></button>`).join('')}</div>`;
}
function fishChoiceHTML(){
 const f=F(fishChoice?.type);if(!f)return '<p class="muted">Вернитесь в каталог и выберите рыбку.</p>';
 const variant=colorVariants(f).find(v=>v.id===fishChoice.colorVariant);
 return `<div class="fish-choice-preview"><canvas id="choicePreview" aria-label="Выбранный окрас"></canvas><div><h3>${esc(variant?.name??f.name)}</h3><p class="muted small">${esc(f.description)}</p></div></div><h3 class="color-heading">Выберите окрас</h3>${colorOptionsHTML(f,fishChoice.colorVariant)}<p class="muted small">Цвет сохраняется у каждой рыбки. Можно поселить рыбок разных окрасов вместе.</p>`;
}
function fishChoiceFooterHTML(){
 return `<span class="muted small">${state.fish.length} / ${FISH_LIMIT} рыбок</span><button class="primary" id="addColorFish" ${state.fish.length>=FISH_LIMIT?'disabled':''}>${uiIcon('fish')}Поселить рыбку</button>`;
}
function bindColorOptions(f,id,onSelect){
 document.querySelectorAll('[data-color-preview]').forEach(c=>thumb(c,'fish',appearanceFor(f,c.dataset.colorPreview)));
 document.querySelectorAll('[data-color-variant]').forEach(b=>b.addEventListener('click',()=>onSelect(colorVariantId(f,b.dataset.colorVariant))));
}
function bindFishChoice(){
 const f=F(fishChoice?.type);if(!f)return;
 thumb($('#choicePreview'),'fish',appearanceFor(f,fishChoice.colorVariant));
 bindColorOptions(f,fishChoice.colorVariant,id=>{fishChoice.colorVariant=id;renderPage()});
 on('#addColorFish','click',()=>addFish(f.id,false,fishChoice.colorVariant));
}
function validateColorVariants(value){
 if(value===undefined)return undefined;
 if(!Array.isArray(value)||value.length<1||value.length>8)throw Error('Нужно от 1 до 8 окрасов вида');
 const ids=new Set();
 return value.map(v=>{
  if(!v||!validText(v.id,30)||!/^[a-zA-Z0-9_-]+$/.test(v.id)||ids.has(v.id)||!validText(v.name,50))throw Error('Некорректное название или ID окраса');
  ids.add(v.id);const result={id:v.id,name:v.name};
  for(const key of ['color','accent'])if(v[key]!==undefined){if(typeof v[key]!=='string'||!/^#[0-9a-f]{6}$/i.test(v[key]))throw Error('Цвет окраса должен быть #RRGGBB');result[key]=v[key]}
  if(v.image!==undefined){if(!imageOK(v.image))throw Error('Окрасу нужна встроенная картинка PNG, JPEG или WebP');result.image=v.image}
  return result;
 });
}

const fishImages=new Map();
function fishImage(f){if(!f.image)return null;let entry=fishImages.get(f.id);if(!entry||entry.source!==f.image){const img=new Image();entry={source:f.image,img};fishImages.set(f.id,entry);img.onload=()=>{requestRender();if(['fish','fish-choice','stats'].includes(page)&&$('#sheet').open)renderPage()};img.onerror=()=>toast('Не удалось показать картинку рыбки: '+f.name);img.src=f.image}return entry.img}
function fishArt(c,f,x,y,scale,dir,t){const s=f.size*scale;c.save();c.translate(x,y);c.scale(dir,1);
 const image=fishImage(f);if(image&&image.complete&&image.naturalWidth){const w=s*(f.spriteWidth||3),h=w*image.naturalHeight/image.naturalWidth,n=24;c.rotate(Math.sin(t*1.6)*.018);for(let i=0;i<n;i++){const u=i/n,sw=image.naturalWidth/n,shift=u<.38?Math.sin(t*5-u*4)*s*.075*Math.pow((.38-u)/.38,2):0;c.drawImage(image,i*sw,0,sw,image.naturalHeight,-w/2+i*w/n,-h/2+shift,w/n+.3,h)}c.restore();return}
const wag=Math.sin(t*7)*.15;let rx=s,ry=s*.39;let grad=c.createLinearGradient(0,-s,0,s);grad.addColorStop(0,f.color);grad.addColorStop(1,f.accent);
 if(f.shape==='angel'){ry=s*.79;rx=s*.65;path(c,[[-s*.25,-s*.1],[-s*.2,-s*1.35],[s*.50,-s*.05]],grad);path(c,[[-s*.3,s*.18],[-s*.19,s*1.24],[s*.4,s*.15]],grad);curve(c,[s*.1,s*.55,s*.08,s*.9,s*.3,s*1.4,s*.15,s*1.52],f.color,1.5)}
 const tx=-rx*.76;path(c,[[tx,0],[tx-s*.80,-s*(f.shape==='guppy'?.7:.39)+wag*s],[tx-s*.87,s*(f.shape==='guppy'?.65:.4)+wag*s]],grad);
 c.globalAlpha=.8;path(c,[[-s*.4,-ry*.5],[-s*.05,-ry*1.9],[s*.55,-ry*.6]],f.color);path(c,[[-s*.3,ry*.6],[s*.05,ry*1.65],[s*.55,ry*.5]],f.accent);c.globalAlpha=1;
 if(f.shape==='gold'){rx=s*.84;ry=s*.53;path(c,[[-s*.65,0],[-s*1.7,-s*.62+wag*s],[-s*1.20,s*.12],[-s*1.65,s*.72+wag*s]],f.accent)}
 ellipse(c,0,0,rx,ry,grad);ellipse(c,rx*.18,-ry*.22,rx*.63,ry*.25,'#ffffff18');
 if(f.shape==='neon'){c.shadowColor=f.color;c.shadowBlur=7;c.fillStyle=f.color;c.fillRect(-s*.82,-2,s*1.5,3);c.shadowBlur=0;c.fillStyle=f.accent;c.fillRect(-s*.75,3,s*.9,ry*.55)}
 if(f.shape==='angel'||f.shape==='cichlid'){c.save();c.beginPath();c.ellipse(0,0,rx,ry,0,0,7);c.clip();c.globalAlpha=.72;for(let i=-2;i<3;i++){c.fillStyle=f.accent;c.fillRect(i*s*.28,-ry,s*.10,ry*2)}c.restore()}
 if(f.shape==='guppy'){for(let i=0;i<6;i++)ellipse(c,tx-s*.55+Math.sin(i*2)*s*.17,Math.cos(i*2)*s*.4+wag*s,s*.07,s*.06,f.color)}
 c.globalAlpha=.6;ellipse(c,s*.1,ry*.25,s*.28,s*.10,f.color);c.globalAlpha=1;ellipse(c,rx*.7,-ry*.17,s*.105,s*.105,'#f4e8c3');ellipse(c,rx*.72,-ry*.17,s*.064,s*.072,'#102b2d');ellipse(c,rx*.745,-ry*.21,s*.018,s*.018,'white');curve(c,[rx*.38,-ry*.5,rx*.17,-ry*.15,rx*.18,ry*.23,rx*.36,ry*.48],f.accent,1.2);c.restore()}
function rock(c,x,y,w,h,color,accent){const g=c.createLinearGradient(x,y-h,x,y);g.addColorStop(0,accent);g.addColorStop(1,color);c.beginPath();c.moveTo(x-w*.52,y);c.bezierCurveTo(x-w*.64,y-h*.38,x-w*.30,y-h*.94,x-w*.06,y-h);c.bezierCurveTo(x+w*.3,y-h*1.04,x+w*.64,y-h*.62,x+w*.51,y);c.closePath();c.fillStyle=g;c.fill();curve(c,[x-w*.33,y-h*.64,x-w*.18,y-h*.83,x+w*.03,y-h*.86,x+w*.18,y-h*.77],'#ffffff15',2)}
function proceduralDecorArt(c,d,x,y,scale,flip,t){c.save();c.translate(x,y);c.scale(scale*flip,scale);const w=d.width,h=d.height;ellipse(c,0,1,w*.5,9,'#021f2560');
 if(d.shape==='ribbon'){for(let i=0;i<11;i++){let bx=(i-5)*w*.068,hh=h*(.58+(Math.sin(i*7)+1)*.21),sw=Math.sin(t*.65+i)*14;c.beginPath();c.moveTo(bx,0);c.bezierCurveTo(bx-10,-hh*.3,bx+sw-25,-hh*.72,bx+sw,-hh);c.bezierCurveTo(bx+sw-10,-hh*.68,bx+10,-hh*.28,bx+7,0);c.fillStyle=i%2?d.color:d.accent;c.fill();curve(c,[bx+3,0,bx+9,-hh*.35,bx+sw-18,-hh*.7,bx+sw,-hh], '#d8ed9b28',1)}}
 if(d.shape==='fern'){for(let i=0;i<9;i++){const angle=(i-4)*.23,hh=h*(.6+(Math.sin(i*3)+1)*.19);c.save();c.rotate(angle+Math.sin(t*.6+i)*.025);curve(c,[0,0,0,-hh*.3,12,-hh*.7,0,-hh],d.color,3);for(let j=1;j<10;j++){let yy=-hh*j/10,len=(1-j/11)*w*.30;path(c,[[0,yy+10],[-len,yy-14],[0,yy-7]],j%2?d.color:d.accent);path(c,[[0,yy+10],[len,yy-16],[0,yy-7]],j%2?d.accent:d.color)}c.restore()}}
 if(d.shape==='leaves'){for(let i=0;i<8;i++){const lx=Math.cos(i*2.4)*w*.35,ly=-h*(.4+(Math.sin(i*6)+1)*.22);curve(c,[0,0,lx*.3,-h*.2,lx*.8,ly*.8,lx,ly],d.color,3);c.save();c.translate(lx,ly);c.rotate(lx/100+Math.sin(t*.6+i)*.04);const g=c.createLinearGradient(-20,0,20,0);g.addColorStop(0,d.color);g.addColorStop(1,d.accent);ellipse(c,0,0,w*.15,h*.25,g);curve(c,[0,h*.22,0,0,0,-h*.1,0,-h*.23],'#c4dbab60',1);c.restore()}}
 if(d.shape==='moss'){rock(c,0,0,w,h,'#53645c','#869386');for(let i=0;i<38;i++){let xx=Math.sin(i*7)*w*.44,yy=-h*.45-Math.cos(i*3)*h*.27;ellipse(c,xx,yy,8+i%4,6,d.color);curve(c,[xx,yy,xx-6,yy-6,xx+4,yy-9,xx+2,yy-13],i%2?d.accent:d.color,2)}}
 if(d.shape==='wood'){const lines=[[-w*.48,0,-w*.14,-h*.18,w*.18,-h*.19,w*.45,-h*.34],[-w*.1,-h*.13,0,-h*.3,-w*.1,-h*.8,-w*.27,-h],[-w*.02,-h*.48,w*.12,-h*.7,w*.28,-h*.76,w*.35,-h*.95],[-w*.21,-h*.08,-w*.36,-h*.18,-w*.31,-h*.5,-w*.45,-h*.58]];lines.forEach((p,i)=>{curve(c,p,d.color,i===0?29:12);curve(c,p,d.accent,i===0?8:3)});for(let i=0;i<14;i++)curve(c,[-w*.4+i*13,-4,-w*.4+i*13,-14,-w*.38+i*13,-16,-w*.38+i*13,-23],'#322a2360',1)}
 if(d.shape==='rocks'){rock(c,-w*.26,0,w*.66,h*.75,d.color,d.accent);rock(c,w*.1,-5,w*.6,h,d.color,d.accent);rock(c,w*.36,1,w*.43,h*.49,d.color,d.accent)}
 if(d.shape==='cave'){rock(c,0,0,w,h,d.color,d.accent);c.fillStyle='#061d23';c.beginPath();c.moveTo(-w*.27,1);c.bezierCurveTo(-w*.34,-h*.8,w*.27,-h*.8,w*.29,1);c.closePath();c.fill();ellipse(c,0,-3,w*.25,6,'#192e29');for(let i=0;i<7;i++)ellipse(c,-w*.40+i*w*.13,-h*.65+Math.sin(i)*14,9,4,'#72945866')}
 if(d.shape==='ruins'){const g=c.createLinearGradient(0,-h,0,0);g.addColorStop(0,d.accent);g.addColorStop(1,d.color);c.fillStyle=g;c.fillRect(-w*.39,-h*.68,w*.17,h*.68);c.fillRect(w*.23,-h*.7,w*.16,h*.7);c.beginPath();c.arc(0,-h*.61,w*.39,Math.PI,0);c.arc(0,-h*.61,w*.22,0,Math.PI,true);c.closePath();c.fill();for(const xx of [-w*.31,w*.31]){c.fillStyle=d.accent;c.fillRect(xx-w*.14,-h*.69,w*.28,11);c.fillRect(xx-w*.14,-10,w*.28,10);for(let i=0;i<3;i++){c.fillStyle='#0b303329';c.fillRect(xx-9+i*8,-h*.59,3,h*.5)}}curve(c,[-w*.12,-h*.92,-w*.03,-h*.78,-w*.1,-h*.75,-w*.04,-h*.69],'#324d4770',2);for(let i=0;i<6;i++)ellipse(c,-w*.42+i*25,-5,14,6,'#6a8d6666')}
 if(d.shape==='coral'){function branch(x,y,len,a,n){const nx=x+Math.sin(a)*len,ny=y-Math.cos(a)*len;curve(c,[x,y,x+(nx-x)*.3,y+(ny-y)*.4,nx+Math.sin(t*.7)*2,ny+10,nx,ny],n%2?d.accent:d.color,n*1.8+1.5);if(n>0){branch(nx,ny,len*.67,a-.5,n-1);branch(nx,ny,len*.7,a+.42,n-1)}}branch(0,0,h*.34,0,3);branch(-w*.09,0,h*.29,-.55,3);branch(w*.13,0,h*.3,.45,3)}
 if(d.shape==='shell'){const g=c.createLinearGradient(0,-h,0,0);g.addColorStop(0,d.accent);g.addColorStop(1,d.color);c.beginPath();c.moveTo(0,0);c.bezierCurveTo(-w*.75,-h*.2,-w*.5,-h,0,-h);c.bezierCurveTo(w*.5,-h,w*.75,-h*.2,0,0);c.fillStyle=g;c.fill();for(let i=-4;i<=4;i++)curve(c,[0,0,i*w*.03,-h*.3,i*w*.06,-h*.7,i*w*.10,-h*.78],'#79645660',1.3);ellipse(c,0,-8,w*.18,7,d.accent);ellipse(c,0,-10,7,7,'#fff4d7')}
 c.restore()}
function bgArt(c,b,w,h,t){if(b.image){let entry=backgroundImages.get(b.id);if(!entry||entry.source!==b.image){const img=new Image();entry={source:b.image,img};backgroundImages.set(b.id,entry);img.onload=()=>{invalidateRender();if(page==='bg')drawCatalog()};img.src=b.image}const img=entry.img;if(img.complete&&img.naturalWidth){const scale=Math.max(w/img.naturalWidth,h/img.naturalHeight),dw=img.naturalWidth*scale,dh=img.naturalHeight*scale;c.drawImage(img,(w-dw)/2,(h-dh)/2,dw,dh);return}}const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,b.top);g.addColorStop(.50,b.mid);g.addColorStop(1,b.bottom);c.fillStyle=g;c.fillRect(0,0,w,h);const glow=c.createRadialGradient(w*.64,-h*.2,1,w*.64,0,w*.82);glow.addColorStop(0,b.glow+'55');glow.addColorStop(1,b.glow+'00');c.fillStyle=glow;c.fillRect(0,0,w,h);
 c.save();c.globalAlpha=.11;for(let i=0;i<6;i++){let sx=(i*.21-.1)*w+Math.sin(t*.08+i)*w*.035;const rg=c.createLinearGradient(0,0,0,h);rg.addColorStop(0,b.glow);rg.addColorStop(1,b.glow+'00');path(c,[[sx,0],[sx+w*.065,0],[sx+w*.40,h],[sx+w*.08,h]],rg)}c.restore();
 for(let i=0;i<13;i++){const xx=w*i/12,hh=h*(.2+.12*Math.sin(i*2+1));c.fillStyle=b.bottom+'6b';c.beginPath();c.moveTo(xx-w*.1,h*.84);c.bezierCurveTo(xx-w*.07,h*.84-hh,xx+w*.035,h*.84-hh*1.3,xx+w*.1,h*.84);c.fill()}
 const sand=c.createLinearGradient(0,h*.80,0,h);sand.addColorStop(0,b.sand+'aa');sand.addColorStop(1,b.sand);c.fillStyle=sand;c.beginPath();c.moveTo(0,h*.84);c.bezierCurveTo(w*.2,h*.79,w*.28,h*.87,w*.48,h*.85);c.bezierCurveTo(w*.7,h*.81,w*.9,h*.86,w,h*.81);c.lineTo(w,h);c.lineTo(0,h);c.fill();
 c.save();for(let i=0;i<260;i++){const xx=((i*157)%997)/997*w,yy=(.87+((i*37)%127)/127*.13)*h;ellipse(c,xx,yy,(i%3+1)*.8, .6,i%2?'#eef1bd35':'#092e3440')}for(let i=0;i<6;i++){c.beginPath();for(let j=0;j<15;j++){const x=w*j/14,y=h*(.90+i*.02)+Math.sin(j*.9+i+t*.7)*3;if(j===0)c.moveTo(x,y);else c.lineTo(x,y)}c.strokeStyle=b.glow+'11';c.lineWidth=3;c.stroke()}c.restore();
}

const decorImages=new Map(),backgroundImages=new Map();
function decorArt(c,d,x,y,s,flip,t){if(!d.image)return proceduralDecorArt(c,d,x,y,s,flip,t);let entry=decorImages.get(d.id);if(!entry||entry.source!==d.image){const img=new Image();entry={source:d.image,img};decorImages.set(d.id,entry);img.onload=()=>{invalidateRender();masks.delete(d.id);if(page==='decor')drawCatalog()};img.src=d.image}const img=entry.img;if(img.complete&&img.naturalWidth){c.save();c.translate(x,y);c.scale(flip,1);if(['ribbon','fern','leaves'].includes(d.shape))c.rotate(Math.sin(t*.6)*.014);c.drawImage(img,-d.width*s*.5,-d.height*s,d.width*s,d.height*s);c.restore()}else proceduralDecorArt(c,d,x,y,s,flip,t)}
const PLANTS=['ribbon','fern','leaves','moss'],SOLIDS=['rocks','cave','ruins','wood','moss'];
function perspective(z){return .68+z*.16}
function unit(){return Math.min(W/1100,H/700)*(W<H?1.7:1)}
function decorScale(a){return a.size*perspective(a.depth)*unit()}
function fishScale(a){return perspective(a.z)*unit()}
function localPoint(a,x,y){const s=decorScale(a),angle=-a.angle*Math.PI/180,xx=(x-a.x)*W,yy=(y-a.y)*H;return {x:(xx*Math.cos(angle)-yy*Math.sin(angle))/s,y:(xx*Math.sin(angle)+yy*Math.cos(angle))/s}}
function solidAt(a,x,y){const d=D(a.type),p=localPoint(a,x,y),w=d.width,h=d.height;if(!SOLIDS.includes(d.shape))return false;const e=(cx,cy,rx,ry)=>((p.x-cx)/rx)**2+((p.y-cy)/ry)**2<1;
 if(d.shape==='rocks')return e(-w*.26,-h*.3,w*.29,h*.35)||e(w*.1,-h*.45,w*.28,h*.50)||e(w*.36,-h*.2,w*.2,h*.23);
 if(d.shape==='moss')return e(0,-h*.4,w*.48,h*.5);
 if(d.shape==='cave')return e(0,-h*.47,w*.5,h*.52)&&!(Math.abs(p.x)<w*.25&&p.y>-h*.5);
 if(d.shape==='ruins')return Math.abs(p.x)>w*.22&&Math.abs(p.x)<w*.40&&p.y<0&&p.y>-h*.67||p.y<-h*.6&&e(0,-h*.6,w*.4,h*.44)&&!e(0,-h*.6,w*.22,h*.24);
 if(d.shape==='wood')return Math.abs(p.x)<w*.48&&Math.abs(p.y+h*.13+p.x*.18)<12||Math.abs(p.x+w*.12)<9&&p.y<-h*.17&&p.y>-h*.85;
 return false}
function blocks(x,y,z){return state.decor.some(a=>Math.abs(a.depth-z)<.65&&solidAt(a,x,y))}
function canShelter(a,d){const f=F(a.type),t=D(d.type),scale=d.size*perspective(d.depth);if(PLANTS.includes(t.shape))return t.width*scale>visualSize(a)*.85;if(t.shape==='cave')return t.width*.5*scale>visualSize(a)*1.3;if(['wood','ruins'].includes(t.shape))return t.width*.5*scale>visualSize(a)*.8;return false}
function nearestShelter(a,plantsOnly=false){const list=state.decor.filter(d=>canShelter(a,d)&&params(F(a.type)).allowedDepths.includes(d.depth)&&(!plantsOnly||params(F(a.type)).preferredPlants.includes(D(d.type).shape)));return list.length?list.reduce((x,y)=>dist(a,shelterPoint(x))<dist(a,shelterPoint(y))?x:y):null}
function shelterPoint(d){const t=D(d.type),s=decorScale(d),y=d.y-t.height/H*s*(PLANTS.includes(t.shape)?.38:.18);return {x:d.x,y:clamp(y,.2,.82),z:d.depth}}
function shelterById(a){const d=state.decor.find(d=>d.id===a.shelter);return d&&canShelter(a,d)&&params(F(a.type)).allowedDepths.includes(d.depth)?d:null}
function occluded(a,b){for(let i=1;i<7;i++){const u=i/7;if(blocks(a.x+(b.x-a.x)*u,a.y+(b.y-a.y)*u,a.z+(b.z-a.z)*u))return true}return false}
function lightAt(x,y){let level=state.night?.06:.14;for(const l of state.lamps)level+=lampLight(l,x,y);return clamp(level,0,1)}
function shadowAt(x,y,z){let shade=0;for(const d of state.decor){if(d.depth<z-.3)continue;const t=D(d.type),s=decorScale(d),hh=t.height/H*s,ww=t.width/W*s;for(const l of state.lamps.filter(l=>l.enabled&&l.brightness>0)){const shift=(d.x-l.x)*.20*(y-(d.y-hh))/Math.max(hh,.01);if(y>d.y-hh&&y<Math.min(.96,d.y+.06)&&Math.abs(x-d.x-shift)<ww*.42)shade=Math.max(shade,PLANTS.includes(t.shape)?.28:.45)}}return shade}
const masks=new Map();
function decorMask(d){let m=masks.get(d.id),tick=Math.floor(animTime*2);if(!m||m.tick!==tick&&PLANTS.includes(d.shape)){const c=document.createElement('canvas');c.width=256;c.height=256;const mc=c.getContext('2d'),s=Math.min(224/d.width,228/d.height);decorArt(mc,d,128,246,s,1,animTime);mc.globalCompositeOperation='source-in';mc.fillStyle='#01121a';mc.fillRect(0,0,256,256);m={canvas:c,tick};masks.set(d.id,m)}return m.canvas}
function drawShadows(){if(!state.lamps.some(l=>l.enabled&&l.brightness>0))return;for(const a of state.decor){const d=D(a.type),s=decorScale(a),mw=d.width*s*1.15,mh=d.height*s*1.12;for(const l of state.lamps.filter(l=>l.enabled)){ctx.save();ctx.globalAlpha=(PLANTS.includes(d.shape)?.24:.38)*l.brightness/100;ctx.filter=displaySettings().blur?'blur('+(1+l.softness/25)+'px)':'none';ctx.translate(a.x*W,a.y*H);const shear=clamp((a.x-l.x)*1.4-Math.tan(l.angle*Math.PI/180)*.3,-.8,.8);ctx.transform(a.flip,0,shear,-.22,0,0);ctx.rotate(a.angle*Math.PI/180);ctx.drawImage(decorMask(d),-mw*.5,-mh,mw,mh);ctx.restore()}}}
function drawDecoration(a,alpha=1){const d=D(a.type);ctx.save();ctx.globalAlpha=alpha;ctx.translate(a.x*W,a.y*H);ctx.rotate(a.angle*Math.PI/180);decorArt(ctx,d,0,0,decorScale(a),a.flip,animTime);ctx.restore()}

function drawConditions(){for(const d of state.decor){const p=shelterPoint(d),t=D(d.type),s=decorScale(d);ctx.save();ctx.globalAlpha=.25;ctx.fillStyle=PLANTS.includes(t.shape)?'#86ffc5':'#ffd191';ctx.beginPath();ctx.ellipse(d.x*W,p.y*H,t.width*s*.45,t.height*s*.30,0,0,7);ctx.fill();ctx.restore();ctx.font='11px system-ui';ctx.fillStyle='#e1ffe7';const fits=state.fish.filter(a=>canShelter(a,d)).length;ctx.fillText(fits?fits+' рыбок помещаются':'Тесное укрытие',d.x*W-t.width*s*.42,d.y*H+13)}ctx.fillStyle='#051f2bbb';ctx.fillRect(16,16,Math.min(355,W-32),48);ctx.fillStyle='#d8f6e1';ctx.font='12px system-ui';ctx.fillText('Зелёный — растения и укрытия; песочный — препятствия',25,35);ctx.fillText('Проверка приблизительная, учитывает размер и план.',25,53)}

function preyFits(a,b){const p=params(F(a.type));return a.id!==b.id&&p.predator&&b.length<a.length*p.preyRatio&&p.allowedDepths.some(z=>Math.abs(z-b.z)<.65)}
function eligible(a,b){return preyFits(a,b)&&Math.abs(a.z-b.z)<1.2}
function canHunt(a){const p=params(F(a.type));return p.predator&&p.huntingEnabled&&100-a.stats.satiety>=p.hungerThreshold}
function hungryToHunt(a){return canHunt(a)}
function canLeaveTerritoryForHunt(a){const p=params(F(a.type));return canHunt(a)&&(!a.territory||100-a.stats.satiety>=p.leaveTerritoryHungerThreshold)}
function huntWithinTerritory(a){const p=params(F(a.type));return !!a.territory&&p.leaveTerritoryHungerThreshold>p.hungerThreshold&&!canLeaveTerritoryForHunt(a)}
function canConsumePrey(a,b){const p=params(F(a.type));return state.mode==='natural'&&p.consumeAllowed&&canHunt(a)&&eligible(a,b)&&(!huntWithinTerritory(a)||inTerritory(a,a)&&inTerritory(a,b))}
function isThreat(a,b){
 if(a.id===b.id)return false;
 if(a.prey===b.id)return true;
 if(!eligible(a,b))return false;
 const distance=dist(a,b);
 // A resting or satiated predator across the tank is not an endless alarm.
 return canHunt(a)&&a.cooldown<=0&&!a.prey&&distance<visionRadius(a)*.60||
  a.traits.aggression>.65&&a.cooldown<=0&&distance<.065;
}
function startPursuit(a,b,purpose){a.prey=b.id;a.pursuit=purpose;a.pursuitTime=0}
function endPursuit(a){const p=params(F(a.type));if(a.territory&&(a.pursuit||a.huntTrip))a.returnToTerritory=true;a.prey=null;a.pursuit=null;a.pursuitTime=0;a.huntTrip=null;a.cooldown=p.cooldown;a.huntRestUntil=simTime+p.restAfterChase}
function consumePrey(a,prey){
 // This final check is shared by visible collision and offline hunting.
 if(!canConsumePrey(a,prey)||!state.fish.includes(prey))return false;
 state.fish=state.fish.filter(b=>b.id!==prey.id);if(territoryEdit?.id===prey.id)stopEdit();
 a.stats.satiety=clamp(a.stats.satiety+params(F(a.type)).preyPortion,0,100);
 a.memory.meals++;a.memory.lastMeal=simTime;endPursuit(a);if(a.territory)a.returnToTerritory=true;record(a,'eat',prey.name);
 if(catchupReport)catchupReport.hunted++;lifeEvent(a.name+' поймала '+prey.name);
 if(!catchingUp)toast(a.name+' поймала '+prey.name);
 if(selected?.id===prey.id){selected=null;if($('#sheet').open)closeSheet()}
 return true;
}
function huntingLabel(p){
 if(!p.huntingEnabled)return 'Охота на рыб отключена файлом вида.';
 if(!p.consumeAllowed)return 'Файл вида разрешает только погони: добыча не погибает.';
 return 'Поедание в естественном режиме: голод от '+p.hungerThreshold+' / 100'+
  (p.customThreshold?' (порог из файла вида).':' (общий порог).')+
  (p.leaveTerritoryHungerThreshold>p.hungerThreshold?' Выход за территорию на охоту: голод от '+p.leaveTerritoryHungerThreshold+' / 100.':'')+' Защита территории и погони возможны раньше.';
}
function nearest(arr,a){return arr.length?arr.reduce((b,c)=>dist(a,b)<dist(a,c)?b:c):null}
function aim(a,x,y,z,action,goal,mult=1){a.targetX=clamp(x,.055,.945);a.targetY=clamp(y,.14,.81);if(z!==null)a.zTarget=habitatDepth(a,z);a.mult=mult;record(a,action,goal)}
function habitatDepth(a,z){const planes=params(F(a.type)).allowedDepths,nearest=planes.reduce((best,v)=>Math.abs(v-z)<Math.abs(best-z)?v:best);return clamp(z,Math.max(0,nearest-.24),Math.min(2,nearest+.24))}
function useShelter(a,action='rest',plantsOnly=false){
 let d=shelterById(a);if(!d||plantsOnly&&!params(F(a.type)).preferredPlants.includes(D(d.type).shape))d=nearestShelter(a,plantsOnly);
 if(!d)return false;
 a.shelter=d.id;const point=shelterPoint(d),p=params(F(a.type));
 // Routine rest and recovery remain in the animal's own water layer.
 if(['rest','recover'].includes(action)&&!p.ambush){point.y=clamp(point.y,...p.band);point.z=preferredDepth(a)}
 aim(a,point.x,point.y,point.z,action,D(d.type).name,dist(a,point)<.025?.025:p.cruise);return true;
}
function preferredDepth(a){const p=params(F(a.type));return p.preferredDepths.reduce((best,z)=>Math.abs(z-a.z)<Math.abs(best-a.z)?z:best)}
function waterBand(a){const p=params(F(a.type));return p.bands.length===1||Math.random()<.7?p.bands[0]:p.bands[Math.floor(rnd(1,p.bands.length))]}
function clearSwimPoint(x,y,z){return !blocks(x,y,z)}
function cruisePoint(a,shaded=false){
 const f=F(a.type),p=params(f),band=waterBand(a),ratio=H/W,preferredY=f.id==='gold'?rnd(.48,.74):clamp(a.y+rnd(-p.vertical,p.vertical),...band);let direction=a.vx>.003?1:a.vx<-.003?-1:a.dir;
 if(a.x<.18)direction=1;else if(a.x>.82)direction=-1;else if(Math.random()<.12)direction*=-1;
 const depth=Math.random()<.10?p.preferredDepths[Math.floor(rnd(0,p.preferredDepths.length))]:preferredDepth(a);
 let best=null;
 for(let i=0;i<10;i++){
  const x=clamp(a.x+direction*rnd(p.roam*.65,p.roam*1.25)+(i>5?rnd(-.12,.12):0),.10,.90),
   y=clamp(preferredY,...band);
  if(!clearSwimPoint(x,y,depth))continue;
  let score=Math.hypot(x-a.x,(y-a.y)*ratio)*.3+(shaded?2.2:.25)*Math.max(0,lightAt(x,y)-shadowAt(x,y,depth)-p.light);
  score+=Math.abs(x-.5)*p.openWater*.15;
  for(const b of state.fish)if(b.id!==a.id&&Math.abs(b.z-depth)<.5&&dist({x,y},b)<.045)score+=.12;
  for(let k=1;k<=4;k++)if(blocks(a.x+(x-a.x)*k/4,a.y+(y-a.y)*k/4,depth))score+=.5;
  if(!best||score<best.score)best={x,y,z:depth,score};
 }
 return best||{x:clamp(a.x-direction*.12,.1,.9),y:clamp(a.y,...p.band),z:depth};
}
function cruise(a,shaded=false){const p=params(F(a.type)),point=cruisePoint(a,shaded);a.shelter=null;a.timer=rnd(5,11);aim(a,point.x,point.y,point.z,shaded?'shade':p.benthic?'bottom':'swim',shaded?'Спокойный свет в своём слое':p.benthic?'Растения и грунт':'Привычный слой воды',p.cruise)}
function schoolSwim(a,friends){
 const f=F(a.type),p=params(f),members=[a,...friends].sort((x,y)=>x.id.localeCompare(y.id)),signature=members.map(b=>b.id).join('|');
 let route=schoolRoutes.get(a.type);
 if(!route||route.signature!==signature||simTime<route.time){
  route={signature,time:simTime,x:members.reduce((n,b)=>n+b.x,0)/members.length,y:clamp(members.reduce((n,b)=>n+b.y,0)/members.length,...p.band),z:preferredDepth(a),tx:null,ty:null,vx:0,vy:0};schoolRoutes.set(a.type,route);
 }
 const restingMembers=members.filter(b=>b.resting);
 if(restingMembers.length){const x=restingMembers.reduce((n,b)=>n+b.x,0)/restingMembers.length,y=restingMembers.reduce((n,b)=>n+b.y,0)/restingMembers.length;route.tx=clamp(x+Math.sin(simTime*.12)*.10,.13,.87);route.ty=clamp(y+Math.cos(simTime*.10)*.02,...p.band)}
 let elapsed=Math.min(2,Math.max(0,simTime-route.time));route.time=simTime;
 const ratio=H/W;
 if(route.tx===null||Math.hypot(route.tx-route.x,(route.ty-route.y)*ratio)<.045){
  const proxy={...a,x:route.x,y:route.y,z:route.z,vx:route.vx};
  const point=cruisePoint(proxy,lightAt(route.x,route.y)-shadowAt(route.x,route.y,route.z)>p.light+.28);
  route.tx=point.x;route.ty=point.y;route.z=point.z;
 }
 const dx=route.tx-route.x,dy=(route.ty-route.y)*ratio,d=Math.hypot(dx,dy),speed=f.speed*.00085*p.cruise*.86*(state.night?.55:1);
 route.vx=dx/(d||1)*speed;route.vy=dy/(d||1)*speed/ratio;
 const travel=Math.min(d,speed*elapsed);route.x+=dx/(d||1)*travel;route.y+=dy/(d||1)*travel/ratio;
 const spacing=clamp(visualSize(a)*fishScale(a)*(f.spriteWidth||2.8)*p.schoolSpacing/W,.035,.16),neighbors=friends.filter(b=>Math.abs(a.z-b.z)<.75&&dist(a,b)<.24&&!occluded(a,b)).sort((b,c)=>dist(a,b)-dist(a,c)).slice(0,6);
 let sx=0,sy=0,cx=0,cy=0,avx=0,avy=0;
 for(const b of neighbors){const bx=a.x-b.x,by=(a.y-b.y)*ratio,bd=Math.hypot(bx,by);cx+=b.x;cy+=b.y;avx+=b.vx;avy+=b.vy;if(bd<spacing){const push=(spacing-bd)/(bd||.001);sx+=(bd?bx:Math.sin(a.phase)*.001)*push;sy+=(bd?by:Math.cos(a.phase)*.001)*push/ratio}}
 const n=neighbors.length,cohesion=n?.20:0,alignment=n?.70:0;
 const x=clamp(route.x+route.vx*2.1+Math.sin(a.phase)*spacing*.65+(n?(cx/n-route.x)*cohesion+avx/n*alignment:0)+clamp(sx,-spacing,spacing),.09,.91),
  y=clamp(route.y+route.vy*2.1+Math.cos(a.phase)*spacing*.45/ratio+Math.sin(simTime*.19+a.phase)*.009+(n?(cy/n-route.y)*cohesion+avy/n*alignment:0)+clamp(sy,-spacing/ratio,spacing/ratio),...p.band),
  z=habitatDepth(a,route.z+Math.sin(a.phase)*.12);
 aim(a,x,y,z,'school','Плывёт рядом со стаей в своём слое',p.cruise*(dist(a,route)>.13?1.35:1));
}
function activePeriod(p){
 if(['night','nocturnal'].includes(p.activity))return state.night;
 if(['always','both','day-and-night'].includes(p.activity))return true;
 if(p.activity==='day-and-dusk'&&state.night){const hour=state.timeOfDay/LIFE_HOUR;return (hour-state.lightsOff+24)%24<1||(state.lightsOn-hour+24)%24<1}
 return !state.night;
}
function restFish(a,night=false){
 const p=params(F(a.type));a.prey=null;a.pursuit=null;
 if(a.territory){const t=a.territory,home=territoryHomePoint(a),point=inTerritory(a,a)&&!blocks(a.x,a.y,t.z)?{x:a.x,y:a.y}:home||{x:a.x,y:clamp(a.y,...p.band)};aim(a,point.x,point.y,t.z,night?'hover':'rest',!home?'Отдых рядом с перекрытым участком':night?'Ночной отдых на территории':'Отдых на своей территории',dist(a,point)>.025?p.cruise:.025);return}
 if(p.school||night){const y=clamp(night?p.band[1]-.015:a.y,...p.band);aim(a,clamp(a.x,.14,.86),y,preferredDepth(a),'hover',night?'Ночной покой в своём слое':'Короткий отдых в воде',dist(a,{x:a.x,y})>.025?p.cruise:.025)}
 else if(!useShelter(a,'rest'))aim(a,a.x,clamp(a.y,...p.band),preferredDepth(a),'hover','Тихая вода',.035);
}
// Territories use one screen-space circle: radius is a fraction of tank width.
// Imported radiusBodyLengths sets the initial radius in the model's body-size units.
function createTerritory(f,x,y,z){
 const p=params(f);if(!p.territoryEnabled)return null;
 return {x:clamp(x,.055,.945),y:clamp(y,...p.band),z,
  radius:p.territoryRadius??clamp(f.size/1100*perspective(z)*p.territoryBodyLengths,.03,.4),
  show:false,centerKind:p.ambush?'shelter':'point',anchor:null};
}
function ensureTerritory(a){
 const f=F(a.type),p=params(f);if(!p.territoryEnabled){a.territory=null;a.returnToTerritory=false;return null}
 if(!a.territory)a.territory=createTerritory(f,a.homeX,a.homeY,preferredDepth(a));
 const t=a.territory;t.x=clamp(t.x,.055,.945);t.y=clamp(t.y,...p.band);if(!p.allowedDepths.includes(t.z))t.z=p.allowedDepths.reduce((best,z)=>Math.abs(z-t.z)<Math.abs(best-t.z)?z:best);
 if(t.centerKind==='shelter'){
  let decor=state.decor.find(d=>d.id===t.anchor&&canShelter(a,d)&&p.allowedDepths.includes(d.depth));
  if(!decor){decor=nearestShelter(a,true);t.anchor=decor?.id??null}
  if(decor){const point=shelterPoint(decor);t.x=point.x;t.y=clamp(point.y,...p.band);t.z=point.z}
 }
 a.homeX=t.x;a.homeY=t.y;return t;
}
function territoryDistance(t,b){return Math.hypot(b.x-t.x,(b.y-t.y)*H/W)}
function inTerritory(a,b,margin=0){const t=a.territory;return !!t&&Math.abs(b.z-t.z)<.65&&territoryDistance(t,b)<=t.radius+margin}
function territoryPoint(a,x,y,fraction=1){
 const t=a.territory;if(!t)return {x,y};const dx=x-t.x,dy=(y-t.y)*H/W,d=Math.hypot(dx,dy),r=t.radius*fraction;
 return d>r?{x:t.x+dx/d*r,y:t.y+dy/d*r*W/H}:{x,y};
}
function territoryHomePoint(a){
 const t=a.territory;if(!t)return null;if(!blocks(t.x,t.y,t.z))return t;if(inTerritory(a,a)&&!blocks(a.x,a.y,t.z))return {x:a.x,y:a.y,z:t.z};const p=params(F(a.type));
 for(const fraction of [.35,.65,.92])for(let i=0;i<12;i++){const angle=i*Math.PI/6,point={x:t.x+Math.cos(angle)*t.radius*fraction,y:t.y+Math.sin(angle)*t.radius*fraction*W/H,z:t.z};if(point.x>=.055&&point.x<=.945&&point.y>=p.band[0]&&point.y<=p.band[1]&&!blocks(point.x,point.y,t.z))return point}
 return null;
}
function returnTerritory(a){
 const t=a.territory;if(!t){a.returnToTerritory=false;return false}const point=territoryHomePoint(a);
 if(!point){a.returnToTerritory=false;aim(a,a.x,clamp(a.y,...params(F(a.type)).band),preferredDepth(a),'rest','Территория перекрыта оформлением',.025);return true}
 if(dist(point,a)<Math.min(.025,t.radius*.25)&&Math.abs(a.z-t.z)<.35){if(a.returnToTerritory&&a.huntRestUntil>0)a.huntRestUntil=simTime+params(F(a.type)).restAfterChase;a.returnToTerritory=false;a.timer=0;return false}
 aim(a,point.x,point.y,t.z,'home','Свободное место на своей территории',params(F(a.type)).cruise);return true;
}
function patrolTerritory(a){
 const t=a.territory,p=params(F(a.type));if(!t)return;
 let point=territoryHomePoint(a);if(!point){a.returnToTerritory=true;returnTerritory(a);return}
 for(let i=0;i<10;i++){
  const angle=rnd(0,Math.PI*2),radius=t.radius*rnd(.35,.82),x=t.x+Math.cos(angle)*radius,y=t.y+Math.sin(angle)*radius*W/H;
  if(x>=.07&&x<=.93&&y>=p.band[0]&&y<=p.band[1]&&!blocks(x,y,t.z)){point={x,y};break}
 }
 a.timer=rnd(4,8);aim(a,point.x,point.y,t.z,'patrol','Граница собственной территории',p.cruise*.9);
}
function territorialIntruder(a){
 if(!a.territory||!inTerritory(a,a,.01))return null;
 return nearest(state.fish.filter(b=>b.id!==a.id&&inTerritory(a,b)&&!occluded(a,b)),a);
}
function drawTerritories(){
 for(const a of state.fish){const t=territoryEdit?.id===a.id?territoryEdit.item:ensureTerritory(a);if(!t||territoryEdit?.id!==a.id&&!t.show&&!(selected?.kind==='fish'&&selected.id===a.id&&page==='stats'&&$('#sheet').open))continue;
  const x=t.x*W,y=t.y*H,r=t.radius*W,active=a.action==='territory',preview=territoryEdit?.id===a.id;
  ctx.save();ctx.fillStyle=active?'#ffc47d12':'#b5edd10c';ctx.strokeStyle=active?'#ffd191cc':'#b5edd1aa';ctx.lineWidth=1.4;ctx.setLineDash([5,6]);
  ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.setLineDash([]);ctx.fillStyle=active?'#ffd191':'#c7f5dc';ctx.beginPath();ctx.arc(x,y,2.5,0,Math.PI*2);ctx.fill();
  if(preview){ctx.beginPath();ctx.arc(x,y,10,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(x-16,y);ctx.lineTo(x+16,y);ctx.moveTo(x,y-16);ctx.lineTo(x,y+16);ctx.stroke()}
  ctx.font='11px system-ui';ctx.textAlign='center';const label=a.name+' · '+Math.round(t.radius*100)+'%';ctx.fillText(label,clamp(x,65,W-65),clamp(y-r-8,18,H-18));ctx.restore();
 }
}
function territoryHTML(a){
 const t=ensureTerritory(a);if(!t)return '';
 return `<div class="divider"></div><h3>Территория</h3><p class="muted small">Рыбка патрулирует круг вокруг своего участка. Когда нарушитель выходит за границу, она прекращает защитную погоню и возвращается. Голодный хищник может выйти за этот круг на охоту.</p>${rangeField('territoryRadius','Радиус территории',Math.round(t.radius*100),3,40,1,'% ширины')}<p class="muted small" id="territoryInfo"></p><div class="row"><label class="grow"><input id="territoryShow" type="checkbox" ${t.show?'checked':''}> Показывать границу постоянно</label></div><div class="row"><button class="primary" id="territoryMove">Переместить территорию</button><button id="territoryCenter">Центр у рыбки</button></div>`;
}
function visionRadius(a){const p=params(F(a.type));return clamp(visualSize(a)*fishScale(a)/W*p.detection,.12,.40)*(.45+state.environment.clarity*.55)*(state.night?.70:1)}
function readyForSearch(a){const p=params(F(a.type)),s=a.stats;return canLeaveTerritoryForHunt(a)&&a.cooldown<=0&&s.energy>40&&s.health>=35&&s.stress<65&&(activePeriod(p)||s.satiety<=8)}
function beginHuntTrip(a){const p=params(F(a.type));a.huntTrip={until:simTime+p.searchDuration,leg:-1,direction:(a.territory?.x??a.x)<.5?1:-1,lastSeen:null};a.returnToTerritory=false;a.timer=0;a.shelter=null;record(a,'search','Выходит на охоту')}
function rememberPrey(a,b){if(a.huntTrip)a.huntTrip.lastSeen={id:b.id,x:b.x,y:b.y,z:b.z,until:simTime+params(F(a.type)).memorySeconds}}
function beginHuntPursuit(a,b){if(!a.huntTrip&&canLeaveTerritoryForHunt(a))beginHuntTrip(a);startPursuit(a,b,canConsumePrey(a,b)?'hunt':'chase');rememberPrey(a,b);pursuePrey(a,b)}
function pursuePrey(a,b){
 const p=params(F(a.type)),d=dist(a,b),strike=clamp(visionRadius(a)*(p.ambush?.45:.62),.065,.18),stalk=d>strike&&a.pursuitTime<=0;
 const lead=stalk?.25:.45,x=b.x+b.vx*lead,y=b.y+b.vy*lead;
 const local=huntWithinTerritory(a),point=local?territoryPoint(a,x,y):{x,y};
 aim(a,point.x,point.y,local?a.territory.z:b.z,stalk?'stalk':a.pursuit==='hunt'?'attack':'chase',b.name,stalk?p.cruise*(p.ambush?.72:1.05):p.burst);
}
function searchForPrey(a){
 const p=params(F(a.type)),trip=a.huntTrip;if(!trip)return;
 // Search waypoints scan the habitat; unseen prey positions never guide the route.
 if(a.timer<=0||dist(a,{x:a.targetX,y:a.targetY})<.04||!['search','stalk'].includes(a.action)){
  trip.leg++;const direction=trip.leg%2?-trip.direction:trip.direction,band=p.bands[trip.leg%p.bands.length],z=p.allowedDepths[trip.leg%p.allowedDepths.length];
  let point={x:direction>0?.87:.13,y:rnd(...band),z};
  for(let i=0;i<10;i++){const candidate={x:clamp(point.x+rnd(-.055,.055),.09,.91),y:rnd(...band),z};if(!blocks(candidate.x,candidate.y,z)){point=candidate;break}}
  if(trip.leg===0&&a.territory&&territoryDistance(a.territory,point)<a.territory.radius+.025){const exits=[.08,.92].flatMap(x=>p.bands.flatMap(b=>[b[0],b[1]].map(y=>({x,y,z})))).filter(v=>!blocks(v.x,v.y,z));if(exits.length)point=exits.reduce((best,v)=>territoryDistance(a.territory,v)>territoryDistance(a.territory,best)?v:best)}
  a.timer=Math.max(rnd(14,22),dist(a,point)/(F(a.type).speed*.00085*p.cruise*(p.ambush?.75:1.15))*(state.night?2:1)*1.4+3);aim(a,point.x,point.y,z,'search',p.ambush?'Медленно обследует воду у растений':'Обследует привычные слои воды',p.cruise*(p.ambush?.75:1.15));
 }else record(a,'search',p.ambush?'Ищет место для следующей засады':'Ищет подходящую добычу');
}
function homeAmbush(a,action='ambush'){
 const p=params(F(a.type)),t=a.territory;
 const shelters=state.decor.filter(d=>canShelter(a,d)&&p.preferredPlants.includes(D(d.type).shape)&&p.allowedDepths.includes(d.depth)&&(!t||inTerritory(a,shelterPoint(d))));
 const sh=shelters.length?nearest(shelters.map(d=>({...shelterPoint(d),decor:d})),a)?.decor:null,pt=sh?shelterPoint(sh):territoryHomePoint(a)||(t?{x:a.x,y:clamp(a.y,...p.band),z:preferredDepth(a)}:null);
 if(!pt)return false;a.shelter=sh?.id??null;
 aim(a,pt.x,pt.y,pt.z,dist(a,pt)>.027?'home':action,sh?D(sh.type).name:'Выбранный участок в своём слое',dist(a,pt)>.027?p.cruise:.015);return true;
}
function schoolAlarm(a){
 const p=params(F(a.type));if(!p.school)return false;
 const leader=nearest(state.fish.filter(b=>b.id!==a.id&&b.type===a.type&&b.action==='flee'&&b.fearUntil>simTime&&simTime-b.memory.lastScare<2&&Math.abs(b.z-a.z)<.7&&dist(a,b)<.13&&!occluded(a,b)),a);
 if(!leader)return false;
 a.fearFrom=leader.fearFrom;a.fearUntil=Math.min(leader.fearUntil,simTime+3);a.hideCooldown=simTime+30;
 aim(a,a.x+(leader.targetX-leader.x)*.65,clamp(a.y+(leader.targetY-leader.y)*.65,p.band[0]-.08,p.band[1]+.08),leader.zTarget,'flee','Следует за испуганной стаей',2.1);return true;
}
function canEatFood(f,food){const p=params(f);return !p.predator||food.kind==='protein'||food.kind==='sinking'}
function choose(a){
 const f=F(a.type),p=params(f),s=a.stats;ensureTerritory(a);
 const threat=nearest(state.fish.filter(b=>isThreat(b,a)&&dist(a,b)<.20&&!occluded(b,a)),a);
 if(threat){
  if(a.fearFrom!==threat.id&&simTime-a.memory.lastScare>15){a.memory.scares++;a.memory.lastScare=simTime;s.stress=clamp(s.stress+3,0,100)}
  if(a.prey||a.huntTrip)endPursuit(a);
  a.fearFrom=threat.id;a.fearUntil=simTime+4+a.traits.fear*5;a.hideCooldown=simTime+45;s.safety=Math.min(s.safety,25);
  const sh=nearestShelter(a);
  if(sh&&dist(a,shelterPoint(sh))<.22&&dist(a,threat)>.055){a.shelter=sh.id;useShelter(a,'hide');a.mult=dist(a,shelterPoint(sh))<.025?.025:1.8}
  else{const dx=a.x-threat.x,dy=a.y-threat.y,edge=a.x<.12||a.x>.88;aim(a,edge?.5:a.x+dx*2.5+(Math.abs(dx)<.02?a.dir*.12:0),clamp(a.y+dy*1.5,p.band[0]-.10,p.band[1]+.12),a.z+(a.z<threat.z?-.45:.45),'flee',threat.name,2.5)}
  const route=schoolRoutes.get(a.type);if(p.school&&route){route.tx=clamp(a.x+(a.x-threat.x)*2,.12,.88);route.ty=clamp(a.y+(a.y-threat.y)*1.5,...p.band)}
  return;
 }
 a.fearFrom=null;
 if(['hide','flee'].includes(a.action)&&a.fearUntil>simTime){if(a.action==='hide')useShelter(a,'hide');return}
 if(schoolAlarm(a))return;
 if(a.resting&&s.energy>=78&&s.health>=35){a.resting=false;a.timer=0}
 if(s.energy<24||s.health<35)a.resting=true;
 if(a.resting){if(a.prey||a.huntTrip)endPursuit(a);const nearbyFood=nearest(particles.filter(t=>t.life>0&&canEatFood(f,t)&&(!p.benthic||t.kind==='sinking'||t.y>.68)&&dist(a,t)<.14),a);if(nearbyFood&&s.satiety<70&&s.stress<70){aim(a,nearbyFood.x,nearbyFood.y,null,'feed','Близкий корм во время восстановления',p.cruise*.65);return}restFish(a);return}
 const food=nearest(particles.filter(t=>t.life>0&&canEatFood(f,t)&&(!p.benthic||t.kind==='sinking'||t.y>.68)),a);
 if(food&&s.satiety<95&&s.stress<82){if(a.prey||a.huntTrip)endPursuit(a);aim(a,food.x,food.y,null,'feed',food.kind==='protein'?'Белковый корм':food.kind==='sinking'?'Тонущие гранулы':'Хлопья',1.3+Math.min(.5,(100-s.satiety)/100));return}
 if(a.huntTrip&&(!canLeaveTerritoryForHunt(a)||s.energy<35||s.stress>=65||s.health<35||simTime>=a.huntTrip.until||!activePeriod(p)&&s.satiety>8)){endPursuit(a);record(a,'recover','Завершает выход на охоту')}
 if(a.prey){
  const prey=state.fish.find(b=>b.id===a.prey),territorial=a.pursuit==='territory';
  if(!prey||a.pursuitTime>(territorial?p.chase:Math.min(p.chase,p.burstDuration))||dist(a,prey)>.55||territorial&&!inTerritory(a,prey)||!territorial&&(!preyFits(a,prey)||huntWithinTerritory(a)&&(!inTerritory(a,a)||!inTerritory(a,prey)))){
   endPursuit(a);record(a,'recover','После погони');
  }else if(occluded(a,prey)||dist(a,prey)>visionRadius(a)*1.15){
   const seen=a.huntTrip?.lastSeen;
   if(!territorial&&seen?.id===prey.id&&seen.until>simTime){aim(a,seen.x,seen.y,seen.z,'search','Последнее место, где видела добычу',p.cruise);return}
   endPursuit(a);record(a,'recover','Добыча скрылась');
  }else{
   if(territorial){const point=territoryPoint(a,prey.x+prey.vx*.5,prey.y+prey.vy*.5);aim(a,point.x,point.y,a.territory.z,'territory',prey.name,1.35)}
   else{if(a.pursuit==='hunt'&&!canConsumePrey(a,prey))a.pursuit='chase';rememberPrey(a,prey);pursuePrey(a,prey)}
   return;
  }
 }
 if(a.returnToTerritory&&returnTerritory(a))return;
 if(a.huntRestUntil>simTime){restFish(a);record(a,'recover','Короткий отдых после охоты');return}a.huntRestUntil=0;
 if(!activePeriod(p)&&s.satiety>8){restFish(a,true);return}
 if(!a.huntTrip&&readyForSearch(a))beginHuntTrip(a);
 if(a.huntTrip){
  const prey=nearest(state.fish.filter(b=>eligible(a,b)&&dist(a,b)<visionRadius(a)&&!occluded(a,b)),a);
  if(prey){beginHuntPursuit(a,prey);return}
  searchForPrey(a);return;
 }
 // A species may hunt inside its territory before it is hungry enough to leave.
 if(huntWithinTerritory(a)&&canHunt(a)&&a.cooldown<=0&&s.energy>40&&s.health>=35&&s.stress<65){
  if(!inTerritory(a,a)){a.returnToTerritory=true;if(returnTerritory(a))return}
  const prey=nearest(state.fish.filter(b=>eligible(a,b)&&inTerritory(a,b)&&dist(a,b)<visionRadius(a)&&!occluded(a,b)),a);
  if(prey){startPursuit(a,prey,canConsumePrey(a,prey)?'hunt':'chase');pursuePrey(a,prey);return}
  if(p.ambush&&homeAmbush(a))return;patrolTerritory(a);return;
 }
 const intruder=territorialIntruder(a);
 if(intruder&&a.cooldown<=0&&s.energy>55&&s.stress<50){
  const point=territoryPoint(a,intruder.x,intruder.y,.90);
  if(a.traits.aggression>.60){startPursuit(a,intruder,'territory');aim(a,point.x,point.y,a.territory.z,'territory',intruder.name,1.35)}
  else aim(a,point.x,point.y,a.territory.z,'territory','Наблюдает за нарушителем: '+intruder.name,p.cruise*.65);
  return;
 }
 if(p.ambush){
  const prey=nearest(state.fish.filter(b=>eligible(a,b)&&(!huntWithinTerritory(a)||inTerritory(a,a)&&inTerritory(a,b))&&dist(a,b)<visionRadius(a)*.65&&!occluded(a,b)),a);
  if(p.huntingEnabled&&a.cooldown<=0&&s.energy>40&&a.traits.aggression>.8&&prey){startPursuit(a,prey,'chase');pursuePrey(a,prey);return}
  if(homeAmbush(a))return;
 }
 if(s.stress>60&&simTime>=a.hideCooldown){a.hideUntil=simTime+rnd(7,13);a.hideCooldown=a.hideUntil+60;if(!useShelter(a,'hide'))restFish(a);return}
 if(a.hideUntil>simTime){useShelter(a,'hide');return}
 const friends=state.fish.filter(b=>b.id!==a.id&&b.type===a.type);
 const recentTap=ripples.find(t=>t.life>0);
 if(recentTap&&dist(a,recentTap)<.35&&a.traits.curiosity>.45){if(s.trust>35){aim(a,recentTap.x,clamp(recentTap.y,...p.band),preferredDepth(a),'glass','Касание стекла',p.cruise);return}else if(a.traits.fear>.65){aim(a,a.x+(a.x-recentTap.x)*.4,clamp(a.y+.025,...p.band),preferredDepth(a),'alert','Касание стекла',p.cruise);a.timer=2;return}}
 if(p.school&&friends.length){schoolSwim(a,friends);return}
 if(state.breeding&&p.reproduce&&s.readiness>80){const mate=nearest(friends.filter(b=>b.sex!==a.sex&&b.stats.readiness>65&&!b.baby),a);if(mate){aim(a,mate.x,clamp(mate.y,...p.band),mate.z,'pair',mate.name,.6);return}}
 if(a.territory&&!inTerritory(a,a,.01)){a.returnToTerritory=true;if(returnTerritory(a))return}
 const outside=a.y<p.band[0]-.025||a.y>p.band[1]+.025,reached=dist(a,{x:a.targetX,y:a.targetY})<.026,
  transient=['feed','eat','hide','flee','school','hover','rest','recover','return','home','territory','ambush','stalk','search','glass','pair','alert'].includes(a.action)||a.territory&&['swim','shade','explore','bottom'].includes(a.action);
 if(a.timer<=0||outside||reached||transient){
  const bright=lightAt(a.x,a.y)-shadowAt(a.x,a.y,a.z)>p.light+.28;
  if(p.benthic&&state.decor.length&&Math.random()<.55){const decor=nearest(state.decor.filter(d=>p.preferredPlants.includes(D(d.type).shape)&&Math.abs(a.x-d.x)<.30),a);if(decor){const point=shelterPoint(decor);a.timer=rnd(4,8);aim(a,clamp(point.x+rnd(-.07,.07),.08,.92),clamp(point.y+rnd(-.03,.03),...p.band),p.allowedDepths.includes(decor.depth)?decor.depth:preferredDepth(a),'bottom','Собирает пищу на растениях',p.cruise);return}}
  if(f.id==='gold'&&Math.random()<.12){a.timer=rnd(4,7);aim(a,clamp(a.x+a.dir*rnd(.10,.22),.10,.90),rnd(.71,.80),preferredDepth(a),'bottom','Короткий поиск пищи у грунта',p.cruise*.8);return}
  if(a.territory){patrolTerritory(a);return}
  cruise(a,bright);
 }
}
function updateStats(a,dt,offline=false){
 const f=F(a.type),p=params(f),s=a.stats,hours=dt/LIFE_HOUR;
 const {nearThreat,friends,shade,comfortLight,comfortWater}=sampleSenses(a);
 const blend=(value,target,rate)=>target+(value-target)*Math.exp(-dt*rate);
 const targetComfort=clamp((comfortWater+comfortLight)/2-(nearThreat?20:0)-
  (p.school&&friends<2?12:0)-(state.fish.length>30?15:0),0,100);
 s.comfort=blend(s.comfort,targetComfort,.18);s.safety=blend(s.safety,clamp(nearThreat?20:85+shade*25,0,100),.7);
 s.stress=clamp(s.stress+hours*((nearThreat?16:-3)+(s.comfort<45?4:0)),0,100);
 const satiety=s.satiety,decay=p.metabolism,fedAbove=threshold=>clamp((satiety-threshold)/decay,0,hours);
 s.satiety=clamp(satiety-hours*decay,0,100);
 const resting=['rest','hover','ambush','recover','hide'].includes(a.action)&&dist(a,{x:a.targetX,y:a.targetY})<.035;
 const burst=['attack','chase','flee'].includes(a.action);
 if(offline)offlineEnergy(a,dt);
 else{s.energy=clamp(s.energy+dt*(resting?p.recovery:burst?-2.5:-.045),0,100);if(resting&&catchupReport)catchupReport.restIds.add(a.id)}
 const harm=s.stress>88?hours:hours-fedAbove(8),healing=s.comfort>60&&s.stress<=88?fedAbove(40):0;
 s.health=clamp(s.health-harm*2+healing*.75,0,100);
 s.schoolNeed=blend(s.schoolNeed,clamp(p.school?(p.schoolSize-friends-1)*14:0,0,100),.18);
 s.curiosity=blend(s.curiosity,clamp(a.traits.curiosity*100-(nearThreat?40:0),0,100),.06);
 const fertile=p.reproduce&&a.stage==='adult'&&s.comfort>65&&s.stress<30?fedAbove(60):0;
 s.readiness=clamp(s.readiness+fertile*100/(p.reproductionDays*24)-(hours-fertile)*.15,0,100);
 // Age, hunger, stress and reproduction use calendar time; body growth alone uses the x8 multiplier.
 a.age=Math.min(1e9,a.age+dt/LIFE_DAY);
 if(s.comfort>p.growthComfort&&s.health>=35){
  a.length=Math.min(p.maxLength,a.length+p.growth*fedAbove(p.growthSatiety)*LIFE_HOUR*GROWTH_MULTIPLIER/LIFE_DAY);
  a.growthScale=clamp(a.length/p.length,.40,4);
 }
 if(a.length>=p.adultLength){a.stage='adult';a.baby=false}
 else if(a.length>=p.adultLength*.55){a.stage='juvenile';a.baby=false}
 else{a.stage='fry';a.baby=true}
 a.cooldown=Math.max(0,a.cooldown-dt);a.timer-=dt;a.actionTime+=dt;
 if(a.prey&&(a.pursuit==='territory'||['attack','chase'].includes(a.action)))a.pursuitTime+=dt;
 if(!offline){
  if(Math.hypot(a.x-a.routeX,(a.y-a.routeY)*H/W)>.025){a.routeX=a.x;a.routeY=a.y;a.routeClock=0}else a.routeClock+=dt;
  if(a.routeClock>8&&!resting&&!a.prey&&!['hide','ambush','hover','rest','recover'].includes(a.action)){a.timer=0;a.decision=0;a.routeClock=0}
 }
}
function move(a,dt){const f=F(a.type),p=params(f);let dx=a.targetX-a.x,dy=(a.targetY-a.y)*H/W,dd=Math.hypot(dx,dy),speed=f.speed*.00085*(a.mult??.8)*(a.baby?.65:1)*(state.night?.55:1)*(Math.sin(simTime*.17+a.phase)*.08+.94);if(dd<.012)speed*=dd/.012;let desiredAngle=Math.atan2(dy,dx),currentSpeed=Math.hypot(a.vx,a.vy*H/W);
 if(currentSpeed>.002){const heading=Math.atan2(a.vy*H/W,a.vx),delta=Math.atan2(Math.sin(desiredAngle-heading),Math.cos(desiredAngle-heading)),turn=p.turnRate*(['flee','attack'].includes(a.action)?3:1)*Math.PI/180*dt;desiredAngle=heading+clamp(delta,-turn,turn)}
 const nextSpeed=currentSpeed+(speed-currentSpeed)*Math.min(1,dt*p.turn),vx=Math.cos(desiredAngle)*nextSpeed,vy=Math.sin(desiredAngle)*nextSpeed*W/H;
 const predicted={x:a.x+vx*.28,y:a.y+vy*.28};if(blocks(predicted.x,predicted.y,a.z)&&!blocks(a.x,a.y,a.z)){let best=null;for(let i=0;i<12;i++){const ang=i*Math.PI/6,n={x:clamp(a.x+Math.cos(ang)*.035,.05,.95),y:clamp(a.y+Math.sin(ang)*.035*W/H,.14,.81)};if(!blocks(n.x,n.y,a.z)){const score=Math.hypot(n.x-a.targetX,(n.y-a.targetY)*H/W);if(!best||score<best.score)best={...n,score}}}if(best){dx=best.x-a.x;dy=(best.y-a.y)*H/W;const d=Math.hypot(dx,dy);a.vx+=(dx/d*speed-a.vx)*Math.min(1,dt*4);a.vy+=(dy/d*speed*W/H-a.vy)*Math.min(1,dt*4)}else{a.vx*=.8;a.vy*=.8}}else{a.vx=vx;a.vy=vy}
 let nx=clamp(a.x+a.vx*dt+state.environment.current*dt*.001*(['rest','hover','ambush','recover'].includes(a.action)?.15:1),.055,.945),ny=clamp(a.y+a.vy*dt+Math.sin(simTime*1.2+a.phase)*dt*.0012,.14,.81);
 if(a.territory&&(['territory','patrol','rest','hover','recover','home'].includes(a.action)||huntWithinTerritory(a)&&['attack','chase','stalk','search','ambush'].includes(a.action))&&inTerritory(a,a,.002)&&territoryDistance(a.territory,{x:nx,y:ny})>a.territory.radius){
  const point=territoryPoint(a,nx,ny);nx=point.x;ny=point.y;
  const dx=(nx-a.territory.x)/a.territory.radius,dy=(ny-a.territory.y)*H/W/a.territory.radius,outward=a.vx*dx+a.vy*H/W*dy;
  if(outward>0){a.vx-=outward*dx;a.vy-=outward*dy*W/H}
 }
 if(!blocks(nx,ny,a.z)||blocks(a.x,a.y,a.z)){a.x=nx;a.y=ny}else{a.vx*=-.25;a.vy*=-.25;a.timer=0}
 a.z+=(a.zTarget-a.z)*Math.min(1,dt*.22);a.depth=Math.round(a.z);if(Math.abs(a.vx)>.003)a.dir=a.vx>0?1:-1;
 const pitch=Math.hypot(a.vx,a.vy*H/W)>.003?clamp(Math.atan2(a.vy*H,Math.abs(a.vx)*W),-.32,.32):0;
 a.pitch+=(pitch-a.pitch)*Math.min(1,dt*3);
 const food=particles.find(t=>t.life>0&&canEatFood(f,t)&&a.stats.satiety<99&&dist(a,t)<.026);if(food){food.life=0;a.stats.satiety=clamp(a.stats.satiety+p.portion,0,100);a.stats.trust=clamp(a.stats.trust+3,0,100);a.memory.meals++;a.memory.lastMeal=simTime;if(a.huntTrip||a.prey)endPursuit(a);if(a.territory)a.returnToTerritory=true;record(a,'eat','Корм');a.decision=.8}

 if(a.prey){
  const prey=state.fish.find(b=>b.id===a.prey);
  if(prey&&dist(a,prey)<.030&&Math.abs(a.z-prey.z)<.5){
   const ate=a.pursuit==='hunt'&&consumePrey(a,prey);
   if(!ate){
    prey.stats.stress=clamp(prey.stats.stress+6,0,100);
    let x=prey.x+(prey.x-a.x)*3+.12*(Math.random()-.5),y=prey.y+rnd(-.15,.15);
    if(a.pursuit==='territory'&&a.territory){const t=a.territory,dx=prey.x-t.x,dy=(prey.y-t.y)*H/W,d=Math.hypot(dx,dy),angle=d?Math.atan2(dy,dx):rnd(0,Math.PI*2);x=t.x+Math.cos(angle)*(t.radius+.06);y=t.y+Math.sin(angle)*(t.radius+.06)*W/H}
    aim(prey,x,y,rnd(0,2),'flee',a.name,2.6);
    prey.fearUntil=simTime+6;prey.hideCooldown=simTime+60;prey.decision=1.5;endPursuit(a);record(a,'recover','После погони');
   }
  }
 }

}
function reproduce(a,offline=false){const p=params(F(a.type)),s=a.stats;if(!state.breeding||!p.reproduce||a.stage!=='adult'||a.sex!=='female'||s.readiness<95||simTime-a.memory.lastBirth<p.reproductionDays*LIFE_DAY||state.fish.length>47)return;const mate=state.fish.find(b=>b.type===a.type&&b.sex==='male'&&b.stage==='adult'&&b.stats.readiness>80&&(offline||dist(a,b)<.08));if(!mate||!nearestShelter(a)||s.satiety<=60||s.comfort<=65||s.stress>=30||mate.stats.satiety<=60||mate.stats.comfort<=65||mate.stats.stress>=30)return;for(let i=0;i<2;i++){const baby=fishInstance(a.type,clamp(a.x+rnd(-.03,.03),.055,.945),clamp(a.y+rnd(-.025,.025),.14,.81));baby.colorVariant=colorVariantId(F(a.type),Math.random()<.5?a.colorVariant:mate.colorVariant);baby.baby=true;baby.stage='fry';baby.age=0;baby.length=p.length*.4;baby.growthScale=.4;baby.stats.readiness=0;baby.name='Малёк '+F(a.type).name+' '+(i+1);state.fish.push(baby)}s.readiness=0;mate.stats.readiness=0;a.memory.lastBirth=mate.memory.lastBirth=simTime;record(a,'spawn','2 малька');if(catchupReport)catchupReport.born+=2;lifeEvent('У '+a.name+' появились два малька');if(!catchingUp)toast('У '+a.name+' появились два малька');changed()}
function simulate(dt){advanceClock(dt);dirtySave=true;for(const t of particles){t.y+=dt*(t.kind==='sinking'?.06:.020);t.x+=Math.sin(simTime*.3+t.seed)*dt*.004+state.environment.current*dt*.001;t.life-=dt}particles=particles.filter(t=>t.life>0&&t.y<.84);for(const b of bubbles){b.y-=dt*b.speed;b.x+=Math.sin(simTime+b.seed)*dt*.002;if(b.y<-.03){b.y=1.02;b.x=rnd(.03,.97)}}for(const r of ripples)r.life-=dt;ripples=ripples.filter(r=>r.life>0);
 for(const a of state.fish.slice()){if(!state.fish.includes(a))continue;updateStats(a,dt);a.decision-=dt;if(a.decision<=0){choose(a);a.decision=.3+rnd(0,.12)}move(a,dt);reproduce(a)}
}

function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function on(id,event,fn){$(id)?.addEventListener(event,fn)}
function button(label,fn,cls=''){const b=document.createElement('button');b.textContent=label;b.className=cls;b.addEventListener('click',fn);return b}
function openPage(p){page=p;search='';category='all';clearPlacementGesture();if(!$('#sheet').open)$('#sheet').showModal();syncPlacementUI();renderPage()}
function closeSheet(){$('#sheet').close();if(page==='stats')selected=null;syncPlacementUI();requestRender()}
function thumb(c,kind,d){c.width=180;c.height=140;const cc=c.getContext('2d');if(kind==='fish'){const img=fishImage(d);if(img?.complete&&img.naturalWidth){const w=d.size*(d.spriteWidth||3),h=w*img.naturalHeight/img.naturalWidth;fishArt(cc,d,90,70,Math.min(152/w,112/h),1,animTime)}else fishArt(cc,d,96,70,d.shape==='angel'?.77:1.05,1,animTime)}else if(kind==='decor')decorArt(cc,d,90,132,Math.min(148/d.width,113/d.height),1,animTime);else bgArt(cc,d,180,140,animTime)}
function uiIcon(name){const paths={"menu":"<path d=\"M5 6h14M5 12h14M5 18h14\"/>","back":"<path d=\"m14 6-6 6 6 6\"/>","close":"<path d=\"m6 6 12 12M18 6 6 18\"/>","fish":"<path d=\"M18 12c-3-6-9-6-13 0 4 6 10 6 13 0Zm0 0 3-4v8l-3-4ZM8 8l2-3 4 2M8 16l2 3 4-2\"/><circle cx=\"7.7\" cy=\"11.5\" r=\".7\" fill=\"currentColor\" stroke=\"none\"/>","decor":"<path d=\"M12 21V9m0 7c-5 0-8-3-8-7 5 0 8 2 8 7Zm0-5c5 0 8-3 8-7-5 0-8 2-8 7Zm0 10c4 0 6-2 6-5-4 0-6 1-6 5Z\"/>","leaf":"<path d=\"M5 19C1 9 8 3 20 4c1 11-5 17-15 15Zm0 0L16 8\"/>","stone":"<path d=\"m3 18 3-8 5-4 6 2 4 10-3 3H6l-3-3ZM6 10l7 3 4-5M13 13l-2 8\"/>","objects":"<path d=\"m4 8 8-4 8 4v11l-8 3-8-3V8Zm0 0 8 4 8-4M12 12v10\"/>","grid":"<rect x=\"4\" y=\"4\" width=\"6\" height=\"6\" rx=\"1.5\"/><rect x=\"14\" y=\"4\" width=\"6\" height=\"6\" rx=\"1.5\"/><rect x=\"4\" y=\"14\" width=\"6\" height=\"6\" rx=\"1.5\"/><rect x=\"14\" y=\"14\" width=\"6\" height=\"6\" rx=\"1.5\"/>","lighting":"<path d=\"M5 5h14v4H5V5Zm7 4v11M8 12l-3 8M16 12l3 8M2 5h3m14 0h3\"/>","food":"<circle cx=\"7\" cy=\"5\" r=\"1.2\"/><circle cx=\"13\" cy=\"4\" r=\"1.2\"/><circle cx=\"18\" cy=\"8\" r=\"1.2\"/><circle cx=\"6\" cy=\"12\" r=\"1.2\"/><circle cx=\"12\" cy=\"11\" r=\"1.2\"/><circle cx=\"17\" cy=\"15\" r=\"1.2\"/><circle cx=\"10\" cy=\"19\" r=\"1.2\"/>","flakes":"<path d=\"m5 5 5-2 2 4-5 2-2-4Zm9 5 5-2 2 4-5 2-2-4ZM4 16l5-2 2 4-5 2-2-4Z\"/>","sinking":"<circle cx=\"7\" cy=\"7\" r=\"2\"/><circle cx=\"16\" cy=\"6\" r=\"2\"/><circle cx=\"12\" cy=\"14\" r=\"2\"/><path d=\"M4 21h16\"/>","protein":"<path d=\"M6 18c-4-2-2-6 1-5s6 2 6-1-5-3-5-6 4-5 8-2M6 18c4 3 9 2 12-1\"/>","packs":"<path d=\"M3 7V5h7l2 2h9v13H3V7Zm0 4h18M12 13v5m-2-2 2 2 2-2\"/>","settings":"<path d=\"M5 3v18M12 3v18M19 3v18\"/><rect x=\"2\" y=\"6\" width=\"6\" height=\"4\" rx=\"2\" fill=\"var(--panel)\"/><rect x=\"9\" y=\"14\" width=\"6\" height=\"4\" rx=\"2\" fill=\"var(--panel)\"/><rect x=\"16\" y=\"7\" width=\"6\" height=\"4\" rx=\"2\" fill=\"var(--panel)\"/>","search":"<circle cx=\"10.5\" cy=\"10.5\" r=\"6.5\"/><path d=\"m16 16 4.5 4.5\"/>","star":"<path d=\"m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z\"/>","pause":"<path d=\"M8 5v14M16 5v14\"/>","play":"<path d=\"m8 4 12 8-12 8V4Z\"/>","sun":"<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5\"/>","moon":"<path d=\"M19 16.5A9 9 0 0 1 7.5 5 9 9 0 1 0 19 16.5Z\"/>","screen":"<path d=\"M4 9V4h5m6 0h5v5M4 15v5h5m6 0h5v-5\"/>","history":"<path d=\"M4 8a9 9 0 1 1-1 6M4 3v5h5M12 7v5l4 2\"/>","undo":"<path d=\"m8 4-5 5 5 5M3 9h11a6 6 0 0 1 0 12h-2\"/>","redo":"<path d=\"m16 4 5 5-5 5m5-5H10a6 6 0 0 0 0 12h2\"/>","touch":"<path d=\"M9 12V5a2 2 0 0 1 4 0v7m0-3a2 2 0 0 1 4 0v4m0-2a2 2 0 0 1 4 0v5c0 3-2 5-5 5h-4l-7-7a2 2 0 0 1 3-3l1 1Z\"/>"};return `<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.menu}</svg>`}
function menuHTML(){return `<p class="menu-summary"><span>${state.fish.length} рыбок · ${state.decor.length} украшений</span><span class="mode-badge ${state.mode==='natural'?'natural':''}"><i aria-hidden="true"></i>${state.mode==='calm'?'Спокойный режим':'Естественный режим'}</span></p><div class="menu-grid">${[['fish','fish','Рыбки','Добавить и познакомиться'],['decor','decor','Оформление','Декор, фон и три плана'],['lighting','lighting','Освещение','Лампы, лучи и тени'],['food','food','Кормление','Выберите подходящий корм'],['packs','packs','Наборы и сохранения','Щука, форель, креветка и файлы'],['settings','settings','Настройки','Вода и правила аквариума']].map(a=>`<button class="menu-card" data-page="${a[0]}">${uiIcon(a[1])}<span class="menu-copy"><b>${a[2]}</b><small>${a[3]}</small></span></button>`).join('')}</div><div class="menu-tools"><button id="togglePause">${uiIcon(paused?'play':'pause')}<span>${paused?'Продолжить':'Пауза'}</span></button><button id="nightToggle">${uiIcon(state.night?'sun':'moon')}<span>${state.night?'День':'Ночь'}</span></button><button id="fullScreen" aria-label="Полный экран">${uiIcon('screen')}<span>Полный экран</span></button></div><p class="menu-footer">${paused?'Пауза останавливает жизнь, в том числе при закрытом приложении.':offlineEnabled?'Рыбки продолжают жить, пока аквариум закрыт.':'Жизнь при закрытом приложении отключена.'}</p><button class="absence-link" data-page="absence"><span>Пока вас не было${absenceReport?' · '+awayDuration(absenceReport.seconds):''}</span>${uiIcon('history')}</button>`}
function catalogHTML(){const decor=page==='decor';return `<p class="catalog-note">${decor?'10 встроенных украшений. Добавьте предмет, выберите план и подтвердите его место.':`${initialFishTypes().length} видов в сборке. У гуппи можно выбрать один из четырёх окрасов.`}</p><div class="search">${uiIcon('search')}<input id="search" type="search" placeholder="${decor?'Найти украшение':'Найти вид'}" aria-label="Поиск"><button id="favoriteFilter" aria-label="Показывать только избранное" aria-pressed="${onlyFavorites}">${uiIcon('star')}</button></div>${decor?`<div class="chips">${[['all','Все','grid'],['plants','Растения','leaf'],['shelters','Укрытия','stone'],['objects','Предметы','objects']].map(a=>`<button data-category="${a[0]}" aria-pressed="${category===a[0]}">${uiIcon(a[2])}${a[1]}</button>`).join('')}<button id="fitFilter" aria-pressed="${onlySuitable}">Подходит рыбкам</button></div><div class="row catalog-actions"><button id="editExisting">Расставить имеющиеся</button><button id="backgrounds">Фоны · ${BACKGROUNDS.length}</button><button class="history-button" id="catalogUndo" aria-label="Отменить действие" ${undoStack.length?'':'disabled'}>${uiIcon('undo')}</button><button class="history-button" id="catalogRedo" aria-label="Повторить действие" ${redoStack.length?'':'disabled'}>${uiIcon('redo')}</button></div>`:''}<div class="catalog" id="catalog"></div>`}
function drawCatalog(){const out=$('#catalog');if(!out)return;out.replaceChildren();const kind=page==='decor'?'decor':page==='bg'?'bg':'fish';let list=kind==='fish'?fishTypes:kind==='decor'?decorTypes:BACKGROUNDS;list=list.filter(d=>!search||(d.name+' '+d.description).toLowerCase().includes(search.toLowerCase()));if(onlyFavorites&&kind!=='bg')list=list.filter(d=>state.favorites.includes(kind+':'+d.id));if(kind==='decor'){list=list.filter(d=>category==='all'||category==='plants'&&PLANTS.includes(d.shape)||category==='shelters'&&['cave','wood','ruins'].includes(d.shape)||category==='objects'&&!PLANTS.includes(d.shape)&&!['cave','wood','ruins'].includes(d.shape));if(onlySuitable)list=list.filter(d=>state.fish.every(a=>canShelter(a,{type:d.id,size:1,depth:1}))) }
 for(const d of list){const wrap=document.createElement('div');wrap.className='item'+(kind==='bg'&&state.bg===d.id?' active':'');const b=document.createElement('button');b.className='catalog-select';const c=document.createElement('canvas');c.className='thumb';c.setAttribute('aria-hidden','true');thumb(c,kind,d);const text=document.createElement('span');text.className='item-info';const name=document.createElement('b');name.textContent=d.name;const desc=document.createElement('small');desc.textContent=d.description+(kind==='fish'&&colorVariants(d).length>1?' · '+colorVariants(d).length+' окраса':'');text.append(name,desc);b.append(c,text);b.addEventListener('click',()=>{if(kind==='fish')addFish(d.id);else if(kind==='decor')startEdit(d.id);else{state.bg=d.id;changed();drawCatalog()}});wrap.append(b);if(kind!=='bg'){const fav=button('',()=>{const key=kind+':'+d.id;if(state.favorites.includes(key))state.favorites=state.favorites.filter(x=>x!==key);else state.favorites.push(key);changed();drawCatalog()},'favorite');fav.innerHTML=uiIcon('star');const favorite=state.favorites.includes(kind+':'+d.id);fav.setAttribute('aria-pressed',favorite);fav.setAttribute('aria-label',(favorite?'Убрать из избранного: ':'В избранное: ')+d.name);wrap.append(fav)}out.append(wrap)}if(!list.length){const e=document.createElement('p');e.className='empty';e.textContent='Подходящих объектов нет. Попробуйте изменить фильтры.';out.append(e)}}
function statsHTML(){const a=state.fish.find(a=>a.id===selected?.id);if(!a)return '<p>Этой рыбки больше нет в аквариуме.</p>';const f=F(a.type),p=params(f);return `<div class="fish-top"><canvas id="fishThumb"></canvas><div><strong>${esc(a.name)}</strong><p class="muted small">${esc(f.name)} · ${p.predator?'хищное питание':'мирное питание'}<br>${a.sex==='female'?'Самка':'Самец'} · ${a.baby?'малёк':a.stage==='juvenile'?'молодая рыбка':'взрослая рыбка'} · <span id="fishLength"></span></p></div></div><div class="pills"><span class="pill">Агрессивность ${Math.round(a.traits.aggression*100)}%</span><span class="pill">${p.ambush?'Засада':f.school?'Стайная':'Свободное плавание'}</span><span class="pill">${esc(f.description)}</span></div>${colorVariants(f).length>1?'<div class="divider"></div><h3 class="color-heading">Окрас рыбки</h3>'+colorOptionsHTML(f,a.colorVariant):''}${p.predator?'<p class="muted small">'+esc(huntingLabel(p))+'</p>':''}<div class="stats">${statDefs.map(([id,label,bad])=>`<div><div class="stat-label"><span>${label}</span><strong id="val_${id}"></strong></div><div class="bar${bad?' bad':''}"><span id="bar_${id}"></span></div></div>`).join('')}</div><div class="action-card"><b id="fishAction"></b><small id="fishGoal"></small></div><div class="history" id="fishHistory"></div>${territoryHTML(a)}<div class="divider"></div><div class="row"><input id="fishName" maxlength="50" value="${esc(a.name)}" aria-label="Имя рыбки" class="grow"><button id="renameFish">Назвать</button><button class="danger" id="removeFish">Убрать</button></div><details><summary>Что влияет на поведение</summary><p>Опасность важнее голода; голод важнее исследования. Усталость отправляет рыбку отдыхать. Свет, тени, размер укрытия, соседи и стая меняют её решения.</p><p>Возраст: <span id="fishAge"></span> календарных дней. Рост тела ускорен в ×8; голод и отдых идут по времени аквариума. Покормлена <span id="fishMeals"></span> раз. Рыбка хранит опыт кормлений и испуга.</p></details>`}
function refreshStats(){const a=state.fish.find(a=>a.id===selected?.id);if(!a)return;for(const [k] of statDefs){const n=k==='hunger'?Math.floor(100-a.stats.satiety):Math.round(a.stats[k]);if($('#val_'+k))$('#val_'+k).textContent=n+' / 100';if($('#bar_'+k))$('#bar_'+k).style.width=n+'%'}if($('#fishAction'))$('#fishAction').textContent=ACTIONS[a.action]||a.action;if($('#fishGoal'))$('#fishGoal').textContent='Цель: '+a.goal;if($('#territoryInfo')&&a.territory)$('#territoryInfo').textContent=['Задний','Средний','Передний'][Math.round(a.territory.z)]+' план · центр закреплён за участком'+(a.returnToTerritory?' · возвращается':'' );if($('#fishLength'))$('#fishLength').textContent=a.length.toFixed(1)+' см';if($('#fishAge'))$('#fishAge').textContent=Math.floor(a.age);if($('#fishMeals'))$('#fishMeals').textContent=a.memory.meals;if($('#fishHistory'))$('#fishHistory').innerHTML=a.events.map(e=>'<span>• '+esc(e.text)+'</span>').join('')}
function rangeField(id,label,value,min,max,step=1,suffix=''){return `<label class="field"><span class="field-line">${label}<output id="${id}Out">${value}${suffix}</output></span><input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></label>`}
function bindRange(id,fn,suffix=''){on('#'+id,'input',e=>{const v=Number(e.target.value);$('#'+id+'Out').textContent=v+suffix;fn(v);changed()})}
function lightingHTML(){const l=state.lamps[activeLamp]||state.lamps[0];return `<p class="muted small" style="margin-top:0">Лампы освещают рыбок и оформление, смешивают цвет света и создают тени.</p>
 <div class="lamp-tabs">${state.lamps.map((a,i)=>`<button data-lamp="${i}" aria-pressed="${activeLamp===i}">${i+1}. ${esc(a.name)}</button>`).join('')}<button id="addLamp" ${state.lamps.length>=3?'disabled':''}>+ Лампа</button></div>
 <div class="light-presets">${LAMPS.map(a=>`<button data-preset="${a.id}" aria-pressed="${l.id===a.id}"><span class="swatch" style="background:${a.color}"></span>${a.name}</button>`).join('')}</div>
 <div class="divider"></div><div class="field-grid">${rangeField('brightness','Яркость',l.brightness,0,100,1,'%')}${rangeField('lampX','Расположение',Math.round(l.x*100),5,95,1,'%')}${rangeField('lampSize','Размер лампы',l.size??100,25,250,1,'%')}${rangeField('radius','Ширина света',Math.round(l.radius*100),15,95,1,'%')}${rangeField('angle','Направление',l.angle,-40,40,1,'°')}${rangeField('softness','Мягкость теней',l.softness,0,100,1,'%')}${rangeField('lampFilter','Цветофильтр лампы',l.filter,0,100,1,'%')}<label class="field"><span class="field-line">Цвет лампы и лучей</span><input id="lampColor" aria-label="Цвет лампы и лучей" type="color" value="${l.color}"></label></div>
 <div class="divider"></div><h3>Лучи света</h3><label class="row" style="margin:14px 0"><input id="lampRays" type="checkbox" ${l.raysVisible!==false?'checked':''}> Показывать лучи в воде</label>
 ${rangeField('rayVisibility','Видимость лучей',l.rayVisibility??55,0,100,1,'%')}<p class="muted small">Размер лампы меняет её корпус и область, из которой расходятся лучи. Цвет, ширина и направление лучей следуют настройкам выбранной лампы. При 0% лучи скрыты, освещение сохраняется.</p>
 <div class="row" style="margin-top:18px"><label><input id="lampBody" type="checkbox" ${l.body?'checked':''}> Показывать корпус</label><label><input id="lampEnabled" type="checkbox" ${l.enabled?'checked':''}> Включена</label><button id="removeLamp" ${state.lamps.length<=1?'disabled':''}>Удалить</button></div>
 <div class="divider"></div><h3>Общий фильтр воды</h3><div class="row" style="margin-top:12px"><input id="filterColor" aria-label="Цвет общего фильтра" type="color" value="${state.filterColor}"><div class="grow">${rangeField('filterStrength','Интенсивность',state.filterStrength,0,100,1,'%')}</div></div><p class="muted small">Настройте свет, закройте меню и посмотрите, как меняются рыбки, растения и тени.</p>`}
function foodHTML(){return `<p class="muted small" style="margin-top:0">Голодная рыбка ищет подходящую пищу. Базовый голод от 0 до 100 нарастает за 36 часов при ×1 без еды. Поедание соседей возможно от голода 90 / 100, если файл вида не задаёт другой порог. Территориальные погони возможны и у сытых рыб.</p><div class="food"><button data-food="flakes">${uiIcon('flakes')}<b>Хлопья</b><small>Для мирных рыб<br>Медленно тонут</small></button><button data-food="sinking">${uiIcon('sinking')}<b>Гранулы</b><small>Для донных рыб<br>Быстро тонут</small></button><button data-food="protein">${uiIcon('protein')}<b>Белковый корм</b><small>Для хищников<br>Подходит щуке и форели</small></button></div><div class="banner food-hint">${uiIcon('touch')}<span>Рыбки запоминают кормления и постепенно больше доверяют вам. Нажмите на них после еды, чтобы посмотреть изменения.</span></div>`}
function packsHTML(){return `<h3>Готовые виды из проекта</h3><p class="muted small">Форель, щука, креветка и петушок уже доступны в каталоге рыбок. Эти кнопки восстанавливают их настройки из комплектного набора.</p><div class="row"><button id="demoTrout">+ Форель</button><button id="demoShrimp">Красно-белая креветка</button><button id="demoPike">+ Щука</button><button id="demoBetta">+ Петушок</button></div><div class="divider"></div><h3>Ваши файлы</h3><div class="row" style="margin-top:14px"><button class="primary" id="importJSON">↑ Загрузить JSON / ZIP</button><button id="exportJSON">↓ Сохранить аквариум</button><button id="exampleJSON">↓ Пример набора</button></div><p class="muted small">Набор рыб или декора — до 2 МБ после распаковки. ZIP: JSON и изображения. Полное сохранение со всеми изображениями — до 8 МБ. Поддерживаются прежние файлы проекта.</p><div class="divider"></div><h3>Композиции на этом устройстве</h3><div class="row" style="margin-top:14px"><input id="compositionName" maxlength="40" placeholder="Название композиции" aria-label="Название композиции" class="grow"><button id="saveComposition">Сохранить</button></div><div id="compositions"></div><details><summary>Возможности аквариума 1.0</summary><ul><li>При ×1 сутки равны 24 часам. Рост тела ускорен в ×8; возраст идёт по календарю.</li><li>Поедание рыб отделено от погонь и защиты территории. Общий порог — голод 90; правила файла вида учитываются и в фоне.</li><li>Автоматическая смена дня и ночи с настройкой часов освещения.</li><li>Экономичный режим по умолчанию: ограничены кадры, упрощены тяжёлые эффекты, анимация полностью останавливается в фоне и на паузе.</li><li>Главный экран целиком отдан аквариуму, меню открываются отдельно.</li><li>Состояние каждой рыбки, её текущая цель и последние действия видны по нажатию.</li><li>Лампы, цветофильтры, смешивание света и тени от декора.</li><li>Укрытия, препятствия, отдых, стая, исследование, реакция на стекло и территориальность.</li><li>Щука выбирает растения для засады, охотится и возвращается к укрытию.</li><li>Редактор с подтверждением, отменой, поворотом, копированием и тремя планами.</li><li>Сохранения версии 1 загружаются в новую модель; повторный импорт обновляет вид.</li></ul></details>`}

function clockSettingsHTML(){
 return '<div class="divider"></div><h3>Суточный ритм · '+clockLabel()+'</h3>'+
  '<div class="field-grid" style="margin-top:14px"><label class="field"><span class="label">День и ночь</span>'+
  '<select id="lightCycle"><option value="auto" '+(state.lightCycle==='auto'?'selected':'')+'>Автоматически</option>'+
  '<option value="manual" '+(state.lightCycle==='manual'?'selected':'')+'>Вручную</option></select></label>'+
  rangeField('lightsOn','Начало дня',state.lightsOn,0,23,1,':00')+
  rangeField('lightsOff','Начало ночи',state.lightsOff,0,23,1,':00')+
  '</div><p class="muted small">Часы идут со скоростью аквариума. Ночью свет приглушается, дневные рыбки чаще отдыхают. Кнопка «День / Ночь» в меню включает ручной режим.</p>';
}
function settingsHTML(){return `<div class="banner ${state.mode==='natural'?'warn':''}">По умолчанию действует спокойный режим: погони и прятки есть, рыбки не погибают. Естественный режим разрешает поедание добычи подходящего размера только от голода 90 / 100, если файл вида не задаёт другой порог. Это правило действует и при закрытом приложении. Агрессивность позволяет гонять соседей и защищать участок.</div><div class="divider"></div><label class="field"><span class="label">Нагрузка на телефон</span><select id="displayMode">${Object.entries(DISPLAY_MODES).map(([id,p])=>`<option value="${id}" ${displayMode===id?'selected':''}>${p.name}</option>`).join('')}</select></label><p class="muted small">Экономичный режим уменьшает расход батареи: 20 кадров в секунду и облегчённые эффекты. При сворачивании анимация останавливается.</p><div class="field-grid" style="margin-top:20px"><label class="field"><span class="label">Режим</span><select id="mode"><option value="calm" ${state.mode==='calm'?'selected':''}>Спокойный</option><option value="natural" ${state.mode==='natural'?'selected':''}>Естественный</option></select></label><label class="field"><span class="label">Скорость времени</span><select id="speed">${[1,3,6].map(v=>`<option value="${v}" ${state.speed===v?'selected':''}>×${v}</option>`).join('')}</select></label>${rangeField('temperature','Температура',state.environment.temperature,14,30,1,'°C')}${rangeField('current','Течение',Math.round(state.environment.current*100),0,100,1,'%')}${rangeField('clarity','Чистота воды',Math.round(state.environment.clarity*100),20,100,1,'%')}</div>${clockSettingsHTML()}<div class="divider"></div><div class="stack"><label><input type="checkbox" id="offlineLife" ${offlineEnabled?'checked':''}> Жизнь при закрытом приложении</label><span class="muted small">Возраст, рост, голод, отдых, охота и размножение учитываются при возвращении. Пауза останавливает время. При ×1 сутки аквариума равны 24 реальным часам; при ×3 — 8 часам, при ×6 — 4 часам. Базовый голод от 0 до 100 нарастает за 36 реальных часов при ×1 без еды. Возраст идёт по календарю. Рост тела идёт в ×8 быстрее времени аквариума. Рост требует еды и подходящих условий. Голод, отдых и размножение не получают дополнительное ускорение ×8.</span><label><input type="checkbox" id="breeding" ${state.breeding?'checked':''}> Размножение гуппи</label><span class="muted small">При наличии взрослой пары, еды, комфорта и укрытия появляются два малька. Подготовка к размножению идёт постепенно по календарному времени; параметры можно задать в файле вида.</span><button id="showConditions">${conditions?'Скрыть':'Показать'} условия оформления</button><button id="resetScene" class="danger">Начать заново</button></div><details><summary>О тестовой версии</summary><p>Поведение рассчитывается на устройстве по состоянию и описанию вида. Внешний ИИ пока не подключён. Геометрия, тени и течение упрощены; значения — игровые настройки.</p><p>Новые рисунки и характеристики загружаются через JSON. Полностью новая механика требует обновления самого движка.</p><p>${storageOK?'Автосохранение в браузере доступно.':'Автосохранение недоступно — используйте файл JSON.'} Сохранённое время позволяет пересчитать жизнь при следующем открытии, включая день, ночь и развитие. Закрытая страница не выполняет анимацию и не расходует батарею на неё.</p></details>`}
function renderPage(){const titles={menu:'Ваш аквариум',fish:'Рыбки','fish-choice':F(fishChoice?.type)?.name??'Выбор окраса',decor:'Оформление',bg:'Задние фоны',lighting:'Свет и тени',food:'Кормление',packs:'Наборы и сохранения',settings:'Настройки',absence:'Пока вас не было',stats:'Состояние рыбки',editor:territoryEdit?'Настройка территории':'Настройка предмета'};$('#sheet').dataset.page=page;$('#sheetTitle').textContent=titles[page]||'Аквариум';$('#back').hidden=page==='menu';let html=page==='menu'?menuHTML():page==='fish'||page==='decor'?catalogHTML():page==='fish-choice'?fishChoiceHTML():page==='bg'?'<p class="catalog-note">Фон находится за всеми тремя планами оформления.</p><div class="catalog" id="catalog"></div>':page==='stats'?statsHTML():page==='lighting'?lightingHTML():page==='food'?foodHTML():page==='packs'?packsHTML():page==='settings'?settingsHTML():page==='absence'?absenceHTML():page==='editor'?editorHTML():'';$('#sheetBody').innerHTML=html;$('#choiceFooter').hidden=page!=='fish-choice';$('#choiceFooter').innerHTML=page==='fish-choice'?fishChoiceFooterHTML():'';bindPage()}
function bindPage(){if(page==='fish-choice')bindFishChoice();document.querySelectorAll('button[data-page]').forEach(b=>b.addEventListener('click',()=>openPage(b.dataset.page)));if(['fish','decor','bg'].includes(page)){drawCatalog();on('#search','input',e=>{search=e.target.value;drawCatalog()});on('#favoriteFilter','click',()=>{onlyFavorites=!onlyFavorites;$('#favoriteFilter').setAttribute('aria-pressed',onlyFavorites);drawCatalog()});document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;document.querySelectorAll('[data-category]').forEach(x=>x.setAttribute('aria-pressed',x===b));drawCatalog()}));on('#fitFilter','click',()=>{onlySuitable=!onlySuitable;$('#fitFilter').setAttribute('aria-pressed',onlySuitable);drawCatalog()});on('#backgrounds','click',()=>openPage('bg'));on('#editExisting','click',startArrange);on('#catalogUndo','click',()=>historyMove(false));on('#catalogRedo','click',()=>historyMove(true))}
 if(page==='stats'){const a=state.fish.find(a=>a.id===selected?.id);if(a){thumb($('#fishThumb'),'fish',fishAppearance(a));refreshStats();bindColorOptions(F(a.type),a.colorVariant,id=>{a.colorVariant=id;changed();renderPage()});
 if(a.territory){
  bindRange('territoryRadius',v=>{a.territory.radius=clamp(v/100,.03,.4);a.decision=0;a.timer=0},'% ширины');
  on('#territoryShow','change',e=>{a.territory.show=e.target.checked;changed()});
  on('#territoryMove','click',()=>startTerritoryEdit(a));
  on('#territoryCenter','click',()=>{const t=copy(a.territory),p=params(F(a.type));t.x=clamp(a.x,.055,.945);t.y=clamp(a.y,...p.band);t.z=p.allowedDepths.reduce((best,z)=>Math.abs(z-a.z)<Math.abs(best-a.z)?z:best);if(blocks(t.x,t.y,t.z))return toast('Центр попадает внутрь препятствия');setTerritory(a,t);refreshStats();toast('Центр территории перенесён')});
 }
 on('#renameFish','click',()=>{const name=$('#fishName').value.trim();if(name){a.name=name.slice(0,50);changed();renderPage()}});on('#removeFish','click',()=>{state.fish=state.fish.filter(x=>x.id!==a.id);changed();closeSheet();toast('Рыбка убрана из аквариума')})}}
 if(page==='menu'){on('#togglePause','click',toggleLifePause);on('#nightToggle','click',()=>{advanceVisible(Date.now());state.lightCycle='manual';state.night=!state.night;changed();renderPage()});on('#fullScreen','click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();closeSheet()}catch(e){toast('Полноэкранный режим недоступен в этом браузере')}})}
 if(page==='lighting'){
  const l=state.lamps[activeLamp]||state.lamps[0];
  document.querySelectorAll('[data-lamp]').forEach(b=>b.addEventListener('click',()=>{activeLamp=Number(b.dataset.lamp);renderPage()}));
  document.querySelectorAll('[data-preset]').forEach(b=>b.addEventListener('click',()=>{const keep={uid:l.uid,x:l.x,size:l.size??100,body:l.body,enabled:l.enabled,raysVisible:l.raysVisible!==false,rayVisibility:l.rayVisibility??55};Object.assign(l,lampInstance(b.dataset.preset,l.x),keep);changed();renderPage()}));
  on('#addLamp','click',()=>{if(state.lamps.length<3){state.lamps.push(lampInstance('warm',.25));activeLamp=state.lamps.length-1;changed();renderPage()}});
  on('#removeLamp','click',()=>{if(state.lamps.length>1){state.lamps.splice(activeLamp,1);activeLamp=0;changed();renderPage()}});
  bindRange('brightness',v=>l.brightness=v,'%');bindRange('lampX',v=>l.x=v/100,'%');bindRange('lampSize',v=>l.size=v,'%');bindRange('radius',v=>l.radius=v/100,'%');bindRange('angle',v=>l.angle=v,'°');bindRange('softness',v=>l.softness=v,'%');bindRange('lampFilter',v=>l.filter=v,'%');bindRange('filterStrength',v=>state.filterStrength=v,'%');
  bindRange('rayVisibility',v=>l.rayVisibility=v,'%');$('#rayVisibility').disabled=l.raysVisible===false;
  on('#lampRays','change',e=>{l.raysVisible=e.target.checked;$('#rayVisibility').disabled=!l.raysVisible;changed()});
  const setLampColor=e=>{l.color=e.target.value;changed()};on('#lampColor','input',setLampColor);on('#lampColor','change',setLampColor);on('#filterColor','input',e=>{state.filterColor=e.target.value;changed()});on('#lampBody','change',e=>{l.body=e.target.checked;changed()});on('#lampEnabled','change',e=>{l.enabled=e.target.checked;changed()});
 }
 if(page==='food')document.querySelectorAll('[data-food]').forEach(b=>b.addEventListener('click',()=>feed(b.dataset.food)));
 if(page==='packs'){on('#demoBetta','click',()=>installDemo(3));on('#demoTrout','click',()=>installDemo(0));on('#demoPike','click',()=>installDemo(1));on('#demoShrimp','click',()=>installDemo(2));on('#importJSON','click',()=>$('#fileInput').click());on('#exportJSON','click',()=>download(serialize(),'My_Aquarium_v2.json'));on('#exampleJSON','click',()=>download({format:'quiet-water-content-pack',version:1,fish:[{...BASE_FISH[1],image:undefined,id:'ruby_guppy',name:'Рубиновая гуппи',color:'#e597a0',accent:'#bc3752'}],decor:[{...BASE_DECOR[8],image:undefined,id:'blue_coral',name:'Голубой коралл',color:'#679ccb',accent:'#b8e7ed'}]},'Aquarium_Content_Example.json'));on('#saveComposition','click',saveComposition);renderCompositions()}
 if(page==='settings'){
 on('#lightCycle','change',e=>{advanceVisible(Date.now());state.lightCycle=e.target.value;syncLightCycle();changed();renderPage()});
 for(const key of ['lightsOn','lightsOff'])bindRange(key,v=>{
  advanceVisible(Date.now());
  if(v===state[key==='lightsOn'?'lightsOff':'lightsOn']){toast('Начало дня и ночи должны отличаться');$('#'+key).value=state[key];$('#'+key+'Out').textContent=state[key]+':00';return}
  state[key]=v;syncLightCycle();
 },':00');
 on('#offlineLife','change',e=>{advanceVisible(Date.now());offlineEnabled=e.target.checked;dirtySave=true;persist(true)});on('#displayMode','change',e=>setDisplayMode(e.target.value));on('#mode','change',e=>{if(e.target.value==='natural'){e.target.value=state.mode;confirmRisk('Хищники смогут съесть рыбок подходящего размера только от голода 90 / 100 или порога из файла вида. Правило действует и при закрытом аквариуме. Включить естественный режим?',()=>{advanceVisible(Date.now());state.mode='natural';changed();renderPage()})}else{advanceVisible(Date.now());state.mode='calm';changed();renderPage()}});on('#speed','change',e=>{advanceVisible(Date.now());state.speed=Number(e.target.value);dirtySave=true;persist(true);changed();renderPage()});bindRange('temperature',v=>state.environment.temperature=v,'°C');bindRange('current',v=>state.environment.current=v/100,'%');bindRange('clarity',v=>state.environment.clarity=v/100,'%');on('#breeding','change',e=>{state.breeding=e.target.checked;changed()});on('#showConditions','click',()=>{conditions=!conditions;closeSheet()});on('#resetScene','click',()=>confirmRisk('Заменить текущую композицию стартовым аквариумом? Сохраните её в JSON, если хотите оставить копию.',resetScene))}
 if(page==='editor')bindEditorParams()
}
function feed(kind){if(paused)return toast('Сначала снимите паузу');advanceVisible(Date.now());if(simTime-lastFeed<8)return toast('Рыбки ещё едят — немного подождите');lastFeed=simTime;for(let i=0;i<30;i++)particles.push({x:rnd(.25,.75),y:rnd(.12,.17),life:32,kind,seed:rnd(0,6)});state.fish.forEach(a=>a.decision=0);dirtySave=true;persist(true);closeSheet();toast('Корм в воде. Нажмите на рыбку после еды.')}
function legacyDownload(data,name){const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000)}
let editingMode=false;
function remember(){undoStack.push(copy(state.decor));undoStack=undoStack.slice(-20);redoStack=[]}
function historyMove(redo){if(territoryEdit)return;const src=redo?redoStack:undoStack,dest=redo?undoStack:redoStack;if(!src.length)return;dest.push(copy(state.decor));state.decor=src.pop();stopEdit();changed();if($('#sheet').open)renderPage();toast(redo?'Действие повторено':'Действие отменено')}
function placement(a){const d=D(a.type),s=decorScale(a),ang=a.angle*Math.PI/180,points=[[-d.width*.55,0],[d.width*.55,0],[-d.width*.55,-d.height],[d.width*.55,-d.height]].map(([x,y])=>({x:a.x+(x*Math.cos(ang)-y*Math.sin(ang))*s/W,y:a.y+(x*Math.sin(ang)+y*Math.cos(ang))*s/H}));if(points.some(p=>p.x<.005||p.x>.995||p.y<.05||p.y>1))return {kind:'bad',text:'Предмет выходит за границы аквариума'};
 if(SOLIDS.includes(d.shape)){for(const b of state.decor.filter(b=>b.id!==a.id&&b.depth===a.depth&&SOLIDS.includes(D(b.type).shape))){const bd=D(b.type);for(let i=-2;i<=2;i++)for(let j=1;j<5;j++){const p={x:a.x+i*d.width*s/W*.17,y:a.y-j*d.height*s/H*.18};if(solidAt(a,p.x,p.y)&&solidAt(b,p.x,p.y))return {kind:'bad',text:'Сплошные части предметов пересекаются на одном плане'}}}}
 const wide=d.width*s/W;if(a.depth===2&&a.x>.3&&a.x<.7&&wide>.17)return {kind:'warn',text:'Можно установить, но передний план перекрывает центр'};if(['cave','ruins'].includes(d.shape)&&state.fish.some(f=>!canShelter(f,a)))return {kind:'warn',text:'Не все рыбки помещаются в это укрытие'};return {kind:'ok',text:'Место подходит. Подтвердите установку'}}
function setTerritory(a,value){
 const p=params(F(a.type));a.territory={...copy(value),x:clamp(value.x,.055,.945),y:clamp(value.y,...p.band),centerKind:'point',anchor:null};
 a.homeX=a.territory.x;a.homeY=a.territory.y;a.shelter=null;a.prey=null;a.pursuit=null;a.pursuitTime=0;a.huntTrip=null;a.huntRestUntil=0;a.returnToTerritory=true;a.decision=0;a.timer=0;changed();
}
function startTerritoryEdit(a){
 if(!ensureTerritory(a))return;stopEdit();territoryEdit={id:a.id,item:copy(a.territory)};closeSheet();updateTerritoryEdit();
}
function updateTerritoryEdit(){
 if(!territoryEdit)return;const a=state.fish.find(f=>f.id===territoryEdit.id);if(!a){stopEdit();return}
 const t=territoryEdit.item,p=params(F(a.type));t.x=clamp(t.x,.055,.945);t.y=clamp(t.y,...p.band);const blocked=blocks(t.x,t.y,t.z);
 $('#editor').setAttribute('aria-label','Перемещение территории');$('#editName').textContent=a.name+' · радиус '+Math.round(t.radius*100)+'% · '+['Задний','Средний','Передний'][t.z];
 $('#editHint').textContent=(blocked?'Центр внутри препятствия. Выберите свободное место.':'Коснитесь воды или перетащите круг. Два пальца меняют радиус.')+' Участок остаётся в привычном слое рыбы.';
 $('#editHint').className=blocked?'status-bad':'status-ok';$('#editParams').disabled=false;$('#editApply').disabled=blocked;$('#editApply').textContent='Применить';$('#undo').disabled=$('#redo').disabled=true;syncPlacementUI();requestRender();
}
function applyTerritoryEdit(){
 const a=state.fish.find(f=>f.id===territoryEdit?.id),t=territoryEdit?.item;if(!a||!t)return stopEdit();if(blocks(t.x,t.y,t.z))return toast('Выберите место вне препятствия');
 setTerritory(a,t);stopEdit();toast('Территория изменена');
}
function territoryEditorHTML(){
 const a=state.fish.find(f=>f.id===territoryEdit?.id);if(!a)return '<p>Выберите рыбку.</p>';const t=territoryEdit.item,p=params(F(a.type));
 return `<h3>${esc(a.name)} · территория</h3><p class="muted small">Выберите положение и план. На аквариуме участок можно перенести пальцем.</p><div class="chips">${p.allowedDepths.map(z=>`<button data-territory-depth="${z}" aria-pressed="${t.z===z}">${['Задний','Средний','Передний'][z]} план</button>`).join('')}</div><div class="field-grid">${rangeField('territoryEditX','Центр по горизонтали',Math.round(t.x*100),6,94,1,'%')}${rangeField('territoryEditY','Глубина в воде',Math.round(t.y*100),Math.ceil(p.band[0]*100),Math.floor(p.band[1]*100),1,'%')}${rangeField('territoryEditRadius','Радиус',Math.round(t.radius*100),3,40,1,'% ширины')}</div><p id="territoryPlacement" class="muted small"></p><button id="returnTerritoryEditor">Вернуться к аквариуму</button>`;
}
function bindTerritoryEditor(){
 if(!territoryEdit)return;const t=territoryEdit.item;
 document.querySelectorAll('[data-territory-depth]').forEach(b=>b.addEventListener('click',()=>{t.z=Number(b.dataset.territoryDepth);updateTerritoryEdit();renderPage()}));
 for(const [id,key] of [['territoryEditX','x'],['territoryEditY','y'],['territoryEditRadius','radius']])on('#'+id,'input',e=>{t[key]=Number(e.target.value)/100;$('#'+id+'Out').textContent=e.target.value+(key==='radius'?'% ширины':'%');updateTerritoryEdit();$('#territoryPlacement').textContent=blocks(t.x,t.y,t.z)?'Центр внутри препятствия':'Место подходит'});
 on('#returnTerritoryEditor','click',closeSheet);
}
function beginTerritoryPointer(e,p){
 const t=territoryEdit.item;if(pointers.size>=2)return;pointers.set(e.pointerId,p);canvas.setPointerCapture(e.pointerId);$('#editor').classList.add('is-dragging');
 if(pointers.size===2){const [a,b]=[...pointers.values()];gesture={distance:Math.hypot((b.x-a.x)*W,(b.y-a.y)*H),radius:t.radius};drag=null}
 else{if(territoryDistance(t,p)>t.radius){t.x=p.x;t.y=p.y;updateTerritoryEdit()}drag={ox:p.x-t.x,oy:p.y-t.y}}
}
function moveTerritoryPointer(e,p){
 if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,p);const t=territoryEdit.item;
 if(gesture&&pointers.size===2){const [a,b]=[...pointers.values()],d=Math.hypot((b.x-a.x)*W,(b.y-a.y)*H);t.radius=clamp(gesture.radius*d/Math.max(gesture.distance,1),.03,.4)}
 else if(drag){t.x=p.x-drag.ox;t.y=p.y-drag.oy}updateTerritoryEdit();
}
function syncPlacementUI(){$('#editor').hidden=!(editingMode||territoryEdit)||$('#sheet').open;$('#menuButton').hidden=editingMode||!!territoryEdit}
function clearPlacementGesture(){for(const id of pointers.keys())if(canvas.hasPointerCapture?.(id))canvas.releasePointerCapture(id);pointers.clear();drag=null;gesture=null;$('#editor').classList.remove('is-dragging')}
function startArrange(){stopEdit();clearPlacementGesture();edit=null;editingMode=true;closeSheet();$('#editName').textContent='Расстановка оформления';$('#editHint').textContent='Коснитесь предмета и перетащите его. Кнопки появятся, когда отпустите.';$('#editHint').className='';$('#editParams').disabled=true;$('#editApply').disabled=true;$('#undo').disabled=!undoStack.length;$('#redo').disabled=!redoStack.length;syncPlacementUI()}
function startEdit(type,existing=null){territoryEdit=null;if(!existing&&state.decor.length>=DECOR_LIMIT)return toast('В аквариуме уже 40 украшений');clearPlacementGesture();const a=existing?copy(existing):{id:uid(),type,x:.5,y:.88,depth:1,size:1,flip:1,angle:0,order:state.decor.reduce((n,d)=>Math.max(n,d.order),0)+1,locked:false};edit={id:existing?.id??null,item:a,new:!existing};editingMode=true;closeSheet();updateEdit()}
function stopEdit(){clearPlacementGesture();edit=null;territoryEdit=null;editingMode=false;$('#editApply').textContent='Установить';$('#editor').setAttribute('aria-label','Расстановка оформления');if(page==='editor'&&$('#sheet').open)$('#sheet').close();syncPlacementUI();requestRender()}
function updateEdit(){if(!edit)return;$('#editName').textContent=D(edit.item.type).name+' · '+['Задний','Средний','Передний'][edit.item.depth];const p=placement(edit.item);$('#editHint').textContent=p.text+' · Перетащите предмет; два пальца — размер и поворот.';$('#editHint').className='status-'+p.kind;$('#editParams').disabled=false;$('#editApply').disabled=p.kind==='bad';syncPlacementUI();requestRender();$('#undo').disabled=!undoStack.length;$('#redo').disabled=!redoStack.length}
function applyEdit(){if(!edit||placement(edit.item).kind==='bad')return toast('Исправьте положение предмета');remember();if(edit.new)state.decor.push(copy(edit.item));else state.decor=state.decor.map(a=>a.id===edit.id?copy(edit.item):a);state.fish.forEach(a=>{a.decision=0;a.timer=0});stopEdit();changed();toast('Предмет установлен')}
function editorHTML(){if(territoryEdit)return territoryEditorHTML();if(!edit)return '<p>Выберите предмет в аквариуме.</p>';const a=edit.item;return `<h3>${esc(D(a.type).name)}</h3><p class="muted small">Перемещение, размер и поворот меняют доступность проходов и укрытий.</p><div class="chips">${['Задний','Средний','Передний'].map((v,i)=>`<button data-depth="${i}" aria-pressed="${a.depth===i}">${v}</button>`).join('')}</div><div class="field-grid">${rangeField('editSize','Размер',Math.round(a.size*100),50,170,1,'%')}${rangeField('editAngle','Поворот',a.angle,-50,50,1,'°')}</div><div class="row" style="margin-top:18px"><button id="flipDecor">↔ Отразить</button><button id="orderBack">За другие</button><button id="orderFront">Перед другими</button><button id="duplicateDecor">Копировать</button></div><div class="divider"></div><div class="row"><label class="grow"><input id="lockDecor" type="checkbox" ${a.locked?'checked':''}> Закрепить после установки</label><button id="deleteDecor" class="danger">Удалить</button></div><div class="banner" style="margin-top:18px" id="placementText">${esc(placement(a).text)}</div><div class="row end" style="margin-top:18px"><button id="returnEditor" class="primary">Вернуться к расстановке</button></div>`}
function bindEditorParams(){if(territoryEdit)return bindTerritoryEditor();if(!edit)return;const a=edit.item;document.querySelectorAll('[data-depth]').forEach(b=>b.addEventListener('click',()=>{a.depth=Number(b.dataset.depth);updateEdit();renderPage()}));const range=(id,key,factor=1)=>on('#'+id,'input',e=>{a[key]=Number(e.target.value)*factor;$('#'+id+'Out').textContent=e.target.value+(key==='size'?'%':'°');updateEdit();$('#placementText').textContent=placement(a).text});range('editSize','size',.01);range('editAngle','angle');on('#flipDecor','click',()=>a.flip*=-1);on('#orderBack','click',()=>a.order=Math.min(...state.decor.map(d=>d.order),0)-1);on('#orderFront','click',()=>a.order=Math.max(...state.decor.map(d=>d.order),0)+1);on('#duplicateDecor','click',()=>{if(state.decor.length>=40)return toast('Достигнут лимит украшений');edit.new=true;edit.id=null;a.id=uid();a.x=clamp(a.x+.06,.05,.95);a.locked=false;updateEdit();closeSheet();toast('Копия готова — выберите место')});on('#lockDecor','change',e=>a.locked=e.target.checked);on('#deleteDecor','click',()=>{if(!edit.new){remember();state.decor=state.decor.filter(d=>d.id!==edit.id)}stopEdit();closeSheet();changed();toast('Предмет удалён')});on('#returnEditor','click',closeSheet)}
function pointerPoint(e){const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height}}
function fishHit(p){return state.fish.slice().sort((a,b)=>b.z-a.z).find(a=>Math.hypot((p.x-a.x)*W,(p.y-a.y)*H)<Math.max(14,visualSize(a)*fishScale(a)*(F(a.type).image?1.7:1.25)))}
function decorHit(p){return state.decor.slice().sort((a,b)=>b.depth-a.depth||b.order-a.order).find(a=>{const d=D(a.type),q=localPoint(a,p.x,p.y);return Math.abs(q.x)<d.width*.56&&q.y<9&&q.y>-d.height})}
function beginPlacementPointer(e,p){if(edit.item.locked){toast('Предмет закреплён. Снимите закрепление в настройках.');return}pointers.set(e.pointerId,p);canvas.setPointerCapture(e.pointerId);$('#editor').classList.add('is-dragging');if(pointers.size===2){const [a,b]=[...pointers.values()];gesture={distance:Math.hypot((b.x-a.x)*W,(b.y-a.y)*H),angle:Math.atan2((b.y-a.y)*H,(b.x-a.x)*W),size:edit.item.size,rotation:edit.item.angle};drag=null}else if(pointers.size===1)drag={ox:p.x-edit.item.x,oy:p.y-edit.item.y}}
canvas.addEventListener('pointerdown',e=>{const p=pointerPoint(e);if(territoryEdit){beginTerritoryPointer(e,p);return}if(edit){beginPlacementPointer(e,p);return}
 if(editingMode){const d=decorHit(p);if(d){startEdit(d.type,d);beginPlacementPointer(e,p)}else toast('Коснитесь растения, камня или другого предмета');return}
 const f=fishHit(p);if(f){selected={kind:'fish',id:f.id};openPage('stats');return}ripples.push({...p,life:2});for(const a of state.fish){if(dist(a,p)<.2){a.stats.stress=clamp(a.stats.stress+(a.stats.trust>45?1:4),0,100);a.decision=0}}});
canvas.addEventListener('pointermove',e=>{const p=pointerPoint(e);if(territoryEdit){moveTerritoryPointer(e,p);return}if(!edit)return;if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,p);if(gesture&&pointers.size===2){const [a,b]=[...pointers.values()],d=Math.hypot((b.x-a.x)*W,(b.y-a.y)*H),angle=Math.atan2((b.y-a.y)*H,(b.x-a.x)*W);edit.item.size=clamp(gesture.size*d/Math.max(gesture.distance,1),.5,1.7);edit.item.angle=Math.round(clamp(gesture.rotation+(angle-gesture.angle)*180/Math.PI,-50,50))}else if(drag){edit.item.x=clamp(p.x-drag.ox,.02,.98);edit.item.y=clamp(p.y-drag.oy,.45,.98)}updateEdit()});
function endPointer(e){pointers.delete(e.pointerId);gesture=null;const p=pointers.values().next().value;const item=territoryEdit?.item??edit?.item;drag=item&&p?{ox:p.x-item.x,oy:p.y-item.y}:null;$('#editor').classList.toggle('is-dragging',pointers.size>0);if(territoryEdit)updateTerritoryEdit();else if(edit)updateEdit()}canvas.addEventListener('pointerup',endPointer);canvas.addEventListener('pointercancel',endPointer);canvas.addEventListener('lostpointercapture',endPointer);
function validNum(n,min,max){return typeof n==='number'&&Number.isFinite(n)&&n>=min&&n<=max}
function preferredSavedDepth(a,p){return p.preferredDepths.reduce((best,z)=>Math.abs(z-a.z)<Math.abs(best-a.z)?z:best)}
function validText(s,max=120){return typeof s==='string'&&s.length>0&&s.length<=max}
function imageOK(s){return typeof s==='string'&&s.length<=900000&&(PACKAGED_IMAGES.has(s)||/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(s))}
function safeProfile(x,depth=0){if(depth>12)throw Error('Слишком сложный профиль');if(x===null||typeof x==='boolean')return x;if(typeof x==='number'){if(!Number.isFinite(x))throw Error('Некорректное число в профиле');return x}if(typeof x==='string'){if(x.length>2000)throw Error('Слишком длинный текст профиля');return x}if(Array.isArray(x)){if(x.length>100)throw Error('Слишком большой список в профиле');return x.map(a=>safeProfile(a,depth+1))}if(typeof x==='object'){const out={};for(const [k,v] of Object.entries(x)){if(['__proto__','constructor','prototype'].includes(k))throw Error('Недопустимый ключ');out[k]=safeProfile(v,depth+1)}return out}throw Error('Неподдерживаемое значение профиля')}
function validateTypes(arr,kind){if(!Array.isArray(arr)||arr.length>30)throw Error('Можно добавить до 30 новых объектов каждого типа');const ids=new Set();return arr.map(a=>{if(!a||!validText(a.id,50)||!/^[a-zA-Z0-9_-]+$/.test(a.id)||ids.has(a.id)||!validText(a.name,70)||!validText(a.description,160)||![a.color,a.accent].every(c=>typeof c==='string'&&/^#[0-9a-f]{6}$/i.test(c)))throw Error('Проверьте ID, название, описание и цвета #RRGGBB');ids.add(a.id);if(a.image!==undefined&&!imageOK(a.image))throw Error('Нужна встроенная картинка PNG, JPEG или WebP');let extra={};if(a.image)extra.image=a.image;if(kind==='fish'&&a.spriteWidth!==undefined){if(!validNum(a.spriteWidth,1,5))throw Error('Некорректные пропорции спрайта');extra.spriteWidth=a.spriteWidth;}if(kind==='fish'&&a.colorVariants!==undefined)extra.colorVariants=validateColorVariants(a.colorVariants);if(a.profile!==undefined){if(!a.profile||typeof a.profile!=='object'||Array.isArray(a.profile)||JSON.stringify(a.profile).length>25000)throw Error('Профиль должен быть объектом до 25 КБ');extra.profile=safeProfile(a.profile)}
 if(kind==='fish'){if(!['neon','guppy','angel','gold','cichlid'].includes(a.shape)||!validNum(a.size,10,90)||!validNum(a.speed,10,100)||!['peaceful','predator'].includes(a.temperament)||!['top','middle','bottom'].includes(a.zone)||typeof a.school!=='boolean')throw Error('Некорректные параметры вида');if(a.behavior!==undefined){if(!a.behavior||!['ambush','pursuit','school','roam','territorial'].includes(a.behavior.type))throw Error('Неизвестная модель поведения');extra.behavior=safeProfile(a.behavior)}const result={id:a.id,name:a.name,description:a.description,shape:a.shape,color:a.color,accent:a.accent,size:a.size,speed:a.speed,temperament:a.temperament,zone:a.zone,school:a.school,...extra};huntingRules(result);if(result.profile?.sizeAndGrowth?.spawnLengthMinCm!==undefined||result.profile?.sizeAndGrowth?.spawnLengthMaxCm!==undefined)computeParams(result);return result}
 if(!['ribbon','fern','leaves','moss','wood','rocks','cave','ruins','coral','shell'].includes(a.shape)||!validNum(a.width,40,300)||!validNum(a.height,30,300))throw Error('Некорректные размеры или форма декора');return {id:a.id,name:a.name,description:a.description,shape:a.shape,color:a.color,accent:a.accent,width:a.width,height:a.height,...extra}})}
function mergeTypes(base,existing,custom){if(custom.some(a=>base.some(b=>a.id===b.id)))throw Error('Новые ID не должны совпадать со встроенными');const map=new Map(existing.map(a=>[a.id,a]));custom.forEach(a=>map.set(a.id,a));return [...map.values()]}
function recoverMotionState(a,registry){
 if(!a||typeof a!=='object')return a;
 const type=registry.find(f=>f.id===a.type);if(!type)return a;
 const p=params(type),restored={...a};
 // JSON turned non-finite coordinates from the old zero-size bug into null.
 // Recover only local checkpoints; imported files retain strict validation.
 if(a.x===null)restored.x=validNum(a.homeX,.055,.945)?a.homeX:.5;
 if(a.y===null)restored.y=validNum(a.homeY,...p.band)?a.homeY:(p.band[0]+p.band[1])/2;
 if(a.depth===null)restored.depth=validNum(a.z,0,2)?Math.round(a.z):p.preferredDepths[0];
 if(a.stats&&typeof a.stats==='object'&&!Array.isArray(a.stats)){
  restored.stats={...a.stats};for(const key of Object.keys(restored.stats))if(restored.stats[key]===null)delete restored.stats[key];
 }
 return restored;
}
function loadData(data,{resume=false}={}){if(!data||![1,2].includes(data.version))throw Error('Поддерживаются версии 1 и 2');if(data.format==='quiet-water-content-pack'){const ff=validateTypes(data.fish??[],'fish'),dd=validateTypes(data.decor??[],'decor');if(!ff.length&&!dd.length)throw Error('Набор пуст');if(new Blob([JSON.stringify(data)]).size>2000000)throw Error('Набор должен быть меньше 2 МБ');const fish=mergeTypes(BASE_FISH,fishTypes,ff),decor=mergeTypes(BASE_DECOR,decorTypes,dd);if(fish.length>35||decor.length>40)throw Error('Достигнут лимит новых видов');fishTypes=fish;decorTypes=decor;schoolRoutes.clear();state?.fish.forEach(a=>{ensureTerritory(a);a.decision=0;a.timer=0});changed();return 'Набор загружен: '+ff.length+' видов рыб, '+dd.length+' украшений'}
 if(data.format!=='quiet-water-aquarium')throw Error('Неизвестный формат файла');const ff=mergeTypes(BASE_FISH,initialFishTypes(),validateTypes(data.customFish??[],'fish')),dd=mergeTypes(BASE_DECOR,copy(BASE_DECOR),validateTypes(data.customDecor??[],'decor')),s=data.scene;if(!s||!BACKGROUNDS.some(b=>b.id===s.bg)||typeof s.night!=='boolean'||!Array.isArray(s.fish)||s.fish.length>50||!Array.isArray(s.decor)||s.decor.length>40)throw Error('Некорректная композиция');const ids=new Set();function common(a){if(!a||!validText(a.id,90)||ids.has(a.id)||!validNum(a.x,0,1)||!validNum(a.y,0,1)||!Number.isInteger(a.depth)||a.depth<0||a.depth>2)throw Error('Некорректные координаты или глубина');ids.add(a.id)}
 const fish=s.fish.map(value=>{const a=resume?recoverMotionState(value,ff):value;common(a);if(!ff.some(f=>f.id===a.type))throw Error('Неизвестный вид рыбки');const f=fishInstance(a.type,clamp(a.x,.055,.945),clamp(a.y,.14,.81),ff);f.id=a.id;f.colorVariant=colorVariantId(ff.find(type=>type.id===a.type),a.colorVariant);f.z=f.zTarget=validNum(a.z,0,2)?a.z:a.depth;f.depth=a.depth;f.name=validText(a.name,50)?a.name:f.name;f.sex=['male','female'].includes(a.sex)?a.sex:f.sex;f.age=validNum(a.age,0,1e9)?a.age:f.age;f.length=validNum(a.length,.1,200)?a.length:f.length;f.growthScale=validNum(a.growthScale,.3,4)?a.growthScale:f.growthScale;f.baby=a.baby===true;f.stage=['fry','juvenile','adult'].includes(a.stage)?a.stage:f.stage;if(a.stats!==undefined){if(!a.stats||typeof a.stats!=='object'||Array.isArray(a.stats))throw Error('Некорректное состояние рыбки');for(const k of Object.keys(f.stats)){if(a.stats[k]!==undefined){if(!validNum(a.stats[k],0,100))throw Error('Статы должны быть от 0 до 100');f.stats[k]=a.stats[k]}}}else if(validNum(a.hunger,0,100))f.stats.satiety=a.hunger;
 if(a.traits&&typeof a.traits==='object')for(const k of Object.keys(f.traits))if(validNum(a.traits[k],0,1))f.traits[k]=a.traits[k];if(a.memory&&typeof a.memory==='object')for(const k of Object.keys(f.memory))if(validNum(a.memory[k],-100000,1e12))f.memory[k]=a.memory[k];if(Array.isArray(a.events))f.events=a.events.slice(0,5).filter(e=>validText(e.text,120)&&validNum(e.time,0,1e12)).map(e=>({text:e.text,time:e.time}));
 for(const k of ['homeX','homeY','targetX','targetY'])if(validNum(a[k],0,1))f[k]=a[k];
 if(validNum(a.zTarget,0,2))f.zTarget=a.zTarget;
 if(validNum(a.cooldown,0,120))f.cooldown=a.cooldown;
 if(validNum(a.actionTime,0,1e12))f.actionTime=a.actionTime;
 if(Object.hasOwn(ACTIONS,a.action))f.action=a.action;
 if(validText(a.goal,120))f.goal=a.goal;
 if(validText(a.shelter,90))f.shelter=a.shelter;
 if(a.territory!==undefined&&a.territory!==null){const t=a.territory;if(!t||typeof t!=='object'||Array.isArray(t)||!validNum(t.x,0,1)||!validNum(t.y,0,1)||!Number.isInteger(t.z)||!validNum(t.z,0,2)||!params(ff.find(type=>type.id===a.type)).allowedDepths.includes(t.z)||!validNum(t.radius,.03,.4)||(t.show!==undefined&&typeof t.show!=='boolean'))throw Error('Некорректная территория рыбки');if(params(ff.find(type=>type.id===a.type)).territoryEnabled)f.territory={x:clamp(t.x,.055,.945),y:clamp(t.y,...params(ff.find(type=>type.id===a.type)).band),z:t.z,radius:t.radius,show:t.show===true,centerKind:t.centerKind==='shelter'?'shelter':'point',anchor:validText(t.anchor,90)?t.anchor:null}}
 else if(f.territory){f.territory.x=clamp(f.homeX,.055,.945);f.territory.y=clamp(f.homeY,...params(ff.find(type=>type.id===a.type)).band);f.territory.z=preferredSavedDepth(f,params(ff.find(type=>type.id===a.type)))}
 f.returnToTerritory=a.returnToTerritory===true&&!!f.territory;
 f.prey=null;f.pursuit=null;f.pursuitTime=0;f.huntTrip=null;f.huntRestUntil=0;if(f.territory&&['search','stalk','attack','chase'].includes(f.action))f.returnToTerritory=true;
 f.resting=a.resting===true&&f.stats.energy<78;
 for(const k of ['fearUntil','hideUntil','hideCooldown'])if(validNum(a[k],0,1e12))f[k]=Math.min(a[k],(validNum(s.clock,0,1e12)?s.clock:0)+(k==='hideCooldown'?90:15));
 f.routeX=f.x;f.routeY=f.y;f.routeClock=0;f.timer=0;f.decision=0;
 return f});
  const decor=s.decor.map(a=>{common(a);if(!dd.some(d=>d.id===a.type)||!validNum(a.size,.5,1.7)||![-1,1].includes(a.flip))throw Error('Некорректные параметры оформления');return {id:a.id,type:a.type,x:clamp(a.x,.02,.98),y:clamp(a.y,.45,.98),depth:a.depth,size:a.size,flip:a.flip,angle:validNum(a.angle,-50,50)?a.angle:0,order:validNum(a.order,-10000,10000)?a.order:0,locked:a.locked===true}});
 const lamps=s.lamps===undefined?[lampInstance(s.night?'moon':'day')]:s.lamps.map(l=>{if(!l||!LAMPS.some(a=>a.id===l.id)||!/^#[0-9a-f]{6}$/i.test(l.color)||!validNum(l.x,.05,.95)||!validNum(l.brightness,0,100)||!validNum(l.radius,.15,.95)||!validNum(l.angle,-40,40)||!validNum(l.softness,0,100)||!validNum(l.filter,0,100)||(l.size!==undefined&&!validNum(l.size,25,250))||(l.rayVisibility!==undefined&&!validNum(l.rayVisibility,0,100))||(l.raysVisible!==undefined&&typeof l.raysVisible!=='boolean'))throw Error('Некорректные параметры лампы');return {...lampInstance(l.id,l.x),color:l.color,brightness:l.brightness,radius:l.radius,angle:l.angle,softness:l.softness,filter:l.filter,enabled:l.enabled!==false,body:l.body===true,size:l.size??100,raysVisible:l.raysVisible!==false,rayVisibility:l.rayVisibility??55}});if(lamps.length<1||lamps.length>3)throw Error('Нужно от 1 до 3 ламп');
 const env=s.environment||{},scene={
 lightCycle:s.lightCycle==='manual'?'manual':'auto',timeOfDay:validNum(s.timeOfDay,0,LIFE_DAY-.000001)?s.timeOfDay:localDaySeconds(),
 lightsOn:Number.isInteger(s.lightsOn)&&validNum(s.lightsOn,0,23)?s.lightsOn:8,
 lightsOff:Number.isInteger(s.lightsOff)&&validNum(s.lightsOff,0,23)?s.lightsOff:20,bg:s.bg,night:s.night,fish,decor,lamps,mode:s.mode==='natural'?'natural':'calm',speed:[1,3,6].includes(s.speed)?s.speed:1,breeding:s.breeding===true,filterColor:typeof s.filterColor==='string'&&/^#[0-9a-f]{6}$/i.test(s.filterColor)?s.filterColor:'#99c7d1',filterStrength:validNum(s.filterStrength,0,100)?s.filterStrength:0,favorites:Array.isArray(s.favorites)?s.favorites.filter(v=>typeof v==='string'&&v.length<70).slice(0,80):[],environment:{temperature:validNum(env.temperature,14,30)?env.temperature:24,current:validNum(env.current,0,1)?env.current:.25,clarity:validNum(env.clarity,.2,1)?env.clarity:.9},clock:validNum(s.clock,0,1e12)?s.clock:0};if(scene.lightsOn===scene.lightsOff)scene.lightsOff=(scene.lightsOn+12)%24;fishTypes=ff;decorTypes=dd;state=scene;schoolRoutes.clear();senseCache=new WeakMap();syncLightCycle();dirtySave=true;invalidateRender();simTime=scene.clock;restoreLife(data.life,resume);activeLamp=0;selected=null;stopEdit();undoStack=[];redoStack=[];if(loaded){stopAnimation();if(!paused&&!document.hidden)startAnimation();else requestRender()}return data.version===1?'Прежнее сохранение обновлено для версии 1.0':'Аквариум загружен'}
function installDemo(i){try{const s=loadData(DEMO_PACKS[i]);toast(s);renderPage()}catch(e){toast(e.message)}}
async function importFile(file){if(!file)return;try{if(file.size>8000000)throw Error('Файл должен быть меньше 8 МБ');const data=await readContentFile(file);if(data.format==='quiet-water-content-pack'&&new Blob([JSON.stringify(data)]).size>2000000)throw Error('Набор должен быть меньше 2 МБ');const load=()=>{toast(loadData(data));persist();closeSheet()};if(data.format==='quiet-water-aquarium'&&data.scene?.mode==='natural'&&state.mode!=='natural')confirmRisk('Это сохранение использует естественный режим: хищники могут съесть подходящих по размеру рыбок. Загрузить?',()=>{try{load()}catch(e){toast(e.message)}});else load()}catch(e){toast('Не удалось загрузить: '+e.message)}finally{$('#fileInput').value=''}}
function getCompositions(){try{const x=JSON.parse(localStorage.getItem('quiet-water-compositions')||'[]');return Array.isArray(x)?x.slice(0,3):[]}catch(e){return []}}
function saveComposition(){const name=$('#compositionName').value.trim()||'Мой аквариум',list=getCompositions();const entry={name:name.slice(0,40),data:serialize()};const old=list.findIndex(x=>x.name===name);if(old>=0)list[old]=entry;else{list.unshift(entry);list.splice(3)}try{localStorage.setItem('quiet-water-compositions',JSON.stringify(list));renderCompositions();toast('Композиция сохранена')}catch(e){toast('Недостаточно места в браузере. Сохраните композицию в JSON.')}}
function renderCompositions(){const out=$('#compositions');out.replaceChildren();const list=getCompositions();if(!list.length){out.innerHTML='<p class="muted small">Можно сохранить до трёх композиций.</p>';return}for(const [i,a] of list.entries()){const row=document.createElement('div');row.className='listrow';const name=document.createElement('span');name.className='grow';name.textContent=a.name;row.append(name,button('Загрузить',()=>{const go=()=>{try{toast(loadData(a.data));changed();closeSheet()}catch(e){toast(e.message)}};if(a.data.scene?.mode==='natural')confirmRisk('Эта композиция использует естественный режим с риском для маленьких рыб. Загрузить?',go);else go()}),button('✕',()=>{list.splice(i,1);try{localStorage.setItem('quiet-water-compositions',JSON.stringify(list));renderCompositions()}catch(e){toast('Не удалось удалить композицию')}}));out.append(row)}}
function resetScene(){dirtySave=true;invalidateRender();fishBitmaps=new WeakMap();fishTypes=initialFishTypes();decorTypes=copy(BASE_DECOR);state=defaultState();schoolRoutes.clear();state.clock=0;simTime=0;restoreLife(null,false);selected=null;stopEdit();undoStack=[];redoStack=[];activeLamp=0;conditions=false;stopAnimation();persist(true);if(!document.hidden)startAnimation();closeSheet();toast('Стартовый аквариум восстановлен')}
on('#menuButton','click',()=>{editingMode=false;openPage('menu')});on('#closeSheet','click',closeSheet);on('#back','click',()=>{if(page==='editor'){closeSheet();return}if(page==='fish-choice'){fishChoice=null;openPage('fish');return}openPage('menu')});on('#fileInput','change',e=>importFile(e.target.files[0]));on('#riskCancel','click',()=>{riskCallback=null;$('#risk').close()});on('#riskApply','click',()=>{const fn=riskCallback;riskCallback=null;$('#risk').close();fn?.()});on('#risk','cancel',()=>riskCallback=null);on('#editApply','click',()=>territoryEdit?applyTerritoryEdit():applyEdit());on('#editCancel','click',stopEdit);on('#editParams','click',()=>openPage('editor'));on('#undo','click',()=>historyMove(false));on('#redo','click',()=>historyMove(true));
on('#sheet','click',e=>{if(e.target===$('#sheet')){const r=$('#sheet').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeSheet()}});
on('#sheet','cancel',e=>{e.preventDefault();closeSheet()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if($('#sheet').open||$('#risk').open)return;if(editingMode||territoryEdit)stopEdit();conditions=false;selected=null}if((e.ctrlKey||e.metaKey)&&e.key==='z'&&!['INPUT','SELECT'].includes(document.activeElement?.tagName)){e.preventDefault();historyMove(e.shiftKey)}});
state=defaultState();{
 const candidates=checkpointCandidates();let legacy=null,restored=false;
 try{legacy=localStorage.getItem('quiet-water-v1')}catch(e){}
 if(legacy&&!candidates.includes(legacy))candidates.push(legacy);
 for(const checkpoint of candidates){
  try{loadData(JSON.parse(checkpoint),{resume:true});restored=true;if(checkpoint===legacy)toast('Прежний аквариум перенесён в новую версию');break}catch(e){}
 }
 if(candidates.length&&!restored)toast('Сохранение не удалось восстановить. Открыт стартовый аквариум.');
}
for(let i=0;i<24;i++)bubbles.push({x:rnd(.03,.97),y:rnd(0,1),r:rnd(2,5),speed:rnd(.018,.045),seed:rnd(0,6)});
new ResizeObserver(resize).observe(canvas);resize();$('#loading').hidden=true;loaded=true;resumeWorld();window.addEventListener('pagehide',suspendWorld);window.addEventListener('pageshow',resumeWorld);document.addEventListener('visibilitychange',()=>{if(document.hidden)suspendWorld();else resumeWorld()});



window.AquariumLifecycle={
 suspend:suspendWorld,
 resume:resumeWorld,
 back(){if($('#risk').open){riskCallback=null;$('#risk').close();return true}if($('#sheet').open){closeSheet();return true}if(editingMode||territoryEdit){stopEdit();return true}if(conditions){conditions=false;requestRender();return true}return false}
};
