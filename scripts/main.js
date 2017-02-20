NecroniaCalculator = {};
NecroniaCalculator.items = {};
NecroniaCalculator.items.weapons = {};
NC = NecroniaCalculator;

var newCharacter = {
  level: 1,
  health: 150,
  mana: 5,
  capacity: 520.00,
  soulPoints: 100,
  barrier: 15,
  movementSpeed: 275,
  criticalChance: 7,
  dodgeChance: 5,
  armor: 0,
  defense: 0,
  physicalRes: 0,
  coldRes: 0,
  fireRes: 0,
  energyRes: 0,
  earthRes: 0,
  deathRes: 0,
  holyRes: 0,
  lifeDrainRes: 0,
  eney: 1,
  vitoaa: 1,
  lupol: 1,
  vitoab: 1,
  aoni: 1,
  consumptionPoints: 1,
  vocation: null,
  amulet:null,
  head:null,
  backpack:null,
  leftHand:null,
  chest:null,
  rightHand:null,
  ring:null,
  legs:null,
  gadget:null,
  boots:null
}

var characterEquipmentPieces = ['amulet', 'head', 'backpack', 'leftHand', 'chest', 'rightHand', 'ring', 'legs', 'gadget', 'boots'];

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

var Character = jQuery.extend(true, {}, newCharacter); // clone newChracter, one for base values one for display/changes

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

  $('.armor').text(String(Character.armor));
  $('.defense').text(String(Character.defense));
  $('.chc').text(String(Character.criticalChance)+'%');
  $('.dodgec').text(String(Character.dodgeChance)+'%');

  $('.PhysicalRes').text(String(Character.physicalRes)+'%');
  $('.ColdRes').text(String(Character.coldRes)+'%');
  $('.FireRes').text(String(Character.fireRes)+'%');
  $('.EnergyRes').text(String(Character.energyRes)+'%');
  $('.EarthRes').text(String(Character.earthRes)+'%');
  $('.DeathRes').text(String(Character.deathRes)+'%');
  $('.HolyRes').text(String(Character.holyRes)+'%');
  $('.LifeDrainRes').text(String(Character.lifeDrainRes)+'%');
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
  updateStats();
}

function setCharacterMana(){
  if(Character.vocation == "Warrior" || Character.vocation == "Ranger" || Character.vocation == "Mage"){
    Character.mana = newCharacter.mana + ((Character.level*parseInt(getVocationObject(Character.vocation).gainmana))-parseInt(getVocationObject(Character.vocation).gainmana)) + (Character.vitoab * vitoaB.mana);
  }
  else{
    Character.mana = promotion.basemana + ((Character.level*parseInt(getVocationObject(Character.vocation).gainmana))-parseInt(getVocationObject(Character.vocation).gainmana)) + (Character.vitoab * vitoaB.mana);
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
  Character.movementSpeed = parseInt(getVocationObject(Character.vocation).basespeed) + (Character.eney * aoni.soul);
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

  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]))
      Character.criticalChance += Character[characterEquipmentPieces[i]].crit
  };

  updateStats();
}

function setCharacterDodgeChance(){
  Character.dodgeChance = newCharacter.dodgeChance;

  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]))
      Character.dodgeChance += Character[characterEquipmentPieces[i]].dodge
  };

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

function setCharacterColdRes(){
  Character.coldRes = newCharacter.coldRes;

  for (var i = 0; i < characterEquipmentPieces.length; i++) {
    if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]]) && checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists))
    {
      if(checkifObjIsNotEmpty(Character[characterEquipmentPieces[i]].resists.cold))
      {
        Character.coldRes += Character[characterEquipmentPieces[i]].resists.cold
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
        Character.lifeDrainRes += Character[characterEquipmentPieces[i]].resists.lifeDrain
      }
    }
  }
  updateStats();
}

 
function onLevelChange(){
  Character.level = parseInt($('.level').val());
  setCharacterHealth();
  setCharacterMana();
  setCharacterCap();
}

function onEneyChange(){
  Character.eney = parseInt($('.eney').val());
  setCharacterMovementSpeed();
}

function onVitoaAChange(){
  Character.vitoaa = parseInt($('.vitoa.a').val());
  setCharacterHealth();
}

function onLupolChange(){
  //handle
}

function onVitoaBChange(){
  Character.vitoab = parseInt($('.vitoa.b').val());
  setCharacterMana();
}

function onAoniChange(){
  Character.aoni = parseInt($('.aoni').val());
  setCharacterSoul();
}

function recalculateStats(){
  setCharacterHealth();
  setCharacterMana();
  setCharacterCap();
  setCharacterSoul();
  setCharacterMovementSpeed();
  setCharacterArmor();
  setCharacterDefense();
  setCharacterCriticalChance();
  setCharacterDodgeChance();
  setCharacterPhysicalRes();
  setCharacterColdRes();
  setCharacterFireRes();
  setCharacterEnergyRes();
  setCharacterEarthRes();
  setCharacterDeathRes();
  setCharacterHolyRes();
  setCharacterLifeDrainRes();
}

function resetAllStats(){
  Character.level              = newCharacter.level;
  Character.health             = newCharacter.health;
  Character.mana               = newCharacter.mana;
  Character.capacity           = newCharacter.capacity;
  Character.soulPoints         = newCharacter.soulPoints;
  Character.barrier            = newCharacter.barrier;
  Character.movementSpeed      = newCharacter.movementSpeed;
  Character.criticalChance     = newCharacter.criticalChance;
  Character.dodgeChance        = newCharacter.dodgeChance;
  Character.armor              = newCharacter.armor;
  Character.physicalRes        = newCharacter.physicalRes;
  Character.coldRes            = newCharacter.coldRes;
  Character.fireRes            = newCharacter.fireRes;
  Character.energyRes          = newCharacter.energyRes;
  Character.earthRes           = newCharacter.earthRes;
  Character.deathRes           = newCharacter.deathRes;
  Character.holyRes            = newCharacter.holyRes;
  Character.lifeDrainRes       = newCharacter.lifeDrainRes;
  Character.eney               = newCharacter.eney;
  Character.vitoaa             = newCharacter.vitoaa;
  Character.lupol              = newCharacter.lupol;
  Character.vitoab             = newCharacter.vitoab;
  Character.aoni               = newCharacter.aoni;
  Character.consumptionPoints  = newCharacter.consumptionPoints;
  updateStats();
}