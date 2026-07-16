export function generateFrequency(
  difficulty: string
) {

  const min = 118.000;
  const max = 136.975;


  const randomFrequency =
    Math.random() * (max - min) + min;


  switch (difficulty) {


    case "Easy":

      // 1 décimale
      return (
        Math.round(randomFrequency * 10) / 10
      ).toFixed(1);



    case "Medium":

      // 2 décimales
      return (
        Math.round(randomFrequency * 100) / 100
      ).toFixed(2);



    case "Hard":

      // 3 décimales
      return (
        Math.round(randomFrequency * 1000) / 1000
      ).toFixed(3);



    default:

      return (
        Math.round(randomFrequency * 1000) / 1000
      ).toFixed(3);

  }

}