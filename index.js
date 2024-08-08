import * as d3 from 'd3';
import Plotly from 'plotly.js-dist';

const updateChart = (data) => {
  // Transform Looker Studio data format to Plotly format
  const rows = data.tables.DEFAULT;
  const x = rows.map(row => row['dimension1']); // Replace 'dimension1' with your dimension field
  const y = rows.map(row => row['dimension2']); // Replace 'dimension2' with your dimension field
  const value = rows.map(row => row['metric1']); // Replace 'metric1' with your metric field

  // Create the trace for the contour plot
  const trace = {
    x: x,
    y: y,
    z: value,
    type: 'contour',
    colorscale: 'Viridis',
    contours: {
      coloring: 'heatmap'
    }
  };

  // Define the layout for the plot
  const layout = {
    title: '2D Density Plot',
    width: 600,
    height: 600
  };

  // Render the plot
  Plotly.newPlot('density-plot', [trace], layout);
};

// Listen for data updates from Looker Studio
looker.plugins.visualizations.add({
  create: function(element, config) {
    element.innerHTML = '<div id="density-plot" style="width: 100%; height: 100%;"></div>';
  },
  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    updateChart(data);
    doneRendering();
  }
});
