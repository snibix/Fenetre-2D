import React, { useState } from "react";
import { Layer, Stage } from "react-konva";
import ArchedWindow from "./components/ArchedWindow/ArchedWindow";
import Window from "./components/Window/Window";

const HomePage: React.FC = () => {
  const [formData, setFormData] = useState({
    windowType: "arched",
    windowWidth: 350,
    windowHeight: 400,
    borderColor: "#ffffff",
    strokeWidth: 2,
    strokeColor: "#000000",
    innerStrokeColor: "#000000",
    innerFillColor: "#cceeff",
    innerMargin: 10,
    windowBorderX: 250,
    windowBorderY: 100,
    horizontalOpeningDirection: undefined,
    verticalOpeningDirection: undefined,

    hasSoubassement: false,
    typeSoubassement: "",
    hasSoubassementVitre: false,
    soubassementVitreMargin: 10,
    baseHeight: 80,
    soubassementMargin: 15,
    soubassementMarginPersonnalisee: 15,
    soubassementColor: "#ffffff",
    soubassementStrokeWidth: 2,

    showPetitsBois: false,
    petitsBoisCountX: 2,
    petitsBoisCountY: 2,
    petitsBoisStrokeColor: "#000000",
    petitsBoisStrokeWidth: 2,
    petitsBoisStyle: "standard",

    hasTraverse: false,
    traverseCountX: 1,
    traverseCountY: 1,
    traverseWidth: 6,

    arcType: "leger",

    showWidthCote: true,
    showHeightCote: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  // Fonction spéciale pour gérer le changement de type de soubassement
  const handleSoubassementTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const typeSelected = e.target.value;

    setFormData((prev) => {
      let newMargin;
      let hasVitre = false;
      const hasSoubassement = typeSelected !== "";

      // Définir les propriétés selon le type sélectionné
      if (typeSelected === "avec_marge") {
        // Restaurer la marge personnalisée sauvegardée
        newMargin = prev.soubassementMarginPersonnalisee;
      } else if (typeSelected === "plein" || typeSelected === "vitre") {
        newMargin = 0;
      } else {
        newMargin = prev.soubassementMarginPersonnalisee;
      }

      if (typeSelected === "vitre") {
        hasVitre = true;
      }

      return {
        ...prev,
        typeSoubassement: typeSelected,
        hasSoubassement: hasSoubassement,
        hasSoubassementVitre: hasVitre,
        soubassementMargin: newMargin,
      };
    });
  };

  // Fonction spéciale pour gérer le changement de la marge personnalisée
  const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMargin = Number(e.target.value);

    setFormData((prev) => ({
      ...prev,
      soubassementMargin: newMargin,
      soubassementMarginPersonnalisee: newMargin,
    }));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 col-lg-3">
          <div className="card">
            <div className="card-header">
              <h5>Configuration</h5>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Type de fenêtre</label>
                  <select
                    className="form-select form-select-sm"
                    name="windowType"
                    value={formData.windowType}
                    onChange={handleChange}
                  >
                    <option value="normal">Fenêtre normale (carrée)</option>
                    <option value="arched">Fenêtre cintrée</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Largeur</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    name="windowWidth"
                    value={formData.windowWidth}
                    onChange={handleChange}
                    max={540}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Hauteur</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    name="windowHeight"
                    value={formData.windowHeight}
                    onChange={handleChange}
                    max={430}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Couleur bordure</label>
                  <input
                    type="color"
                    className="form-control form-control-color"
                    name="borderColor"
                    value={formData.borderColor}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Couleur vitre</label>
                  <input
                    type="color"
                    className="form-control form-control-color"
                    name="innerFillColor"
                    value={formData.innerFillColor}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Marge intérieure</label>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    name="innerMargin"
                    value={formData.innerMargin}
                    onChange={handleChange}
                  />
                </div>

                {formData.windowType === "arched" && (
                  <div className="mb-3">
                    <label className="form-label">Type d'arc</label>
                    <select
                      className="form-select form-select-sm"
                      name="arcType"
                      value={formData.arcType}
                      onChange={handleChange}
                    >
                      <option value="leger">Léger</option>
                      <option value="plein-cintre">Plein-cintre</option>
                    </select>
                  </div>
                )}

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="showPetitsBois"
                    checked={formData.showPetitsBois}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Petits bois</label>
                </div>

                {formData.showPetitsBois && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Petits bois X</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        name="petitsBoisCountX"
                        value={formData.petitsBoisCountX}
                        onChange={handleChange}
                        min="0"
                        max="10"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Petits bois Y</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        name="petitsBoisCountY"
                        value={formData.petitsBoisCountY}
                        onChange={handleChange}
                        min="0"
                        max="10"
                      />
                    </div>
                  </>
                )}

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="hasTraverse"
                    checked={formData.hasTraverse}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Traverse</label>
                </div>

                {/* Options activé seulement si traverse est visibles*/}
                {formData.hasTraverse && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">
                        Traverses Horizontales :
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        name="traverseCountY"
                        value={formData.traverseCountY}
                        onChange={handleChange}
                        min="0"
                        max="10"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Traverses verticales :
                      </label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        name="traverseCountX"
                        value={formData.traverseCountX}
                        onChange={handleChange}
                        min="0"
                        max="10"
                      />
                    </div>
                  </>
                )}

                {/* Options visibles seulement si traverse est activée */}
                {formData.hasTraverse && formData.windowType === "arched" && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Largeur traverse</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        name="traverseWidth"
                        value={formData.traverseWidth}
                        onChange={handleChange}
                        min="2"
                        max="20"
                      />
                    </div>
                  </>
                )}

                {/*Select pour le type de soubassement */}
                <div className="mb-3">
                  <label className="form-label">Type de Soubassement</label>
                  <select
                    className="form-select form-select-sm"
                    name="typeSoubassement"
                    value={formData.typeSoubassement}
                    onChange={handleSoubassementTypeChange}
                  >
                    <option value="">Aucun soubassement</option>
                    <option value="avec_marge">Soubassement</option>
                    <option value="plein">Soubassement Plein</option>
                    <option value="vitre">Soubassement Vitré</option>
                  </select>
                </div>

                {/* Options du soubassement visibles seulement si un type est sélectionné */}
                {formData.typeSoubassement && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Hauteur soubassement</label>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        name="soubassementHeight"
                        value={formData.baseHeight}
                        onChange={handleChange}
                      />
                    </div>

                    {formData.typeSoubassement === "plein" ||
                      (formData.typeSoubassement === "vitre" &&
                        (formData.soubassementStrokeWidth = 1))}
                    {formData.typeSoubassement === "avec_marge" && (
                      <div className="mb-3">
                        <label className="form-label">Marge Soubassement</label>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          name="soubassementMargin"
                          value={formData.soubassementMargin}
                          onChange={handleMarginChange}
                        />
                      </div>
                    )}
                  </>
                )}

                <div className="mb-3">
                  <label className="form-label">Ouverture horizontale</label>
                  <select
                    className="form-select form-select-sm"
                    name="horizontalOpeningDirection"
                    value={formData.horizontalOpeningDirection || ""}
                    onChange={handleChange}
                  >
                    <option value="">Aucune</option>
                    <option value="left">Gauche</option>
                    <option value="right">Droite</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Ouverture verticale</label>
                  <select
                    className="form-select form-select-sm"
                    name="verticalOpeningDirection"
                    value={formData.verticalOpeningDirection || ""}
                    onChange={handleChange}
                  >
                    <option value="">Aucune</option>
                    <option value="up">Haut</option>
                    <option value="down">Bas</option>
                  </select>
                </div>

                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="showWidthCote"
                    checked={formData.showWidthCote}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Côte largeur</label>
                </div>

                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="showHeightCote"
                    checked={formData.showHeightCote}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Côte hauteur</label>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-8 col-lg-9">
          <div className="card">
            <div className="card-header">
              <h5>
                {formData.windowType === "arched"
                  ? "Fenêtre cintrée - Version Konva"
                  : "Fenêtre normale - Version Konva"}
              </h5>
            </div>
            <div className="card-body position-fixed">
              <Stage width={800} height={600}>
                <Layer>
                  {formData.windowType === "arched" ? (
                    <ArchedWindow
                      windowWidth={formData.windowWidth}
                      windowHeight={formData.windowHeight}
                      borderColor={formData.borderColor}
                      strokeWidth={formData.strokeWidth}
                      strokeColor={formData.strokeColor}
                      innerStrokeColor={formData.innerStrokeColor}
                      innerFillColor={formData.innerFillColor}
                      innerMargin={formData.innerMargin}
                      windowBorderX={formData.windowBorderX}
                      windowBorderY={formData.windowBorderY}
                      horizontalOpeningDirection={
                        formData.horizontalOpeningDirection
                      }
                      verticalOpeningDirection={
                        formData.verticalOpeningDirection
                      }
                      hasBase={formData.hasSoubassement}
                      hasBaseWindow={formData.hasSoubassementVitre}
                      baseWindowMargin={formData.soubassementVitreMargin}
                      baseHeight={formData.baseHeight}
                      baseMargin={formData.soubassementMargin}
                      baseColor={formData.soubassementColor}
                      soubassementStrokeWidth={formData.soubassementStrokeWidth}
                      hasSill={formData.showPetitsBois}
                      sillCountX={formData.petitsBoisCountX}
                      sillCountY={formData.petitsBoisCountY}
                      sillStrokeColor={formData.petitsBoisStrokeColor}
                      sillStrokeWidth={formData.petitsBoisStrokeWidth}
                      petitsBoisStyle={formData.petitsBoisStyle}
                      arcType={formData.arcType}
                      showWidthCote={formData.showWidthCote}
                      showHeightCote={formData.showHeightCote}
                      hasTraverse={formData.hasTraverse}
                      traverseCountX={formData.traverseCountX}
                      traverseCountY={formData.traverseCountY}
                      traverseWidth={formData.traverseWidth}
                    />
                  ) : (
                    <Window
                      windowWidth={formData.windowWidth}
                      windowHeight={formData.windowHeight}
                      borderColor={formData.borderColor}
                      margin={formData.innerMargin}
                      windowBorderX={formData.windowBorderX}
                      windowBorderY={formData.windowBorderY}
                      horizontalOpeningDirection={
                        formData.horizontalOpeningDirection
                      }
                      verticalOpeningDirection={
                        formData.verticalOpeningDirection
                      }
                      hasSoubassement={formData.hasSoubassement}
                      hasSoubassementVitre={formData.hasSoubassementVitre}
                      soubassementVitreMargin={formData.soubassementVitreMargin}
                      soubassementHeight={formData.baseHeight}
                      soubassementMargin={formData.soubassementMargin}
                      soubassementColor={formData.soubassementColor}
                      soubassementStrokeWidth={formData.soubassementStrokeWidth}
                      showPetitsBois={formData.showPetitsBois}
                      petitsBoisCountX={formData.petitsBoisCountX}
                      petitsBoisCountY={formData.petitsBoisCountY}
                      petitsBoisStrokeColor={formData.petitsBoisStrokeColor}
                      petitsBoisStrokeWidth={formData.petitsBoisStrokeWidth}
                      showWidthCote={formData.showWidthCote}
                      showHeightCote={formData.showHeightCote}
                      hasTraverse={formData.hasTraverse}
                      traverseCountX={formData.traverseCountX}
                      traverseCountY={formData.traverseCountY}
                      traverseWidth={formData.traverseWidth}
                    />
                  )}
                </Layer>
              </Stage>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
