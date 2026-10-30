# Charts and KPIs

Chart and KPI rules that the dataviz skill does not give. Load it when building or reviewing a chart, a KPI row, or a dashboard metric.

## Axes and gridlines

- Bars start at zero. A line chart can use a non-zero axis, but a bar chart never does. (ONS, Storytelling with Data)
- Show a value axis. When every mark carries its value as a direct label, the axis can go. (ONS)
- Draw gridlines faint gray, few, and at round-number intervals. (ONS, Evergreen)
- Drop gridlines when every point carries its own label. (Evergreen)

## Line charts

- Connect real points with straight segments by default. Smooth a line only when the measured quantity changes continuously. Never use a cardinal or natural spline. (Datawrapper)
- Never join points across a gap in the data. Leave the gap visible. (UK Government Analysis Function)
- Show 4 lines or fewer on one chart. Past 4 lines, use small multiples. (UK Government Analysis Function)

## Actual and projected data

- Do not fade actual data, especially the latest points. Dash or fade only projected or incomplete segments. Mark the boundary with a highlight band, and label the last value directly. (Evergreen, EU Data Visualisation Guide)

## Bar charts

- Use square bar tops. A few pixels of corner radius is the limit. (Atlassian, Tabulareditor)
- Every bar encodes one data value. Add no bars for padding or decoration. (Tufte)
- Put an item's icon beside its label when readers know items by their mark, such as a site's favicon.

## Diverging bars

- Center one horizontal bar per category on 0. Give positive and negative values contrasting colors. Do not stack diverging segments. (FT Visual Vocabulary, Datawrapper)
- Print each bar's dollar total beside it.

## Pie charts

- Use a pie only for one whole. Aim for 4 slices, 5 at most. (Datawrapper academy says four, its blog says five)
- Group slices beyond 5 into "Other", or switch to bars. Use bars when readers must compare the shares. (Storytelling with Data)
- Do not add a pie to fill space left in a grid.

## Comparison series

- Draw the previous period in muted gray, and label its line end. Keep it in the legend too, since color alone does not carry identity. (Datawrapper, WCAG 1.4.1)
- Compare earlier years on the same axes. Label each year's line directly.
- Add a compare control that overlays other series on the same axis.
- Switch measures with a toggle. Keep one measure on the axis at a time.
- Offer a toggle between one aggregate chart and small multiples, one panel per item.
- Give each categorical series a distinct hue from the dataviz palette. Shades of one brand hue look too alike to tell series apart.
- Past the series-count ladder in dataviz, fold the tail or facet. Do not add hues. (dataviz)
- Bars and marks take the color of their legend key, such as Gantt bars by status.

## Time ranges

- Use buttons when the ranges fit in one row. Use a compact dropdown when they do not, not a bulky time-scale slider. Test the choice with users. (starting choice; no research backs either)
- Let users inspect every period in a range, such as all 12 months, not a few picked ones. On phones, a horizontal timeline can scroll through them.

## Tooltips and hover

- On a line chart, hover shows the exact value (Carbon) and, as a starting value, its percentage change from the previous point, in a bubble.
- On a bar chart, hover dims the other bars so the active one stands out (starting value).

## Chart controls

- Give a chart that needs room a full-screen expand icon. Give the icon an accessible name.

## Familiar forms

- Default to line, bar, and table views. Use an unfamiliar form only when it answers the question better, and explain how to read it on the chart. (Datawrapper, Tableau)

## Maps

- Pair every choropleth with a sortable table of region, value, and unit. (visualizing.org)
- Map rates, not totals. Use a bar chart when only a few regions have data. (ONS)

## KPI cards and dashboards

- Do not show a raw number alone. Add a comparison: the prior period or a target, the change in absolute terms and in percent, and the direction. (NN/g, Tableau)
- Show each percentage change as a chip beside its value.
- Show the top KPI row on the dashboard and on one analytics view, not on every tab.
- Start KPI tiles at a 2-column grid, not one large box per metric.
- Give each summary metric an icon beside a visible label.
- Delete a chart that has no labels or repeats another chart's data.

## Micro-charts and progress diagrams

- A micro-chart or progress diagram shows real data, with its value printed beside it. Decorative stand-ins for content stay out (see craft-floor).
- Carry color in micro-charts that show data, not in decorative buttons.
