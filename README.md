# Lyric Hound

Aplikace pro vyhledávání skladeb na základě útržků textu.

## Použité technologie

Aplikace je vytvořena pomocí open-source frameworku React a psána v JavaScriptu. Ke stylování a zajištění responzivity vůči různým zařízením byla použita knihovna Bootstrap 5 v kombinaci s knihovnou FontAwesome pro ikony.

Projekt využívá architektury založené na komponentách rozdělených podle tématické spojitosti. Struktura:
- `src/components`: obsahuje všechny komponenty nutné k sestavení aplikace
- `src/components/graphics`: grafické prvky
- `src/components/layout`: strukturální komponenty
- `src/components/tracks`: komponenty reprezentující výsledky vyhledávání

Stav aplikace je spravován pomocí stavů pro třídy a React Hooks pro ostatní komponenty.

## Popis funkcionality

Při navštívění domovské stránky je odeslán HTTP dotaz GET na Musixmatch API skrze `axios.get()` pro získání nejposlouchanějších 10 skladeb za poslední týden. Aby byla aplikace funkční, je před URL tohoto api přidána předpona `https://corsproxy.io/?` k zabránění CORS.

Po zadání části textu do vyhledávače a spuštění hledání je těchto 10 skladeb nahrazeno skladbami, jejichž text nejvíce odpovídá zadání uživatele. Uživatel si skladby může rozkliknout, podívat se na autora skladby a album, na kterém se skladba nachází a následně přejít na stránku s textem této skladby.

Na stránce s textem je kromě něj zobrazeno Album, hudební žánr skladby a zda obsahuje explicitní výrazy. Pod těmito údaji je zároveň vloženo video skrze YouTube API, aby si uživatel mohl danou skladbu přehrát.

## Splněné body zadání
- dokumentace (viz README)
- validita (stránky nevykazují žádné erorry ani varování)
- sémantické značky (použití značek `<nav>` a `<section>`)
- grafika (SVG)
- média (embedded video)
- formulářové prvky (placeholder, autofocus, validace neprázdného dotazu)
- selektory (Bootstrap)
- vendor prefixy (Bootstrap)
- CSS transitions (karty jednotlivých skladeb)
- media queries (Bootstrap)
- OOP přístup
- JS framework (React)
- JS API (Musixmatch API)
