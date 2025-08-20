// Copyright © 2025 Dimitry Lyubichev / beton-guide.com
// Licensed under the MIT License.
// You may freely use, modify, and distribute this code under the terms of the MIT License.
// See the LICENSE file in the project root for details.

document.addEventListener("DOMContentLoaded", function () {
    const hauteurInput = document.getElementById("hauteur");
    const totalElement = document.getElementById("total_g");
    const hauteurSelect = document.querySelector(".calcul-charge-llinteau_select_hauteur");
    const epaisseurSelect = document.querySelector(".calcul-charge-llinteau_select");

    function calculateTotal() {
        let total = 0;

        const hauteur = parseFloat(hauteurInput.value) || 0;
        const hauteurInMeters = hauteurSelect.value === "cm" ? hauteur / 100 : hauteur;

        if (hauteur > 0) {
            document.querySelectorAll(".calcul-charge-llinteau").forEach(div => {
                // thickness input IDs are in English
                const epaisseurInput = div.querySelector(`[id^="thickness_"]`);

                // weight class names remain in French (from your HTML)
                const valeurCorrespondanteElement = div.querySelector(`
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_beton_non_arme, 
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_beton_arme, 
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_beton_leger, 
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_brique_pleine,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_beton_cellulaire,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_brique_creuse,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_brique_silico_calcaire,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_bloc_beton_creux,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_bloc_beton_plein,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_pierre_calcaire,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_granite,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_gres,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_marbre,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_bois_massif,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_sapin_pin,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_panneaux_osb_contreplaque,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_enduit_ciment,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_enduit_platre,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_platre_carreau_plaque,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_terre_crue,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_paille_compressee,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_isolant_laine_de_roche,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_isolant_laine_de_verre,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_polystyrene_expanse,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_polystyrene_extrude,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_polyurethane,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_liege_expanse,
                    .calcul-charge-llinteau_text.calcul-charge-llinteau_fibre_de_bois
                `);

                if (epaisseurInput && valeurCorrespondanteElement) {
                    const epaisseur = parseFloat(epaisseurInput.value) || 0;
                    const epaisseurInCm = epaisseurSelect.value === "m" ? epaisseur * 100 : epaisseur;
                    const valeurCorrespondante = parseFloat(valeurCorrespondanteElement.textContent) || 0;
                    total += epaisseurInCm * valeurCorrespondante * hauteurInMeters;
                }
            });
        }

        totalElement.textContent = total.toFixed(2);
        document.querySelector('.total_g_avec_coeff').innerHTML = (total * 1.35).toFixed(2);
    }

    document.querySelectorAll(".calcul-charge-llinteau_value").forEach(input => {
        input.addEventListener("input", calculateTotal);
    });
    epaisseurSelect.addEventListener("change", calculateTotal);
    hauteurSelect.addEventListener("change", calculateTotal);
    hauteurInput.addEventListener("input", calculateTotal);

    calculateTotal();
});
