NecroniaCalculator = {};
NecroniaCalculator.items = {};
NecroniaCalculator.items.weapons = {};
NC = NecroniaCalculator;

var newCharacter = {
  health: 150,
  mana: 5,
  capacity: 520.00,
  soulPoints: 100,
  barrier: 15,
  movementSpeed: 275,

  attack: {
    physical: 0,
    ice: 0,
    fire: 0,
    energy: 0,
    earth: 0,
    death: 0,
    holy: 0,
  },
  criticalChance: 7,
  dodgeChance: 5,
  armor: 0,
  defense: 0,

  level: 1,
  wizardry: 0,
  mashing: 10,
  slashing: 10,
  chopping: 10,
  rangery: 10,
  shielding: 10,
  chaos: 10,
  rage: 10,
  blacksmithing: 10,
  mining: 10,
  lumberjacking: 10,
  fishing: 10,

  physicalRes: 0,
  iceRes: 0,
  fireRes: 0,
  energyRes: 0,
  earthRes: 0,
  deathRes: 0,
  holyRes: 0,
  lifeDrainRes: 0,
  manaDrainRes: 0,
  venomRes: 0,

  hpPerSec: 0,
  manaPerSec: 0,

  eney: 1,
  vitoaa: 1,
  lupol: 1,
  vitoab: 1,
  aoni: 1,
  consumptionPoints: 1,

  vocation: null,
  stance: 'balanced',

  amulet:null,
  head:null,
  backpack:null,
  leftHand:null,
  chest:null,
  rightHand:null,
  ring:null,
  legs:null,
  gadget:null,
  boots:null,

  quiver:null,
  relicBag:null
}

var Character = jQuery.extend(true, {}, newCharacter); // clone newChracter, one for base values one for display/changes

var characterEquipmentPieces = ['amulet', 'head', 'backpack', 'leftHand', 'chest', 'rightHand', 'ring', 'legs', 'gadget', 'boots', 'quiver'];

var promotion = { 
  basehp:175,
  basemana:175
},
eney = {
  movementSpeed: 1
},
vitoaA = {
  hp: 3
},
lupol = {
  regeneration: 3
},
vitoaB = {
  mana: 2
},
aoni = {
  soul: 1
}

function checkifObjIsNotEmpty(obj){
  if(typeof obj === 'undefined' || !obj)
    return false
  else
    return true
}

function updateStats(){
  $('.health').text(String(Character.health));
  $('.mana').text(String(Character.mana));
  $('.cap').text(String(Character.capacity));
  $('.soul').text(String(Character.soulPoints));
  $('.movementSpeed').text(String(Character.movementSpeed));

  $('.level').text(String(Character.level));
  $('.wizardry').text(String(Character.wizardry));
  $('.mashing').text(String(Character.mashing));
  $('.slashing').text(String(Character.slashing));
  $('.chopping').text(String(Character.chopping));
  $('.rangery').text(String(Character.rangery));
  $('.shielding').text(String(Character.shielding));
  $('.chaos').text(String(Character.chaos));
  $('.rage').text(String(Character.rage));

  $('.attack').text(String(Character.attack.physical + Character.attack.ice + Character.attack.fire + Character.attack.energy + Character.attack.earth + Character.attack.death + Character.attack.holy));
  $('.armor').text(String(Character.armor));
  $('.defense').text(String(Character.defense));
  $('.chc').text(String(Character.criticalChance)+'%');
  $('.dodgec').text(String(Character.dodgeChance)+'%');

  $('.PhysicalRes').text(String(Character.physicalRes)+'%');
  $('.IceRes').text(String(Character.iceRes)+'%');
  $('.FireRes').text(String(Character.fireRes)+'%');
  $('.EnergyRes').text(String(Character.energyRes)+'%');
  $('.EarthRes').text(String(Character.earthRes)+'%');
  $('.DeathRes').text(String(Character.deathRes)+'%');
  $('.HolyRes').text(String(Character.holyRes)+'%');
  $('.LifeDrainRes').text(String(Character.lifeDrainRes)+'%');
  $('.ManaDrainRes').text(String(Character.manaDrainRes)+'%');
  $('.VenomRes').text(String(Character.venomRes)+'%');

  $('.HealthPerSec').text(String(Character.hpPerSec));
  $('.ManaPerSec').text(String(Character.manaPerSec));
}

function getVocationObject(name){
  for (var i = 0; i < NC.vocations.vocation.length; i++) {
    if(name == NC.vocations.vocation[i].name){
      vocation = NC.vocations.vocation[i];
      break;
    }
  };
  return vocation;
}

function setCharacterVocation(vocation){
  Character.vocation = vocation;
  recalculateStats();
  updateStats();
}

function setCharacterHealth(){
  Character.health = newCharacter.health;
  
  if(Character.vocation == "Warrior" || Character.vocation == "Ranger" || Character.vocation == "Mage"){
    Character.health = newCharacter.health + ((Character.level*parseInt(getVocationObject(Character.vocation).gainhp))-parseInt(getVocationObject(Character.vocation).gainhp)) + (Character.vitoaa * vitoaA.hp);
  }
  else{
    Character.health = promotion.basehp + ((Character.level*parseInt(getVocationObject(Character.vocation).gainhp))-parseInt(getVocationObject(Character.vocation).gainhp)) + (Character.vitoaa * vitoaA.hp);
  }

  //eq
  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]])){
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus.hp))
        Character.health += Character[characterEquipmentPieces[i]].bonus.hp
    }
  };

  //relic bag
  if(checkifObjIsNotEmpty(Character.relicBag)){
    for(i=0; Character.relicBag.length > i; i++){
      if(checkifObjIsNotEmpty(Character.relicBag[i].bonus) && checkifObjIsNotEmpty(Character.relicBag[i].bonus.hp)){
        Character.health += Character.relicBag[i].bonus.hp
      }
    }
  }

  updateStats();
}

function setCharacterMana(){
  Character.mana = newCharacter.mana;

  if(Character.vocation == "Warrior" || Character.vocation == "Ranger" || Character.vocation == "Mage"){
    Character.mana = newCharacter.mana + ((Character.level*parseInt(getVocationObject(Character.vocation).gainmana))-parseInt(getVocationObject(Character.vocation).gainmana)) + (Character.vitoab * vitoaB.mana);
  }
  else{
    Character.mana = promotion.basemana + ((Character.level*parseInt(getVocationObject(Character.vocation).gainmana))-parseInt(getVocationObject(Character.vocation).gainmana)) + (Character.vitoab * vitoaB.mana);
  }

  //eq
  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]])){
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus.mana))
        Character.mana += Character[characterEquipmentPieces[i]].bonus.mana
    }
  };

  //relic bag
  if(checkifObjIsNotEmpty(Character.relicBag)){
    for(i=0; Character.relicBag.length > i; i++){
      if(checkifObjIsNotEmpty(Character.relicBag[i].bonus) && checkifObjIsNotEmpty(Character.relicBag[i].bonus.mana)){
        Character.mana += Character.relicBag[i].bonus.mana
      }
    }
  }

  updateStats();
}

function setCharacterCap(){
  Character.capacity = newCharacter.capacity + ((Character.level*parseInt(getVocationObject(Character.vocation).gaincap))-parseInt(getVocationObject(Character.vocation).gaincap));
  updateStats();
}

function setCharacterSoul(){
  Character.soulPoints = newCharacter.soulPoints + (Character.aoni * aoni.soul);
  updateStats();
}

function setCharacterMovementSpeed(){
  Character.movementSpeed = newCharacter.movementSpeed;

  Character.movementSpeed = parseInt(getVocationObject(Character.vocation).basespeed) + (Character.eney * 1);

  //eq
  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]])){
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].movementSpeed))
        Character.movementSpeed += Character[characterEquipmentPieces[i]].movementSpeed
    }
  };

  //relic bag
  if(checkifObjIsNotEmpty(Character.relicBag)){
    for(i=0; Character.relicBag.length > i; i++){
      if(checkifObjIsNotEmpty(Character.relicBag[i].movementSpeed)){
        Character.movementSpeed += Character.relicBag[i].movementSpeed
      }
    }
  }

  updateStats();
}

function setCharacterAttack(){
  Character.attack.physical = newCharacter.attack.physical;
  Character.attack.ice = newCharacter.attack.ice;
  Character.attack.fire = newCharacter.attack.fire;
  Character.attack.energy = newCharacter.attack.energy;
  Character.attack.earth = newCharacter.attack.earth;
  Character.attack.death = newCharacter.attack.death;
  Character.attack.holy = newCharacter.attack.holy;

  //eq
  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]])){
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].attack))
        Character.attack.physical += Character[characterEquipmentPieces[i]].attack

      elementals = ['ice', 'fire', 'energy', 'earth', 'death', 'holy']
      //elementals
      for (var j = 0; j < elementals.length; j++) {
        if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].elementalattack) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].elementalattack[elementals[j]]))
          Character.attack[elementals[j]] += Character[characterEquipmentPieces[i]].elementalattack[elementals[j]]
      }
    }
  };

  //update tooltip
  $('.attack').parent().qtip('option', 'content.text', '<div class="physical">Physical: '+Character.attack.physical+'</div>'+ '<div class="ice">Ice: '+Character.attack.ice+'</div>'+ '<div class="fire">Fire: '+Character.attack.fire+'</div>'+ '<div class="energy">Energy: '+Character.attack.energy+'</div>'+ '<div class="earth">Earth: '+Character.attack.earth+'</div>'+ '<div class="death">Death: '+Character.attack.death+'</div>'+ '<div class="holy">Holy: '+Character.attack.holy+'</div>')

  updateStats();
}

function setCharacterArmor(){
  Character.armor = newCharacter.armor;

  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]))
      Character.armor += Character[characterEquipmentPieces[i]].armor
  };

  updateStats();
}

function setCharacterDefense(){
  Character.defense = newCharacter.defense;

  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]))
      Character.defense += Character[characterEquipmentPieces[i]].defense
  };

  updateStats();
}

function setCharacterCriticalChance(){
  Character.criticalChance = newCharacter.criticalChance;

  //eq
  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]))
      Character.criticalChance += Character[characterEquipmentPieces[i]].crit
  };

  //relic bag
  if(checkifObjIsNotEmpty(Character.relicBag)){
    for(i=0; Character.relicBag.length > i; i++){
      if(checkifObjIsNotEmpty(Character.relicBag[i].bonus) && checkifObjIsNotEmpty(Character.relicBag[i].bonus.crit)){
        Character.criticalChance += Character.relicBag[i].bonus.crit
      }
    }
  }

  updateStats();
}

function setCharacterDodgeChance(){
  Character.dodgeChance = newCharacter.dodgeChance;

  //eq
  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]))
      Character.dodgeChance += Character[characterEquipmentPieces[i]].dodge
  };

  //relic bag
  if(checkifObjIsNotEmpty(Character.relicBag)){
    for(i=0; Character.relicBag.length > i; i++){
      if(checkifObjIsNotEmpty(Character.relicBag[i].bonus) && checkifObjIsNotEmpty(Character.relicBag[i].bonus.dodge)){
        Character.dodgeChance += Character.relicBag[i].bonus.dodge
      }
    }
  }

  updateStats();
}

function setCharacterPhysicalRes(){
  Character.physicalRes = newCharacter.physicalRes;

  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists))
    {
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists.physical))
      {
        Character.physicalRes += Character[characterEquipmentPieces[i]].resists.physical
      }
    }
  }
  updateStats();
}

function setCharacterIceRes(){
  Character.iceRes = newCharacter.iceRes;

  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists))
    {
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists.ice))
      {
        Character.iceRes += Character[characterEquipmentPieces[i]].resists.ice
      }
    }
  }
  updateStats();
}

function setCharacterFireRes(){
  Character.fireRes = newCharacter.fireRes;

  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists))
    {
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists.fire))
      {
        Character.fireRes += Character[characterEquipmentPieces[i]].resists.fire
      }
    }
  }
  updateStats();
}

function setCharacterEnergyRes(){
  Character.energyRes = newCharacter.energyRes;

  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists))
    {
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists.energy))
      {
        Character.energyRes += Character[characterEquipmentPieces[i]].resists.energy
      }
    }
  }
  updateStats();
}

function setCharacterEarthRes(){
  Character.earthRes = newCharacter.earthRes;

  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists))
    {
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists.earth))
      {
        Character.earthRes += Character[characterEquipmentPieces[i]].resists.earth
      }
    }
  }
  updateStats();
}

function setCharacterDeathRes(){
  Character.deathRes = newCharacter.deathRes;

  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists))
    {
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists.death))
      {
        Character.deathRes += Character[characterEquipmentPieces[i]].resists.death
      }
    }
  }
  updateStats();
}

function setCharacterHolyRes(){
  Character.holyRes = newCharacter.holyRes;

  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists))
    {
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists.holy))
      {
        Character.holyRes += Character[characterEquipmentPieces[i]].resists.holy
      }
    }
  }
  updateStats();
}

function setCharacterLifeDrainRes(){
  Character.lifeDrainRes = newCharacter.lifeDrainRes;

  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists))
    {
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists.lifeDrain))
      {
        Character.lifeDrainRes += Character[characterEquipmentPieces[i]].resists.life
      }
    }
  }
  updateStats();
}

function setCharacterManaDrainRes(){
  Character.manaDrainRes = newCharacter.manaDrainRes;

  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists))
    {
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists.manadrain))
      {
        Character.manaDrainRes += Character[characterEquipmentPieces[i]].resists.manadrain
      }
    }
  }
  updateStats();
}

function setCharacterVenomRes(){
  Character.venomRes = newCharacter.venomRes;

  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists))
    {
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists.venom))
      {
        Character.venomRes += Character[characterEquipmentPieces[i]].resists.venom
      }
    }
  }
  updateStats();
}
 
function setCharacterLevel(){
  Character.level = parseInt($('.skill-level').val());
  updateStats();
}

function setCharacterWizardry(){
  Character.wizardry = newCharacter.wizardry;

  Character.wizardry = parseInt($('.skill-wizardry').val());

  //eq
  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]])){
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus.wizardry))
        Character.wizardry += Character[characterEquipmentPieces[i]].bonus.wizardry
    }
  };

  //relic bag
  if(checkifObjIsNotEmpty(Character.relicBag)){
    for(i=0; Character.relicBag.length > i; i++){
      if(checkifObjIsNotEmpty(Character.relicBag[i].bonus) && checkifObjIsNotEmpty(Character.relicBag[i].bonus.wizardry)){
        Character.wizardry += Character.relicBag[i].bonus.wizardry
      }
    }
  }

  updateStats();
}

function setCharacterMashing(){
  Character.mashing = newCharacter.mashing;

  Character.mashing = parseInt($('.skill-mashing').val());

  //eq
  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]])){
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus.mashing))
        Character.mashing += Character[characterEquipmentPieces[i]].bonus.mashing
    }
  };

  //relic bag
  if(checkifObjIsNotEmpty(Character.relicBag)){
    for(i=0; Character.relicBag.length > i; i++){
      if(checkifObjIsNotEmpty(Character.relicBag[i].bonus) && checkifObjIsNotEmpty(Character.relicBag[i].bonus.mashing)){
        Character.mashing += Character.relicBag[i].bonus.mashing
      }
    }
  }

  updateStats();
}

function setCharacterSlashing(){
  Character.slashing = newCharacter.slashing;

  Character.slashing = parseInt($('.skill-slashing').val());

  //eq
  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]])){
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus.slashing))
        Character.slashing += Character[characterEquipmentPieces[i]].bonus.slashing
    }
  };

  //relic bag
  if(checkifObjIsNotEmpty(Character.relicBag)){
    for(i=0; Character.relicBag.length > i; i++){
      if(checkifObjIsNotEmpty(Character.relicBag[i].bonus) && checkifObjIsNotEmpty(Character.relicBag[i].bonus.slashing)){
        Character.slashing += Character.relicBag[i].bonus.slashing
      }
    }
  }

  updateStats();
}

function setCharacterChopping(){
  Character.chopping = newCharacter.chopping;

  Character.chopping = parseInt($('.skill-chopping').val());

  //eq
  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]])){
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus.chopping))
        Character.chopping += Character[characterEquipmentPieces[i]].bonus.chopping
    }
  };

  //relic bag
  if(checkifObjIsNotEmpty(Character.relicBag)){
    for(i=0; Character.relicBag.length > i; i++){
      if(checkifObjIsNotEmpty(Character.relicBag[i].bonus) && checkifObjIsNotEmpty(Character.relicBag[i].bonus.chopping)){
        Character.chopping += Character.relicBag[i].bonus.chopping
      }
    }
  }

  updateStats();
}

function setCharacterRangery(){
  Character.rangery = newCharacter.rangery;

  Character.rangery = parseInt($('.skill-rangery').val());

  //eq
  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]])){
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus.rangery))
        Character.rangery += Character[characterEquipmentPieces[i]].bonus.rangery
    }
  };

  //relic bag
  if(checkifObjIsNotEmpty(Character.relicBag)){
    for(i=0; Character.relicBag.length > i; i++){
      if(checkifObjIsNotEmpty(Character.relicBag[i].bonus) && checkifObjIsNotEmpty(Character.relicBag[i].bonus.rangery)){
        Character.rangery += Character.relicBag[i].bonus.rangery
      }
    }
  }

  updateStats();
}

function setCharacterShielding(){
  Character.shielding = newCharacter.shielding;

  Character.shielding = parseInt($('.skill-shielding').val());

  //eq
  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]])){
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus.shielding))
        Character.shielding += Character[characterEquipmentPieces[i]].bonus.shielding
    }
  };

  //relic bag
  if(checkifObjIsNotEmpty(Character.relicBag)){
    for(i=0; Character.relicBag.length > i; i++){
      if(checkifObjIsNotEmpty(Character.relicBag[i].bonus) && checkifObjIsNotEmpty(Character.relicBag[i].bonus.shielding)){
        Character.shielding += Character.relicBag[i].bonus.shielding
      }
    }
  }

  updateStats();
}

function setCharacterChaos(){
  Character.chaos = newCharacter.chaos;

  Character.chaos = parseInt($('.skill-chaos').val());

  //eq
  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]])){
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus.chaos))
        Character.chaos += Character[characterEquipmentPieces[i]].bonus.chaos
    }
  };

  //relic bag
  if(checkifObjIsNotEmpty(Character.relicBag)){
    for(i=0; Character.relicBag.length > i; i++){
      if(checkifObjIsNotEmpty(Character.relicBag[i].bonus) && checkifObjIsNotEmpty(Character.relicBag[i].bonus.chaos)){
        Character.chaos += Character.relicBag[i].bonus.chaos
      }
    }
  }

  updateStats();
}

function setCharacterRage(){
  Character.rage = newCharacter.rage;

  Character.rage = parseInt($('.skill-rage').val());

  //eq
  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]])){
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus.rage))
        Character.rage += Character[characterEquipmentPieces[i]].bonus.rage
    }
  };

  //relic bag
  if(checkifObjIsNotEmpty(Character.relicBag)){
    for(i=0; Character.relicBag.length > i; i++){
      if(checkifObjIsNotEmpty(Character.relicBag[i].bonus) && checkifObjIsNotEmpty(Character.relicBag[i].bonus.rage)){
        Character.rage += Character.relicBag[i].bonus.rage
      }
    }
  }

  updateStats();
}

function setCharacterConsumptionPoints(){
  Character.consumptionPoints = newCharacter.consumptionPoints;

  Character.consumptionPoints = 5 + (Character.level * 1) - Character.eney - Character.vitoaa - Character.lupol - Character.vitoab - Character.aoni;
}

function setCharacterEney(){
  Character.eney = parseInt($('.skill-eney').val());
  recalculateStats();
  updateStats();
}

function setCharacterVitoaA(){
  Character.vitoaa = parseInt($('.skill-vitoa.a').val());
  recalculateStats();
  updateStats();
}

function setCharacterLupol(){
  Character.lupol = parseInt($('.skill-lupol').val());
  recalculateStats();
  updateStats();
}

function setCharacterVitoaB(){
  Character.vitoab = parseInt($('.skill-vitoa.b').val());
  recalculateStats();
  updateStats();
}

function setCharacterAoni(){
  Character.aoni = parseInt($('.skill-aoni').val());
  recalculateStats();
  updateStats();
}

function setCharacterHpPerSec(){
  Character.hpPerSec = newCharacter.hpPerSec;

  //eq
  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus))
    {
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus.hpPerSec))
      {
        Character.hpPerSec += Character[characterEquipmentPieces[i]].bonus.hpPerSec
      }
    }
  }

  //relic bag
  if(checkifObjIsNotEmpty(Character.relicBag)){
    for(i=0; Character.relicBag.length > i; i++){
      if(checkifObjIsNotEmpty(Character.relicBag[i].bonus) && checkifObjIsNotEmpty(Character.relicBag[i].bonus.hpPerSec)){
        Character.hpPerSec += Character.relicBag[i].bonus.hpPerSec
      }
    }
  }

  updateStats();
}

function setCharacterManaPerSec(){
  Character.manaPerSec = newCharacter.manaPerSec;

  //eq
  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus))
    {
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].bonus.manaPerSec))
      {
        Character.manaPerSec += Character[characterEquipmentPieces[i]].bonus.manaPerSec
      }
    }
  }

  //relic bag
  if(checkifObjIsNotEmpty(Character.relicBag)){
    for(i=0; Character.relicBag.length > i; i++){
      if(checkifObjIsNotEmpty(Character.relicBag[i].bonus) && checkifObjIsNotEmpty(Character.relicBag[i].bonus.manaPerSec)){
        Character.manaPerSec += Character.relicBag[i].bonus.manaPerSec
      }
    }
  }

  updateStats();
}

function recalculateStats(){
  setCharacterHealth();
  setCharacterMana();
  setCharacterCap();
  setCharacterSoul();
  setCharacterMovementSpeed();

  setCharacterLevel();
  setCharacterWizardry();
  setCharacterMashing();
  setCharacterSlashing();
  setCharacterChopping();
  setCharacterRangery();
  setCharacterShielding();
  setCharacterChaos();
  setCharacterRage();

  setCharacterAttack();
  setCharacterArmor();
  setCharacterDefense();
  setCharacterCriticalChance();
  setCharacterDodgeChance();

  setCharacterPhysicalRes();
  setCharacterIceRes();
  setCharacterFireRes();
  setCharacterEnergyRes();
  setCharacterEarthRes();
  setCharacterDeathRes();
  setCharacterHolyRes();
  setCharacterLifeDrainRes();
  setCharacterManaDrainRes();
  setCharacterVenomRes();

  setCharacterConsumptionPoints();

  setCharacterHpPerSec();
  setCharacterManaPerSec();
}

function resetAllStats(){
  //do zrobienia
  Character = jQuery.extend(true, {}, newCharacter);
  updateStats();
}