# Mapowanie Endpointów API (Bright Data, Axesso, ASIN Data) dla Aplikacji Badania Nisz Amazon

Na podstawie przeglądu dokumentacji i dostępnych informacji, poniżej znajduje się mapowanie potencjalnie użytecznych endpointów API z Bright Data, Axesso i ASIN Data API (Traject Data) do funkcji wymaganych przez aplikację do badania nisz Amazon Merch.

## 1. Bright Data (Amazon Scraper API / Web Scraper API)

Bright Data oferuje dedykowane "Scrapers" dla Amazon, dostępne przez ich Web Scraper API.

*   **Wyszukiwanie Produktów (Live Research):**
    *   **Endpoint:** `Amazon products search` lub `Amazon products - Collects products by specific keywords`.
    *   **Dane:** ASIN, URL, Nazwa (tytuł), Cena (początkowa/końcowa), Waluta, Status (Sponsored), Dostępność, Ocena, Liczba recenzji, Brand, Opis.
    *   **Mapowanie:** Odpowiada modułowi "Live Research". Pozwala na wyszukiwanie po słowach kluczowych i pobieranie listy produktów z podstawowymi danymi.
*   **Szczegóły Produktu:**
    *   **Endpoint:** `Amazon products` (zwykle wymaga podania URL produktu lub ASIN).
    *   **Dane:** Tytuł, Nazwa sprzedawcy, Marka, Opis, Cena (początkowa/końcowa), Waluta, Dostępność, Liczba recenzji, Ocena, Kategorie, ASIN, Obrazy, Opcje dostawy, Historia BSR (może wymagać osobnego zapytania lub być częścią danych produktu w zależności od konfiguracji scrapera).
    *   **Mapowanie:** Niezbędne do pobrania szczegółowych danych dla produktów znalezionych w wyszukiwaniu, w tym potencjalnie historii BSR.
*   **Bestsellery (Best Sellers):**
    *   **Endpoint:** `Amazon products - Collects products by best sellers category URL`.
    *   **Dane:** Podobne jak w wyszukiwaniu produktów (Tytuł, Cena, Ocena, Recenzje, BSR itp.).
    *   **Mapowanie:** Odpowiada modułowi "Best Sellers". Wymaga podania URL kategorii bestsellerów.
*   **Recenzje:**
    *   **Endpoint:** `Amazon Reviews`.
    *   **Dane:** URL, Nazwa produktu, Ocena produktu, Ocena recenzji, Autor, ASIN, Treść recenzji, Data.
    *   **Mapowanie:** Potrzebne do filtrowania/analizy na podstawie liczby i treści recenzji.
*   **Trendy Sprzedawców (Seller Trends):**
    *   **Endpoint:** Brak bezpośredniego endpointu dla "Seller Trends" w stylu "Winners/Losers" BSR. Wymagałoby to regularnego pobierania danych BSR dla obserwowanych produktów (np. codziennie przez endpoint `Amazon products`) i obliczania zmian BSR w backendzie aplikacji.
    *   **Mapowanie:** Wymaga implementacji logiki trendów w aplikacji, bazując na danych historycznych BSR pobieranych regularnie.
*   **Informacje o Sprzedawcy:**
    *   **Endpoint:** `Amazon sellers info`.
    *   **Dane:** ID sprzedawcy, URL, Nazwa, Opis, Ocena, Feedback.
    *   **Mapowanie:** Może być przydatne do dodatkowej analizy lub filtrowania.
*   **Keyword Search Result Count:** Dokumentacja Bright Data dla `Amazon products search` nie wspomina explicite o zwracaniu całkowitej liczby wyników wyszukiwania (np. "1-48 of over 1,000 results"). Zazwyczaj API zwracają paginowane wyniki. Możliwe, że ta informacja jest dostępna w metadanych odpowiedzi, ale wymaga to weryfikacji przez testowe zapytania.

## 2. Axesso (Amazon Data Service API)

Axesso oferuje API RESTowe dla różnych danych Amazon.

*   **Wyszukiwanie Produktów (Live Research):**
    *   **Endpoint:** `/amz/amazon-search-by-keyword`.
    *   **Dane:** Zwraca listę produktów dla danego słowa kluczowego, w tym ASIN, tytuł, cenę, ocenę, liczbę recenzji, URL.
    *   **Mapowanie:** Odpowiada modułowi "Live Research".
*   **Szczegóły Produktu:**
    *   **Endpoint:** `/amz/amazon-lookup-product` (wymaga ASIN).
    *   **Dane:** Szczegółowe informacje o produkcie, w tym tytuł, cena, ocena, dostępność, opis, cechy, BSR (często w różnych kategoriach), wymiary, waga, data pierwszej dostępności.
    *   **Mapowanie:** Kluczowe do pobrania BSR, daty publikacji i innych szczegółów.
*   **Bestsellery (Best Sellers):**
    *   **Endpoint:** `/amz/amazon-bestseller` (wymaga URL kategorii bestsellerów).
    *   **Dane:** Lista produktów bestsellerów z danej kategorii, w tym pozycja, ASIN, tytuł, cena, ocena.
    *   **Mapowanie:** Odpowiada modułowi "Best Sellers".
*   **Recenzje:**
    *   **Endpoint:** `/amz/amazon-reviews` (wymaga ASIN).
    *   **Dane:** Lista recenzji dla produktu, w tym ocena, tytuł, treść, autor, data.
    *   **Mapowanie:** Potrzebne do filtrowania/analizy recenzji.
*   **Trendy Sprzedawców (Seller Trends):**
    *   **Endpoint:** Podobnie jak w Bright Data, brak bezpośredniego endpointu. Wymaga logiki w aplikacji i regularnego pobierania danych BSR przez `/amz/amazon-lookup-product`.
    *   **Mapowanie:** Wymaga implementacji w aplikacji.
*   **Kategorie:**
    *   **Endpoint:** `/amz/amazon-category` (wymaga URL kategorii).
    *   **Dane:** Lista produktów z danej kategorii.
    *   **Mapowanie:** Może być alternatywą dla wyszukiwania lub uzupełnieniem dla bestsellerów.
*   **Keyword Search Result Count:** Dokumentacja Axesso (np. na RapidAPI lub w portalu developera) również nie gwarantuje zwracania całkowitej liczby wyników. Zazwyczaj API zwracają paginowane wyniki (np. `number` produktów). Należy sprawdzić, czy metadane odpowiedzi zawierają tę informację.

## 3. ASIN Data API (Traject Data)

API działające przez jeden główny endpoint `/request` z różnymi parametrami `type`.

*   **Wyszukiwanie Produktów (Live Research):**
    *   **Endpoint:** `/request` z `type=search`.
    *   **Parametry:** `search_term`, `amazon_domain`, `sort_by`, `page`, `category_id`.
    *   **Dane:** Zwraca listę produktów (`search_results`) z ASIN, tytułem, ceną, oceną, liczbą recenzji, URL, informacją o sponsorowaniu.
    *   **Mapowanie:** Odpowiada modułowi "Live Research".
*   **Szczegóły Produktu:**
    *   **Endpoint:** `/request` z `type=product`.
    *   **Parametry:** `asin` lub `url`, `amazon_domain`.
    *   **Dane:** Bardzo szczegółowe dane produktu (`product`), w tym tytuł, brand, cena, oceny, recenzje, BSR (`bestsellers_rank`), cechy, opis, warianty, data pierwszej dostępności (`date_first_available`), wymiary, waga, obrazy.
    *   **Mapowanie:** Kluczowe do pobrania BSR, daty publikacji i innych szczegółów.
*   **Bestsellery (Best Sellers):**
    *   **Endpoint:** `/request` z `type=bestsellers`.
    *   **Parametry:** `url` (URL kategorii bestsellerów), `amazon_domain`.
    *   **Dane:** Lista produktów (`bestsellers`) z pozycją, ASIN, tytułem, ceną, oceną, URL.
    *   **Mapowanie:** Odpowiada modułowi "Best Sellers".
*   **Recenzje:**
    *   **Endpoint:** `/request` z `type=reviews`.
    *   **Parametry:** `asin` lub `url`, `amazon_domain`, `sort_by`, `filter_by_star_rating`.
    *   **Dane:** Lista recenzji (`reviews`) z ID, tytułem, treścią, oceną, autorem, datą, informacją o weryfikacji zakupu.
    *   **Mapowanie:** Potrzebne do filtrowania/analizy recenzji.
*   **Trendy Sprzedawców (Seller Trends):**
    *   **Endpoint:** Brak bezpośredniego endpointu. Wymaga logiki w aplikacji i regularnego pobierania danych BSR przez `type=product`.
    *   **Mapowanie:** Wymaga implementacji w aplikacji.
*   **Kategorie:**
    *   **Endpoint:** `/request` z `type=category`.
    *   **Parametry:** `url` (URL kategorii) lub `category_id`, `amazon_domain`.
    *   **Dane:** Lista produktów (`category_results`) z danej kategorii.
    *   **Mapowanie:** Może być alternatywą dla wyszukiwania lub uzupełnieniem dla bestsellerów.
*   **Keyword Search Result Count:** Dokumentacja ASIN Data API dla `type=search` wspomina o polu `pagination.total_results` w odpowiedzi, które **powinno zawierać całkowitą liczbę wyników dla danego zapytania**. To czyni to API potencjalnie najbardziej odpowiednim do realizacji tego konkretnego wymagania.

## Podsumowanie Wstępne

Wszystkie trzy API (Bright Data, Axesso, ASIN Data API) oferują podobny zestaw podstawowych endpointów do pobierania danych o produktach, wynikach wyszukiwania, bestsellerach i recenzjach, co pokrywa większość potrzeb aplikacji. Żadne z nich nie oferuje gotowego endpointu do analizy trendów BSR ("Winners/Losers"), co będzie musiało zostać zaimplementowane w logice aplikacji poprzez regularne pobieranie i porównywanie danych BSR.

Kluczową różnicą wydaje się być dostępność metryki **"Keyword Search Result Count"**. ASIN Data API wydaje się explicite oferować tę informację (`pagination.total_results`) w odpowiedzi na zapytanie typu `search`. W przypadku Bright Data i Axesso, dostępność tej metryki jest mniej pewna i wymagałaby potwierdzenia przez testowe zapytania (sprawdzenie metadanych odpowiedzi).

Następnym krokiem jest analiza możliwości tych API pod kątem pozostałych krytycznych metryk i stworzenie planu integracji.



## 4. Analiza Możliwości API (Keyword Search Result Count i Inne Metryki)

Analiza możliwości poszczególnych API pod kątem dostarczania kluczowych metryk, ze szczególnym uwzględnieniem "keyword search result count":

### 4.1. Keyword Search Result Count

Jest to specyficzna metryka, często wyświetlana na stronach wyników wyszukiwania Amazon (np. "1-48 of over 1,000 results").

*   **ASIN Data API:** Dokumentacja dla zapytania `type=search` **explicite wspomina** o polu `pagination.total_results` w odpowiedzi. To czyni to API **najbardziej prawdopodobnym** dostawcą tej konkretnej metryki. Jest to kluczowa przewaga dla tego specyficznego wymagania.
*   **Bright Data:** Przeglądana dokumentacja dla endpointów wyszukiwania (`Amazon products search`, `Amazon products - Collects products by specific keywords`) nie gwarantuje dostępności tej metryki. API prawdopodobnie zwraca paginowane wyniki. **Wymaga weryfikacji** poprzez wykonanie testowych zapytań i analizę pełnej struktury odpowiedzi (w tym metadanych), czy całkowita liczba wyników jest gdzieś zawarta.
*   **Axesso:** Podobnie jak w przypadku Bright Data, dokumentacja dla `/amz/amazon-search-by-keyword` skupia się na zwracaniu listy produktów. Dostępność całkowitej liczby wyników **wymaga weryfikacji** poprzez testowe zapytania i analizę odpowiedzi.

**Wniosek:** Do uzyskania metryki "keyword search result count" **ASIN Data API wydaje się być najlepszym kandydatem**. Pozostałe API mogą ją dostarczać, ale nie jest to jasno udokumentowane.

### 4.2. Inne Kluczowe Metryki

*   **BSR (Best Sellers Rank):**
    *   Wszystkie trzy API (Bright Data `Amazon products`, Axesso `/amz/amazon-lookup-product`, ASIN Data `type=product`) wydają się zwracać BSR w ramach szczegółów produktu. Należy sprawdzić, czy zwracają ranking w wielu kategoriach, jeśli jest dostępny na stronie produktu.
    *   **Historia BSR:** Żadne z API prawdopodobnie nie dostarcza gotowej historii BSR. Aplikacja będzie musiała regularnie (np. codziennie) odpytywać endpointy szczegółów produktu dla śledzonych ASINów i zapisywać wartości BSR w swojej bazie danych, aby budować historię i obliczać trendy.
*   **Data Publikacji / Pierwszej Dostępności (Date Published / First Available):**
    *   Axesso (`/amz/amazon-lookup-product`) i ASIN Data API (`type=product` -> `date_first_available`) jasno wskazują na dostępność tej daty.
    *   Bright Data: Wymaga potwierdzenia, czy ta data jest standardowo zwracana przez endpoint `Amazon products`.
*   **Podstawowe Dane Produktu (Cena, Ocena, Liczba Recenzji, Marka, Opis, Kategorie, ASIN, Obrazy):**
    *   Wszystkie trzy API wydają się pokrywać te standardowe dane w ramach swoich endpointów wyszukiwania i szczegółów produktu.
*   **Dane Bestsellerów:**
    *   Wszystkie trzy API oferują dedykowane endpointy do pobierania list bestsellerów na podstawie URL kategorii.
*   **Dane Recenzji:**
    *   Wszystkie trzy API posiadają endpointy do pobierania recenzji dla danego produktu (ASIN).
*   **Trendy Sprzedawców (BSR Winners/Losers):**
    *   Żadne z API nie oferuje gotowej funkcji analizy trendów. Jest to **logika do zaimplementowania w aplikacji**, oparta na regularnym pobieraniu i porównywaniu danych BSR (patrz punkt Historia BSR).
*   **Zaawansowane Filtrowanie (Suwaki, Wykluczenia):**
    *   API mogą oferować podstawowe parametry filtrowania (np. ASIN Data API dla ocen recenzji). Jednak większość zaawansowanych filtrów widocznych na zrzutach ekranu (zakresy BSR/ceny/recenzji, wykluczanie marek/słów kluczowych) będzie musiała być **zaimplementowana po stronie aplikacji** (w backendzie lub frontendzie) po pobraniu szerszego zestawu danych z API.

**Wniosek Ogólny:** Wszystkie trzy API dostarczają niezbędnych danych podstawowych. ASIN Data API wyróżnia się potencjalną możliwością dostarczenia "keyword search result count". Kluczowe funkcje, takie jak analiza trendów BSR i zaawansowane filtrowanie zakresowe/wykluczające, będą wymagały implementacji logiki w samej aplikacji, a nie są bezpośrednimi funkcjami API.



## 5. Plan Integracji API i Strategia Zapytań

Integracja zewnętrznych API do scrapingu będzie kluczowym elementem backendu aplikacji. Poniższy plan opisuje strategię wykorzystania API Bright Data, Axesso i ASIN Data API.

### 5.1. Przypisanie Ról API

*   **ASIN Data API:**
    *   **Rola Główna:** Wyszukiwanie produktów (`type=search`) ze względu na potencjalną dostępność `pagination.total_results` (keyword search result count).
    *   **Rola Główna:** Pobieranie szczegółów produktu (`type=product`), w tym BSR i `date_first_available`.
    *   **Rola Główna:** Pobieranie bestsellerów (`type=bestsellers`) i recenzji (`type=reviews`).
*   **Axesso API:**
    *   **Rola Zapasowa/Uzupełniająca:** Dla wyszukiwania produktów (`/amz/amazon-search-by-keyword`), szczegółów produktu (`/amz/amazon-lookup-product`), bestsellerów (`/amz/amazon-bestseller`) i recenzji (`/amz/amazon-reviews`). Może być używane w przypadku awarii ASIN Data API lub do weryfikacji/uzupełnienia danych.
*   **Bright Data API:**
    *   **Rola Zapasowa/Uzupełniająca:** Podobnie jak Axesso, jako alternatywa dla endpointów wyszukiwania, szczegółów produktu, bestsellerów i recenzji.
    *   **Rola Potencjalna:** Może być preferowane dla specyficznych rynków lub w przypadku potrzeby bardziej zaawansowanej konfiguracji scrapingu (jeśli Web Scraper API oferuje większą elastyczność niż dedykowane endpointy ASIN Data/Axesso).

### 5.2. Strategia Zapytań dla Funkcji Aplikacji

1.  **Live Research (Wyszukiwanie Produktów):**
    *   Frontend wysyła zapytanie z filtrami do backendu aplikacji.
    *   Backend **priorytetowo** wywołuje ASIN Data API (`type=search`) z `search_term` i innymi podstawowymi filtrami (marketplace, kategoria jeśli dotyczy).
    *   Backend sprawdza odpowiedź ASIN Data API pod kątem obecności i wartości `pagination.total_results`. Zapisuje tę wartość.
    *   Backend pobiera pierwszą stronę wyników (listę produktów) z ASIN Data API.
    *   **Fallback (jeśli ASIN Data API zawiedzie lub nie zwróci `total_results`):** Backend próbuje wywołać Axesso (`/amz/amazon-search-by-keyword`) lub Bright Data (`Amazon products search`). Analizuje odpowiedź tych API pod kątem metadanych zawierających całkowitą liczbę wyników (wymaga testów). Jeśli brak, `total_results` pozostaje nieznane.
    *   Backend zwraca pierwszą stronę wyników i (jeśli dostępne) `total_results` do frontendu.
    *   **Paginacja:** Kolejne strony wyników są pobierane na żądanie frontendu, używając odpowiednich parametrów `page` w API.
2.  **Pobieranie Szczegółów Produktu (w tym BSR, Data Publikacji):**
    *   Gdy potrzebne są szczegółowe dane (np. do wyświetlenia w wynikach, śledzenia BSR), backend wywołuje ASIN Data API (`type=product`) z ASIN.
    *   **Fallback:** W razie awarii, próbuje Axesso (`/amz/amazon-lookup-product`) lub Bright Data (`Amazon products`).
    *   Backend zapisuje/aktualizuje dane produktu w lokalnej bazie danych.
3.  **Śledzenie Historii BSR (dla Trendów):**
    *   Regularne zadanie w tle (np. codziennie, używając Celery) iteruje po liście śledzonych ASINów.
    *   Dla każdego ASIN wywołuje endpoint szczegółów produktu (priorytetowo ASIN Data API) w celu pobrania aktualnego BSR.
    *   Zapisuje wartość BSR wraz ze znacznikiem czasu w tabeli `BSRHistory` w lokalnej bazie danych.
    *   Logika obliczania trendów ("Winners/Losers") działa na danych zgromadzonych w tej tabeli.
4.  **Best Sellers:**
    *   Backend (lub frontend) potrzebuje URL odpowiedniej kategorii bestsellerów na Amazon.
    *   Backend wywołuje ASIN Data API (`type=bestsellers`) z tym URL.
    *   **Fallback:** Axesso (`/amz/amazon-bestseller`) lub Bright Data (`Amazon products - Collects products by best sellers category URL`).
    *   Backend przetwarza listę bestsellerów i zwraca do frontendu.
5.  **Recenzje:**
    *   Backend wywołuje ASIN Data API (`type=reviews`) z ASIN produktu.
    *   **Fallback:** Axesso (`/amz/amazon-reviews`) lub Bright Data (`Amazon Reviews`).
    *   Backend przetwarza listę recenzji.

### 5.3. Obsługa Filtrowania Zaawansowanego

*   Większość zaawansowanych filtrów (zakresy ceny, BSR, oceny, recenzji; wykluczanie marek/słów kluczowych) będzie aplikowana **po stronie backendu aplikacji** na danych pobranych z API.
*   **Strategia:**
    1.  Backend pobiera z API szerszy zestaw danych (np. kilka stron wyników wyszukiwania lub pełną listę bestsellerów).
    2.  Dane są zapisywane tymczasowo lub w głównej bazie danych.
    3.  Backend aplikuje logikę filtrowania (np. używając zapytań SQL/ORM z warunkami `WHERE price BETWEEN min AND max`, `WHERE bsr > min_bsr`, `WHERE brand NOT IN (...)` itp.) na pobranym zbiorze danych.
    4.  Przefiltrowane wyniki są zwracane do frontendu.
*   Niektóre API mogą oferować podstawowe filtrowanie w zapytaniu (np. `filter_by_star_rating` w ASIN Data API dla recenzji), co należy wykorzystać, aby zmniejszyć ilość pobieranych danych.

### 5.4. Obsługa Błędów i Redundancja

*   Implementacja mechanizmów `try-except` wokół wywołań API.
*   Logowanie błędów API (kody statusu HTTP, komunikaty błędów).
*   Implementacja logiki ponawiania prób (np. z wykładniczym backoffem) dla błędów przejściowych (np. timeout, błędy serwera 5xx).
*   W przypadku trwałego błędu jednego API, automatyczne przełączanie na API zapasowe (Axesso lub Bright Data) dla danego typu zapytania.
*   Jeśli wszystkie API zawiodą dla krytycznego zapytania, backend powinien zwrócić odpowiedni błąd do frontendu, informując użytkownika.

### 5.5. Zarządzanie Kosztami

*   Śledzenie liczby wywołań dla każdego API.
*   Implementacja mechanizmów cache'owania odpowiedzi API (np. w Redis lub bazie danych) dla często powtarzających się zapytań (np. szczegóły popularnych produktów), aby zminimalizować liczbę wywołań.
*   Potencjalne wprowadzenie limitów użycia dla użytkowników aplikacji (jeśli dotyczy).
*   Monitorowanie kosztów w panelach dostawców API.

### 5.6. Walidacja i Testowanie

*   **Kluczowe:** Przed finalizacją integracji, wykonanie **testowych zapytań** do wszystkich trzech API, zwłaszcza dla endpointów wyszukiwania, w celu:
    *   Potwierdzenia obecności i formatu `pagination.total_results` (lub odpowiednika) w ASIN Data API.
    *   Sprawdzenia, czy Bright Data lub Axesso zwracają całkowitą liczbę wyników w metadanych odpowiedzi.
    *   Potwierdzenia dostępności i formatu `date_first_available` we wszystkich API.
    *   Porównania jakości i kompletności danych zwracanych przez różne API dla tych samych zapytań.
*   Wyniki testów mogą wpłynąć na ostateczne przypisanie ról i strategię zapytań.




## 4. Mapowanie Endpointów API (RapidAPI)

Na podstawie przeglądu API dostępnych na RapidAPI, poniżej znajduje się mapowanie potencjalnie użytecznych endpointów dla aplikacji badania nisz Amazon. Skupiono się na API, które oferują odpowiednie funkcje, posiadają przykładowe odpowiedzi i wykazują akceptowalne metryki (popularność, deklarowana szybkość/sukces).

### 4.1. DataSniper Amazon Scraping API (martinilbi-gI3vZLyv9fW)

To API wydaje się być dobrze oceniane i oferuje szeroki zakres endpointów.

*   **Wyszukiwanie Produktów (Live Research):**
    *   **Endpoint:** Prawdopodobnie `GET /search`.
    *   **Dane (na podstawie typowych API):** ASIN, tytuł, cena, ocena, liczba recenzji, URL, informacja o sponsorowaniu. Należy zweryfikować dokładną strukturę odpowiedzi w Playground.
    *   **Mapowanie:** Odpowiada modułowi "Live Research".
*   **Szczegóły Produktu:**
    *   **Endpoint:** Prawdopodobnie `GET /product` (wymaga ASIN lub URL).
    *   **Dane (na podstawie typowych API):** Szczegółowe dane, w tym BSR, data pierwszej dostępności, cechy, opis, warianty, obrazy. Należy zweryfikować w Playground.
    *   **Mapowanie:** Kluczowe do pobrania BSR, daty publikacji.
*   **Bestsellery (Best Sellers):**
    *   **Endpoint:** Prawdopodobnie `GET /bestsellers` (wymaga URL kategorii).
    *   **Dane (na podstawie typowych API):** Lista bestsellerów z pozycją, ASIN, tytułem, ceną, oceną.
    *   **Mapowanie:** Odpowiada modułowi "Best Sellers".
*   **Recenzje:**
    *   **Endpoint:** Prawdopodobnie `GET /reviews` (wymaga ASIN lub URL).
    *   **Dane (na podstawie typowych API):** Lista recenzji z oceną, treścią, autorem, datą.
    *   **Mapowanie:** Potrzebne do filtrowania/analizy recenzji.
*   **Trendy Sprzedawców (Seller Trends):**
    *   **Endpoint:** Brak bezpośredniego endpointu. Wymaga logiki w aplikacji i regularnego pobierania BSR.
    *   **Mapowanie:** Wymaga implementacji w aplikacji.
*   **Keyword Search Result Count:** Należy zweryfikować w Playground, czy odpowiedź endpointu `/search` zawiera metadane dotyczące całkowitej liczby wyników (np. `pagination.total_results`).

### 4.2. Amazon Scraper (shksaad911)

API z podstawowymi endpointami.

*   **Wyszukiwanie Produktów (Live Research):**
    *   **Endpoint:** `GET /GET Amazon search results`.
    *   **Dane (na podstawie Playground):** Zwraca listę produktów (`results`) z ASIN, tytułem, ceną, oceną (`stars`), liczbą recenzji (`total_reviews`), URL, informacją o sponsorowaniu (`is_sponsored`).
    *   **Mapowanie:** Odpowiada modułowi "Live Research".
*   **Szczegóły Produktu:**
    *   **Endpoint:** `GET /GET Amazon product details` (wymaga ASIN).
    *   **Dane (na podstawie Playground):** Szczegółowe dane, w tym BSR (`rank`), data pierwszej dostępności (`date_first_available`), cechy (`feature_bullets`), opis (`description`), cena (`price`), ocena (`stars`), liczba recenzji (`total_reviews`), obrazy (`images`).
    *   **Mapowanie:** Kluczowe do pobrania BSR, daty publikacji.
*   **Bestsellery (Best Sellers):**
    *   **Endpoint:** Brak dedykowanego endpointu dla bestsellerów.
*   **Recenzje:**
    *   **Endpoint:** `GET /GET Amazon product Reviews` (wymaga ASIN).
    *   **Dane (na podstawie Playground):** Lista recenzji (`reviews`) z oceną (`stars`), tytułem (`title`), treścią (`text`), autorem (`author`), datą (`date`).
    *   **Mapowanie:** Potrzebne do filtrowania/analizy recenzji.
*   **Trendy Sprzedawców (Seller Trends):**
    *   **Endpoint:** Brak bezpośredniego endpointu.
    *   **Mapowanie:** Wymaga implementacji w aplikacji.
*   **Keyword Search Result Count:** Przykładowa odpowiedź dla `/GET Amazon search results` **nie zawiera** informacji o całkowitej liczbie wyników. Zwraca tylko listę produktów na danej stronie.

### 4.3. amazon-data-scraper (abhinavkallungal15)

Kolejne API z podstawowymi funkcjami.

*   **Wyszukiwanie Produktów (Live Research):**
    *   **Endpoint:** `GET /GET Search Results`.
    *   **Dane (na podstawie Playground):** Zwraca listę produktów (`search_result`) z ASIN, tytułem (`title`), ceną (`price`), oceną (`rating`), liczbą recenzji (`reviews`), URL, informacją o sponsorowaniu (`sponsored`).
    *   **Mapowanie:** Odpowiada modułowi "Live Research".
*   **Szczegóły Produktu:**
    *   **Endpoint:** `GET /GET Amazon Product Details` (wymaga ASIN).
    *   **Dane (na podstawie Playground):** Szczegółowe dane, w tym BSR (`bestsellers_rank`), data pierwszej dostępności (`date_first_available`), cechy (`feature_bullets`), opis (`description`), cena (`price`), ocena (`rating`), liczba recenzji (`reviews`), obrazy (`images`).
    *   **Mapowanie:** Kluczowe do pobrania BSR, daty publikacji.
*   **Bestsellery (Best Sellers):**
    *   **Endpoint:** Brak dedykowanego endpointu dla bestsellerów.
*   **Recenzje:**
    *   **Endpoint:** `GET /GET Product Reviews` (wymaga ASIN).
    *   **Dane (na podstawie Playground):** Lista recenzji (`reviews`) z ID, oceną (`rating`), tytułem (`title`), treścią (`review`), autorem (`name`), datą (`date`).
    *   **Mapowanie:** Potrzebne do filtrowania/analizy recenzji.
*   **Trendy Sprzedawców (Seller Trends):**
    *   **Endpoint:** Brak bezpośredniego endpointu.
    *   **Mapowanie:** Wymaga implementacji w aplikacji.
*   **Keyword Search Result Count:** Przykładowa odpowiedź dla `/GET Search Results` **nie zawiera** informacji o całkowitej liczbie wyników. Zwraca tylko listę produktów na danej stronie.

### 4.4. Inne API (np. amazon-scraper-api4, free-amazon-scraper)

Te API również oferują podobne endpointy (wyszukiwanie, szczegóły produktu), ale mogą mieć mniejszą popularność, gorsze metryki lub mniej przejrzystą dokumentację/przykłady. Mogą być brane pod uwagę jako dalsze opcje zapasowe.

## 5. Zaktualizowane Podsumowanie Wstępne (z uwzględnieniem RapidAPI)

*   **Pokrycie Funkcji:** API z RapidAPI (szczególnie DataSniper, Amazon Scraper, amazon-data-scraper) oferują endpointy pokrywające podstawowe potrzeby (wyszukiwanie, szczegóły, recenzje). Niektóre (np. Amazon Scraper, amazon-data-scraper) nie mają dedykowanego endpointu dla bestsellerów, w przeciwieństwie do Bright Data, Axesso i ASIN Data API.
*   **Keyword Search Result Count:** Żadne z przeanalizowanych API na RapidAPI **nie wydaje się** zwracać tej metryki w sposób udokumentowany w przykładach odpowiedzi. **ASIN Data API pozostaje najlepszym kandydatem** do uzyskania tej informacji.
*   **Trendy BSR i Filtrowanie:** Podobnie jak poprzednio, te funkcje będą wymagały implementacji logiki w aplikacji.
*   **SLA i Szybkość:** RapidAPI wyświetla metryki "Avg Latency" i "Success Rate" dla API, co może pomóc w wyborze. DataSniper wydawał się mieć dobre metryki. Należy jednak pamiętać, że są to dane deklarowane lub uśrednione i rzeczywista wydajność może się różnić.

**Wniosek:** Dodanie API z RapidAPI rozszerza wachlarz dostępnych opcji, szczególnie jako źródła zapasowe lub alternatywne. Jednak dla kluczowej metryki "keyword search result count", ASIN Data API nadal wydaje się najbardziej obiecujące. DataSniper może być dobrym, wszechstronnym kandydatem z RapidAPI ze względu na szeroki zakres endpointów i dobre metryki.



## 6. Analiza Porównawcza API (Keyword Search Result Count, SLA, Szybkość)

Poniżej znajduje się analiza porównawcza zidentyfikowanych API pod kątem kluczowych metryk: dostępności "keyword search result count", deklarowanego poziomu usług (SLA/Success Rate) oraz szybkości odpowiedzi (Latency).

### 6.1. Keyword Search Result Count

*   **ASIN Data API:** **Jednoznacznie najlepszy kandydat.** Dokumentacja explicite wspomina o polu `pagination.total_results` w odpowiedzi na zapytanie `type=search`, które ma zawierać całkowitą liczbę wyników.
*   **DataSniper (RapidAPI):** Dokumentacja na RapidAPI nie precyzuje tego. Wymagałoby to testów w Playground, aby sprawdzić, czy metadane odpowiedzi endpointu `/search` zawierają tę informację. Mało prawdopodobne, że jest to standardowa funkcja.
*   **Amazon Scraper (shksaad911, RapidAPI):** Przykładowa odpowiedź dla wyszukiwania **nie zawiera** tej metryki.
*   **amazon-data-scraper (abhinavkallungal15, RapidAPI):** Przykładowa odpowiedź dla wyszukiwania **nie zawiera** tej metryki.
*   **Bright Data:** Dokumentacja nie gwarantuje tej metryki. Wymaga weryfikacji przez testowe zapytania, ale jest to mało prawdopodobne.
*   **Axesso:** Dokumentacja nie gwarantuje tej metryki. Wymaga weryfikacji przez testowe zapytania, ale jest to mało prawdopodobne.

**Wniosek:** Jeśli metryka "keyword search result count" jest absolutnie kluczowa, **ASIN Data API jest preferowanym wyborem** dla funkcji wyszukiwania.

### 6.2. Poziom Usług (SLA / Success Rate)

*   **RapidAPI (ogólnie):** Platforma wyświetla metrykę "Success Rate" dla każdego API, bazując na danych z ostatnich okresów. Jest to użyteczny wskaźnik, ale może się wahać.
    *   **DataSniper:** W momencie przeglądu wykazywał wysoki wskaźnik sukcesu (często >98-99%).
    *   **Amazon Scraper (shksaad911):** Wskaźnik sukcesu był zmienny, czasami niższy (np. ~95%).
    *   **amazon-data-scraper (abhinavkallungal15):** Wskaźnik sukcesu był również zmienny.
    *   *Uwaga:* Należy monitorować te wskaźniki na bieżąco.
*   **Bright Data:** Jako duży, komercyjny dostawca, Bright Data prawdopodobnie oferuje formalne SLA w ramach swoich płatnych planów, gwarantując określony poziom dostępności i sukcesu. Wymaga to sprawdzenia w ich warunkach umowy.
*   **Axesso:** Prawdopodobnie oferuje SLA w ramach płatnych planów. Wymaga sprawdzenia warunków.
*   **ASIN Data API (Traject Data):** Jako komercyjne API, prawdopodobnie oferuje SLA. Wymaga sprawdzenia warunków.

**Wniosek:** Duże, dedykowane platformy jak Bright Data, Axesso, ASIN Data API prawdopodobnie oferują bardziej formalne i stabilne SLA niż mniejsze API na RapidAPI, chociaż DataSniper na RapidAPI wydawał się mieć dobre wskaźniki. Wybór może zależeć od budżetu i wymaganego poziomu niezawodności.

### 6.3. Szybkość Odpowiedzi (Latency)

*   **RapidAPI (ogólnie):** Platforma wyświetla "Avg Latency".
    *   **DataSniper:** Wykazywał relatywnie niską średnią latencję (np. 1-3 sekundy).
    *   **Amazon Scraper (shksaad911):** Latencja była wyższa i bardziej zmienna (np. 5-10+ sekund).
    *   **amazon-data-scraper (abhinavkallungal15):** Podobnie, wyższa i zmienna latencja.
    *   *Uwaga:* Latencja scrapingu Amazon jest z natury zmienna i zależy od wielu czynników (obciążenie Amazon, środki anty-scrapingowe, złożoność zapytania, lokalizacja serwerów API).
*   **Bright Data:** Prawdopodobnie oferuje konkurencyjną szybkość dzięki swojej rozbudowanej infrastrukturze proxy. Deklarowana szybkość może być dostępna w dokumentacji lub materiałach marketingowych.
*   **Axesso:** Informacje o szybkości wymagałyby sprawdzenia w dokumentacji lub testów.
*   **ASIN Data API (Traject Data):** Informacje o szybkości wymagałyby sprawdzenia w dokumentacji lub testów.

**Wniosek:** DataSniper na RapidAPI wydawał się oferować najlepszą deklarowaną szybkość spośród analizowanych tam API. Duże platformy jak Bright Data również powinny być szybkie. Należy jednak przeprowadzić własne testy dla kluczowych zapytań, aby uzyskać realistyczny obraz wydajności w konkretnym przypadku użycia.

### 6.4. Podsumowanie Porównawcze

| API                               | Keyword Search Result Count | SLA / Success Rate (Deklarowane) | Latency (Deklarowane) | Główne Zalety                                       | Główne Wady                                         |
| :-------------------------------- | :-------------------------- | :------------------------------- | :-------------------- | :-------------------------------------------------- | :-------------------------------------------------- |
| **ASIN Data API**                 | **Tak (prawdopodobnie)**    | Prawdopodobnie dobre (komercyjne) | Wymaga testów         | **Zwraca `total_results`**, wszechstronne endpointy | Mniej znane niż Bright Data/Axesso?                 |
| **Bright Data**                   | Nie (wymaga weryfikacji)    | Prawdopodobnie wysokie (SLA)     | Prawdopodobnie niskie | Duża infrastruktura, elastyczność, znana marka    | Może być droższe, `total_results` niepewne         |
| **Axesso**                        | Nie (wymaga weryfikacji)    | Prawdopodobnie dobre (komercyjne) | Wymaga testów         | Dedykowane API Amazon, znana marka                | `total_results` niepewne                            |
| **DataSniper (RapidAPI)**         | Nie (wymaga weryfikacji)    | Wysokie (>98%)                   | Niskie (1-3s)         | Dobre metryki na RapidAPI, szeroki zakres endpointów | `total_results` niepewne, zależność od RapidAPI    |
| **Amazon Scraper (shksaad911)**   | Nie                         | Zmienne (~95%)                   | Wyższe (5-10s+)       | Proste endpointy, darmowy plan                    | Brak `total_results`, brak bestsellerów, niższa SLA/szybkość |
| **amazon-data-scraper (abhinav)** | Nie                         | Zmienne                          | Wyższe                | Proste endpointy, darmowy plan                    | Brak `total_results`, brak bestsellerów, niższa SLA/szybkość |



## 7. Wyniki Testów Subskrypcji Darmowych Planów (RapidAPI)

*   **DataSniper Amazon Scraping API (martinilbi-gI3vZLyv9fW):** Darmowy plan "Basic" **wymaga** podania danych karty kredytowej do aktywacji. Testowanie pominięte zgodnie z instrukcją.
*   **Amazon Scraper (shksaad911):** Wystąpił błąd przeglądarki podczas próby nawigacji do strony API. Testowanie tymczasowo pominięte.
*   **amazon-data-scraper (abhinavkallungal15):** Darmowy plan "Basic" **wymaga** podania danych karty kredytowej do aktywacji. Testowanie pominięte zgodnie z instrukcją.
*   **amazon-scraper-api4 (dulmina):** Darmowy plan "Basic" **nie wymaga** danych karty kredytowej. Subskrypcja udana, ale test endpointu "Search Products" zwrócił błąd 404 ("application not found"). API prawdopodobnie niedziałające.


## Analiza API z RapidAPI (Kontynuacja)

### Amazon Product Info (by Hasan IT LTD.)

*   **Link:** https://rapidapi.com/mahmudulhasandev/api/amazon-product-info2
*   **Darmowy Plan (Basic):**
    *   Limit: 10 zapytań / miesiąc (Hard Limit)
    *   Wymagana karta: Prawdopodobnie **nie** (przycisk "Start Free Plan", FAQ sugeruje wymóg karty dla planów *freemium*).
    *   Koszt dodatkowych zapytań: $0.1 / zapytanie.
*   **Płatne Plany (Ceny / 1000 zapytań):**
    *   Pro ($10/miesiąc): 10,000 zapytań ($1.00 / 1000 zapytań, $0.006 / dodatkowe zapytanie = $6 / 1000 zapytań)
    *   Ultra ($39/miesiąc): 50,000 zapytań ($0.78 / 1000 zapytań, $0.001 / dodatkowe zapytanie = $1 / 1000 zapytań)
    *   Mega ($299/miesiąc): 800,000 zapytań ($0.37 / 1000 zapytań, Hard Limit)
*   **Endpointy:** Search, Product details (by URL, by ASIN), Amazon new release, Best sellers rank.
*   **Uwagi:** Bardzo niski limit darmowych zapytań (10/miesiąc). Ceny za 1000 zapytań w płatnych planach są zróżnicowane.



### Real-time Amazon API (by OpenDataPoint)

*   **Link:** https://rapidapi.com/opendatapointcom/api/real-time-amazon-api
*   **Darmowy Plan (Basic):**
    *   Limit: 50 zapytań / miesiąc (Hard Limit)
    *   Wymagana karta: Prawdopodobnie **nie** (przycisk "Start Free Plan", FAQ sugeruje wymóg karty dla planów *freemium*).
    *   Koszt dodatkowych zapytań: Brak (Hard Limit).
*   **Płatne Plany (Ceny / 1000 zapytań):**
    *   Pro ($24.99/miesiąc): 15,000 zapytań (~$1.67 / 1000 zapytań, $0.003 / dodatkowe zapytanie = $3 / 1000 zapytań)
    *   Ultra ($74.99/miesiąc): 60,000 zapytań (~$1.25 / 1000 zapytań, $0.002 / dodatkowe zapytanie = $2 / 1000 zapytań)
    *   Mega ($149.99/miesiąc): 200,000 zapytań (~$0.75 / 1000 zapytań, $0.001 / dodatkowe zapytanie = $1 / 1000 zapytań)
*   **Endpointy:** Product offers, Products by Category, Search, Product Details.
*   **Uwagi:** Niski limit darmowych zapytań (50/miesiąc), ale wyższy niż poprzednie API. Ceny za 1000 zapytań w płatnych planach są konkurencyjne.



### Amazon ASIN (by Alexander Vikhorev)

*   **Link:** https://rapidapi.com/alexanderxbx/api/amazon-asin
*   **Darmowy Plan (Basic):**
    *   Limit: 100 zapytań / miesiąc (Hard Limit)
    *   Wymagana karta: Prawdopodobnie **nie** (przycisk "Start Free Plan", FAQ sugeruje wymóg karty dla planów *freemium*).
    *   Koszt dodatkowych zapytań: Brak (Hard Limit).
*   **Płatne Plany (Ceny / 1000 zapytań):**
    *   Pro ($3/miesiąc): 5,000 zapytań ($0.60 / 1000 zapytań, $0.002 / dodatkowe zapytanie = $2 / 1000 zapytań)
    *   Ultra ($19/miesiąc): 50,000 zapytań ($0.38 / 1000 zapytań, $0.0015 / dodatkowe zapytanie = $1.5 / 1000 zapytań)
    *   Mega ($29/miesiąc): 150,000 zapytań (~$0.19 / 1000 zapytań, $0.001 / dodatkowe zapytanie = $1 / 1000 zapytań)
*   **Endpointy:** ASIN information.
*   **Uwagi:** Stosunkowo hojny darmowy plan (100/miesiąc). Bardzo niski koszt płatnych planów, zwłaszcza Mega. API wydaje się bardzo proste (tylko jeden endpoint).


*   **Wymagana karta (darmowy plan):** **TAK** (Mimo przycisku "Start Free Plan", strona subskrypcji wymaga danych karty). Testowanie endpointów pominięte.


*   **Wyniki Testów Endpointów (Darmowy Plan):**
    *   **Search:** Test udany (query: "laptop", country: "us"). Zwraca `total_products` (np. "1-16 of over 40,000 results for"), listę produktów z ASIN, tytułem, ceną, ceną oryginalną, ratingiem, liczbą ocen, URL, zdjęciem, liczbą ofert, minimalną ceną oferty, stanem magazynowym (`stock`), flagami `is_advertisment` i `is_best_seller`. **Kluczowa metryka `total_products` jest dostępna.**
    *   Inne endpointy (Product Details, Product offers, Products by Category) - do przetestowania w ramach limitu 50 zapytań.


*   **Wyniki Testów Endpointów (Darmowy Plan):**
    *   **ASIN information:** Test udany (ASIN: B0B8QMW657). Zwraca tytuł, ASIN, URL, obraz, rating (`rate`, `rate_count`), cenę (`price`), cenę katalogową (`list_price`), flagę `discounted`, `marketplaceId`, opcje (`options`), stan magazynowy (`in_stock`), maksymalną ilość zamówienia (`max_order`). **Nie zwraca BSR ani `total_results` (co jest oczekiwane dla endpointu ASIN).**


*   **Cennik (za 1000 zapytań):**
    *   **Basic (Free):** 50 zapytań/miesiąc (Hard Limit). Koszt 1000 zapytań nie dotyczy.
    *   **Pro ($24.99/miesiąc):** 15 000 zapytań w cenie. Dodatkowe 1000 zapytań: $3.00 ($0.003/zapytanie).
    *   **Ultra ($74.99/miesiąc):** 60 000 zapytań w cenie. Dodatkowe 1000 zapytań: $2.00 ($0.002/zapytanie).
    *   **Mega ($149.99/miesiąc):** 200 000 zapytań w cenie. Dodatkowe 1000 zapytań: $1.00 ($0.001/zapytanie).


*   **Cennik (za 1000 zapytań):**
    *   **Basic (Free):** 100 zapytań/miesiąc (Hard Limit). Koszt 1000 zapytań nie dotyczy.
    *   **Pro ($3.00/miesiąc):** 5 000 zapytań w cenie. Dodatkowe 1000 zapytań: $2.00 ($0.002/zapytanie).
    *   **Ultra ($19.00/miesiąc):** 50 000 zapytań w cenie. Dodatkowe 1000 zapytań: $1.50 ($0.0015/zapytanie).
    *   **Mega ($29.00/miesiąc):** 150 000 zapytań w cenie. Dodatkowe 1000 zapytań: $1.00 ($0.001/zapytanie).



## Podsumowanie i Rekomendacje

Na podstawie przeprowadzonej analizy API do scrapingu Amazon dostępnych na RapidAPI, poniżej przedstawiono podsumowanie i rekomendacje:

*   **Real-time Amazon API (by opendatapointcom):**
    *   **Funkcjonalność:** Oferuje szeroki zakres endpointów, w tym wyszukiwanie (`Search`), szczegóły produktu (`Product Details`), oferty (`Product offers`) i produkty wg kategorii (`Products by Category`). Testy endpointu `Search` potwierdziły zwracanie kluczowych danych, w tym `total_products`, co jest istotne dla analizy nisz. Darmowy plan (50 zapytań/miesiąc) pozwala na podstawowe testy bez karty kredytowej.
    *   **Cennik (za 1000 zapytań):** Zaczyna się od $3.00 w planie Pro, malejąc do $1.00 w planie Mega. Stosunkowo przystępny cenowo przy większej liczbie zapytań.
    *   **Rekomendacja:** **Główny kandydat.** Wydaje się najbardziej kompletnym i funkcjonalnym API spośród przetestowanych, które nie wymaga karty kredytowej do rozpoczęcia testów. Zwraca kluczową metrykę `total_products`.

*   **Amazon ASIN (by alexanderxbx):**
    *   **Funkcjonalność:** Skupia się na pobieraniu szczegółowych informacji o produkcie na podstawie ASIN. Testy potwierdziły zwracanie danych takich jak tytuł, cena, rating, stan magazynowy. Nie zwraca `total_results` ani BSR (co jest zgodne z przeznaczeniem API). Darmowy plan (100 zapytań/miesiąc) dostępny bez karty.
    *   **Cennik (za 1000 zapytań):** Zaczyna się od $2.00 w planie Pro, malejąc do $1.00 w planie Mega. Bardzo konkurencyjny cenowo.
    *   **Rekomendacja:** **Dobre uzupełnienie.** Może być przydatne do pobierania szczegółowych danych o konkretnych produktach, ale nie nadaje się do wyszukiwania nisz ze względu na brak funkcji wyszukiwania i `total_results`.

*   **Amazon Product Info (by mahmudulhasandev):**
    *   **Funkcjonalność:** Nie udało się przetestować endpointów, ponieważ mimo istnienia darmowego planu (10 zapytań/miesiąc), proces subskrypcji **wymaga podania danych karty kredytowej**.
    *   **Cennik (za 1000 zapytań):** W planie Pro kosztuje $6.00 ($0.006/zapytanie), w Ultra $1.00 ($0.001/zapytanie). Opcja darmowa ma bardzo wysoki koszt nadwyżki ($0.1/zapytanie).
    *   **Rekomendacja:** **Odrzucić lub testować z kartą.** Wymóg karty kredytowej na starcie jest barierą. Funkcjonalność niezweryfikowana.

**Wnioski:**

Najbardziej obiecującym API do budowy aplikacji do wyszukiwania nisz wydaje się **Real-time Amazon API**, ze względu na dostępność endpointu `Search` zwracającego `total_products` oraz możliwość rozpoczęcia testów bez karty kredytowej. **Amazon ASIN** może służyć jako tanie, uzupełniające źródło szczegółowych danych o produktach. Należy unikać **Amazon Product Info**, chyba że jesteś gotów podać dane karty kredytowej w celu przetestowania jego funkcjonalności.
