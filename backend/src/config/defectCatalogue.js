/**
 * Predefined catalogue of steel surface defect categories.
 * This list is sent to the AI model as the allowed classification set,
 * and is also used to validate/display results on the frontend.
 *
 * Categories are based on common steel surface defect standards
 * (similar to NEU-CLS / industrial QC classifications used at plants like Tata Steel).
 */

export const DEFECT_CATALOGUE = [
  {
    id: "scratches",
    name: "Scratches",
    description:
      "Thin linear marks on the steel surface, usually caused by mechanical abrasion during handling, rolling, or transport.",
  },
  {
    id: "patches",
    name: "Patches",
    description:
      "Irregular, blotchy discolored regions on the surface, often due to uneven coating, oxidation, or surface contamination.",
  },
  {
    id: "sliver",
    name: "Sliver",
    description:
      "Thin, elongated slivers of metal that are partially detached from the surface, typically caused by rolling defects.",
  },
  {
    id: "crazing",
    name: "Crazing",
    description:
      "A network of fine, interconnected surface cracks resembling a spider web, often from thermal stress.",
  },
  {
    id: "pitted_surface",
    name: "Pitted Surface",
    description:
      "Small pits or cavities on the surface caused by corrosion, chemical reaction, or rolling contamination.",
  },
  {
    id: "inclusion",
    name: "Inclusion",
    description:
      "Foreign, non-metallic material embedded within the steel surface during the casting or rolling process.",
  },
  {
    id: "rolled_in_scale",
    name: "Rolled-in Scale",
    description:
      "Oxide scale that has been pressed into the surface during hot rolling, leaving an uneven textured patch.",
  },
  {
    id: "rust_oxidation",
    name: "Rust / Oxidation",
    description:
      "Reddish-brown or dark discoloration caused by oxidation of the steel surface due to moisture exposure.",
  },
  {
    id: "dent",
    name: "Dent",
    description:
      "A localized depression on the surface caused by physical impact during handling or transport.",
  },
  {
    id: "no_defect",
    name: "No Defect",
    description: "The surface appears clean and free of visible defects.",
  },
];

export const DEFECT_NAMES = DEFECT_CATALOGUE.map((d) => d.name);
