import React, { Component } from "react";
import * as d3 from "d3";

class Animation extends Component {
    myRef = React.createRef();
    componentDidMount() {
        const data = [
            { name: "Medellín", index2005: 3, index2006: 33 },
            { name: "Cali", index2005: 39, index2006: 45 },
            { name: "Bogotá", index2005: 7, index2006: 31 },
            { name: "Pereira", index2005: 35, index2006: 36 },
            { name: "Bucaramanga", index2005: 16, index2006: 23 },
            { name: "Cúcuta", index2005: 45, index2006: 45 },
            { name: "Armenia", index2005: 6, index2006: 16 }
        ];
        this.drawChart(data);
    }

    drawChart(data) {

        const width = 700;
        const height = 500;
        const margin = { top: 10, left: 50, bottom: 40, right: 10 };
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top - margin.bottom;

        const svg = d3.select(this.myRef.current).append("svg")

        svg.attr("width", width);
        svg.attr("height", height);

        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, iwidth]);

        const y = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([0, iheight])
            .padding(0.1);

        const bars = g.selectAll("rect").data(data);

        const bars2 = bars.enter().append("rect")
            .attr("class", "bar")
            .style("fill", "orange")
            .attr("x", 0)
            .attr("y", d => y(d.name))
            .attr("width", d => x(d.index2006))
            .attr("height", y.bandwidth())

        /*    
        const rectangle = svg
            .append("rect")
            .attr("x", 50)
            .attr("y", 50)
            .attr("width", 50)
            .attr("height", 50)
        */
        d3.select("#start").on("click", () => {

            bars2.transition()
                .attr("width", d => x(d.index2005))
                .style("fill", "steelblue")
            /*
            rectangle.transition()
                .attr("x", 250)
                .attr("width", 100)
                .attr("height", 100)
                .attr("opacity", 0.5)
                .delay(100)
                .duration(4000)
                .on("end", function () {
                    d3.select(this)
                        .transition()
                        .attr("x", 150)
                        .attr("width", 75)
                        .attr("height", 70)
                })
            */

        })

        d3.select("#reset").on("click", () => {

            bars2.transition()
                .attr("width", d => x(d.index2006))
                .style("fill", "orange")
            /*
            rectangle.transition()
                .attr("x", 50)
                .attr("width", 50)
                .attr("height", 50)
                .attr("opacity", 1)
            */
        })

        g.append("g")
            .classed("x--axis", true)
            .call(d3.axisBottom(x))
            .attr("transform", `translate(0, ${iheight})`);

        g.append("g")
            .classed("y--axis", true)
            .call(d3.axisLeft(y));


    }

    render() {
        return (
            <div ref={this.myRef}>
                <button id="start">strat</button>
                <button id="reset">reset</button>
            </div>
        )
    }
}

export default Animation;