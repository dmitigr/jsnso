// -*- JavaScript -*-
// Copyright (C) 2020 Dmitry Igrishin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//    claim that you wrote the original software. If you use this software
//    in a product, an acknowledgment in the product documentation would be
//    appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//    misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.
//
// Dmitry Igrishin
// dmitigr@gmail.com

const nso = function() {
  const cmp_ = (lhs, rhs) =>
  {
    var result = 0;
    var lhsIdx = 0;
    var rhsIdx = 0;

    function getCmpObj__(str)
    {
      const num = parseInt(str);
      if (isNaN(num)) {
        const m = str.match(/(\D+)/);
        return m ? m[1] : '';
      } else
        return num;
    }

    function cmp__(lhs, rhs)
    {
      if (typeof (lhs) === 'number') {
        if (typeof (rhs) === 'number')
          return lhs < rhs ? -1 : (lhs > rhs ? 1 : 0);
        else
          return -1;
      } else if (typeof (rhs) !== 'number') {
        for (let i = 0; (i < lhs.length && i < rhs.length); ++i) {
          const lc = lhs.charCodeAt(i);
          const rc = rhs.charCodeAt(i);
          if (lc < rc)
            return -1;
          else if (lc > rc)
            return 1;
        }
        return lhs.length < rhs.length ? -1 : (lhs.length > rhs.length ? 1 : 0);
      } else
        return 1;
    }

    while ((lhsIdx != lhs.length || rhsIdx != rhs.length) && result == 0) {
      const lhsObj = getCmpObj__(lhs.substring(lhsIdx));
      const rhsObj = getCmpObj__(rhs.substring(rhsIdx));
      lhsIdx += lhsObj.toString().length;
      rhsIdx += rhsObj.toString().length;
      result = cmp__(lhsObj, rhsObj);
    }

    return result;
  }

  return {
    cmp : cmp_,
    less : (lhs, rhs) => { return cmp_(lhs, rhs) < 0; },
    lessOrEqual : (lhs, rhs) => { return cmp_(lhs, rhs) <= 0; },
    equal : (lhs, rhs) => { return cmp_(lhs, rhs) == 0; },
    notEqual : (lhs, rhs) => { return cmp_(lhs, rhs) != 0; },
    greaterOrEqual : (lhs, rhs) => { return cmp_(lhs, rhs) >= 0; },
    greater : (lhs, rhs) => { return cmp_(lhs, rhs) > 0; }
  };
}();
