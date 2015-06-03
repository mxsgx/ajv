{{# def.definitions }}
{{# def.setup:'dependencies' }}
{{# def.setupNextLevel }}


{{
  var $schemaDeps = {}
    , $propertyDeps = {};

  for ($property in $schema) {
    var $sch = $schema[$property];
    var $deps = Array.isArray($sch) ? $propertyDeps : $schemaDeps;
    $deps[$property] = $sch;
  }
}}

var errs{{=$lvl}} = validate.errors.length;
var valid;


{{ for ($property in $propertyDeps) { }}
  if (data{{=$dataLvl}}.hasOwnProperty('{{= $property }}')) {
    {{ $deps = $propertyDeps[$property]; }}
    valid = {{~ $deps:$dep:$i }}{{?$i}} && {{?}}data{{=$dataLvl}}.hasOwnProperty('{{= $dep}}'){{~}};
    {{# def.checkError:'dependencies' }}
    {{# def.elseIfValid }}
  }
{{ } }}


{{ for ($property in $schemaDeps) { }}
  if (data{{=$dataLvl}}.hasOwnProperty('{{= $property }}')) {
    {{ 
      $it.schema = $schemaDeps[$property];
      $it.schemaPath = $schemaPath + '[\'' + it.escapeQuotes($property) + '\']';
    }}

    valid = ({{= it.validate($it) }})(data{{=$dataLvl}}, dataPath{{=$dataLvl}});
  }

  {{# def.ifValid }}
{{ } }}

{{? $breakOnError }}{{= $closingBraces }}{{?}}

valid = errs{{=$lvl}} == validate.errors.length;

{{# def.cleanUp }}