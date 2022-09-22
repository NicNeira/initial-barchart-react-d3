import { useEffect, useState } from "react";
import "./styles.css";
import { csv, max, scaleBand, scaleLinear } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv";

const width = 960;
const height = 500;

export default function App() {
  // useState para setear la posicion
  const [data, setData] = useState(null);

  useEffect(() => {
    // Indicar las filas por año
    const row = (d) => {
      d.Population = +d["2020"];
      return d;
    };
    csv(csvUrl, row).then((data) => {
      // Para filtrar las barras que mostraremos
      setData(data.slice(0, 10));
    });
  }, []);

  // Cuando esten cargando los datos mostrara "Loading"
  if (!data) {
    return <pre>Loading....</pre>;
  }

  console.log(data[0]);

  // Variables para la renderizacion del bar chart
  const yScale = scaleBand()
    .domain(data.map((d) => d.Country))
    .range([0, height]);

  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.Population)])
    .range([0, width]);

  return (
    // svg = width y height asignamos el ancho y alto del "lienzo" svg
    <svg width={width} height={height}>
      {data.map((d) => (
        <rect
          x={0}
          y={yScale(d.Country)}
          width={xScale(d.Population)}
          height={yScale.bandwidth()}
        />
      ))}
    </svg>
  );

  return <div className="App"></div>;
}
