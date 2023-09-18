import { extractNumbers } from "../utils/number";

const configByFeature = {
  amount: {
    translation: "monto",
    formatter: extractNumbers,
  },
  category: { translation: "categoría" },
  date: { translation: "fecha" },
  subcategory: { translation: "subcategoría" },
  description: { translation: "descripción" },
};

const useExpenseFeaturesStructuring = ({ featuresList }) => {
  const speechFeatures = ["amount"].concat(featuresList);

  const genFeatValueStructure = (featuresData = "") =>
    speechFeatures.reduce((acum, curr, i) => {
      const firstResultArray = featuresData.split(" ").filter(r => r);

      const featStartPositions = Object.values(configByFeature).map(config =>
        firstResultArray?.indexOf(config.translation)
      );

      let end = 0;

      const positionsSorted = [...featStartPositions].sort((a, b) => a - b);
      const idxStartFeature = positionsSorted.indexOf(featStartPositions[i]);

      end =
        idxStartFeature === positionsSorted.length - 1
          ? firstResultArray.length
          : positionsSorted[idxStartFeature + 1];

      const featureValueString = firstResultArray
        ?.slice(featStartPositions[i] + 1, end)
        .join(" ");

      const featureFormatter = configByFeature[curr].formatter;

      const featureValueFormatted = featureFormatter
        ? featureFormatter(featureValueString)
        : featureValueString;

      return {
        ...acum,
        [curr]:
          featStartPositions[i] === -1 ? undefined : featureValueFormatted,
      };
    }, {});

  return {
    genFeatValueStructure,
  };
};

export default useExpenseFeaturesStructuring;
