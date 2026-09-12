# Carnet de cybersécurité

Bonjour, je m'appelle Eg Elisée Lathro. Je suis en 3ᵉ année de Bachelor Ingénierie et
Cybersécurité à l'EFREI Paris, et je cherche une alternance en SOC ou en administration système et sécurité pour septembre 2026.

Ce dépôt contient mon carnet en ligne. J'y publie les rapports que je rends en cours, mes
write-ups HackTheBox et l'avancement de mes certifications. L'idée n'est pas de montrer
une liste d'outils, mais de rendre lisible ma façon de travailler : comment je cherche,
ce que je conclus, et ce que je referais autrement.

**Le site : https://e-lee-e.github.io/my-online-portfolio/**

## Ce que vous y trouverez

### Projets et TP

Douze rapports rendus pendant l'année 2025-2026, environ 180 pages, consultables
directement dans le navigateur sans rien télécharger. Ils se répartissent en trois
familles.

**Sécurité offensive.** Un rapport d'audit complet sur une banque en ligne fictive,
livré au format professionnel, avec synthèse pour une direction non technique et plan de
remédiation. Puis quatre ateliers d'ethical hacking : élévation de privilèges sous Linux,
recherche d'exploits et Metasploit, analyse de trafic réseau, et cryptographie appliquée
aux chaînes de certification.

**Défense et supervision.** Le durcissement d'un serveur web avec ModSecurity et
Fail2Ban, une chaîne de supervision Zabbix et GLPI déployée sur trois machines, et la
conception complète de l'infrastructure d'une entreprise de télémédecine, matrice de
risques et plan de reprise d'activité compris.

**Windows Server et Active Directory.** Quatre ateliers, du déploiement d'un contrôleur
de domaine jusqu'au modèle AGDLP pour l'attribution des permissions.

Si vous n'ouvrez qu'un document, prenez l'audit bancaire. C'est le seul où l'on voit à la
fois l'exploitation technique et la restitution à quelqu'un qui n'est pas technicien, ce
qui est la partie difficile du métier.

### Aventure HackTheBox

Le parcours Starting Point terminé, du Tier 0 au Tier 2, et les write-ups des machines sur
lesquelles je rédige un rapport détaillé : Cap, Unified, TwoMillion, Support, Orion et
Nexus. Chaque page commence par un résumé de la chaîne d'attaque, pour rester utile même
si vous ne comptez pas faire la machine.

Certains rapports sont encore en cours de rédaction, c'est indiqué sur les pages
concernées.

### Certifications

Google Cybersecurity Professional Certificate et Introduction to Cybersecurity de Cisco
sont validés. Le CEH est prévu au cours de ma formation.

## Sur le code du site

Site statique écrit avec l'aide d'IA, sans framework ni étape de compilation. HTML, une feuille
de style, un script d'une centaine de lignes. Thème sombre inspiré de Notion.

Le site fonctionne entièrement sans JavaScript : les aperçus de documents reposent sur
l'élément `<details>` natif, et le script se contente de différer le chargement des PDF
pour ne pas télécharger vingt mégaoctets à l'ouverture de la page.

Si vous voulez le faire tourner en local, un serveur suffit. Ouvrir les fichiers par
double-clic ne marchera pas, le navigateur bloque les requêtes en `file://`.

```bash
python3 -m http.server 8000
```

## Deux précisions

Les rapports publiés sont des travaux d'étudiant, réalisés en laboratoire ou sur des
plateformes d'entraînement prévues pour cela. Les adresses IP, identifiants et noms de
domaine qu'ils contiennent appartiennent à ces maquettes et n'existent nulle part
ailleurs.

Les write-ups du site sont les miens. Je tiens une bonne partie d'inspiration de la part des documentations de HackTheBox et de rechercheurs en sécurité informatiques. Les documents officiels de HackTheBox appartiennent
à HackTheBox et ne sont pas redistribués ici.

## Me contacter

Écrivez-moi si vous voulez discuter d'un rapport, d'un write-up, ou d'une alternance. Je
réponds plus vite par mail.

- [LinkedIn](https://www.linkedin.com/in/eg-elisee-lathro/)
- elisee.lathro@gmail.com
