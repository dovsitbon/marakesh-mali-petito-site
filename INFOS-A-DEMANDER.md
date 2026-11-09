# Infos à demander à Mali (Marakesh Mali Petito)

Tout ce qui suit est soit masqué sur le site (valeur `null` dans `data/*.json`), soit affiché à titre provisoire d'après son Instagram (récupéré le 9 novembre 2026). Une fois les réponses reçues : modifier le fichier indiqué, puis pousser sur GitHub (Vercel redéploie seul).

## À confirmer en priorité

1. **Les formules et leurs prix** (`data/formules.json`). Affichés aujourd'hui « à partir de », d'après ses publications :
   - cérémonie complète : à partir de 2 999 ₪ (reel « מבצע מיוחד », peut-être une offre limitée) ;
   - formule maison : 2 500 ₪ ;
   - bar et bat-mitsva : à partir de 2 500 ₪ ;
   - fête marocaine à la maison : 1 699 ₪ (10 caftans femmes, 10 caftans + tarbouches hommes, tapis, sinias, décor ; DJ en option).
   → Ces prix sont-ils toujours valables ? Veut-elle les afficher ? Que contient exactement chaque formule (nombre de tenues, chameaux, charrettes, portes…) ?
2. **Régions couvertes** (`data/infos.json → regions`) : partout en Israël ? Frais de déplacement ?
3. **Adresse de l'atelier et horaires** (`studioAddress`, `hours`) : d'après un reel de 2024, « ראשון לציון מערב ». Essayages sur rendez-vous ?
4. **Accord des mariées** pour apparaître sur le site (`data/realisations.json`, initiales seulement : O & A, S & O, K & S, Y & M, M & A, O & E, O & T, D & O, N & L) et, pour chaque couple, le **lieu** et le **nombre d'invités**.
5. **Accord des célébrités** pour le bloc « סלבס » : Eden Harel et Oded Menashe (bat-mitsva d'Abigaïl), Itay Levi, Nir Klinger. Leurs photos et paroles viennent de stories publiques déjà repartagées par Mali.

## Pour compléter le site

6. **L'histoire de la famille et de l'atelier** (30 ans) : comment tout a commencé, le rôle de Liel Petito (fille ?), qui coud et brode. Une **vraie photo portrait** de Mali à l'atelier (aujourd'hui : capture d'un plateau TV).
7. **Les liens des reportages** d'Aroutz 12 et Aroutz 14 en bonne qualité (aujourd'hui : extraits de ses reels, 50 s chacun) + le lien de l'article Reshet 13 (« שנות ה־90 ») et le nom du magazine de l'interview.
8. **Le nombre de cérémonies réalisées** (`data/stats.json → ceremonies`) : affiché dans la bande de preuves dès qu'il est rempli.
9. **De vrais avis clientes** supplémentaires (`data/avis.json`) : aujourd'hui deux avis réels (message WhatsApp de Dalia, mère de la mariée Keren ; story d'Eden Harel). Les vidéos de témoignages (story « המלצות ») peuvent aussi être ajoutées.
10. **Photos et vidéos en haute qualité** : tenues seules sur mannequin (mariée, marié, famille, enfants), atelier, décor installé, le jour du henné. Beaucoup de stories sont en 640 px. Dossiers prévus : `assets/a-recevoir/photos` et `assets/a-recevoir/videos`.
11. **Le logo en fichier source** (rosace dorée + « MARRAKESH ») : il est redessiné en SVG dans `components/Logo.tsx`, à remplacer par l'original s'il existe.
12. **Les noms des modèles de tenues** (`data/tenues.json`) : noms descriptifs provisoires.
13. **Mentions légales** : raison sociale et numéro d'entreprise (עוסק).
14. **Acompte** : montant et moyen de paiement si elle veut le paiement en ligne (prévu dans `lib/payment.ts`, désactivé).
15. **Orthographe de la marque en latin** : Instagram « marakesh », logo « MARRAKESH ». Laquelle garder sur le site ?

## Les deux autres liens de sa bio (vérifiés)

Ce sont deux liens WhatsApp : « הודעה למלי » (050-883-8881) et « הודעה לליאל » (050-217-7042), en plus du numéro de l'entreprise (053-344-4862). Les trois numéros sont sur le site (contact et pied de page).
