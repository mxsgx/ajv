{{# def.definitions }}
{{# def.setup:'uniqueItems' }}

var valid = true;

{{? $schema && it.opts.uniqueItems !== false }}
  if (data{{=$dataLvl}}.length > 1) {
    var i{{=$lvl}} = data{{=$dataLvl}}.length, j{{=$lvl}};
    outer:
    for (;i{{=$lvl}}--;) {
      for (j{{=$lvl}} = i{{=$lvl}}; j{{=$lvl}}--;) {
        if (equal(data{{=$dataLvl}}[i{{=$lvl}}], data{{=$dataLvl}}[j{{=$lvl}}])) {
          valid = false;
          break outer;
        }
      }
    }

    if (!valid) {{# def.error:'uniqueItems' }}
  }
{{?}}