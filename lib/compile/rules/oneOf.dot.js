{{# def.definitions }}
{{# def.setup:'oneOf' }}
{{# def.setupNextLevel }}


var errs{{=$lvl}} = validate.errors.length;
var validCount{{=$lvl}} = 0;

{{~ $schema:$sch:$i }}
  {{? $i }}
    {{ $closingBraces += '}'; }}
    if (validCount{{=$lvl}} < 2) {
  {{?}}

  {{
    $it.schema = $sch;
    $it.schemaPath = $schemaPath + '[' + $i + ']';
  }}

  var valid = ({{= it.validate($it) }})(data{{=$dataLvl}}, dataPath{{=$dataLvl}});
  if (valid) validCount{{=$lvl}}++;
{{~}}

{{= $closingBraces }}

var valid = validCount{{=$lvl}} == 1;

if (valid) validate.errors.length = errs{{=$lvl}};
else {{# def.error:'oneOf' }}