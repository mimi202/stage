import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const GraphResult = ({ results }) => {
  // Exemple de structure de `results` :
  // results = [{ question: 'Q1', correct: true }, { question: 'Q2', correct: false }, ... ]

  const data = results.map((item, index) => ({
    name: `Q${index + 1}`,
    Réponse: item.correct ? 1 : 0, // 1 = correcte, 0 = incorrecte
  }));

  return (
    <div className="w-full h-64">
      <h2 className="text-xl font-semibold mb-4">Résultats du Quiz</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis ticks={[0, 1]} domain={[0, 1]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Réponse" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphResult;
