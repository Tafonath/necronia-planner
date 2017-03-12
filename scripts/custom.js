$( document ).ready(function() {

  $( "#tabs" ).tabs();

  function changeStance(stance){
    $('.char-stance').css('background', 'url(css/images/'+stance+'-stance.png)')
  }

  $("#stance-offensive, #stance-balanced, #stance-defensive").on("click", function (e) {
    changeStance($(this).data("slot"));
    Character.stance = $(this).data("slot");
  });

  function loadVocations(){
    for(i = 0; NC.vocations.vocation.length > i; i ++){
      $('#vocation').append('<option value="'+NC.vocations.vocation[i].name+'">'+NC.vocations.vocation[i].name+'</option>');
    }
  }

  function formatVocations (vocation) {
    if (!vocation.id) { return vocation.text; }
    var $vocation = $(
      '<span><img src="css/images/'+vocation.text+'_Icon.gif" class="vocation-img" /> ' + vocation.text + '</span>'
    );
    return $vocation;
  };

  function formatItems (item) {
    if (!item.id) { return item.text; }
    var $item = $(
      '<span><img src="css/images/'+item.text.replace(/ /g,"_")+'.gif" class="eq-item-dropdown" /> ' + item.text + '</span>'
    );
    return $item;
  };

  function checkIfCheckboxIsChecked(select){
    if($(select).is(':checked')) {
      return true;
    } 
    else {
      return false
    }
  }

  /////////////////////* Equipment tab */////////////////////////

  function loadItemsHelper(objName){
    if(objName == "Left Hand"){
      var groupNames = ['Axe Weapons', 'Clubs Weapons', 'Dagger Weapons', 'Distance Weapons', 'Fist Weapons', 'Magic Weapons', 'Sword Weapons'];
      var weapons = ['axes', 'clubs', 'daggers', 'distanceWeapons', 'fists' , 'magicWeapons', 'swords'];

      for(j=0; groupNames.length > j; j++){
        $('#eq-item').append('<optgroup label="'+groupNames[j]+'">');
        for (var i = 0; NC.items.weapons[weapons[j]].length > i;  i++) {
          if(checkIfCheckboxIsChecked("#eq-vocationItemsOnly"))
          {
            if(jQuery.inArray( Character.vocation, NC.items.weapons[weapons[j]][i].vocation) != -1 || NC.items.weapons[weapons[j]][i].vocation == null) // check if for your vocation
              $('#eq-item').append('<option value="'+NC.items.weapons[weapons[j]][i].name+'">'+NC.items.weapons[weapons[j]][i].name+'</option>');
            else
              continue;
          }
          else
          {
            $('#eq-item').append('<option value="'+NC.items.weapons[weapons[j]][i].name+'">'+NC.items.weapons[weapons[j]][i].name+'</option>');
          }
        };
        $('#eq-item').append('</optgroup>');
      }

    }
    else if(objName == "Right Hand"){
      var groupNames = ['Shields', 'Spellbooks'];
      var weapons = ['shields', 'spellbooks'];

      for(j=0; groupNames.length > j; j++){
        $('#eq-item').append('<optgroup label="'+groupNames[j]+'">');
        for (var i = 0; NC.items[weapons[j]].length > i;  i++) {
          if(checkIfCheckboxIsChecked("#eq-vocationItemsOnly"))
          {
            if(jQuery.inArray( Character.vocation, NC.items[weapons[j]][i].vocation) != -1 || NC.items[weapons[j]][i].vocation == null) // check if for your vocation
              $('#eq-item').append('<option value="'+NC.items[weapons[j]][i].name+'">'+NC.items[weapons[j]][i].name+'</option>');
            else
              continue;
          }
          else
          {
            $('#eq-item').append('<option value="'+NC.items[weapons[j]][i].name+'">'+NC.items[weapons[j]][i].name+'</option>');
          }
        };
        $('#eq-item').append('</optgroup>');
      }
    }
    else{
      for (var i = 0; NC.items[objName].length > i;  i++) {
        if(checkIfCheckboxIsChecked("#eq-vocationItemsOnly"))
        {
          if(jQuery.inArray( Character.vocation, NC.items[objName][i].vocation) != -1 || NC.items[objName][i].vocation == null) // check if for your vocation
            $('#eq-item').append('<option value="'+NC.items[objName][i].name+'">'+NC.items[objName][i].name+'</option>');
          else
            continue;
        }
        else
        {
          $('#eq-item').append('<option value="'+NC.items[objName][i].name+'">'+NC.items[objName][i].name+'</option>');
        }
      };
    }
  }

  function searchForItemInDB(category, item_name){
    if(category == "Left Hand")
    {
      categories = ['axes', 'clubs', 'daggers', 'distanceWeapons', 'fists' , 'magicWeapons', 'swords'];
      for(j=0; categories.length > j; j++)
      {
        for (var i = 0; NC.items.weapons[categories[j]].length > i;  i++) {
          if(NC.items.weapons[categories[j]][i].name == item_name)
            return NC.items.weapons[categories[j]][i]
        }
      }
    }
    else if(category == "Right Hand")
    {
      categories = ['shields', 'spellbooks'];
      for(j=0; categories.length > j; j++)
      {
        for (var i = 0; NC.items[categories[j]].length > i;  i++) {
          if(NC.items[categories[j]][i].name == item_name)
            return NC.items[categories[j]][i]
        }
      }
    }
    else{
      for (var i = 0; NC.items[category].length > i;  i++) {
        if(NC.items[category][i].name == item_name)
          return NC.items[category][i]
      }
    }
  }
  
  function addItemToCharacter(category, item_name)
  { 
    if(category == "Amulet")
    {
      category = "amulets";
      $(".slot-amulet").css("background", "url(./css/images/empty_slot.png) no-repeat");
      $(".slot-amulet").empty().append('<div></div>');
      $(".slot-amulet div").css("background", "url(./css/images/"+item_name.replace(/ /g,"_")+".gif) no-repeat").css("height", "32px").css("width", "32px");
      Character.amulet = searchForItemInDB(category, item_name);
      recalculateStats()
    }

    else if(category == "Head")
    {
      category = "helmets";
      $(".slot-head").css("background", "url(./css/images/empty_slot.png) no-repeat");
      $(".slot-head").empty().append('<div></div>');
      $(".slot-head div").css("background", "url(./css/images/"+item_name.replace(/ /g,"_")+".gif) no-repeat").css("height", "32px").css("width", "32px");
      Character.head = searchForItemInDB(category, item_name);
      recalculateStats()
    }

    else if(category == "Backpack")
    {
      category = "containers";
      $(".slot-backpack").css("background", "url(./css/images/empty_slot.png) no-repeat");
      $(".slot-backpack").empty().append('<div></div>');
      $(".slot-backpack div").css("background", "url(./css/images/"+item_name.replace(/ /g,"_")+".gif) no-repeat").css("height", "32px").css("width", "32px");
      Character.backpack = searchForItemInDB(category, item_name);
      recalculateStats()
    }

    else if(category == "Left Hand")
    {
      category = "Left Hand";
      $(".slot-left-hand").css("background", "url(./css/images/empty_slot.png) no-repeat");
      $(".slot-left-hand").empty().append('<div></div>');
      $(".slot-left-hand div").css("background", "url(./css/images/"+item_name.replace(/ /g,"_")+".gif) no-repeat").css("height", "32px").css("width", "32px");
      Character.leftHand = searchForItemInDB(category, item_name);
      recalculateStats()
    }

    else if(category == "Chest")
    {
      category = "armors";
      $(".slot-chest").css("background", "url(./css/images/empty_slot.png) no-repeat");
      $(".slot-chest").empty().append('<div></div>');
      $(".slot-chest div").css("background", "url(./css/images/"+item_name.replace(/ /g,"_")+".gif) no-repeat").css("height", "32px").css("width", "32px");
      Character.chest = searchForItemInDB(category, item_name);
      recalculateStats()
    }

    else if(category == "Right Hand")
    {
      category = "Right Hand";
      $(".slot-right-hand").css("background", "url(./css/images/empty_slot.png) no-repeat");
      $(".slot-right-hand").empty().append('<div></div>');
      $(".slot-right-hand div").css("background", "url(./css/images/"+item_name.replace(/ /g,"_")+".gif) no-repeat").css("height", "32px").css("width", "32px");
      Character.rightHand = searchForItemInDB(category, item_name);
      recalculateStats()
    }

    else if(category == "Ring")
    {
      category = "rings";
      $(".slot-ring").css("background", "url(./css/images/empty_slot.png) no-repeat");
      $(".slot-ring").empty().append('<div></div>');
      $(".slot-ring div").css("background", "url(./css/images/"+item_name.replace(/ /g,"_")+".gif) no-repeat").css("height", "32px").css("width", "32px");
      Character.ring = searchForItemInDB(category, item_name);
      recalculateStats()
    }

    else if(category == "Legs")
    {
      category = "legs";
      $(".slot-legs").css("background", "url(./css/images/empty_slot.png) no-repeat");
      $(".slot-legs").empty().append('<div></div>');
      $(".slot-legs div").css("background", "url(./css/images/"+item_name.replace(/ /g,"_")+".gif) no-repeat").css("height", "32px").css("width", "32px");
      Character.legs = searchForItemInDB(category, item_name);
      recalculateStats()
    }

    else if(category == "Gadget")
    {
    }

    else if(category == "Boots")
    {
      category = "boots";
      $(".slot-boots").css("background", "url(./css/images/empty_slot.png) no-repeat");
      $(".slot-boots").empty().append('<div></div>');
      $(".slot-boots div").css("background", "url(./css/images/"+item_name.replace(/ /g,"_")+".gif) no-repeat").css("height", "32px").css("width", "32px");
      Character.boots = searchForItemInDB(category, item_name);
      recalculateStats()
    }
    else if(category == "Quiver")
    {
      category = "ammunition";
      Character.quiver = searchForItemInDB(category, item_name);
      recalculateStats()
    }
  }

  function removeItemFromCharacter(category){
    if(category == "Amulet")
    {
      $(".slot-amulet").empty();
      $(".slot-amulet").css("background", "none");
      Character.amulet = null;
      recalculateStats()
    }

    else if(category == "Head")
    {
      $(".slot-head").empty();
      $(".slot-head").css("background", "none");
      Character.head = null;
      recalculateStats()
    }

    else if(category == "Backpack")
    {
      $(".slot-backpack").empty();
      $(".slot-backpack").css("background", "none");
      Character.backpack = null;
      recalculateStats()
    }

    else if(category == "Left Hand")
    {
      $(".slot-left-hand").empty();
      $(".slot-left-hand").css("background", "none");
      Character.leftHand = null;
      recalculateStats()
    }

    else if(category == "Chest")
    {
      $(".slot-chest").empty();
      $(".slot-chest").css("background", "none");
      Character.chest = null;
      recalculateStats()
    }

    else if(category == "Right Hand")
    {
      $(".slot-right-hand").empty();
      $(".slot-right-hand").css("background", "none");
      Character.rightHand = null;
      recalculateStats()
    }

    else if(category == "Ring")
    {
      $(".slot-ring").empty();
      $(".slot-ring").css("background", "none");
      Character.ring = null;
      recalculateStats()
    }

    else if(category == "Legs")
    {
      $(".slot-legs").empty();
      $(".slot-legs").css("background", "none");
      Character.legs = null;
      recalculateStats()
    }

    else if(category == "Gadget")
    {
      $(".slot-gadget").empty();
      $(".slot-gadget").css("background", "none");
      Character.gadget = null;
      recalculateStats()
    }

    else if(category == "Boots")
    {
      $(".slot-boots").empty();
      $(".slot-boots").css("background", "none");
      Character.boots = null;
      recalculateStats()
    }

    else if(category == "Quiver")
    {
      Character.quiver = null;
      recalculateStats()
    }
  }

  function loadItems(category){
    $("#eq-item").empty(); // erease previous list

    if(category == "Amulet"){
      loadItemsHelper("amulets");
      if(Character.amulet != null)
        $("#eq-item").val(Character.amulet.name).trigger("change");
    }

    else if(category == "Head"){
      loadItemsHelper("helmets");
      if(Character.head != null)
        $("#eq-item").val(Character.head.name).trigger("change");
    }

    else if(category == "Backpack"){
      loadItemsHelper("containers");
      if(Character.backpack != null)
        $("#eq-item").val(Character.backpack.name).trigger("change");
    }

    else if(category == "Left Hand"){
      loadItemsHelper("Left Hand");
      if(Character.leftHand != null)
        $("#eq-item").val(Character.leftHand.name).trigger("change");
    }

    else if(category == "Chest"){
      loadItemsHelper("armors");
      if(Character.chest != null)
        $("#eq-item").val(Character.chest.name).trigger("change");
    }

    else if(category == "Right Hand"){
      loadItemsHelper("Right Hand");
      if(Character.rightHand != null)
        $("#eq-item").val(Character.rightHand.name).trigger("change");
    }

    else if(category == "Ring"){
      loadItemsHelper("rings");
      if(Character.ring != null)
        $("#eq-item").val(Character.ring.name).trigger("change");
    }

    else if(category == "Legs"){
      loadItemsHelper("legs");
      if(Character.legs != null)
        $("#eq-item").val(Character.legs.name).trigger("change");
    }

    else if(category == "Gadget"){
      // handle
      if(Character.gadget != null)
        $("#eq-item").val(Character.gadget.name).trigger("change");
    }

    else if(category == "Boots"){
      loadItemsHelper("boots");
      if(Character.boots != null)
        $("#eq-item").val(Character.boots.name).trigger("change");
    }
  }

  //Vocation select
  $("#vocation").select2({
    placeholder: "Select vocation",
    templateResult: formatVocations,
    templateSelection: formatVocations,
    minimumResultsForSearch: Infinity
  });

  //Equipment item categroy select
  $("#eq-item-category").select2({
    placeholder: "Select category",
    minimumResultsForSearch: Infinity
  });

  //Equipment item select
  $("#eq-item").select2({
    placeholder: "Select item",
    templateResult: formatItems,
    templateSelection: formatItems,
    allowClear: true
  });

  //On vocation change
  $("#vocation").on("change", function (e) {
    setCharacterVocation($("#vocation option:selected").val())
    $('#eq-item-category').trigger("change");

    quiverWarning();
  });

  //On item category change
  $("#eq-item-category").on("change", function (e) {
   loadItems($("#eq-item-category option:selected").val());
   $('#eq-item').trigger("change");

   //highlight eq
   $( ".slot-amulet, .slot-head, .slot-backpack, .slot-left-hand, .slot-chest, .slot-right-hand, .slot-ring, .slot-legs, .slot-gadget, .slot-boots" ).css('box-shadow', 'none');
   for(i=0; 10> i; i++)
   {
    $('.char-eq div').each(function(){
      if($(this).data("slot") == $("#eq-item-category").val())
        $(this).css('box-shadow', '0 0 10px #1A92A1');
    });
   }
  });

  //On item category change
  $("#eq-item").on("change", function (e) {
    if($("#eq-item option:selected").val() != null){
      $('.selected_item_name').html($("#eq-item option:selected").val());
      $( ".eq-current-selected-item-image" ).css("background", "url(./css/images/"+ $("#eq-item option:selected").val().replace(/ /g,"_") +".gif) no-repeat");
      addItemToCharacter($("#eq-item-category option:selected").val(),$("#eq-item option:selected").val())
    }
    else{
      $('.selected_item_name').html("Empty Slot.");
      $( ".eq-current-selected-item-image" ).css("background", "none");
      removeItemFromCharacter($("#eq-item-category option:selected").val())
    }

  });

  //Vocation items only checkbox
  $('#eq-vocationItemsOnly').on('change', function(){
    $('#eq-item-category').trigger("change");
  });

  //Warningscheckbox
  $('#eq-showWarnings').on('change', function(){
    relicBagWarning();
    quiverWarning();
  });

  //On eq slot click
  $( ".slot-amulet, .slot-head, .slot-backpack, .slot-left-hand, .slot-chest, .slot-right-hand, .slot-ring, .slot-legs, .slot-gadget, .slot-boots" ).on('click', function() {
    //highlight eq
    $( ".slot-amulet, .slot-head, .slot-backpack, .slot-left-hand, .slot-chest, .slot-right-hand, .slot-ring, .slot-legs, .slot-gadget, .slot-boots" ).css('box-shadow', 'none');
    $(this).css('box-shadow', '0 0 10px #1A92A1');

    var name = $(this).data("slot");
    $("#eq-item-category").val(name).trigger("change")
  });

  ///////////////// * Quiver * ///////////////////
  $("#eq-item-ammunition").select2({
    placeholder: "Select item",
    templateResult: formatItems,
    templateSelection: formatItems,
    allowClear: true
  });

  function quiverWarning(){
    if(checkIfCheckboxIsChecked("#eq-showWarnings") && checkifObjIsNotEmpty(Character.quiver)){
      if(Character.vocation == "Ranger" || Character.vocation == "Marksman" || Character.vocation == "Hunter"){
        $('.warning-quiver').html("");
      }
      else{
        $('.warning-quiver').html("Your vocation doesn't use quiver.");
      }
    }
    else{
      $('.warning-quiver').html("");
    }
  }

  function loadQuiverItems(){
    for (var i = 0; NC.items.ammunition.length > i;  i++) {
      $('#eq-item-ammunition').append('<option value="'+NC.items.ammunition[i].name+'">'+NC.items.ammunition[i].name+'</option>');
    }

  }

  $('#eq-item-ammunition').on('change', function(){
    if($("#eq-item-ammunition option:selected").val() != null){
      addItemToCharacter("Quiver",$("#eq-item-ammunition option:selected").val())
    }
    else{
      removeItemFromCharacter("Quiver")
    }

    quiverWarning();
  });

  ///////////////// * Relic Bag * ///////////////////

  function relicBagWarning(){
    if(checkIfCheckboxIsChecked("#eq-showWarnings") && checkifObjIsNotEmpty(Character.relicBag)){
      if(Character.relicBag.length > (3 + Math.floor(Character.level/20))){
        $('.warning-relicBag').html("You can hold max " + (3 + Math.floor(Character.level/20)) + " relics");
      }
      else{
        $('.warning-relicBag').html("");
      }
    }
    else{
      $('.warning-relicBag').html("");
    }
  }

  function fillWithRelics(relicsArray){
    $('.np-middle-padding div:not(:last)').remove();
    for (var i = 0; i < relicsArray.length; i++) {
      $(".np-middle-padding div:last").before('<div class="relic-slot"></div>');
      $('.np-middle-padding div').eq(-2).css('background', 'url(css/images/'+relicsArray[i].secondaryImage+'.png) no-repeat')
    };
  }

  function loadRelics(obj){
    for (var i = 0; NC.items.relics.length > i;  i++) {
      obj.eq(-1).append('<option value="'+NC.items.relics[i].name+'">'+NC.items.relics[i].name+'</option>');
    }
  }

  function initializeSelect2(selectElementObj) {
    selectElementObj.select2({
      placeholder: "Select item",
      templateResult: formatItems,
      templateSelection: formatItems,
      allowClear: true
    });
  }

  // initialize all of them on page load (if theres any)
  // $(".select-to-select2").each(function() {
  //   initializeSelect2($(this));
  // });

  $('.add_relic').on('click', function(){
    $("#relic-bag-selectors div:last").before('<div><span class="remove_relic"></span><select class="eq-item-relic" style="width: 300px;"></select></div>');
    initializeSelect2($('#relic-bag-selectors div .eq-item-relic').eq(-1));
    loadRelics($('#relic-bag-selectors div .eq-item-relic').eq(-1));
    $('#relic-bag-selectors div .eq-item-relic').eq(-1).val("").trigger("change");
    relicBagWarning();
  });

  $(document).on('click', '.remove_relic', function(){
    $(this).parent().remove();

    if($('#relic-bag-selectors').children().length == 1){
      Character.relicBag = null;
      $('.np-middle-padding div:not(:last)').remove();
    }
    
    $('.eq-item-relic').trigger("change");
    recalculateStats();
  });

  $(document).on('change', '.eq-item-relic', function(){
    relics = [];

    $('.eq-item-relic').each(function(){
      if($(this).val()){
        relics.push(searchForItemInDB('relics',$(this).val()))
      }
    });

    if(relics.length > 0){
      Character.relicBag = relics;
      fillWithRelics(Character.relicBag);
    }

    recalculateStats();
    relicBagWarning();
  });

  jQuery.fn.ForceNumericOnly =
  function()
  {
      return this.each(function()
      {
          $(this).keydown(function(e)
          {
              var key = e.charCode || e.keyCode || 0;
              // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
              // home, end, period, and numpad decimal
              return (
                  key == 8 || 
                  key == 9 ||
                  key == 13 ||
                  key == 46 ||
                  key == 110 ||
                  key == 190 ||
                  (key >= 35 && key <= 40) ||
                  (key >= 48 && key <= 57) ||
                  (key >= 96 && key <= 105));
          });
      });
  };

  /////////////////////* Skills tab */////////////////////////

  function createSkillsHeader(name){
    text = "<h3 class='h3-header'>"+name+"</h3>"+
    "<span class='eq-warning warning-"+name+"'></span>"+
    "<ul id='skills-"+name+"'></ul>";
    $('#skills-tab').append(text);
  }

  function createNewSkill(name, min, max, val, appnedTo){
    text = '<li><span class="skills-'+name.toLowerCase()+'">'+name+'</span><input class="skills-input skill-'+name.toLowerCase()+'" min="'+min+'" max="'+max+'" value="'+val+'" type="number"></li>';
    appnedTo = "#skills-"+appnedTo;
    $(appnedTo).append(text);
  }

  function consumptionPointsLeft(){
    $('.warning-Utility').html('Consumption points left: ' + Character.consumptionPoints);
    if(Character.consumptionPoints >= 0){
      $('.warning-Utility').css('color', 'green');
    }
    else{
      $('.warning-Utility').css('color', 'red');
    }
  }

  createSkillsHeader("Core");
  createNewSkill("Level", 1, 999, 1, "Core");
  createNewSkill("Wizardry", 0, 999, 0, "Core");

  createSkillsHeader("Offense");
  createNewSkill("Mashing", 10, 999, 10, "Offense");
  createNewSkill("Slashing", 10, 999, 10, "Offense");
  createNewSkill("Chopping", 10, 999, 10, "Offense");
  createNewSkill("Rangery", 10, 999, 10, "Offense");
  createNewSkill("Shielding", 10, 999, 10, "Offense");
  createNewSkill("Chaos", 10, 999, 10, "Offense");
  createNewSkill("Rage", 10, 999, 10, "Offense");

  createSkillsHeader("Utility");
  createNewSkill("Eney", 1, 999, 1, "Utility");
  createNewSkill("Vitoa A", 1, 999, 1, "Utility");
  createNewSkill("Lupol", 1, 999, 1, "Utility");
  createNewSkill("Vitoa B", 1, 999, 1, "Utility");
  createNewSkill("Aoni", 1, 999, 1, "Utility");

  $(".skills-input").ForceNumericOnly();

  $( ".skill-level" ).change(function() {
    setCharacterLevel();
    recalculateStats();
    $('.np-middle-padding').trigger("change");
    consumptionPointsLeft();
  });

  $( ".skill-wizardry" ).change(function() {
    setCharacterWizardry();
  });

  $( ".skill-mashing" ).change(function() {
    setCharacterMashing();
  });

  $( ".skill-slashing" ).change(function() {
    setCharacterSlashing();
  });

  $( ".skill-chopping" ).change(function() {
    setCharacterChopping();
  });

  $( ".skill-rangery" ).change(function() {
    setCharacterRangery();
  });

  $( ".skill-shielding" ).change(function() {
    setCharacterShielding();
  });

  $( ".skill-chaos" ).change(function() {
    setCharacterChaos();
  });

  $( ".skill-rage" ).change(function() {
    setCharacterRage();
  });

  $( ".skill-eney" ).change(function() {
    setCharacterEney();
    consumptionPointsLeft();
  });

  $( ".skill-vitoa.a" ).change(function() {
    setCharacterVitoaA();
    consumptionPointsLeft();
  });

  $( ".skill-lupol" ).change(function() {
    setCharacterLupol();
    consumptionPointsLeft();
  });

  $( ".skill-vitoa.b" ).change(function() {
    setCharacterVitoaB();
    consumptionPointsLeft();
  });

  $( ".skill-aoni" ).change(function() {
    setCharacterAoni();
    consumptionPointsLeft();
  });

  $('.ui-sortable-handle').on('click', function(){
    $(this).next().slideToggle()
  });

  /* Tooltips */

  $('#stance-offensive').qtip({
    content: {
      text: "You attack at your full potential.<br>Fists,melee and ranged weapons have 10% more max. damage.<br>Mage spells have 10% more max. damage.<br>Reduces your total defense by 20%."
    },
    style: { classes: 'tooltip-necronia' },
    position: {
        target: 'mouse',
        adjust: { mouse: true }
    },
  })

  $('#stance-balanced').qtip({
    content: {
      text: "You pay attention both to damage output and survivability.<br>The max. damage of your spells, melee, and ranged weapons is regular.<br>Your defense is regular."
    },
    style: { classes: 'tooltip-necronia' },
    position: {
        target: 'mouse',
        adjust: { mouse: true }
    },
  })

  $('#stance-defensive').qtip({
    content: {
      text: "You focus on defending yourself, rather than dealing damage.<br>Fists, melee and ranged weapons max. damage reduced by 25%.<br>Mage spells deal 10% less total damage.<br>Increases your total defense by 35%.<br>Heavily reduces the damage taken from [Brute] spells.<br>(e.g. Stone Giant's [Heavy Rocksmash])"
    },
    style: { classes: 'tooltip-necronia' },
    position: {
        target: 'mouse',
        adjust: { mouse: true }
    },
  })

  $('#quiver-tooltip').qtip({
    content: {
      text: "Quiver is a containter for your<br>ammunition. Ammunition must be placed into the quiver<br>in order to be fired by your ranged weapon."
    },
    style: { classes: 'tooltip-necronia' },
    position: {
        target: 'mouse',
        adjust: { mouse: true }
    },
  })

  $('#rB-tooltip').qtip({
    content: {
      text: "Relics are ancient artifacts<br>that enchance character's performance.<br>They can be found all throughout<br> the world of Necronia.Place a relic into this relic<br> bag to obtain its bonuses.<br><br>A new slot is added to your relic bag<br> every 20 levels."
    },
    style: { classes: 'tooltip-necronia' },
    position: {
        target: 'mouse',
        adjust: { mouse: true }
    },
  })

  $('.skills-wizardry').qtip({
    content: {
      text: 'Known also as magic level.'
    },
    style: { classes: 'tooltip-necronia' },
    position: {
        target: 'mouse',
        adjust: { mouse: true }
    },
  })

  $('.skills-eney').qtip({
    content: {
        text: 'Each point in Eney gives:<br>+1 Movement Speed<br><br>Gives Bonuses to:<br>Things related to movement speed.<br>Things related to dodge chance.<br>Things related to stamina.<br>Stamina regeneration gained from eating food with the vitamin Eney.'
    },   
    style: { classes: 'tooltip-necronia' },
    position: {
        target: 'mouse',
        adjust: { mouse: true }
    },
  })

  $('.skills-vitoa.a').qtip({
    content: {
        text: 'Each point in VitoaA gives:<br>+3 HP<br><br>Gives Bonuses to:<br>Things related to HP and HP regen.<br>Things related to barrier.<br>Things related to stamina.<br>Health regeneration gained from eating food with the vitamin VitoaA.'
    },   
    style: { classes: 'tooltip-necronia' },
    position: {
        target: 'mouse',
        adjust: { mouse: true }
    },
  })

  $('.skills-lupol').qtip({
    content: {
        text: 'Each point in Lupol gives:<br>+3 seconds longer regeneration from any food you eat.<br><br>Gives Bonuses to:<br>Healing obtained from potions(+5 more for each point).<br>This bonus is capped depending on the potion.<br>Look at potions to find out what cap is.'
    },   
    style: { classes: 'tooltip-necronia' },
    position: {
        target: 'mouse',
        adjust: { mouse: true }
    },
  })

  $('.skills-vitoa.b').qtip({
    content: {
        text: 'Each point in VitoaB gives:<br>+2 Mana<br><br>Gives Bonuses to:<br>Things related to mana and mana regen.<br>Mana regeneration gained from eating food with the vitamin VitoaB.'
    },   
    style: { classes: 'tooltip-necronia' },
    position: {
        target: 'mouse',
        adjust: { mouse: true }
    },
  })

  $('.skills-aoni').qtip({
    content: {
        text: 'Each point in Aoni gives:<br>+1 Soul<br><br>Gives Bonuses to:<br>Things related to soul and soul regen.<br>Better gains from Soul Crystals.<br>Various soul-costing spells.<br>Soul regeneration gained from eating food with the vitamin Aoni.'
    },   
    style: { classes: 'tooltip-necronia' },
    position: {
        target: 'mouse',
        adjust: { mouse: true }
    },
  })

  $('.attack').parent().qtip({
    content: {
        text: '<div class="physical">Physical: '+Character.attack.physical+'</div>'+
              '<div class="ice">Ice: '+Character.attack.ice+'</div>'+
              '<div class="fire">Fire: '+Character.attack.fire+'</div>'+
              '<div class="energy">Energy: '+Character.attack.energy+'</div>'+
              '<div class="earth">Earth: '+Character.attack.earth+'</div>'+
              '<div class="death">Death: '+Character.attack.death+'</div>'+
              '<div class="holy">Holy: '+Character.attack.holy+'</div>'
    },   
    style: { classes: 'tooltip-necronia2' },
    position: {
        target: 'mouse',
        adjust: { mouse: true }
    },
  })

//init on page load
function initOnLoad(){
  loadVocations();
  $('#vocation').trigger("change");
  $('#eq-item-category').trigger("change");
  $('#eq-item').trigger("change");
  loadQuiverItems();
  $("#eq-item-ammunition").val("").trigger("change"); // force placeholder
  $("#eq-item").val("").trigger("change"); // force placeholder
  consumptionPointsLeft();
  recalculateStats();
}

initOnLoad()
});