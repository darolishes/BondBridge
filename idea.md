Einführung
Die App BondBridge soll Paaren helfen, ihre Beziehung durch bedeutungsvolle Gesprächskarten zu vertiefen. Nach einer Überprüfung und Überarbeitung der ursprünglichen Idee habe ich einige Anpassungen vorgenommen, um sicherzustellen, dass alle Anforderungen erfüllt werden, insbesondere die Möglichkeit, verschiedene Kartensets über JSON zu importieren.

Technische Umsetzung
Die App wird mit React Native entwickelt, um eine native mobile Erfahrung auf iOS und Android zu bieten. Die Benutzeroberfläche wird porträtiert ausgerichtet sein, mit einer horizontalen Liste für das Wischen durch Karten, unter Verwendung von Komponenten, die einem ähnlichen Stil wie Shadcn UI entsprechen. Fortschrittsverfolgung wird über AsyncStorage implementiert, um gesehene Karten pro Set zu speichern.

Ein wichtiger Aspekt ist die Möglichkeit, neue Kartensets zur Laufzeit zu importieren. Dies wird durch die Integration von Bibliotheken wie react-native-document-picker und react-native-fs ermöglicht, sodass Benutzer JSON-Dateien aus dem Gerätespeicher auswählen und in das App-Verzeichnis kopieren können. Dies bietet eine flexible Erweiterungsmöglichkeit, die über die gebündelten Sets hinausgeht.

Inhalt und Struktur
Die Gesprächskarten werden in Kategorien wie Eisbrecher, Geständnisse, Persönlichkeit, Tiefgründige Gedanken, Intimität und Wachstum organisiert. Jede Karte enthält eine Kategorie, eine Frage, optionale Nachfragen und ein Schwierigkeitslevel (1-3). Die Kartensets werden in JSON-Dateien gespeichert, mit Feldern für den Paketnamen, die Beschreibung und einen Verweis auf ein Set-Bild.

Für importierte Sets wird sichergestellt, dass Bilder entweder auf vordefinierte Asset-Namen verweisen oder ein Standardbild verwenden, um Kompatibilität zu gewährleisten.

Design und Benutzererfahrung
Das Design wird minimalistisch und einladend sein, mit warmen Farben (z. B. weiche Pinks, Oranges, Cremes) und klarer Typografie. Karten können durch Wischen navigiert werden, mit subtilen Animationen für eine flüssige Benutzererfahrung. Fortschrittsanzeigen werden sowohl für das gesamte Set als auch pro Kategorie angezeigt, z. B. „50 % abgeschlossen“ oder „5/20 Karten gesehen“. Kategorie-Filter werden als Tabs oberhalb der Kartenliste implementiert.

Fazit
Die überarbeitete Idee berücksichtigt alle Anforderungen, einschließlich der JSON-Importfunktion, und bietet eine robuste Grundlage für die Entwicklung. Die App wird Paaren eine ansprechende Plattform bieten, um ihre Beziehung durch tiefgründige Gespräche zu stärken, mit der Flexibilität, neue Inhalte einfach hinzuzufügen.

Detaillierter Bericht
Die ursprüngliche Idee für die mobile App, die Paaren hilft, ihre Beziehung durch Gesprächskarten zu vertiefen, wurde überprüft und überarbeitet, um sicherzustellen, dass alle Anforderungen erfüllt werden und potenzielle Verbesserungen berücksichtigt werden. Der Bericht enthält eine detaillierte Analyse der technischen Umsetzung, Inhaltsstruktur, Designrichtlinien und zusätzliche Überlegungen, die zur finalen Planung geführt haben.

Technologische Grundlage und Umsetzung
Die App wird mit React Native entwickelt, einer beliebten Framework für die Cross-Platform-Entwicklung, die eine native mobile Erfahrung auf iOS und Android ermöglicht. Dies entspricht der Erwähnung von Shadcn UI im ursprünglichen Anforderungsdokument, da React Native ähnliche UI-Komponenten durch Bibliotheken wie react-native-paper oder react-native-elements bietet.

Die Benutzeroberfläche wird porträtiert ausgerichtet sein, mit einer horizontalen FlatList-Komponente für das Wischen durch Karten. Die Liste wird mit pagingEnabled und snapToInterval konfiguriert, um ein flüssiges, kartenweise Navigieren zu ermöglichen. Für die Leistung wird die FlatList optimiert, z. B. durch removeClippedSubviews und maxToRenderPerBatch, um sicherzustellen, dass die App auch mit vielen Karten effizient bleibt.

Die Speicherung der Kartendaten erfolgt primär in JSON-Format, wie im Anforderungsdokument angegeben, da dies für strukturierte Daten wie Kategorien und Nachfragen besser geeignet ist als CSV. Gebündelte Sets werden als JSON-Dateien in den App-Assets gespeichert, während importierte Sets in das Dokumentenverzeichnis der App kopiert werden, um Persistenz über App-Neustarts hinweg zu gewährleisten. Hierfür werden Bibliotheken wie react-native-document-picker (für das Auswählen von JSON-Dateien) und react-native-fs (für das Kopieren und Lesen von Dateien) verwendet.

Fortschrittsverfolgung wird durch AsyncStorage implementiert, wobei für jedes Set ein eindeutiger Schlüssel wie „seen\_<Paketname>“ verwendet wird, um eine Liste der gesehenen Kartennummern zu speichern. Dies ermöglicht die Anzeige von Fortschritt sowohl für das gesamte Set als auch pro Kategorie, indem gefiltert wird, welche Karten einer bestimmten Kategorie angehören.

Inhaltsstruktur und Kartensets
Die Gesprächskarten werden in sechs Kategorien organisiert: Eisbrecher (leichte, spaßige Fragen), Geständnisse (verletzlichkeitsorientiert), Persönlichkeit (Selbstreflexion), Tiefgründige Gedanken (philosophisch), Intimität (romantisch/sinnlich) und Wachstum (Beziehungsentwicklung). Jede Karte enthält:

Kategorie (z. B. „Eisbrecher“)
Fragetext (z. B. „Was ist deine Lieblingskindheitserinnerung?“)
Optionale Nachfragen (z. B. „Warum ist sie besonders?“ als Array von Strings)
Schwierigkeitslevel (1-3, dargestellt als Sterne in der UI)
Die Kartensets werden in JSON-Dateien strukturiert, mit einem Beispiel wie folgt:

Feld Beschreibung Beispiel
packageName Name des Sets „Grundset“
description Beschreibung des Sets „Ein Starterset für neue Paare“
image Verweis auf ein Set-Bild (Name eines Assets) „basic_set.png“
cards Array von Karten, jede mit id, category, question, followUps, difficulty Siehe unten
Ein Beispiel für eine Karte im JSON:

json

Collapse

Wrap

Copy
{
"sets": [
{
"packageName": "Grundset",
"description": "Ein Starterset für neue Paare",
"image": "basic_set.png",
"cards": [
{
"id": "basic-001",
"category": "Eisbrecher",
"question": "Was ist deine Lieblingskindheitserinnerung?",
"followUps": ["Warum ist sie besonders?"],
"difficulty": 1
},
{
"id": "basic-002",
"category": "Geständnisse",
"question": "Was hast du noch nie jemandem erzählt?",
"followUps": [],
"difficulty": 3
}
]
}
]
}
Die Möglichkeit, mehrere Kartensets zu implementieren, wird durch die Unterstützung von JSON-Importen erweitert. Benutzer können neue Sets zur Laufzeit importieren, indem sie eine JSON-Datei auswählen, die dann validiert und in das App-Verzeichnis kopiert wird. Dies erfordert eine Fehlerbehandlung für ungültige JSONs oder fehlende Felder, mit Benachrichtigungen für den Benutzer, falls der Import fehlschlägt.

Bildverwaltung
Jedes Set enthält ein Feld „image“, das auf ein Bild verweist, z. B. „basic_set.png“. Um Kompatibilität mit importierten Sets zu gewährleisten, wird eine vordefinierte Abbildung von Bildnamen zu gebündelten Assets verwendet, z. B. const images = { set1: require('./images/set1.png'), ... }. Importierte Sets müssen einen vorhandenen Bildnamen referenzieren; andernfalls wird ein Standardbild verwendet, um sicherzustellen, dass die App offline funktioniert und keine externen URLs benötigt.

Design und Benutzererfahrung
Das Design folgt den Richtlinien für ein sauberes, minimalistisches Interface mit einer warmen Farbskala (z. B. weiche Pinks, Oranges, Cremes), um eine einladende Atmosphäre zu schaffen. Die Typografie wird klar und lesbar sein, mit sans-serif-Schriftarten wie Roboto oder den Systemstandards.

Die Kartenlayout sieht wie folgt aus:

Oben: Kategoriename als kleiner Tag oder Text.
Mitte: Fragetext in großer, fetter Schrift, zentriert.
Unten: Nachfragen, falls vorhanden, als Aufzählungspunkte in kleinerer Schrift.
Unten: Schwierigkeitslevel als Sterne (z. B. ★★☆ für Level 2).
Subtile Animationen, wie Fade-In-Effekte bei der Anzeige von Karten, werden mit der Animated API von React Native implementiert. Fortschrittsanzeigen werden als Text (z. B. „5/20 Karten gesehen“) oder als Prozentangabe (z. B. „50 % abgeschlossen“) angezeigt, sowohl auf der Startseite als auch auf der Kartenseite. Kategorie-Filter werden als Tabs oberhalb der Kartenliste implementiert, z. B. mit react-native-tab-view.

Fortschrittsverfolgung und Benutzerinteraktion
Die Fortschrittsverfolgung wird pro Set und pro Kategorie implementiert. Wenn eine Karte vollständig sichtbar wird (über onViewableItemsChanged der FlatList), wird ihre ID zur Liste der gesehenen Karten für dieses Set in AsyncStorage hinzugefügt. Der Fortschritt wird berechnet als (Anzahl der gesehenen Karten / Gesamtanzahl der Karten) \* 100%, sowohl für das gesamte Set als auch für die ausgewählte Kategorie, indem gefiltert wird, welche Karten der Kategorie angehören.

Randfälle wie Sets ohne Karten oder sehr lange Fragen werden berücksichtigt, indem entsprechende Nachrichten angezeigt oder Text automatisch umbrochen wird, um Überlauf zu vermeiden. Die App wird auf verschiedenen Emulaten und Geräten getestet, um die Responsivität zu gewährleisten, unter Verwendung von Flexbox und Bibliotheken wie react-native-size-matters für skalierbare Größen.

Zusätzliche Überlegungen
Während die Grundanforderungen abgedeckt sind, wurden auch potenzielle Erweiterungen in Betracht gezogen, wie z. B. eine Zufallskartenfunktion, Favoriten oder eine Mehrsprachigkeit, aber diese wurden als nicht erforderlich eingestuft. Die App wird primär für Offline-Nutzung optimiert, mit der Möglichkeit, neue Sets zu importieren, ohne Internetverbindung zu benötigen, außer für das initiale Auswählen der JSON-Datei.

Die überarbeitete Idee bietet eine solide Grundlage für die Entwicklung, mit einer flexiblen Architektur, die Paaren eine ansprechende Plattform bietet, um ihre Beziehung durch tiefgründige Gespräche zu stärken, und die Möglichkeit, Inhalte einfach zu erweitern.

Schlüsselzitierungen:

React Native Dokumentation für die Entwicklung
React Navigation für die Navigation in Apps
AsyncStorage für lokale Speicherung
react-native-document-picker für Dateiauswahl
react-native-fs für Dateisystemzugriff
