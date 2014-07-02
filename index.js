'use strict';

var GROUP_NUMERICAL, GROUP_ALPHABETIC, GROUP_WHITE_SPACE,
    GROUP_COMBINING_DIACRITICAL_MARK, GROUP_TERMINAL_MARKER,
    GROUP_CLOSING_PUNCTUATION, GROUP_FINAL_PUNCTUATION,
    GROUP_WORD, GROUP_ASTRAL, EXPRESSION_TOKEN, EXPRESSION_WORD,
    EXPRESSION_MULTILINEBREAK, STRING_PIPE,
    EXPRESSION_ABBREVIATION_PREFIX, EXPRESSION_WORD_CHARACTER,
    EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE, EXPRESSION_ABBREVIATION_AFFIX,
    EXPRESSION_SENTENCE_END,
    EXPRESSION_INITIAL_WHITE_SPACE, EXPRESSION_WHITE_SPACE,
    GROUP_COMBINING_NONSPACING_MARK, parserPrototype,
    GROUP_LETTER_LOWER, EXPRESSION_FULL_STOP_SUFFIX_EXCEPTION,
    EXPRESSION_TERMINAL_MARKER_SUFFIX_EXCEPTION;

/**
 * Expose `expand`. Expands a list of Unicode code points and ranges to
 * be usable in a regex character class.
 *
 * “Borrowed” from XRegexp.
 *
 * @param {String} value
 * @return {String}
 * @api private
 */
function expand(value) {
    return value.replace(/\w{4}/g, '\\u$&');
}

/**
 * Expose `GROUP_NUMERICAL`. Unicode Number Range (Nd, Nl, and No).
 *
 * “Borrowed” from XRegexp.
 *
 * @global
 * @private
 * @constant
 */
GROUP_NUMERICAL = expand(
    /*
     * Nd: Number, Decimal Digit
     */
    '0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F' +
    '09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0B72-0B770BE6-0BF' +
    '20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F33' +
    '1040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-1819' +
    '1946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C49' +
    '1C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-' +
    '24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293248-324F' +
    '3251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9' +
    'A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19' +

    /*
     * Nl: Number, Letter
     */
    '16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF' +

    /*
     * No: Number, Other
     */
    '00B200B300B900BC-00BE09F4-09F90B72-0B770BF0-0BF20C78-0C7E0D70-0D75' +
    '0F2A-0F331369-137C17F0-17F919DA20702074-20792080-20892150-215F' +
    '21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293248-324F' +
    '3251-325F3280-328932B1-32BFA830-A835'
);

/**
 * Expose `GROUP_LETTER_LOWER`. Unicode Alphabetic category Ll (Letter,
 * lowercase).
 *
 * “Borrowed” from XRegexp.
 *
 * @global
 * @private
 * @constant
 */
GROUP_LETTER_LOWER = expand('0061-007A00B500DF-00F600F8-00FF010101030105' +
    '01070109010B010D010F01110113011501170119011B011D011F0121012301250127' +
    '0129012B012D012F01310133013501370138013A013C013E01400142014401460148' +
    '0149014B014D014F01510153015501570159015B015D015F01610163016501670169' +
    '016B016D016F0171017301750177017A017C017E-0180018301850188018C018D0192' +
    '01950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-' +
    '01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E5' +
    '01E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209' +
    '020B020D020F02110213021502170219021B021D021F02210223022502270229022B' +
    '022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-' +
    '02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD' +
    '03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F0461' +
    '0463046504670469046B046D046F04710473047504770479047B047D047F0481048B' +
    '048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD' +
    '04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF' +
    '04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F1' +
    '04F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513' +
    '051505170519051B051D051F05210523052505270561-05871D00-1D2B1D6B-1D77' +
    '1D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D' +
    '1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F' +
    '1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E61' +
    '1E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E83' +
    '1E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB' +
    '1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD' +
    '1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF' +
    '1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-' +
    '1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB4' +
    '1FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF6' +
    '1FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C61' +
    '2C652C662C682C6A2C6C2C712C732C742C76-2C7B2C812C832C852C872C892C8B2C8D' +
    '2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF' +
    '2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD1' +
    '2CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2CF32D00-2D252D272D2D' +
    'A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA661' +
    'A663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695' +
    'A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741' +
    'A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763' +
    'A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CA78E' +
    'A791A793A7A1A7A3A7A5A7A7A7A9A7FAFB00-FB06FB13-FB17FF41-FF5A'
);

/**
 * Expose `GROUP_ALPHABETIC`. Unicode Alphabetic Range: Contains
 * Lu (Letter, uppercase), Ll (Letter, lowercase), and Lo (Letter, other).
 *
 * “Borrowed” from XRegexp.
 *
 * @global
 * @private
 * @constant
 */
GROUP_ALPHABETIC = expand('0041-005A0061-007A00AA00B500BA00C0-00D6' +
    '00D8-00F600F8-02C102C6-02D102E0-02E402EC02EE03450370-037403760377' +
    '037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-0527' +
    '0531-055605590561-058705B0-05BD05BF05C105C205C405C505C705D0-05EA' +
    '05F0-05F20610-061A0620-06570659-065F066E-06D306D5-06DC06E1-06E8' +
    '06ED-06EF06FA-06FC06FF0710-073F074D-07B107CA-07EA07F407F507FA0800-' +
    '0817081A-082C0840-085808A008A2-08AC08E4-08E908F0-08FE0900-093B' +
    '093D-094C094E-09500955-09630971-09770979-097F0981-09830985-098C' +
    '098F09900993-09A809AA-09B009B209B6-09B909BD-09C409C709C809CB09CC' +
    '09CE09D709DC09DD09DF-09E309F009F10A01-0A030A05-0A0A0A0F0A100A13-' +
    '0A280A2A-0A300A320A330A350A360A380A390A3E-0A420A470A480A4B0A4C0A51' +
    '0A59-0A5C0A5E0A70-0A750A81-0A830A85-0A8D0A8F-0A910A93-0AA80AAA-' +
    '0AB00AB20AB30AB5-0AB90ABD-0AC50AC7-0AC90ACB0ACC0AD00AE0-0AE30B01-' +
    '0B030B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D-0B44' +
    '0B470B480B4B0B4C0B560B570B5C0B5D0B5F-0B630B710B820B830B85-0B8A0B8E' +
    '-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BBE-' +
    '0BC20BC6-0BC80BCA-0BCC0BD00BD70C01-0C030C05-0C0C0C0E-0C100C12-0C28' +
    '0C2A-0C330C35-0C390C3D-0C440C46-0C480C4A-0C4C0C550C560C580C590C60-' +
    '0C630C820C830C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD-0CC4' +
    '0CC6-0CC80CCA-0CCC0CD50CD60CDE0CE0-0CE30CF10CF20D020D030D05-0D0C' +
    '0D0E-0D100D12-0D3A0D3D-0D440D46-0D480D4A-0D4C0D4E0D570D60-0D63' +
    '0D7A-0D7F0D820D830D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60DCF-0DD4' +
    '0DD60DD8-0DDF0DF20DF30E01-0E3A0E40-0E460E4D0E810E820E840E870E88' +
    '0E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB90EBB-' +
    '0EBD0EC0-0EC40EC60ECD0EDC-0EDF0F000F40-0F470F49-0F6C0F71-0F810F88-' +
    '0F970F99-0FBC1000-10361038103B-103F1050-10621065-1068106E-1086108E' +
    '109C109D10A0-10C510C710CD10D0-10FA10FC-1248124A-124D1250-12561258' +
    '125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-' +
    '12C512C8-12D612D8-13101312-13151318-135A135F1380-138F13A0-13F4' +
    '1401-166C166F-167F1681-169A16A0-16EA16EE-16F01700-170C170E-1713' +
    '1720-17331740-17531760-176C176E-1770177217731780-17B317B6-17C817D' +
    '717DC1820-18771880-18AA18B0-18F51900-191C1920-192B1930-19381950-' +
    '196D1970-19741980-19AB19B0-19C91A00-1A1B1A20-1A5E1A61-1A741AA71B00' +
    '-1B331B35-1B431B45-1B4B1B80-1BA91BAC-1BAF1BBA-1BE51BE7-1BF11C00-' +
    '1C351C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF31CF51CF61D00-1DBF1E00-1F15' +
    '1F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB4' +
    '1FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-' +
    '1FF41FF6-1FFC2071207F2090-209C21022107210A-211321152119-211D2124' +
    '21262128212A-212D212F-2139213C-213F2145-2149214E2160-218824B6-' +
    '24E92C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2CF22CF32D00-2D252D272D2D' +
    '2D30-2D672D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-' +
    '2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2DE0-2DFF2E2F3005-30073021-30293031' +
    '-30353038-303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-' +
    '318E31A0-31BA31F0-31FF3400-4DB54E00-9FCCA000-A48CA4D0-A4FDA500-' +
    'A60CA610-A61FA62AA62BA640-A66EA674-A67BA67F-A697A69F-A6EFA717-A71F' +
    'A722-A788A78B-A78EA790-A793A7A0-A7AAA7F8-A801A803-A805A807-A80A' +
    'A80C-A827A840-A873A880-A8C3A8F2-A8F7A8FBA90A-A92AA930-A952A960-' +
    'A97CA980-A9B2A9B4-A9BFA9CFAA00-AA36AA40-AA4DAA60-AA76AA7AAA80-' +
    'AABEAAC0AAC2AADB-AADDAAE0-AAEFAAF2-AAF5AB01-AB06AB09-AB0EAB11-' +
    'AB16AB20-AB26AB28-AB2EABC0-ABEAAC00-D7A3D7B0-D7C6D7CB-D7FBF900-' +
    'FA6DFA70-FAD9FB00-FB06FB13-FB17FB1D-FB28FB2A-FB36FB38-FB3CFB3EFB40' +
    'FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74' +
    'FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7' +
    'FFDA-FFDC'
);

/**
 * Expose `GROUP_WHITE_SPACE`. Unicode White Space Range.
 *
 * “Borrowed” from XRegexp.
 *
 * @global
 * @private
 * @constant
 */
GROUP_WHITE_SPACE = expand(
    '0009-000D0020008500A01680180E2000-200A20282029202F205F3000'
);

/**
 * Expose `GROUP_COMBINING_DIACRITICAL_MARK`. Unicode Combining
 * Diacritical Marks, and Combining Diacritical Marks for Symbols, Blocks.
 *
 * @global
 * @private
 * @constant
 */
GROUP_COMBINING_DIACRITICAL_MARK = expand('20D0-20FF0300-036F');

/**
 * Expose `GROUP_COMBINING_NONSPACING_MARK`. Unicode Mark, Nonspacing,
 * Block.
 *
 * @global
 * @private
 * @constant
 */
GROUP_COMBINING_NONSPACING_MARK = expand('0300-036F0483-04870591-05BD' +
    '05BF05C105C205C405C505C70610-061A064B-065F067006D6-06DC06DF-06E4' +
    '06E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-0823' +
    '0825-08270829-082D0859-085B08E4-08FE0900-0902093A093C0941-0948094D' +
    '0951-095709620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A42' +
    '0A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD' +
    '0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C40' +
    '0C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41' +
    '-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-' +
    '0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F86' +
    '0F870F8D-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E1058' +
    '1059105E-10601071-1074108210851086108D109D135D-135F1712-17141732-' +
    '1734175217531772177317B417B517B7-17BD17C617C9-17D317DD180B-180D' +
    '18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A62' +
    '1A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B80' +
    '1B811BA2-1BA51BA81BA91BAB1BE61BE81BE91BED1BEF-1BF11C2C-1C331C36' +
    '1C371CD0-1CD21CD4-1CE01CE2-1CE81CED1CF41DC0-1DE61DFC-1DFF20D0-20DC' +
    '20E120E5-20F02CEF-2CF12D7F2DE0-2DFF302A-302D3099309AA66FA674-A67D' +
    'A69FA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951' +
    'A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0' +
    'AAB2-AAB4AAB7AAB8AABEAABFAAC1AAECAAEDAAF6ABE5ABE8ABEDFB1EFE00-FE0F' +
    'FE20-FE26'
);

/**
 * Expose `GROUP_WORD`. Includes the Unicode:
 * - Number Range (Nd, Nl, and No);
 * - Alphabetic Range (Lu, Ll, and Lo);
 * - Combining Diacritical Marks block;
 * - Combining Diacritical Marks for Symbols block;
 *
 * @global
 * @private
 * @constant
 */
GROUP_WORD = GROUP_NUMERICAL + GROUP_ALPHABETIC +
    GROUP_COMBINING_DIACRITICAL_MARK + GROUP_COMBINING_NONSPACING_MARK;

/**
 * Expose `GROUP_ASTRAL`. Unicode Cs (Other, Surrogate) category.
 *
 * @global
 * @private
 * @constant
 */
GROUP_ASTRAL = expand('D800-DBFFDC00-DFFF');

/**
 * Expose `GROUP_TERMINAL_MARKER`. Interrobang, question-, and
 * exclamation mark
 *
 * @global
 * @private
 * @constant
 */
GROUP_TERMINAL_MARKER = '\\u203D\\?\\!';

/**
 * Expose `GROUP_CLOSING_PUNCTUATION`. Unicode Pe (Punctuation, Close)
 * category.
 *
 * “Borrowed” from XRegexp.
 *
 * @global
 * @private
 * @constant
 */
GROUP_CLOSING_PUNCTUATION = expand('0029005D007D0F3B0F3D169C2046' +
    '207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF' +
    '298429862988298A298C298E2990299229942996299829D929DB29FD2E232E25' +
    '2E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36' +
    'FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63'
);

/**
 * Expose `GROUP_FINAL_PUNCTUATION`. Unicode
 * Pf (Punctuation, Final) category.
 *
 * “Borrowed” from XRegexp.
 *
 * @global
 * @private
 * @constant
 */
GROUP_FINAL_PUNCTUATION = expand('00BB2019201D203A2E032E052E0A2E0D2E1D2E21');

/**
 * `EXPRESSION_WORD` matches a word.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_WORD = new RegExp('^[' + GROUP_WORD + ']+$');

/**
 * `EXPRESSION_TOKEN` matches all tokens:
 * - One or more number, alphabetic, or combining characters;
 * - One or more white space characters;
 * - One or more astral plane characters;
 * - One or more of the same characte;
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_TOKEN = new RegExp(
    '(' +
        '[' + GROUP_WORD + ']+|' +
        '[' + GROUP_WHITE_SPACE + ']+|' +
        '[' + GROUP_ASTRAL + ']+|' +
        '([\\s\\S])\\2*' +
    ')',
    'g'
);

/**
 * `EXPRESSION_MULTILINEBREAK` matches initial, internal, and final white
 *  space.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_MULTILINEBREAK = /(\r?\n|\r)*$|^(\r?\n|\r)+|(\r?\n|\r){2,}/g;

/**
 * `STRING_PIPE` holds a pipe (`|`) character.
 *
 * @global
 * @private
 * @constant
 */
STRING_PIPE = '|';

/**
 * `EXPRESSION_ABBREVIATION_PREFIX` holds a blacklist of full stop
 * characters that should not be treated as terminal sentence markers:
 *
 * A “word” boundry,
 * followed by a case-insensitive abbreviation,
 * followed by full stop.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_ABBREVIATION_PREFIX = new RegExp(
    '\\b(' + [
    /* *Alphabet*. */
    '[a-z]',

    /*
     * Common Latin Abbreviations:
     * Based on: http://en.wikipedia.org/wiki/List_of_Latin_abbreviations
     * Where only the abbreviations written without joining full stops,
     * but with a final full stop, were extracted.
     *
     * circa, capitulus, confer, compare, centum weight, eadem, (et) alii,
     * et cetera, floruit, foliis, ibidem, idem, nemine && contradicente,
     * opere && citato, (per) cent, (per) procurationem, (pro) tempore,
     * sic erat scriptum, (et) sequentia, statim, videlicet.
     */
    'c?ca|cap|cf|cp|cwt|ead|al|etc|fl|ff|ibid|id|nem|con|op|cit|cent',
    'pro|tem|sic|seq|stat|viz',

    /*
     * Business Abbreviations:
     * Incorporation, Limited company.
     */
    'inc|ltd',

    /*
     * English unit abbreviations:
     * Note that *Metric abbreviations* do not use full stops.
     *
     * barrel, cubic, dozen, fluid ounce, foot, gallon, grain, gross,
     * inch, karat / knot, pound, mile, ounce, pint, quart, square,
     * tablespoon, teaspoon, yard.
     */
    'bbls?|cu|dozfl|oz|ft|gal|gr|gro|in|kt|lb|mi|oz|pt|qt|sq|tbsp|tsp|yd',

    /*
     * Abbreviations of time references:
     *
     * seconds, minutes, hours, Monday, Tuesday, *, Wednesday,
     * Thursday, *, Friday, Saturday, Sunday, January, Februari, March,
     * April, June, July, August, September, *, October, November,
     * December.
     */
    'sec|min|hr|mon|tue|tues|wed|thu|thurs|fri|sat|sun|jan|feb|mar',
    'apr|jun|jul|aug|sep|sept|oct|nov|dec'
    ].join(STRING_PIPE) + ')\\.',
'gi');

/**
 * `EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE` holds a blacklist of full
 * stop characters that should not be treated as terminal sentence
 * markers:
 *
 * A “word” boundry,
 * followed by a case-sensitive abbreviation,
 * followed by full stop.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE = new RegExp(
    '\\b(' + [
    /* Decimals */
    '[0-9]',

    /* Social:
     * Mister, Mistress, Mistress, woman, Mademoiselle, Madame, Monsieur,
     * Misters, Mesdames, Junior, Senior, *.
     */
    'Mr|Mrs|Miss|Ms|Mlle|Mme|M|Messrs|Mmes|Jr|Sr|Snr',

    /*
     * Rank and academic:
     * Doctor, Magister, Attorney, Profesor, Honourable, Reverend,
     * Father, Monsignor, Sister, Brother, Saint, President,
     * Superintendent, Representative, Senator.
     */
    'Dr|Mgr|Atty|Prof|Hon|Rev|Fr|Msgr|Sr|Br|St|Pres|Supt|Rep|Sen',

    /* Rank and military:
     * Governor, Ambassador, Treasurer, Secretary, Admiral, Brigadier,
     * General, Commander, Colonel, Captain, Lieutenant, Major,
     * Sergeant, Petty Officer, Warrant Officer, Purple Heart.
     */
    'Gov|Amb|Treas|Sec|Amd|Brig|Gen|Cdr|Col|Capt|Lt|Maj|Sgt|Po|Wo|Ph',

    /*
     * Common geographical abbreviations:
     * Avenue, Boulevard, Mountain, Road, Building, National, *, Route, *,
     * County, Park, Square, Drive, Port or Point, Street or State, Fort,
     * Peninsula, Territory, Highway, Freeway, Parkway.
     */
    'Ave|Blvd|Mt|Rd|Bldgs?|Nat|Natl|Rt|Rte|Co|Pk|Sq|Dr|Pt|St',
    'Ft|Pen|Terr|Hwy|Fwy|Pkwy',

    /*
     * American state abbreviations:
     * Alabama, Arizona, Arkansas, California, *, Colorado, *,
     * Connecticut, Delaware, Florida, Georgia,Idaho, *, Illinois,
     * Indiana, Iowa, Kansas, *, Kentucky, *, Louisiana, Maine, Maryland,
     * Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,
     * Nebraska, *, Nevada, Mexico, Dakota, Oklahoma, *, Oregon,
     * Pennsylvania, *, *, Tennessee, Texas, Utah, Vermont, Virginia,
     * Washington, Wisconsin, *, Wyoming.
     */
    'Ala|Ariz|Ark|Cal|Calif|Col|Colo|Conn|Del|Fla|Ga|Ida|Id|Ill|Ind',
    'Ia|Kan|Kans|Ken|Ky|La|Me|Md|Mass|Mich|Minn|Miss|Mo|Mont|Neb',
    'Nebr|Nev|Mex|Dak|Okla|Ok|Ore|Penna|Penn|Pa|Tenn|Tex|Ut|Vt|Va',
    'Wash|Wis|Wisc|Wyo',

    /*
     * Canadian province abbreviations:
     * Alberta, Manitoba, Ontario, Québec, *, Saskatchewan,
     * Yukon Territory.
     */
    'Alta|Man|Ont|Qué|Que|Sask|Yuk',

    /*
     * English county abbreviations
     * Bedfordshire, Berkshire, Buckinghamshire, Cambridgeshire,
     * Cheshire, Cornwall, Cumberland, Derbyshire, *, Devon, Dorset,
     * Durham, Gloucestershire, Hampshire, Herefordshire, *,
     * Hertfordshire, Huntingdonshire, Lancashire, Leicestershire,
     * Lincolnshire, Middlesex, *, *, Norfolk, Northamptonshire,
     * Northumberland, *, Nottinghamshire, Oxfordshire, Rutland,
     * Shropshire, Somerset, Staffordshire, *, Suffolk, Surrey,
     * Sussex, *, Warwickshire, *, *, Westmorland, Wiltshire,
     * Worcestershire, Yorkshire.
     */
    'Beds|Berks|Bucks|Cambs|Ches|Corn|Cumb|Derbys|Derbs|Dev|Dor|Dur|Glos',
    'Hants|Here|Heref|Herts|Hunts|Lancs|Leics|Lincs|Mx|Middx|Mddx|Norf',
    'Northants|Northumb|Northd|Notts|Oxon|Rut|Shrops|Salop|Som|Staffs',
    'Staf|Suff|Sy|Sx|Ssx|Warks|War|Warw|Westm|Wilts|Worcs|Yorks'

    ].join(STRING_PIPE) + ')\\.',
'g');

/**
 * `EXPRESSION_ABBREVIATION_AFFIX` holds a blacklist of full stop
 * characters that should not be treated as terminal sentence markers:
 *
 * A full stop,
 * followed by a case-sensitive abbreviation,
 * followed by “word” boundry.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_ABBREVIATION_AFFIX = new RegExp(
    '\\.(?:' + [
    /*
     * Generic Top-level Domains:
     * Air transport industry, Asia-Pacific, business use, Catalan,
     * commercial organizations, cooperatives,
     * U.S. post-secondary educational establishments,
     * U.S. government entities, informational sites,
     * international organizations, employment-related,
     * U.S. military, mobile devices, museums, families and individuals,
     * network infrastructures, organizations, postal services,
     * professions, telephone network, travel, pornography.
     */
    'aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi',
    'museum|name|net|org|post|pro|tel|travel|xxx',

    /* Decimals */
    '0|1|2|3|4|5|6|7|8|9'
    ].join(STRING_PIPE) + ')\\b',
'g');

/**
 * `EXPRESSION_FULL_STOP_SUFFIX_EXCEPTION` matches a full stop, optionally
 * followed by closing punctuation, followed by either a number or a comma.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_FULL_STOP_SUFFIX_EXCEPTION = new RegExp(
    '\\.' +
    '[' + GROUP_CLOSING_PUNCTUATION + GROUP_FINAL_PUNCTUATION + ']?' +
    '[,' + GROUP_NUMERICAL + ']',
    'g'
);

/**
 * `EXPRESSION_TERMINAL_MARKER_SUFFIX_EXCEPTION` matches a terminal marker,
 * optionally followed by closing punctuation, followed one or more white
 * space characters and a lower letter.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_TERMINAL_MARKER_SUFFIX_EXCEPTION = new RegExp(
    '[\\.' + GROUP_TERMINAL_MARKER + ']' +
    '[' + GROUP_CLOSING_PUNCTUATION + GROUP_FINAL_PUNCTUATION + ']?' +
    '\\ +[' + GROUP_LETTER_LOWER + ']',
    'g'
);

/**
 * `EXPRESSION_WORD_CHARACTER` finds a word character.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_WORD_CHARACTER = new RegExp('[' + GROUP_WORD + ']');

/**
 * `EXPRESSION_SENTENCE_END` finds probable sentence ends.
 *
 * A probable sentence end:
 * A terminal marker (`?`, `!`, or `.`),
 * followed by an optional closing punctuation (e.g., `)` or `”`).
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_SENTENCE_END = new RegExp(
    '$|(' +
    '(?:\\.[' + GROUP_WHITE_SPACE + ']?)*\\.|' +
    '[' + GROUP_TERMINAL_MARKER + ']+' +
    ')' +
    '([' + GROUP_CLOSING_PUNCTUATION + GROUP_FINAL_PUNCTUATION + '])?',
    'g'
);

/**
 * `EXPRESSION_INITIAL_WHITE_SPACE` matches optional white space at the start
 * of a string, followed by any other characters.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_INITIAL_WHITE_SPACE = new RegExp(
    '^([' + GROUP_WHITE_SPACE + ']+)?'
);

/**
 * `EXPRESSION_WHITE_SPACE` matches a string containing ONLY white space.
 *
 * @global
 * @private
 * @constant
 */
EXPRESSION_WHITE_SPACE = new RegExp(
    '^[' + GROUP_WHITE_SPACE + ']+$'
);

/**
 * `validateInput` validates the input for tokenize* methods.
 *
 * @param {String?} value - The value to validate / convert to a string.
 * @return {String} - the converted string.
 * @global
 * @private
 */
function validateInput(value) {
    if (value === null || value === undefined) {
        value = '';
    } else if (value instanceof String) {
        value = value.toString();
    }

    if (typeof value !== 'string') {
        throw new TypeError('Illegal invocation: \'' + value +
            '\' is not a valid argument for \'ParseEnglish\'');
    }

    return value;
}

/**
 * `tokenizerFactory` validates the input, before passing it to a tokenizer.
 *
 * @param {Function} tokenizer - The tokenizer to wrap.
 * @return {Object} - An AST object returned by the tokenizer.
 * @global
 * @private
 */
function tokenizerFactory(tokenizer) {
    return function (value) {
        return tokenizer.call(this, validateInput(value));
    };
}

/*eslint-disable no-cond-assign */

/**
 * `tokenizeWord` tokenizes a word token.
 *
 * @param {String} value - The word to parse.
 * @return {Object} - An AST object representing the given word.
 * @global
 * @private
 */
function tokenizeWord(value) {
    return {
        'type' : 'WordNode',
        'value' : value
    };
}

/**
 * `tokenizeWhiteSpace` tokenizes a white space token.
 *
 * @param {String} value - The white space to parse.
 * @return {Object} - An AST object representing the given white space.
 * @global
 * @private
 */
function tokenizeWhiteSpace(value) {
    return {
        'type' : 'WhiteSpaceNode',
        'value' : value
    };
}

/**
 * `tokenizePunctuation` tokenizes a punctuation token.
 *
 * @param {String} value - The punctuation to parse.
 * @return {Object} - An AST object representing the given punctuation.
 * @global
 * @private
 */
function tokenizePunctuation(value) {
    return {
        'type' : 'PunctuationNode',
        'value' : value
    };
}

/**
 * `tokenizeSentence` tokenizes a sentence into words, punctuation, and white
 * space (which in turn all get tokenized).
 *
 * @param {String} value - The sentence to parse.
 * @return {Object} - An AST object representing the given sentence.
 * @global
 * @private
 */
function tokenizeSentence(value) {
    var sentence, children, match, token, start, end, delimiter;

    /* Construct an AST object for the sentence. */
    sentence = {
        'type' : 'SentenceNode',
        'children' : []
    };

    /* Return early if no content can be tokenized. */
    if (!value) {
        return sentence;
    }

    children = sentence.children;

    /* Get the token delimiter, and set its `lastIndex` property to 0. */
    delimiter = this.DELIMITER_TOKEN;
    delimiter.lastIndex = 0;

    start = 0;

    /* for every match of the token delimiter expression... */
    while (match = delimiter.exec(value)) {
        end = match.index;

        /*
         * If a first group matched, move the pointer over to its last
         * character.
         */
        /* istanbul ignore else: TOSPEC */
        if (match[1]) {
            end += match[1].length - 1;
        }

        /* TODO: BLACKLIST */

        /*
         * If a first group matched, move the pointer over to after that
         * group.
         */
        /* istanbul ignore else: TOSPEC */
        if (match[1]) {
            end += 1;
        }

        /*
         * Slice the found token content, from (including) start to (not
         * including) end.
         */
        token = value.substring(start, end);

        /* istanbul ignore if: TOSPEC */
        if (!token) {
            continue;
        }

        /*
         * If the token consists solely of white space, tokenize it as white
         * space and add it to the sentences children.
         */
        if (EXPRESSION_WHITE_SPACE.test(token)) {
            children.push(this.tokenizeWhiteSpace(token));
        /*
         * If the token contains just word characters, tokenize it as word
         * and add it to the sentences children.
         */
        } else if (EXPRESSION_WORD.test(token)) {
            children.push(this.tokenizeWord(token));
        /*
         * Otherwise, tokenize it as punctuation and add it to the sentences
         * children.
         */
        } else {
            children.push(this.tokenizePunctuation(token));
        }

        /*
         * The expression may also match $ (end-of-string), which keeps on
         * matching in global state, thus we detect it here and exit the loop.
         */
        if (delimiter.lastIndex === value.length) {
            break;
        }

        start = end;
    }

    /* Return the AST object (now with children) of the sentence. */
    return sentence;
}

/**
 * `tokenizeParagraph` tokenizes a paragraph into sentences and white
 * space (which in turn all get tokenized).
 *
 * @param {String} value - The paragraph to parse.
 * @return {Object} - An AST object representing the given paragraph.
 * @global
 * @private
 */
function tokenizeParagraph(value) {
    var sentences = [],
        blacklist = {},
        iterator = -1,
        start = 0,
        delimiter, paragraph, children, sentence, whiteSpace, end, match,
        length, exceptions, exception, pointer;

    /* Construct an AST object for the paragraph. */
    paragraph = {
        'type' : 'ParagraphNode',
        'children' : []
    };

    /* Return early if no content can be tokenized. */
    if (!value) {
        return paragraph;
    }

    children = paragraph.children;

    /* Get the sentence delimiter, and set its `lastIndex` property to 0. */
    delimiter = this.DELIMITER_SENTENCE;
    delimiter.lastIndex = 0;

    /* Get the sentence exceptions black list. */
    exceptions = this.SENTENCE_BLACKLIST;
    length = exceptions.length;

    /* Iterate over the black list. */
    while (++iterator < length) {
        exception = exceptions[iterator];

        /* Set the exception’s `lastIndex` property to 0. */
        exception.lastIndex = 0;

        /* While a match is found... */
        while (match = exception.exec(value)) {
            pointer = match.index;

            /*
             * If a first group matched, move the pointer over to after its
             * end.
             */
            if (match[1]) {
                pointer += match[1].length;
            }

            /* Black list the pointer. */
            blacklist[pointer] = true;
        }
    }

    /* for every match of the sentence delimiter expression... */
    while (match = delimiter.exec(value)) {
        end = match.index;

        /*
         * If a first group matched, move the pointer over to its last
         * character.
         */
        if (match[1]) {
            end += match[1].length - 1;
        }

        /* If the character at pointer is is blacklisted, continue. */
        if (end in blacklist) {
            continue;
        }

        /*
         * If a first group matched, move the pointer over to after that
         * group.
         */
        if (match[1]) {
            end += 1;
        }

        /*
         * If a second group matched (extra content which should be contained
         * by the sentence), move the pointer over to after that group.
         */
        if (match[2]) {
            end += match[2].length;
        }

        /*
         * Slice the found sentence content, from (including) start to (not
         * including) end.
         */
        sentence = value.substring(start, end);

        /*
         * If the sentence contains an alphabetic character...
         * This prevents ellipses joined by spaces from classifying as a
         * sentence.
         */
        if (EXPRESSION_WORD_CHARACTER.test(sentence)) {
            sentences.push(sentence);
        /*
         * Otherwise, if a previous sentence already exists, append the
         * invalid “sentence” to the previous sentence.
         */
        } else if (sentences.length) {
            sentences[sentences.length - 1] += sentence;
        /*
         * Otherwise, if this is the only content in the paragraph,
         * classify it as a sentence nonetheless.
         */
        } else if (end === value.length) {
            sentences.push(sentence);
        /* Otherwise, prepend the content to the next sentence. */
        } else {
            end -= sentence.length;
        }

        /*
         * The expression also matches $ (end-of-string), which keeps on
         * matching in global state, thus we detect it here and exit the loop.
         */
        if (delimiter.lastIndex === value.length) {
            break;
        }

        /*
         * Continue on with the next iteration, starting at the current end.
         */
        start = end;
    }

    iterator = -1;

    /*
     * Walk over the previously defined sentences, break off their initial
     * white space, and transform them into an AST.
     */
    while (sentence = sentences[++iterator]) {
        whiteSpace = EXPRESSION_INITIAL_WHITE_SPACE.exec(sentence)[0];

        /*
         * If the sentence contains initial white space, break it off and
         * add it to paragraphs children.
         */
        if (whiteSpace) {
            children.push(this.tokenizeWhiteSpace(whiteSpace));
        }

        /*
         * Add the rest of the sentence (the actual sentence) to paragraphs
         * children.
         */
        children.push(this.tokenizeSentence(
            sentence.substring(whiteSpace.length))
        );
    }

    /* Return the AST object (now with children) of the paragraph. */
    return paragraph;
}

/**
 * `tokenizeRoot` tokenizes a document into paragraphs and white space (which
 * in turn all get tokenized).
 *
 * @param {String} value - The paragraphs and white space to parse.
 * @return {Object} - An AST object representing the given document.
 * @global
 * @private
 */
function tokenizeRoot(value) {
    var start = 0,
        delimiter, root, children, match, end, paragraph, whiteSpace;

    /* Construct an AST object for the paragraph. */
    root = {
        'type' : 'RootNode',
        'children' : []
    };

    /* Return early if no content can be tokenized. */
    if (!value) {
        return root;
    }

    children = root.children;

    /* Get the sentence delimiter, and set its `lastIndex` property to 0. */
    delimiter = this.DELIMITER_PARAGRAPH;
    delimiter.lastIndex = 0;

    while (match = delimiter.exec(value)) {
        end = match.index + match[0].length;

        paragraph = value.substring(start, match.index);
        whiteSpace = value.substring(match.index, end);

        if (paragraph) {
            children.push(this.tokenizeParagraph(paragraph));
        }

        if (whiteSpace) {
            children.push(this.tokenizeWhiteSpace(whiteSpace));
        }

        /*
         * The expression also matches $ (end-of-string), which keeps on
         * matching in global state, thus we detect it here and exit the loop.
         */
        if (end === value.length) {
            break;
        }

        /*
         * Continue on with the next iteration, starting at the current end.
         */
        start = end;
    }

    /* Return the AST object (now with children) of the document. */
    return root;
}

/*eslint-enable no-cond-assign */

/**
 * `Parser` contains the functions needed to tokenize english natural
 * language into an AST.
 *
 * @constructor
 * @api public
 */
function Parser() {
    /*
     * TODO: This should later be removed (when this change bubbles
     * through to dependants)
     */
    if (!(this instanceof Parser)) {
        return new Parser();
    }
}

parserPrototype = Parser.prototype;

parserPrototype.tokenizeRoot = tokenizerFactory(tokenizeRoot);
parserPrototype.tokenizeParagraph = tokenizerFactory(tokenizeParagraph);
parserPrototype.tokenizeSentence = tokenizerFactory(tokenizeSentence);
parserPrototype.tokenizePunctuation = tokenizerFactory(tokenizePunctuation);
parserPrototype.tokenizeWord = tokenizerFactory(tokenizeWord);
parserPrototype.tokenizeWhiteSpace = tokenizerFactory(tokenizeWhiteSpace);

parserPrototype.DELIMITER_PARAGRAPH = EXPRESSION_MULTILINEBREAK;

parserPrototype.DELIMITER_SENTENCE = EXPRESSION_SENTENCE_END;

parserPrototype.DELIMITER_TOKEN = EXPRESSION_TOKEN;

parserPrototype.SENTENCE_BLACKLIST = [
    EXPRESSION_ABBREVIATION_AFFIX,
    EXPRESSION_ABBREVIATION_PREFIX,
    EXPRESSION_ABBREVIATION_PREFIX_SENSITIVE,
    EXPRESSION_FULL_STOP_SUFFIX_EXCEPTION,
    EXPRESSION_TERMINAL_MARKER_SUFFIX_EXCEPTION
];

module.exports = Parser;
